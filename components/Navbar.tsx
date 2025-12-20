
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Recycle, Menu, X, Home, Trash2, BarChart3, Medal, LogOut, User, Settings, ChevronDown } from 'lucide-react';

const NavItem = ({ to, children, Icon, onClick }: { to: string; children: React.ReactNode; Icon: React.ElementType; onClick?: () => void }) => (
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
        setIsOpen(false); // Close mobile menu on navigation
    }, [location]);

    // Handle clicks outside dropdown
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
        setIsProfileOpen(false);
        setIsOpen(false);
        navigate('/auth');
    };

    const navLinks = [
        { to: "/", label: "Home", icon: Home },
        { to: "/categories", label: "Report", icon: Trash2 },
        { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
        { to: "/credits", label: "Credits", icon: Medal },
    ];

    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 supports-[backdrop-filter]:bg-white/60"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2 group">
                           <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-xl shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
                                <Recycle className="h-6 w-6 text-white" />
                           </div>
                           <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight">ECO-SORT</span>
                        </Link>
                    </div>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-1">
                       {navLinks.map(link => (
                           <NavItem key={link.to} to={link.to} Icon={link.icon}>{link.label}</NavItem>
                       ))}
                    </div>

                    <div className="hidden md:flex items-center pl-6 border-l border-slate-200 ml-6">
                         {isLoggedIn ? (
                             <div className="relative" ref={dropdownRef}>
                                <div 
                                    className="flex items-center gap-3 cursor-pointer p-1 rounded-xl hover:bg-slate-50 transition-colors"
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                >
                                    <div className="text-right hidden lg:block">
                                        <p className="text-xs font-semibold text-slate-900">Alex M.</p>
                                        <p className="text-[10px] text-slate-500">Premium User</p>
                                    </div>
                                    <motion.div
                                        className="relative"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <div className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                                             <img src="https://api.dicebear.com/8.x/avataaars/svg?seed=Alex" alt="User" />
                                        </div>
                                        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                                    </motion.div>
                                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                                </div>

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {isProfileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.1 }}
                                            className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 overflow-hidden"
                                        >
                                            <div className="px-4 py-3 border-b border-slate-50">
                                                <p className="text-sm font-semibold text-slate-900">Alex Morgan</p>
                                                <p className="text-xs text-slate-500 truncate">alex.morgan@campus.edu</p>
                                            </div>
                                            
                                            <div className="p-1">
                                                <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/50 rounded-lg transition-colors">
                                                    <User className="w-4 h-4" /> Profile
                                                </Link>
                                                <Link to="/settings" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/50 rounded-lg transition-colors">
                                                    <Settings className="w-4 h-4" /> Settings
                                                </Link>
                                            </div>
                                            
                                            <div className="p-1 border-t border-slate-50 mt-1">
                                                <button 
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <LogOut className="w-4 h-4" /> Sign Out
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                             </div>
                         ) : (
                             <div className="flex items-center gap-3">
                                 <Link 
                                    to="/auth"
                                    className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                                 >
                                     Sign In
                                 </Link>
                                 <Link 
                                    to="/auth"
                                    className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-full hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
                                 >
                                     Sign Up
                                 </Link>
                             </div>
                         )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
                        >
                            <span className="sr-only">Open menu</span>
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-slate-100"
                >
                    <div className="px-4 pt-4 pb-6 space-y-2">
                        {navLinks.map(link => (
                           <Link 
                                key={link.to} 
                                to={link.to}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                                    location.pathname === link.to
                                    ? 'bg-emerald-50 text-emerald-600'
                                    : 'text-slate-600 hover:bg-slate-50'
                                }`}
                           >
                               <link.icon className="h-5 w-5" />
                               {link.label}
                           </Link>
                       ))}
                       
                       <div className="border-t border-slate-100 my-4 pt-4 px-4">
                            {isLoggedIn ? (
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                                        <img src="https://api.dicebear.com/8.x/avataaars/svg?seed=Alex" alt="User" />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-sm font-semibold text-slate-900">Alex Morgan</p>
                                        <button 
                                            onClick={handleLogout} 
                                            className="text-xs text-red-500 font-medium hover:underline flex items-center gap-1 mt-0.5"
                                        >
                                            <LogOut className="w-3 h-3" /> Sign Out
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                     <Link 
                                        to="/auth"
                                        onClick={() => setIsOpen(false)}
                                        className="w-full py-3 bg-slate-900 text-white text-center rounded-xl font-medium"
                                     >
                                         Sign In
                                     </Link>
                                </div>
                            )}
                       </div>
                    </div>
                </motion.div>
            )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
