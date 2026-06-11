import type { CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { BlueprintGrid } from "../../../../components/Blueprint/BlueprintGrid";
import { DimensionLine } from "../../../../components/Blueprint/DimensionLine";
import { SpecLabel } from "../../../../components/Blueprint/SpecLabel";

interface ClientsPartnersProps {
  /** Opt-in marquee mode for large rosters (~12+ logos). Off by default. */
  marquee?: boolean;
}

type RosterEntry = {
  name: string;
  descriptor: string;
  /** Monochrome, transparent logo asset. Falls back to the wordmark if absent. */
  logo?: string;
  /** Native aspect ratio (w / h), so the mask keeps a uniform cap-height. */
  ar?: number;
  /** Per-logo cap-height in px, for marks that read heavy at the shared height. */
  capPx?: number;
};

const LOGO = "/logos/logos-mono";
const CAP = 26; // shared logo cap-height (px)

const clients: RosterEntry[] = [
  { name: "Apollo Mapping", descriptor: "geospatial", logo: `${LOGO}/apollo-mapping-mono.png`, ar: 80 / 79 },
  { name: "Airbus", descriptor: "aerospace", logo: `${LOGO}/airbus-mono.png`, ar: 213 / 171 },
  { name: "Ascent Pharmaceuticals", descriptor: "pharma", logo: `${LOGO}/ascent-pharmaceuticals-mono.png`, ar: 767 / 822, capPx: 22 },
  { name: "Kontinued", descriptor: "education", logo: `${LOGO}/kontinued-mono.png`, ar: 178 / 178 },
  { name: "Mosaic", descriptor: "agency", logo: `${LOGO}/mosaic-mono.png`, ar: 136 / 173, capPx: 24 },
];

const partners: RosterEntry[] = [
  { name: "AWS", descriptor: "cloud partner", logo: `${LOGO}/aws-mono.png`, ar: 633 / 379 },
  { name: "Westtown Chamber of Commerce", descriptor: "chamber", logo: `${LOGO}/westtown-mono.png`, ar: 196 / 196, capPx: 24 },
  { name: "Chicagoland Chamber of Commerce", descriptor: "chamber", logo: `${LOGO}/chicagoland-mono.png`, ar: 322 / 129 },
  { name: "M25", descriptor: "venture", logo: `${LOGO}/m25-mono.png`, ar: 211 / 153 },
  { name: "IU Ventures", descriptor: "member", logo: `${LOGO}/iu-ventures-mono.png`, ar: 134 / 167 },
];

const byName = (name: string): RosterEntry | undefined =>
  [...clients, ...partners].find((e) => e.name === name);

type Reference = {
  quote: string;
  name: string;
  title: string;
  client: string;
};

const references: Reference[] = [
  {
    quote:
      "We spent over a decade looking for coders we could trust. A year in with Smith Avenue, our web app has never been more stable. In an age of AI-generated code, they actually listen and build for our context, our users, and our world, not whatever a model would guess. You will not find anyone more dedicated.",
    name: "Brock McCarty",
    title: "CEO and Founder",
    client: "Apollo Mapping",
  },
  {
    quote:
      "We needed an interactive educational tool on a tight timeline that other developers could not deliver. Smith Avenue shipped a clean, fully functional solution, and fast.",
    name: "Mark Need",
    title: "Founder",
    client: "Kontinued",
  },
  {
    quote:
      "Working with Smith Avenue felt more like a partnership than a vendor engagement. Their process was refreshingly low-key and collaborative, and their boutique size kept them attentive and responsive. We are more than pleased with the new site.",
    name: "Cori Rizman",
    title: "VP Compliance",
    client: "Ascent Pharmaceuticals",
  },
];

const logoStyle = (entry: RosterEntry, cap = CAP): CSSProperties =>
  ({
    "--logo-src": `url("${entry.logo}")`,
    height: `${entry.capPx ?? cap}px`,
    aspectRatio: String(entry.ar ?? 1),
  }) as CSSProperties;

/* ------------------------------------------------------------------ */
/* Motion variants                                                     */
/* ------------------------------------------------------------------ */

const SPEC = [0.2, 0, 0, 1] as const;

const cellGroup: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};
const cellItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: SPEC } },
};

