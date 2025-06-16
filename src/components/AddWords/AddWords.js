import React, { useState } from 'react';
import './AddWords.css';

const AddWords = () => {
  const [selectedDeck, setSelectedDeck] = useState('business');
  const [inputMethod, setInputMethod] = useState('manual');
  const [wordData, setWordData] = useState({
    word: '',
    pronunciation: '',
    definition: '',
    example: ''
  });

  const decks = [
    { id: 'business', name: 'Business English', icon: '🏢', count: 45 },
    { id: 'ielts', name: 'IELTS Vocabulary', icon: '🧪', count: 128 },
    { id: 'conversation', name: 'Daily Conversation', icon: '📚', count: 74 },
    { id: 'academic', name: 'Academic Writing', icon: '🎓', count: 52 },
    { id: 'travel', name: 'Travel & Tourism', icon: '✈️', count: 38 }
  ];

  const inputMethods = [
    { id: 'manual', name: 'Manual Entry', icon: '✏️' },
    { id: 'camera', name: 'Camera Scan', icon: '📷' },
    { id: 'import', name: 'Import File', icon: '📁' }
  ];

  const handleInputChange = (field, value) => {
    setWordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddWord = async () => {
    if (!wordData.word.trim()) {
      alert('Please enter a word');
      return;
    }

    if (!wordData.definition.trim()) {
      alert('Please enter a definition');
      return;
    }

    try {
      const selectedDeckData = decks.find(deck => deck.id === selectedDeck);
      
      // API call would go here
      console.log('Adding word:', {
        ...wordData,
        deckId: selectedDeck
      });

      alert(`Word "${wordData.word}" has been added to ${selectedDeckData.name}!`);
      
      // Reset form
      setWordData({
        word: '',
        pronunciation: '',
        definition: '',
        example: ''
      });
    } catch (error) {
      console.error('Error adding word:', error);
      alert('Failed to add word. Please try again.');
    }
  };

  const handleCreateDeck = () => {
    const deckName = prompt('Enter name for new deck:');
    if (deckName && deckName.trim()) {
      alert(`New deck "${deckName}" created successfully!`);
      // Here you would typically create the new deck and refresh the selection
    }
  };

  return (
    <div className="add-words-container">
      <div className="add-words-content">
        <h3 className="add-words-title">Add New Word</h3>
        
        {/* Input Method Selection */}
        <div className="input-method-selection">
          {inputMethods.map(method => (
            <div 
              key={method.id}
              className={`input-method-option ${inputMethod === method.id ? 'active' : ''}`}
              onClick={() => setInputMethod(method.id)}
            >
              <div className="method-icon">{method.icon}</div>
              <div className="method-name">{method.name}</div>
            </div>
          ))}
        </div>
        
        {/* Deck Selection Section */}
        <div className="deck-selection-section">
          <h4 className="section-title">Choose Deck</h4>
          <p className="section-description">Select which deck you want to add this word to</p>
          
          <div className="deck-selection-grid">
            {decks.map(deck => (
              <div 
                key={deck.id}
                className="deck-option"
                onClick={() => setSelectedDeck(deck.id)}
              >
                <input 
                  type="radio" 
                  name="selectedDeck" 
                  id={`deck-${deck.id}`}
                  value={deck.id}
                  checked={selectedDeck === deck.id}
                  onChange={() => setSelectedDeck(deck.id)}
                />
                <label htmlFor={`deck-${deck.id}`} className="deck-option-card">
                  <div className="deck-option-icon">{deck.icon}</div>
                  <div className="deck-option-info">
                    <h5>{deck.name}</h5>
                    <span>{deck.count} words</span>
                  </div>
                </label>
              </div>
            ))}
            
            <div className="deck-option create-new" onClick={handleCreateDeck}>
              <label className="deck-option-card create-deck-card">
                <div className="deck-option-icon">➕</div>
                <div className="deck-option-info">
                  <h5>Create New Deck</h5>
                  <span>Start a new collection</span>
                </div>
              </label>
            </div>
          </div>
        </div>
        
        {/* Word Input Form */}
        <div className="word-input-form">
          <div className="form-group">
            <label>Word/Phrase</label>
            <input 
              type="text" 
              placeholder="Enter the word or phrase"
              value={wordData.word}
              onChange={(e) => handleInputChange('word', e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>Pronunciation</label>
            <input 
              type="text" 
              placeholder="/pronunciation/"
              value={wordData.pronunciation}
              onChange={(e) => handleInputChange('pronunciation', e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>Definition</label>
            <textarea 
              rows="3" 
              placeholder="Enter definition or translation"
              value={wordData.definition}
              onChange={(e) => handleInputChange('definition', e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>Example Sentence</label>
            <textarea 
              rows="2" 
              placeholder="Use the word in a sentence"
              value={wordData.example}
              onChange={(e) => handleInputChange('example', e.target.value)}
            />
          </div>
        </div>
        
        <button className="add-word-btn" onClick={handleAddWord}>
          ✅ Add Word to Selected Deck
        </button>
      </div>
    </div>
  );
};

export default AddWords;