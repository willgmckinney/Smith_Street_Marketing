import { createRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Seo } from "../components/Seo";
import { rootRoute } from "./__root";

// Real share-embed URLs. Move to env vars later if you want to swap without a deploy.
const DASHBOARD_SRC =
  "https://us-east-1.quicksight.aws.amazon.com/sn/account/smithaveinsights/embed/share/accounts/054867037362/dashboards/94f59731-6dc9-4e54-b78d-f709c79ac841";
const CHAT_SRC =
  "https://us-east-1.quicksight.aws.amazon.com/sn/account/smithaveinsights/embed/share/accounts/054867037362/chatagents/83c24d46-d28f-482f-8443-8b58c3fad807";
const CHAT_ALLOW =
  "clipboard-read https://us-east-1.quicksight.aws.amazon.com; clipboard-write https://us-east-1.quicksight.aws.amazon.com";

// Set to e.g. '560px' to cap the chat column. '100%' = full width.
const CHAT_MAX_WIDTH = "100%";

export const quickEmbedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quick-embed",
  component: QuickEmbedPage,
});

function QuickEmbedPage() {
  const reduce = useReducedMotion();

  useEffect(() => {
    let el = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const created = !el;
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("name", "robots");
      document.head.appendChild(el);
    }
    const previous = el.getAttribute("content");
    el.setAttribute("content", "noindex, follow");

    return () => {
      if (created) {
        el?.remove();
      } else if (previous) {
        el?.setAttribute("content", previous);
      } else {
        el?.removeAttribute("content");
      }
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-blueprint-base pt-24 text-chalk">
      <Seo
        title="Embedded analytics"
        description="Live embedded analytics built by Smith Avenue Insights."
        path="/quick-embed"
      />

      {/* blueprint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(30,41,59,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,0.05) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
        {/* page header, left aligned */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-10 max-w-2xl"
        >
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-chalk/50">
            live demo · embedded analytics
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">
            Built in Amazon Quick. Running live.
          </h1>
          <p className="mt-3 text-chalk/50">
            A working dashboard and chat agent, embedded direct. The same setup
            we stand up for clients.
          </p>
        </motion.div>

        <div className="flex flex-col gap-12">
          <EmbedFrame
            kicker="fig. 01 · dashboard"
            blockLabel="dashboard · amazon quick"
            src={DASHBOARD_SRC}
            title="Amazon Quick embedded dashboard"
            heightClass="h-[560px] md:h-[760px]"
          />

          <div style={{ maxWidth: CHAT_MAX_WIDTH }} className="w-full">
            <EmbedFrame
              kicker="fig. 02 · chat agent"
              blockLabel="chat agent · amazon quick"
              src={CHAT_SRC}
              title="Amazon Quick embedded chat agent"
              allow={CHAT_ALLOW}
              heightClass="h-[640px] md:h-[800px]"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function EmbedFrame({
  kicker,
  blockLabel,
  src,
  title,
  allow,
  heightClass,
}: {
  kicker: string;
  blockLabel: string;
  src: string;
  title: string;
  allow?: string;
  heightClass: string;
}) {
  const reduce = useReducedMotion();
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.section
      initial={reduce ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="relative border border-chalk/[0.18] bg-blueprint-base">
        {/* corner registration ticks */}
        <Tick className="left-[-1px] top-[-1px] border-l border-t" />
        <Tick className="right-[-1px] top-[-1px] border-r border-t" />
        <Tick className="bottom-[-1px] left-[-1px] border-b border-l" />
        <Tick className="bottom-[-1px] right-[-1px] border-b border-r" />

        {/* drafting title block */}
        <div className="flex items-center justify-between border-b border-chalk/[0.18] px-4 py-2">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-chalk/50">
            {blockLabel}
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-marker-start">
            status: live
          </span>
        </div>

        <div className={`relative w-full ${heightClass}`}>
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-chalk/50">
                loading embed
              </span>
            </div>
          )}
          <iframe
            title={title}
            src={src}
            allow={allow}
            onLoad={() => setLoaded(true)}
            className="h-full w-full border-0"
            style={{
              opacity: loaded ? 1 : 0,
              transition: reduce ? undefined : "opacity .25s ease",
            }}
          />
        </div>
      </div>

      <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-chalk/50">
        {kicker}
      </p>
    </motion.section>
  );
}

function Tick({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`absolute z-10 h-3 w-3 border-chalk/55 ${className}`}
    />
  );
}
