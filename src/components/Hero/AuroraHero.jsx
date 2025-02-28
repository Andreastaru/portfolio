/* eslint-disable react/prop-types */
import { motion, useMotionTemplate } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppProvider";
import Navbar from "../Navbar/Navbar";
import NavbarMobile from "../Navbar/NavbarMobile";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";

const AuroraHero = ({ children }) => {
  const { currentColor, isMobile, isNavbarMobileOpen, active } =
    useContext(AppContext);
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${currentColor})`;
  const [isJourneyPage, setIsJourneyPage] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/journey" && isMobile) {
      setIsJourneyPage(true);
    } else {
      setIsJourneyPage(false);
    }
  }, [location.pathname, isMobile]);

  useEffect(() => {
    if (isMobile && isNavbarMobileOpen && active) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isMobile, isNavbarMobileOpen, active]);

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className={!isJourneyPage ? "flex flex-col min-h-screen" : "min-h-screen"}
    >
      <Navbar />
      <div className="flex-grow flex items-center justify-center w-full custom-padding-bottom">
        {isMobile && isNavbarMobileOpen && active ? (
          <div
            className={`container-mobile-nav transition-opacity duration-500 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <NavbarMobile />
          </div>
        ) : (
          children
        )}
      </div>
      <Footer />
    </motion.section>
  );
};

export default AuroraHero;
