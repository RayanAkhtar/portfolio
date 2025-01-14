import './App.css';
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import Footer from './components/Footer';
import Navbar from './components/Navbar';

import Home from './pages/Home';
//import About from "./pages/About";
//import Spotlight from "./pages/Spotlight";
import Projects from "./pages/Projects";
//import Extracurricular from "./pages/Extracurricular";
//import Interests from "./pages/Interests";
import Contacts from "./pages/Contacts";
//import Languages from "./pages/Languages";
//import Technologies from "./pages/Technologies";
//import Frameworks from "./pages/Frameworks";
//import Tools from "./pages/Tools";
//import Fields from './pages/Fields';
//import Experience from './pages/Experience'
import Builder from './pages/Builder';
import ProjectFilter from './pages/ProjectFilter';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="app-container">
      <Router>
        <Navbar />
        
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Builder />} />
            <Route path="/projectFilter/:paramName" element={<ProjectFilter />} />
            <Route path="/projectFilter" element={<ProjectFilter />} />
            
            {/* Projects route */}
            <Route path="/projects/:projectName" element={<Projects />} />
            
            {/* Other routes */}
            <Route path="/experience" element={<Builder />} />
            <Route path="/extracurricular" element={<Builder />} />
            <Route path="/interests" element={<Builder />} />
            <Route path="/contact" element={<Contacts />} />
            <Route path="/languages" element={<Builder />} />
            <Route path="/technologies" element={<Builder />} />
            <Route path="/frameworks" element={<Builder />} />
            <Route path="/tools" element={<Builder />} />
            <Route path="/fields" element={<Builder />} />
            
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
