import React from 'react';
import Link from 'next/link';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
  return (
    <nav className={styles.navBar}>
      <ul>
        <li><Link href="#hobbies">מעקב אחרי תחביבים</Link></li>
        <li><Link href="#projects">תכנון פרויקטים אישיים</Link></li>
        <li><Link href="#reminders">תזכורות</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;
