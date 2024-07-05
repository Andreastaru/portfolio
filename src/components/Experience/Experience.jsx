import skills from "../../data/skills.json";
import history from "../../data/history.json";
import { getImageUrl } from "../../utils";
import styles from "./Experience.module.css";
import { useTranslation } from "react-i18next";

export const Experience = () => {
  const { t } = useTranslation();
  const experienceTasks = {
    "Risk-based Testing": t("Experience.taskSchool"),
    "Test Design Techniques": t("Experience.taskSchoolTwo"),
    "Automated E2E Tests": t("Experience.task"),
    "Leading by example in UAT": t("Experience.taskTwo"),
  };

  const experienceRoles = {
    "Studying Software Testing": t("Experience.Student"),
    "QA Engineer": t("Experience.QA"),
  };

  const experienceOrganisation = {
    "Software Development Academy": t("Experience.School"),
    "COOP Pank": t("Experience.Company"),
  };

  const experienceStartDate = {
    "May, 2023": t("Experience.startDateComp"),
    "Aug, 2022": t("Experience.startDateStudy"),
  };

  const experienceEndDate = {
    Present: t("Experience.endDateComp"),
    "Dec, 2022": t("Experience.endDateStudy"),
  };

  return (
    <section className={styles.container} id="experience">
      <h2 className={styles.title}>{t("Experience.Experience")}</h2>
      <div className={styles.content}>
        <div className={styles.skills}>
          {skills.map((skill, id) => {
            return (
              <div className={styles.skill} key={id}>
                <div
                  className={styles.skillImageContainer}
                  id={styles[skill.title]}
                >
                  <img src={getImageUrl(skill.imageSrc)} alt={skill.title} />
                </div>
                <p>{skill.title}</p>
              </div>
            );
          })}
        </div>
        <ul className={styles.history}>
          {history.map((historyItem, id) => {
            return (
              <li className={styles.historyItem} key={id}>
                <img
                  src={getImageUrl(historyItem.imageSrc)}
                  alt={historyItem.organisation}
                />
                <div className={styles.historyItemDetails}>
                  <h3>{`${experienceRoles[historyItem.role]}, ${
                    experienceOrganisation[historyItem.organisation]
                  }`}</h3>
                  <p>{`${experienceStartDate[historyItem.startDate]} - ${
                    experienceEndDate[historyItem.endDate]
                  }`}</p>
                  <ul>
                    {historyItem.experiences.map((experience, id) => {
                      return <li key={id}>{experienceTasks[experience]}</li>;
                    })}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
