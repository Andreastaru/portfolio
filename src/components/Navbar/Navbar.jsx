import { useState, useEffect } from "react";

import styles from "./Navbar.module.css";
import { getImageUrl } from "../../utils";
import { useTranslation } from "react-i18next";
import i18next from "../../../services/i18next";

export const Navbar = () => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [lng, setLng] = useState(i18next.language);

  const changeLng = (lng) => {
    i18next.changeLanguage(lng);
    setLng(lng);
    document.documentElement.lang = lng;
  };

  const handleDocumentClick = (event) => {
    if (!event.target.closest(`.${styles.navbar}`)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <nav className={styles.navbar}>
      <a className={styles.title} href="/">
        {t("Nav.Portfolio")}
      </a>
      <div className={styles.menu}>
        <img
          className={styles.menuBtn}
          src={
            menuOpen
              ? getImageUrl("nav/closeIcon.png")
              : getImageUrl("nav/menuIcon.png")
          }
          alt="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <ul
          className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
          onClick={() => setMenuOpen(false)}
        >
          <li>
            <a href="#about">{t("Nav.About")}</a>
          </li>
          <li>
            <a href="#experience">{t("Nav.Experience")}</a>
          </li>
          <li>
            <a href="#projects">{t("Nav.Projects")}</a>
          </li>
          <li>
            <a href="#contact">{t("Nav.Contact")}</a>
          </li>
        </ul>
      </div>
      <div className={styles.langSwitcher}>
        <button
          type="button"
          className={lng === "et" ? styles.active : ""}
          onClick={() => changeLng("et")}
        >
          ET
        </button>
        <button
          type="button"
          className={lng === "en" ? styles.active : ""}
          onClick={() => changeLng("en")}
        >
          EN
        </button>
      </div>
    </nav>
  );
};
