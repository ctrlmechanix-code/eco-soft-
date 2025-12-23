
import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { leaderboard } from '../../data/mockData';

interface AdminNavbarProps {
    onMenuClick: () => void;
}

const AdminNavbar = ({ onMenuClick }: AdminNavbarProps) => {
    // Mock logged in admin
    const currentUser = leaderboard.find(u => u.isUser) || { name: 'Admin', avatar: '' };

    return (
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between shadow-sm transition-colors duration-300">
            <div className="flex items-center gap-4 flex-1">
                <button 
                    onClick={onMenuClick}
                    className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>

                <div className="relative w-full max-w-md hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search users, submissions..." 
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4 md:gap-6">
                <button className="relative p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-900"></span>
                </button>

                <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{currentUser.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Super Admin</p>
                    </div>
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700">
                        <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminNavbar;
