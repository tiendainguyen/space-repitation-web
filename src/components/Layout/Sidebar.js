import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const navigationItems = [
    { path: '/dashboard', icon: '🏠', label: 'Dashboard' },
    { path: '/study', icon: '📚', label: 'Study Session' },
    { path: '/quiz', icon: '🎯', label: 'Take Quiz' },
    { path: '/library', icon: '📚', label: 'Deck Library' },
    { path: '/add-words', icon: '➕', label: 'Add Words' },
    { path: '/analytics', icon: '📊', label: 'Analytics' },
    { path: '/settings', icon: '⚙️', label: 'Settings' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="logo">
          <h1>VocabMaster</h1>
          <p>Spaced Repetition Learning</p>
        </div>
        
        <nav className="nav-menu">
          {navigationItems.map((item) => (
            <div
              key={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => handleNavigation(item.path)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.label}</span>
            </div>
          ))}
        </nav>
        
        <div className="user-section">
          <div className="user-avatar">{user?.avatar || 'U'}</div>
          <div className="user-info">
            <h4>{user?.name || 'User'}</h4>
            <p>{user?.membershipType || 'Free'} Member</p>
          </div>
          <button className="logout-btn" onClick={handleLogout} title="Logout">
            🚪
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
