
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { mockRedemptions } from '../data/mockData';
import type { RedemptionTransaction } from '../types';
import { Clock, CheckCircle2, XCircle, Copy, AlertCircle, Calendar } from 'lucide-react';

const PageWrapper = ({ children }: { children?: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
    >
        {children}
    </motion.div>
);

const MyRedemptions = () => {
    const [activeTab, setActiveTab] = useState<'active' | 'pending' | 'history'>('active');
    const [redemptions, setRedemptions] = useState<RedemptionTransaction[]>([]);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('user_redemptions') || '[]');
        const all = [...stored, ...mockRedemptions].sort((a, b) => 
            new Date(b.redeemedAt).getTime() - new Date(a.redeemedAt).getTime()
        );
        // Deduplicate
        const unique = Array.from(new Map(all.map(item => [item.id, item])).values());
        setRedemptions(unique);
    }, []);

    const copyCode = (code: string, id: string) => {
        navigator.clipboard.writeText(code);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const activeRedemptions = redemptions.filter(r => 
        r.status === 'approved' && (!r.expiresAt || new Date(r.expiresAt) > new Date())
    );
    
    const pendingRedemptions = redemptions.filter(r => r.status === 'pending');
    
    const historyRedemptions = redemptions.filter(r => 
        r.status === 'fulfilled' || r.status === 'rejected' || r.status === 'cancelled' || 
        (r.status === 'approved' && r.expiresAt && new Date(r.expiresAt) < new Date())
    );

    return (
        <PageWrapper>
            <h1 className="text-3xl font-bold text-slate-900 mb-8">My Redemptions</h1>

            <div className="flex border-b border-slate-200 mb-8">
                {[
                    { id: 'active', label: 'Active Codes' },
                    { id: 'pending', label: 'Pending Approval' },
                    { id: 'history', label: 'History' }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors ${
                            activeTab === tab.id 
                            ? 'border-emerald-500 text-emerald-700' 
                            : 'border-transparent text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {activeTab === 'active' && (
                    <>
                        {activeRedemptions.length === 0 && <p className="text-slate-500">No active rewards.</p>}
                        {activeRedemptions.map(redemption => (
                            <motion.div 
                                key={redemption.id}
                                layoutId={redemption.id}
                                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-1 rounded-md bg-emerald-100 text-emerald-700 text-xs font-bold uppercase">Active</span>
                                        <h3 className="font-bold text-slate-900">{redemption.rewardName}</h3>
                                    </div>
                                    <p className="text-slate-500 text-sm mb-4">{redemption.notes || "Use this code at the designated location."}</p>
                                    
                                    {redemption.expiresAt && (
                                        <div className="flex items-center gap-1.5 text-xs text-amber-600 font-medium bg-amber-50 inline-block px-2 py-1 rounded">
                                            <Clock className="w-3.5 h-3.5" /> Expires {new Date(redemption.expiresAt).toLocaleDateString()}
                                        </div>
                                    )}
                                </div>

                                <div className="w-full md:w-auto bg-slate-50 p-4 rounded-xl border border-slate-200 border-dashed text-center min-w-[200px]">
                                    <p className="text-xs text-slate-400 uppercase font-bold mb-2">Redemption Code</p>
                                    <p className="text-2xl font-mono font-black text-slate-800 mb-3 tracking-wider">{redemption.redemptionCode}</p>
                                    <button 
                                        onClick={() => copyCode(redemption.redemptionCode!, redemption.id)}
                                        className="w-full py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-emerald-600 hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2"
                                    >
                                        {copiedId === redemption.id ? <><CheckCircle2 className="w-4 h-4"/> Copied</> : <><Copy className="w-4 h-4"/> Copy Code</>}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </>
                )}

                {activeTab === 'pending' && (
                    <>
                        {pendingRedemptions.length === 0 && <p className="text-slate-500">No pending redemptions.</p>}
                        {pendingRedemptions.map(redemption => (
                            <div key={redemption.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="px-2 py-1 rounded-md bg-amber-100 text-amber-700 text-xs font-bold uppercase">Processing</span>
                                            <h3 className="font-bold text-slate-900">{redemption.rewardName}</h3>
                                        </div>
                                        <p className="text-sm text-slate-500">Request submitted on {new Date(redemption.redeemedAt).toLocaleDateString()}. Pending admin approval.</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="block font-bold text-slate-900">{redemption.creditsCost} pts</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {activeTab === 'history' && (
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Reward</th>
                                    <th className="px-6 py-4 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {historyRedemptions.map(redemption => (
                                    <tr key={redemption.id}>
                                        <td className="px-6 py-4 text-slate-500">
                                            {new Date(redemption.redeemedAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            {redemption.rewardName}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {redemption.status === 'rejected' && <span className="text-red-600 font-bold bg-red-50 px-2 py-1 rounded text-xs">Rejected</span>}
                                            {redemption.status === 'fulfilled' && <span className="text-slate-600 bg-slate-100 px-2 py-1 rounded text-xs">Used</span>}
                                            {redemption.status === 'approved' && <span className="text-amber-600 bg-amber-50 px-2 py-1 rounded text-xs">Expired</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {historyRedemptions.length === 0 && <p className="p-6 text-slate-500 text-center">No history available.</p>}
                    </div>
                )}
            </div>
        </PageWrapper>
    );
};

export default MyRedemptions;
