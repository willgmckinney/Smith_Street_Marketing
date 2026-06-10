import type { ReactNode } from "react";

interface DiagramProps {
  className?: string;
}

const node = "fill-drafting-surface stroke-chalk/70 [stroke-width:1.5]";
const accent = "fill-drafting-surface stroke-marker-start [stroke-width:1.5]";
const link = "stroke-chalk/40 [stroke-width:1.5]";
const dash = "stroke-chalk/35 [stroke-width:1.5] [stroke-dasharray:5_4]";
const lab = "font-mono fill-chalk [font-size:13px]";
const sub = "font-mono fill-chalk/55 [font-size:11px]";
const labA = "font-mono fill-marker-start [font-size:13px]";

const Svg = ({
  children,
  className,
  label,
}: {
  children: ReactNode;
  className: string;
  label: string;
}) => (
  <svg viewBox="0 0 640 230" fill="none" className={className} role="img" aria-label={label}>
    {children}
  </svg>
);

/* 01 — cost-efficient aws architecture */
const CostArchDiagram = ({ className = "" }: DiagramProps) => (
  <Svg
    className={className}
    label="Cost-efficient AWS architecture: traffic through a load balancer into an auto scaling group of right-sized instances, served by a multi-AZ database, with lifecycle-tiered storage."
  >
    <line x1="104" y1="92" x2="140" y2="92" className={link} />
    <line x1="230" y1="92" x2="266" y2="92" className={link} />
    <line x1="416" y1="92" x2="452" y2="92" className={link} />

    <rect x="14" y="66" width="90" height="52" rx="3" className={node} />
    <rect x="140" y="66" width="90" height="52" rx="3" className={node} />
    <rect x="266" y="46" width="150" height="108" rx="3" className={accent} />
    <rect x="286" y="74" width="30" height="30" rx="2" className={node} />
    <rect x="326" y="74" width="30" height="30" rx="2" className={node} />
    <rect x="366" y="74" width="30" height="30" rx="2" className={node} />
    <rect x="452" y="66" width="90" height="52" rx="3" className={node} />

    <g className={lab}>
      <text x="59" y="96" textAnchor="middle">traffic</text>
      <text x="185" y="96" textAnchor="middle">alb</text>
      <text x="497" y="90" textAnchor="middle">rds</text>
      <text x="497" y="106" textAnchor="middle" className={sub}>multi-az</text>
    </g>
    <text x="341" y="128" textAnchor="middle" className={labA}>auto scaling</text>
    <text x="341" y="144" textAnchor="middle" className={sub}>right-sized</text>
    <text x="320" y="196" textAnchor="middle" className={sub}>
      savings plans + lifecycle tiering keep spend tied to value
    </text>
  </Svg>
);

/* 02 — event-driven fan-out */
const EventDrivenDiagram = ({ className = "" }: DiagramProps) => (
  <Svg
    className={className}
    label="Event-driven architecture: a producer publishes to an event bus that fans out to queues and consumers, with a dead-letter queue."
  >
    <line x1="124" y1="115" x2="170" y2="115" className={link} />
    <line x1="290" y1="115" x2="330" y2="70" className={link} />
    <line x1="290" y1="115" x2="330" y2="115" className={link} />
    <line x1="290" y1="115" x2="330" y2="160" className={link} />
    <line x1="442" y1="70" x2="478" y2="70" className={link} />
    <line x1="442" y1="115" x2="478" y2="115" className={link} />
    <line x1="442" y1="160" x2="478" y2="160" className={dash} />

    <rect x="14" y="89" width="110" height="52" rx="3" className={node} />
    <rect x="170" y="83" width="120" height="64" rx="3" className={accent} />
    <rect x="330" y="50" width="112" height="40" rx="3" className={node} />
    <rect x="330" y="95" width="112" height="40" rx="3" className={node} />
    <rect x="330" y="140" width="112" height="40" rx="3" className={node} />
    <rect x="478" y="50" width="100" height="40" rx="3" className={node} />
    <rect x="478" y="95" width="100" height="40" rx="3" className={node} />
    <rect x="478" y="140" width="100" height="40" rx="3" className={node} />

    <g className={lab}>
      <text x="69" y="119" textAnchor="middle">producer</text>
      <text x="386" y="74" textAnchor="middle">sqs</text>
      <text x="386" y="119" textAnchor="middle">sqs</text>
      <text x="386" y="164" textAnchor="middle" className={sub}>dlq</text>
      <text x="528" y="74" textAnchor="middle">lambda</text>
      <text x="528" y="119" textAnchor="middle">lambda</text>
      <text x="528" y="164" textAnchor="middle" className={sub}>retry</text>
    </g>
    <text x="230" y="111" textAnchor="middle" className={labA}>event</text>
    <text x="230" y="127" textAnchor="middle" className={sub}>bus</text>
  </Svg>
);

