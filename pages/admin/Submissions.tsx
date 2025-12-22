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
        // Load users from storage or fall back to mock
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        let users: LeaderboardUser[] = storedUsers.length > 0 ? storedUsers : [...leaderboard];
        
        // Find user
        const userIndex = users.findIndex(u => u.id === userId || u.name === userId); // Fallback to name if ID missing in mock
        
        if (userIndex >= 0) {
            users[userIndex] = {
                ...users[userIndex],
                points: users[userIndex].points + amount
            };
            localStorage.setItem('users', JSON.stringify(users));
            return true;
        }
        return false;
    };

    const updateSubmissionStatus = (id: string, status: Submission['status'], reason?: string) => {
        const submission = submissions.find(s => s.id === id);
        if (!submission) return;

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
            adminName: 'Student User',
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
            updateUserCredits(submission.userId, submission.creditsPending);
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
                    <h1 className="text-2xl font-bold text-slate-900">Submission Verification</h1>
                    <p className="text-slate-500">Review and verify drop-offs to award credits.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-slate-200 overflow-x-auto">
                    <button 
                        onClick={() => setFilterStatus('DROPPED')}
                        className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${filterStatus === 'DROPPED' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                    >
                        Pending Verification
                    </button>
                    <button 
                        onClick={() => setFilterStatus('COMPLETED')}
                        className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${filterStatus === 'COMPLETED' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                    >
                        Verified History
                    </button>
                    <button 
                        onClick={() => setFilterStatus('REJECTED')}
                        className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${filterStatus === 'REJECTED' ? 'border-red-500 text-red-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                    >
                        Rejected
                    </button>
                </div>

                {/* Toolbar */}
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row justify-between gap-4">
                    <div className="relative max-w-sm w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search ID, user, code..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
                        />
                    </div>
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 text-sm font-medium hover:bg-slate-50 flex items-center gap-2 justify-center">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
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
                        <tbody className="divide-y divide-slate-100">
                            {filteredSubmissions.length > 0 ? (
                                filteredSubmissions.map((sub) => (
                                    <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-slate-500">{sub.id}</td>
                                        <td className="px-6 py-4 font-medium text-slate-900">{sub.userName || 'Unknown'}</td>
                                        <td className="px-6 py-4">
                                            <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs whitespace-nowrap">{sub.category}</span>
                                        </td>
                                        <td className="px-6 py-4 font-mono font-bold">{sub.dropOffCode}</td>
                                        <td className="px-6 py-4">
                                            {sub.status === 'PENDING' && <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs font-bold flex w-fit items-center gap-1"><Clock className="w-3 h-3"/> Pending</span>}
                                            {sub.status === 'DROPPED' && <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-bold flex w-fit items-center gap-1"><AlertCircle className="w-3 h-3"/> Dropped</span>}
                                            {sub.status === 'COMPLETED' && <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-bold flex w-fit items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Verified</span>}
                                            {sub.status === 'REJECTED' && <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold flex w-fit items-center gap-1"><XCircle className="w-3 h-3"/> Rejected</span>}
                                        </td>
                                        <td className="px-6 py-4 text-right font-bold text-slate-900">
                                            {sub.status === 'COMPLETED' ? sub.creditsAwarded : sub.creditsPending}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                {filterStatus === 'DROPPED' && (
                                                    <>
                                                        <button 
                                                            onClick={() => handleVerify(sub.id)}
                                                            className="p-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
                                                            title="Verify & Award"
                                                        >
                                                            <CheckCircle2 className="w-4 h-4" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleReject(sub.id)}
                                                            className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                                                            title="Reject"
                                                        >
                                                            <XCircle className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                )}
                                                <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors" title="View Details">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
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