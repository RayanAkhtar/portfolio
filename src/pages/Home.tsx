import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';
import {
  getSpotlightProjects,
  getCurrentlyWorkingOnProjects,
} from "../../api/firebase";


interface Project {
  name: string;
  description: string;
  link?: string;
  thumbnailImage: string;
}

const Home: React.FC = () => {
  const [spotlightProjects, setSpotlightProjects] = useState<Project[]>([]);
  const [currentlyWorkingOn, setCurrentlyWorkingOn] = useState<Project[]>([]);

  useEffect(() => {
    getSpotlightProjects().then((projects) => {
      setSpotlightProjects(projects);
    });

    getCurrentlyWorkingOnProjects().then((projects) => {
      setCurrentlyWorkingOn(projects);
    });
  }, []);

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
          <Link to="/fields" className="skill-card">
            <h3>Machine Learning</h3>
            <p>Experience in building ML models, data preprocessing, and implementing algorithms to solve real-world problems.</p>
          </Link>
          <Link to="/fields" className="skill-card">
            <h3>Data Science</h3>
            <p>Proficient in data analysis, statistical modeling, and visualizations using tools like Python, Pandas, and Matplotlib.</p>
          </Link>
          <Link to="/fields" className="skill-card">
            <h3>Software Engineering</h3>
            <p>Worked on various full-stack projects, focusing on efficient code design, debugging, and implementing features.</p>
          </Link>
          <Link to="/fields" className="skill-card">
            <h3>Full-Stack Development</h3>
            <p>Experienced in developing both front-end (React, TypeScript) and back-end (Node.js, Express) systems with a focus on user experience.</p>
          </Link>
        </div>
      </section>

      <section id="spotlight-projects" className="projects-section">
        <h2 className="section-title">Spotlight Projects</h2>
        <div className="project-cards">
          {spotlightProjects.length === 0 ? (
            <p>Loading spotlight projects...</p>
          ) : (
            spotlightProjects.map((project, index) => (
              <Link key={index} to={`/projects/${project.name}`} className="project-card">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <img src={project.thumbnailImage} alt={project.name} className="project-thumbnail" />
              </Link>
            ))
          )}
        </div>
      </section>

      <section id="currently-working" className="projects-section">
        <h2 className="section-title">Currently Working On</h2>
        <div className="project-cards">
          {currentlyWorkingOn.length === 0 ? (
            <p>Loading currently working on projects...</p>
          ) : (
            currentlyWorkingOn.map((project, index) => (
              <Link key={index} to={`/projects/${project.name}`} className="project-card">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <img src={project.thumbnailImage} alt={project.name} className="project-thumbnail"/>
              </Link>
            ))
          )}
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
