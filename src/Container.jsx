import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About/About";
import Experience from "./components/Experience/Experience";
import { Projects } from "./components/Projects/Projects";
import { Contact } from "./components/Contact/Contact";
import { useEffect } from "react";

import {
  getCertifications,
  getProjects,
  getTestingProjects,
  getPictures,
} from "./services/contentful";
import AuroraHero from "./components/Hero/AuroraHero";
import NotFound from "./components/NotFound/NotFound";
import LandingPage from "./components/Landing/LandingPage";
import { AppProvider } from "./context/AppProvider";

function Container() {
  useEffect(() => {
    getTestingProjects();
    getProjects();
    getCertifications();
    getPictures();
  }, []);

  return (
    <div className="min-h-screen w-full relative items-center justify-center">
      <Router>
        <AppProvider>
          <AuroraHero>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/journey" element={<Experience />} />
              <Route path="/work" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuroraHero>
        </AppProvider>
      </Router>
    </div>
  );
}

export default Container;
