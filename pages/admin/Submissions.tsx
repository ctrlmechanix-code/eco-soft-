
import React, { useState, useEffect } from 'react';
import { mockSubmissions, leaderboard } from '../../data/mockData';
import type { Submission, ActivityLog, LeaderboardUser } from '../../types';
import { CheckCircle2, XCircle, Search, Filter, Eye, Clock, AlertCircle } from 'lucide-react';

const AdminSubmissions = () => {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [filterStatus, setFilterStatus] = useState<'PENDING' | 'DROPPED' | 'COMPLETED' | 'REJECTED'>('DROPPED');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Load submissions
        const storedSubs = JSON.parse(localStorage.getItem('user_submissions') || '[]');
        // Merge with mock if not present (simple dedup by ID)
        const allSubsMap = new Map();
        mockSubmissions.forEach(s => allSubsMap.set(s.id, s));
        storedSubs.forEach((s: Submission) => allSubsMap.set(s.id, s));
        
        setSubmissions(Array.from(allSubsMap.values()));
    }, []);

    const updateUserCredits = (userId: string, amount: number) => {
        // 1. Get existing users from storage
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        
        // 2. We need to handle a mix of "Mock Users" (who might not be in storage yet)
        // and "New Users" (who are definitely in storage).
        
        // Create a map of all known users from mock data + storage
        const userMap = new Map<string, LeaderboardUser>();
        leaderboard.forEach(u => { if (u.id) userMap.set(u.id, u); });
        storedUsers.forEach((u: LeaderboardUser) => { if (u.id) userMap.set(u.id, u); });

        // 3. Find the specific user to update
        const targetUser = userMap.get(userId);

        if (targetUser) {
            // Update points
            const updatedUser = {
                ...targetUser,
                points: targetUser.points + amount
            };
            
            // Put updated user back into the map
            userMap.set(userId, updatedUser);
            
            // 4. Save the ENTIRE state of users back to localStorage so GreenCredits.tsx can read it.
            // We convert map values back to array.
            const allUsers = Array.from(userMap.values());
            localStorage.setItem('users', JSON.stringify(allUsers));
            
            // Also update 'currentUser' if the admin happens to be verifying their own submission (edge case)
            const currentSession = localStorage.getItem('currentUser');
            if (currentSession) {
                const currentUser = JSON.parse(currentSession);
                if (currentUser.id === userId) {
                    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
                }
            }
            
            return true;
        }
        return false;
    };

    const updateSubmissionStatus = (id: string, status: Submission['status'], reason?: string) => {
        const submission = submissions.find(s => s.id === id);
        if (!submission) return;

        // Prevent double credits if already completed
        if (submission.status === 'COMPLETED' && status === 'COMPLETED') {
            alert("This submission is already verified.");
            return;
        }

        const updatedSub: Submission = {
            ...submission,
            status,
            verifiedAt: status === 'COMPLETED' ? new Date().toISOString() : undefined,
            creditsAwarded: status === 'COMPLETED' ? submission.creditsPending : 0,
            rejectedReason: reason
        };

        const updatedSubs = submissions.map(sub => sub.id === id ? updatedSub : sub);
        setSubmissions(updatedSubs);
        localStorage.setItem('user_submissions', JSON.stringify(updatedSubs));

        // Create Activity Log
        const log: ActivityLog = {
            id: `ACT-${Date.now()}`,
            action: status === 'COMPLETED' ? 'SUBMISSION_VERIFIED' : 'SUBMISSION_REJECTED',
            adminId: 'USR-CURRENT',
            adminName: 'Student User', // In real app, get from auth context
            targetId: id,
            details: status === 'COMPLETED' 
                ? `Verified submission ${id}. Awarded ${submission.creditsPending} credits.` 
                : `Rejected submission ${id}. Reason: ${reason}`,
            timestamp: new Date().toISOString()
        };
        
        // Persist Log
        const logs = JSON.parse(localStorage.getItem('activity_logs') || '[]');
        localStorage.setItem('activity_logs', JSON.stringify([log, ...logs]));

        // Award Credits if completed
        if (status === 'COMPLETED' && submission.userId) {
            const success = updateUserCredits(submission.userId, submission.creditsPending);
            if (!success) {
                console.warn(`Could not find user ${submission.userId} to award credits.`);
            }
        }
    };

    const handleVerify = (id: string) => {
        if (window.confirm("Are you sure you want to verify this submission and award credits?")) {
            updateSubmissionStatus(id, 'COMPLETED');
        }
    };

    const handleReject = (id: string) => {
        const reason = window.prompt("Enter reason for rejection:");
        if (reason !== null) {
            updateSubmissionStatus(id, 'REJECTED', reason || 'No reason provided');
        }
    };

    const filteredSubmissions = submissions.filter(sub => {
        const matchesStatus = filterStatus === 'DROPPED' 
            ? (sub.status === 'DROPPED' || sub.status === 'PENDING') 
            : sub.status === filterStatus;
        const matchesSearch = sub.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              (sub.userName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                              sub.dropOffCode.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Submission Verification</h1>
                    <p className="text-slate-500 dark:text-slate-400">Review and verify drop-offs to award credits.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
                    <button 
                        onClick={() => setFilterStatus('DROPPED')}
                        className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${filterStatus === 'DROPPED' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                    >
                        Pending Verification
                    </button>
                    <button 
                        onClick={() => setFilterStatus('COMPLETED')}
                        className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${filterStatus === 'COMPLETED' ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                    >
                        Verified History
                    </button>
                    <button 
                        onClick={() => setFilterStatus('REJECTED')}
                        className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${filterStatus === 'REJECTED' ? 'border-red-500 text-red-600 dark:text-red-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                    >
                        Rejected
                    </button>
                </div>

                {/* Toolbar */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between gap-4">
                    <div className="relative max-w-sm w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search ID, user, code..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm text-slate-900 dark:text-white"
                        />
                    </div>
                    <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 justify-center">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-4">Submission ID</th>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Code</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Credits</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {filteredSubmissions.length > 0 ? (
                                filteredSubmissions.map((sub) => (
                                    <tr key={sub.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-slate-500 dark:text-slate-400">{sub.id}</td>
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{sub.userName || 'Unknown'}</td>
                                        <td className="px-6 py-4">
                                            <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded text-xs whitespace-nowrap">{sub.category}</span>
                                        </td>
                                        <td className="px-6 py-4 font-mono font-bold text-slate-900 dark:text-white">{sub.dropOffCode}</td>
                                        <td className="px-6 py-4">
                                            {sub.status === 'PENDING' && <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-full text-xs font-bold flex w-fit items-center gap-1"><Clock className="w-3 h-3"/> Pending</span>}
                                            {sub.status === 'DROPPED' && <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full text-xs font-bold flex w-fit items-center gap-1"><AlertCircle className="w-3 h-3"/> Dropped</span>}
                                            {sub.status === 'COMPLETED' && <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded-full text-xs font-bold flex w-fit items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Verified</span>}
                                            {sub.status === 'REJECTED' && <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-2 py-1 rounded-full text-xs font-bold flex w-fit items-center gap-1"><XCircle className="w-3 h-3"/> Rejected</span>}
                                        </td>
                                        <td className="px-6 py-4 text-right font-bold text-slate-900 dark:text-white">
                                            {sub.status === 'COMPLETED' ? sub.creditsAwarded : sub.creditsPending}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                {filterStatus === 'DROPPED' && (
                                                    <>
                                                        <button 
                                                            onClick={() => handleVerify(sub.id)}
                                                            className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
                                                            title="Verify & Award"
                                                        >
                                                            <CheckCircle2 className="w-4 h-4" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleReject(sub.id)}
                                                            className="p-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                                                            title="Reject"
                                                        >
                                                            <XCircle className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                )}
                                                <button className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" title="View Details">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                        No submissions found for this filter.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminSubmissions;
