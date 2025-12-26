
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { questionFlowData } from '../data/mockData';
import type { QuestionFlowAnswers, Submission } from '../types';
import { ArrowLeft, ArrowRight, Check, AlertCircle, X, FileText } from 'lucide-react';

const PageWrapper = ({ children }: { children?: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-[calc(100vh-80px)] flex flex-col justify-center py-12"
    >
        {children}
    </motion.div>
);

const QuestionFlow = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<QuestionFlowAnswers>({});
    const [direction, setDirection] = useState(1);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const category = params.get('category');
        if (category) {
            setAnswers(prev => ({ ...prev, category }));
        }
    }, [location.search]);

    const totalSteps = questionFlowData.length;
    const currentQuestion = questionFlowData[step];

    const calculateCredits = (ans: QuestionFlowAnswers) => {
        // Load dynamic rates or fallback to defaults
        const storedRates = localStorage.getItem('credit_rates');
        const rates = storedRates 
            ? JSON.parse(storedRates) 
            : { recycle: 40, donate: 30, repair: 20, advice: 20 };

        if (ans.intent === "Formally recycle it") return rates.recycle;
        if (ans.intent === "Repair it") return rates.repair;
        if (ans.intent === "Donate it") return rates.donate;
        if (ans.intent === "Get advice") return rates.advice;
        return rates.recycle; // Default
    };

    const getRecommendation = (ans: QuestionFlowAnswers) => {
      if (ans.intent === "Repair it") return "Repair";
      if (ans.deviceCondition === "Yes, perfectly" || ans.intent === "Donate it") return "Donate";
      return "Recycle";
    };

    const handleSelect = (option: string) => {
        const newAnswers = { ...answers, [currentQuestion.key]: option };
        setAnswers(newAnswers);
        
        if (step < totalSteps - 1) {
            setDirection(1);
            setStep(step + 1);
        } else {
            // Last step reached: Trigger confirmation modal instead of immediate redirect
            setIsConfirmationOpen(true);
        }
    };

    const handleConfirm = () => {
        // Get Current User Info from Storage
        const userStr = localStorage.getItem('currentUser');
        const currentUser = userStr ? JSON.parse(userStr) : null;

        // Create submission
        const recommendation = getRecommendation(answers);
        const submission: Submission = {
          id: `SUB-2024-${Math.floor(1000 + Math.random() * 9000)}`,
          // Use actual user data if available, fallback for robustness
          userId: currentUser ? currentUser.id : "USR-GUEST",
          userName: currentUser ? currentUser.name : "Guest User",
          category: answers.category || "Unknown",
          condition: answers.deviceCondition || "Unknown",
          intent: answers.intent || "Unknown",
          recommendation: recommendation,
          status: "PENDING",
          creditsPending: calculateCredits(answers),
          creditsAwarded: 0,
          dropOffCode: `DRP-${Math.floor(10000 + Math.random() * 89999)}`,
          createdAt: new Date().toISOString()
        };

        // Save to local storage
        const localSubmissions = JSON.parse(localStorage.getItem('user_submissions') || '[]');
        localStorage.setItem('user_submissions', JSON.stringify([submission, ...localSubmissions]));

        navigate('/result', { state: { answers, submission } });
    };

    const handleBack = () => {
        if (step > 0) {
            setDirection(-1);
            setStep(step - 1);
        } else {
            navigate('/categories');
        }
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 50 : -50,
            opacity: 0,
        }),
    };

    return (
        <PageWrapper>
            <div className="max-w-3xl mx-auto px-4 w-full">
                {/* Minimal Header */}
                <div className="mb-12 flex items-center justify-between">
                    <button 
                        onClick={handleBack}
                        className="flex items-center text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </button>
                    <div className="flex flex-col items-end">
                        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Step {step + 1} of {totalSteps}</span>
                        <div className="w-32 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <motion.div 
                                className="h-full bg-emerald-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>

                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={step}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8">{currentQuestion.question}</h2>
                        
                        <div className="space-y-3">
                            {currentQuestion.options.map((option, idx) => {
                                const isSelected = answers[currentQuestion.key as keyof QuestionFlowAnswers] === option;
                                return (
                                    <motion.button
                                        key={option}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        onClick={() => handleSelect(option)}
                                        className={`w-full group text-left px-6 py-5 rounded-xl border-2 transition-all duration-200 flex items-center justify-between
                                            ${isSelected 
                                                ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20 shadow-sm' 
                                                : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-md'
                                            }`}
                                    >
                                        <span className={`text-lg font-medium ${isSelected ? 'text-emerald-900 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>{option}</span>
                                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors
                                            ${isSelected ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 dark:border-slate-600 group-hover:border-emerald-400'}`}>
                                            {isSelected && <Check className="w-4 h-4 text-white" />}
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Confirmation Modal */}
            <AnimatePresence>
                {isConfirmationOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                            onClick={() => setIsConfirmationOpen(false)}
                        />
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl p-8 text-center border border-slate-100 dark:border-slate-800"
                        >
                            <button 
                                onClick={() => setIsConfirmationOpen(false)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-1"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            
                            <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 dark:text-emerald-400">
                                <FileText className="w-8 h-8" />
                            </div>
                            
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Finalize Report?</h3>
                            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                                Are you ready to submit your answers and see your recycling recommendation?
                            </p>
                            
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={handleConfirm}
                                    className="w-full py-3.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2"
                                >
                                    Yes, Show Report <ArrowRight className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setIsConfirmationOpen(false)}
                                    className="w-full py-3.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                                >
                                    No, Review Answers
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </PageWrapper>
    );
};

export default QuestionFlow;
