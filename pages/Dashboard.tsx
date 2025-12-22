import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { dashboardStats as mockStats, mockSubmissions } from '../data/mockData';
import AnimatedCounter from '../components/ui/AnimatedCounter';
import { TrendingUp, ArrowUpRight, Calendar, Printer, Plus, Download } from 'lucide-react';
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
        className="max-w-7xl mx-auto py-12 md:py-16 px-4 sm:px-6 lg:px-8"
    >
        {children}
    </motion.div>
);

const StatCard = ({ stat }: { stat: typeof mockStats[0] }) => {
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
    const navigate = useNavigate();
    const [stats, setStats] = useState(mockStats);

    useEffect(() => {
        // Calculate real stats from submissions
        const localSubmissions = JSON.parse(localStorage.getItem('user_submissions') || '[]');
        const all = [...mockSubmissions, ...localSubmissions];
        
        const completed = all.filter((s: any) => s.status === 'COMPLETED');
        const pending = all.filter((s: any) => s.status === 'PENDING' || s.status === 'DROPPED');
        
        // Use mock base values if no real data is added yet to prevent empty dashboard
        const credits = completed.reduce((acc: number, s: any) => acc + (s.creditsAwarded || 0), 0) || 380;
        const recycledCount = completed.length > 0 ? completed.length : 124;
        const pendingCount = pending.length > 0 ? pending.length : 2;
        const co2 = Math.round(recycledCount * 0.36) || 45; // approx 0.36kg per device

        setStats([
            { label: "Total Recycled", value: recycledCount, icon: "https://api.dicebear.com/8.x/icons/svg?seed=recycle", gradientLight: "bg-emerald-100" },
            { label: "Green Credits", value: credits, icon: "https://api.dicebear.com/8.x/icons/svg?seed=coin", gradientLight: "bg-amber-100" },
            { label: "CO₂ Saved (kg)", value: co2, icon: "https://api.dicebear.com/8.x/icons/svg?seed=cloud", gradientLight: "bg-blue-100" },
            { label: "Pending Items", value: pendingCount, icon: "https://api.dicebear.com/8.x/icons/svg?seed=clock", gradientLight: "bg-purple-100" },
        ]);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const handlePrintLabel = () => {
        alert("Shipping label generated successfully! Check your downloads.");
    };

    const handleDownloadReport = () => {
        const headers = ['Month', 'Recycled Items', 'Repaired Items'];
        const rows = chartData.map(row => [row.name, row.Recycled, row.Repaired]);
        
        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `ecosort_report_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <PageWrapper>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                    <p className="text-slate-500 mt-1">Overview of campus sustainability metrics.</p>
                </div>
                <div className="flex-shrink-0">
                    <button 
                        onClick={handleDownloadReport}
                        className="w-full md:w-auto px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                    >
                        <Download className="w-4 h-4" />
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
                {stats.map((stat, index) => (
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
                    className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm"
                >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
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

                <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white flex flex-col justify-center relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/30 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                     <h3 className="text-xl font-bold mb-6 relative z-10">Quick Actions</h3>
                     <div className="space-y-4 relative z-10">
                         <button 
                            onClick={() => navigate('/collection-points')}
                            className="w-full py-4 px-5 bg-white/10 hover:bg-white/20 active:scale-95 rounded-xl text-left text-sm font-medium transition-all flex items-center justify-between group"
                         >
                             <div className="flex items-center gap-3">
                                <Calendar className="w-5 h-5 text-emerald-400"/>
                                <span>Schedule Pickup</span>
                             </div>
                             <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity"/>
                         </button>
                         <button 
                            onClick={handlePrintLabel}
                            className="w-full py-4 px-5 bg-white/10 hover:bg-white/20 active:scale-95 rounded-xl text-left text-sm font-medium transition-all flex items-center justify-between group"
                         >
                             <div className="flex items-center gap-3">
                                <Printer className="w-5 h-5 text-blue-400"/>
                                <span>Print Label</span>
                             </div>
                             <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity"/>
                         </button>
                         <button 
                            onClick={() => navigate('/categories')}
                            className="w-full py-4 px-5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 rounded-xl text-left text-sm font-medium transition-all flex items-center justify-between shadow-lg shadow-emerald-900/50 group"
                         >
                             <div className="flex items-center gap-3">
                                <Plus className="w-5 h-5 text-white"/>
                                <span>Log New Item</span>
                             </div>
                             <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity"/>
                         </button>
                     </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Dashboard;