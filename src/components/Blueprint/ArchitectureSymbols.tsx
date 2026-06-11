import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Shared projection + palette (2:1 dimetric, drawn around origin 0,0) */
/* ------------------------------------------------------------------ */

const U = 22;
type Pt = { x: number; y: number };
const P = (gx: number, gy: number, z = 0): Pt => ({
  x: (gx - gy) * U,
  y: (gx + gy) * (U / 2) - z,
});
const S = (arr: Pt[]) => arr.map((p) => `${p.x},${p.y}`).join(" ");

const SLATE = { top: "#E6EAF0", left: "#C6CFDB", right: "#9DAABA" };
const GREEN = { top: "#9FE0C2", left: "#5FC59D", right: "#34A87D" };
const INK = "stroke-chalk/70";
const GREEN_EDGE = "stroke-marker-start";

type Ramp = typeof SLATE;
type Kit = { ramp: Ramp; edge: string; glyph: string; fill: string };

const kit = (accent: boolean): Kit => ({
  ramp: accent ? GREEN : SLATE,
  edge: accent ? GREEN_EDGE : INK,
  glyph: accent ? "stroke-marker-start" : "stroke-chalk/70",
  fill: accent ? "fill-marker-start/15" : "fill-drafting-surface",
});

/* ------------------------------------------------------------------ */
/* Base primitives                                                     */
/* ------------------------------------------------------------------ */

const Box = ({
  a,
  b,
  h,
  z0 = 0,
  cx = 0,
  cy = 0,
  ramp,
  edge,
}: {
  a: number;
  b: number;
  h: number;
  z0?: number;
  cx?: number;
  cy?: number;
  ramp: Ramp;
  edge: string;
}) => {
  const o = (gx: number, gy: number, z: number): Pt => ({
    x: cx + (gx - gy) * U,
    y: cy + (gx + gy) * (U / 2) - z,
  });
  const A = o(-a, -b, z0 + h);
  const B = o(a, -b, z0 + h);
  const C = o(a, b, z0 + h);
  const D = o(-a, b, z0 + h);
  const Bb = o(a, -b, z0);
  const Cb = o(a, b, z0);
  const Db = o(-a, b, z0);
  const cls = `${edge} [stroke-width:1] [stroke-linejoin:round]`;
  return (
    <>
      <polygon points={S([B, C, Cb, Bb])} fill={ramp.right} className={cls} />
      <polygon points={S([D, C, Cb, Db])} fill={ramp.left} className={cls} />
      <polygon points={S([A, B, C, D])} fill={ramp.top} className={cls} />
    </>
  );
};

const Cyl = ({
  rx,
  ry,
  h,
  cx = 0,
  cy = 0,
  rings = 0,
  ramp,
  edge,
}: {
  rx: number;
  ry: number;
  h: number;
  cx?: number;
  cy?: number;
  rings?: number;
  ramp: Ramp;
  edge: string;
}) => {
  const topY = cy - h;
  const cls = `${edge} [stroke-width:1]`;
  const body = `M ${cx - rx} ${topY} L ${cx - rx} ${cy} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cy} L ${cx + rx} ${topY}`;
  const ringEls = [];
  for (let k = 1; k <= rings; k++) {
    const y = topY + (k * h) / (rings + 1);
    ringEls.push(
      <path key={k} d={`M ${cx - rx} ${y} A ${rx} ${ry} 0 0 0 ${cx + rx} ${y}`} fill="none" className="stroke-chalk/35 [stroke-width:1]" />
    );
  }
  return (
    <>
      <path d={body} fill={ramp.left} className={cls} />
      {ringEls}
      <ellipse cx={cx} cy={topY} rx={rx} ry={ry} fill={ramp.top} className={cls} />
    </>
  );
};

const line = (p1: Pt, p2: Pt, cls: string) => (
  <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} className={cls} />
);

/* ------------------------------------------------------------------ */
/* Symbols (each drawn around origin)                                  */
/* ------------------------------------------------------------------ */

