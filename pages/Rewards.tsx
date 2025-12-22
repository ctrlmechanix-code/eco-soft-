
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { rewardCatalog as mockRewards, leaderboard } from '../data/mockData';
import { Reward, RedemptionTransaction, CreditTransaction, LeaderboardUser } from '../types';
import { Coins, Filter, Lock, CheckCircle2, AlertCircle, ShoppingBag, Leaf, Trophy, School, Package, X } from 'lucide-react';
import AnimatedCounter from '../components/ui/AnimatedCounter';

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

const Rewards = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<LeaderboardUser | null>(null);
    const [rewards, setRewards] = useState<Reward[]>([]);
    const [filterCategory, setFilterCategory] = useState<string>('all');
    const [filterTier, setFilterTier] = useState<string>('all');
    const [showAffordable, setShowAffordable] = useState(false);
    const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
    const [isRedeeming, setIsRedeeming] = useState(false);

    useEffect(() => {
        // Load user data
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        let currentUser = storedUsers.find((u: any) => u.id === 'USR-CURRENT') || leaderboard.find(u => u.isUser);
        
        // If not in storage yet, put it there
        if (!currentUser) {
             currentUser = { ...leaderboard.find(u => u.isUser), id: 'USR-CURRENT' };
        }
        setUser(currentUser);

        // Load Rewards Data
        const storedRewards = JSON.parse(localStorage.getItem('rewards_catalog') || '[]');
        if (storedRewards.length > 0) {
            setRewards(storedRewards);
        } else {
            setRewards(mockRewards);
            // Initialize storage with mock data if empty
            localStorage.setItem('rewards_catalog', JSON.stringify(mockRewards));
        }
    }, []);

    const getUserTier = (points: number) => {
        if (points >= 3000) return 'platinum';
        if (points >= 1500) return 'gold';
        if (points >= 500) return 'silver';
        return 'bronze';
    };

    const currentTier = user ? getUserTier(user.points) : 'bronze';

    const checkTierAccess = (userTier: string, requiredTier: string) => {
        const tiers = ['bronze', 'silver', 'gold', 'platinum'];
        return tiers.indexOf(userTier) >= tiers.indexOf(requiredTier);
    };

    const handleRedeem = (reward: Reward) => {
        if (!user) return;
        setIsRedeeming(true);

        setTimeout(() => {
            // 1. Create Redemption Transaction
            const redemption: RedemptionTransaction = {
                id: `RED-${Date.now()}`,
                userId: user.id || 'USR-CURRENT',
                rewardId: reward.id,
                rewardName: reward.name,
                creditsCost: reward.creditCost,
                status: reward.redemptionType === 'instant' ? 'approved' : 'pending',
                redemptionCode: reward.redemptionType === 'instant' ? `ECO-${Math.random().toString(36).substr(2, 6).toUpperCase()}` : undefined,
                redeemedAt: new Date().toISOString(),
                fulfilledAt: reward.redemptionType === 'instant' ? new Date().toISOString() : undefined,
                expiresAt: reward.redemptionType === 'instant' ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : undefined, // 30 days
                notes: reward.termsAndConditions
            };

            // 2. Create Credit Transaction (Ledger)
            const creditTxn: CreditTransaction = {
                id: `TXN-${Date.now()}`,
                userId: user.id || 'USR-CURRENT',
                type: 'spent',
                amount: -reward.creditCost,
                balance: user.points - reward.creditCost,
                source: 'redemption',
                referenceId: redemption.id,
                description: `Redeemed: ${reward.name}`,
                timestamp: new Date().toISOString()
            };

            // 3. Update User Balance
            const updatedUser = { ...user, points: user.points - reward.creditCost };
            
            // Persist Data
            const existingRedemptions = JSON.parse(localStorage.getItem('user_redemptions') || '[]');
            localStorage.setItem('user_redemptions', JSON.stringify([redemption, ...existingRedemptions]));

            const existingTxns = JSON.parse(localStorage.getItem('credit_transactions') || '[]');
            localStorage.setItem('credit_transactions', JSON.stringify([creditTxn, ...existingTxns]));

            // Update Users Array
            const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
            const updatedUsers = storedUsers.length > 0 
                ? storedUsers.map((u: any) => u.id === user.id ? updatedUser : u)
                : [updatedUser]; // Fallback if local storage empty
            localStorage.setItem('users', JSON.stringify(updatedUsers));

            // Update Stock if managed
            if (reward.stock !== 'unlimited') {
                const updatedRewards = rewards.map(r => r.id === reward.id ? { ...r, stock: (r.stock as number) - 1 } : r);
                setRewards(updatedRewards);
                localStorage.setItem('rewards_catalog', JSON.stringify(updatedRewards));
            }

            setUser(updatedUser);
            setIsRedeeming(false);
            setSelectedReward(null);
            
            // Navigate to redemptions page to show success
            navigate('/my-redemptions');
        }, 1500);
    };

    const filteredRewards = rewards.filter(reward => {
        const matchesCategory = filterCategory === 'all' || reward.category === filterCategory;
        const matchesTier = filterTier === 'all' || reward.minTier === filterTier;
        const matchesAffordability = !showAffordable || (user ? user.points >= reward.creditCost : false);
        return matchesCategory && matchesTier && matchesAffordability;
    });

    const categoryIcons = {
        recognition: Trophy,
        campus_perk: School,
        physical_item: Package,
        impact: Leaf
    };

    const tierColors = {
        bronze: 'bg-amber-600',
        silver: 'bg-slate-400',
        gold: 'bg-yellow-500',
        platinum: 'bg-slate-800'
    };

    return (
        <PageWrapper>
            <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Rewards Marketplace</h1>
                    <p className="text-slate-500 mt-1">Spend your Green Credits on exclusive perks and items.</p>
                </div>
                
                {user && (
                    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-xs font-bold text-slate-400 uppercase">Available Credits</p>
                            <p className="text-2xl font-black text-emerald-600"><AnimatedCounter to={user.points} /></p>
                        </div>
                        <div className="w-px h-10 bg-slate-100"></div>
                        <div className="text-left">
                            <p className="text-xs font-bold text-slate-400 uppercase">Current Tier</p>
                            <div className="flex items-center gap-1">
                                <span className={`w-2 h-2 rounded-full ${tierColors[currentTier]}`}></span>
                                <p className="text-sm font-bold text-slate-900 capitalize">{currentTier}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto scrollbar-hide">
                    <button 
                        onClick={() => setFilterCategory('all')}
                        className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${filterCategory === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                    >
                        All Rewards
                    </button>
                    {Object.keys(categoryIcons).map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setFilterCategory(cat)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all capitalize ${filterCategory === cat ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                        >
                            {cat.replace('_', ' ')}
                        </button>
                    ))}
                </div>

                <div className="flex gap-4 items-center w-full md:w-auto">
                    <select 
                        value={filterTier}
                        onChange={(e) => setFilterTier(e.target.value)}
                        className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-emerald-500"
                    >
                        <option value="all">All Tiers</option>
                        <option value="bronze">Bronze</option>
                        <option value="silver">Silver</option>
                        <option value="gold">Gold</option>
                        <option value="platinum">Platinum</option>
                    </select>
                    
                    <label className="flex items-center gap-2 text-sm font-bold text-slate-600 cursor-pointer select-none">
                        <input 
                            type="checkbox" 
                            checked={showAffordable}
                            onChange={(e) => setShowAffordable(e.target.checked)}
                            className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                        />
                        Affordable Only
                    </label>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredRewards.map((reward) => {
                    const isUnlocked = checkTierAccess(currentTier, reward.minTier);
                    const canAfford = user ? user.points >= reward.creditCost : false;
                    const Icon = categoryIcons[reward.category];
                    const hasStock = reward.stock === 'unlimited' || (reward.stock as number) > 0;

                    return (
                        <motion.div 
                            key={reward.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -5 }}
                            className={`bg-white rounded-3xl border ${isUnlocked ? 'border-slate-200' : 'border-slate-100 opacity-80'} shadow-sm overflow-hidden flex flex-col relative group`}
                        >
                            {!isUnlocked && (
                                <div className="absolute inset-0 bg-slate-100/50 backdrop-blur-[1px] z-10 flex flex-col items-center justify-center text-center p-6">
                                    <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 mb-2">
                                        <Lock className="w-6 h-6" />
                                    </div>
                                    <p className="text-sm font-bold text-slate-600">Unlocks at <span className="capitalize">{reward.minTier}</span></p>
                                </div>
                            )}

                            <div className="h-40 bg-slate-50 relative overflow-hidden">
                                <img src={reward.imageUrl} alt={reward.name} className="w-full h-full object-cover" />
                                <div className={`absolute top-3 left-3 px-2 py-1 rounded-lg text-[10px] font-bold uppercase text-white flex items-center gap-1 ${tierColors[reward.minTier]}`}>
                                    {reward.minTier}
                                </div>
                                {!hasStock && (
                                    <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">Out of Stock</span>
                                    </div>
                                )}
                            </div>

                            <div className="p-5 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-slate-900 line-clamp-1">{reward.name}</h3>
                                    <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                                </div>
                                <p className="text-xs text-slate-500 line-clamp-2 mb-4 flex-grow">{reward.description}</p>
                                
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-1 text-slate-900 font-black">
                                        <Coins className="w-4 h-4 text-amber-500" />
                                        {reward.creditCost}
                                    </div>
                                    <button 
                                        onClick={() => setSelectedReward(reward)}
                                        disabled={!isUnlocked || !canAfford || !hasStock}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                            isUnlocked && canAfford && hasStock
                                            ? 'bg-slate-900 text-white hover:bg-emerald-600 shadow-md' 
                                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                        }`}
                                    >
                                        Redeem
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Redemption Modal */}
            <AnimatePresence>
                {selectedReward && user && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                            onClick={() => !isRedeeming && setSelectedReward(null)}
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }} 
                            animate={{ opacity: 1, scale: 1 }} 
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-8 overflow-hidden"
                        >
                            {!isRedeeming && (
                                <button 
                                    onClick={() => setSelectedReward(null)}
                                    className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}

                            <div className="text-center">
                                <div className="w-20 h-20 bg-slate-50 rounded-2xl mx-auto mb-6 overflow-hidden border-4 border-white shadow-lg">
                                    <img src={selectedReward.imageUrl} alt={selectedReward.name} className="w-full h-full object-cover" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">Redeem Reward?</h2>
                                <p className="text-slate-500 mb-6">
                                    You are about to spend <span className="font-bold text-slate-900">{selectedReward.creditCost} credits</span> for <span className="font-bold text-slate-900">{selectedReward.name}</span>.
                                </p>

                                <div className="bg-slate-50 p-4 rounded-xl mb-8 text-left">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-500">Current Balance</span>
                                        <span className="font-bold text-slate-900">{user.points}</span>
                                    </div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-500">Cost</span>
                                        <span className="font-bold text-red-500">-{selectedReward.creditCost}</span>
                                    </div>
                                    <div className="border-t border-slate-200 my-2"></div>
                                    <div className="flex justify-between text-sm">
                                        <span className="font-bold text-slate-700">New Balance</span>
                                        <span className="font-bold text-emerald-600">{user.points - selectedReward.creditCost}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleRedeem(selectedReward)}
                                    disabled={isRedeeming}
                                    className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isRedeeming ? 'Processing...' : 'Confirm Redemption'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </PageWrapper>
    );
};

export default Rewards;
