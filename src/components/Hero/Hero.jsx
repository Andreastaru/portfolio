import { getImageUrl } from "../../utils";
import styles from "./Hero.module.css";
import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ContactForm } from "../ContactForm/ContactForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Hero = () => {
  const { t } = useTranslation();
  const [showBugPopup, setShowBugPopup] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const popupRef = useRef(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isContactFormOpening, setIsContactFormOpening] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleImageClick = (event) => {
    event.stopPropagation();
    setShowBugPopup(!showBugPopup);
    setShowContactForm(false);
    setFormSubmitted(false);
  };

  const handleClosePopup = useCallback(() => {
    setShowBugPopup(false);
  }, [setShowBugPopup]);

  const handleCloseContactForm = useCallback(() => {
    setShowContactForm(false);
  }, [setShowContactForm]);

  const handleContactClick = () => {
    if (showContactForm) {
      setShowContactForm(false);
    } else {
      setIsContactFormOpening(true);
      setShowContactForm(true);
      setFormSubmitted(false);
    }
  };

  const handleDocumentClick = useCallback(
    (event) => {
      if (
        showBugPopup &&
        popupRef.current &&
        !popupRef.current.contains(event.target)
      ) {
        handleClosePopup();
      }
      if (
        showContactForm &&
        !isContactFormOpening &&
        !event.target.closest("#contactForm") &&
        !event.target.classList.contains("contactBtn") &&
        !event.target.closest(".contactBtn")
      ) {
        handleCloseContactForm();
      }
    },
    [
      handleClosePopup,
      handleCloseContactForm,
      showBugPopup,
      showContactForm,
      isContactFormOpening,
    ]
  );

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [handleDocumentClick]);

  useEffect(() => {
    const toastifyDiv = document.querySelector(".Toastify");
    const observer = new MutationObserver(() => {
      const toastElements = toastifyDiv.querySelectorAll(".Toastify__toast");
      const isToastPresent = toastElements.length > 0;
      setShowToast(isToastPresent);
    });

    observer.observe(toastifyDiv, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [setShowToast]);

  useEffect(() => {
    if (formSubmitted) {
      toast.success(t("Hero.Success"), {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: "dark",
        onOpen: () => {
          setTimeout(() => {
            setFormSubmitted(false);
          }, 100);
        },
      });
    }
  }, [formSubmitted, t]);

  useEffect(() => {
    const toastElement = document.getElementsByClassName(
      "Toastify__toast-container"
    );
    const isToastPresent = toastElement.length > 0;
    setShowToast(isToastPresent);
  }, []);

  return (
    <section
      className={
        showContactForm || showToast
          ? styles.containerContact
          : styles.container
      }
    >
      <div className={styles.content}>
        <h1 className={styles.title}>{t("Hero.Me")}</h1>
        <p className={styles.description}>{t("Hero.About")}</p>
        <a className={styles.contactBtn} onClick={handleContactClick}>
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
      {showContactForm && !formSubmitted && (
        <div id="contactForm">
          <ContactForm
            onFormSubmit={() => {
              setFormSubmitted(true);
              setShowContactForm(false);
            }}
          />
        </div>
      )}
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />

      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
        theme="dark"
        style={{
          zIndex: 3,
          textAlign: "center",
        }}
      />
    </section>
  );
};
