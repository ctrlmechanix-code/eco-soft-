
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
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

const posts = [
    {
        title: "The Silent Crisis: E-Waste on Campuses",
        excerpt: "Why universities are becoming major hotspots for electronic waste and how we can stop it.",
        date: "Oct 24, 2023",
        author: "Sarah Jenkins",
        category: "Awareness",
        image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "How to Properly Dispose of Lithium Batteries",
        excerpt: "A guide to handling one of the most dangerous components in modern electronics.",
        date: "Nov 02, 2023",
        author: "Mike Chen",
        category: "Guide",
        image: "https://images.unsplash.com/photo-1619641460394-4d6423d24e13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        title: "ECO-SORT Hits 10,000 Devices Recycled",
        excerpt: "Celebrating a major milestone in our journey towards zero-waste campuses.",
        date: "Nov 15, 2023",
        author: "ECO-SORT Team",
        category: "Company News",
        image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
];

const Blog = () => {
    return (
        <PageWrapper>
            <div className="mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Latest Insights</h1>
                <p className="text-xl text-slate-500 max-w-2xl">
                    News, guides, and updates from the world of sustainable technology and campus initiatives.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer flex flex-col h-full"
                    >
                        <div className="h-48 overflow-hidden relative">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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
                            <p className="text-slate-500 text-sm mb-6 flex-grow">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center text-emerald-600 font-semibold text-sm">
                                Read Article <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </PageWrapper>
    );
};

export default Blog;
