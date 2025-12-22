
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Recycle, Menu, X, Home, Trash2, BarChart3, Medal, LogOut, User, ChevronDown, MapPin, TrendingUp, MessageSquare } from 'lucide-react';

const NavItem = ({ to, children, Icon, onClick }: { to: string; children?: React.ReactNode; Icon: React.ElementType; onClick?: () => void }) => (
    <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
            `relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group ${
                isActive 
                ? 'text-emerald-700 bg-emerald-50/80 shadow-sm ring-1 ring-emerald-100' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`
        }
    >
        {({ isActive }) => (
            <>
                <Icon className={`h-4 w-4 transition-colors ${isActive ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
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
    
    const location = useLocation();
    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Check login state on mount and location change
    useEffect(() => {
        const auth = localStorage.getItem('isAuthenticated');
        setIsLoggedIn(!!auth);
        setIsProfileOpen(false); // Close dropdown on navigation
        setIsOpen(false); // Close mobile menu
    }, [location]);

    // Handle Scroll for sticky effect
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdown when clicking outside
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
        navigate('/');
    };

    return (
        <nav 
            className={`sticky top-0 z-50 transition-all duration-500 ease-in-out ${
                scrolled 
                ? 'bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm py-0' 
                : 'bg-transparent border-b border-transparent py-2'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="relative w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20 group-hover:shadow-emerald-500/30 group-hover:scale-105 transition-all duration-300">
                            <Recycle className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-slate-900 tracking-tight">ECO-SORT</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center p-1.5 bg-white/60 backdrop-blur-md rounded-full border border-slate-200/60 shadow-sm ring-1 ring-white/50">
                        <NavItem to="/" Icon={Home}>Home</NavItem>
                        <NavItem to="/categories" Icon={Trash2}>Report</NavItem>
                        <NavItem to="/dashboard" Icon={BarChart3}>Dashboard</NavItem>
                        <NavItem to="/credits" Icon={Medal}>Credits</NavItem>
                        <NavItem to="/collection-points" Icon={MapPin}>Locations</NavItem>
                    </div>

                    {/* Desktop User Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {isLoggedIn ? (
                            <div className="relative" ref={dropdownRef}>
                                <button 
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className={`flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border transition-all duration-200 ${
                                        isProfileOpen 
                                        ? 'bg-emerald-50 border-emerald-200 ring-2 ring-emerald-100 shadow-inner' 
                                        : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-md'
                                    }`}
                                >
                                    <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden ring-2 ring-white">
                                         <img src="https://api.dicebear.com/8.x/avataaars/svg?seed=You" alt="User" className="w-full h-full" />
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180 text-emerald-600' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {isProfileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden py-2 z-50 ring-1 ring-slate-900/5"
                                        >
                                            <div className="px-5 py-4 border-b border-slate-50 mb-2 bg-slate-50/50">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden ring-1 ring-slate-200">
                                                        <img src="https://api.dicebear.com/8.x/avataaars/svg?seed=You" alt="User" className="w-full h-full" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900">Student User</p>
                                                        <p className="text-xs text-slate-500 truncate">student@university.edu</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="px-2">
                                                <Link to="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors">
                                                    <User className="w-4 h-4" /> My Profile
                                                </Link>
                                                <Link to="/analysis" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors">
                                                    <TrendingUp className="w-4 h-4" /> Analyse
                                                </Link>
                                                <Link to="/requests" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors">
                                                    <MessageSquare className="w-4 h-4" /> My Requests
                                                </Link>
                                            </div>

                                            <div className="px-2 mt-2 pt-2 border-t border-slate-50">
                                                <button 
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
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
                                className="group relative px-6 py-2.5 bg-slate-900 text-white rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 hover:shadow-slate-900/30 hover:-translate-y-0.5 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">Sign In</span>
                                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 active:scale-95 transition-all"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 overflow-hidden shadow-2xl"
                    >
                        <div className="px-4 py-6 space-y-2">
                            <NavItem to="/" Icon={Home}>Home</NavItem>
                            <NavItem to="/categories" Icon={Trash2}>Report Waste</NavItem>
                            <NavItem to="/dashboard" Icon={BarChart3}>Dashboard</NavItem>
                            <NavItem to="/credits" Icon={Medal}>Green Credits</NavItem>
                            <NavItem to="/collection-points" Icon={MapPin}>Find Locations</NavItem>
                            
                            <div className="pt-6 mt-4 border-t border-slate-100">
                                {isLoggedIn ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                                             <div className="w-10 h-10 rounded-full bg-white overflow-hidden ring-1 ring-slate-200">
                                                 <img src="https://api.dicebear.com/8.x/avataaars/svg?seed=You" alt="User" className="w-full h-full" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">Student User</p>
                                                <p className="text-xs text-slate-500">student@university.edu</p>
                                            </div>
                                        </div>
                                        <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">
                                            <User className="w-4 h-4" /> My Profile
                                        </Link>
                                        <Link to="/analysis" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">
                                            <TrendingUp className="w-4 h-4" /> Analyse
                                        </Link>
                                        <Link to="/requests" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50">
                                            <MessageSquare className="w-4 h-4" /> My Requests
                                        </Link>
                                        <button 
                                            onClick={handleLogout}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Sign Out
                                        </button>
                                    </div>
                                ) : (
                                    <Link 
                                        to="/auth"
                                        className="flex items-center justify-center w-full px-4 py-3.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-lg shadow-slate-900/10"
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
