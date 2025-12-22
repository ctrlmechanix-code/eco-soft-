
import React, { useState, useEffect } from 'react';
import { leaderboard } from '../../data/mockData';
import { Search, MoreHorizontal, Shield, Mail, Trash2, Edit2, Plus, X, Save } from 'lucide-react';
import type { LeaderboardUser } from '../../types';

const AdminUsers = () => {
    const [users, setUsers] = useState<LeaderboardUser[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<LeaderboardUser | null>(null);
    const [formData, setFormData] = useState<Partial<LeaderboardUser>>({});

    useEffect(() => {
        const stored = localStorage.getItem('users');
        if (stored) {
            setUsers(JSON.parse(stored));
        } else {
            setUsers(leaderboard);
            localStorage.setItem('users', JSON.stringify(leaderboard));
        }
    }, []);

    const saveUsers = (newUsers: LeaderboardUser[]) => {
        setUsers(newUsers);
        localStorage.setItem('users', JSON.stringify(newUsers));
    };

    const handleAddUser = () => {
        setEditingUser(null);
        setFormData({ role: 'user', status: 'Active', points: 0 });
        setIsModalOpen(true);
    };

    const handleEditUser = (user: LeaderboardUser) => {
        setEditingUser(user);
        setFormData(user);
        setIsModalOpen(true);
    };

    const handleDeleteUser = (id: string) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            saveUsers(users.filter(u => u.id !== id));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (editingUser) {
            // Update
            const updated = users.map(u => u.id === editingUser.id ? { ...u, ...formData } as LeaderboardUser : u);
            saveUsers(updated);
        } else {
            // Create
            const newUser: LeaderboardUser = {
                id: `USR-${Date.now()}`,
                rank: users.length + 1,
                name: formData.name || 'New User',
                email: formData.email || '',
                points: formData.points || 0,
                avatar: `https://api.dicebear.com/8.x/avataaars/svg?seed=${formData.name}`,
                role: formData.role as 'user' | 'admin',
                status: formData.status as 'Active' | 'Suspended',
                joinedDate: new Date().toISOString().split('T')[0]
            };
            saveUsers([...users, newUser]);
        }
        setIsModalOpen(false);
    };

    const filteredUsers = users.filter(u => 
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (u.email || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
                    <p className="text-slate-500">Manage user accounts, roles, and credits.</p>
                </div>
                <button 
                    onClick={handleAddUser}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Add New User
                </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between gap-4">
                    <div className="relative max-w-sm w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-blue-500 text-sm"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Points</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredUsers.map((user) => (
                                <tr key={user.id || user.name} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden">
                                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">{user.name}</p>
                                                <p className="text-xs text-slate-500">{user.email || 'No email'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${user.role === 'admin' ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                            {user.role === 'admin' && <Shield className="w-3 h-3" />}
                                            {user.role === 'admin' ? 'Admin' : 'Student'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium border ${user.status === 'Active' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                                            {user.status || 'Active'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-slate-900">
                                        {user.points}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button 
                                                onClick={() => handleEditUser(user)}
                                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteUser(user.id || '')}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* User Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-slate-900">{editingUser ? 'Edit User' : 'Add New User'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.name || ''}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <input 
                                    type="email" 
                                    required
                                    value={formData.email || ''}
                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                                    <select 
                                        value={formData.role || 'user'}
                                        onChange={e => setFormData({...formData, role: e.target.value as any})}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                                    <select 
                                        value={formData.status || 'Active'}
                                        onChange={e => setFormData({...formData, status: e.target.value as any})}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Suspended">Suspended</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Points Balance</label>
                                <input 
                                    type="number" 
                                    value={formData.points || 0}
                                    onChange={e => setFormData({...formData, points: parseInt(e.target.value)})}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div className="pt-4">
                                <button type="submit" className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                                    <Save className="w-4 h-4" /> Save User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;
