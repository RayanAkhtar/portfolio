import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaLink } from 'react-icons/fa';
import { getExperienceByName } from '../../api/firebase';
import '../styles/Experience.css';

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
  const { experienceName } = useParams<{ experienceName: string }>();
  const [experienceDetails, setExperienceDetails] = useState<IExperience | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log(experienceName);
    const fetchExperience = async () => {
      if (experienceName) {
        try {
          const experience = await getExperienceByName(experienceName);
          if (experience) {
            setExperienceDetails(experience);
          } else {
            console.error("Experience not found");
          }
        } catch (error) {
          console.error("Error fetching experience:", error);
        }
        setLoading(false);
      }
    };

    fetchExperience();
  }, [experienceName]);

  // Helper function to format the date to "MM/YYYY"
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
    };
    return date.toLocaleDateString('en-US', options) !== "Invalid Date"
      ? date.toLocaleDateString('en-US', options)
      : "Present";
  };

  // Format start and end dates
  const startDateFormatted = experienceDetails ? formatDate(experienceDetails.startDate) : '';
  const endDateFormatted = experienceDetails ? formatDate(experienceDetails.endDate) : '';

  // If the start and end dates are in the same month/year, show only the start date
  const displayDate = startDateFormatted === endDateFormatted
    ? startDateFormatted
    : `${startDateFormatted} - ${endDateFormatted}`;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!experienceDetails) {
    return <div>Experience not found</div>;
  }

  return (
    <div className="experience-page">
      {/* Larger Section 1: Image, Date, and Name */}
      <header className="experience-header">
        <div className="experience-header-content">
          {/* Image Placeholder */}
          {experienceDetails.thumbnailImage && (
            <div className="experience-image-placeholder">
              <img src={experienceDetails.thumbnailImage} alt={experienceDetails.name} />
            </div>
          )}

          {/* Experience Name and Role */}
          <div className="experience-main">
            <h1 className="experience-title">{experienceDetails.name}</h1>
            <p className="experience-role">{experienceDetails.role}</p>
          </div>

          {/* Experience Info: Date and Type */}
          <div className="experience-info">
            <p><strong>{displayDate}</strong></p>
            <p><strong>Type:</strong> {experienceDetails.type}</p>
          </div>
        </div>
      </header>

      {/* Smaller Section: Description */}
      <section className="experience-description">
        <h2>Description</h2>
        <p>{experienceDetails.description}</p>
      </section>

      {/* Larger Section 2: Achievements */}
      <section className="experience-achievements">
        <h3>Achievements</h3>
        <ul>
          {experienceDetails.achievements?.map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>
        {/* Links Section */}
        {experienceDetails.websiteLinks && (
          <ul className="experience-links">
            {experienceDetails.websiteLinks?.map((link, index) => (
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
};

export default Experience;
