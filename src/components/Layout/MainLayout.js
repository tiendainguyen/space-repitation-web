import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <div className="layout-container">
        <Sidebar />
        <div className="content-wrapper">
          <Header />
          <main className="main-content">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
