
import React, { useState } from 'react';
import { BarChart3, Download } from 'lucide-react';

const AdminReports = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">System Reports</h1>
                    <p className="text-slate-500 dark:text-slate-400">Generate and download detailed system analytics.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {['Financial Report', 'User Engagement', 'Environmental Impact', 'Inventory Log'].map((report) => (
                    <div key={report} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 mb-4">
                            <BarChart3 className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-2">{report}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Last generated: 2 days ago</p>
                        <button className="mt-auto w-full py-2 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center gap-2 transition-colors">
                            <Download className="w-4 h-4" /> Download PDF
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminReports;
