
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Added useNavigate import to fix navigation error
import { useNavigate, Link } from 'react-router-dom';
import { leaderboard, achievements, userActivity } from '../data/mockData';
import { User, MapPin, Calendar, Award, Zap, Clock, Package, Leaf, MessageSquare, ExternalLink, Send, ArrowRight, X, ChevronRight, Gift, Shield } from 'lucide-react';
import Icon from '../components/ui/Icon';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { CollectionPointMessage } from '../types';

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

const Profile = () => {
    // Initialized navigate hook
    const navigate = useNavigate();
    const [messages, setMessages] = useState<(CollectionPointMessage & { isReply?: boolean, unread?: boolean })[]>([]);
    const [activeChatId, setActiveChatId] = useState<number | null>(null);
    const [replyText, setReplyText] = useState('');
    const [isSending, setIsSending] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    // User State from storage
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        loadMessages();
        // Clear unread flag when viewing profile
        localStorage.removeItem('unread_messages');

        // Load user - Prioritize the currently logged in session
        const sessionUser = localStorage.getItem('currentUser');
        if (sessionUser) {
            setUser(JSON.parse(sessionUser));
        } else {
            // Fallback for demo/dev if no auth session exists
            const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
            let fallbackUser = storedUsers.find((u: any) => u.id === 'USR-CURRENT') || leaderboard.find(u => u.isUser);
            setUser(fallbackUser);
        }
    }, []);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [activeChatId, messages]);

    const loadMessages = () => {
        const stored = JSON.parse(localStorage.getItem('cp_messages') || '[]');
        setMessages(stored);
    };

    const handleSendReply = (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyText.trim() || activeChatId === null) return;

        setIsSending(true);
        const activePoint = messages.find(m => m.pointId === activeChatId);
        if (!activePoint) return;

        const newUserMessage: CollectionPointMessage & { isReply: boolean } = {
            id: `MSG-${Date.now()}`,
            pointId: activeChatId,
            pointName: activePoint.pointName,
            text: replyText,
            date: new Date().toISOString(),
            isReply: false
        };

        const updated = [newUserMessage, ...messages];
        setMessages(updated);
        localStorage.setItem('cp_messages', JSON.stringify(updated));
        setReplyText('');
        setIsSending(false);

        // Simulate Admin Reply
        setTimeout(() => {
            const adminReply: CollectionPointMessage & { isReply: boolean, unread: boolean } = {
                id: `REPLY-${Date.now()}`,
                pointId: activeChatId,
                pointName: activePoint.pointName,
                text: "Thank you for the update! An agent has been assigned to your query. We will get back to you within 2-4 business hours.",
                date: new Date().toISOString(),
                isReply: true,
                unread: true
            };
            const withReply = [adminReply, ...JSON.parse(localStorage.getItem('cp_messages') || '[]')];
            setMessages(withReply);
            localStorage.setItem('cp_messages', JSON.stringify(withReply));
            localStorage.setItem('unread_messages', 'true');
        }, 3000);
    };

    const userData = user || { 
        points: 0, 
        name: 'Alex Morgan', 
        rank: 0, 
        avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=You',
        role: 'user'
    };

    // Group messages by PointId for the list
    const threads = Array.from(new Map(messages.map(m => [m.pointId, m])).values()) as (CollectionPointMessage & { isReply?: boolean; unread?: boolean })[];
    const activeChatMessages = messages
        .filter(m => m.pointId === activeChatId)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return (
        <PageWrapper>
            {/* Header Section */}
            <div className="relative bg-white dark:bg-slate-900 rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden mb-12">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-700 dark:to-teal-800"></div>
                
                <div className="relative flex flex-col md:flex-row items-center md:items-center gap-6 mt-12">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white dark:bg-slate-800 p-1.5 shadow-xl"
                    >
                        <img src={userData.avatar} alt={userData.name} className="w-full h-full rounded-2xl bg-slate-50 dark:bg-slate-900" />
                    </motion.div>
                    
                    <div className="flex-grow mb-2 text-center md:text-left">
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-3">
                            {userData.name}
                            {userData.role === 'admin' && (
                                <span className="px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-200 dark:border-blue-800">
                                    Admin
                                </span>
                            )}
                        </h1>
                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-slate-500 dark:text-slate-400 mt-2">
                            <span className="flex items-center gap-1.5 text-sm">
                                <User className="w-4 h-4" /> {userData.role === 'admin' ? 'Administrator' : 'Student'}
                            </span>
                            <span className="flex items-center gap-1.5 text-sm">
                                <MapPin className="w-4 h-4" /> Innovation Campus
                            </span>
                            <span className="flex items-center gap-1.5 text-sm">
                                <Calendar className="w-4 h-4" /> Joined Sept 2023
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="text-center bg-emerald-50 dark:bg-emerald-900/30 px-6 py-3 rounded-2xl border border-emerald-100 dark:border-emerald-800">
                            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-1">Total Credits</p>
                            <p className="text-2xl font-black text-slate-900 dark:text-white"><AnimatedCounter to={userData.points} /></p>
                        </div>
                        <div className="text-center bg-slate-50 dark:bg-slate-800 px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-700">
                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Rank</p>
                            <p className="text-2xl font-black text-slate-900 dark:text-white">#{userData.rank}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* NEW: Rewards & Transactions Summary */}
            <div className={`grid lg:grid-cols-${userData.role === 'admin' ? '3' : '2'} gap-8 mb-8`}>
                {userData.role === 'admin' && (
                    <div 
                        onClick={() => navigate('/admin/dashboard')}
                        className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-[2rem] border border-blue-100 dark:border-blue-900/30 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-white dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl shadow-sm">
                                <Shield className="w-6 h-6" />
                            </div>
                            <ArrowRight className="w-5 h-5 text-blue-300 dark:text-blue-700 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Admin Panel</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">Access system management.</p>
                    </div>
                )}

                <div 
                    onClick={() => navigate('/my-redemptions')}
                    className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-xl">
                            <Gift className="w-6 h-6" />
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">My Redemptions</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">View active codes and past rewards.</p>
                </div>

                <div 
                    onClick={() => navigate('/credits/transactions')}
                    className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-xl">
                            <Clock className="w-6 h-6" />
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Transaction Ledger</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Track how you earned and spent credits.</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                        <Leaf className="w-5 h-5 text-emerald-500" /> Lifetime Impact
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-5 bg-emerald-50/50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl">
                            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-3">
                                <Package className="w-5 h-5" />
                            </div>
                            <p className="text-2xl font-black text-slate-900 dark:text-white">14</p>
                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mt-1">Items Recycled</p>
                        </div>
                        <div className="p-5 bg-blue-50/50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-3">
                                <Zap className="w-5 h-5" />
                            </div>
                            <p className="text-2xl font-black text-slate-900 dark:text-white">45kg</p>
                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mt-1">CO₂ Saved</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <Award className="w-5 h-5 text-amber-500" /> Badges & Achievements
                        </h3>
                    </div>
                    <div className="grid grid-cols-2 sm:flex sm:gap-4 gap-3 sm:overflow-x-auto pb-2 scrollbar-hide">
                        {achievements.map((ach, i) => (
                            <div key={i} className="flex-shrink-0 flex flex-col items-center text-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 w-full sm:w-32">
                                <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center text-amber-500 mb-3">
                                    <Icon name={ach.icon as any} className="w-6 h-6" />
                                </div>
                                <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight truncate w-full">{ach.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden h-full min-h-[400px] md:min-h-[500px] flex flex-col">
                        <div className="p-8 border-b border-slate-100 dark:border-slate-800">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-blue-500" /> Messaging Portal
                            </h3>
                        </div>
                        
                        <div className="flex-grow overflow-y-auto p-4 space-y-3">
                            {threads.length > 0 ? (
                                threads.map((thread) => (
                                    <button 
                                        key={thread.pointId}
                                        onClick={() => setActiveChatId(thread.pointId)}
                                        className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group ${
                                            activeChatId === thread.pointId 
                                            ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 shadow-sm' 
                                            : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                                        }`}
                                    >
                                        <div className="flex-grow pr-4">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className={`text-sm font-bold ${activeChatId === thread.pointId ? 'text-blue-700 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>{thread.pointName}</p>
                                                {messages.some(m => m.pointId === thread.pointId && m.unread) && (
                                                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{thread.text}</p>
                                        </div>
                                        <ChevronRight className={`w-4 h-4 transition-colors ${activeChatId === thread.pointId ? 'text-blue-500' : 'text-slate-300 dark:text-slate-600'}`} />
                                    </button>
                                ))
                            ) : (
                                <div className="text-center py-20">
                                    <MessageSquare className="w-12 h-12 text-slate-100 dark:text-slate-800 mx-auto mb-4" />
                                    <p className="text-slate-400 dark:text-slate-500 text-sm">No messages yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden h-full min-h-[400px] md:min-h-[500px] flex flex-col">
                        {activeChatId ? (
                            <>
                                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-800/30">
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white">{messages.find(m => m.pointId === activeChatId)?.pointName}</h3>
                                        <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest">Active Chat</p>
                                    </div>
                                    <button 
                                        onClick={() => setActiveChatId(null)}
                                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="flex-grow p-6 overflow-y-auto space-y-4 max-h-[400px]">
                                    {activeChatMessages.map((msg) => (
                                        <motion.div 
                                            key={msg.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex ${msg.isReply ? 'justify-start' : 'justify-end'}`}
                                        >
                                            <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                                                msg.isReply 
                                                ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700' 
                                                : 'bg-slate-900 dark:bg-blue-600 text-white rounded-tr-none'
                                            }`}>
                                                <p>{msg.text}</p>
                                                <p className={`text-[10px] mt-2 ${msg.isReply ? 'text-slate-400' : 'text-slate-400 dark:text-blue-200'}`}>
                                                    {new Date(msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                    <div ref={chatEndRef} />
                                </div>

                                <form onSubmit={handleSendReply} className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30">
                                    <div className="relative">
                                        <input 
                                            type="text"
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            placeholder="Type your message..."
                                            className="w-full pl-6 pr-14 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm text-slate-900 dark:text-white"
                                        />
                                        <button 
                                            type="submit"
                                            disabled={!replyText.trim() || isSending}
                                            className="absolute right-2 top-2 p-2.5 bg-slate-900 dark:bg-blue-600 text-white rounded-xl hover:bg-blue-600 dark:hover:bg-blue-50 disabled:bg-slate-200 dark:disabled:bg-slate-700 transition-all active:scale-95"
                                        >
                                            <Send className="w-5 h-5" />
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <div className="flex-grow flex flex-col items-center justify-center p-12 text-center">
                                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                                    <MessageSquare className="w-10 h-10 text-slate-200 dark:text-slate-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Your Conversations</h3>
                                <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto mb-8">
                                    Select a collection center from the left to view message history or send a new inquiry.
                                </p>
                                <button 
                                    onClick={() => navigate('/collection-points')}
                                    className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-lg"
                                >
                                    Find Locations <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Contribution History Table */}
            <div className="mt-12 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Contribution History</h3>
                </div>
                <div className="p-4 space-y-2">
                    {userActivity.map((activity, index) => (
                        <motion.div 
                            key={activity.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 font-bold text-xs shrink-0">
                                {new Date(activity.date).getDate()}
                                <span className="text-[10px] font-normal uppercase ml-0.5">
                                    {new Date(activity.date).toLocaleString('default', { month: 'short' })}
                                </span>
                            </div>
                            <div className="flex-grow min-w-0">
                                <h4 className="font-bold text-slate-900 dark:text-white truncate">{activity.item}</h4>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    <span className="text-xs text-slate-500 dark:text-slate-400 px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md truncate">
                                        {activity.category}
                                    </span>
                                </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 shrink-0 ${activity.status === 'Verified' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                                {activity.status}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </PageWrapper>
    );
};

export default Profile;
