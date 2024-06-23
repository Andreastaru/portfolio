import styles from "./Loadingscreen.module.css";
import { PuffLoader } from "react-spinners";

const Loadingscreen = () => {
  return (
    <div className={styles.loader}>
      <PuffLoader color={"#fff"} size={150} />
    </div>
  );
};

export { Loadingscreen };
