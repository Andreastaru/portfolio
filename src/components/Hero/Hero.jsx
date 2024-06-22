import { getImageUrl } from "../../utils";
import styles from "./Hero.module.css";
import { useState, useEffect, useCallback, useRef } from "react";

export const Hero = () => {
  const [showBugPopup, setShowBugPopup] = useState(false);
  const popupRef = useRef(null);

  const handleImageClick = (event) => {
    event.stopPropagation(); // Stop the event from bubbling up to the parent elements
    setShowBugPopup(true);
  };

  const handleClosePopup = useCallback(() => {
    setShowBugPopup(false);
  }, [setShowBugPopup]);

  const handleDocumentClick = useCallback(
    (event) => {
      if (
        showBugPopup &&
        popupRef.current &&
        !popupRef.current.contains(event.target)
      ) {
        handleClosePopup();
      }
    },
    [handleClosePopup, showBugPopup]
  );

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [handleDocumentClick]);

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hi, I am Andreas!</h1>
        <p className={styles.description}>
          I am a QA Engineer with ambition for the Automation and Front-end
          Development. Reach out if you would like to learn more!
        </p>
        <a className={styles.contactBtn} href="mailto:andreastaru007@gmail.com">
          Contact me
        </a>
      </div>
      <img
        src={getImageUrl("hero/heroImage.png")}
        alt="image"
        className={styles.heroImg}
        onClick={handleImageClick}
      />
      {showBugPopup && (
        <div ref={popupRef} className={styles.popup}>
          <p>You found a bug!</p>
          <button type="button" onClick={handleClosePopup}>
            Close
          </button>
        </div>
      )}
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
