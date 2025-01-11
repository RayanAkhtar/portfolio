import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProjectFilter.css';

type ProjectData = {
  name: string;
  description: string;
  spotlight: boolean;
  startDate: string;
  endDate: string;
  currentlyWorkingOn: boolean;
  thumbnailImage: string;
  propertyNames: string[];
  achievements: string[];
  projectLinks: {
    repo: string;
    website: string;
  };
  role: string;
  outcome: string;
  keyLearning: string;
  industry: string;
};

const projectsData: ProjectData[] = [
  {
    name: "Personal Portfolio",
    description: "Currently designing a website using TypeScript, React, and Node.js with Firebase as the backend.",
    spotlight: true,
    startDate: "2024-12-01",
    endDate: "Present",
    currentlyWorkingOn: true,
    thumbnailImage: "/images/new-portfolio.png",
    propertyNames: ["TypeScript", "React", "Node.js", "Firebase"],
    achievements: [
      "Designed and developed a responsive website with a focus on user experience.",
      "Integrated backend and frontend technologies for a more pleasant experience when updating/arranging content.",
    ],
    projectLinks: {
      repo: "https://github.com/RayanAkhtar/portfolio",
      website: "https://www.rayanakhtar.com/",
    },
    role: "Full Stack Developer",
    outcome: "Ongoing website production, currently available under rayanakhtar.com, will update upon changes to project, interest, hobbies and achievements.",
    keyLearning: "Experience with full stack development and modern web technologies.",
    industry: "Full Stack",
  },
  // Add more project entries as needed
];

const ProjectFilter: React.FC = () => {
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>(projectsData);
  const [techFilter, setTechFilter] = useState<string[]>([]);
  const [industryFilter, setIndustryFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  // Extract filter options dynamically
  const technologies = Array.from(
    new Set(projectsData.flatMap((project) => project.propertyNames))
  );
  const industries = Array.from(new Set(projectsData.map((project) => project.industry)));
  const categories = ["Spotlight", "Currently Working On"];

  const toggleFilter = (type: string, value: string) => {
    if (type === 'tech') {
      setTechFilter((prev) =>
        prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
      );
    }
    if (type === 'industry') {
      setIndustryFilter((prev) => prev === value ? "" : value);
    }
    if (type === 'category') {
      setCategoryFilter((prev) => prev === value ? "" : value);
    }
  };

  useEffect(() => {
    let filtered = projectsData;

    if (techFilter.length > 0) {
      filtered = filtered.filter(project =>
        techFilter.every(tech => project.propertyNames.includes(tech))
      );
    }

    if (industryFilter) {
      filtered = filtered.filter(project => project.industry === industryFilter);
    }

    if (categoryFilter === "Spotlight") {
      filtered = filtered.filter(project => project.spotlight);
    } else if (categoryFilter === "Currently Working On") {
      filtered = filtered.filter(project => project.currentlyWorkingOn);
    }

    setFilteredProjects(filtered);
  }, [techFilter, industryFilter, categoryFilter]);

  return (
    <div className="project-filter-container">
      <div className="filter-section">
        <h2>Filter Projects</h2>
        <div className="filters">
          {/* Technologies Filter */}
          <div className="filter-group">
            <label>Technologies</label>
            <div className="filter-options">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className={`filter-option ${techFilter.includes(tech) ? 'active' : ''}`}
                  onClick={() => toggleFilter('tech', tech)}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Industry Filter */}
          <div className="filter-group">
            <label>Industry</label>
            <div className="filter-options">
              {industries.map((industry, index) => (
                <div
                  key={index}
                  className={`filter-option ${industryFilter === industry ? 'active' : ''}`}
                  onClick={() => toggleFilter('industry', industry)}
                >
                  {industry}
                </div>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="filter-group">
            <label>Category</label>
            <div className="filter-options">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className={`filter-option ${categoryFilter === category ? 'active' : ''}`}
                  onClick={() => toggleFilter('category', category)}
                >
                  {category}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Display filtered projects */}
      <div className="projects-list">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Link key={project.name} to={`/projects/${project.name}`} className="project-card">
              <h3>{project.name}</h3>
              <p className="project-headline">{project.description}</p>
              <img
                src={project.thumbnailImage}
                alt={`${project.name} thumbnail`}
                className="project-thumbnail"
              />
              <p><strong>Category:</strong> {project.spotlight ? "Spotlight" : "General"}</p>
              <p><strong>Technologies:</strong> {project.propertyNames.join(', ')}</p>
              <p><strong>Industry:</strong> {project.industry}</p>
            </Link>
          ))
        ) : (
          <div>No projects found</div>
        )}
      </div>
    </div>
  );
};

export default ProjectFilter;
