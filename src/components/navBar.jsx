import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../../node_modules/jquery/dist/jquery";
import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        FormReader
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav mr-auto">
          <NavLink className="nav-item nav-link" to="/documents">
            Documents
          </NavLink>
          <NavLink className="nav-item nav-link" to="/upload">
            Upload
          </NavLink>
          <NavLink className="nav-item nav-link" to="/dashboard">
            Dashboard
          </NavLink>
        </div>
        <div className="navbar-nav">
          {!user && (
            <React.Fragment>
              <NavLink className="nav-item nav-link" to="/login">
                <button className="btn btn-outline-primary">Login</button>
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                <button className="btn btn-primary">Register</button>
              </NavLink>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <p className="my-auto">Welcome {user.name}!</p>
              <NavLink className="nav-item nav-link" to="/logout">
                <button className="btn btn-primary">Logout</button>
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
