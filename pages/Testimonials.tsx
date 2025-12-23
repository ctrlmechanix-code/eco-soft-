
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Plus, X, Send, User } from 'lucide-react';
import { mockTestimonials } from '../data/mockData';
import { Testimonial } from '../types';

const PageWrapper = ({ children }: { children?: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8"
    >
        {children}
    </motion.div>
);

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', role: '', content: '' });

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('testimonials') || '[]');
        if (stored.length > 0) {
            setTestimonials(stored);
        } else {
            setTestimonials(mockTestimonials);
            localStorage.setItem('testimonials', JSON.stringify(mockTestimonials));
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTestimonial: Testimonial = {
            id: `t-${Date.now()}`,
            name: formData.name,
            role: formData.role,
            avatar: `https://api.dicebear.com/8.x/avataaars/svg?seed=${formData.name}`,
            content: formData.content
        };

        const updated = [newTestimonial, ...testimonials];
        setTestimonials(updated);
        localStorage.setItem('testimonials', JSON.stringify(updated));
        
        setIsModalOpen(false);
        setFormData({ name: '', role: '', content: '' });
    };

    return (
        <PageWrapper>
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Campus Voices</h1>
                <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-8">
                    Hear from the students, faculty, and staff who are transforming our campus sustainability culture.
                </p>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-500/30"
                >
                    <Plus className="w-5 h-5" /> Share Your Story
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((t, i) => (
                    <motion.div 
                        key={t.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative group hover:shadow-lg transition-all duration-300"
                    >
                        <Quote className="w-8 h-8 text-emerald-100 dark:text-emerald-900/30 absolute top-8 right-8" />
                        <div className="flex items-center gap-4 mb-6">
                            <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-700" />
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{t.name}</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">{t.role}</p>
                            </div>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed relative z-10">"{t.content}"</p>
                    </motion.div>
                ))}
            </div>

            {/* Add Testimonial Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl p-8 border border-slate-100 dark:border-slate-800"
                        >
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Share Your Experience</h2>
                            <p className="text-slate-500 dark:text-slate-400 mb-6">How has ECO-SORT impacted your sustainability habits?</p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Name</label>
                                    <input 
                                        type="text" 
                                        required 
                                        value={formData.name} 
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-slate-900 dark:text-white"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Role / Department</label>
                                    <input 
                                        type="text" 
                                        required 
                                        value={formData.role} 
                                        onChange={e => setFormData({...formData, role: e.target.value})}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-slate-900 dark:text-white"
                                        placeholder="e.g. Student, Computer Science"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Your Story</label>
                                    <textarea 
                                        required 
                                        rows={4} 
                                        value={formData.content} 
                                        onChange={e => setFormData({...formData, content: e.target.value})}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-slate-900 dark:text-white resize-none"
                                        placeholder="Tell us about your experience..."
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg flex items-center justify-center gap-2 mt-4"
                                >
                                    Submit Story <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </PageWrapper>
    );
};

export default Testimonials;
