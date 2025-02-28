import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";

const NavbarMobile = () => {
  const { currentColor, setActive, setIsNavbarMobileOpen } =
    useContext(AppContext);
  return (
    <>
      <NavLink
        to="/about"
        onClick={() => {
          setActive(false);
          setIsNavbarMobileOpen(false);
        }}
        className={({ isActive }) =>
          isActive
            ? "text-4xl"
            : "text-4xl text-white hover:text-gray-300 transition-colors"
        }
        style={({ isActive }) => (isActive ? { color: currentColor } : {})}
      >
        About Me
      </NavLink>

      <NavLink
        to="/journey"
        onClick={() => {
          setActive(false);
          setIsNavbarMobileOpen(false);
        }}
        className={({ isActive }) =>
          isActive
            ? "text-4xl"
            : "text-4xl text-white hover:text-gray-300 transition-colors"
        }
        style={({ isActive }) => (isActive ? { color: currentColor } : {})}
      >
        My Journey
      </NavLink>

      <NavLink
        to="/work"
        onClick={() => {
          setActive(false);
          setIsNavbarMobileOpen(false);
        }}
        className={({ isActive }) =>
          isActive
            ? "text-4xl"
            : "text-4xl text-white hover:text-gray-300 transition-colors"
        }
        style={({ isActive }) => (isActive ? { color: currentColor } : {})}
      >
        My Work
      </NavLink>
      <NavLink
        to="/contact"
        onClick={() => {
          setActive(false);
          setIsNavbarMobileOpen(false);
        }}
        className={({ isActive }) =>
          isActive
            ? "text-4xl"
            : "text-4xl text-white hover:text-gray-300 transition-colors"
        }
        style={({ isActive }) => (isActive ? { color: currentColor } : {})}
      >
        Let&apos;s Connect
      </NavLink>
    </>
  );
};

export default NavbarMobile;
