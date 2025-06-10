import React from 'react';
import './ProgressCircle.css';

const ProgressCircle = ({ progress, size = 60 }) => {
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="progress-circle" style={{ width: size, height: size }}>
      <svg className="progress-svg" width={size} height={size}>
        <circle
          className="progress-bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth="4"
        />
        <circle
          className="progress-fill"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth="4"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <span className="progress-text">{progress}%</span>
    </div>
  );
};

export default ProgressCircle;
