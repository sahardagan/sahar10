// pages/index.js
import React from 'react';
import NavBar from '../components/NavBar';
import HobbyList from '../components/HobbyList';
import ProjectList from '../components/ProjectList';
import Reminder from '../components/Reminder';
import styles from '../styles/Home.module.css'; // ייבוא של קובץ ה-CSS המודולרי

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <NavBar />
      <main className={styles.homeMain}>
        <section id="hobbies">
          <h2>מעקב אחרי תחביבים</h2>
          <HobbyList />
        </section>
        <section id="projects">
          <h2>תכנון פרויקטים אישיים</h2>
          <ProjectList />
        </section>
        <section id="reminders">
          <h2>תזכורות</h2>
          <Reminder />
        </section>
      </main>
    </div>
  );
}

export default Home;
