import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getExperiences } from "../../api/firebase";
import "../styles/About.css";

// Helper function to format the date from "YYYY-MM"
const formatDate = (date: string) => {
  if (date === "present") {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return `${year}-${month < 10 ? `0${month}` : month}`;
  }
  return date;
};

const About: React.FC = () => {
  const navigate = useNavigate();


  const [timelineData, setTimelineData] = useState<IExperience[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTimelineData = async () => {
    try {
      const experiences = await getExperiences();
      setTimelineData(
        experiences
          .map((experience: IExperience) => {
            const startDate = formatDate(experience.startDate);
            const endDate = formatDate(experience.endDate);
            return { ...experience, startDate, endDate };
          })
          .sort((a: IExperience, b: IExperience) => {
            const startDateA = new Date(a.startDate);
            const startDateB = new Date(b.startDate);
            return startDateA.getTime() - startDateB.getTime();
          })
      );
      setLoading(false);
    } catch (error) {
      console.error("Error fetching timeline data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimelineData();
  }, []);

  const getCardColor = (type: string) => {
    switch (type) {
      case "work":
        return "var(--home-gradient-2)"; // Work-related events
      case "education":
        return "var(--navbar-bg-color)"; // Education-related events
      default:
        return "var(--bg-color)"; // Other types
    }
  };

  let renderedYears: Set<number> = new Set();

  return (
    <div className="about-container">
      <div className="about-description">
        <h1>About Me</h1>
        <p>
          Hi, I'm Rayan Akhtar, a 3rd-year Computing student at Imperial College London. I'm
          originally from Birmingham, England, but currently living in London for my university
          studies.
        </p>
        <p>
          I have a passion for technology, particularly in the fields of software development,
          artificial intelligence, and data science. I am constantly learning and growing my
          skillset as I work on personal and professional projects.
        </p>
      </div>

      <div className="timeline-container">
        <h2>Timeline</h2>
        <div className="timeline">
          <div className="timeline-line"></div>

          {loading ? (
            <p>Loading timeline data...</p>
          ) : (
            timelineData.map((event, index) => {
              const yearRendered = renderedYears.has(new Date(event.startDate).getFullYear());
              if (!yearRendered) {
                renderedYears.add(new Date(event.startDate).getFullYear());
              }

              return (
                <div
                  key={index}
                  className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
                >
                  {/* Render Year if Not Already Rendered */}
                  {!yearRendered && (
                    <div className="timeline-year">
                      {new Date(event.startDate).getFullYear()}
                    </div>
                  )}
                  <div className="timeline-circle"></div>
                  <div
                    className="timeline-card"
                    style={{ backgroundColor: getCardColor(event.type) }}
                    onClick={() => navigate(`/experience/${event.name}`)} 
                  >
                    <div className="timeline-card-title">
                      {event.name}
                    </div>
                    <div className="timeline-card-role">
                      <strong>Role:</strong> {event.role}
                    </div>
                    <div className="timeline-card-description">
                      {event.description}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
