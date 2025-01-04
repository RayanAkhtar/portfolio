import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/asideMenu.css";

interface MenuItem {
  label: string;
  path: string;
  subItems?: MenuItem[];
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
  { label: "Interests & hobbies", path: "/interestsAndHobbies" },
  { label: "Contact", path: "/contact" },
];

const AsideMenu: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

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
    }
  };

  const handleMenuDoubleClick = (item: MenuItem) => {
    navigate(item.path);
  };

  return (
    <aside className={`aside-menu ${isOpen ? "open" : ""}`}>
      <button className="close-btn">Close</button>
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
                    <Link to={subItem.path} className="sub-item-link">
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
