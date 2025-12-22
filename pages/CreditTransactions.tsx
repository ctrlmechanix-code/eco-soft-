
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { mockCreditTransactions, leaderboard } from '../data/mockData';
import { CreditTransaction } from '../types';
import { ArrowUpRight, ArrowDownLeft, Coins } from 'lucide-react';
import AnimatedCounter from '../components/ui/AnimatedCounter';

const PageWrapper = ({ children }: { children?: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
    >
        {children}
    </motion.div>
);

const CreditTransactions = () => {
    const [transactions, setTransactions] = useState<CreditTransaction[]>([]);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        // Load transactions
        const storedTxns = JSON.parse(localStorage.getItem('credit_transactions') || '[]');
        const all = [...storedTxns, ...mockCreditTransactions].sort((a, b) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setTransactions(all);

        // Get current balance
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const currentUser = storedUsers.find((u: any) => u.id === 'USR-CURRENT') || leaderboard.find(u => u.isUser);
        setBalance(currentUser ? currentUser.points : 0);
    }, []);

    return (
        <PageWrapper>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Transaction History</h1>
                    <p className="text-slate-500">A detailed ledger of your green credits.</p>
                </div>
                <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-right shadow-lg">
                    <p className="text-xs text-slate-400 uppercase font-bold">Current Balance</p>
                    <p className="text-2xl font-black"><AnimatedCounter to={balance} /></p>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="divide-y divide-slate-100">
                    {transactions.map((txn) => (
                        <div key={txn.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    txn.type === 'earned' || txn.type === 'refunded'
                                    ? 'bg-emerald-100 text-emerald-600' 
                                    : 'bg-amber-100 text-amber-600'
                                }`}>
                                    {txn.type === 'earned' || txn.type === 'refunded' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">{txn.description}</p>
                                    <p className="text-xs text-slate-500">{new Date(txn.timestamp).toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`font-bold text-lg ${
                                    txn.type === 'earned' || txn.type === 'refunded' ? 'text-emerald-600' : 'text-slate-900'
                                }`}>
                                    {txn.amount > 0 ? '+' : ''}{txn.amount}
                                </p>
                                {txn.balance !== undefined && (
                                    <p className="text-xs text-slate-400">Bal: {txn.balance}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PageWrapper>
    );
};

export default CreditTransactions;
