
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Recycle, Menu, X, Home, Trash2, BarChart3, Medal, LogOut, User, ChevronDown, MapPin, TrendingUp, MessageSquare, ListTodo, Shield, Gift, Sun, Moon, Bell } from 'lucide-react';
import { mockNotifications } from '../data/mockData';
import type { AppNotification } from '../types';

const NavItem = ({ to, children, Icon, onClick }: { to: string; children?: React.ReactNode; Icon: React.ElementType; onClick?: () => void }) => (
    <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
            `relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group ${
                isActive 
                ? 'text-emerald-700 bg-emerald-50/80 shadow-sm ring-1 ring-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:ring-emerald-800' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800'
            }`
        }
    >
        {({ isActive }) => (
            <>
                <Icon className={`h-4 w-4 transition-colors ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300'}`} />
                <span>{children}</span>
            </>
        )}
    </NavLink>
);

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hasUnread, setHasUnread] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    const location = useLocation();
    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Initial Theme Check
    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setIsDarkMode(true);
        }
    };

    // Check login state and notifications
    useEffect(() => {
        const auth = localStorage.getItem('isAuthenticated');
        const loggedIn = !!auth;
        setIsLoggedIn(loggedIn);
        setIsProfileOpen(false); 
        setIsOpen(false);

        const checkNotifications = () => {
            if (!loggedIn) {
                setHasUnread(false);
                return;
            }

            // Check message unread status
            const messageUnread = localStorage.getItem('unread_messages') === 'true';
            
            // Check notification system unread status
            const storedNotifs = JSON.parse(localStorage.getItem('user_notifications') || '[]');
            
            // Merge Mock and Stored - Stored takes precedence to respect "read" status
            const allNotifs = [...mockNotifications, ...storedNotifs];
            
            // Deduplicate to get the latest version of each notification
            const uniqueNotifs = Array.from(new Map(allNotifs.map(item => [item.id, item])).values());
            
            // Filter by userId and check read status
            const hasUnreadNotifs = uniqueNotifs.some((n: AppNotification) => 
                !n.read && (n.userId === 'USR-CURRENT' || n.userId === 'all')
            );

            setHasUnread(messageUnread || hasUnreadNotifs);
        };

        checkNotifications();
        window.addEventListener('storage', checkNotifications);
        const interval = setInterval(checkNotifications, 2000);

        return () => {
            window.removeEventListener('storage', checkNotifications);
            clearInterval(interval);
        };
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        setIsLoggedIn(false);
        setHasUnread(false);
        navigate('/');
    };

    return (
        <nav 
            className={`sticky top-0 z-50 transition-all duration-500 ease-in-out ${
                scrolled 
                ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60 shadow-sm py-0' 
                : 'bg-transparent border-b border-transparent py-2'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 xl:h-20">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="relative w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20 group-hover:shadow-emerald-500/30 group-hover:scale-105 transition-all duration-300">
                            <Recycle className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">ECO-SORT</span>
                    </Link>

                    {/* Desktop Menu - Hidden on Tablet/Mobile */}
                    <div className="hidden xl:flex items-center p-1.5 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-full border border-slate-200/60 dark:border-slate-800/60 shadow-sm ring-1 ring-white/50 dark:ring-slate-800/50">
                        <NavItem to="/" Icon={Home}>Home</NavItem>
                        <NavItem to="/categories" Icon={Trash2}>Report</NavItem>
                        <NavItem to="/submissions" Icon={ListTodo}>My Submissions</NavItem>
                        <NavItem to="/rewards" Icon={Gift}>Rewards</NavItem>
                        <NavItem to="/dashboard" Icon={BarChart3}>Dashboard</NavItem>
                        <NavItem to="/credits" Icon={Medal}>Credits</NavItem>
                        <NavItem to="/collection-points" Icon={MapPin}>Locations</NavItem>
                    </div>

                    <div className="hidden xl:flex items-center gap-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            aria-label="Toggle Dark Mode"
                        >
                            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>

                        {isLoggedIn ? (
                            <div className="relative" ref={dropdownRef}>
                                <button 
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className={`flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border transition-all duration-200 relative ${
                                        isProfileOpen 
                                        ? 'bg-emerald-50 border-emerald-200 ring-2 ring-emerald-100 shadow-inner dark:bg-emerald-900/20 dark:border-emerald-800 dark:ring-emerald-900' 
                                        : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-md dark:bg-slate-900 dark:border-slate-700 dark:hover:border-emerald-700'
                                    }`}
                                >
                                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden ring-2 ring-white dark:ring-slate-900">
                                         <img src="https://api.dicebear.com/8.x/avataaars/svg?seed=You" alt="User" className="w-full h-full" />
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180 text-emerald-600 dark:text-emerald-400' : ''}`} />
                                    
                                    {hasUnread && (
                                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white dark:border-slate-900"></span>
                                        </span>
                                    )}
                                </button>

                                <AnimatePresence>
                                    {isProfileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-3 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden py-2 z-50 ring-1 ring-slate-900/5"
                                        >
                                            <div className="px-5 py-4 border-b border-slate-50 dark:border-slate-800 mb-2 bg-slate-50/50 dark:bg-slate-800/50">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden ring-1 ring-slate-200 dark:ring-slate-600">
                                                        <img src="https://api.dicebear.com/8.x/avataaars/svg?seed=You" alt="User" className="w-full h-full" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900 dark:text-white">Student User</p>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">student@university.edu</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="px-2">
                                                <Link to="/profile" className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <User className="w-4 h-4" /> My Profile
                                                    </div>
                                                </Link>
                                                <Link to="/notifications" className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <Bell className="w-4 h-4" /> Notifications
                                                    </div>
                                                    {hasUnread && <span className="w-2 h-2 rounded-full bg-red-500"></span>}
                                                </Link>
                                                <Link to="/my-redemptions" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                                                    <Gift className="w-4 h-4" /> My Redemptions
                                                </Link>
                                                <Link to="/admin/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                                    <Shield className="w-4 h-4" /> Admin Panel
                                                </Link>
                                                <Link to="/analysis" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                                                    <TrendingUp className="w-4 h-4" /> Analyse
                                                </Link>
                                                <Link to="/requests" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                                                    <MessageSquare className="w-4 h-4" /> My Requests
                                                </Link>
                                            </div>

                                            <div className="px-2 mt-2 pt-2 border-t border-slate-50 dark:border-slate-800">
                                                <button 
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                                                >
                                                    <LogOut className="w-4 h-4" /> Sign Out
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link 
                                to="/auth" 
                                className="group relative px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full text-sm font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-lg shadow-slate-900/20 dark:shadow-white/10 hover:shadow-slate-900/30 hover:-translate-y-0.5 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">Sign In</span>
                                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </Link>
                        )}
                    </div>

                    {/* Mobile/Tablet Menu Button */}
                    <div className="xl:hidden flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                        >
                            {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
                        </button>
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition-all relative"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            {!isOpen && hasUnread && isLoggedIn && <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="xl:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 overflow-y-auto overscroll-y-contain max-h-[calc(100vh-5rem)] shadow-2xl"
                    >
                        <div className="px-4 py-6 space-y-2">
                            <NavItem to="/" Icon={Home}>Home</NavItem>
                            <NavItem to="/categories" Icon={Trash2}>Report Waste</NavItem>
                            <NavItem to="/submissions" Icon={ListTodo}>My Submissions</NavItem>
                            <NavItem to="/rewards" Icon={Gift}>Rewards</NavItem>
                            <NavItem to="/dashboard" Icon={BarChart3}>Dashboard</NavItem>
                            <NavItem to="/credits" Icon={Medal}>Green Credits</NavItem>
                            <NavItem to="/collection-points" Icon={MapPin}>Find Locations</NavItem>
                            
                            <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800">
                                {isLoggedIn ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                                             <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 overflow-hidden ring-1 ring-slate-200 dark:ring-slate-700">
                                                 <img src="https://api.dicebear.com/8.x/avataaars/svg?seed=You" alt="User" className="w-full h-full" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900 dark:text-white">Student User</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">student@university.edu</p>
                                            </div>
                                        </div>
                                        <Link to="/profile" className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900">
                                            <div className="flex items-center gap-3">
                                                <User className="w-4 h-4" /> My Profile
                                            </div>
                                        </Link>
                                        <Link to="/notifications" className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900">
                                            <div className="flex items-center gap-3">
                                                <Bell className="w-4 h-4" /> Notifications
                                            </div>
                                            {hasUnread && <span className="w-2 h-2 rounded-full bg-red-500"></span>}
                                        </Link>
                                        <Link to="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                                            <Shield className="w-4 h-4" /> Admin Panel
                                        </Link>
                                        <Link to="/analysis" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900">
                                            <TrendingUp className="w-4 h-4" /> Analyse
                                        </Link>
                                        <Link to="/requests" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900">
                                            <MessageSquare className="w-4 h-4" /> My Requests
                                        </Link>
                                        <button 
                                            onClick={handleLogout}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Sign Out
                                        </button>
                                    </div>
                                ) : (
                                    <Link 
                                        to="/auth"
                                        className="flex items-center justify-center w-full px-4 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-sm font-bold shadow-lg shadow-slate-900/10 dark:shadow-white/10"
                                    >
                                        Sign In to ECO-SORT
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
