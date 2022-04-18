import React from "react";
import styles from "./Header.module.css"
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className={styles.navBar}>
        <ul>
          <li>
            <NavLink to="/reports">Reports</NavLink>
          </li>
          <li>
            <NavLink to="/offers">Offers</NavLink>
          </li>
          <li>
            <NavLink to="/offer-targets">Offer Targets</NavLink>
          </li>
          <li>
            <NavLink to="/players">Players</NavLink>
          </li>
          <li>
            <NavLink to="/devices">Devices</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;