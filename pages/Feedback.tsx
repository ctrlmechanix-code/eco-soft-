
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { UserRequest } from '../types';

const PageWrapper = ({ children }: { children?: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
    >
        {children}
    </motion.div>
);

const Feedback = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    const [formData, setFormData] = useState({
        type: 'Support' as UserRequest['type'],
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            const newRequest: UserRequest = {
                id: `REQ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
                ...formData,
                date: new Date().toISOString().split('T')[0],
                status: 'Open'
            };

            // Get existing requests from local storage
            const existingData = localStorage.getItem('user_requests');
            const requests = existingData ? JSON.parse(existingData) : [];
            localStorage.setItem('user_requests', JSON.stringify([newRequest, ...requests]));

            setIsLoading(false);
            setIsSuccess(true);
        }, 1500);
    };

    if (isSuccess) {
        return (
            <PageWrapper>
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-xl text-center"
                >
                    <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Feedback Received!</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-lg mb-8 max-w-md mx-auto">
                        Thank you for reaching out. We have created a ticket for your request and our team will look into it shortly.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                            onClick={() => navigate('/requests')}
                            className="px-8 py-3.5 bg-slate-900 dark:bg-emerald-600 text-white rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-emerald-700 transition-colors shadow-lg"
                        >
                            View My Requests
                        </button>
                        <button 
                            onClick={() => {
                                setIsSuccess(false);
                                setFormData({ type: 'Support', subject: '', message: '' });
                            }}
                            className="px-8 py-3.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        >
                            Submit Another
                        </button>
                    </div>
                </motion.div>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <div className="text-center mb-10">
                <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-emerald-600 dark:text-emerald-400 font-bold tracking-wide uppercase text-sm"
                >
                    We're here to help
                </motion.span>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-2 mb-4">Feedback & Support</h1>
                <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                    Have a question, found a bug, or want to suggest a feature? Let us know below.
                </p>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-10 border border-slate-200 dark:border-slate-800 shadow-sm"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Request Type</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {['Support', 'Feedback', 'Bug Report', 'Feature Request'].map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type: type as any })}
                                        className={`px-4 py-3 rounded-xl text-sm font-medium border transition-all ${
                                            formData.type === type 
                                            ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-700 dark:text-emerald-400 ring-1 ring-emerald-500' 
                                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                                        }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Subject</label>
                            <input 
                                type="text" 
                                required
                                value={formData.subject}
                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                placeholder="Brief summary of your request"
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Message</label>
                            <textarea 
                                required
                                rows={6}
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                placeholder="Describe your issue or idea in detail..."
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none"
                            />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                            <AlertCircle className="w-4 h-4" />
                            <span>We typically respond within 24 hours.</span>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? 'Submitting...' : (
                                <>
                                    Submit Request <Send className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </PageWrapper>
    );
};

export default Feedback;
