import React from 'react';
import '../styles/Builder.css';

const Builder: React.FC = () => {
  return (
    <div className="builder-container">
      <div className="builder-content">
        <h1 className="builder-title">🚧 Page Under Construction 🚧</h1>
        <p className="builder-description">
          This page is a work in progress. We're building something amazing for you! 
          Stay tuned.
        </p>
        <div className="loader">
          <div className="loader-circle"></div>
          <div className="loader-circle"></div>
          <div className="loader-circle"></div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
