/* eslint-disable react/prop-types */
import { motion, useMotionTemplate } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppProvider";
import Navbar from "../Navbar/Navbar";
import NavbarMobile from "../Navbar/NavbarMobile";

const AuroraHero = ({ children }) => {
  const { currentColor, isMobile, isNavbarMobileOpen, active } =
    useContext(AppContext);
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${currentColor})`;

  const [isVisible, setIsVisible] = useState(false);

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
      className="min-h-screen"
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
    </motion.section>
  );
};

export default AuroraHero;
