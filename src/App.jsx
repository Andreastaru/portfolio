import styles from "./App.module.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Hero } from "./components/Hero/Hero";
import { About } from "./components/About/About";
import { Experience } from "./components/Experience/Experience";
import { Projects } from "./components/Projects/Projects";
import { Contact } from "./components/Contact/Contact";
import { Loadingscreen } from "./components/Loadingscreen/Loadingscreen";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function fakeRequest() {
  return new Promise((resolve) => setTimeout(() => resolve(), 1500));
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("Nav.Portfolio");
  }, [t]);

  useEffect(() => {
    fakeRequest().then(() => {
      setIsLoading(false);
    });
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
