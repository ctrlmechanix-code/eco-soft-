
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Leaf, Package, Calendar, ArrowUpRight } from 'lucide-react';
import { userActivity } from '../data/mockData';

// Mock data for user
const userMonthlyData = [
  { name: 'Sep', items: 2 },
  { name: 'Oct', items: 5 },
  { name: 'Nov', items: 3 },
  { name: 'Dec', items: 8 },
  { name: 'Jan', items: 4 },
  { name: 'Feb', items: 6 },
];

const userCategoryData = [
  { name: 'Laptops', value: 3 },
  { name: 'Phones', value: 8 },
  { name: 'Peripherals', value: 5 },
  { name: 'Batteries', value: 12 },
];

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#6366f1'];

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

const UserAnalysis = () => {
    return (
        <PageWrapper>
             <div className="mb-10">
                <h1 className="text-3xl font-bold text-slate-900">Contribution Analysis</h1>
                <p className="text-slate-500 mt-1">Detailed insights into your sustainability journey and past contributions.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                 <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                            <Leaf className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Net CO₂ Impact</p>
                            <h3 className="text-2xl font-bold text-slate-900">45.2 kg</h3>
                        </div>
                    </div>
                     <p className="text-xs text-slate-400">Equivalent to planting 2 trees this year.</p>
                 </div>
                 
                 <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                            <Package className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Items Diverted</p>
                            <h3 className="text-2xl font-bold text-slate-900">28</h3>
                        </div>
                    </div>
                     <p className="text-xs text-slate-400">Top category: Batteries</p>
                 </div>

                 <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Consistency</p>
                            <h3 className="text-2xl font-bold text-slate-900">Top 15%</h3>
                        </div>
                    </div>
                     <p className="text-xs text-slate-400">You report e-waste more often than average.</p>
                 </div>
            </div>

            {/* Charts Section */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* Monthly Activity */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-900">Monthly Contributions</h3>
                        <div className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                            +15% <ArrowUpRight className="w-3 h-3 ml-1" />
                        </div>
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={userMonthlyData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                                <Tooltip 
                                    cursor={{fill: '#f8fafc'}}
                                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
                                />
                                <Bar dataKey="items" fill="#10b981" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Category Breakdown */}
                 <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Waste Type Distribution</h3>
                    <div className="h-[300px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={userCategoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {userCategoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-4 flex-wrap mt-4">
                        {userCategoryData.map((entry, index) => (
                            <div key={entry.name} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                <span className="text-sm text-slate-600">{entry.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Timeline / Recent Analysis Text */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-8 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-emerald-600"/> Impact Timeline
                </h3>
                <div className="space-y-0">
                    {userActivity.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((activity, index) => (
                        <div key={activity.id} className="relative pl-8 border-l-2 border-slate-200 pb-8 last:pb-0 last:border-l-0">
                             {/* Line connector hack for last item */}
                            <div className={`absolute top-0 left-[-2px] bottom-0 w-[2px] bg-slate-200 ${index === userActivity.length -1 ? 'hidden' : 'block'}`}></div>
                            
                            <div className={`absolute top-0 left-[-9px] w-4 h-4 rounded-full border-4 border-slate-50 ${
                                activity.action === 'Recycled' ? 'bg-emerald-500' :
                                activity.action === 'Repaired' ? 'bg-blue-500' : 'bg-amber-500'
                            }`}></div>
                            
                            <p className="text-sm text-slate-400 mb-1">{new Date(activity.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                            <p className="text-slate-800 font-medium">
                                <span className="font-bold">{activity.action}</span> {activity.item} ({activity.category}).
                                {activity.credits > 0 && <span className="text-emerald-600 font-bold ml-1">+{activity.credits} credits</span>}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">Status: {activity.status}</p>
                        </div>
                    ))}
                </div>
            </div>
        </PageWrapper>
    );
};

export default UserAnalysis;
