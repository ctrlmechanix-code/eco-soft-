
import React from 'react';
import { motion } from 'framer-motion';
import { mockSubmissions, leaderboard, collectionPoints, activityLogs } from '../../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Package, Users, Coins, MapPin, ArrowUpRight, TrendingUp } from 'lucide-react';
import AnimatedCounter from '../../components/ui/AnimatedCounter';

const Dashboard = () => {
    // Calculate Stats
    const totalSubmissions = mockSubmissions.length;
    const pendingSubmissions = mockSubmissions.filter(s => s.status === 'PENDING').length;
    const droppedSubmissions = mockSubmissions.filter(s => s.status === 'DROPPED').length;
    const completedSubmissions = mockSubmissions.filter(s => s.status === 'COMPLETED').length;
    const totalUsers = leaderboard.length;
    const totalCredits = leaderboard.reduce((acc, curr) => acc + curr.points, 0);
    const activePoints = collectionPoints.filter(p => p.status === 'Active').length;

    const stats = [
        { label: "Total Submissions", value: totalSubmissions, icon: Package, color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400", trend: "+12%" },
        { label: "Active Users", value: totalUsers, icon: Users, color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400", trend: "+5%" },
        { label: "Credits Awarded", value: totalCredits, icon: Coins, color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400", trend: "+8%" },
        { label: "Collection Points", value: activePoints, icon: MapPin, color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400", trend: "Stable" },
    ];

    const submissionData = [
        { name: 'Pending', value: pendingSubmissions, color: '#f59e0b' },
        { name: 'Dropped', value: droppedSubmissions, color: '#3b82f6' },
        { name: 'Completed', value: completedSubmissions, color: '#10b981' },
    ];

    const activityData = [
        { name: 'Mon', count: 12 },
        { name: 'Tue', count: 19 },
        { name: 'Wed', count: 15 },
        { name: 'Thu', count: 22 },
        { name: 'Fri', count: 30 },
        { name: 'Sat', count: 10 },
        { name: 'Sun', count: 8 },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
                <p className="text-slate-500 dark:text-slate-400">Welcome back, here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full flex items-center">
                                {stat.trend} <ArrowUpRight className="w-3 h-3 ml-0.5" />
                            </span>
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.label}</p>
                            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1"><AnimatedCounter to={stat.value} /></h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Weekly Submissions Activity</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activityData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" className="dark:opacity-10" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                                <Tooltip 
                                    cursor={{fill: '#f8fafc', opacity: 0.1}}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#1e293b', color: '#fff' }}
                                />
                                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Submission Status</h3>
                    <div className="h-[300px] relative">
                         <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={submissionData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {submissionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', backgroundColor: '#1e293b', color: '#fff' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalSubmissions}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase">Total</p>
                        </div>
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                        {submissionData.map(d => (
                            <div key={d.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div>
                                <span className="text-sm text-slate-600 dark:text-slate-400">{d.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Admin Activity</h3>
                    <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">View All</button>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {activityLogs.slice(0, 5).map((log) => (
                        <div key={log.id} className="p-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                                <TrendingUp className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-slate-900 dark:text-white">{log.action.replace(/_/g, ' ')}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{log.details} by {log.adminName}</p>
                            </div>
                            <span className="text-xs text-slate-400">{new Date(log.timestamp).toLocaleDateString()}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