const Client = (k: Kit) => {
  const h = 12;
  const dotCls = "fill-chalk/40";
  return (
    <g>
      <Box a={1.0} b={0.82} h={h} ramp={k.ramp} edge={k.edge} />
      {[-0.78, -0.62, -0.46].map((g, i) => {
        const p = P(g, -0.55, h);
        return <circle key={i} cx={p.x} cy={p.y} r={2.2} className={dotCls} />;
      })}
      {[-0.15, 0.1, 0.35].map((g, i) =>
        line(P(-0.75, g, h), P(0.45 - i * 0.12, g, h), "stroke-chalk/30 [stroke-width:1.5]")
      )}
    </g>
  );
};

const Database = (k: Kit) => <Cyl rx={26} ry={10} h={52} rings={2} ramp={k.ramp} edge={k.edge} />;

const Redis = (k: Kit) => (
  // squat cache cylinder
  <Cyl rx={28} ry={11} h={22} rings={1} ramp={k.ramp} edge={k.edge} />
);

const Redshift = (k: Kit) => (
  // cluster of three cylinders => warehouse
  <g>
    <Cyl rx={15} ry={6} h={40} cx={-22} cy={6} ramp={k.ramp} edge={k.edge} />
    <Cyl rx={15} ry={6} h={40} cx={22} cy={6} ramp={k.ramp} edge={k.edge} />
    <Cyl rx={16} ry={6} h={46} cx={0} cy={-4} ramp={k.ramp} edge={k.edge} />
  </g>
);

const Containers = (k: Kit) => (
  // stacked cubes => ecs fargate (slate unless this frame's accent)
  // drawn tall above origin; shift down so the stack isn't clipped by stage fit
  <g transform="translate(0, 14)">
    <Box a={0.6} b={0.6} h={20} z0={0} ramp={k.ramp} edge={k.edge} />
    <Box a={0.52} b={0.52} h={18} z0={20} ramp={k.ramp} edge={k.edge} />
    <Box a={0.44} b={0.44} h={16} z0={38} ramp={k.ramp} edge={k.edge} />
  </g>
);

const Queue = (k: Kit) => (
  <g>
    {[
      { dx: 20, dy: -11 },
      { dx: 0, dy: 0 },
      { dx: -20, dy: 11 },
    ].map((o, i) => (
      <Box key={i} a={0.66} b={0.5} h={6} cx={o.dx} cy={o.dy} ramp={k.ramp} edge={k.edge} />
    ))}
  </g>
);

const Bucket = (k: Kit) => {
  const rxT = 26,
    rxB = 17,
    ry = 10,
    ryB = 7,
    h = 38;
  const topY = -h;
  const body = `M ${-rxT} ${topY} L ${-rxB} 0 A ${rxB} ${ryB} 0 0 0 ${rxB} 0 L ${rxT} ${topY}`;
  return (
    <g>
      <path d={body} fill={k.ramp.left} className={`${k.edge} [stroke-width:1]`} />
      <ellipse cx={0} cy={topY} rx={rxT} ry={ry} fill={k.ramp.top} className={`${k.edge} [stroke-width:1]`} />
      <ellipse cx={0} cy={topY} rx={rxT - 5} ry={ry - 3} fill={k.ramp.right} className="stroke-chalk/30 [stroke-width:1]" />
    </g>
  );
};

const Cloud = (k: Kit) => {
  const d = `M -50 14 C -64 14 -64 -7 -45 -8 C -42 -28 -12 -31 -3 -16 C 4 -34 36 -34 40 -10 C 62 -13 64 11 45 14 Z`;
  return (
    <g>
      <path d={d} fill={k.ramp.top} className={`${k.edge} [stroke-width:1.5] [stroke-linejoin:round]`} />
      {line({ x: -48, y: 14 }, { x: 44, y: 14 }, "stroke-chalk/20 [stroke-width:1]")}
    </g>
  );
};

