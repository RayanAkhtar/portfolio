import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Footer from './components/Footer';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import About from "./pages/About";
import Spotlight from "./pages/Spotlight";
import Projects from "./pages/Projects";
import Extracurricular from "./pages/Extracurricular";
import Interests from "./pages/Interests";
import Contacts from "./pages/Contacts";
import Languages from "./pages/Languages";
import Technologies from "./pages/Technologies";
import Frameworks from "./pages/Frameworks";
import Tools from "./pages/Tools";
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="app-container">
      <Router>
        <Navbar />
        
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/spotlight" element={<Spotlight />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectName" element={<Projects />} />
            <Route path="/extracurricular" element={<Extracurricular />} />
            <Route path="/interests" element={<Interests />} />
            <Route path="/contact" element={<Contacts />} />
            <Route path="/languages" element={<Languages />} />
            <Route path="/technologies" element={<Technologies />} />
            <Route path="/frameworks" element={<Frameworks />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