/* 03 — multi-account guardrails */
const MultiAccountDiagram = ({ className = "" }: DiagramProps) => (
  <Svg
    className={className}
    label="Multi-account AWS: an organization root applies service control policy guardrails across organizational units of member accounts, with a central logging account."
  >
    <line x1="320" y1="74" x2="320" y2="104" className={link} />
    <line x1="150" y1="104" x2="490" y2="104" className={link} />
    <line x1="150" y1="104" x2="150" y2="128" className={link} />
    <line x1="320" y1="104" x2="320" y2="128" className={link} />
    <line x1="490" y1="104" x2="490" y2="128" className={dash} />

    <rect x="240" y="34" width="160" height="40" rx="3" className={accent} />
    <rect x="86" y="128" width="128" height="44" rx="3" className={node} />
    <rect x="256" y="128" width="128" height="44" rx="3" className={node} />
    <rect x="426" y="128" width="128" height="44" rx="3" className={node} />

    <rect x="96" y="184" width="50" height="30" rx="2" className={node} />
    <rect x="154" y="184" width="50" height="30" rx="2" className={node} />
    <rect x="266" y="184" width="50" height="30" rx="2" className={node} />
    <rect x="324" y="184" width="50" height="30" rx="2" className={node} />
    <line x1="121" y1="172" x2="121" y2="184" className={link} />
    <line x1="179" y1="172" x2="179" y2="184" className={link} />
    <line x1="291" y1="172" x2="291" y2="184" className={link} />
    <line x1="349" y1="172" x2="349" y2="184" className={link} />

    <g className={lab}>
      <text x="320" y="59" textAnchor="middle" className={labA}>org root + scp</text>
      <text x="150" y="155" textAnchor="middle">security ou</text>
      <text x="320" y="155" textAnchor="middle">workload ou</text>
      <text x="490" y="149" textAnchor="middle" className={sub}>log</text>
      <text x="490" y="164" textAnchor="middle" className={sub}>archive</text>
    </g>
    <text x="320" y="226" textAnchor="middle" className={sub}>
      guardrails inherit down, member accounts stay autonomous
    </text>
  </Svg>
);

/* 04 — aws / azure / gcp */
const PlatformCompareDiagram = ({ className = "" }: DiagramProps) => {
  const col = (x: number, name: string, rows: string[], isAccent: boolean) => (
    <g key={name}>
      <rect x={x} y="34" width="170" height="36" rx="3" className={isAccent ? accent : node} />
      <text x={x + 85} y="57" textAnchor="middle" className={isAccent ? labA : lab}>
        {name}
      </text>
      {rows.map((r, i) => (
        <g key={r}>
          <rect x={x} y={82 + i * 42} width="170" height="34" rx="3" className={node} />
          <text x={x + 85} y={103 + i * 42} textAnchor="middle" className={sub}>
            {r}
          </text>
        </g>
      ))}
    </g>
  );
  return (
    <Svg
      className={className}
      label="Cloud platform comparison: AWS, Azure, and GCP mapped across compute, database, and edge services."
    >
      {col(30, "aws", ["ecs / ec2", "rds", "cloudfront"], true)}
      {col(235, "azure", ["aks / vm", "azure sql", "front door"], false)}
      {col(440, "gcp", ["gke / gce", "cloud sql", "cloud cdn"], false)}
      <g className={sub}>
        <text x="30" y="226">compute</text>
        <text x="320" y="226" textAnchor="middle">database</text>
        <text x="610" y="226" textAnchor="end">edge / cdn</text>
      </g>
    </Svg>
  );
};