const Cloudfront = (k: Kit) => (
  // globe => edge CDN
  <g>
    <circle cx={0} cy={-4} r={26} fill={k.ramp.top} className={`${k.edge} [stroke-width:1.2]`} />
    <ellipse cx={0} cy={-4} rx={11} ry={26} fill="none" className={`${k.glyph} [stroke-width:1]`} />
    <ellipse cx={0} cy={-4} rx={26} ry={11} fill="none" className={`${k.glyph} [stroke-width:1]`} />
    {line({ x: -26, y: -4 }, { x: 26, y: -4 }, `${k.glyph} [stroke-width:1]`)}
  </g>
);

const ApiGateway = (k: Kit) => (
  // gateway slab with routing chevrons on the top face
  <g>
    <Box a={0.95} b={0.6} h={26} ramp={k.ramp} edge={k.edge} />
    {[-0.3, 0.1, 0.5].map((g, i) => {
      const a = P(g - 0.18, -0.2, 26);
      const b = P(g, 0, 26);
      const c = P(g - 0.18, 0.2, 26);
      return (
        <polyline
          key={i}
          points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y}`}
          fill="none"
          className={`${k.glyph} [stroke-width:1.5] [stroke-linejoin:round]`}
        />
      );
    })}
  </g>
);

const Lambda = (k: Kit) => (
  // function block with a lambda glyph centered on the front face
  <g>
    <Box a={0.55} b={0.55} h={34} ramp={k.ramp} edge={k.edge} />
    <g
      className={`${k.glyph} [stroke-width:1.8] [stroke-linecap:round] [stroke-linejoin:round]`}
      transform="translate(12.1,-10.95) scale(-1,1)"
    >
      <line x1={-5} y1={8} x2={1} y2={-8} />
      <line x1={-1} y1={-2} x2={5} y2={8} />
    </g>
  </g>
);

const LoadBalancer = (k: Kit) => (
  // splitter: one input fanning to three outputs
  <g transform="translate(8, 0)">
    <Box a={0.5} b={0.5} h={26} cx={-30} cy={8} ramp={k.ramp} edge={k.edge} />
    {[-18, 0, 18].map((dy, i) => (
      <g key={i}>
        {line({ x: -22, y: -2 }, { x: 18, y: dy - 2 }, `${k.glyph} [stroke-width:1.2]`)}
        <rect x={20} y={dy - 9} width={20} height={16} rx={2} className={`${k.fill} ${k.glyph} [stroke-width:1.2]`} />
      </g>
    ))}
  </g>
);

const Glue = (k: Kit) => {
  // two interlocking gears
  const gear = (cx: number, cy: number, r: number) => {
    const teeth = [];
    for (let i = 0; i < 8; i++) {
      const ang = (i / 8) * Math.PI * 2;
      const x = cx + Math.cos(ang) * r;
      const y = cy + Math.sin(ang) * r;
      teeth.push(<rect key={i} x={x - 3} y={y - 3} width={6} height={6} className={`${k.fill} ${k.glyph} [stroke-width:1]`} transform={`rotate(${(ang * 180) / Math.PI} ${x} ${y})`} />);
    }
    return (
      <g>
        {teeth}
        <circle cx={cx} cy={cy} r={r - 2} className={`${k.fill} ${k.glyph} [stroke-width:1.4]`} />
        <circle cx={cx} cy={cy} r={r - 11} fill="none" className={`${k.glyph} [stroke-width:1.2]`} />
      </g>
    );
  };
  return (
    <g>
      {gear(-13, -2, 17)}
      {gear(15, 10, 14)}
    </g>
  );
};

const quick = (k: Kit) => (
  // panel with a small bar chart on the top face
  <g>
    <Box a={0.95} b={0.7} h={10} ramp={k.ramp} edge={k.edge} />
    {[
      { g: -0.45, hh: 10 },
      { g: -0.15, hh: 18 },
      { g: 0.15, hh: 14 },
      { g: 0.45, hh: 22 },
    ].map((bar, i) => {
      const base = P(bar.g, 0, 10);
      return <rect key={i} x={base.x - 4} y={base.y - bar.hh} width={8} height={bar.hh} className={`${k.fill} ${k.glyph} [stroke-width:1.2]`} />;
    })}
  </g>
);

const Kinesis = (k: Kit) => (
  // flow tube with directional chevrons
  <g>
    <Box a={2.0} b={0.5} h={14} ramp={k.ramp} edge={k.edge} />
    {[-1.0, 0, 1.0].map((g, i) => {
      const a = P(g - 0.18, -0.18, 14);
      const b = P(g + 0.18, 0, 14);
      const c = P(g - 0.18, 0.18, 14);
      return (
        <polyline key={i} points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y}`} fill="none" className={`${k.glyph} [stroke-width:1.5] [stroke-linejoin:round]`} />
      );
    })}
  </g>
);

