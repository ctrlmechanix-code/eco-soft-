
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import type { QuestionFlowAnswers } from '../types';
import { MapPin, Gift, Wrench, Recycle, ArrowRight, Share2, Leaf, CheckCircle2, AlertCircle } from 'lucide-react';

// Theme configuration based on the result action
const THEMES = {
    Repair: {
        gradient: "from-amber-500 to-orange-600",
        shadow: "shadow-amber-500/25",
        lightBg: "bg-amber-50",
        icon: Wrench,
        textColor: "text-amber-700",
        buttonLabel: "Find Repair Shops"
    },
    Donate: {
        gradient: "from-blue-500 to-indigo-600",
        shadow: "shadow-blue-500/25",
        lightBg: "bg-blue-50",
        icon: Gift,
        textColor: "text-blue-700",
        buttonLabel: "Find Donation Centers"
    },
    Recycle: {
        gradient: "from-emerald-500 to-teal-600",
        shadow: "shadow-emerald-500/25",
        lightBg: "bg-emerald-50",
        icon: Recycle,
        textColor: "text-emerald-700",
        buttonLabel: "Find Collection Points"
    },
};

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const answers = location.state as QuestionFlowAnswers;

    const recommendation = useMemo(() => {
        if (!answers) return { action: "Recycle", explanation: "Safe disposal is the best option based on your inputs.", credits: 20 };
        
        if (answers.intent === "Repair") return { action: "Repair", explanation: "Repairing extends device life and conserves valuable resources.", credits: 70 };
        if (answers.deviceCondition === "Working" || answers.intent === "Donate") return { action: "Donate", explanation: "Donating gives devices a second life, helping those in need while reducing waste.", credits: 50 };

        return { action: "Recycle", explanation: "Recycling recovers valuable materials like gold and copper while preventing toxic pollution.", credits: 30 };
    }, [answers]);
    
    // Default to Recycle theme if something goes wrong
    const theme = THEMES[recommendation.action as keyof typeof THEMES] || THEMES.Recycle;
    const Icon = theme.icon;

    if (!answers) {
        return (
            <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
                <div className="text-center max-w-md bg-white p-8 rounded-3xl border border-slate-100 shadow-xl">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                        <AlertCircle className="w-8 h-8" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">No session data found</h2>
                    <p className="text-slate-500 mb-6">Please start the reporting process from the beginning.</p>
                    <Link to="/categories" className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all">
                        Start Over <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 lg:p-8 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr ${theme.gradient} opacity-[0.08] rounded-full blur-[100px]`} />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 w-full max-w-xl bg-white/70 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-white/60 overflow-hidden"
            >
                {/* Hero Header */}
                <div className={`relative h-56 bg-gradient-to-br ${theme.gradient} flex flex-col items-center justify-center overflow-hidden`}>
                    {/* Noise Texture */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                    
                    {/* Abstract Circles */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30">
                         <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full mix-blend-overlay blur-2xl"></div>
                         <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black rounded-full mix-blend-overlay blur-2xl"></div>
                    </div>

                    <motion.div 
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                        className="relative z-10 w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 flex items-center justify-center shadow-lg mb-4 ring-1 ring-white/30"
                    >
                        <Icon className="w-12 h-12 text-white drop-shadow-md" />
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="relative z-10 text-center"
                    >
                        <span className="px-3 py-1 rounded-full bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                            Recommended Action
                        </span>
                    </motion.div>
                </div>

                {/* Content Body */}
                <div className="px-8 py-10 text-center">
                    <motion.div
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ delay: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                            {recommendation.action}
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed mb-8">
                            {recommendation.explanation}
                        </p>
                    </motion.div>

                    {/* Stats / Rewards Card */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm mb-8 flex flex-col sm:flex-row items-center justify-between gap-4"
                    >
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center text-white font-bold text-xl shadow-md shrink-0`}>
                                +{recommendation.credits}
                            </div>
                            <div className="text-left">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Rewards</p>
                                <p className="text-sm font-semibold text-slate-900">Green Credits Earned</p>
                            </div>
                        </div>
                        
                        <div className="hidden sm:block w-px h-8 bg-slate-100"></div>
                        
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                             <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-emerald-600 shrink-0">
                                <Leaf className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Impact</p>
                                <p className="text-sm font-semibold text-slate-900">~0.5kg CO₂ Avoided</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="space-y-3"
                    >
                        {['Recycle', 'Donate'].includes(recommendation.action) ? (
                            <button
                                onClick={() => navigate('/collection-points')}
                                className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-xl ${theme.shadow} hover:shadow-2xl hover:-translate-y-1 transition-all bg-gradient-to-r ${theme.gradient} flex items-center justify-center gap-2 group`}
                            >
                                <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" /> 
                                {theme.buttonLabel}
                            </button>
                        ) : (
                             <button disabled className="w-full py-4 bg-slate-100 text-slate-400 rounded-xl font-bold text-lg cursor-not-allowed flex items-center justify-center gap-2 border border-slate-200">
                                <Wrench className="w-5 h-5" /> Repair Shops (Coming Soon)
                            </button>
                        )}
                        
                        <button className="w-full py-4 bg-white border border-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center justify-center gap-2">
                            <Share2 className="w-4 h-4" /> Share Impact
                        </button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Result;
