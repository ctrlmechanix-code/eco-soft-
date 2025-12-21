
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Lightbulb } from 'lucide-react';
import { blogPosts } from '../data/mockData';

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

const Blog = () => {
    return (
        <PageWrapper>
            <div className="mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Latest Insights</h1>
                <p className="text-xl text-slate-500 max-w-2xl mb-8">
                    News, guides, and updates from the world of sustainable technology and campus initiatives.
                </p>
                
                <div className="inline-flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100/50">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
                        <Lightbulb className="w-4 h-4" />
                    </div>
                    <p className="text-sm text-slate-700 font-medium">
                        Have an idea for a blog post or a story you want to add here? <br className="hidden sm:block"/>
                        Mail us at our official mail ID: <a href="mailto:hello@ecosort.edu" className="text-emerald-600 hover:text-emerald-700 hover:underline font-bold">hello@ecosort.edu</a>
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                    <motion.div 
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link 
                            to={`/blog/${post.id}`}
                            className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer flex flex-col h-full"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-900">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-slate-500 text-sm mb-6 flex-grow line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center text-emerald-600 font-semibold text-sm">
                                    Read Article <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </PageWrapper>
    );
};

export default Blog;
