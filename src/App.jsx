import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import './App.css'; // for global styles (including theme)

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? 'app dark' : 'app light'}>
      <Navbar toggleTheme={toggleTheme} />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
