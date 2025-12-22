import React, { useState, useEffect } from 'react';
import { activityLogs as mockLogs } from '../../data/mockData';
import { Activity } from 'lucide-react';
import type { ActivityLog } from '../../types';

const AdminActivity = () => {
    const [logs, setLogs] = useState<ActivityLog[]>([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('activity_logs') || '[]');
        // Combine and sort by newest first
        const all = [...stored, ...mockLogs].sort((a, b) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        setLogs(all);
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Activity Log</h1>
                    <p className="text-slate-500">Audit trail of all administrative actions.</p>
                </div>
                <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50">
                    Export CSV
                </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Timestamp</th>
                                <th className="px-6 py-4">Admin</th>
                                <th className="px-6 py-4">Action</th>
                                <th className="px-6 py-4">Details</th>
                                <th className="px-6 py-4">Target ID</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {logs.map((log) => (
                                <tr key={log.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 font-mono text-slate-500 text-xs whitespace-nowrap">
                                        {new Date(log.timestamp).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-900">{log.adminName}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-100 text-slate-600 text-xs font-bold">
                                            <Activity className="w-3 h-3" />
                                            {log.action.replace(/_/g, ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 max-w-md truncate" title={log.details}>{log.details}</td>
                                    <td className="px-6 py-4 font-mono text-slate-400 text-xs">{log.targetId || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminActivity;