import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setSidebar } from "../../actions/appActions";

const Navbar = ({ app: { sidebarFull }, setSidebar }) => {
  const toggleDropdown = (e) => {
    e.preventDefault();
    const menu = document.querySelector(".dropdown-menu");
    menu.classList.toggle("show");
  };
  return (
    <nav
      className={
        "main-header navbar navbar-expand navbar-light  navbar-sticky " +
        (!sidebarFull ? "main-headerfull" : "")
      }
    >
      <div className="container-fluid">
        <ul className="navbar-nav ">
          <li className="nav-item">
            <a className="nav-link active" href="!#" onClick={setSidebar}>
              <i className="fas fa-bars"></i>
            </a>
          </li>
        </ul>

        {/* right */}
        <ul className="navbar-nav nabe-right">
          <li className="nav-item">
            <a className="nav-link" href="!#">
              Features
            </a>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="!#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onClick={toggleDropdown}
            >
              Dropdown
            </a>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="!#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="!#">
                  Another action
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="!#">
                  Something else here
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};
Navbar.propTypes = {
  app: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  app: state.app,
});
export default connect(mapStateToProps, { setSidebar })(Navbar);
