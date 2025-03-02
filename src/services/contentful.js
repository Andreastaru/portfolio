import { createClient } from "contentful";
import parse from "html-react-parser";

const client = createClient({
  space: import.meta.env.REACT_APP_CONTENFUL_SPACE_ID,
  accessToken: import.meta.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
});

const cleanUrl = (url) => {
  if (url.startsWith("//")) {
    return "https:" + url;
  }
  return url;
};

const _imgFetcher = (response, assetId) => {
  const asset = response.includes.Asset.find(
    (asset) => asset.sys.id === assetId
  );
  return cleanUrl(asset.fields.file.url);
};

let cachedProjects = null;
const _fetchProjects = async () => {
  if (cachedProjects) {
    return cachedProjects;
  }
  try {
    const response = await client.getEntries({ content_type: "project" });
    const projects = response.items.map((item) => {
      const { project_name, project_photo, description, github_url, live_url } =
        item.fields;
      const photoUrl = _imgFetcher(response, project_photo.sys.id);
      return {
        project_name,
        project_photo: photoUrl,
        description,
        github_url,
        live_url,
      };
    });
    cachedProjects = projects;
    return projects;
  } catch (error) {
    console.error("Error fetching data from Contentful:", error);
  }
};

export const getProjects = async () => {
  const allProjects = await _fetchProjects();

  return allProjects.filter((project) => project.live_url !== "test");
};

export const getTestingProjects = async () => {
  const allProjects = await _fetchProjects();

  return allProjects.filter((project) => project.live_url === "test");
};

let cachedCertifications = null;
const _fetchCertifications = async () => {
  if (cachedCertifications) {
    return cachedCertifications;
  }
  try {
    const response = await client.getEntries({
      content_type: "certifications",
    });
    const certifications = response.items.map((item) => {
      const { name, cert_url, logo, from } = item.fields;
      const logoUrl = _imgFetcher(response, logo.sys.id);
      return {
        name,
        cert_url,
        logo: logoUrl,
        from,
      };
    });

    cachedCertifications = certifications;
    return certifications;
  } catch (error) {
    console.error("Error fetching data from Contentful:", error);
  }
};

export const getCertifications = async () => {
  return await _fetchCertifications();
};

let fetchedPictures = null;
const _fetchPictures = async () => {
  if (fetchedPictures) {
    return fetchedPictures;
  }
  try {
    const response = await client.getEntries({
      content_type: "my_pictures",
    });
    const pictures = response.items.map((item) => {
      const { title, picture } = item.fields;
      const photoUrl = _imgFetcher(response, picture.sys.id);
      return {
        title,
        picture_url: photoUrl,
      };
    });

    fetchedPictures = pictures;
    return pictures;
  } catch (error) {
    console.error("Error fetching data from Contentful:", error);
  }
};

export const getPictures = async () => {
  return await _fetchPictures();
};

let fetchedParagraphs = null;
const _fetchParagraphs = async () => {
  if (fetchedParagraphs) {
    return fetchedParagraphs;
  }
  try {
    const response = await client.getEntries({
      content_type: "experience",
    });
    const paragraphs = response.items.map((item) => {
      const { title, paragraph } = item.fields;

      return {
        title,
        paragraph: parse(paragraph),
      };
    });

    fetchedParagraphs = paragraphs;
    return paragraphs;
  } catch (error) {
    console.error("Error fetching data from Contentful:", error);
  }
};

export const getParagraphByTitle = async (title) => {
  const allParagraphs = await _fetchParagraphs();
  return allParagraphs.find((paragraph) => paragraph.title === title);
};
