import emailjs from "@emailjs/browser";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "../../assets/logo.png";
import { SummitButton } from "../Summit/SummitButton";

const Footer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateMessage, setStateMessage] = useState<string | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
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
        },
        () => {
          setStateMessage("Something went wrong, please try again later");
          setIsSubmitting(false);
          setTimeout(() => {
            setStateMessage(null);
          }, 5000);
        }
      );

    form.reset();
  };

  return (
    <footer className="bg-atmospheric-haze border-t border-white/10 text-granite">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        {/* Contact Form Section */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 border-b lg:border-b-0 lg:border-r border-white/10">
          <div className="flex items-center gap-4 mb-8">
            <img
              src={logo}
              className="h-12 w-auto"
              alt="Smith Avenue Insights Logo"
            />
            <span className="font-display font-bold text-2xl text-white">
              Smith Avenue Insights
            </span>
          </div>

          <h3 className="font-display font-bold text-xl text-golden-hour-start mb-6">
            Contact Us
          </h3>

          <form onSubmit={sendEmail} className="space-y-6 max-w-md">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-granite/80">
                Name
              </label>
              <input
                className="w-full bg-deep-horizon/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-golden-hour-start focus:ring-1 focus:ring-golden-hour-start transition-all"
                type="text"
                name="from_name"
                required
                placeholder="Your Name"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-granite/80">
                Email
              </label>
              <input
                className="w-full bg-deep-horizon/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-golden-hour-start focus:ring-1 focus:ring-golden-hour-start transition-all"
                type="email"
                name="reply_to"
                required
                placeholder="you@company.com"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-granite/80">
                Message
              </label>
              <textarea
                className="w-full bg-deep-horizon/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-golden-hour-start focus:ring-1 focus:ring-golden-hour-start transition-all"
                name="message"
                required
                rows={4}
                placeholder="How can we help you ascend?"
              />
            </div>

            <div className="pt-2">
              <SummitButton
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </SummitButton>
            </div>

            {stateMessage && (
              <p
                className={`text-sm mt-4 ${stateMessage.includes("wrong") ? "text-red-400" : "text-alpine-flora"}`}
              >
                {stateMessage}
              </p>
            )}
          </form>
        </div>

        {/* Navigation Section */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 bg-deep-horizon/30">
          <h3 className="font-display font-bold text-xl text-white mb-8">
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
                className="text-lg text-granite/70 hover:text-golden-hour-start hover:translate-x-2 transition-all duration-300 w-fit"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-16 pt-8 border-t border-white/10 text-sm text-granite/40">
            &copy; {new Date().getFullYear()} Smith Avenue Insights. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
