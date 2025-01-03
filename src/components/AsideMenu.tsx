import React from "react";
import { Link } from "react-router-dom";

interface MenuItem {
  label: string;
  path: string;
  subItems?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { label: "About Me", path: "/about" },
  {
    label: "Projects",
    path: "/projects",
    subItems: [
      { label: "Project 1", path: "/projects/1" },
      { label: "Project 2", path: "/projects/2" },
    ],
  },
  { label: "Contact", path: "/contact" },
];

const AsideMenu: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <aside className={`aside-menu ${isOpen ? "open" : ""}`}>
      <button
        onClick={() => {}}
        className="close-btn"
      >
        Close
      </button>
      <ul>
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link to={item.path} className="menu-link">
              {item.label}
            </Link>
            {item.subItems && (
              <ul className="sub-items">
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
