import React from "react";
import styles from "./styles/Nav.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navItems}>
        <ul>
            <li><a href="/">My Posts</a></li>
            <li><a href="/posts">Add Posts</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
