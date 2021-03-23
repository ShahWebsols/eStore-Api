import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar/Sidebar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AllProducts from "../../pages/AllProducts";
function Content({ app: { sidebarFull } }) {
  return (
    <Fragment>
      <Router>
        <Navbar />
        <Sidebar />
        <div
          className={
            "content-wrapper " +
            (!sidebarFull ? "sidebar-mini-content-wrapper" : "")
          }
        >
          <Switch>
            <Route exact path="/products" component={AllProducts} />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

Content.propTypes = {
  app: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  app: state.app,
});
export default connect(mapStateToProps)(Content);
