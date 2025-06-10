import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Search query:', searchQuery);
  };

  return (
    <header className="top-header">
      <div className="header-left">
        <h2>Welcome back, {user?.name?.split(' ')[0] || 'User'}!</h2>
        <p>Ready to expand your vocabulary today?</p>
      </div>
      
      <div className="header-right">
        <form className="search-box" onSubmit={handleSearch}>
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search words, decks, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        
        <button className="notification-btn">
          <span>🔔</span>
          <div className="notification-badge"></div>
        </button>
      </div>
    </header>
  );
};

export default Header;