const cardsGroup: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const cardItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: SPEC, when: "beforeChildren", staggerChildren: 0.1 },
  },
};
const barItem: Variants = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 0.4, ease: SPEC } },
};
const checkItem: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
};

/* ------------------------------------------------------------------ */
/* Cells                                                               */
/* ------------------------------------------------------------------ */

const LogoCell = ({ entry }: { entry: RosterEntry }) => (
  <motion.div
    variants={cellItem}
    tabIndex={0}
    aria-label={`${entry.name} logo`}
    className="logo-cell flex h-20 flex-col items-center justify-center gap-2 border border-chalk/15 bg-drafting-surface px-3 text-center"
  >
    {entry.logo ? (
      <span className="logo-mask block w-auto" style={logoStyle(entry)} aria-hidden />
    ) : (
      <span className="font-display font-bold leading-none text-chalk/85 text-lg">{entry.name}</span>
    )}
    <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-chalk/45">
      {entry.descriptor}
    </span>
  </motion.div>
);

const RosterGroup = ({
  label,
  entries,
  animate,
}: {
  label: string;
  entries: RosterEntry[];
  animate: boolean;
}) => (
  <div>
    <p className="mb-3 font-mono text-label-mono lowercase tracking-[0.16em] text-chalk/50">{label}</p>
    <motion.div
      className="grid grid-cols-2 gap-3 lg:grid-cols-3"
      variants={animate ? cellGroup : undefined}
      initial={animate ? "hidden" : false}
      whileInView={animate ? "show" : undefined}
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {entries.map((e) => (
        <LogoCell key={e.name} entry={e} />
      ))}
    </motion.div>
  </div>
);

