
import React, { useState, useEffect } from 'react';
import { mockRequests } from '../../data/mockData';
import { MessageSquare, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import type { UserRequest } from '../../types';

const AdminRequests = () => {
    const [requests, setRequests] = useState<UserRequest[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('user_requests');
        const localRequests = stored ? JSON.parse(stored) : [];
        // Combine unique
        const all = [...localRequests, ...mockRequests].reduce((acc, current) => {
            const x = acc.find(item => item.id === current.id);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, [] as UserRequest[]);
        setRequests(all);
    }, []);

    const updateRequest = (updatedReq: UserRequest) => {
        const newRequests = requests.map(r => r.id === updatedReq.id ? updatedReq : r);
        setRequests(newRequests);
        // Persist only non-mock data properly or shadow mock data in local storage
        localStorage.setItem('user_requests', JSON.stringify(newRequests));
    };

    const handleReply = (req: UserRequest) => {
        const response = window.prompt("Enter your reply to the user:");
        if (response) {
            updateRequest({ ...req, response, status: 'In Progress' });
        }
    };

    const handleResolve = (req: UserRequest) => {
        if (window.confirm("Mark this request as resolved?")) {
            updateRequest({ ...req, status: 'Resolved' });
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Support Requests</h1>
                    <p className="text-slate-500 dark:text-slate-400">Manage user feedback and support tickets.</p>
                </div>
            </div>

            <div className="space-y-4">
                {requests.length === 0 && <p className="text-slate-500 dark:text-slate-400">No requests found.</p>}
                {requests.map((req) => (
                    <div key={req.id} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-bold border ${
                                    req.status === 'Resolved' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' :
                                    req.status === 'In Progress' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800' :
                                    'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                                }`}>
                                    {req.status}
                                </span>
                                <span className="text-sm font-mono text-slate-400">#{req.id}</span>
                            </div>
                            <span className="text-sm text-slate-500 dark:text-slate-400">{req.date}</span>
                        </div>

                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{req.subject}</h3>
                        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                            {req.message}
                        </p>

                        {req.response && (
                            <div className="mb-4 pl-4 border-l-2 border-blue-200 dark:border-blue-800">
                                <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">Your Response:</p>
                                <p className="text-sm text-slate-600 dark:text-slate-300">{req.response}</p>
                            </div>
                        )}

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400">
                                    <MessageSquare className="w-4 h-4" />
                                </div>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{req.userName || 'User'}</span>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => handleReply(req)}
                                    className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1.5 rounded-lg transition-colors"
                                >
                                    Reply
                                </button>
                                {req.status !== 'Resolved' && (
                                    <button 
                                        onClick={() => handleResolve(req)}
                                        className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                                    >
                                        <CheckCircle2 className="w-3.5 h-3.5" /> Resolve
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminRequests;
