import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <h2 className="loading-text">Loading Recipe Platform</h2>
        <p className="loading-subtitle">Preparing your culinary journey...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
