import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { leaderboard } from '../../data/mockData';

const AdminNavbar = () => {
    // Mock logged in admin
    const currentUser = leaderboard.find(u => u.isUser) || { name: 'Admin', avatar: '' };

    return (
        <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-40 px-8 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4 flex-1">
                <div className="relative w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search users, submissions, or collection points..." 
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                <div className="h-8 w-px bg-slate-200"></div>

                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-slate-900">{currentUser.name}</p>
                        <p className="text-xs text-slate-500">Super Admin</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                        <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminNavbar;