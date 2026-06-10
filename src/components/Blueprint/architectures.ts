export type EdgeStyle = "solid" | "dashed";

export interface ArchNode {
  id: string;
  symbol: string;
  /** iso grid position [gx, gy] */
  grid: [number, number];
  label: string;
}

export interface ArchEdge {
  from: string;
  to: string;
  style?: EdgeStyle;
}

export interface Architecture {
  id: string;
  name: string;
  useCase: string;
  nodes: ArchNode[];
  edges: ArchEdge[];
  hingeOut: string;
}

/**
 * Six canonical architectures arranged as a hinge ring. Every architecture
 * pins its incoming hinge to IN_ANCHOR (center-left) and its outgoing hinge to
 * OUT_ANCHOR (center-right), so the persistent node always makes the same short
 * hop across center. hingeIn is implicit: ARCHITECTURES[i-1].hingeOut.
 */
const IN: [number, number] = [2, 4]; // center-left, where a hinge arrives
const OUT: [number, number] = [4, 2]; // center-right, where a hinge departs

export const ARCHITECTURES: Architecture[] = [
  {
    id: "serverless",
    name: "Serverless web app",
    useCase: "variable-traffic web apps, minimal ops",
    nodes: [
      { id: "client", symbol: "client", grid: IN, label: "client" },
      { id: "cloudfront", symbol: "cloudfront", grid: [3, 3], label: "cloudfront" },
      { id: "apigateway", symbol: "apigateway", grid: OUT, label: "api gateway" },
      { id: "lambda", symbol: "lambda", grid: [6, 2], label: "lambda" },
      { id: "dynamodb", symbol: "database", grid: [8, 2], label: "dynamodb" },
    ],
    edges: [
      { from: "client", to: "cloudfront" },
      { from: "cloudfront", to: "apigateway" },
      { from: "apigateway", to: "lambda" },
      { from: "lambda", to: "dynamodb" },
    ],
    hingeOut: "apigateway",
  },
  {
    id: "microservices",
    name: "Containerized microservices",
    useCase: "long-running services, control, scale",
    nodes: [
      { id: "apigateway", symbol: "apigateway", grid: IN, label: "api gateway" },
      { id: "loadbalancer", symbol: "loadbalancer", grid: [3, 3], label: "load balancer" },
      { id: "ecs", symbol: "containers", grid: OUT, label: "ecs fargate" },
      { id: "rds", symbol: "database", grid: [6, 2], label: "rds" },
      { id: "redis", symbol: "redis", grid: [5, 4], label: "redis" },
    ],
    edges: [
      { from: "apigateway", to: "loadbalancer" },
      { from: "loadbalancer", to: "ecs" },
      { from: "ecs", to: "rds" },
      { from: "ecs", to: "redis" },
    ],
    hingeOut: "ecs",
  },
  {
    id: "eventdriven",
    name: "Event-driven processing",
    useCase: "decoupling, bursty and async workloads",
    nodes: [
      // Evenly spaced on one straight line: IN -> ... -> OUT (constant screen-y,
      // gx+gy = 6 for all four), so every connector has real length.
      { id: "ecs", symbol: "containers", grid: IN, label: "ecs fargate" },
      { id: "sqs", symbol: "queue", grid: [2.67, 3.33], label: "sqs" },
      { id: "lambdaworkers", symbol: "lambda", grid: [3.33, 2.67], label: "lambda workers" },
      { id: "s3", symbol: "bucket", grid: OUT, label: "s3" },
    ],
    edges: [
      { from: "ecs", to: "sqs", style: "dashed" },
      { from: "sqs", to: "lambdaworkers", style: "dashed" },
      { from: "lambdaworkers", to: "s3", style: "dashed" },
    ],
    hingeOut: "s3",
  },
  {
    id: "lakehouse",
    name: "Data lakehouse",
    useCase: "analytics and BI over large data",
    nodes: [
      { id: "s3", symbol: "bucket", grid: IN, label: "s3" },
      { id: "glue", symbol: "glue", grid: [3, 3], label: "glue" },
      { id: "redshift", symbol: "redshift", grid: OUT, label: "redshift" },
      { id: "quick", symbol: "quick", grid: [6, 2], label: "quick" },
    ],
    edges: [
      { from: "s3", to: "glue" },
      { from: "glue", to: "redshift" },
      { from: "redshift", to: "quick" },
    ],
    hingeOut: "redshift",
  },
  {
    id: "streaming",
    name: "Real-time streaming",
    useCase: "low-latency live data",
    nodes: [
      { id: "kinesis", symbol: "kinesis", grid: [4, 1], label: "kinesis" },
      { id: "streamproc", symbol: "lambda", grid: [3, 2], label: "stream proc" },
      { id: "redshift", symbol: "redshift", grid: IN, label: "redshift" },
      { id: "opensearch", symbol: "opensearch", grid: [6, 3], label: "opensearch" },
    ],
    edges: [
      { from: "kinesis", to: "streamproc" },
      { from: "streamproc", to: "redshift" },
      { from: "streamproc", to: "opensearch" },
    ],
    hingeOut: "opensearch",
  },
  {
    id: "rag",
    name: "RAG assistant",
    useCase: "grounded AI over your own data",
    nodes: [
      { id: "opensearch", symbol: "opensearch", grid: IN, label: "opensearch" },
      { id: "client", symbol: "client", grid: OUT, label: "client" },
      { id: "api", symbol: "apigateway", grid: [6, 3], label: "api" },
      { id: "embeddings", symbol: "embeddings", grid: [4, 4], label: "embeddings" },
      { id: "bedrock", symbol: "bedrock", grid: [2, 2], label: "bedrock" },
    ],
    edges: [
      { from: "client", to: "api" },
      { from: "api", to: "embeddings" },
      { from: "embeddings", to: "opensearch" },
      { from: "opensearch", to: "bedrock" },
      { from: "bedrock", to: "client" },
    ],
    hingeOut: "client",
  },
];

export const hingeInOf = (i: number): string =>
  ARCHITECTURES[(i - 1 + ARCHITECTURES.length) % ARCHITECTURES.length].hingeOut;
