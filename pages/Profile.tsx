import React from 'react';
import { motion } from 'framer-motion';
import { leaderboard, achievements, userActivity } from '../data/mockData';
import { User, MapPin, Calendar, Award, Zap, Clock, CheckCircle2, Package, Leaf } from 'lucide-react';
import Icon from '../components/ui/Icon';
import AnimatedCounter from '../components/ui/AnimatedCounter';

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
    // Mock user data derived from leaderboard
    const user = leaderboard.find(u => u.isUser) || { 
        points: 0, 
        name: 'Alex Morgan', 
        rank: 0, 
        avatar: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Alex' 
    };

    return (
        <PageWrapper>
            {/* Header Section */}
            <div className="relative bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-200 overflow-hidden mb-12">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-emerald-600 to-teal-500"></div>
                
                <div className="relative flex flex-col md:flex-row items-end md:items-center gap-6 mt-12">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-32 h-32 rounded-3xl bg-white p-1.5 shadow-xl"
                    >
                        <img src={user.avatar} alt={user.name} className="w-full h-full rounded-2xl bg-slate-50" />
                    </motion.div>
                    
                    <div className="flex-grow mb-2">
                        <h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>
                        <div className="flex flex-wrap items-center gap-4 text-slate-500 mt-2">
                            <span className="flex items-center gap-1.5 text-sm">
                                <User className="w-4 h-4" /> Student
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
                        <div className="text-center bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100">
                            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-1">Total Credits</p>
                            <p className="text-2xl font-black text-slate-900"><AnimatedCounter to={user.points} /></p>
                        </div>
                        <div className="text-center bg-slate-50 px-6 py-3 rounded-2xl border border-slate-200">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Rank</p>
                            <p className="text-2xl font-black text-slate-900">#{user.rank}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Stats & Achievements */}
                <div className="space-y-8">
                    {/* Impact Stats */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Leaf className="w-5 h-5 text-emerald-500" /> Lifetime Impact
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                                        <Package className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium text-slate-600">Items Recycled</span>
                                </div>
                                <span className="text-xl font-bold text-slate-900">14</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium text-slate-600">CO₂ Saved</span>
                                </div>
                                <span className="text-xl font-bold text-slate-900">45kg</span>
                            </div>
                        </div>
                    </div>

                    {/* Achievements */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <Award className="w-5 h-5 text-amber-500" /> Badges
                            </h3>
                            <span className="text-xs font-medium text-emerald-600 cursor-pointer hover:underline">View All</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            {achievements.map((ach, i) => (
                                <div key={i} className="flex flex-col items-center text-center p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-amber-500 mb-3">
                                        <Icon name={ach.icon as any} className="w-6 h-6" />
                                    </div>
                                    <p className="text-sm font-bold text-slate-900 leading-tight mb-1">{ach.title}</p>
                                    <p className="text-[10px] text-slate-500">{ach.description}</p>
                                </div>
                            ))}
                            {/* Placeholder for locked achievement */}
                            <div className="flex flex-col items-center text-center p-4 rounded-2xl border-2 border-dashed border-slate-200 opacity-60">
                                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                                    <Award className="w-6 h-6" />
                                </div>
                                <p className="text-xs font-semibold text-slate-400">Locked</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Activity History */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden h-full">
                        <div className="p-8 border-b border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900">Recent Activity</h3>
                        </div>
                        <div className="p-2">
                            {userActivity.map((activity, index) => (
                                <motion.div 
                                    key={activity.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group flex flex-col sm:flex-row items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors border border-transparent hover:border-slate-100"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs shrink-0">
                                        {new Date(activity.date).getDate()}
                                        <span className="text-[10px] font-normal uppercase ml-0.5">
                                            {new Date(activity.date).toLocaleString('default', { month: 'short' })}
                                        </span>
                                    </div>
                                    
                                    <div className="flex-grow text-center sm:text-left">
                                        <h4 className="font-bold text-slate-900">{activity.item}</h4>
                                        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-1">
                                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                                <Package className="w-3 h-3" /> {activity.category}
                                            </span>
                                            <span className="text-xs text-slate-500 px-2 py-0.5 bg-slate-100 rounded-md">
                                                {activity.action}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            {activity.credits > 0 ? (
                                                <span className="text-sm font-bold text-emerald-600">+{activity.credits} pts</span>
                                            ) : (
                                                <span className="text-sm font-medium text-slate-400">-</span>
                                            )}
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5
                                            ${activity.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 
                                              activity.status === 'Completed' ? 'bg-blue-50 text-blue-700' : 
                                              'bg-amber-50 text-amber-700'
                                            }`}
                                        >
                                            {activity.status === 'Verified' && <CheckCircle2 className="w-3 h-3" />}
                                            {activity.status === 'Processing' && <Clock className="w-3 h-3" />}
                                            {activity.status === 'Completed' && <CheckCircle2 className="w-3 h-3" />}
                                            {activity.status}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                         {/* Empty State / Load More */}
                        <div className="p-8 text-center border-t border-slate-50 mt-4">
                            <button className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors">
                                View Full History
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Profile;