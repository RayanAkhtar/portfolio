import React, { useState } from "react";
import { Link } from "react-router-dom";
import AsideMenu from "./AsideMenu";
import "../styles/navbar.css"; // Import the CSS file

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav>
      {/* Aside Menu */}
      <AsideMenu isOpen={menuOpen} />

      <div className="navbar-container">
        {/* Menu Toggle Button */}
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>

        {/* Logo */}
        <Link to="/" className="logo-link">
          <img
            src="https://via.placeholder.com/50"
            alt="Logo"
            className="logo"
          />
        </Link>

        {/* Navbar Content */}
        <div className="navbar-content">navbar content here</div>
      </div>
    </nav>
  );
};

export default Navbar;
