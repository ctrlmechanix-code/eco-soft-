
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { mockSubmissions } from '../data/mockData';
import type { Submission } from '../types';
import { ListTodo, CheckCircle2, Clock, MapPin, Ticket, ChevronRight, Package, Loader2, AlertCircle } from 'lucide-react';

const PageWrapper = ({ children }: { children?: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
    >
        {children}
    </motion.div>
);

const Submissions = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadSubmissions();
    }, []);

    const loadSubmissions = () => {
        setIsLoading(true);
        const localSubmissions = JSON.parse(localStorage.getItem('user_submissions') || '[]');
        const all = [...mockSubmissions, ...localSubmissions].sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setSubmissions(all);
        setIsLoading(false);
    };

    const markAsDropped = (id: string) => {
        const updated = submissions.map(sub => {
            if (sub.id === id) {
                return { 
                    ...sub, 
                    status: 'DROPPED' as const, 
                    droppedAt: new Date().toISOString() 
                };
            }
            return sub;
        });
        
        // Save back to local storage (only the non-mock ones ideally, but for now simplify)
        const localOnes = updated.filter(u => !mockSubmissions.find(m => m.id === u.id));
        localStorage.setItem('user_submissions', JSON.stringify(localOnes));
        
        // Also update local state for UI
        setSubmissions(updated);
    };

    const activeSubmissions = submissions.filter(s => s.status === 'PENDING' || s.status === 'DROPPED');
    const completedSubmissions = submissions.filter(s => s.status === 'COMPLETED');

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'PENDING': return <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold uppercase rounded-full border border-amber-200">Pending</span>;
            case 'DROPPED': return <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase rounded-full border border-blue-200">Dropped</span>;
            case 'COMPLETED': return <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded-full border border-emerald-200">Completed</span>;
            default: return null;
        }
    };

    return (
        <PageWrapper>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">My Submissions</h1>
                    <p className="text-slate-500 mt-1">Track your items from report to verified recycling.</p>
                </div>
                
                <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
                    <button 
                        onClick={() => setActiveTab('active')}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'active' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                        Active ({activeSubmissions.length})
                    </button>
                    <button 
                        onClick={() => setActiveTab('completed')}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'completed' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                        History ({completedSubmissions.length})
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div key="loading" className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
                    </motion.div>
                ) : (
                    <motion.div 
                        key={activeTab}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="space-y-4"
                    >
                        {(activeTab === 'active' ? activeSubmissions : completedSubmissions).length > 0 ? (
                            (activeTab === 'active' ? activeSubmissions : completedSubmissions).map((sub) => (
                                <div key={sub.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <div className="p-6 md:p-8 flex flex-col lg:flex-row lg:items-center gap-6">
                                        <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0 border border-slate-100">
                                            <Package className="w-8 h-8" />
                                        </div>
                                        
                                        <div className="flex-grow">
                                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                                <span className="text-xs font-mono text-slate-400">{sub.id}</span>
                                                {getStatusBadge(sub.status)}
                                                <span className="text-xs text-slate-500 px-2 py-0.5 bg-slate-100 rounded-md">
                                                    {sub.category}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-2">{sub.recommendation} Recommendation</h3>
                                            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                                <span className="flex items-center gap-1.5">
                                                    <Clock className="w-4 h-4 text-slate-400" /> Reported {new Date(sub.createdAt).toLocaleDateString()}
                                                </span>
                                                {sub.droppedAt && (
                                                    <span className="flex items-center gap-1.5">
                                                        <MapPin className="w-4 h-4 text-blue-500" /> Dropped {new Date(sub.droppedAt).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row items-center gap-6 lg:border-l lg:border-slate-100 lg:pl-8">
                                            <div className="text-center sm:text-right">
                                                {sub.status === 'COMPLETED' ? (
                                                    <>
                                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Awarded</p>
                                                        <p className="text-2xl font-black text-emerald-600">{sub.creditsAwarded} Pts</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Potential</p>
                                                        <p className="text-2xl font-black text-amber-500">{sub.creditsPending} Pts</p>
                                                    </>
                                                )}
                                            </div>

                                            {sub.status === 'PENDING' ? (
                                                <button 
                                                    onClick={() => markAsDropped(sub.id)}
                                                    className="w-full sm:w-auto px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                                                >
                                                    Mark as Dropped
                                                </button>
                                            ) : sub.status === 'DROPPED' ? (
                                                <div className="w-full sm:w-auto px-6 py-3 bg-slate-100 text-slate-500 rounded-xl font-bold border border-slate-200 flex items-center justify-center gap-2">
                                                    <Clock className="w-4 h-4" /> Waiting verification...
                                                </div>
                                            ) : (
                                                <div className="w-full sm:w-auto px-6 py-3 bg-emerald-50 text-emerald-600 rounded-xl font-bold border border-emerald-100 flex items-center justify-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4" /> Verified
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {sub.status !== 'COMPLETED' && (
                                        <div className="px-6 md:px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                                    <Ticket className="w-3.5 h-3.5" /> Drop-off Code:
                                                </div>
                                                <span className="font-mono font-black text-slate-900">{sub.dropOffCode}</span>
                                            </div>
                                            <button className="text-emerald-600 hover:text-emerald-700 transition-colors text-xs font-bold flex items-center gap-1">
                                                Details <ChevronRight className="w-3 h-3" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="bg-white rounded-3xl border border-slate-200 p-20 text-center">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                                    <ListTodo className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">No {activeTab} submissions</h3>
                                <p className="text-slate-500 mb-8 max-w-xs mx-auto">
                                    {activeTab === 'active' 
                                        ? "You don't have any pending reports. Start by reporting your first item!"
                                        : "Your completed contribution history will appear here once items are verified."}
                                </p>
                                {activeTab === 'active' && (
                                    <button 
                                        onClick={() => navigate('/categories')}
                                        className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg"
                                    >
                                        Report Waste
                                    </button>
                                )}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {activeSubmissions.length > 0 && activeTab === 'active' && (
              <div className="mt-12 p-8 bg-blue-50 rounded-3xl border border-blue-100 flex flex-col md:flex-row items-center gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-500 shrink-0 border border-blue-50">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-blue-900 mb-1">Verification Tip</h4>
                  <p className="text-blue-700/70 text-sm leading-relaxed">
                    Make sure to show your drop-off code to the campus recycling agent. Once they scan or enter it, your credits will be verified and awarded within 24 hours.
                  </p>
                </div>
              </div>
            )}
        </PageWrapper>
    );
};

export default Submissions;
