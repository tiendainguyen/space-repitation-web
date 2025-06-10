import React from 'react';
import './QuickAction.css';

const QuickAction = ({ icon, title, description, onClick }) => {
  return (
    <div className="quick-action-item" onClick={onClick}>
      <div className="action-icon">
        {icon}
      </div>
      <div className="action-content">
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default QuickAction;
