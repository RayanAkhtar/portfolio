import React, { useState } from "react";
import { Link } from "react-router-dom";
import AsideMenu from "./AsideMenu";
import "../styles/navbar.css";

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

        {/* Dropdown Icon */}
        <div className="dropdown-container">
          <div className="dropdown-icon">{'</>'}</div>
          <div className="dropdown-menu">
            <ul>
              <Link to="/languages" className="dropdown-link">Languages</Link>
              <Link to="/technologies" className="dropdown-link">Technologies</Link>
              <Link to="/frameworks" className="dropdown-link">Frameworks</Link>
              <Link to="/tools" className="dropdown-link">Tools</Link>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