const OpenSearch = (k: Kit) => (
  // magnifier over a small grid
  <g>
    {[-12, 0, 12].map((gx) =>
      [-12, 0, 12].map((gy) => (
        <circle key={`${gx}-${gy}`} cx={gx} cy={gy - 2} r={1.8} className="fill-chalk/35" />
      ))
    )}
    <circle cx={2} cy={-6} r={14} className={`${k.fill} ${k.glyph} [stroke-width:1.8]`} />
    <line x1={12} y1={4} x2={22} y2={14} className={`${k.glyph} [stroke-width:2.4] [stroke-linecap:round]`} />
  </g>
);

const Bedrock = (k: Kit) => (
  // chip with edge pins
  <g>
    <Box a={0.7} b={0.7} h={16} ramp={k.ramp} edge={k.edge} />
    {(() => {
      const pins: ReactNode[] = [];
      for (let i = -1; i <= 1; i++) {
        const r1 = P(0.7, i * 0.35, 8);
        const r2 = P(0.7 + 0.22, i * 0.35, 8);
        pins.push(line(r1, r2, `${k.glyph} [stroke-width:1.4]`));
        const l1 = P(-0.35 + i * 0.35, 0.7, 8);
        const l2 = P(-0.35 + i * 0.35, 0.7 + 0.22, 8);
        pins.push(line(l1, l2, `${k.glyph} [stroke-width:1.4]`));
      }
      return <g key="pins">{pins}</g>;
    })()}
    {(() => {
      const c = P(0, 0, 16);
      return <circle cx={c.x} cy={c.y} r={4} fill="none" className={`${k.glyph} [stroke-width:1.4]`} />;
    })()}
  </g>
);

const Embeddings = (k: Kit) => (
  // grid of dots => vectors
  <g>
    {[-14, -2, 10].map((gy, row) =>
      [-16, -4, 8, 20].map((gx, col) => (
        <circle key={`${row}-${col}`} cx={gx} cy={gy} r={2.4} className={col === row ? "fill-marker-start" : `${k.glyph.replace("stroke-", "fill-")}`} />
      ))
    )}
  </g>
);

/* ------------------------------------------------------------------ */
/* Dispatcher + radii                                                  */
/* ------------------------------------------------------------------ */

const RENDERERS: Record<string, (k: Kit) => ReactNode> = {
  client: Client,
  database: Database,
  redis: Redis,
  redshift: Redshift,
  containers: Containers,
  queue: Queue,
  bucket: Bucket,
  cloud: Cloud,
  cloudfront: Cloudfront,
  apigateway: ApiGateway,
  lambda: Lambda,
  loadbalancer: LoadBalancer,
  glue: Glue,
  quick: quick,
  kinesis: Kinesis,
  opensearch: OpenSearch,
  bedrock: Bedrock,
  embeddings: Embeddings,
};

// approximate trim radius (px) so connectors stop at the symbol edge
export const SYMBOL_RADIUS: Record<string, number> = {
  client: 34,
  database: 30,
  redis: 32,
  redshift: 40,
  containers: 30,
  queue: 40,
  bucket: 32,
  cloud: 52,
  cloudfront: 30,
  apigateway: 34,
  lambda: 26,
  loadbalancer: 44,
  glue: 32,
  quick: 36,
  kinesis: 48,
  opensearch: 30,
  bedrock: 28,
  embeddings: 28,
};

export const NodeSymbol = ({ name, accent }: { name: string; accent: boolean }) => {
  const render = RENDERERS[name] ?? Database;
  return <>{render(kit(accent))}</>;
};
