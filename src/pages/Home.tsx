import React from 'react';
import '../styles/Home.css';

const Home: React.FC = () => {

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="intro-text">
          <h1 className="name">Hi, I'm <span className="highlight">Rayan Akhtar</span></h1>
          <p className="position">A student at Imperial College London</p>
          <p className="description">
            I'm passionate about building innovative solutions in <span className="highlight">Machine Learning</span>, <span className="highlight">Data Science</span>, and <span className="highlight">Software Engineering</span>.
            Currently looking for a 6-month internship starting in April 2025.
          </p>
        </div>
        <div className="cta-button">
          <a href="/contact" className="contact-button">Contact</a>
        </div>
      </div>

      <section id="skills" className="skills-section">
        <h2 className="section-title">Skills & Experience</h2>
        <div className="skills-grid">
          <div className="skill-card">
            <h3>Machine Learning</h3>
            <p>Experience in building ML models, data preprocessing, and implementing algorithms to solve real-world problems.</p>
          </div>
          <div className="skill-card">
            <h3>Data Science</h3>
            <p>Proficient in data analysis, statistical modeling, and visualizations using tools like Python, Pandas, and Matplotlib.</p>
          </div>
          <div className="skill-card">
            <h3>Software Engineering</h3>
            <p>Worked on various full-stack projects, focusing on efficient code design, debugging, and implementing features.</p>
          </div>
          <div className="skill-card">
            <h3>Full-Stack Development</h3>
            <p>Experienced in developing both front-end (React, TypeScript) and back-end (Node.js, Express) systems with a focus on user experience.</p>
          </div>
        </div>
      </section>

      <section id="projects" className="projects-section">
        <h2 className="section-title">Featured Projects</h2>
        <div className="project-cards">
          <a href="https://www.imperial.ac.uk" className="project-card">
            <h3>Project 1: Pintos OS</h3>
            <p>A group project where I contributed to building components of an operating system including thread scheduling, memory management, and file systems.</p>
          </a>
          <a href="https://www.imperial.ac.uk" className="project-card">
            <h3>Project 2: Full-Stack Application</h3>
            <p>Developed a full-stack web application using React, TypeScript, and Node.js for managing user data with real-time updates.</p>
          </a>
        </div>
      </section>

			<section id="contact" className="contact-section">
				<h2 className="section-title">Get In Touch</h2>
				<p>If you'd like to collaborate or discuss internship opportunities, feel free to reach out!</p>

					<div className="cta-button" onClick={() => window.location.href = "mailto:rayanakhtar1203@gmail.com"}>
              <div className='email-button'>
							  <a href="#">Email</a>
              </div>

				</div>
			</section>

    </div>
  );
};

export default Home;
