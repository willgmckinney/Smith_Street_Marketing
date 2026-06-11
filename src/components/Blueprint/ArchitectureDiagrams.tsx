interface DiagramProps {
  className?: string;
}

const nodeCls = "fill-drafting-surface stroke-chalk/70 [stroke-width:1.5]";
const accentCls = "fill-drafting-surface stroke-marker-start [stroke-width:1.5]";
const linkCls = "stroke-chalk/40 [stroke-width:1.5]";
const labelCls = "font-mono fill-chalk [font-size:12px]";
const subCls = "font-mono fill-chalk/55 [font-size:10px]";

// Shared arrow marker
const ArrowMarker = () => (
  <defs>
    <marker id="ad-arr" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
      <path d="M0,0.5 L5,3 L0,5.5" fill="none" className="stroke-chalk/40 [stroke-width:1.2] [stroke-linecap:round] [stroke-linejoin:round]" />
    </marker>
  </defs>
);

// A node box with a main label and optional sub-label, centered at cx/cy
const Node = ({
  x, y, w = 110, h = 58, label, sub, accent = false,
}: {
  x: number; y: number; w?: number; h?: number;
  label: string; sub?: string; accent?: boolean;
}) => {
  const cx = x + w / 2;
  const cy = y + h / 2;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="3" className={accent ? accentCls : nodeCls} />
      <text x={cx} y={sub ? cy - 4 : cy + 4} textAnchor="middle" className={accent ? `${labelCls} fill-marker-start` : labelCls}>{label}</text>
      {sub && <text x={cx} y={cy + 13} textAnchor="middle" className={subCls}>{sub}</text>}
    </g>
  );
};

// Horizontal connector with arrowhead
const HConn = ({ x1, x2, y }: { x1: number; x2: number; y: number }) => (
  <line x1={x1} y1={y} x2={x2} y2={y} className={linkCls} markerEnd="url(#ad-arr)" />
);

// Vertical connector with arrowhead
const VConn = ({ x, y1, y2 }: { x: number; y1: number; y2: number }) => (
  <line x1={x} y1={y1} x2={x} y2={y2} className={linkCls} markerEnd="url(#ad-arr)" />
);

/**
 * Airbus imagery lakehouse:
 * imagery sources → ingest (DMS + Kafka) → glue etl → lake formation / s3 → redshift
 */
export const LakehouseDiagram = ({ className = "" }: DiagramProps) => {
  // 5 nodes, each 108px wide, 14px gap, starting at x=10
  // positions: 10, 132, 254, 376, 498
  const NW = 108;
  const NH = 58;
  const GAP = 14;
  const Y = 76;
  const xs = [10, 10 + NW + GAP, 10 + (NW + GAP) * 2, 10 + (NW + GAP) * 3, 10 + (NW + GAP) * 4];
  const midY = Y + NH / 2;

  return (
    <svg viewBox="0 0 636 210" fill="none" className={className} role="img"
      aria-label="Imagery lakehouse: sources ingested via DMS and Kafka, processed by Glue into a Lake Formation governed S3 lake, served to Redshift.">
      <ArrowMarker />
      <HConn x1={xs[0] + NW} x2={xs[1]} y={midY} />
      <HConn x1={xs[1] + NW} x2={xs[2]} y={midY} />
      <HConn x1={xs[2] + NW} x2={xs[3]} y={midY} />
      <HConn x1={xs[3] + NW} x2={xs[4]} y={midY} />
      <Node x={xs[0]} y={Y} w={NW} h={NH} label="imagery" sub="sources" />
      <Node x={xs[1]} y={Y} w={NW} h={NH} label="dms / kafka" sub="ingest" />
      <Node x={xs[2]} y={Y} w={NW} h={NH} label="glue" sub="etl" />
      <Node x={xs[3]} y={Y} w={NW} h={NH} label="lake formation" sub="s3" accent />
      <Node x={xs[4]} y={Y} w={NW} h={NH} label="redshift" sub="warehouse" />
    </svg>
  );
};

/**
 * Apollo Mapping geospatial platform (generalized):
 * web client → api layer → catalog → object storage
 * vendor feeds drip into api, async workers pull from catalog
 */
export const GeospatialPlatformDiagram = ({ className = "" }: DiagramProps) => {
  const NW = 120;
  const NH = 56;
  const GAP = 18;
  const MAINX = [10, 10 + NW + GAP, 10 + (NW + GAP) * 2, 10 + (NW + GAP) * 3];
  const MAINY = 90;
  const midY = MAINY + NH / 2;

  // vendor feeds box above api (index 1), async workers below catalog (index 2)
  const SW = 110;
  const SH = 46;
  const vendorX = MAINX[1] + (NW - SW) / 2;
  const vendorY = 20;
  const asyncX = MAINX[2] + (NW - SW) / 2;
  const asyncY = MAINY + NH + 20;

  return (
    <svg viewBox="0 0 614 230" fill="none" className={className} role="img"
      aria-label="Geospatial platform: web client to API layer, governed catalog and object storage, with vendor feeds and async processing.">
      <ArrowMarker />
      {/* main flow */}
      <HConn x1={MAINX[0] + NW} x2={MAINX[1]} y={midY} />
      <HConn x1={MAINX[1] + NW} x2={MAINX[2]} y={midY} />
      <HConn x1={MAINX[2] + NW} x2={MAINX[3]} y={midY} />
      {/* vendor feeds → api */}
      <VConn x={MAINX[1] + NW / 2} y1={vendorY + SH} y2={MAINY} />
      {/* catalog → async workers */}
      <VConn x={MAINX[2] + NW / 2} y1={MAINY + NH} y2={asyncY} />

      {/* side nodes */}
      <Node x={vendorX} y={vendorY} w={SW} h={SH} label="vendor feeds" />
      <Node x={asyncX} y={asyncY} w={SW} h={SH} label="async workers" />

      {/* main nodes */}
      <Node x={MAINX[0]} y={MAINY} w={NW} h={NH} label="web client" />
      <Node x={MAINX[1]} y={MAINY} w={NW} h={NH} label="api layer" accent />
      <Node x={MAINX[2]} y={MAINY} w={NW} h={NH} label="catalog" sub="governed" />
      <Node x={MAINX[3]} y={MAINY} w={NW} h={NH} label="object storage" />
    </svg>
  );
};

/**
 * Design-to-production flow: source design built to production screens.
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
    <svg viewBox="0 0 620 220" fill="none" className={className} role="img"
      aria-label="Design-to-production flow: source design built into production application screens.">
      <ArrowMarker />
      <line x1="170" y1="100" x2="220" y2="100" className={linkCls} markerEnd="url(#ad-arr)" />
      <line x1="390" y1="100" x2="440" y2="100" className={linkCls} markerEnd="url(#ad-arr)" />

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

