
import React, { useState, useEffect } from 'react';
import { mockTestimonials } from '../../data/mockData';
import { Trash2, Search, Quote } from 'lucide-react';
import { Testimonial } from '../../types';

const AdminTestimonials = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('testimonials') || '[]');
        if (stored.length > 0) {
            setTestimonials(stored);
        } else {
            setTestimonials(mockTestimonials);
            localStorage.setItem('testimonials', JSON.stringify(mockTestimonials));
        }
    }, []);

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to remove this testimonial?")) {
            const updated = testimonials.filter(t => t.id !== id);
            setTestimonials(updated);
            localStorage.setItem('testimonials', JSON.stringify(updated));
        }
    };

    const filteredTestimonials = testimonials.filter(t => 
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        t.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Testimonial Management</h1>
                    <p className="text-slate-500 dark:text-slate-400">Review and manage user stories.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    <div className="relative max-w-sm w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search stories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all text-sm text-slate-900 dark:text-white"
                        />
                    </div>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredTestimonials.length > 0 ? (
                        filteredTestimonials.map((t) => (
                            <div key={t.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-start gap-4 group">
                                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                                    <Quote className="w-5 h-5 text-emerald-500" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white">{t.name}</h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                                        </div>
                                        <button 
                                            onClick={() => handleDelete(t.id)}
                                            className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-300 italic">"{t.content}"</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                            No testimonials found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminTestimonials;
