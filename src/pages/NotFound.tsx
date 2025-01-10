import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound: React.FC = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1 className="not-found-title">404</h1>
                <p className="not-found-message">
                    Oops! The page you are looking for does not exist.
                </p>
                <Link to="/" className="not-found-button">
                    Back to Home
                </Link>
            </div>
            <div className="not-found-animation">
                <div className="not-found-circle"></div>
                <div className="not-found-ghost">
                    <div className="ghost-eyes">
                        <div className="ghost-eye"></div>
                        <div className="ghost-eye"></div>
                    </div>
                    <div className="ghost-mouth"></div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
