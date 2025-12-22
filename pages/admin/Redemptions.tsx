
import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Clock, Plus, Edit2, Trash2, Search, Package, Gift, X, Save } from 'lucide-react';
import { RedemptionTransaction, Reward } from '../../types';
import { mockRedemptions, rewardCatalog as mockRewards } from '../../data/mockData';

const AdminRedemptions = () => {
    const [activeTab, setActiveTab] = useState<'requests' | 'catalog'>('requests');
    const [redemptions, setRedemptions] = useState<RedemptionTransaction[]>([]);
    const [rewards, setRewards] = useState<Reward[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Catalog Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingReward, setEditingReward] = useState<Reward | null>(null);
    const [formData, setFormData] = useState<Partial<Reward>>({});
    const [isUnlimitedStock, setIsUnlimitedStock] = useState(false);

    useEffect(() => {
        // Load Redemptions
        const storedRedemptions = JSON.parse(localStorage.getItem('user_redemptions') || '[]');
        const allRedemptions = [...storedRedemptions, ...mockRedemptions];
        const uniqueRedemptions = Array.from(new Map(allRedemptions.map(item => [item.id, item])).values());
        setRedemptions(uniqueRedemptions.sort((a, b) => new Date(b.redeemedAt).getTime() - new Date(a.redeemedAt).getTime()));

        // Load Rewards
        const storedRewards = JSON.parse(localStorage.getItem('rewards_catalog') || '[]');
        if (storedRewards.length > 0) {
            setRewards(storedRewards);
        } else {
            setRewards(mockRewards);
            localStorage.setItem('rewards_catalog', JSON.stringify(mockRewards));
        }
    }, []);

    // --- Redemption Logic ---
    const updateRedemption = (id: string, status: 'approved' | 'rejected') => {
        const updated = redemptions.map(r => {
            if (r.id === id) {
                return {
                    ...r,
                    status,
                    redemptionCode: status === 'approved' ? `ECO-${Math.random().toString(36).substr(2, 6).toUpperCase()}` : undefined,
                    fulfilledAt: new Date().toISOString(),
                    expiresAt: status === 'approved' ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : undefined // 30 days
                };
            }
            return r;
        });

        const localOnly = updated.filter(u => !mockRedemptions.find(m => m.id === u.id));
        localStorage.setItem('user_redemptions', JSON.stringify(localOnly));
        setRedemptions(updated);

        if (status === 'rejected') {
            const target = redemptions.find(r => r.id === id);
            if (target) {
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const updatedUsers = users.map((u: any) => 
                    u.id === target.userId ? { ...u, points: u.points + target.creditsCost } : u
                );
                localStorage.setItem('users', JSON.stringify(updatedUsers));
                alert(`Redemption rejected. ${target.creditsCost} credits refunded to user.`);
            }
        }
    };

    // --- Reward Catalog Logic ---
    const handleAddReward = () => {
        setEditingReward(null);
        setFormData({ 
            category: 'physical_item', 
            minTier: 'bronze', 
            redemptionType: 'instant',
            creditCost: 100,
            stock: 50
        });
        setIsUnlimitedStock(false);
        setIsModalOpen(true);
    };

    const handleEditReward = (reward: Reward) => {
        setEditingReward(reward);
        setFormData(reward);
        setIsUnlimitedStock(reward.stock === 'unlimited');
        setIsModalOpen(true);
    };

    const handleDeleteReward = (id: string) => {
        if (window.confirm("Are you sure you want to delete this reward?")) {
            const updatedRewards = rewards.filter(r => r.id !== id);
            setRewards(updatedRewards);
            localStorage.setItem('rewards_catalog', JSON.stringify(updatedRewards));
        }
    };

    const handleSaveReward = (e: React.FormEvent) => {
        e.preventDefault();
        
        const rewardData: Reward = {
            id: editingReward ? editingReward.id : `reward-${Date.now()}`,
            name: formData.name || 'New Reward',
            description: formData.description || '',
            category: formData.category as any,
            creditCost: Number(formData.creditCost) || 0,
            minTier: formData.minTier as any,
            stock: isUnlimitedStock ? 'unlimited' : (Number(formData.stock) || 0),
            imageUrl: formData.imageUrl || 'https://api.dicebear.com/8.x/icons/svg?seed=gift',
            redemptionType: formData.redemptionType as any,
            termsAndConditions: formData.termsAndConditions || ''
        };

        let updatedRewards;
        if (editingReward) {
            updatedRewards = rewards.map(r => r.id === editingReward.id ? rewardData : r);
        } else {
            updatedRewards = [rewardData, ...rewards];
        }

        setRewards(updatedRewards);
        localStorage.setItem('rewards_catalog', JSON.stringify(updatedRewards));
        setIsModalOpen(false);
    };

    const pendingRedemptions = redemptions.filter(r => r.status === 'pending');
    
    const filteredRewards = rewards.filter(r => 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        r.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const inputClasses = "w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-700 dark:text-white";

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Rewards Management</h1>
                    <p className="text-slate-500 dark:text-slate-400">Manage catalog and process redemption requests.</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 mb-6">
                <button 
                    onClick={() => setActiveTab('requests')}
                    className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'requests' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                >
                    <Clock className="w-4 h-4" /> Requests {pendingRedemptions.length > 0 && <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{pendingRedemptions.length}</span>}
                </button>
                <button 
                    onClick={() => setActiveTab('catalog')}
                    className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'catalog' ? 'border-blue-600 text-blue-600 dark:text-blue-400' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                >
                    <Gift className="w-4 h-4" /> Reward Catalog
                </button>
            </div>

            {activeTab === 'requests' && (
                <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                        <h3 className="font-bold text-slate-900 dark:text-white">Pending Approvals</h3>
                    </div>
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-4">Request ID</th>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Reward</th>
                                <th className="px-6 py-4">Cost</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {pendingRedemptions.length > 0 ? (
                                pendingRedemptions.map((r) => (
                                    <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                        <td className="px-6 py-4 font-mono text-slate-500 dark:text-slate-400 text-xs">{r.id}</td>
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{r.userId}</td>
                                        <td className="px-6 py-4 dark:text-slate-300">{r.rewardName}</td>
                                        <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-200">{r.creditsCost}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    onClick={() => updateRedemption(r.id, 'approved')}
                                                    className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
                                                    title="Approve"
                                                >
                                                    <CheckCircle2 className="w-4 h-4" />
                                                </button>
                                                <button 
                                                    onClick={() => updateRedemption(r.id, 'rejected')}
                                                    className="p-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                                                    title="Reject"
                                                >
                                                    <XCircle className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-slate-500 dark:text-slate-400">No pending requests.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {activeTab === 'catalog' && (
                <div>
                    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                        <div className="relative max-w-sm w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Search rewards..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm text-slate-900 dark:text-white"
                            />
                        </div>
                        <button 
                            onClick={handleAddReward}
                            className="px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 flex items-center gap-2 shadow-lg shadow-blue-900/20 transition-all"
                        >
                            <Plus className="w-4 h-4" /> Add Reward
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredRewards.map((reward) => (
                            <div key={reward.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all">
                                <div className="h-40 bg-slate-50 dark:bg-slate-800 relative overflow-hidden">
                                    <img src={reward.imageUrl} alt={reward.name} className="w-full h-full object-cover" />
                                    <div className="absolute top-2 right-2 flex gap-2">
                                        <button 
                                            onClick={() => handleEditReward(reward)}
                                            className="p-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-lg text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-800 shadow-sm transition-colors"
                                        >
                                            <Edit2 className="w-3.5 h-3.5" />
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteReward(reward.id)}
                                            className="p-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-lg text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-white dark:hover:bg-slate-800 shadow-sm transition-colors"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                    <span className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase rounded-md">
                                        {reward.minTier}
                                    </span>
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1">{reward.name}</h3>
                                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-md whitespace-nowrap">
                                            {reward.creditCost} pts
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 flex-1">{reward.description}</p>
                                    <div className="flex items-center justify-between text-xs font-medium text-slate-400 dark:text-slate-500 pt-3 border-t border-slate-50 dark:border-slate-800">
                                        <span className="capitalize">{reward.category.replace('_', ' ')}</span>
                                        <span>Stock: {reward.stock === 'unlimited' ? '∞' : reward.stock}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Reward Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto border border-slate-100 dark:border-slate-800">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50 sticky top-0 z-10">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{editingReward ? 'Edit Reward' : 'Add New Reward'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSaveReward} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Reward Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.name || ''}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                    className={inputClasses}
                                    placeholder="e.g. Eco Tote Bag"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Description</label>
                                <textarea 
                                    required
                                    rows={2}
                                    value={formData.description || ''}
                                    onChange={e => setFormData({...formData, description: e.target.value})}
                                    className={inputClasses}
                                    placeholder="Brief description of the reward..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Category</label>
                                    <select 
                                        value={formData.category}
                                        onChange={e => setFormData({...formData, category: e.target.value as any})}
                                        className={inputClasses}
                                    >
                                        <option value="recognition">Recognition</option>
                                        <option value="campus_perk">Campus Perk</option>
                                        <option value="physical_item">Physical Item</option>
                                        <option value="impact">Impact</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Credit Cost</label>
                                    <input 
                                        type="number" 
                                        required
                                        min="0"
                                        value={formData.creditCost}
                                        onChange={e => setFormData({...formData, creditCost: parseInt(e.target.value)})}
                                        className={inputClasses}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Min Tier</label>
                                    <select 
                                        value={formData.minTier}
                                        onChange={e => setFormData({...formData, minTier: e.target.value as any})}
                                        className={inputClasses}
                                    >
                                        <option value="bronze">Bronze</option>
                                        <option value="silver">Silver</option>
                                        <option value="gold">Gold</option>
                                        <option value="platinum">Platinum</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Stock</label>
                                    <div className="flex gap-2">
                                        <input 
                                            type="number" 
                                            disabled={isUnlimitedStock}
                                            value={isUnlimitedStock ? '' : formData.stock}
                                            onChange={e => setFormData({...formData, stock: parseInt(e.target.value)})}
                                            className={`${inputClasses} ${isUnlimitedStock ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500' : ''}`}
                                            placeholder={isUnlimitedStock ? "∞" : "0"}
                                        />
                                        <div className="flex items-center">
                                            <input 
                                                type="checkbox" 
                                                checked={isUnlimitedStock}
                                                onChange={(e) => setIsUnlimitedStock(e.target.checked)}
                                                className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                id="unlimited"
                                            />
                                            <label htmlFor="unlimited" className="ml-2 text-xs font-bold text-slate-500 dark:text-slate-400">Unlimited</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Image URL</label>
                                <input 
                                    type="text" 
                                    value={formData.imageUrl || ''}
                                    onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                                    className={inputClasses}
                                    placeholder="https://..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Redemption Type</label>
                                    <select 
                                        value={formData.redemptionType}
                                        onChange={e => setFormData({...formData, redemptionType: e.target.value as any})}
                                        className={inputClasses}
                                    >
                                        <option value="instant">Instant (Code)</option>
                                        <option value="requires_approval">Requires Approval</option>
                                        <option value="scheduled">Scheduled</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Terms & Conditions</label>
                                <textarea 
                                    rows={2}
                                    value={formData.termsAndConditions || ''}
                                    onChange={e => setFormData({...formData, termsAndConditions: e.target.value})}
                                    className={inputClasses}
                                    placeholder="e.g. Valid for 30 days..."
                                />
                            </div>

                            <div className="pt-4">
                                <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20">
                                    <Save className="w-4 h-4" /> Save Reward
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminRedemptions;
