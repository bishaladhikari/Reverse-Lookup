// src/components/layout.tsx
import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const handleLogout = () => {
        // Perform logout operations
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar onLogout={handleLogout} />
            <main style={{ flexGrow: 1, padding: '1rem' }}>{children}</main>
        </div>
    );
};

export default Layout;
