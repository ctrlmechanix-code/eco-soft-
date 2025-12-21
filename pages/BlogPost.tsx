
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Clock, Share2, Check } from 'lucide-react';
import { blogPosts } from '../data/mockData';

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);
    const post = blogPosts.find(p => p.id === id);

    const handleShare = async (e: React.MouseEvent) => {
        // Prevent event bubbling to ensure the click is captured solely by the button
        e.preventDefault();
        e.stopPropagation();

        if (!post) return;
        
        const url = window.location.href;

        // Visual feedback helper
        const triggerSuccess = () => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        };

        // 1. Try Web Share API (Mobile/Tablet)
        if (navigator.share) {
            try {
                await navigator.share({
                    title: post.title,
                    text: post.excerpt,
                    url: url,
                });
                triggerSuccess();
                return;
            } catch (error) {
                // If user cancels share sheet, we don't need to do anything.
                if (error instanceof Error && error.name === 'AbortError') return;
                // If it fails for other reasons, fall through to clipboard
            }
        }

        // 2. Clipboard API
        try {
            await navigator.clipboard.writeText(url);
            triggerSuccess();
        } catch (err) {
            // 3. Fallback for older browsers
            try {
                const textArea = document.createElement("textarea");
                textArea.value = url;
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                textArea.style.top = "0";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                
                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);
                
                if (successful) {
                    triggerSuccess();
                } else {
                     window.prompt("Copy link manually:", url);
                }
            } catch (fallbackErr) {
                window.prompt("Copy link manually:", url);
            }
        }
    };

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Article not found</h2>
                    <button 
                        onClick={() => navigate('/blog')}
                        className="text-emerald-600 font-medium hover:underline"
                    >
                        Return to Blog
                    </button>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white min-h-screen pb-20"
        >
            {/* Hero Section */}
            <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/30 z-10" />
                <img 
                    src={post.image} 
                    alt={post.title} 
                    loading="lazy"
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full z-20 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end pb-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto w-full">
                        <button 
                            onClick={() => navigate('/blog')}
                            className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full text-sm font-medium border border-white/20"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to News
                        </button>
                        
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                                {post.category}
                            </span>
                            <span className="flex items-center text-white/80 text-sm">
                                <Clock className="w-4 h-4 mr-1" /> 5 min read
                            </span>
                        </div>
                        
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            {post.title}
                        </h1>
                        
                        <div className="flex items-center gap-6 text-white/90">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                    <User className="w-4 h-4" />
                                </div>
                                <span className="font-medium">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-emerald-400" />
                                <span>{post.date}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="prose prose-lg prose-slate hover:prose-a:text-emerald-600 prose-img:rounded-2xl max-w-none">
                    <p className="lead text-xl text-slate-600 font-medium mb-8 border-l-4 border-emerald-500 pl-4 italic">
                        {post.excerpt}
                    </p>
                    
                    {/* Render HTML content safely */}
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

                <hr className="my-12 border-slate-200" />

                <div className="relative z-20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                        <span className="text-sm text-slate-500 font-medium">Tags:</span>
                        <div className="flex gap-2 flex-wrap">
                            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">#Sustainability</span>
                            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">#CampusLife</span>
                        </div>
                    </div>
                    
                    <button 
                        type="button"
                        onClick={handleShare}
                        className={`flex-shrink-0 relative z-30 cursor-pointer flex items-center gap-2 transition-all duration-200 font-medium text-sm px-5 py-2.5 rounded-full border shadow-sm active:scale-95 select-none
                            ${copied 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-emerald-600 hover:border-emerald-200'
                            }`}
                    >
                        {copied ? (
                            <>
                                <Check className="w-4 h-4" />
                                <span>Link Copied!</span>
                            </>
                        ) : (
                            <>
                                <Share2 className="w-4 h-4" />
                                <span>Share Article</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default BlogPost;
