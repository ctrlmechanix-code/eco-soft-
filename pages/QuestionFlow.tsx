
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { questionFlowData } from '../data/mockData';
import type { QuestionFlowAnswers } from '../types';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
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
    
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const category = params.get('category');
        if (category) {
            setAnswers(prev => ({ ...prev, category }));
        }
    }, [location.search]);

    const totalSteps = questionFlowData.length;
    const currentQuestion = questionFlowData[step];

    const handleSelect = (option: string) => {
        const newAnswers = { ...answers, [currentQuestion.key]: option };
        setAnswers(newAnswers);
        
        if (step < totalSteps - 1) {
            setDirection(1);
            setStep(step + 1);
        } else {
            navigate('/result', { state: newAnswers });
        }
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
                        className="flex items-center text-slate-400 hover:text-slate-900 transition-colors text-sm font-medium"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </button>
                    <div className="flex flex-col items-end">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Step {step + 1} of {totalSteps}</span>
                        <div className="w-32 h-1 bg-slate-100 rounded-full overflow-hidden">
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
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">{currentQuestion.question}</h2>
                        
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
                                                ? 'border-emerald-500 bg-emerald-50/50 shadow-sm' 
                                                : 'border-slate-100 bg-white hover:border-emerald-200 hover:shadow-md'
                                            }`}
                                    >
                                        <span className={`text-lg font-medium ${isSelected ? 'text-emerald-900' : 'text-slate-700'}`}>{option}</span>
                                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors
                                            ${isSelected ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 group-hover:border-emerald-400'}`}>
                                            {isSelected && <Check className="w-4 h-4 text-white" />}
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </PageWrapper>
    );
};

export default QuestionFlow;
