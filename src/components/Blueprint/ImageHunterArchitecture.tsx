interface ImageHunterArchitectureProps {
  className?: string;
}

const nodeCls = "fill-drafting-surface stroke-chalk/70 [stroke-width:1.5]";
const accentCls = "fill-drafting-surface stroke-marker-start [stroke-width:1.5]";
const linkCls = "stroke-chalk/40 [stroke-width:1.5]";
const dashCls = "stroke-chalk/30 [stroke-width:1.25] [stroke-dasharray:5_4]";

const Box = ({
  x,
  y,
  w,
  h,
  title,
  lines,
  accent = false,
  dashed = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  lines?: string[];
  accent?: boolean;
  dashed?: boolean;
}) => (
  <g>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx="3"
      className={accent ? accentCls : nodeCls}
      strokeDasharray={dashed ? "5 4" : undefined}
    />
    <text
      x={x + w / 2}
      y={lines && lines.length ? y + 22 : y + h / 2 + 4}
      textAnchor="middle"
      className={`font-mono [font-size:12.5px] ${
        accent ? "fill-marker-start" : "fill-chalk"
      }`}
    >
      {title}
    </text>
    {lines?.map((line, i) => (
      <text
        key={line}
        x={x + w / 2}
        y={y + 38 + i * 14}
        textAnchor="middle"
        className="font-mono fill-chalk/55 [font-size:10.5px]"
      >
        {line}
      </text>
    ))}
  </g>
);

/**
 * Full high-level architecture of Apollo Mapping's ImageHunter, used as the
 * Portfolio case-study asset: a multi-repo satellite-imagery search-and-order
 * system. A React SPA talks to a Flask backend over /ajax (JWT); the backend
 * queries a PostGIS imagery catalog and external vendor APIs. A Celery pipeline
 * ingests scenes and renders previews to S3, and a FastAPI service exposes the
 * catalog to partners.
 */
export const ImageHunterArchitecture = ({
  className = "",
}: ImageHunterArchitectureProps) => (
  <svg
    viewBox="0 0 680 614"
    fill="none"
    className={className}
    role="img"
    aria-label="ImageHunter architecture: React SPA to Flask backend over JWT-secured /ajax; backend queries a PostGIS imagery catalog and external vendor APIs; a Celery update pipeline ingests scenes and renders previews to S3; a FastAPI public API on ECS Fargate exposes the catalog to partners. imagehunter-corelib is shared across backend, update, and api."
  >
    <defs>
      <marker
        id="iha-arrow"
        viewBox="0 0 8 8"
        refX="6"
        refY="4"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M0,0 L8,4 L0,8 Z" fill="#94A3B8" />
      </marker>
    </defs>

    {/* client -> flask */}
    <line x1="340" y1="74" x2="340" y2="118" className={linkCls} markerEnd="url(#iha-arrow)" />
    {/* flask -> branch (postgis + vendors) */}
    <polyline points="340,180 340,206 130,206 130,248" className={linkCls} fill="none" markerEnd="url(#iha-arrow)" />
    <polyline points="340,180 340,206 552,206 552,238" className={linkCls} fill="none" markerEnd="url(#iha-arrow)" />
    {/* postgis <-> vendors (live availability) */}
    <line x1="232" y1="278" x2="450" y2="278" className={dashCls} markerStart="url(#iha-arrow)" markerEnd="url(#iha-arrow)" />
    {/* update -> postgis (ingest) */}
    <line x1="130" y1="398" x2="130" y2="312" className={linkCls} markerEnd="url(#iha-arrow)" />
    {/* update -> s3 (render/cache) */}
    <line x1="234" y1="430" x2="298" y2="430" className={linkCls} markerEnd="url(#iha-arrow)" />
    {/* public-api read access to catalog, routed along the left margin */}
    <polyline points="190,548 14,548 14,278 26,278" className={dashCls} fill="none" markerEnd="url(#iha-arrow)" />

    {/* nodes */}
    <Box x={230} y={18} w={220} h={56} title="imagehunter-client" lines={["react · leaflet", "spa on s3 / cdn"]} />
    <Box x={230} y={120} w={220} h={60} title="imagehunter" lines={["flask · gunicorn", "blueprint views / ajax"]} accent />
    <Box x={26} y={250} w={204} h={60} title="postgresql + postgis" lines={["imagery catalog"]} />
    <Box x={450} y={238} w={204} h={84} title="vendor apis" lines={["airbus · maxar · planet", "kompsat · eros · ~35"]} />
    <Box x={26} y={398} w={204} h={74} title="imagehunter-update" lines={["celery workers", "sqs / rabbitmq broker"]} />
    <Box x={298} y={402} w={186} h={56} title="s3" lines={["previews · uploads", "exports · static"]} />
    <Box x={190} y={520} w={300} h={62} title="imagehunter-public-api" lines={["fastapi · ecs fargate · alb · waf", "redis · rds · oauth2 / api keys"]} dashed />

    {/* connector labels */}
    <g className="font-mono fill-chalk/55 [font-size:10px] lowercase">
      <text x="350" y="100">https /ajax · jwt</text>
      <text x="138" y="358">ingest</text>
      <text x="266" y="424" textAnchor="middle">render</text>
      <text x="341" y="272" textAnchor="middle" className="fill-chalk/45">live availability</text>
      <text x="60" y="540">read catalog</text>
    </g>

    {/* corelib annotation */}
    <text x="340" y="606" textAnchor="middle" className="font-mono fill-marker-start/80 [font-size:10.5px] lowercase">
      imagehunter-corelib: shared library across backend, update, api
    </text>
  </svg>
);
