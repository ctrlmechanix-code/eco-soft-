
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex">
            <Sidebar />
            <div className="flex-1 ml-64 flex flex-col min-h-screen">
                <AdminNavbar />
                <main className="flex-1 p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
