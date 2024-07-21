import React, { useState, useEffect } from "react";
import styles from "./ContactForm.module.css";
import { useTranslation } from "react-i18next";
import { PuffLoader } from "react-spinners";
import PropTypes from "prop-types";

export const ContactForm = ({ onFormSubmit }) => {
  const { t } = useTranslation();
  const textareaRef = React.createRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 830);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 830);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleTextareaChange = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      setIsSubmitting(true);
      const formData = new FormData(e.target);

      formData.append("access_key", import.meta.env.REACT_APP_API_KEY);

      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      }).then((res) => res.json());

      if (res.success) {
        console.log("Success", res);
        setEmailSent(true);
        onFormSubmit();
      }
    }
  };

  return (
    <section className={emailSent ? styles.emailSent : styles.contact}>
      <form onSubmit={onSubmit}>
        <h2>{t("ContactForm.Contact")}</h2>
        <div>
          <label>{t("ContactForm.Name")}</label>
          <input
            type="text"
            placeholder={t("ContactForm.NameInfo")}
            name="name"
            required
            onInvalid={(e) =>
              e.target.setCustomValidity(t("ContactForm.RequiredFieldError"))
            }
            onInput={(e) => e.target.setCustomValidity("")}
          />
        </div>
        <div>
          <label>{t("ContactForm.Email")}</label>
          <input
            type="email"
            placeholder={t("ContactForm.EmailInfo")}
            name="email"
            required
            onChange={(e) => {
              if (e.target.validity.typeMismatch) {
                const inputValue = e.target.value;
                e.target.setCustomValidity(
                  t("ContactForm.InvalidEmailError", { email: inputValue })
                );
              } else {
                e.target.setCustomValidity("");
              }
            }}
            onInvalid={(event) => {
              if (event.target.value === "") {
                event.target.setCustomValidity(
                  t("ContactForm.RequiredFieldError")
                );
              } else if (event.target.validity.typeMismatch) {
                event.target.setCustomValidity(
                  t("ContactForm.InvalidEmailError", {
                    email: event.target.value,
                  })
                );
              }
            }}
            onInput={(event) => {
              event.target.setCustomValidity("");
            }}
          />
        </div>
        <div>
          <label>{t("ContactForm.Message")}</label>
          <textarea
            ref={textareaRef}
            onChange={(e) => {
              handleTextareaChange(e);
            }}
            name="message"
            placeholder={t("ContactForm.MessageInfo")}
            required
            onInvalid={(e) =>
              e.target.setCustomValidity(t("ContactForm.RequiredFieldError"))
            }
            onInput={(e) => e.target.setCustomValidity("")}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={isSubmitting ? styles.loader : ""}
        >
          {isSubmitting ? (
            <PuffLoader color={"#fff"} size={isMobile ? 18 : 25} />
          ) : (
            t("ContactForm.Send")
          )}
        </button>
      </form>
    </section>
  );
};

ContactForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
