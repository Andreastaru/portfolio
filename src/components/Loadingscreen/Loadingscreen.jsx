import styles from "./Loadingscreen.module.css";
import { PuffLoader } from "react-spinners";
import FontFaceObserver from "fontfaceobserver";

const Loadingscreen = () => {
  const Font = new FontFaceObserver("Outfit");

  Font.load().then(() => {
    document.documentElement.style.fontFamily = "Outfit, sans-serif";
  });

  return (
    <div className={styles.loader}>
      <PuffLoader color={"#fff"} size={150} />
    </div>
  );
};

export { Loadingscreen };
