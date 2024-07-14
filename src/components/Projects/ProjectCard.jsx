import { getImageUrl } from "../../utils";
import PropTypes from "prop-types";
import styles from "./ProjectCard.module.css";
import { useTranslation } from "react-i18next";

export const ProjectCard = ({
  project: { title, imageSrc, skills, demo, source, description },
}) => {
  const { t } = useTranslation();
  const projectTitle = {
    "Portfolio Website": t("Projects.Portfolio"),
    "E2E tests boilerplate": t("Projects.WebdriverIO"),
    "SQL tests boilerplate": t("Projects.Postgres"),
  };

  const projectDescription = {
    "I created this website to showcase my skills and learn more in the process.":
      t("Projects.PortfolioDescription"),
    "I created this boilerplate so it will be easier to start automating E2E tests.":
      t("Projects.WebdriverIODescription"),
    "I created this boilerplate so it will be easier to test in database and also report test results.":
      t("Projects.PostgresDescription"),
  };

  return (
    <div className={styles.container}>
      <img
        src={getImageUrl(imageSrc)}
        alt={` Image of ${title}`}
        className={styles.image}
      />
      <h3 className={styles.title}>{`${projectTitle[title]}`}</h3>
      <p
        className={styles.description}
      >{`${projectDescription[description]}`}</p>
      <ul className={styles.skills}>
        {skills.map((skill, id) => {
          return (
            <li key={id} className={styles.skill}>
              {skill.url ? (
                <span
                  onClick={() => window.open(skill.url, "_blank")}
                  title={skill.url}
                  className={styles.clickable}
                >
                  {skill.name}
                </span>
              ) : (
                skill.name
              )}
            </li>
          );
        })}
      </ul>
      <div
        className={demo ? styles.links : `${styles.links} ${styles.centered}`}
      >
        {demo && (
          <a
            href={demo === "currentUrl" ? window.location.href : demo}
            className={styles.link}
          >
            Demo
          </a>
        )}
        <a href={source} className={styles.link}>
          {`${t("Projects.ProjectSource")}`}
        </a>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string,
      })
    ).isRequired,
    demo: PropTypes.string,
    source: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
