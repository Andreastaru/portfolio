/* import React from "react"; */
import { getImageUrl } from "../../utils";

import styles from "./About.module.css";

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>About</h2>
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
              <h3>QA Engineer</h3>
              <p>
                I am a QA Engineer with experience in automation using
                JavaScript or TypeScript. I have used Selenium and WebdriverIO,
                which is also selenium based
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/serverIcon.png")} alt="Server icon" />
            <div className={styles.aboutItemText}>
              <h3>Front-end Developer</h3>
              <p>
                I am actively learning about React to help test and develop
                front-end applications.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};
