import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";
import styles from "./Projects.module.css";
import { useTranslation } from "react-i18next";

export const Projects = () => {
  const { t } = useTranslation();
  return (
    <section className={styles.container} id="projects">
      <h2 className={styles.title}>{t("Projects.Projects")}</h2>
      <div className={styles.projects}>
        {projects.map((project, id) => {
          return <ProjectCard key={id} project={project} />;
        })}
      </div>
    </section>
  );
};
