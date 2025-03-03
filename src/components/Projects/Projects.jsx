import { useEffect, useState } from "react";
import { getProjects, getTestingProjects } from "../../services/contentful";
import { GlareCard } from "./GlareCard";
import { IoArrowForwardCircle, IoLogoGithub } from "react-icons/io5";
import { openInNewTab } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [testingProjects, setTestingProjects] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const fetchedTestingProjects = await getTestingProjects();
      const fetchedProjects = await getProjects();
      setTestingProjects(fetchedTestingProjects);
      setProjects(fetchedProjects);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const handleLiveUrlClick = (url) => {
    if (url !== "home") {
      openInNewTab(url);
    } else {
      navigate("/");
    }
  };

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }
  return (
    <div>
      <h1 className="text-white text-3xl mb-4 text-center custom-padding-bottom ">
        Automate to Dominate: My Testing Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 justify-items-center">
        {testingProjects.map((project) => {
          return (
            <GlareCard
              className="flex flex-col items-start justify-end py-2 px-4 custom-padding-left-right custom-padding-bottom bg-gray-800 "
              key={project.project_name}
            >
              <img
                alt={project.project_name}
                className="h-full w-full absolute inset-0 object-cover opacity-30"
                src={
                  localStorage.getItem(project.project_name) ||
                  project.project_photo
                }
                onLoad={(e) =>
                  localStorage.setItem(project.project_name, e.target.src)
                }
              />
              <p
                className="font-bold text-white text-lg z-10"
                style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 1)" }}
              >
                {project.project_name}
              </p>
              <p
                className="font-normal text-base text-neutral-200 mt-4 z-10 drop-shadow-xl"
                style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 1)" }}
              >
                {project.description}
              </p>
              <div className="flex space-x-2 gap-2 z-10">
                <IoLogoGithub
                  size={36}
                  className="hover:cursor-pointer text-white hover:text-gray-600 transition-colors"
                  onClick={() => openInNewTab(project.github_url)}
                  aria-label={`Open ${project.project_name} github repository`}
                />
              </div>
            </GlareCard>
          );
        })}
      </div>

      <h1 className="text-white text-3xl mt-10 mb-4 text-center custom-padding-bottom custom-padding-top ">
        Building the Web: My React Front-End Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 justify-items-center">
        {projects.map((project) => {
          return (
            <GlareCard
              className="flex flex-col items-start justify-end py-2 px-4 custom-padding-left-right custom-padding-bottom bg-gray-800"
              key={project.project_name}
            >
              <img
                alt={project.project_name}
                className="h-full w-full absolute inset-0 object-cover opacity-30"
                src={
                  localStorage.getItem(project.project_name) ||
                  project.project_photo
                }
                onLoad={(e) =>
                  localStorage.setItem(project.project_name, e.target.src)
                }
              />
              <p
                className="font-bold text-white text-lg z-10"
                style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 1)" }}
              >
                {project.project_name}
              </p>
              <p
                className="font-normal text-base text-neutral-200 mt-4 z-10 drop-shadow-xl"
                style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 1)" }}
              >
                {project.description}
              </p>
              <div className="flex space-x-2 gap-2 z-10">
                <IoLogoGithub
                  size={36}
                  className="hover:cursor-pointer text-white hover:text-gray-600 transition-colors"
                  onClick={() => openInNewTab(project.github_url)}
                  aria-label={`Open ${project.project_name} github repository`}
                />
                <IoArrowForwardCircle
                  size={36}
                  className="hover:cursor-pointer text-white hover:text-gray-600 transition-colors"
                  onClick={() => handleLiveUrlClick(project.live_url)}
                  aria-label={`Open ${project.project_name} live version`}
                />
              </div>
            </GlareCard>
          );
        })}
      </div>
    </div>
  );
};
