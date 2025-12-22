
import React from 'react';
import { Settings, Bell, Lock, User } from 'lucide-react';

const AdminSettings = () => {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Platform Settings</h1>
                <p className="text-slate-500 dark:text-slate-400">Configure global system preferences.</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm divide-y divide-slate-100 dark:divide-slate-800">
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
        </div>
    );
};

export default AdminSettings;
