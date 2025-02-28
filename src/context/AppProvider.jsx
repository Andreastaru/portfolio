/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useMemo, useState } from "react";
import { animate } from "framer-motion";
import { useLocation } from "react-router-dom";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const colors = ["#04372f", "#04ad7b", "#28f5cc", "#ffff", "#747c88"];
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [active, setActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isNavbarMobileOpen, setIsNavbarMobileOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const checkIfMobile = () => {
      const userAgentCheck =
        /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      const screenSizeCheck = window.innerWidth < 768;
      const isCurrentlyMobile = userAgentCheck || screenSizeCheck;
      setIsMobile(isCurrentlyMobile);

      if (!isCurrentlyMobile) {
        setIsNavbarMobileOpen(false);
        setActive(false);
      }
    };

    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, [window.innerWidth]);

  useEffect(() => {
    const controls = animate(currentColor, colors, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
      onUpdate: (latest) => {
        setCurrentColor(latest);
      },
    });

    return () => controls.stop();
  }, []);

  useEffect(() => {
    if (location.pathname !== "/about") {
      setIsDrawerOpen(false);
    }
  }, [location.pathname]);

  const value = useMemo(
    () => ({
      currentColor,
      active,
      setActive,
      isMobile,
      isDrawerOpen,
      setIsDrawerOpen,
      setIsNavbarMobileOpen,
      isNavbarMobileOpen,
    }),
    [currentColor, active, isMobile, isDrawerOpen]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
