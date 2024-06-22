import { getImageUrl } from "../../utils";

import styles from "./Contact.module.css";

export const Contact = () => {
  return (
    <footer id="contact" className={styles.container}>
      <div className={styles.text}>
        <h2>Contact</h2>
        <p>Feel free to reach out!</p>
      </div>
      <ul className={styles.links}>
        <li className={styles.link}>
          <img src={getImageUrl("contact/emailIcon.png")} alt="email" />
          <a href="mailto:andreastaru007@gmail.com">andreastaru007@gmail.com</a>
        </li>
        <li className={styles.link}>
          <img
            src={getImageUrl("contact/linkedinIcon.png")}
            alt="linkedin"
            href="https://www.linkedin.com/in/andreas-taru"
          />
          <a href="https://www.linkedin.com/in/andreas-taru">
            www.linkedin.com/in/andreas-taru
          </a>
        </li>
        <li className={styles.link}>
          <img src={getImageUrl("contact/githubIcon.png")} alt="github" />
          <a href="https://github.com/Andreastaru">
            https://github.com/Andreastaru
          </a>
        </li>
      </ul>
    </footer>
  );
};
