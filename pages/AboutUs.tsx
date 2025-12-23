
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Heart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

const AboutUs = () => {
    const navigate = useNavigate();

    return (
        <PageWrapper>
            <div className="text-center max-w-3xl mx-auto mb-20">
                <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-emerald-600 dark:text-emerald-400 font-bold tracking-wide uppercase text-sm"
                >
                    Who We Are
                </motion.span>
                <motion.h1 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mt-3 mb-6"
                >
                    Building a circular economy for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400">campuses.</span>
                </motion.h1>
                <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed">
                    ECO-SORT was founded with a simple belief: technology can turn the tide on electronic waste. We are empowering the next generation to take responsible action through smart, gamified solutions.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-20">
                {[
                    { icon: Target, title: "Our Mission", desc: "To divert 100% of campus e-waste from landfills by 2026 through accessible technology." },
                    { icon: Users, title: "Community First", desc: "We believe in the power of collective action. Every student contribution counts towards a greener future." },
                    { icon: Heart, title: "Sustainability", desc: "Environmental stewardship is at the core of every line of code we write and every feature we build." }
                ].map((item, i) => (
                    <motion.div 
                        key={i}
                        whileHover={{ y: -5 }}
                        className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm"
                    >
                        <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
                            <item.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                    </motion.div>
                ))}
            </div>

            <div className="bg-slate-900 dark:bg-black rounded-[2.5rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10 max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6">Join the movement</h2>
                    <p className="text-slate-400 mb-8 text-lg">Whether you are a student, faculty member, or local resident, your participation matters.</p>
                    <button 
                        onClick={() => navigate('/categories')}
                        className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:bg-emerald-50 transition-colors inline-flex items-center gap-2"
                    >
                        Start Recycling <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </PageWrapper>
    );
};

export default AboutUs;
