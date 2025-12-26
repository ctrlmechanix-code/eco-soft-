
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { mockSubmissions } from '../data/mockData';
import type { Submission } from '../types';
import { ListTodo, CheckCircle2, Clock, MapPin, Ticket, ChevronRight, Package, Loader2, AlertCircle, X, Info } from 'lucide-react';

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
    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

    useEffect(() => {
        loadSubmissions();
    }, []);

    const loadSubmissions = () => {
        setIsLoading(true);
        const localSubmissions = JSON.parse(localStorage.getItem('user_submissions') || '[]');
        
        // Deduplicate: Local storage overrides mock data if IDs match
        const allSubsMap = new Map();
        mockSubmissions.forEach(s => allSubsMap.set(s.id, s));
        localSubmissions.forEach((s: Submission) => allSubsMap.set(s.id, s));
        
        const all = Array.from(allSubsMap.values()).sort((a: any, b: any) => 
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
        
        setSubmissions(updated);

        // Update Local Storage for persistence across pages (Admin Panel)
        const updatedItem = updated.find(u => u.id === id);
        if (updatedItem) {
            const stored = JSON.parse(localStorage.getItem('user_submissions') || '[]');
            const existingIndex = stored.findIndex((s: Submission) => s.id === id);
            
            let newStored;
            if (existingIndex >= 0) {
                newStored = [...stored];
                newStored[existingIndex] = updatedItem;
            } else {
                // If it was a mock item not yet in storage, add it now
                newStored = [updatedItem, ...stored];
            }
            localStorage.setItem('user_submissions', JSON.stringify(newStored));
        }
    };

    const activeSubmissions = submissions.filter(s => s.status === 'PENDING' || s.status === 'DROPPED');
    const completedSubmissions = submissions.filter(s => s.status === 'COMPLETED' || s.status === 'REJECTED');

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'PENDING': return <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-bold uppercase rounded-full border border-amber-200 dark:border-amber-800">Pending</span>;
            case 'DROPPED': return <span className="px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-bold uppercase rounded-full border border-blue-200 dark:border-blue-800">Dropped</span>;
            case 'COMPLETED': return <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase rounded-full border border-emerald-200 dark:border-emerald-800">Completed</span>;
            case 'REJECTED': return <span className="px-2.5 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-[10px] font-bold uppercase rounded-full border border-red-200 dark:border-red-800">Rejected</span>;
            default: return null;
        }
    };

    return (
        <PageWrapper>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Submissions</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Track your items from report to verified recycling.</p>
                </div>
                
                <div className="flex bg-white dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <button 
                        onClick={() => setActiveTab('active')}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'active' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                    >
                        Active ({activeSubmissions.length})
                    </button>
                    <button 
                        onClick={() => setActiveTab('completed')}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'completed' ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
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
                                <div key={sub.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <div className="p-6 md:p-8 flex flex-col lg:flex-row lg:items-center gap-6">
                                        <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 shrink-0 border border-slate-100 dark:border-slate-700">
                                            <Package className="w-8 h-8" />
                                        </div>
                                        
                                        <div className="flex-grow">
                                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                                <span className="text-xs font-mono text-slate-400">{sub.id}</span>
                                                {getStatusBadge(sub.status)}
                                                <span className="text-xs text-slate-500 dark:text-slate-400 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md">
                                                    {sub.category}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{sub.recommendation} Recommendation</h3>
                                            <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
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

                                        <div className="flex flex-col sm:flex-row items-center gap-6 lg:border-l lg:border-slate-100 dark:lg:border-slate-800 lg:pl-8">
                                            <div className="text-center sm:text-right">
                                                {sub.status === 'COMPLETED' ? (
                                                    <>
                                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Awarded</p>
                                                        <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{sub.creditsAwarded} Pts</p>
                                                    </>
                                                ) : sub.status === 'REJECTED' ? (
                                                    <>
                                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                                        <p className="text-2xl font-black text-red-500">Rejected</p>
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
                                                    className="w-full sm:w-auto px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:bg-emerald-600 dark:hover:bg-emerald-200 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                                                >
                                                    Mark as Dropped
                                                </button>
                                            ) : sub.status === 'DROPPED' ? (
                                                <div className="w-full sm:w-auto px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-xl font-bold border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2">
                                                    <Clock className="w-4 h-4" /> Waiting verification...
                                                </div>
                                            ) : sub.status === 'REJECTED' ? (
                                                <div className="w-full sm:w-auto px-6 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl font-bold border border-red-100 dark:border-red-800 flex items-center justify-center gap-2">
                                                    <X className="w-4 h-4" /> Issue Found
                                                </div>
                                            ) : (
                                                <div className="w-full sm:w-auto px-6 py-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl font-bold border border-emerald-100 dark:border-emerald-800 flex items-center justify-center gap-2">
                                                    <CheckCircle2 className="w-4 h-4" /> Verified
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="px-6 md:px-8 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                                                <Ticket className="w-3.5 h-3.5" /> Drop-off Code:
                                            </div>
                                            <span className="font-mono font-black text-slate-900 dark:text-white">{sub.dropOffCode}</span>
                                        </div>
                                        <button 
                                            onClick={() => setSelectedSubmission(sub)}
                                            className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors text-xs font-bold flex items-center gap-1"
                                        >
                                            Details <ChevronRight className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-20 text-center">
                                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200 dark:text-slate-700">
                                    <ListTodo className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No {activeTab} submissions</h3>
                                <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xs mx-auto">
                                    {activeTab === 'active' 
                                        ? "You don't have any pending reports. Start by reporting your first item!"
                                        : "Your completed contribution history will appear here once items are verified."}
                                </p>
                                {activeTab === 'active' && (
                                    <button 
                                        onClick={() => navigate('/categories')}
                                        className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:bg-emerald-600 dark:hover:bg-slate-200 transition-all shadow-lg"
                                    >
                                        Report Waste
                                    </button>
                                )}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Details Modal - Z-Index Increased to 100 */}
            <AnimatePresence>
                {selectedSubmission && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedSubmission(null)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl p-8 border border-slate-100 dark:border-slate-800 overflow-hidden"
                        >
                            <button 
                                onClick={() => setSelectedSubmission(null)}
                                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-mono font-bold">
                                    {selectedSubmission.id}
                                </span>
                                {getStatusBadge(selectedSubmission.status)}
                            </div>

                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{selectedSubmission.category}</h2>
                            <p className="text-slate-500 dark:text-slate-400 mb-8">{selectedSubmission.recommendation} Recommendation</p>

                            <div className="space-y-4">
                                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Device Condition</p>
                                    <p className="text-slate-900 dark:text-white font-medium">{selectedSubmission.condition}</p>
                                </div>
                                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">User Intent</p>
                                    <p className="text-slate-900 dark:text-white font-medium">{selectedSubmission.intent}</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-1 p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-800/30">
                                        <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1">Credits</p>
                                        <p className="text-xl font-black text-emerald-700 dark:text-emerald-400">
                                            {selectedSubmission.status === 'COMPLETED' ? selectedSubmission.creditsAwarded : selectedSubmission.creditsPending}
                                        </p>
                                    </div>
                                    <div className="flex-1 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800/30">
                                        <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">Drop Code</p>
                                        <p className="text-xl font-mono font-black text-blue-700 dark:text-blue-400">{selectedSubmission.dropOffCode}</p>
                                    </div>
                                </div>
                            </div>

                            {selectedSubmission.rejectedReason && (
                                <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-100 dark:border-red-800">
                                    <div className="flex items-center gap-2 mb-1 text-red-700 dark:text-red-400 font-bold text-sm">
                                        <AlertCircle className="w-4 h-4" /> Rejection Reason
                                    </div>
                                    <p className="text-red-600 dark:text-red-300 text-sm">{selectedSubmission.rejectedReason}</p>
                                </div>
                            )}

                            {selectedSubmission.status === 'PENDING' && (
                                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <button 
                                        onClick={() => {
                                            markAsDropped(selectedSubmission.id);
                                            setSelectedSubmission(null);
                                        }}
                                        className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:bg-emerald-600 dark:hover:bg-slate-200 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        Mark as Dropped Now
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {activeSubmissions.length > 0 && activeTab === 'active' && (
              <div className="mt-12 p-8 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-900/20 flex flex-col md:flex-row items-center gap-6">
                <div className="w-14 h-14 bg-white dark:bg-blue-900/30 rounded-2xl shadow-sm flex items-center justify-center text-blue-500 dark:text-blue-400 shrink-0 border border-blue-50 dark:border-blue-800">
                  <Info className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-1">Verification Tip</h4>
                  <p className="text-blue-700/70 dark:text-blue-300/70 text-sm leading-relaxed">
                    Make sure to show your drop-off code to the campus recycling agent. Once they scan or enter it, your credits will be verified and awarded within 24 hours.
                  </p>
                </div>
              </div>
            )}
        </PageWrapper>
    );
};

export default Submissions;
        