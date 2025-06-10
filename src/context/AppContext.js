import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);

  // Mock data - in real app this would come from API
  const [decks] = useState([
    {
      id: 'business',
      name: 'Business English',
      icon: '🏢',
      totalWords: 45,
      dueWords: 8,
      learnedWords: 34,
      newWords: 3,
      progress: 75
    },
    {
      id: 'ielts',
      name: 'IELTS Vocabulary',
      icon: '🧪',
      totalWords: 128,
      dueWords: 6,
      learnedWords: 77,
      newWords: 45,
      progress: 60
    },
    {
      id: 'conversation',
      name: 'Daily Conversation',
      icon: '📚',
      totalWords: 89,
      dueWords: 4,
      learnedWords: 80,
      newWords: 5,
      progress: 90
    }
  ]);

  const [stats] = useState({
    totalWords: 247,
    dueToday: 18,
    dayStreak: 12,
    accuracy: 85
  });

  const openModal = (type, data = null) => {
    setModalType(type);
    setShowModal(true);
    if (data) {
      setSelectedDeck(data);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
    setSelectedDeck(null);
  };

  const flipCard = () => {
    setIsCardFlipped(!isCardFlipped);
  };

  const nextCard = () => {
    setCurrentCard(prev => prev + 1);
    setIsCardFlipped(false);
  };

  const resetStudySession = () => {
    setCurrentCard(0);
    setIsCardFlipped(false);
  };

  const value = {
    decks,
    stats,
    selectedDeck,
    setSelectedDeck,
    currentCard,
    setCurrentCard,
    isCardFlipped,
    setIsCardFlipped,
    showModal,
    modalType,
    openModal,
    closeModal,
    flipCard,
    nextCard,
    resetStudySession
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
