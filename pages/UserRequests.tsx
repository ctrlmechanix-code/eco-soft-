
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Clock, CheckCircle2, AlertCircle, Search, ChevronRight, Plus, Trash2, X } from 'lucide-react';
import { UserRequest } from '../types';
import { mockRequests } from '../data/mockData';

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

const UserRequests = () => {
    const navigate = useNavigate();
    const [requests, setRequests] = useState<UserRequest[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [requestToDelete, setRequestToDelete] = useState<UserRequest | null>(null);

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = () => {
        // Load requests from localStorage
        const stored = localStorage.getItem('user_requests');
        const deletedIdsJson = localStorage.getItem('deleted_request_ids');
        const deletedIds: string[] = deletedIdsJson ? JSON.parse(deletedIdsJson) : [];

        let localRequests: UserRequest[] = stored ? JSON.parse(stored) : [];
        
        // Combine local requests with mock requests
        const allRequests = [...localRequests, ...mockRequests];
        
        // Remove duplicates and apply deletions
        const uniqueRequests = Array.from(new Map(allRequests.map(item => [item.id, item])).values())
            .filter(req => !deletedIds.includes(req.id));

        setRequests(uniqueRequests.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    };

    const confirmDelete = (request: UserRequest) => {
        setRequestToDelete(request);
    };

    const handleDelete = () => {
        if (!requestToDelete) return;

        // 1. Remove from local storage user_requests if it exists there
        const stored = localStorage.getItem('user_requests');
        if (stored) {
            const localRequests: UserRequest[] = JSON.parse(stored);
            const filteredLocal = localRequests.filter(r => r.id !== requestToDelete.id);
            localStorage.setItem('user_requests', JSON.stringify(filteredLocal));
        }

        // 2. Track deleted IDs to hide mock data persistently
        const deletedIdsJson = localStorage.getItem('deleted_request_ids');
        const deletedIds: string[] = deletedIdsJson ? JSON.parse(deletedIdsJson) : [];
        if (!deletedIds.includes(requestToDelete.id)) {
            deletedIds.push(requestToDelete.id);
            localStorage.setItem('deleted_request_ids', JSON.stringify(deletedIds));
        }

        // Refresh UI
        loadRequests();
        setRequestToDelete(null);
    };

    const filteredRequests = requests.filter(req =>
        req.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: UserRequest['status']) => {
        switch (status) {
            case 'Resolved': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800';
            case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800';
            case 'Closed': return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
            default: return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800';
        }
    };

    const getStatusIcon = (status: UserRequest['status']) => {
        switch (status) {
            case 'Resolved': return <CheckCircle2 className="w-4 h-4" />;
            case 'In Progress': return <Clock className="w-4 h-4" />;
            case 'Closed': return <CheckCircle2 className="w-4 h-4" />;
            default: return <AlertCircle className="w-4 h-4" />;
        }
    };

    return (
        <PageWrapper>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Requests</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Track the status of your support tickets and feedback.</p>
                </div>
                <button
                    onClick={() => navigate('/feedback')}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-lg hover:-translate-y-0.5"
                >
                    <Plus className="w-4 h-4" /> New Request
                </button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                {/* Filters / Search */}
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search by ID or subject..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                        />
                    </div>
                </div>

                {/* List */}
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredRequests.length > 0 ? (
                        filteredRequests.map((request) => (
                            <motion.div
                                key={request.id}
                                layoutId={request.id}
                                className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group relative"
                            >
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="font-mono text-xs text-slate-400 dark:text-slate-500">#{request.id}</span>
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border flex items-center gap-1.5 ${getStatusColor(request.status)}`}>
                                                {getStatusIcon(request.status)}
                                                {request.status}
                                            </span>
                                            <span className="text-xs text-slate-500 dark:text-slate-400 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
                                                {request.type}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">{request.subject}</h3>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-3">{request.message}</p>
                                        
                                        {request.response && (
                                            <div className="mt-3 bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 p-3 rounded-xl">
                                                <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1 flex items-center gap-1">
                                                    <MessageSquare className="w-3 h-3" /> Admin Response:
                                                </p>
                                                <p className="text-sm text-slate-700 dark:text-slate-300">{request.response}</p>
                                            </div>
                                        )}
                                        
                                        <div className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                                            Submitted on {new Date(request.date).toLocaleDateString(undefined, { dateStyle: 'long' })}
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 self-start md:self-center">
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                confirmDelete(request);
                                            }}
                                            className="p-2 rounded-lg text-slate-300 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                                            title="Delete Request"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                        <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors" />
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400 dark:text-slate-500">
                                <MessageSquare className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No requests found</h3>
                            <p className="text-slate-500 dark:text-slate-400 mb-6">You haven't submitted any requests yet.</p>
                            <button
                                onClick={() => navigate('/feedback')}
                                className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
                            >
                                Submit your first request
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {requestToDelete && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setRequestToDelete(null)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl p-8 border border-slate-100 dark:border-slate-800"
                        >
                            <button 
                                onClick={() => setRequestToDelete(null)}
                                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="w-14 h-14 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center mb-6">
                                <AlertCircle className="w-7 h-7" />
                            </div>

                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Delete Request?</h3>
                            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                                Are you sure you want to remove <span className="font-semibold text-slate-800 dark:text-slate-200">"{requestToDelete.subject}"</span>? This action cannot be undone and the request will be permanently removed from your list.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={() => setRequestToDelete(null)}
                                    className="flex-1 px-6 py-3.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="flex-1 px-6 py-3.5 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-900/20 active:scale-95"
                                >
                                    Delete Request
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </PageWrapper>
    );
};

export default UserRequests;
