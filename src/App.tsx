import './App.css';
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Footer from './components/Footer';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import About from "./pages/About";
import Projects from "./pages/Projects";
import Interests from "./pages/Interests";
import Contacts from "./pages/Contacts";
// import Builder from './pages/Builder';
import ProjectFilter from './pages/ProjectFilter';
import NotFound from './pages/NotFound';
import Experience from './pages/Experience';

function App() {
  return (
    <div className="app-container">
      <Router>
        <Navbar />
        
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projectFilter/:paramName" element={<ProjectFilter />} />
            <Route path="/projectFilter" element={<ProjectFilter />} />
            
            {/* Projects route */}
            <Route path="/projects/:projectName" element={<Projects />} />
            
            {/* Other routes */}
            <Route path="/experience" element={<Experience />} />
            <Route path="/experience/:experienceName" element={<Experience />} />
            <Route path="/interests" element={<Interests />} />
            <Route path="/contact" element={<Contacts />} />
            
            {/* Not found route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
