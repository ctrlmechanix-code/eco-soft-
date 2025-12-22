
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

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Content Management</h1>
                    <p className="text-slate-500">Manage blog posts, announcements, and FAQs.</p>
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
                    <div key={post.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="h-40 bg-slate-100 relative">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                            <span className="absolute top-2 right-2 px-2 py-1 bg-white/90 rounded text-xs font-bold text-slate-800 shadow-sm">
                                {post.status || 'Published'}
                            </span>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <h3 className="font-bold text-slate-900 mb-2 line-clamp-2">{post.title}</h3>
                            <p className="text-xs text-slate-500 mb-4">{post.date} • {post.author}</p>
                            
                            <div className="mt-auto flex gap-2 pt-4 border-t border-slate-100">
                                <button className="flex-1 py-2 text-sm font-medium text-slate-600 bg-slate-50 rounded hover:bg-slate-100 flex items-center justify-center gap-2">
                                    <Edit2 className="w-3.5 h-3.5" /> Edit
                                </button>
                                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                                    <Eye className="w-4 h-4" />
                                </button>
                                <button 
                                    onClick={() => handleDelete(post.id)}
                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
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
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900">New Article</h3>
                            <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <input type="text" placeholder="Title" required className="w-full px-3 py-2 border rounded-lg" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
                            <input type="text" placeholder="Category" className="w-full px-3 py-2 border rounded-lg" value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} />
                            <textarea placeholder="Excerpt" rows={3} className="w-full px-3 py-2 border rounded-lg" value={formData.excerpt || ''} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
                            <input type="text" placeholder="Image URL" className="w-full px-3 py-2 border rounded-lg" value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} />
                            <button type="submit" className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">Publish Post</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminContent;
