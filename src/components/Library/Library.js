import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import dataService from '../../services/dataService';
import './Library.css';

const Library = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All Decks');
  const itemsPerPage = 6;

  const loadDecks = async (page = 1, search = '') => {
    try {
      setLoading(true);
      const result = await dataService.searchDecks(page, itemsPerPage, search);
      
      if (result.success) {
        setDecks(result.data.data.data.decks);
        setCurrentPage(result.data.data.data.pagination.currentPage);
        setTotalPages(result.data.data.data.pagination.totalPages);
        setTotalItems(result.data.data.data.pagination.totalItems);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to load decks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Library useEffect - isAuthenticated:', isAuthenticated, 'authLoading:', authLoading);
    console.log('Token in localStorage:', localStorage.getItem('vocabmaster_token'));
    
    if (isAuthenticated && !authLoading) {
      loadDecks(currentPage, searchTerm);
    }
  }, [currentPage, isAuthenticated, authLoading]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1);
    loadDecks(1, value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
    return `${Math.ceil(diffDays / 365)} years ago`;
  };

  const createNewDeck = () => {
    console.log('Navigate to create deck screen');
  };

  const testTokenSetting = () => {
    // Test function to manually set a token for debugging
    const testToken = 'test-token-12345';
    localStorage.setItem('vocabmaster_token', testToken);
    console.log('Test token set:', localStorage.getItem('vocabmaster_token'));
    alert('Test token set! Check console and try refreshing the page.');
  };

  const editDeck = (deckId) => {
    console.log('Navigate to edit deck screen for:', deckId);
  };

  const deleteDeck = (deckId) => {
    console.log('Navigate to delete deck confirmation for:', deckId);
  };

  if (authLoading) {
    return (
      <div className="library">
        <div className="loading">Checking authentication...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="library">
        <div className="error">
          Please log in to view your deck library.
          <br />
          <button onClick={testTokenSetting} style={{marginTop: '10px', padding: '5px 10px'}}>
            [DEBUG] Set Test Token
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="library">
        <div className="loading">Loading decks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="library">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="library">
      <div className="library-container">
        <div className="library-header">
          <h3>My Deck Collection</h3>
          <div className="library-controls">
            <div className="deck-search-box">
              <span className="deck-search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Search decks by name..." 
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <button className="create-deck-btn" onClick={createNewDeck}>
              <span>➕</span>
              <span>Create New Deck</span>
            </button>
          </div>
        </div>
        
        <div className="filter-section">
          <span style={{color: '#718096', fontWeight: '500'}}>Filter by:</span>
          {['All Decks', 'In Progress', 'Completed', 'Recently Created'].map((filterType) => (
            <button 
              key={filterType}
              className={`filter-btn ${filter === filterType ? 'active' : ''}`}
              onClick={() => handleFilterChange(filterType)}
            >
              {filterType}
            </button>
          ))}
        </div>
        
        <div className="library-grid">
          {decks.map((deck) => (
            <div key={deck.id} className="library-deck-card">
              <div className="library-deck-header">
                <div className="library-deck-info">
                  <div className="deck-icon">{deck.deckIcon}</div>
                  <div>
                    <h4>{deck.name}</h4>
                    <div className="deck-meta">
                      {deck.flashcardCount} words • Created {formatDate(deck.createdAt)}
                    </div>
                  </div>
                </div>
                <span className="progress-percent">{deck.progress}%</span>
              </div>
              <div className="deck-stats">
                <div className="mini-stat">
                  <span className="mini-number">{deck.learnedCards}</span>
                  <span className="mini-label">Learned</span>
                </div>
                <div className="mini-stat">
                  <span className="mini-number">{deck.reviewCards}</span>
                  <span className="mini-label">Review</span>
                </div>
                <div className="mini-stat">
                  <span className="mini-number">{deck.newCards}</span>
                  <span className="mini-label">New</span>
                </div>
              </div>
              <div className="mini-progress-bar">
                <div className="mini-progress-fill" style={{width: `${deck.progress}%`}}></div>
              </div>
              <div className="deck-actions">
                <button className="action-btn primary">📖 Study</button>
                <button className="action-btn secondary" onClick={() => editDeck(deck.id)}>✏️ Edit</button>
                <button className="action-btn danger" onClick={() => deleteDeck(deck.id)}>🗑️ Delete</button>
              </div>
            </div>
          ))}
        </div>
        
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className="pagination-btn" 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ‹ Previous
            </button>
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              return (
                <button 
                  key={pageNum}
                  className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            <span className="pagination-info">
              Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} decks
            </span>
            <button 
              className="pagination-btn" 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;