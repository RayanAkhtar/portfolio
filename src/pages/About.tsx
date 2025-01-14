import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/About.css";

const About: React.FC = () => {
  const navigate = useNavigate();

  const timelineData = [
    { 
      year: 2015, 
      month: "September", 
      event: "Started Secondary School at Birmingham High School", 
      headline: "Started my academic journey at Birmingham's most prestigious high school.", 
      type: "education", 
      path: "/events/2015" 
    },
    { 
      year: 2017, 
      month: "June", 
      event: "Started A-Levels", 
      headline: "Focused on Computer Science and Mathematics, leading to my interest in tech.", 
      type: "education", 
      path: "/events/2017" 
    },
    { 
      year: 2019, 
      month: "October", 
      event: "Began University at Imperial College London", 
      headline: "Started studying Computing at one of the top universities in the world.", 
      type: "education", 
      path: "/events/2019" 
    },
    { 
      year: 2020, 
      month: "January", 
      event: "Joined a Coding Bootcamp", 
      headline: "Attended an online bootcamp to further enhance my coding skills.", 
      type: "extracurricular", 
      path: "/events/2020" 
    },
    { 
      year: 2021, 
      month: "March", 
      event: "Joined a Student Software Development Team", 
      headline: "Became part of an amazing team that developed software for student use.", 
      type: "extracurricular", 
      path: "/events/2021" 
    },
    { 
      year: 2022, 
      month: "July", 
      event: "Started Internship at a Tech Company", 
      headline: "Worked as a Full-Stack Developer in a real-world professional environment.", 
      type: "extracurricular", 
      path: "/events/2022" 
    },
    { 
      year: 2023, 
      month: "April", 
      event: "Completed a Project on AI-based Chatbot", 
      headline: "Developed a chatbot using machine learning techniques.", 
      type: "extracurricular", 
      path: "/events/2023" 
    },
    { 
      year: 2023, 
      month: "August", 
      event: "Started Research Project on AI Ethics", 
      headline: "Researching ethical considerations in AI systems.", 
      type: "extracurricular", 
      path: "/events/2023" 
    }
  ];

  const getCardColor = (type: string) => {
    switch (type) {
      case "extracurricular":
        return "var(--menu-item-hover-color)"; 
      case "education":
        return "var(--navbar-bg-color)"; 
      default:
        return "var(--bg-color)"; 
    }
  };


  let renderedYears: Set<number> = new Set();

  return (
    <div className="about-container">
      <div className="about-description">
        <h1>About Me</h1>
        <p>
          Hi, I'm Rayan Akhtar, a 3rd-year Computing student at Imperial College London. 
          I'm originally from Birmingham, England, but currently living in London for my university studies.
        </p>
        <p>
          I have a passion for technology, particularly in the fields of software development, 
          artificial intelligence, and data science. I am constantly learning and growing my skillset 
          as I work on personal and professional projects.
        </p>
      </div>

      <div className="timeline-container">
        <h2>Timeline</h2>
        <div className="timeline">

          <div className="timeline-line"></div>

          {timelineData.map((event, index) => {
            const yearRendered = renderedYears.has(event.year);
            if (!yearRendered) {
              renderedYears.add(event.year);
            }
            
            return (
              <div key={index} className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}>
                {/* Render Year if Not Already Rendered */}
                {!yearRendered && (
                  <div className="timeline-year">{event.year}</div>
                )}
                <div className="timeline-circle"></div>
                <div className="timeline-card" style={{ backgroundColor: getCardColor(event.type) }} onClick={() => navigate(event.path)}>
                  <div className="timeline-card-title">{event.month} - {event.event}</div>
                  <div className="timeline-card-headline">{event.headline}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default About;
