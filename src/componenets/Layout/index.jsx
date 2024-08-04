import React from "react";
import { useAuth } from "../../hooks/AuthProvider";
import { Link, Outlet } from "react-router-dom";
import styles from "./style.module.css";

const Layout = () => {
  const auth = useAuth();

  return (
    <>
      <nav
        className={` ${styles.navbar} navbar navbar-expand-lg bg-body-tertiary`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Calendar
          </Link>
          <button
            className={`navbar-toggler ${styles.navbarToggler}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span
              className={`navbar-toggler-icon ${styles.navbarTogglerIcon}`}
            ></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/getEvents">
                  Events
                </Link>
              </li>
            </ul>
          </div>
          <div className="">
            <button
              className={`btn btn-outline-danger`}
              onClick={() => auth.logOut()}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
