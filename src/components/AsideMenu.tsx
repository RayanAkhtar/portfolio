import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/asideMenu.css";
import {
  getSpotlightProjects,
  getCurrentlyWorkingOnProjects,
  getOtherProjects,
} from "../../api/firebase";

interface MenuItem {
  label: string;
  path: string;
  subItems?: MenuItem[];
}

const AsideMenu: React.FC<{ isOpen: boolean; closeMenu: () => void }> = ({
  isOpen,
  closeMenu,
}) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { label: "About Me", path: "/about" },
    { label: "Extracurricular", path: "/extracurricular" },
    { label: "Interests & hobbies", path: "/interests" },
    { label: "Contact", path: "/contact" },
  ]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<string>('dark');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data in parallel
        const [spotlightData, currentData, otherData] = await Promise.all([
          getSpotlightProjects(),
          getCurrentlyWorkingOnProjects(),
          getOtherProjects(),
        ]);

        const spotlightMenu: MenuItem = {
          label: "Spotlight",
          path: "/spotlight",
          subItems: spotlightData.map((project) => ({
            label: project.name,
            path: `/projects/${project.name}`,
          })),
        };

        const currentProjectsMenu: MenuItem = {
          label: "Current Projects",
          path: "/current",
          subItems: currentData.map((project) => ({
            label: project.name,
            path: `/projects/${project.name}`,
          })),
        };

        const otherProjectsMenu: MenuItem = {
          label: "Other Projects",
          path: "/other",
          subItems: otherData.map((project) => ({
            label: project.name,
            path: `/projects/${project.name}`,
          })),
        };


        const newMenuItems = [
          spotlightMenu,
          currentProjectsMenu,
          otherProjectsMenu,
        ];

        // Removing duplicates based on the label or path
        setMenuItems((prevMenuItems) => {
          const aboutPath = prevMenuItems[0];
          const existingPaths = new Set(prevMenuItems.map((item) => item.path));
          const filteredItems = newMenuItems.filter(
            (newItem) => !existingPaths.has(newItem.path)
          );
          return [aboutPath, ...filteredItems, ...prevMenuItems.slice(1)];
        });
      } catch (error) {
        console.error("Error fetching menu items:", error);
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

  // Switch theme function
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      document.documentElement.classList.remove(`theme-${prevTheme}`);
      document.documentElement.classList.add(`theme-${newTheme}`);
      return newTheme;
    });
  };

  if (loading) {
    return <div>Loading menu...</div>;
  }

  return (
    <aside className={`aside-menu ${isOpen ? "open" : ""}`}>

      <div className="day-toggle">
        <label className="switch">
            <input type="checkbox" onClick={toggleTheme} checked={theme != "light"}/>
            <span className="slider"></span>
        </label>
      </div>

      <ul>
        {menuItems.map((item) => (
          <li key={item.path}>
            <div
              className="menu-item"
              onClick={() => handleMenuClick(item)}
              onDoubleClick={() => handleMenuDoubleClick(item)}
              role="menuitem"
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
