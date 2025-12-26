
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { leaderboard as mockLeaderboard, achievements, mockSubmissions, rewardCatalog as mockRewards } from '../data/mockData';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { Trophy, Award, Zap, Crown, Clock, Gift, ArrowRight, Medal, LogIn, Loader2 } from 'lucide-react';
import Icon from '../components/ui/Icon';
import type { Submission, Reward, LeaderboardUser } from '../types';

const PageWrapper = ({ children }: { children?: React.ReactNode }) => (
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
    const navigate = useNavigate();
    const location = useLocation();
    const [pendingTotal, setPendingTotal] = useState(0);
    const [userPoints, setUserPoints] = useState(0);
    const [featuredRewards, setFeaturedRewards] = useState<Reward[]>([]);
    const [rankedUsers, setRankedUsers] = useState<LeaderboardUser[]>([]);
    
    // Auth State
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    useEffect(() => {
        checkAuthAndLoad();
    }, []);

    const checkAuthAndLoad = () => {
        const auth = localStorage.getItem('isAuthenticated') === 'true';
        const currentUserStr = localStorage.getItem('currentUser');
        const currentUserObj = currentUserStr ? JSON.parse(currentUserStr) : null;
        
        setIsAuthenticated(auth);
        if (currentUserObj) setCurrentUserId(currentUserObj.id);
        
        // --- 1. Leaderboard Logic (Dynamic Sorting) ---
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Merge Strategy:
        // 1. Start with mock users.
        // 2. If a mock user exists in storedUsers (by ID), update their points from storage.
        // 3. Add any new users from storedUsers that aren't in mock data.
        
        const mergedMap = new Map();
        
        // Add mock users first
        mockLeaderboard.forEach(u => mergedMap.set(u.id, u));
        
        // Update/Add stored users
        storedUsers.forEach((u: LeaderboardUser) => {
            // Ensure ID exists
            if (u.id) {
                mergedMap.set(u.id, u);
            }
        });

        const allUsers = Array.from(mergedMap.values());

        // Sort by Points (Descending)
        const sortedUsers = allUsers.sort((a, b) => b.points - a.points);

        // Assign Rank dynamically based on index
        const dynamicRanking = sortedUsers.map((u, index) => ({
            ...u,
            rank: index + 1,
            // Check if this entry belongs to the currently logged-in user
            isUser: currentUserObj ? (u.id === currentUserObj.id) : false
        }));

        setRankedUsers(dynamicRanking);

        if (auth && currentUserObj) {
            // --- 2. Calculate User Specific Stats ---
            
            // Find current user's latest data in the ranked list
            const activeUser = dynamicRanking.find(u => u.id === currentUserObj.id) || currentUserObj;
            setUserPoints(activeUser.points);

            // Calculate Pending Credits
            const localSubmissions = JSON.parse(localStorage.getItem('user_submissions') || '[]');
            const allSubmissions = [...mockSubmissions, ...localSubmissions];
            
            const pending = allSubmissions.reduce((acc: number, sub: Submission) => {
                // Only count submissions for this user
                if (sub.userId === currentUserObj.id && (sub.status === 'PENDING' || sub.status === 'DROPPED')) {
                    return acc + sub.creditsPending;
                }
                return acc;
            }, 0);
            
            setPendingTotal(pending);

            // --- 3. Load Featured Rewards ---
            const storedRewards = JSON.parse(localStorage.getItem('rewards_catalog') || '[]');
            const catalog = storedRewards.length > 0 ? storedRewards : mockRewards;
            setFeaturedRewards(catalog.slice(0, 3));
        }
        
        setIsLoading(false);
    };

    if (!isLoading && !isAuthenticated) {
        return (
            <PageWrapper>
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                    <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-8 text-slate-400 dark:text-slate-500">
                        <Medal className="w-10 h-10" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Your Impact Profile</h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 max-w-md mb-10 leading-relaxed">
                        Log in to view your Green Credits balance, track your ranking on the campus leaderboard, and view your sustainability achievements.
                    </p>
                    <button 
                        onClick={() => navigate('/auth', { state: { from: location } })}
                        className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 flex items-center gap-2"
                    >
                        <LogIn className="w-5 h-5" /> Sign In to View Credits
                    </button>
                </div>
            </PageWrapper>
        );
    }

    if (isLoading) {
        return (
            <PageWrapper>
                <div className="flex justify-center py-20">
                    <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
                </div>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="md:col-span-2 bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10 flex flex-col justify-between h-full">
                        <div className="flex flex-col md:flex-row md:items-end gap-8 mb-6">
                          <div>
                              <p className="text-slate-400 font-medium mb-1">Total Balance</p>
                              <h2 className="text-6xl font-black mb-2"><AnimatedCounter to={userPoints} /></h2>
                              <p className="text-emerald-400 text-sm font-semibold">Green Credits Available</p>
                          </div>
                          
                          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                              <Clock className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Pending Verification</p>
                              <p className="text-2xl font-black text-white"><AnimatedCounter to={pendingTotal} /></p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-auto flex flex-col sm:flex-row gap-4">
                             <button 
                                onClick={() => navigate('/rewards')}
                                className="px-6 py-3 bg-white text-emerald-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors shadow-lg"
                             >
                                <Gift className="w-5 h-5 text-emerald-600" /> Browse Rewards
                             </button>
                             <div className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white/10 rounded-xl text-sm font-medium border border-white/10">
                                <Zap className="w-4 h-4 text-yellow-400" /> Top Contributor
                             </div>
                        </div>
                    </div>
                </div>
                
                <motion.div 
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white flex flex-col justify-center items-center text-center shadow-xl shadow-emerald-500/30 relative overflow-hidden group border border-white/10 cursor-default"
                >
                     {/* Glossy overlay effect */}
                     <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                     
                     <div className="relative z-10 flex flex-col items-center">
                         <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md shadow-inner ring-1 ring-white/20 group-hover:bg-white/20 transition-all duration-300">
                            <Crown className="w-8 h-8 text-white drop-shadow-md" />
                         </div>
                         
                         <h3 className="text-sm font-bold text-emerald-100 uppercase tracking-widest mb-1">Current Tier</h3>
                         
                         {/* Dynamic Tier Display */}
                         {userPoints >= 3000 ? (
                             <>
                                <h2 className="text-4xl font-black text-white mb-2 tracking-tight drop-shadow-sm">PLATINUM</h2>
                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 border border-white/20 text-xs font-medium backdrop-blur-sm">
                                    Max Level Reached
                                </span>
                             </>
                         ) : userPoints >= 1500 ? (
                             <>
                                <h2 className="text-4xl font-black text-white mb-2 tracking-tight drop-shadow-sm">GOLD</h2>
                                <div className="w-full max-w-[140px] h-1.5 bg-black/20 rounded-full overflow-hidden mb-2">
                                    <div className="h-full bg-white/90 rounded-full" style={{ width: `${((userPoints - 1500) / 1500) * 100}%` }}></div>
                                </div>
                                <p className="text-xs text-emerald-50 font-medium">{3000 - userPoints} pts to Platinum</p>
                             </>
                         ) : userPoints >= 500 ? (
                             <>
                                <h2 className="text-4xl font-black text-white mb-2 tracking-tight drop-shadow-sm">SILVER</h2>
                                <div className="w-full max-w-[140px] h-1.5 bg-black/20 rounded-full overflow-hidden mb-2">
                                    <div className="h-full bg-white/90 rounded-full" style={{ width: `${((userPoints - 500) / 1000) * 100}%` }}></div>
                                </div>
                                <p className="text-xs text-emerald-50 font-medium">{1500 - userPoints} pts to Gold</p>
                             </>
                         ) : (
                             <>
                                <h2 className="text-4xl font-black text-white mb-2 tracking-tight drop-shadow-sm">BRONZE</h2>
                                <div className="w-full max-w-[140px] h-1.5 bg-black/20 rounded-full overflow-hidden mb-2">
                                    <div className="h-full bg-white/90 rounded-full" style={{ width: `${(userPoints / 500) * 100}%` }}></div>
                                </div>
                                <p className="text-xs text-emerald-50 font-medium">{500 - userPoints} pts to Silver</p>
                             </>
                         )}
                     </div>
                </motion.div>
            </div>

            {/* Featured Rewards Preview */}
            <div className="mb-12">
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Featured Rewards</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Redeem your hard-earned credits for these perks.</p>
                    </div>
                    <Link to="/rewards" className="text-emerald-600 dark:text-emerald-400 font-bold hover:text-emerald-700 dark:hover:text-emerald-300 flex items-center gap-1 text-sm">
                        View Marketplace <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {featuredRewards.map((reward) => (
                        <motion.div 
                            key={reward.id}
                            whileHover={{ y: -5 }}
                            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 cursor-pointer"
                            onClick={() => navigate('/rewards')}
                        >
                            <div className="w-16 h-16 rounded-xl bg-slate-50 dark:bg-slate-800 overflow-hidden shrink-0">
                                <img src={reward.imageUrl} alt={reward.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate pr-2">{reward.name}</h4>
                                    <span className="text-xs font-bold text-amber-500 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded-full whitespace-nowrap">
                                        {reward.creditCost} pts
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{reward.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Leaderboard */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-amber-500" /> Leaderboard
                            </h3>
                            <span className="text-sm text-slate-400">Live Rankings</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase font-semibold">
                                    <tr>
                                        <th className="px-6 py-4">Rank</th>
                                        <th className="px-6 py-4">User</th>
                                        <th className="px-6 py-4 text-right">Points</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {rankedUsers.slice(0, 10).map((entry) => (
                                        <tr key={entry.id} className={entry.isUser ? "bg-emerald-50/50 dark:bg-emerald-900/20" : "hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"}>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${entry.rank <= 3 ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' : 'text-slate-500 dark:text-slate-400'}`}>
                                                    {entry.rank}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <img src={entry.avatar} alt={entry.name} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800" />
                                                    <span className={`text-sm font-medium ${entry.isUser ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'}`}>
                                                        {entry.name} {entry.isUser && "(You)"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right font-bold text-slate-900 dark:text-white">
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
                     <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 h-full">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                            <Award className="w-5 h-5 text-blue-500" /> Achievements
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            {achievements.map((ach, i) => (
                                <motion.div 
                                    key={i}
                                    whileHover={{ x: 5 }}
                                    className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                        <Icon name={ach.icon as any} className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{ach.title}</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{ach.description}</p>
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
