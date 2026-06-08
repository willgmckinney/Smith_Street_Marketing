import emailjs from "@emailjs/browser";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { BlueprintButton } from "../Blueprint/BlueprintButton";
import { Monogram } from "../Blueprint/Monogram";

const Footer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateMessage, setStateMessage] = useState<string | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const userEmail = formData.get("reply_to") as string;
    const originalMessage = formData.get("message") as string;
    
    // Append the user's email to the message body
    const messageWithEmail = `${originalMessage}\n\n---\nFrom: ${userEmail}`;
    
    // Create a temporary input to hold the modified message
    const messageInput = form.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
    const originalValue = messageInput.value;
    messageInput.value = messageWithEmail;

    emailjs
      .sendForm(
        "service_5s10wrs",
        "template_bsqap0e",
        form,
        "bFJ6aPnvS7f_CrnbE"
      )
      .then(
        () => {
          setStateMessage("Message sent!");
          setIsSubmitting(false);
          setTimeout(() => {
            setStateMessage(null);
          }, 5000);
          // Restore original message value before resetting
          messageInput.value = originalValue;
          form.reset();
        },
        () => {
          setStateMessage("Something went wrong, please try again later");
          setIsSubmitting(false);
          setTimeout(() => {
            setStateMessage(null);
          }, 5000);
          // Restore original message value on error
          messageInput.value = originalValue;
        }
      );
  };

  return (
    <footer className="bg-drafting-surface border-t border-chalk/10 text-chalk">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        {/* Contact Form Section */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-chalk/10">
          <div className="flex items-center gap-4 mb-8">
            <Monogram size={44} className="text-chalk" />
            <span className="font-display font-bold text-2xl text-chalk">
              Smith Avenue Insights
            </span>
          </div>

          <h3 className="font-display font-bold text-xl text-marker-start mb-6">
            Contact Us
          </h3>

          <form onSubmit={sendEmail} className="space-y-6 max-w-md">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-chalk/80">
                Name
              </label>
              <input
                className="w-full bg-drafting-surface border border-chalk/15 rounded-lg px-4 py-3 text-chalk focus:outline-none focus:border-marker-start focus:ring-1 focus:ring-marker-start transition-all"
                type="text"
                name="from_name"
                required
                placeholder="Your Name"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-chalk/80">
                Email
              </label>
              <input
                className="w-full bg-drafting-surface border border-chalk/15 rounded-lg px-4 py-3 text-chalk focus:outline-none focus:border-marker-start focus:ring-1 focus:ring-marker-start transition-all"
                type="email"
                name="reply_to"
                required
                placeholder="you@company.com"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-chalk/80">
                Message
              </label>
              <textarea
                className="w-full bg-drafting-surface border border-chalk/15 rounded-lg px-4 py-3 text-chalk focus:outline-none focus:border-marker-start focus:ring-1 focus:ring-marker-start transition-all"
                name="message"
                required
                rows={4}
                placeholder="What do you need built?"
              />
            </div>

            <div className="pt-2">
              <BlueprintButton
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </BlueprintButton>
            </div>

            {stateMessage && (
              <p
                className={`text-sm mt-4 ${stateMessage.includes("wrong") ? "text-red-400" : "text-verified"}`}
              >
                {stateMessage}
              </p>
            )}
          </form>
        </div>

        {/* Navigation Section */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 bg-blueprint-base/50">
          <h3 className="font-display font-bold text-xl text-chalk mb-8">
            Menu
          </h3>
          <nav className="flex flex-col space-y-4">
            {[
              { to: "/company", label: "Company" },
              { to: "/support", label: "Support" },
              { to: "/accessibility", label: "Accessibility Statement" },
              { to: "/privacy", label: "Privacy Policy" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-lg text-chalk/70 hover:text-marker-start hover:translate-x-2 transition-all duration-300 w-fit"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-16 pt-8 border-t border-chalk/10 text-sm text-chalk/40">
            &copy; {new Date().getFullYear()} Smith Avenue Insights. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
