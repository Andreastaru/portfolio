import { getImageUrl } from "../../utils";
import { useTranslation } from "react-i18next";
import styles from "./Contact.module.css";

export const Contact = () => {
  const { t } = useTranslation();
  return (
    <footer id="contact" className={styles.container}>
      <div className={styles.text}>
        <h2>{t("Contact.Contact")}</h2>
        <p>{t("Contact.ReachOut")}</p>
      </div>
      <ul className={styles.links}>
        <li className={styles.link}>
          <img src={getImageUrl("contact/emailIcon.png")} alt="email" />
          <a href="mailto:andreastaru007@gmail.com">andreastaru007@gmail.com</a>
        </li>
        <li className={styles.link}>
          <img src={getImageUrl("contact/linkedinIcon.png")} alt="linkedin" />
          <a href="https://www.linkedin.com/in/andreas-taru" target="_blank">
            www.linkedin.com/in/andreas-taru
          </a>
        </li>
        <li className={styles.link}>
          <img src={getImageUrl("contact/githubIcon.png")} alt="github" />
          <a href="https://github.com/Andreastaru" target="_blank">
            https://github.com/Andreastaru
          </a>
        </li>
      </ul>
    </footer>
  );
};
