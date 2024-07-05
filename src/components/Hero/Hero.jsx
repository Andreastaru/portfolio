import { getImageUrl } from "../../utils";
import styles from "./Hero.module.css";
import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";

export const Hero = () => {
  const { t } = useTranslation();
  const [showBugPopup, setShowBugPopup] = useState(false);
  const popupRef = useRef(null);

  const handleImageClick = (event) => {
    event.stopPropagation();
    setShowBugPopup(!showBugPopup);
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
        <h1 className={styles.title}>{t("Hero.Me")}</h1>
        <p className={styles.description}>{t("Hero.About")}</p>
        <a className={styles.contactBtn} href="mailto:andreastaru007@gmail.com">
          {t("Hero.Contact")}
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
          <p>{t("Hero.Bug")}</p>
          <button type="button" onClick={handleClosePopup}>
            {t("Hero.Close")}
          </button>
        </div>
      )}
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
