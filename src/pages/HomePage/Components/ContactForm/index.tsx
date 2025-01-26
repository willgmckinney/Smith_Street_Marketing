import emailjs from "@emailjs/browser";
import { useState } from "react";
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
    <div className="flex flex-row border-t-8 border-secondary-color-1 h-[40vh]">
      <div className={"flex flex-col items-center bg-neutral-color-2 w-[100%]"}>
        <h1>CONTACT US</h1>
        <form
          onSubmit={sendEmail}
          className={"flex flex-col bg-secondary-color-1 w-[80%] p-1 m-5"}
        >
          <label>Name</label>
          <input type="text" name="user_name" />
          <label>Email</label>
          <input type="email" name="user_email" />
          <label>Message</label>
          <textarea name="message" />
          <input type="submit" value="Send" disabled={isSubmitting} />
          {stateMessage && <p>{stateMessage}</p>}
        </form>
      </div>
    </div>
  );
};
export default ContactForm;
