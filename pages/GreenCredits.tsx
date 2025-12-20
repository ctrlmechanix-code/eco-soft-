
import React from 'react';
import { motion } from 'framer-motion';
import { leaderboard, achievements } from '../data/mockData';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { Trophy, Award, Zap, Crown } from 'lucide-react';
import Icon from '../components/ui/Icon';

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8"
    >
        {children}
    </motion.div>
);

const GreenCredits = () => {
    const user = leaderboard.find(u => u.isUser) || { points: 0, name: 'Guest', rank: 0, avatar: '' };

    return (
        <PageWrapper>
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="md:col-span-2 bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10 flex flex-col justify-between h-full">
                        <div>
                            <p className="text-slate-400 font-medium mb-1">Total Balance</p>
                            <h2 className="text-6xl font-black mb-2"><AnimatedCounter to={user.points} /></h2>
                            <p className="text-emerald-400 text-sm font-semibold">Green Credits Available</p>
                        </div>
                        <div className="mt-8">
                             <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium border border-white/10">
                                <Zap className="w-3 h-3 text-yellow-400" /> Top 5% Contributor
                             </div>
                        </div>
                    </div>
                </div>
                
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white flex flex-col justify-center items-center text-center shadow-lg shadow-emerald-500/20">
                     <Crown className="w-12 h-12 mb-4 text-white" />
                     <h3 className="text-2xl font-bold mb-1">Gold Tier</h3>
                     <p className="text-emerald-100 text-sm">Next tier at 500 pts</p>
                     <div className="w-full bg-black/20 h-1.5 rounded-full mt-4 overflow-hidden">
                         <div className="bg-white h-full rounded-full" style={{width: '75%'}}></div>
                     </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Leaderboard */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-amber-500" /> Leaderboard
                            </h3>
                            <span className="text-sm text-slate-400">This Month</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                                    <tr>
                                        <th className="px-6 py-4">Rank</th>
                                        <th className="px-6 py-4">User</th>
                                        <th className="px-6 py-4 text-right">Points</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {leaderboard.map((entry) => (
                                        <tr key={entry.rank} className={entry.isUser ? "bg-emerald-50/50" : "hover:bg-slate-50 transition-colors"}>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${entry.rank <= 3 ? 'bg-slate-900 text-white' : 'text-slate-500'}`}>
                                                    {entry.rank}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={entry.avatar} alt={entry.name} className="w-8 h-8 rounded-full bg-slate-100" />
                                                    <span className={`text-sm font-medium ${entry.isUser ? 'text-emerald-700' : 'text-slate-700'}`}>
                                                        {entry.name} {entry.isUser && "(You)"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right font-bold text-slate-900">
                                                {entry.points}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Achievements */}
                <div>
                     <div className="bg-white rounded-3xl border border-slate-200 p-6 h-full">
                        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Award className="w-5 h-5 text-blue-500" /> Achievements
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            {achievements.map((ach, i) => (
                                <motion.div 
                                    key={i}
                                    whileHover={{ x: 5 }}
                                    className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                        <Icon name={ach.icon as any} className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900">{ach.title}</h4>
                                        <p className="text-xs text-slate-500">{ach.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                     </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default GreenCredits;
