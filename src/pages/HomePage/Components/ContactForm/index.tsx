import emailjs from "@emailjs/browser";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "../../../../assets/logo.png";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateMessage, setStateMessage] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sendEmail = (e: any) => {
    e.persist();
    e.preventDefault();
    setIsSubmitting(true);
    console.log(e.target);
    emailjs
      .sendForm(
        "service_5s10wrs",
        "template_bsqap0e",
        e.target,
        "bFJ6aPnvS7f_CrnbE"
      )
      .then(
        () => {
          setStateMessage("Message sent!");
          setIsSubmitting(false);
          setTimeout(() => {
            setStateMessage(null);
          }, 5000);
        },
        () => {
          setStateMessage("Something went wrong, please try again later");
          setIsSubmitting(false);
          setTimeout(() => {
            setStateMessage(null);
          }, 5000);
        }
      );

    e.target.reset();
  };
  return (
    <div className="flex flex-col md:flex-row border-t-4 border-neutral-color-2 min-h-[40vh]">
      <div
        className={
          "flex flex-col bg-neutral-color-1 border-b-4 md:border-b-0 md:border-r-4 border-neutral-color-2 w-full md:w-[50%]"
        }
      >
        <div className="flex flex-row items-center p-4">
          <img src={logo} className="h-12 md:h-16 p-1" alt="logo" />
          <p className="text-xl md:text-2xl text-neutral-color-2">
            Smith Avenue Insights
          </p>
        </div>
        <h1 className="text-xl md:text-2xl text-neutral-color-2 pl-6">
          Contact Us
        </h1>
        <form
          onSubmit={sendEmail}
          className={"flex flex-col w-full p-4 md:p-1 md:m-5 md:pl-8"}
        >
          <div className="flex flex-col md:flex-row w-full md:w-[80%] pb-4 md:pb-6">
            <label className="text-lg md:text-xl text-neutral-color-2 mb-2 md:mb-0 md:w-[70px]">
              Name
            </label>
            <input
              className="bg-transparent border-b-2 text-neutral-color-2 w-full md:ml-5"
              type="text"
              name="from_name"
            />
          </div>
          <div className="flex flex-col md:flex-row w-full md:w-[80%] pb-4 md:pb-6">
            <label className="text-lg md:text-xl text-neutral-color-2 mb-2 md:mb-0 md:w-[70px]">
              Email
            </label>
            <input
              className="bg-transparent border-b-2 text-neutral-color-2 w-full md:ml-5"
              type="email"
              name="reply_to"
            />
          </div>
          <div className="flex flex-col md:flex-row w-full md:w-[80%] pb-4 md:pb-6">
            <label className="text-lg md:text-xl text-neutral-color-2 mb-2 md:mb-0 md:w-[70px]">
              Message
            </label>
            <input
              className="bg-transparent border-b-2 text-neutral-color-2 w-full md:ml-5"
              type="text"
              name="message"
            />
          </div>

          <button
            type="submit"
            value="Send"
            disabled={isSubmitting}
            className="bg-accent-color-1 w-full md:w-1/2 rounded-lg py-2 mt-4"
          >
            Submit
          </button>
          {stateMessage && <p className="mt-4 text-center">{stateMessage}</p>}
        </form>
      </div>
      <div
        className={
          "flex flex-col items-start bg-neutral-color-1 w-full md:w-[50%] p-4"
        }
      >
        <p className="text-lg md:text-xl text-neutral-color-2 font-bold">
          Menu
        </p>
        <Link
          to="/company"
          className="text-lg md:text-xl text-neutral-color-2 pt-4 md:pt-6 hover:text-accent-color-1 transition-colors"
        >
          Company
        </Link>
        <Link
          to="/support"
          className="text-lg md:text-xl text-neutral-color-2 pt-4 md:pt-6 hover:text-accent-color-1 transition-colors"
        >
          Support
        </Link>
        <Link
          to="/accessibility"
          className="text-lg md:text-xl text-neutral-color-2 pt-4 md:pt-6 hover:text-accent-color-1 transition-colors"
        >
          Accessibility statement
        </Link>
        <Link
          to="/privacy"
          className="text-lg md:text-xl text-neutral-color-2 pt-4 md:pt-6 hover:text-accent-color-1 transition-colors"
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  );
};

export default ContactForm;
