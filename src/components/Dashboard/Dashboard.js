import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import StatCard from '../Shared/StatCard';
import DeckCard from '../Shared/DeckCard';
import QuickAction from '../Shared/QuickAction';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { stats, decks } = useApp();

  const quickActions = [
    {
      icon: '📚',
      title: 'Start Study Session',
      description: `${stats.dueToday} words ready for review`,
      onClick: () => navigate('/study')
    },
    {
      icon: '➕',
      title: 'Add New Words',
      description: 'Expand your vocabulary',
      onClick: () => navigate('/add-words')
    },
    {
      icon: '🎯',
      title: 'Take Quick Quiz',
      description: 'Test your knowledge',
      onClick: () => navigate('/quiz')
    }
  ];

  const pendingDecks = decks.filter(deck => deck.dueWords > 0);

  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        <div className="stats-overview">
          <div className="stats-header">
            <h3>Learning Overview</h3>
            <div className="time-filter">
              <button className="filter-btn active">Today</button>
              <button className="filter-btn">Week</button>
              <button className="filter-btn">Month</button>
            </div>
          </div>
          <div className="stats-cards">
            <StatCard
              number={stats.totalWords}
              label="Total Words"
              gradient="primary"
            />
            <StatCard
              number={stats.dueToday}
              label="Due Today"
              gradient="blue"
            />
            <StatCard
              number={stats.dayStreak}
              label="Day Streak"
              gradient="green"
            />
            <StatCard
              number={`${stats.accuracy}%`}
              label="Accuracy"
              gradient="orange"
            />
          </div>
        </div>
        
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="action-list">
            {quickActions.map((action, index) => (
              <QuickAction
                key={index}
                icon={action.icon}
                title={action.title}
                description={action.description}
                onClick={action.onClick}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="pending-decks">
        <div className="section-header">
          <h3>Pending Decks</h3>
          <button 
            className="view-all-btn"
            onClick={() => navigate('/library')}
          >
            View All Decks
          </button>
        </div>
        <div className="decks-grid">
          {pendingDecks.map((deck) => (
            <DeckCard
              key={deck.id}
              deck={deck}
              showStudyButton={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
