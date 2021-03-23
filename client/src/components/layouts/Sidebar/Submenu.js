import React, { useState } from "react";
import { Link } from "react-router-dom";

const Submenu = ({ item }) => {
  const [showDropdown, setshowDropdown] = useState(false);
  const handleClick = () => setshowDropdown(!showDropdown);
  return (
    <li className="nav-item" onClick={handleClick}>
      <a href="!#" className="nav-link">
        <i
          className={"nav-icon " + (item.icon ? item.icon : "bi-dash-circle")}
        ></i>
        <p>
          {item.title}
          <i
            className={
              "right " + (showDropdown ? item.iconOpen : item.iconClose)
            }
          ></i>
        </p>
      </a>

      <ul
        className={"nav nav-treeview " + (showDropdown ? "show-treeview" : "")}
      >
        {item.subNav.map((submenu, index) => {
          return (
            <li className="nav-item" key={index}>
              <Link to="/products" className="nav-link">
                <i className="far fa-circle nav-icon"></i>
                <p>{submenu.title}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export default Submenu;
