/* eslint-disable react-hooks/exhaustive-deps */
import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLocation } from "react-router-dom";
import SimpleButton from "../Utils/SimpleButton";

const schema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(1, { message: "Message cannot be empty." }),
  name: z.string().min(1, { message: "Name cannot be empty." }),
  phone: z.string().optional(),
});

const ContactForm = ({ isContactPage, onFormSubmit }) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("access_key", import.meta.env.REACT_APP_API_KEY);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone || "");
    formData.append("message", data.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const resultData = await response.json();

      if (resultData.success) {
        document.querySelector("form").reset();
        if (onFormSubmit) {
          onFormSubmit();
        }
      } else {
        console.error("Error", resultData);
        setError("root", {
          message: "An error occurred while submitting the form.",
        });
        scrollToBottom();
      }
    } catch (error) {
      console.error("Error", error);
      setError("root", {
        message: "An error occurred while submitting the form.",
      });
      scrollToBottom();
    }
  };

  const buttonRef = useRef(null);

  const handleTextareaChange = (e) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;

    clearErrors("message");
  };

  const location = useLocation();
  useEffect(() => {
    return () => {
      clearErrors();
    };
  }, [location.pathname]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      scrollToBottom();
    }
  }, [errors]);

  return (
    <div className="grid gap-4 p-4">
      <form
        id="CONTACTFORM"
        onSubmit={handleSubmit(onSubmit)}
        className={`flex-1 flex flex-col justify-center space-y-4 ${
          isContactPage ? "max-w-lg mx-auto" : ""
        }`}
      >
        {errors.name && (
          <div className="text-sm text-red-400 shadow-md pb-0.5">
            {errors.name.message}
          </div>
        )}
        <input
          className="border-[1px] border-neutral-500 px-4 py-2 hover:border-neutral-700 shadow-md"
          {...register("name")}
          type="text"
          placeholder="name"
        />
        {errors.email && (
          <div className="text-sm text-red-400 shadow-md">
            {errors.email.message}
          </div>
        )}
        <input
          className="border-[1px] border-neutral-500 px-4 py-2 hover:border-neutral-700 shadow-md"
          {...register("email")}
          type="text"
          placeholder="email"
        />
        <input
          className="border-[1px] border-neutral-500 px-4 py-2 hover:border-neutral-700 shadow-md"
          {...register("phone")}
          type="text"
          placeholder="phone (optional)"
        />
        {errors.message && (
          <div className="text-sm text-red-400 shadow-md">
            {errors.message.message}
          </div>
        )}
        <textarea
          className="overflow-y-hidden border-[1px] border-neutral-500 px-4 py-2 hover:border-neutral-700 shadow-md"
          {...register("message")}
          placeholder="message"
          onChange={handleTextareaChange}
          style={{
            maxHeight: "25vh",
            fontSize: "18px",
            minHeight: "10vh",
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        />

        <SimpleButton
          text={isSubmitting ? "..." : "Submit"}
          className="self-center border-white shadow-md"
          disabled={isSubmitting}
          type="submit"
          buttonRef={buttonRef}
        />
        {errors.root && (
          <div className="text-xl text-red-400 self-center shadow-md">
            {errors.root.message}
          </div>
        )}
      </form>
    </div>
  );
};

ContactForm.propTypes = {
  isContactPage: PropTypes.bool,
  onFormSubmit: PropTypes.func,
};

export default ContactForm;
