
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { categories } from '../data/mockData';
import type { Category } from '../types';
import { ArrowRight, X } from 'lucide-react';
import Icon from '../components/ui/Icon';

const PageWrapper = ({ children }: { children?: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8"
  >
    {children}
  </motion.div>
);

interface CategoryCardProps {
    category: Category;
    onClick: (category: Category) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
    return (
        <motion.div
            onClick={() => onClick(category)}
            className="group relative bg-white rounded-2xl border border-slate-200 p-8 cursor-pointer overflow-hidden"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-colors duration-300">
                        <Icon name={category.icon as any} className="w-7 h-7" />
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <ArrowRight className="w-5 h-5 text-emerald-500" />
                    </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">{category.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{category.description}</p>
            </div>
            
            {/* Active Border Effect */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-500/10 rounded-2xl transition-colors duration-300 pointer-events-none" />
        </motion.div>
    );
};

const Categories = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [customItem, setCustomItem] = useState('');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const handleCategoryClick = (category: Category) => {
        if (category.name === 'Other') {
            setIsModalOpen(true);
        } else {
            navigate(`/questions?category=${encodeURIComponent(category.name)}`);
        }
    };

    const handleCustomSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (customItem.trim()) {
            navigate(`/questions?category=${encodeURIComponent(customItem)}`);
        }
    };

    return (
        <PageWrapper>
            <div className="mb-20">
                <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-emerald-600 font-semibold tracking-wide uppercase text-sm"
                >
                    Step 01
                </motion.span>
                <motion.h1 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 mb-6"
                >
                    Select device category
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-slate-500 max-w-2xl"
                >
                    Choose the item you wish to report. Accurate categorization ensures the most efficient recycling or repair process.
                </motion.p>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {categories.map((category) => (
                    <CategoryCard 
                        key={category.id} 
                        category={category} 
                        onClick={handleCategoryClick} 
                    />
                ))}
            </motion.div>

            {/* Custom Item Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center px-4"
                    >
                        <div 
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                            onClick={() => setIsModalOpen(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-slate-100"
                        >
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">What are you reporting?</h3>
                            <p className="text-slate-500 mb-6">Please specify the type of electronic device.</p>
                            
                            <form onSubmit={handleCustomSubmit}>
                                <input
                                    type="text"
                                    value={customItem}
                                    onChange={(e) => setCustomItem(e.target.value)}
                                    placeholder="e.g., Electric Toothbrush, Drone..."
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all mb-6 text-slate-900 font-medium placeholder:text-slate-400"
                                    autoFocus
                                />
                                <button
                                    type="submit"
                                    disabled={!customItem.trim()}
                                    className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    Continue <ArrowRight className="w-4 h-4" />
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </PageWrapper>
    );
};

export default Categories;
