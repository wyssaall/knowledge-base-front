import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';

const AdminLayout = () => {
    return (
        <div className="flex bg-gray-50 min-h-screen">
            {/* Left Column: Fixed Sidebar */}
            <aside className="w-64 flex-shrink-0">
                <AdminSidebar />
            </aside>

            {/* Right Column: Main Content */}
            <main className="flex-1 overflow-x-hidden">
                <div className="w-full">
                    {/* The Outlet renders the child route matching the current URL */}
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
