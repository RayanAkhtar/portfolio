import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaGithub, FaLink } from 'react-icons/fa';
import { getProject } from '../../api/firebase';
import '../styles/Projects.css';

const Projects: React.FC = () => {
  const { projectName } = useParams<{ projectName: string }>();
  const [projectDetails, setProjectDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (projectName) {
        try {
          const project = await getProject(projectName);
          if (project) {
            setProjectDetails(project);
          } else {
            console.error("Project not found");
          }
        } catch (error) {
          console.error("Error fetching project:", error);
        }
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectName]);

  // Helper function to format the date to "MM/YYYY"
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
    };
    return date.toLocaleDateString('en-US', options) != "Invalid Date" ? date.toLocaleDateString('en-US', options) : "Present";
  };

  // Format start and end dates
  const startDateFormatted = projectDetails ? formatDate(projectDetails.startDate) : '';
  const endDateFormatted = projectDetails ? formatDate(projectDetails.endDate) : '';

  // If the start and end dates are in the same month/year, show only the start date
  const displayDate = startDateFormatted === endDateFormatted ? startDateFormatted : `${startDateFormatted} - ${endDateFormatted}`;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!projectDetails) {
    return <div>Project not found</div>;
  }

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
              <strong>{displayDate}</strong> 
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
          {projectDetails.achievements.map((achievement: string, index: number) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Projects;
