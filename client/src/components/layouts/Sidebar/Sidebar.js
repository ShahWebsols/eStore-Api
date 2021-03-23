import React from "react";
import { SidebarData } from "./SidebarData";
import Submenu from "./Submenu";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AdminLTELogo from "./AdminLTELogo.png";
const Sidebar = ({ app: { sidebarFull } }) => {
  return (
    <aside
      className={"main-sidebar " + (!sidebarFull ? "main-sidebarskiny" : "")}
    >
      <a href="!#" className="brand-link">
        <img className="brand-img" src={AdminLTELogo} alt="" />
        <span className="brand-text">eStore Panel</span>
      </a>
      <div className="sidebar">
        <ul className="nav nav-pills nav-sidebar flex-column">
          {SidebarData.map((item, index) => {
            return <Submenu item={item} key={index} />;
          })}
        </ul>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  app: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  app: state.app,
});
export default connect(mapStateToProps)(Sidebar);
