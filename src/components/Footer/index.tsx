import emailjs from "@emailjs/browser";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { BlueprintButton } from "../Blueprint/BlueprintButton";
import { GoatMark } from "../Blueprint/GoatMark";

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
          <div className="mb-8">
            <div className="flex items-center gap-4">
              <GoatMark size={44} alt="" />
              <span className="font-display font-bold text-2xl text-chalk">
                Smith Avenue Insights
              </span>
            </div>
            <p className="mt-4 font-mono text-label-mono lowercase tracking-[0.08em] text-chalk/45">
              332 s michigan ave, suite 900, chicago, il 60604
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/smith-avenue-insights"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Smith Avenue Insights on LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-spec border border-chalk/15 text-chalk/60 transition-colors hover:border-marker-start hover:text-marker-start"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.25 8.25h4.5V24h-4.5V8.25zM8.25 8.25h4.31v2.15h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V24h-4.5v-6.99c0-1.67-.03-3.81-2.32-3.81-2.33 0-2.68 1.82-2.68 3.69V24h-4.5V8.25z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/channel/UCRwpnmz8YzfWGcm_WjPs_4A"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Smith Avenue Insights on YouTube"
                className="inline-flex h-9 w-9 items-center justify-center rounded-spec border border-chalk/15 text-chalk/60 transition-colors hover:border-marker-start hover:text-marker-start"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                </svg>
              </a>
            </div>
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
          <div className="grid grid-cols-2 gap-8">
            <nav>
              <h3 className="mb-6 font-mono text-label-mono lowercase tracking-[0.16em] text-chalk/45">
                navigate
              </h3>
              <ul className="flex flex-col space-y-4">
                {[
                  { to: "/portfolio", label: "the work" },
                  { to: "/how-we-work", label: "process" },
                  { to: "/blog", label: "writing" },
                  { to: "/demo", label: "start a project" },
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="w-fit font-mono lowercase tracking-[0.04em] text-chalk/70 transition-all duration-300 hover:translate-x-1 hover:text-marker-start"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav>
              <h3 className="mb-6 font-mono text-label-mono lowercase tracking-[0.16em] text-chalk/45">
                more
              </h3>
              <ul className="flex flex-col space-y-4">
                {[
                  { to: "/company", label: "about" },
                  { to: "/support", label: "support" },
                  { to: "/accessibility", label: "accessibility" },
                  { to: "/privacy", label: "privacy policy" },
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="w-fit font-mono lowercase tracking-[0.04em] text-chalk/70 transition-all duration-300 hover:translate-x-1 hover:text-marker-start"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* AWS partner badge (official mark from Partner Central, not recolored) */}
          <div className="mt-12">
            <img
              src="/logos/aws-partner-badge.png"
              alt="Amazon Web Services Partner network badge"
              className="h-14 w-auto"
            />
          </div>

          <div className="mt-12 border-t border-chalk/10 pt-8 text-sm text-chalk/40">
            &copy; 2026 Smith Avenue Insights. Chicago, IL.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
