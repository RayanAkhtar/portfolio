import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getExperienceByName, getAllExperience } from '../../api/firebase';
import '../styles/Experience.css';
import { FaLink } from 'react-icons/fa';

interface IExperience {
  name: string;
  role: string;
  description: string;
  startDate: string;
  endDate: string;
  thumbnailImage?: string;
  achievements?: string[];
  websiteLinks?: string[];
  type: "work" | "other" | "education";
}

const Experience: React.FC = () => {
  const { experienceName } = useParams<{ experienceName?: string }>();
  const [experienceDetails, setExperienceDetails] = useState<IExperience | null>(null);
  const [allExperiences, setAllExperiences] = useState<IExperience[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (experienceName) {
        try {
          const experience = await getExperienceByName(experienceName);
          setExperienceDetails(experience || null);
        } catch (error) {
          setExperienceDetails(null);
        }
        setLoading(false);
      } else {
        try {
          const experiences = await getAllExperience();
          experiences.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
          setAllExperiences(experiences);
        } catch (error) {
          setAllExperiences([]);
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [experienceName]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-US', options) !== "Invalid Date"
      ? date.toLocaleDateString('en-US', options)
      : "Present";
  };

  if (loading) return <div>Loading...</div>;

  if (experienceName) {
    if (!experienceDetails) return <div>Experience not found</div>;

    const startDateFormatted = formatDate(experienceDetails.startDate);
    const endDateFormatted = formatDate(experienceDetails.endDate);
    const displayDate = startDateFormatted === endDateFormatted
      ? startDateFormatted
      : `${startDateFormatted} - ${endDateFormatted}`;

    return (
      <div className="experience-page">
        <header className="experience-header">
          <div className="experience-header-content">
            {experienceDetails.thumbnailImage && (
              <div className="experience-image-placeholder">
                <img src={experienceDetails.thumbnailImage} alt={experienceDetails.name} className='experience-list-thumbnail-specific'/>
              </div>
            )}
            <div className="experience-main">
              <h1 className="experience-title">{experienceDetails.name}</h1>
              <p className="experience-role">{experienceDetails.role}</p>
            </div>
            <div className="experience-info">
              <p><strong>{displayDate}</strong></p>
              <p><strong>Type:</strong> {experienceDetails.type}</p>
            </div>
          </div>
        </header>
        <section className="experience-description">
          <h2>Description</h2>
          <p>{experienceDetails.description}</p>
        </section>
        <section className="experience-achievements">
          <h3>Achievements</h3>
          <ul>
            {experienceDetails.achievements?.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
          {experienceDetails.websiteLinks && (
            <ul className="experience-links">
              {experienceDetails.websiteLinks.map((link, index) => (
                <li key={index}>
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    <FaLink className="link-icon" /> {link}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    );
  }

  return (
    <div className="experience-list-page">
      <h1>My Experience</h1>
      <ul className="experience-list">
        {allExperiences.map((exp) => {
          const startDateFormatted = formatDate(exp.startDate);
          const endDateFormatted = formatDate(exp.endDate);
          const displayDate = startDateFormatted === endDateFormatted
            ? startDateFormatted
            : `${startDateFormatted} - ${endDateFormatted}`;
          return (
            <li key={exp.name} className="experience-list-item">
              <Link to={`/experience/${encodeURIComponent(exp.name)}`}>
                <div className="experience-logo-wrapper">
                  {exp.thumbnailImage && (
                    <img
                      src={exp.thumbnailImage}
                      alt={exp.name}
                      className="experience-list-thumbnail"
                    />
                  )}
                </div>
                <div className="experience-list-details">
                  <h2>{exp.name}</h2>
                  <p>{exp.role}</p>
                  <p>{displayDate}</p>
                  <p>Type: {exp.type}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Experience;
