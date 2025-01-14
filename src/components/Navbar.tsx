import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AsideMenu from "./AsideMenu";
import "../styles/navbar.css";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const asideRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering click outside logic
    setMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      asideRef.current &&
      !asideRef.current.contains(event.target as Node) &&
      toggleButtonRef.current &&
      !toggleButtonRef.current.contains(event.target as Node)
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav>
      {/* Aside Menu */}
      <div ref={asideRef}>
        <AsideMenu isOpen={menuOpen} closeMenu={closeMenu} />
      </div>

      <div className="navbar-container">
        {/* Menu Toggle Button */}
        <button
          ref={toggleButtonRef}
          className="menu-toggle"
          onClick={toggleMenu}
        >
          ☰
        </button>

        {/* Logo */}
        <Link to="/" className="logo-link" style={{ fontSize: "2rem" }}>
          <img src="rayan-akhtar-full-removebg.png" alt="Logo" className="image-link" />
        </Link>

        {/* Dropdown Icon '</>' */}
        <div className="dropdown-container">
          <Link to="/projectfilter">
          <div className="dropdown-icon">{'</>'}</div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
