
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import type { QuestionFlowAnswers, Submission } from '../types';
import { MapPin, Gift, Wrench, Recycle, ArrowRight, Share2, Leaf, AlertCircle, Info, ArrowLeft, Ticket, Clock, CheckCircle2 } from 'lucide-react';

const THEMES = {
    Repair: {
        gradient: "from-amber-400/20 via-orange-100/20 to-amber-50/10",
        accent: "bg-amber-500",
        text: "text-amber-900",
        subtext: "text-amber-700/80",
        iconColor: "text-amber-600",
        buttonGradient: "bg-gradient-to-r from-amber-500 to-orange-600",
        icon: Wrench,
        label: "Repair Needed",
        buttonText: "Find Repair Shops"
    },
    Donate: {
        gradient: "from-blue-400/20 via-indigo-100/20 to-blue-50/10",
        accent: "bg-blue-500",
        text: "text-blue-900",
        subtext: "text-blue-700/80",
        iconColor: "text-blue-600",
        buttonGradient: "bg-gradient-to-r from-blue-500 to-indigo-600",
        icon: Gift,
        label: "Ready for Donation",
        buttonText: "Find Donation Centers"
    },
    Recycle: {
        gradient: "from-emerald-400/20 via-teal-100/20 to-emerald-50/10",
        accent: "bg-emerald-500",
        text: "text-emerald-900",
        subtext: "text-emerald-700/80",
        iconColor: "text-emerald-600",
        buttonGradient: "bg-gradient-to-r from-emerald-500 to-teal-600",
        icon: Recycle,
        label: "Recycle Responsibly",
        buttonText: "Find Collection Points"
    },
};

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as { answers: QuestionFlowAnswers, submission: Submission } | null;

    const recommendation = useMemo(() => {
        if (!state?.answers) return { action: "Recycle", explanation: "Based on your inputs, safe recycling is the best option to recover valuable materials.", credits: 30 };
        
        const ans = state.answers;
        if (ans.intent === "Repair it") return { action: "Repair", explanation: "Repairing extends device life and conserves valuable resources.", credits: 70 };
        if (ans.deviceCondition === "Yes, perfectly" || ans.intent === "Donate it") return { action: "Donate", explanation: "Donating gives devices a second life, helping those in need while reducing waste.", credits: 50 };

        return { action: "Recycle", explanation: "Recycling recovers valuable materials like gold and copper while preventing toxic pollution.", credits: 30 };
    }, [state?.answers]);
    
    const theme = THEMES[recommendation.action as keyof typeof THEMES] || THEMES.Recycle;
    const Icon = theme.icon;

    if (!state?.answers) {
        return (
             <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-slate-50">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-md w-full bg-white p-10 rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-white/50"
                >
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400 ring-8 ring-slate-50/50">
                        <AlertCircle className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">Session Expired</h2>
                    <p className="text-slate-500 mb-8 leading-relaxed">We couldn't find your assessment data. Please start a new reporting session.</p>
                    <button 
                        onClick={() => navigate('/categories')}
                        className="w-full py-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2"
                    >
                        Start New Report <ArrowRight className="w-4 h-4" />
                    </button>
                </motion.div>
            </div>
        );
    }

    const submission = state.submission;

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 lg:p-8 relative overflow-hidden bg-slate-50/50">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b ${theme.gradient} blur-[120px] opacity-60`} />
                <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-white/40 blur-[100px] mix-blend-overlay" />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full max-w-5xl bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-white/60 overflow-hidden flex flex-col md:flex-row"
            >
                {/* Left Side: Visual & Status */}
                <div className="md:w-5/12 relative overflow-hidden p-6 md:p-10 flex flex-col justify-between min-h-[300px] md:min-h-[400px]">
                     {/* Dynamic Background for Left Panel */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-50`} />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                    
                    <div className="relative z-10">
                         <button 
                            onClick={() => navigate('/categories')}
                            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 mb-8 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
                        </button>

                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/40 border border-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-slate-800 mb-6"
                        >
                            <span className={`w-2 h-2 rounded-full ${theme.accent}`}></span>
                            Assessment Complete
                        </motion.div>
                        
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight tracking-tight">
                            {recommendation.action}
                        </h1>
                        <p className={`text-lg font-medium ${theme.subtext} leading-relaxed`}>
                            {theme.label}
                        </p>

                        {submission?.dropOffCode && (
                          <div className="mt-10 p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 shadow-sm">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                              <Ticket className="w-3.5 h-3.5" /> Drop-off Code
                            </p>
                            <p className="text-3xl font-black text-slate-900 tracking-tighter">
                              {submission.dropOffCode}
                            </p>
                          </div>
                        )}
                    </div>

                    <div className="relative z-10 mt-auto flex justify-center md:justify-start pt-10">
                         <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                            className="w-32 h-32 rounded-[2rem] bg-white/50 backdrop-blur-md border border-white/60 flex items-center justify-center shadow-lg ring-1 ring-white/40"
                         >
                            <Icon className={`w-14 h-14 ${theme.iconColor}`} strokeWidth={1.5} />
                         </motion.div>
                    </div>
                </div>

                {/* Right Side: Details & Actions */}
                <div className="md:w-7/12 p-6 md:p-12 flex flex-col bg-white/40">
                    <div className="flex-grow">
                        <motion.div
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             transition={{ delay: 0.5 }}
                        >
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Analysis Result</h3>
                            <p className="text-slate-600 text-lg leading-relaxed mb-10 font-medium">
                                {recommendation.explanation}
                            </p>
                        </motion.div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-10">
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="p-5 rounded-2xl bg-white border border-slate-100 flex flex-col items-start gap-3 shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-slate-900">+{recommendation.credits}</p>
                                    <p className="text-xs font-bold text-amber-500 uppercase tracking-wide mt-1">Pending Credits</p>
                                </div>
                            </motion.div>

                             <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="p-5 rounded-2xl bg-white border border-slate-100 flex flex-col items-start gap-3 shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                                    <Info className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-slate-900">~0.5kg</p>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-1">CO₂ Prevented</p>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.75 }}
                          className="mb-10 p-6 bg-slate-900/5 rounded-3xl border border-slate-200"
                        >
                          <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-widest">Next Steps</h4>
                          <ul className="space-y-4">
                            {[
                              { icon: MapPin, text: "Visit your nearest collection point" },
                              { icon: Ticket, text: "Present your drop-off code to the staff" },
                              { icon: CheckCircle2, text: "Mark item as dropped in 'My Submissions'" },
                              { icon: Clock, text: "Wait for admin verification & credits" }
                            ].map((step, i) => (
                              <li key={i} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400 shrink-0 shadow-sm border border-slate-100">
                                  <step.icon className="w-4 h-4" />
                                </div>
                                {step.text}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-4">
                         {['Recycle', 'Donate'].includes(recommendation.action) ? (
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                onClick={() => navigate('/collection-points')}
                                className={`w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-emerald-900/10 hover:shadow-xl hover:-translate-y-0.5 transition-all ${theme.buttonGradient} flex items-center justify-center gap-2 group relative overflow-hidden`}
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <MapPin className="w-5 h-5" /> 
                                    {theme.buttonText}
                                </span>
                            </motion.button>
                        ) : (
                             <motion.button 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                disabled 
                                className="w-full py-4 bg-slate-100 text-slate-400 rounded-xl font-bold cursor-not-allowed flex items-center justify-center gap-2 border border-slate-200"
                            >
                                <Wrench className="w-5 h-5" /> Repair Shops (Coming Soon)
                            </motion.button>
                        )}
                        
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="flex gap-4"
                        >
                            <button 
                              onClick={() => navigate('/submissions')}
                              className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
                            >
                                My Submissions
                            </button>
                             <button 
                                onClick={() => navigate('/categories')}
                                className="flex-1 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center justify-center gap-2 shadow-sm"
                             >
                                New Report
                            </button>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Result;
