import React from 'react';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import '../styles/Contacts.css';

const Contacts: React.FC = () => {
    return (
        <div className="contacts-container">
            <div className="contact-hero-section">
                <h1 className="contact-title">Get In Touch</h1>
                <p className="contact-description">
                    Whether you have a question, a project proposal, or just want to say hi, feel free to reach out!
                </p>
            </div>

            <section className="contact-methods">
                <div className="contact-card">
                    <FaEnvelope className="contact-icon" />
                    <h2>Email Me</h2>
                    <p>Drop me a message at:</p>
                    <a href="mailto:rayanakhtar1203@gmail.com" className="contact-button">
                        Send Email
                    </a>
                </div>

                <div className="contact-card">
                    <FaLinkedin className="contact-icon" />
                    <h2>Connect on LinkedIn</h2>
                    <p>Stay updated and connect professionally:</p>
                    <a
                        href="https://www.linkedin.com/in/rayan-akhtar/"
                        className="contact-button"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        LinkedIn Profile
                    </a>
                </div>

                <div className="contact-card">
                    <FaGithub className="contact-icon" />
                    <h2>Explore My GitHub</h2>
                    <p>Check out my projects and contributions:</p>
                    <a
                        href="https://github.com/RayanAkhtar"
                        className="contact-button"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub Profile
                    </a>
                </div>
            </section>

            <div className='empty-section'>
            </div>
            
        </div>
    );
};

export default Contacts;
