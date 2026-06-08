interface DiagramProps {
  className?: string;
}

const nodeCls = "fill-drafting-surface stroke-chalk/70 [stroke-width:1.5]";
const accentCls = "fill-drafting-surface stroke-marker-start [stroke-width:1.5]";
const linkCls = "stroke-chalk/40 [stroke-width:1.5]";
const labelCls = "font-mono fill-chalk [font-size:13px]";
const subCls = "font-mono fill-chalk/55 [font-size:11px]";

/**
 * Airbus imagery lakehouse: ingestion (DMS, Kafka MSK) into a Glue-processed,
 * Lake Formation governed lake on S3, served to Redshift.
 */
export const LakehouseDiagram = ({ className = "" }: DiagramProps) => (
  <svg
    viewBox="0 0 660 220"
    fill="none"
    className={className}
    role="img"
    aria-label="Imagery lakehouse: sources ingested via DMS and Kafka MSK, processed by Glue into a Lake Formation governed S3 lake, served to Redshift."
  >
    {/* flow links */}
    <line x1="118" y1="110" x2="156" y2="110" className={linkCls} />
    <line x1="274" y1="110" x2="312" y2="110" className={linkCls} />
    <line x1="430" y1="110" x2="468" y2="110" className={linkCls} />
    <line x1="586" y1="110" x2="586" y2="110" className={linkCls} />

    {/* sources */}
    <rect x="14" y="82" width="104" height="56" rx="3" className={nodeCls} />
    {/* ingest */}
    <rect x="156" y="68" width="118" height="84" rx="3" className={nodeCls} />
    {/* glue */}
    <rect x="312" y="82" width="118" height="56" rx="3" className={nodeCls} />
    {/* lake formation / s3 (accent) */}
    <rect x="468" y="60" width="118" height="100" rx="3" className={accentCls} />
    {/* redshift */}
    <rect x="600" y="82" width="48" height="56" rx="3" className={nodeCls} />
    <line x1="586" y1="110" x2="600" y2="110" className={linkCls} />

    <g className={labelCls}>
      <text x="66" y="106" textAnchor="middle">imagery</text>
      <text x="66" y="122" textAnchor="middle" className={subCls}>sources</text>

      <text x="215" y="98" textAnchor="middle">dms</text>
      <text x="215" y="118" textAnchor="middle">kafka</text>
      <text x="215" y="134" textAnchor="middle" className={subCls}>msk</text>

      <text x="371" y="106" textAnchor="middle">glue</text>
      <text x="371" y="122" textAnchor="middle" className={subCls}>etl</text>

      <text x="527" y="98" textAnchor="middle" className="fill-marker-start">lake</text>
      <text x="527" y="116" textAnchor="middle" className="fill-marker-start">formation</text>
      <text x="527" y="138" textAnchor="middle" className={subCls}>s3</text>
    </g>

    {/* redshift label below */}
    <text x="624" y="174" textAnchor="middle" className={subCls}>redshift</text>
  </svg>
);

/**
 * Eli Lilly LillyDirect: Figma source built to a production checkout and
 * order-status flow.
 */
export const CheckoutFlowDiagram = ({ className = "" }: DiagramProps) => {
  const screen = (x: number) => (
    <g key={x}>
      <rect x={x} y="40" width="150" height="120" rx="3" className={nodeCls} />
      <line x1={x} y1="64" x2={x + 150} y2="64" className={linkCls} />
      <rect x={x + 16} y="80" width="80" height="8" rx="2" className="fill-chalk/15" />
      <rect x={x + 16} y="98" width="118" height="8" rx="2" className="fill-chalk/10" />
      <rect x={x + 16} y="114" width="100" height="8" rx="2" className="fill-chalk/10" />
    </g>
  );

  return (
    <svg
      viewBox="0 0 620 220"
      fill="none"
      className={className}
      role="img"
      aria-label="LillyDirect flow: Figma design built into a production checkout page and an order-status page."
    >
      {/* connectors */}
      <line x1="170" y1="100" x2="220" y2="100" className={linkCls} />
      <line x1="390" y1="100" x2="440" y2="100" className={linkCls} />

      {/* figma source */}
      <rect x="20" y="40" width="150" height="120" rx="3" className={accentCls} />
      <line x1="20" y1="64" x2="170" y2="64" className={linkCls} />
      <circle cx="44" cy="52" r="4" className="fill-marker-start" />
      <rect x="40" y="84" width="50" height="50" rx="2" className="stroke-marker-start/60 fill-none [stroke-width:1.2] [stroke-dasharray:4_3]" />

      {screen(220)}
      {screen(440)}

      <g className="font-mono fill-chalk [font-size:13px]">
        <text x="95" y="184" textAnchor="middle" className="fill-marker-start">figma</text>
        <text x="295" y="184" textAnchor="middle">checkout</text>
        <text x="515" y="184" textAnchor="middle">order status</text>
      </g>
    </svg>
  );
};
