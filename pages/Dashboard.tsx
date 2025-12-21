
import React from 'react';
import { motion } from 'framer-motion';
import { dashboardStats } from '../data/mockData';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { TrendingUp, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Jan', Recycled: 120, Repaired: 40 },
  { name: 'Feb', Recycled: 150, Repaired: 55 },
  { name: 'Mar', Recycled: 180, Repaired: 60 },
  { name: 'Apr', Recycled: 160, Repaired: 70 },
  { name: 'May', Recycled: 210, Repaired: 85 },
  { name: 'Jun', Recycled: 250, Repaired: 90 },
];

const PageWrapper = ({ children }: { children?: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8"
    >
        {children}
    </motion.div>
);

const StatCard = ({ stat }: { stat: typeof dashboardStats[0] }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm"
        >
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.gradientLight}`}>
                     <img src={stat.icon} alt={stat.label} className="w-6 h-6" />
                </div>
                <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                    +12% <ArrowUpRight className="w-3 h-3 ml-1" />
                </span>
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-1">
                    <AnimatedCounter to={stat.value} />
                </h3>
            </div>
        </motion.div>
    );
};

const Dashboard = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    return (
        <PageWrapper>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                    <p className="text-slate-500 mt-1">Overview of campus sustainability metrics.</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
                        Download Report
                    </button>
                </div>
            </div>

            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {dashboardStats.map((stat, index) => (
                    <motion.div key={index} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                        <StatCard stat={stat} />
                    </motion.div>
                ))}
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                             <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-emerald-500"/> Activity Trends
                            </h2>
                            <p className="text-sm text-slate-500">Recycled vs Repaired devices over the last 6 months</p>
                        </div>
                    </div>
                    
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }} barSize={32}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                                <XAxis 
                                    dataKey="name" 
                                    tickLine={false} 
                                    axisLine={false} 
                                    tick={{fill: '#94a3b8', fontSize: 12}} 
                                    dy={10}
                                />
                                <YAxis 
                                    tickLine={false} 
                                    axisLine={false} 
                                    tick={{fill: '#94a3b8', fontSize: 12}} 
                                />
                                <Tooltip 
                                    cursor={{fill: '#f8fafc'}}
                                    contentStyle={{
                                        backgroundColor: '#fff', 
                                        borderRadius: '12px', 
                                        border: '1px solid #e2e8f0', 
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                    }}
                                />
                                <Bar dataKey="Recycled" fill="#10b981" radius={[6, 6, 0, 0]} stackId="a" />
                                <Bar dataKey="Repaired" fill="#3b82f6" radius={[6, 6, 0, 0]} stackId="a" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col justify-center relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/30 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                     <h3 className="text-xl font-bold mb-4 relative z-10">Quick Actions</h3>
                     <div className="space-y-3 relative z-10">
                         <button className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-left text-sm font-medium transition-colors flex items-center justify-between">
                             Schedule Pickup <ArrowUpRight className="w-4 h-4"/>
                         </button>
                         <button className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl text-left text-sm font-medium transition-colors flex items-center justify-between">
                             Print Label <ArrowUpRight className="w-4 h-4"/>
                         </button>
                         <button className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-left text-sm font-medium transition-colors flex items-center justify-between shadow-lg shadow-emerald-900/50">
                             Log New Item <ArrowUpRight className="w-4 h-4"/>
                         </button>
                     </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Dashboard;
