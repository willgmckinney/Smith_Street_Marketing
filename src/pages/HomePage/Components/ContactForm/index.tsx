import emailjs from "@emailjs/browser";
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
    <div className="flex flex-row border-t-4 border-neutral-color-2 h-[40vh]">
      <div
        className={
          "flex flex-col bg-neutral-color-1 border-r-4 border-neutral-color-2 w-[50%]"
        }
      >
        <div className="flex flex-row items-center">
          <img src={logo} className="h-16 p-1" alt="logo" />
          <p className="text-2xl text-neutral-color-2">Smith Avenue Insights</p>
        </div>
        <h1 className="text-2xl text-neutral-color-2 pl-6">Contact Us</h1>
        <form
          onSubmit={sendEmail}
          className={"flex flex-col w-[100%] p-1 m-5 pl-8"}
        >
          <div className="flex flex-row w-[80%] pb-6">
            <label className="text-xl text-neutral-color-2 w-[70px]">
              Name
            </label>
            <input
              className="ml-5 bg-transparent border-b-2 text-neutral-color-2 w-[100%]"
              type="text"
              name="user_name"
            />
          </div>
          <div className="flex flex-row w-[80%] pb-6">
            <label className="text-xl text-neutral-color-2 w-[70px]">
              Email
            </label>
            <input
              className="ml-5 bg-transparent border-b-2 text-neutral-color-2 w-[100%]"
              type="email"
              name="user_email"
            />
          </div>
          <div className="flex flex-row w-[80%] pb-6">
            <label className="text-xl text-neutral-color-2 w-[70px]">
              Message
            </label>
            <input
              className="ml-5 bg-transparent border-b-2 text-neutral-color-2 w-[100%]"
              type="text"
              name="message"
            />
          </div>

          <button
            type="submit"
            value="Send"
            disabled={isSubmitting}
            className="bg-accent-color-1 w-1/2 rounded-lg"
          >
            Submit
          </button>
          {stateMessage && <p>{stateMessage}</p>}
        </form>
      </div>
      <div className={"flex flex-col items-start bg-neutral-color-1 w-[50%]"}>
        <p className="text-xl text-neutral-color-2 pl-4 pt-4 font-bold">Menu</p>
        <p className="text-xl text-neutral-color-2 pl-4 pt-6">Company</p>
        <p className="text-xl text-neutral-color-2 pl-4 pt-6">Support</p>
        <p className="text-xl text-neutral-color-2 pl-4 pt-6">
          Accessibility statement
        </p>
        <p className="text-xl text-neutral-color-2 pl-4 pt-6">Privacy Policy</p>
      </div>
    </div>
  );
};
export default ContactForm;
