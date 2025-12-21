
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Recycle, Menu, X, Home, Trash2, BarChart3, Medal, LogOut, User, ChevronDown, MapPin } from 'lucide-react';

const NavItem = ({ to, children, Icon, onClick }: { to: string; children?: React.ReactNode; Icon: React.ElementType; onClick?: () => void }) => (
    <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) =>
            `relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isActive 
                ? 'text-emerald-600 bg-emerald-50/80' 
                : 'text-slate-500 hover:text-emerald-600 hover:bg-slate-50'
            }`
        }
    >
        <Icon className="h-4 w-4" />
        {children}
    </NavLink>
);

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
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
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="relative w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20 group-hover:shadow-emerald-500/30 transition-all duration-300">
                            <Recycle className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-slate-900 tracking-tight">ECO-SORT</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        <NavItem to="/" Icon={Home}>Home</NavItem>
                        <NavItem to="/categories" Icon={Trash2}>Report Waste</NavItem>
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
                                    className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full border border-slate-200 hover:border-emerald-500/50 hover:bg-slate-50 transition-all"
                                >
                                    <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden">
                                         <img src="https://api.dicebear.com/8.x/avataaars/svg?seed=You" alt="User" className="w-full h-full" />
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {isProfileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden py-2"
                                        >
                                            <div className="px-4 py-2 border-b border-slate-50 mb-1">
                                                <p className="text-sm font-bold text-slate-900">Student User</p>
                                                <p className="text-xs text-slate-500 truncate">student@university.edu</p>
                                            </div>
                                            <Link to="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors">
                                                <User className="w-4 h-4" /> My Profile
                                            </Link>
                                            <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-colors">
                                                <BarChart3 className="w-4 h-4" /> Activity
                                            </Link>
                                            <button 
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors mt-1 border-t border-slate-50"
                                            >
                                                <LogOut className="w-4 h-4" /> Sign Out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link 
                                to="/auth" 
                                className="px-6 py-2.5 bg-slate-900 text-white rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors"
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
                        className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
                    >
                        <div className="px-4 py-6 space-y-4">
                            <NavItem to="/" Icon={Home}>Home</NavItem>
                            <NavItem to="/categories" Icon={Trash2}>Report Waste</NavItem>
                            <NavItem to="/dashboard" Icon={BarChart3}>Dashboard</NavItem>
                            <NavItem to="/credits" Icon={Medal}>Green Credits</NavItem>
                            <NavItem to="/collection-points" Icon={MapPin}>Find Locations</NavItem>
                            
                            <div className="pt-4 border-t border-slate-100">
                                {isLoggedIn ? (
                                    <>
                                        <NavItem to="/profile" Icon={User}>My Profile</NavItem>
                                        <button 
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2 px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <Link 
                                        to="/auth"
                                        className="flex items-center justify-center w-full px-4 py-3 bg-slate-900 text-white rounded-xl text-sm font-semibold"
                                    >
                                        Sign In
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
