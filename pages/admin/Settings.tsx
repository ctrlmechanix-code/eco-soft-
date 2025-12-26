
import React from 'react';
import { Settings, Bell, Lock, User, RefreshCw, AlertTriangle } from 'lucide-react';

const AdminSettings = () => {
    
    const handleResetSystem = () => {
        if (window.confirm("CRITICAL WARNING: This will delete ALL local data (users, submissions, credits, content) and reset the application to its initial state. This cannot be undone. Are you sure?")) {
            localStorage.clear();
            window.location.reload();
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Platform Settings</h1>
                <p className="text-slate-500 dark:text-slate-400">Configure global system preferences.</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm divide-y divide-slate-100 dark:divide-slate-800 mb-8">
                <div className="p-6 flex items-start gap-4">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300">
                        <User className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">General Settings</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Platform name, contact email, and localization.</p>
                        <button className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline">Edit Details</button>
                    </div>
                </div>

                <div className="p-6 flex items-start gap-4">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300">
                        <Bell className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Notifications</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Configure email alerts and system notifications.</p>
                        <button className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline">Manage Alerts</button>
                    </div>
                </div>

                <div className="p-6 flex items-start gap-4">
                    <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300">
                        <Lock className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Security & Access</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">Manage admin accounts and roles.</p>
                        <button className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline">View Admins</button>
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/30 overflow-hidden">
                <div className="p-6 border-b border-red-100 dark:border-red-900/30">
                    <h3 className="text-lg font-bold text-red-900 dark:text-red-400 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" /> Danger Zone
                    </h3>
                </div>
                <div className="p-6 flex items-center justify-between">
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-1">Reset System Data</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
                            Clear all local storage data, including users, submissions, and settings. This returns the app to the initial demo state.
                        </p>
                    </div>
                    <button 
                        onClick={handleResetSystem}
                        className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20 flex items-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" /> Reset Data
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
