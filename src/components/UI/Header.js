import React from "react";
import styles from "./Header.module.css"
import { NavLink } from "react-router-dom";

const activeStyle = {
  textDecoration: "underline",
  color: "#e0bff4",
};

const Header = () => {
  return (
    <>
      <nav className={styles.navBar}>
        <ul>
          <li>
            <NavLink
              to="/reports"
              style={({ isActive }) => isActive ? activeStyle : undefined }
              >
                Reports</NavLink>
          </li>
          <li>
            <NavLink
            to="/offers"
            style={({ isActive }) => isActive ? activeStyle : undefined }
            >Offers</NavLink>
          </li>
          <li>
            <NavLink
              to="/offer-targets"
              style={({ isActive }) => isActive ? activeStyle : undefined }
            >
              Offer Targets</NavLink>
          </li>
          <li>
            <NavLink
              to="/players"
              style={({ isActive }) => isActive ? activeStyle : undefined }
              >
            Players</NavLink>
          </li>
          <li>
            <NavLink
              to="/devices"
              style={({ isActive }) => isActive ? activeStyle : undefined }
            >
              Devices</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;