import React from 'react';
import './HomePage.css';

function HomePage() {
  return (
    <main className="home-page">
      <section className="intro">
        <h1>Welcome to My Portfolio</h1>
        <p>This is where you can learn more about me and my work.</p>
      </section>
      <section className="about">
        <h2>About Me</h2>
        <p>This is the about section. Add some details about yourself here.</p>
      </section>
      <section className="projects">
        <h2>Projects</h2>
        <p>This is the projects section. Showcase your work here.</p>
      </section>
    </main>
  );
}

export default HomePage;
