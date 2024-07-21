import { getImageUrl } from "../../utils";
import { useTranslation } from "react-i18next";
import styles from "./About.module.css";

export const About = () => {
  const { t } = useTranslation();
  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>{t("About.About")}</h2>
      <div className={styles.content}>
        <img
          src={getImageUrl("about/aboutImage.png")}
          alt="My Photo"
          className={styles.aboutImage}
        />
        <ul className={styles.aboutItems}>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/cursorIcon.png")} alt="Cursor icon" />
            <div className={styles.aboutItemText}>
              <h3>{t("About.QA")}</h3>
              <p>{t("About.QA-info")}</p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/serverIcon.png")} alt="Server icon" />
            <div className={styles.aboutItemText}>
              <h3>{t("About.Front-end")}</h3>
              <p>{t("About.Front-info")}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};
