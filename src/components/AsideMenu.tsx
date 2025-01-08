import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/asideMenu.css";
import { getSpotlightProjects, getCurrentlyWorkingOnProjects, getProjects, getOtherProjects} from "../../api/projects";

interface MenuItem {
  label: string;
  path: string;
  subItems?: MenuItem[];
}

interface Project {
  name: string;
  description: string;
  spotlight: boolean;
  startDate: string;
  endDate: string;
  currentlyWorkingOn: boolean;
  thumbnailImage: string;
  propertyNames: string[];
}

const menuItems: MenuItem[] = [
  { label: "About Me", path: "/about" },
  {
    label: "Spotlight",
    path: "/spotlight",
    subItems: [{ label: "Projects 1", path: "/projects/1" }],
  },
  {
    label: "Projects",
    path: "/projects",
    subItems: [
      { label: "Project 1", path: "/projects/1" },
      { label: "Project 2", path: "/projects/2" },
    ],
  },
  { label: "Extracurricular", path: "/extracurricular" },
  { label: "Interests & hobbies", path: "/interests" },
  { label: "Contact", path: "/contact" },
];

const AsideMenu: React.FC<{ isOpen: boolean; closeMenu: () => void }> = ({
  isOpen,
  closeMenu,
}) => {

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [spotlightProjects, setSpotlightProjects] = useState<Project[]>();
  const [currentProjects, setCurrentProjects] = useState<Project[]>();
  const [otherProjects, setOtherProjects] = useState<Project[]>();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchData = async () => {
      try {

        const spotlightData = await getSpotlightProjects();
        setSpotlightProjects(spotlightData);
        console.log("Spotlight projects", spotlightData)
        const currentData = await getCurrentlyWorkingOnProjects();
        setCurrentProjects(currentData);

        const otherData = await getOtherProjects();
        setOtherProjects(otherData);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleSubMenu = (label: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleMenuClick = (item: MenuItem) => {
    if (item.subItems) {
      toggleSubMenu(item.label);
    } else {
      navigate(item.path);
      closeMenu();
    }
  };

  const handleMenuDoubleClick = (item: MenuItem) => {
    navigate(item.path);
    closeMenu();
  };

  return (
    <aside className={`aside-menu ${isOpen ? "open" : ""}`}>
      <ul>
        {menuItems.map((item) => (
          <li key={item.path}>
            <div
              className="menu-item"
              onClick={() => handleMenuClick(item)}
              onDoubleClick={() => handleMenuDoubleClick(item)}
            >
              <span className="menu-link">{item.label}</span>
              {item.subItems && (
                <span className="dropdown-toggle">
                  {expandedItems[item.label] ? "▲" : "▼"}
                </span>
              )}
            </div>
            {item.subItems && (
              <ul
                className={`sub-items ${
                  expandedItems[item.label] ? "expanded" : ""
                }`}
              >
                {item.subItems.map((subItem) => (
                  <li key={subItem.path}>
                    <Link
                      to={subItem.path}
                      className="sub-item-link"
                      onClick={closeMenu}
                    >
                      {subItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AsideMenu;
