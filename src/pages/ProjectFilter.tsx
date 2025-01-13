import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { getProjects } from "../../api/firebase";
import "../styles/ProjectFilter.css";

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

const ProjectFilter: React.FC = () => {
  const [projectsData, setProjectsData] = useState<ProjectData[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>([]);
  const [techFilter, setTechFilter] = useState<string[]>([]);
  const [industryFilter, setIndustryFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const projects = await getProjects();
        const sortedProjects = projects.sort((a, b) => {
          const endDateA =
            a.endDate === "Present" ? new Date() : new Date(a.endDate);
          const endDateB =
            b.endDate === "Present" ? new Date() : new Date(b.endDate);
          return endDateB.getTime() - endDateA.getTime();
        });
        setProjectsData(sortedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (industryFilter) {
      navigate("/projectFilter");
    }
  }, [industryFilter, navigate]);

  const technologies = Array.from(
    new Set(projectsData.flatMap((project) => project.propertyNames))
  );
  const industries = Array.from(new Set(projectsData.map((project) => project.industry)));
  const categories = ["Spotlight", "Currently Working On"];

  useEffect(() => {
    let path = location.pathname;
    if (path.includes("spotlight")) {
      setCategoryFilter("Spotlight");
    } else if (path.includes("current")) {
      setCategoryFilter("Currently Working On");
    } else {
      path = path.replace("%20", " ");
      const industry = industries.find((ind) => path.includes(ind));
      const tech = technologies.find((tech) => path.includes(tech));

      if (industry) {
        setIndustryFilter(industry);
      }
      if (tech) {
        setTechFilter([tech]);
      }
    }
  }, [location, industries, technologies]);

  const toggleFilter = (type: string, value: string) => {
    if (type === "tech") {
      setTechFilter((prev) =>
        prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      );
    }
    if (type === "industry") {
      const newFilter = value === "ALL" ? "" : value;
      setIndustryFilter(newFilter);
    }
    if (type === "category") {
      setCategoryFilter((prev) => (prev === value ? "" : value));
    }
  };
  

  useEffect(() => {
    let filtered = projectsData;

    if (techFilter.length > 0) {
      filtered = filtered.filter((project) =>
        techFilter.every((tech) => project.propertyNames.includes(tech))
      );
    }

    if (industryFilter) {
      filtered = filtered.filter((project) => project.industry === industryFilter);
    }

    if (categoryFilter === "Spotlight") {
      filtered = filtered.filter((project) => project.spotlight);
    } else if (categoryFilter === "Currently Working On") {
      filtered = filtered.filter((project) => project.currentlyWorkingOn);
    }

    setFilteredProjects(filtered);
  }, [techFilter, industryFilter, categoryFilter, projectsData]);

  if (loading) {
    return <div>Loading projects...</div>;
  }

  return (
    <div className="project-filter-container">
      <div className="filter-section">
        <h2>Filter Projects</h2>
        <div className="filters">
          <div className="filter-group">
            <label>Technologies</label>
            <div className="filter-options">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className={`filter-option ${techFilter.includes(tech) ? "active" : ""}`}
                  onClick={() => toggleFilter("tech", tech)}
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>Industry</label>
            <div className="filter-options">
              <div
                className={`filter-option ${industryFilter === "" ? "active" : ""}`}
                onClick={() => toggleFilter("industry", "ALL")}
              >
                ALL
              </div>
              {industries.map((industry, index) => (
                <div
                  key={index}
                  className={`filter-option ${industryFilter === industry ? "active" : ""}`}
                  onClick={() => toggleFilter("industry", industry)}
                >
                  {industry}
                </div>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>Category</label>
            <div className="filter-options">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className={`filter-option ${categoryFilter === category ? "active" : ""}`}
                  onClick={() => toggleFilter("category", category)}
                >
                  {category}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="projects-list">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Link to={`/projects/${project.name}`} key={project.name} className="project-card">
              <h3>{project.name}</h3>
              <p className="project-headline">{project.description}</p>
              <img
                src={project.thumbnailImage}
                alt={`${project.name} thumbnail`}
                className="project-thumbnail"
              />
              <p>
                <strong>Category:</strong> {project.spotlight ? "Spotlight" : "General"}
              </p>
              <p>
                <strong>Technologies:</strong> {project.propertyNames.join(", ")}
              </p>
              <p>
                <strong>Industry:</strong> {project.industry}
              </p>
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
