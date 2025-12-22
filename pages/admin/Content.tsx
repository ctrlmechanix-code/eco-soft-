
import React, { useState, useEffect } from 'react';
import { blogPosts as mockPosts } from '../../data/mockData';
import { Edit2, Eye, Trash2, Plus, X, Save } from 'lucide-react';
import type { BlogPost } from '../../types';

const AdminContent = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<Partial<BlogPost>>({});

    useEffect(() => {
        const stored = localStorage.getItem('blog_posts');
        if (stored) {
            setPosts(JSON.parse(stored));
        } else {
            setPosts(mockPosts);
            localStorage.setItem('blog_posts', JSON.stringify(mockPosts));
        }
    }, []);

    const savePosts = (newPosts: BlogPost[]) => {
        setPosts(newPosts);
        localStorage.setItem('blog_posts', JSON.stringify(newPosts));
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Delete this post?")) {
            savePosts(posts.filter(p => p.id !== id));
        }
    };

    const handleAdd = () => {
        setFormData({ 
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            status: 'Published'
        });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newPost: BlogPost = {
            id: `post-${Date.now()}`,
            title: formData.title || 'Untitled Post',
            excerpt: formData.excerpt || '',
            content: formData.content || '',
            date: formData.date || '',
            author: formData.author || 'Admin',
            category: formData.category || 'General',
            image: formData.image || 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&q=80',
            status: formData.status as any
        };
        savePosts([newPost, ...posts]);
        setIsModalOpen(false);
    };

    const inputClasses = "w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-700 dark:text-white";

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Content Management</h1>
                    <p className="text-slate-500 dark:text-slate-400">Manage blog posts, announcements, and FAQs.</p>
                </div>
                <button 
                    onClick={handleAdd}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" /> New Post
                </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <div key={post.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
                        <div className="h-40 bg-slate-100 dark:bg-slate-800 relative">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                            <span className="absolute top-2 right-2 px-2 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded text-xs font-bold text-slate-800 dark:text-white shadow-sm">
                                {post.status || 'Published'}
                            </span>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">{post.title}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{post.date} • {post.author}</p>
                            
                            <div className="mt-auto flex gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <button className="flex-1 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 rounded hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center gap-2">
                                    <Edit2 className="w-3.5 h-3.5" /> Edit
                                </button>
                                <button className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded">
                                    <Eye className="w-4 h-4" />
                                </button>
                                <button 
                                    onClick={() => handleDelete(post.id)}
                                    className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Simple Add Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg border border-slate-100 dark:border-slate-800">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">New Article</h3>
                            <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Title</label>
                                <input type="text" placeholder="Article Title" required className={inputClasses} value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Category</label>
                                <input type="text" placeholder="News, Guide, etc." className={inputClasses} value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Excerpt</label>
                                <textarea placeholder="Short summary..." rows={3} className={inputClasses} value={formData.excerpt || ''} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Cover Image URL</label>
                                <input type="text" placeholder="https://..." className={inputClasses} value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} />
                            </div>
                            <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-900/20 mt-2">Publish Post</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminContent;
