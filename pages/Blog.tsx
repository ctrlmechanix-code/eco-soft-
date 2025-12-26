
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Lightbulb } from 'lucide-react';
import { blogPosts as mockPosts } from '../data/mockData';
import { BlogPost } from '../types';

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
    const [posts, setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('blog_posts') || '[]');
        if (stored.length > 0) {
            setPosts(stored);
        } else {
            setPosts(mockPosts);
            localStorage.setItem('blog_posts', JSON.stringify(mockPosts));
        }
    }, []);

    const publishedPosts = posts.filter(p => p.status === 'Published' || !p.status);

    return (
        <PageWrapper>
            <div className="mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Latest Insights</h1>
                <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mb-8">
                    News, guides, and updates from the world of sustainable technology and campus initiatives.
                </p>
                
                <div className="inline-flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100/50 dark:border-emerald-800">
                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                        <Lightbulb className="w-4 h-4" />
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                        Have an idea for a blog post or a story you want to add here? <br className="hidden sm:block"/>
                        Mail us at our official mail ID: <a href="mailto:ctrlmechanix@gmail.com" className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:underline font-bold">ctrlmechanix@gmail.com</a>
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {publishedPosts.map((post, index) => (
                    <motion.div 
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link 
                            to={`/blog/${post.id}`}
                            className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition-all cursor-pointer flex flex-col h-full"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-900 dark:text-white border border-slate-100 dark:border-slate-700">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500 mb-3">
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 flex-grow line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
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
