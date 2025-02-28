/* eslint-disable react-hooks/exhaustive-deps */

import { IoHomeOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppProvider";
import { AnimatedHamburgerButton } from "./AnimatedHamburgerButton ";

const Navbar = () => {
  const { currentColor, setIsNavbarMobileOpen, isNavbarMobileOpen, setActive } =
    useContext(AppContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`flex justify-center items-center ${
        isMobile ? "h-25 " : "h-50"
      } `}
    >
      <nav className="bg-[rgb(225,225,225)]/15 flex justify-between items-center gap-16 rounded-full backdrop-blur-md backdrop-opacity-60 text-white shadow-lg custom-navbar-padding">
        <ul className="flex gap-8 flex-grow">
          <NavLink
            to="/"
            onClick={() => {
              setActive(false);
              setIsNavbarMobileOpen(false);
            }}
            className={({ isActive }) =>
              isActive ? "" : "text-white hover:text-gray-300 transition-colors"
            }
            style={({ isActive }) => (isActive ? { color: currentColor } : {})}
          >
            <IoHomeOutline size={24} />
          </NavLink>

          {!isMobile && (
            <>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? ""
                    : "text-white hover:text-gray-300 transition-colors"
                }
                style={({ isActive }) =>
                  isActive ? { color: currentColor } : {}
                }
              >
                About Me
              </NavLink>

              <NavLink
                to="/journey"
                className={({ isActive }) =>
                  isActive
                    ? ""
                    : "text-white hover:text-gray-300 transition-colors"
                }
                style={({ isActive }) =>
                  isActive ? { color: currentColor } : {}
                }
              >
                My Journey
              </NavLink>

              <NavLink
                to="/work"
                className={({ isActive }) =>
                  isActive
                    ? ""
                    : "text-white hover:text-gray-300 transition-colors"
                }
                style={({ isActive }) =>
                  isActive ? { color: currentColor } : {}
                }
              >
                My Work
              </NavLink>
            </>
          )}
        </ul>
        {!isMobile ? (
          <NavLink
            to="/contact"
            className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-green-500 py-1 px-6 rounded-lg shadow-xl text-white text-md  hover:from-blue-400 hover:to-green-600 custom-padding-left-right"
          >
            Say Hello
          </NavLink>
        ) : (
          <AnimatedHamburgerButton
            onClick={() => {
              setActive((pv) => !pv);
              setIsNavbarMobileOpen(!isNavbarMobileOpen);
            }}
          />
        )}
      </nav>
    </div>
  );
};

export default Navbar;
