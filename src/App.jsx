import styles from "./App.module.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Hero } from "./components/Hero/Hero";
import { About } from "./components/About/About";
import { Experience } from "./components/Experience/Experience";
import { Projects } from "./components/Projects/Projects";
import { Contact } from "./components/Contact/Contact";
import { Loadingscreen } from "./components/Loadingscreen/Loadingscreen";
import { useState, useEffect } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <div className={styles.App}>
      {isLoading ? (
        <Loadingscreen />
      ) : (
        <div className={styles.appContent}>
          <Navbar />
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Contact />
        </div>
      )}
    </div>
  );
}

export default App;
