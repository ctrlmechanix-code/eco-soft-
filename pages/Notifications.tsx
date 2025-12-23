
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockNotifications } from '../data/mockData';
import { AppNotification } from '../types';
import { Bell, CheckCircle2, Info, AlertTriangle, X, Check } from 'lucide-react';

const PageWrapper = ({ children }: { children?: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
    >
        {children}
    </motion.div>
);

const Notifications = () => {
    const [notifications, setNotifications] = useState<AppNotification[]>([]);

    useEffect(() => {
        // Load notifications from local storage and merge with mock
        const storedNotifs = JSON.parse(localStorage.getItem('user_notifications') || '[]');
        
        // Merge strategy: Mock data first, then stored data overrides it (if IDs match).
        // This ensures that if a user marks a mock notification as read (stored in localStorage), 
        // the read version takes precedence.
        const allNotifs = [...mockNotifications, ...storedNotifs];
        
        // Remove duplicates using Map (keeps the last occurrence, which is from storedNotifs)
        const unique = Array.from(new Map(allNotifs.map(item => [item.id, item])).values())
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            
        setNotifications(unique);
    }, []);

    const markAsRead = (id: string) => {
        const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
        setNotifications(updated);
        
        // In a real app we'd sync this. Here we'll just save the *updates* to local storage
        // Note: We need to save the full state so we don't lose the "read" status on reload
        localStorage.setItem('user_notifications', JSON.stringify(updated));
        
        // Trigger a storage event so Navbar updates
        window.dispatchEvent(new Event('storage'));
    };

    const markAllRead = () => {
        const updated = notifications.map(n => ({ ...n, read: true }));
        setNotifications(updated);
        localStorage.setItem('user_notifications', JSON.stringify(updated));
        window.dispatchEvent(new Event('storage'));
    };

    const deleteNotification = (id: string) => {
        const updated = notifications.filter(n => n.id !== id);
        setNotifications(updated);
        localStorage.setItem('user_notifications', JSON.stringify(updated));
        window.dispatchEvent(new Event('storage'));
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'success': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
            case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
            case 'alert': return <AlertTriangle className="w-5 h-5 text-red-500" />;
            default: return <Info className="w-5 h-5 text-blue-500" />;
        }
    };

    const getBgColor = (type: string) => {
        switch (type) {
            case 'success': return 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/30';
            case 'warning': return 'bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/30';
            case 'alert': return 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30';
            default: return 'bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30';
        }
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <PageWrapper>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Notifications</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Stay updated with your latest activities and announcements.</p>
                </div>
                {unreadCount > 0 && (
                    <button 
                        onClick={markAllRead}
                        className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                    >
                        <Check className="w-4 h-4" /> Mark all read
                    </button>
                )}
            </div>

            {notifications.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300 dark:text-slate-600">
                        <Bell className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">No notifications</h3>
                    <p className="text-slate-500 dark:text-slate-400">You're all caught up!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    <AnimatePresence>
                        {notifications.map((notif) => (
                            <motion.div
                                key={notif.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                className={`p-5 rounded-2xl border transition-all relative group ${
                                    notif.read 
                                    ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800' 
                                    : 'bg-white dark:bg-slate-900 border-emerald-500 dark:border-emerald-500 shadow-sm ring-1 ring-emerald-500/10'
                                }`}
                            >
                                <div className="flex gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${getBgColor(notif.type)}`}>
                                        {getIcon(notif.type)}
                                    </div>
                                    
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className={`font-bold text-sm ${notif.read ? 'text-slate-700 dark:text-slate-300' : 'text-slate-900 dark:text-white'}`}>
                                                {notif.title}
                                                {!notif.read && <span className="ml-2 inline-block w-2 h-2 bg-emerald-500 rounded-full" />}
                                            </h3>
                                            <span className="text-xs text-slate-400 whitespace-nowrap ml-2">
                                                {new Date(notif.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-2">
                                            {notif.message}
                                        </p>
                                        
                                        {!notif.read && (
                                            <button 
                                                onClick={() => markAsRead(notif.id)}
                                                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                                            >
                                                Mark as read
                                            </button>
                                        )}
                                    </div>

                                    <button 
                                        onClick={() => deleteNotification(notif.id)}
                                        className="absolute top-2 right-2 p-1.5 text-slate-300 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all opacity-0 group-hover:opacity-100"
                                        title="Delete"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </PageWrapper>
    );
};

export default Notifications;