/* 05 — decision under uncertainty */
const DecisionDiagram = ({ className = "" }: DiagramProps) => (
  <Svg
    className={className}
    label="A decision under uncertainty: one decision branches into weighted options, scored by expected value; the highest-value path is chosen."
  >
    <line x1="150" y1="106" x2="300" y2="56" className={link} />
    <line x1="150" y1="106" x2="300" y2="116" className={link} />
    <line x1="150" y1="106" x2="300" y2="176" className={link} />

    <rect x="20" y="80" width="130" height="52" rx="3" className={node} />
    <rect x="300" y="34" width="220" height="44" rx="3" className={accent} />
    <rect x="300" y="94" width="220" height="44" rx="3" className={node} />
    <rect x="300" y="154" width="220" height="44" rx="3" className={node} />

    <g className={lab}>
      <text x="85" y="104" textAnchor="middle">decision</text>
      <text x="320" y="61">option a</text>
      <text x="320" y="121">option b</text>
      <text x="320" y="181">option c</text>
    </g>
    <g className={sub}>
      <text x="510" y="61" textAnchor="end" className="fill-marker-start">p .5 · best ev</text>
      <text x="510" y="121" textAnchor="end">p .3</text>
      <text x="510" y="181" textAnchor="end">p .2</text>
    </g>
    <text x="270" y="224" textAnchor="middle" className={sub}>
      weigh expected value, commit, then revisit as evidence arrives
    </text>
  </Svg>
);

/* 06 — shopify to aws migration */
const MigrationDiagram = ({ className = "" }: DiagramProps) => (
  <Svg
    className={className}
    label="Migrating ecommerce off Shopify to an owned AWS stack: traffic moves through a strangler layer into CloudFront, ECS, RDS, and S3."
  >
    <line x1="134" y1="115" x2="186" y2="115" className={dash} />
    <line x1="276" y1="115" x2="312" y2="115" className={link} />

    <rect x="14" y="89" width="120" height="52" rx="3" className={node} />
    <rect x="186" y="89" width="90" height="52" rx="3" className={node} />
    <rect x="312" y="44" width="314" height="142" rx="3" className={accent} />

    <rect x="330" y="64" width="130" height="44" rx="3" className={node} />
    <rect x="478" y="64" width="130" height="44" rx="3" className={node} />
    <rect x="330" y="122" width="130" height="44" rx="3" className={node} />
    <rect x="478" y="122" width="130" height="44" rx="3" className={node} />

    <g className={lab}>
      <text x="74" y="119" textAnchor="middle">shopify</text>
      <text x="231" y="113" textAnchor="middle" className={sub}>strangler</text>
      <text x="231" y="129" textAnchor="middle" className={sub}>layer</text>
      <text x="395" y="91" textAnchor="middle" className={sub}>cloudfront</text>
      <text x="543" y="91" textAnchor="middle" className={sub}>ecs</text>
      <text x="395" y="149" textAnchor="middle" className={sub}>rds</text>
      <text x="543" y="149" textAnchor="middle" className={sub}>s3</text>
    </g>
    <text x="469" y="36" textAnchor="middle" className={labA}>owned aws stack</text>
  </Svg>
);

/* ------------------------------------------------------------------ */

type BlogFigure = { Figure: (p: DiagramProps) => ReactNode; caption: string };

const FALLBACK: BlogFigure = { Figure: CostArchDiagram, caption: "system sketch" };

export const blogFigures: Record<string, BlogFigure> = {
  "building-cost-efficient-aws-architectures": {
    Figure: CostArchDiagram,
    caption: "cost-efficient aws architecture",
  },
  "event-driven-architecture-aws": {
    Figure: EventDrivenDiagram,
    caption: "event-driven fan-out",
  },
  "securing-aws-multi-account-environments": {
    Figure: MultiAccountDiagram,
    caption: "multi-account guardrails",
  },
  "cloud-platforms-pharma-smb-aws-azure-gcp": {
    Figure: PlatformCompareDiagram,
    caption: "aws / azure / gcp",
  },
  "making-decisions-under-uncertainty": {
    Figure: DecisionDiagram,
    caption: "decision under uncertainty",
  },
  "ecommerce-sovereignty-shopify-to-aws-migration": {
    Figure: MigrationDiagram,
    caption: "shopify to aws migration",
  },
};

export const getBlogFigure = (id: string): BlogFigure => blogFigures[id] ?? FALLBACK;
