import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './MainLayout.css';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsSidebarOpen(false); // Auto close sidebar on desktop
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
      <div className="layout">
        {/* Mobile header with hamburger menu */}
        {isMobile && (
            <header className="mobile-header">
              <button className="hamburger-btn" onClick={toggleSidebar}>
                <span className={`hamburger-line ${isSidebarOpen ? 'open' : ''}`}></span>
                <span className={`hamburger-line ${isSidebarOpen ? 'open' : ''}`}></span>
                <span className={`hamburger-line ${isSidebarOpen ? 'open' : ''}`}></span>
              </button>
              <h1 className="mobile-title">VocabMaster</h1>
            </header>
        )}

        {/* Sidebar overlay for mobile */}
        {isMobile && isSidebarOpen && (
            <div className="sidebar-overlay" onClick={closeSidebar}></div>
        )}

        {/* Sidebar */}
        <div className={`sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
          <Sidebar />
        </div>

        {/* Main content */}
        <main className={`main-content ${isMobile ? 'mobile' : ''}`}>
          {children}
        </main>
      </div>
  );
};

export default Layout;