/* Marquee row: a duplicated track that scrolls seamlessly. */
const MarqueeRow = ({
  label,
  entries,
  direction,
}: {
  label: string;
  entries: RosterEntry[];
  direction: "left" | "right";
}) => (
  <div>
    <p className="mb-3 font-mono text-label-mono lowercase tracking-[0.16em] text-chalk/50">{label}</p>
    <div className="roster-marquee overflow-hidden">
      <div className={`roster-track ${direction === "left" ? "roster-track-left" : "roster-track-right"}`}>
        {[...entries, ...entries].map((e, i) => (
          <div
            key={`${e.name}-${i}`}
            className="logo-cell mx-1.5 flex h-20 w-40 shrink-0 flex-col items-center justify-center gap-2 border border-chalk/15 bg-drafting-surface px-3 text-center"
          >
            <span className="logo-mask block w-auto" style={logoStyle(e)} aria-label={`${e.name} logo`} role="img" />
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-chalk/45">
              {e.descriptor}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* Hairline L registration tick at an inner corner of the panel. */
const CornerTick = ({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) => {
  const map: Record<string, string> = {
    tl: "top-2 left-2 border-l border-t",
    tr: "top-2 right-2 border-r border-t",
    bl: "bottom-2 left-2 border-l border-b",
    br: "bottom-2 right-2 border-r border-b",
  };
  return <span aria-hidden className={`pointer-events-none absolute h-2.5 w-2.5 border-chalk/25 ${map[pos]}`} />;
};

/* ------------------------------------------------------------------ */
/* Reference card                                                      */
/* ------------------------------------------------------------------ */

const ReferenceCard = ({ reference, animate }: { reference: Reference; animate: boolean }) => {
  const client = byName(reference.client);
  return (
    <motion.figure
      variants={animate ? cardItem : undefined}
      className="relative flex h-full min-h-[19rem] flex-col overflow-hidden border border-chalk/15 bg-drafting-surface p-6 pl-7"
    >
      {/* green left border, grows top to bottom */}
      <motion.span
        aria-hidden
        variants={animate ? barItem : undefined}
        className="absolute left-0 top-0 h-full w-[2px] origin-top bg-marker-start"
      />

      <figcaption className="mb-4 flex items-center gap-2 font-mono text-label-mono lowercase tracking-[0.16em] text-chalk/50">
        <motion.svg
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5 shrink-0 text-verified"
          fill="none"
          aria-hidden
          variants={animate ? checkItem : undefined}
        >
          <path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
        reference
        {client?.logo && (
          <span
            className="logo-mask-static ml-auto block w-auto opacity-80"
            style={logoStyle(client, 16)}
            role="img"
            aria-label={`${client.name} logo`}
          />
        )}
      </figcaption>

      <blockquote className="flex-1 font-serif text-base leading-relaxed text-chalk/80">
        {reference.quote}
      </blockquote>

      <div className="mt-5 border-t border-chalk/10 pt-4 font-mono text-label-mono lowercase tracking-[0.12em] text-chalk/55">
        <span className="block text-chalk/80">{reference.name}</span>
        <span className="block [text-wrap:balance]">
          {reference.title}, {reference.client}
        </span>
      </div>
    </motion.figure>
  );
};

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export const ClientsPartners = ({ marquee = false }: ClientsPartnersProps) => {
  const reduce = useReducedMotion() ?? false;
  const animate = !reduce;
  const useMarquee = marquee && !reduce;

  return (
    <section className="relative overflow-hidden border-y border-chalk/10 bg-blueprint-base px-4 py-3cell sm:px-8">
      <BlueprintGrid opacity={0.55} />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* Title block header */}
        <SpecLabel className="mb-cell">clients &amp; partners</SpecLabel>
        <h2 className="font-display text-display-2 font-extrabold leading-[0.95] text-chalk">
          On the job with.
        </h2>
        <DimensionLine reveal label="references on file" className="my-cell max-w-md" />

        {/* Roster board, framed like a drawing title block */}
        <div className="relative mt-2cell border border-chalk/20 bg-drafting-surface">
          <div className="flex items-center justify-between border-b border-chalk/20 bg-blueprint-base px-cell py-3">
            <span className="font-mono text-label-mono lowercase tracking-[0.16em] text-chalk/60">project roster</span>
            <span className="font-mono text-label-mono lowercase tracking-[0.16em] text-verified">status: built</span>
          </div>

          <CornerTick pos="tl" />
          <CornerTick pos="tr" />
          <CornerTick pos="bl" />
          <CornerTick pos="br" />

          {useMarquee ? (
            <div className="flex flex-col gap-cell p-cell">
              <MarqueeRow label="clients" entries={clients} direction="left" />
              <MarqueeRow label="partners" entries={partners} direction="right" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-cell p-cell pb-10 md:grid-cols-2">
              <RosterGroup label="clients" entries={clients} animate={animate} />
              <RosterGroup label="partners" entries={partners} animate={animate} />
            </div>
          )}

          <p className="px-cell pb-4 font-mono text-[0.625rem] lowercase tracking-[0.16em] text-chalk/35">
            fig. 01&ensp;&ensp;selected engagements, 2024 to present
          </p>
        </div>

        {/* Reference cards */}
        <motion.div
          className="mt-2cell grid grid-cols-1 items-stretch gap-cell lg:grid-cols-3"
          variants={animate ? cardsGroup : undefined}
          initial={animate ? "hidden" : false}
          whileInView={animate ? "show" : undefined}
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          {references.map((r) => (
            <ReferenceCard key={r.client} reference={r} animate={animate} />
          ))}
        </motion.div>

        {/* Closing action */}
        <p className="mt-2cell font-mono text-label-mono lowercase tracking-[0.16em] text-chalk/50">
          <Link
            to="/portfolio"
            className="text-marker-start underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
          >
            read the case studies →
          </Link>
        </p>
      </div>
    </section>
  );
};
