import React from 'react';
import './StatCard.css';

const StatCard = ({ number, label, gradient = 'primary' }) => {
  return (
    <div className={`stat-card gradient-${gradient}`}>
      <div className="stat-number">{number}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

export default StatCard;
