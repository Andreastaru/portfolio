import { useState } from "react";
import ContactForm from "./ContactForm";
import useScrollToElement from "../../hooks/useScrollToElement";

export const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { elementRef, scrollToElement } = useScrollToElement();

  if (formSubmitted) {
    setTimeout(() => {
      scrollToElement();
    }, 500);
  }

  const handleFormSubmit = () => {
    setFormSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center p-8 text-white container-without-margin-top gap-10 ">
      {formSubmitted ? (
        <div
          className="text-2xl flex text-center container custom-padding-left-right"
          ref={elementRef}
          id="SUCCESS"
        >
          Thank you for your message! I have received it and will get back to
          you soon.
        </div>
      ) : (
        <div className="w-full max-w-lg  grid gap-4 p-8 rounded-lg">
          <h1 className="text-4xl  mb-4 text-center">Let’s Connect!</h1>
          <p className="text-lg mb-2 text-center">
            Got questions, inquiries, or just want to say hi? Don’t be a
            stranger—reach out anytime! I’m always thrilled to connect with new
            people.
          </p>
          <ContactForm isContactPage onFormSubmit={handleFormSubmit} />
        </div>
      )}
    </div>
  );
};
