import styles from "./Loadingscreen.module.css";
import { PuffLoader } from "react-spinners";
import FontFaceObserver from "fontfaceobserver";

const Loadingscreen = () => {
  const robotoFont = new FontFaceObserver("Roboto");

  robotoFont
    .load()
    .then(() => {
      document.documentElement.style.fontFamily = "Roboto, sans-serif";
    })
    .catch(() => {
      document.documentElement.style.fontFamily = "Arial, sans-serif";
    });

  return (
    <div className={styles.loader}>
      <PuffLoader color={"#fff"} size={150} />
    </div>
  );
};

export { Loadingscreen };
