import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import ProgressCircle from './ProgressCircle';
import './DeckCard.css';

const DeckCard = ({ deck, showStudyButton = false, onDeckSelect }) => {
  const navigate = useNavigate();
  const { setSelectedDeck, openModal } = useApp();

  const handleStudyClick = (e) => {
    e.stopPropagation();
    setSelectedDeck(deck);
    navigate('/study');
  };

  const handleCardClick = () => {
    if (onDeckSelect) {
      onDeckSelect(deck);
    } else {
      openModal('deckActions', deck);
    }
  };

  return (
    <div className="deck-card" onClick={handleCardClick}>
      <div className="deck-header">
        <div className="deck-info">
          <div className="deck-icon">{deck.icon}</div>
          <div className="deck-details">
            <h4>{deck.name}</h4>
            <p>{deck.totalWords} words • {deck.dueWords} due</p>
          </div>
        </div>
        <ProgressCircle progress={deck.progress} />
      </div>
      
      <div className="deck-stats">
        <div className="mini-stat">
          <span className="mini-number">{deck.learnedWords}</span>
          <span className="mini-label">Learned</span>
        </div>
        <div className="mini-stat">
          <span className="mini-number">{deck.dueWords}</span>
          <span className="mini-label">Review</span>
        </div>
        <div className="mini-stat">
          <span className="mini-number">{deck.newWords}</span>
          <span className="mini-label">New</span>
        </div>
      </div>
      
      {showStudyButton && deck.dueWords > 0 && (
        <button className="deck-study-btn" onClick={handleStudyClick}>
          <span>Study Now</span>
          <span>📚</span>
        </button>
      )}
    </div>
  );
};

export default DeckCard;
