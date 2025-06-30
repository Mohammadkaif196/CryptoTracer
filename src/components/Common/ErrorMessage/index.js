import React from 'react';
import './style.css';

const ErrorMessage = ({ message, onRetry, showRetry = true }) => {
  return (
    <div className="error-message">
      <div className="error-icon">⚠️</div>
      <div className="error-text">{message}</div>
      {showRetry && onRetry && (
        <button onClick={onRetry} className="error-retry-btn">
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage; 