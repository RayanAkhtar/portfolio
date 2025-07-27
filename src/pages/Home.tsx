import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import { Link } from 'react-router-dom';
import {
  getSpotlightProjects,
  getCurrentlyWorkingOnProjects,
  getProjects,
  getIndustryDescription,
} from "../../api/firebase";

interface Project {
  name: string;
  description: string;
  link?: string;
  thumbnailImage: string;
  industry: string;
}

const Home: React.FC = () => {
  const [spotlightProjects, setSpotlightProjects] = useState<Project[]>([]); 
  const [currentlyWorkingOn, setCurrentlyWorkingOn] = useState<Project[]>([]);
  const [topIndustries, setTopIndustries] = useState<{ industry: string; count: number }[]>([]);
  const [industryDescriptions, setIndustryDescriptions] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    getSpotlightProjects().then((projects) => {
      setSpotlightProjects(projects);
    });

    getCurrentlyWorkingOnProjects().then((projects) => {
      setCurrentlyWorkingOn(projects);
    });

    getProjects().then((projects) => {
      const industryCount: Record<string, number> = {};

      projects.forEach((project) => {
        if (project.industry) {
          industryCount[project.industry] = (industryCount[project.industry] || 0) + 1;
        }
      });

      const sortedIndustries = Object.entries(industryCount)
        .map(([industry, count]) => ({ industry, count }))
        .sort((a, b) => b.count - a.count);

      setTopIndustries(sortedIndustries.slice(0, 4));

      sortedIndustries.slice(0, 4).forEach((industryData) => {
        getIndustryDescription(industryData.industry).then((description) => {
          setIndustryDescriptions((prevState) => ({
            ...prevState,
            [industryData.industry]: description || 'No description available',
          }));
        });
      });
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
            Feel free to learn more about me here.
          </p>
        </div>
        <div className="cta-button">
          <Link to="/contact" className="contact-button">Contact</Link>
        </div>
      </div>

      {/* Top Industries Section */}
      <section id="industries" className="industries-section">
        <h2 className="section-title">Top Industries</h2>
        <div className="industries-grid">
          {topIndustries.length === 0 ? (
            <p>Loading industries...</p>
          ) : (
            topIndustries.map((industryData, index) => (
              <Link key={index} to={`/projectFilter/:${industryData.industry}`} className="industry-card">
                <h3>{industryData.industry}</h3>
                <p>{industryDescriptions[industryData.industry]}</p>
                <p>{industryData.count} projects</p>
              </Link>
            ))
          )}
        </div>

        <div className="cta-button">
          <Link to="/projectFilter" className="explore-more-button">
            Explore More Projects
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
                <img src={project.thumbnailImage} alt={project.name} className="project-thumbnail" />
              </Link>
            ))
          )}
        </div>
      </section>

      <section id="contact" className="contact-section">
        <h2 className="section-title">Get In Touch</h2>
        <p>If you'd like to collaborate or discuss internship opportunities, feel free to reach out!</p>
        <div className="cta-button" onClick={() => window.location.href = "mailto:rayanakhtar1203@gmail.com"}>
          <div className="email-button">
            <a href="#">Email</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
