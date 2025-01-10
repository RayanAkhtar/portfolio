import React from "react";
import "../styles/footer.css";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <ul className="footer-list">
          <li>
            <FaEnvelope className="footer-icon" />
            <a href="mailto:rayanakhtar1203@gmail.com">rayanakhtar1203@gmail.com</a>
          </li>
          <li>
            <FaLinkedin className="footer-icon" />
            <a href="https://www.linkedin.com/in/rayan-akhtar" target="_blank" rel="noopener noreferrer">
              rayan-akhtar
            </a>
          </li>
          <li>
            <FaGithub className="footer-icon" />
            <a href="https://github.com/RayanAkhtar" target="_blank" rel="noopener noreferrer">
              RayanAkhtar
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
