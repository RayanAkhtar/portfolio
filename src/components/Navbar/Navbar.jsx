import React from 'react';
import './Navbar.css';

function Navbar({ toggleTheme }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">My Portfolio</div>
      <button className="theme-toggle" onClick={toggleTheme}>
        Toggle Theme
      </button>
      <ul className="navbar-links">
        <li>Home</li>
        <li>About</li>
        <li>Projects</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
}

export default Navbar;
