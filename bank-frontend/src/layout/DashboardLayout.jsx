import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './Navbar';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="app-layout">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="app-main">
                <TopNavbar onMenuToggle={() => setSidebarOpen((o) => !o)} />
                <main className="app-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
