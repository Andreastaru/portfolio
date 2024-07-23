export const getImageUrl = (path) => {
  return new URL(`/assets/${path}`, import.meta.url).href;
};

export const openInNewTab = (url) => {
  window.open(url, "_blank", "noopener, noreferrer");
};
