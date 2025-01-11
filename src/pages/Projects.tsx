import React from 'react';
import { useParams } from 'react-router-dom';
import { FaGithub, FaLink } from 'react-icons/fa';
import '../styles/Projects.css';

const Projects: React.FC = () => {
  const { /*projectName*/ } = useParams<{ projectName: string }>();

  const projectDetails = {
    name: "Personal Portfolio",
    description: "Currently designing a website using TypeScript, React, and Node.js with Firebase as the backend.",
    spotlight: true,
    startDate: "2024-12-01",
    endDate: "Present",
    currentlyWorkingOn: true,
    thumbnailImage: "/images/personalportfolio.png",
    propertyNames: ["TypeScript", "React", "Node.js", "Firebase"],
    achievements: [
      "Designed and developed a responsive website with a focus on user experience.",
      "Integrated backend and frontend technologies for a more pleasant experience when updating/arranging content."
    ],
    projectLinks: {
      repo: "https://github.com/RayanAkhtar/portfolio",
      website: "https://www.rayanakhtar.com/"
    },
    role: "Full Stack Developer",
    outcome: "Ongoing website production, currently available under rayanakhtar.com, will update upon changes to project, interest, hobbies and achievements.",
    keyLearning: "Experience with full stack development and modern web technologies.",
    industry: "Full Stack"
  };

  return (
    <div className="project-page">
      <header className="project-header">
        <div className="project-header-content">
          
          {/* Top Row: Project Name and Details */}
          <div className="project-main">
            <h1 className="project-title">{projectDetails.name}</h1>
            <p className="project-headline">{projectDetails.description}</p>
          </div>

          {/* Project Info */}
          <div className="project-info">
            <p>
              <strong>Dates:</strong> {projectDetails.startDate} - {projectDetails.endDate}
            </p>
            <p>
              <strong>Tech Used:</strong> {projectDetails.propertyNames.join(', ')}
            </p>
            <p>
              <strong>Role:</strong> {projectDetails.role}
            </p>
            <p>
              <strong>Key Learning:</strong> {projectDetails.keyLearning}
            </p>
            <ul className="project-links">
              {projectDetails.projectLinks.repo && (
                <li>
                  <a href={projectDetails.projectLinks.repo} target="_blank" rel="noopener noreferrer">
                    <FaGithub className="link-icon" /> GitHub Repository
                  </a>
                </li>
              )}
              {projectDetails.projectLinks.website && (
                <li>
                  <a href={projectDetails.projectLinks.website} target="_blank" rel="noopener noreferrer">
                    <FaLink className="link-icon" /> Live Website
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Image Placeholder */}
        <div className="project-image-placeholder">
          <img src={projectDetails.thumbnailImage} alt="Project Thumbnail" />
        </div>
      </header>

      <div className="project-description">
        <h2>About</h2>
        <p>{projectDetails.outcome}</p>
      </div>

      <div className="project-achievements">
        <h3>What This Project Achieves</h3>
        <ul>
          {projectDetails.achievements.map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Projects;
