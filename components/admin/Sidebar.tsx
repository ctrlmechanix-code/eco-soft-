
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
    LayoutDashboard, 
    ListTodo, 
    Users, 
    MapPin, 
    Coins, 
    FileText, 
    MessageSquare, 
    Activity, 
    BarChart3, 
    Settings,
    LogOut,
    Recycle,
    Gift,
    X
} from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const navItems = [
        { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { to: "/admin/submissions", icon: ListTodo, label: "Submissions" },
        { to: "/admin/users", icon: Users, label: "Users" },
        { to: "/admin/collection-points", icon: MapPin, label: "Collection Points" },
        { to: "/admin/credits", icon: Coins, label: "Credits" },
        { to: "/admin/redemptions", icon: Gift, label: "Rewards" },
        { to: "/admin/content", icon: FileText, label: "Content" },
        { to: "/admin/requests", icon: MessageSquare, label: "Requests" },
        { to: "/admin/activity", icon: Activity, label: "Activity Log" },
        { to: "/admin/reports", icon: BarChart3, label: "Reports" },
        { to: "/admin/settings", icon: Settings, label: "Settings" },
    ];

    return (
        <aside className={`fixed left-0 top-0 h-screen w-64 bg-slate-900 text-slate-300 flex flex-col z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 shadow-2xl md:shadow-none`}>
            {/* Logo Area */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800 shrink-0">
                <div className="flex items-center gap-2 text-white">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Recycle className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-lg tracking-tight">ECO-SORT <span className="text-xs font-normal text-blue-400 bg-blue-900/30 px-1.5 py-0.5 rounded ml-1">ADMIN</span></span>
                </div>
                {/* Mobile Close Button */}
                <button 
                    onClick={onClose}
                    className="md:hidden text-slate-400 hover:text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-grow py-6 px-3 space-y-1 overflow-y-auto overscroll-y-contain scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={() => {
                            if (window.innerWidth < 768) {
                                onClose();
                            }
                        }}
                        className={({ isActive }) => 
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                                isActive 
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                                : 'hover:bg-slate-800 hover:text-white'
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/50 shrink-0">
                <Link 
                    to="/" 
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Back to Main Site</span>
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;
