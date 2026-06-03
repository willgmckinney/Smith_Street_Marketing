export type AssetStatus =
  | "Received"
  | "Data Sanitized"
  | "Remarketed"
  | "Recycled"
  | "In Transit";

export type Disposition = "Resale" | "Recycle" | "Redeployed" | "Pending";

export interface Asset {
  id: string;
  manufacturer: string;
  model: string;
  serial: string;
  assetTag: string;
  status: AssetStatus;
  disposition: Disposition;
  value?: number;
  dateReceived: string;
  destructionMethod?: string;
}

export interface Certificate {
  id: string;
  type: "Certificate of Data Destruction" | "Certificate of Recycling";
  dateIssued: string;
  assetsCovered: number;
  method: string;
}

export interface RecentActivity {
  id: string;
  icon: "certificate" | "remarket" | "pickup" | "sanitize";
  title: string;
  timestamp: string;
  status: string;
  statusColor: "blue" | "green" | "amber" | "navy" | "muted";
}

export const client = {
  name: "Lakeshore Regional Health System",
  shortName: "Lakeshore Regional",
  initials: "LR",
};

export const kpis = {
  assetsProcessed: 1247,
  devicesSanitized: 842,
  valueRecovered: 58420,
  eWasteDiverted: 12.4,
};

export const dispositionMix = [
  { name: "Remarketed", value: 38, color: "#2E9E5B" },
  { name: "Recycled", value: 41, color: "#0B2E4F" },
  { name: "Redeployed", value: 14, color: "#1565C0" },
  { name: "Pending", value: 7, color: "#C77700" },
];

export const recentActivity: RecentActivity[] = [
  {
    id: "1",
    icon: "certificate",
    title: "Certificate of Data Destruction issued — Batch #LRH-0419",
    timestamp: "May 19, 2026 · 2:14 PM",
    status: "Verified",
    statusColor: "green",
  },
  {
    id: "2",
    icon: "remarket",
    title: "62 assets remarketed — Q2 recovery batch",
    timestamp: "May 17, 2026 · 11:30 AM",
    status: "Complete",
    statusColor: "green",
  },
  {
    id: "3",
    icon: "pickup",
    title: "Pickup completed — Evanston campus",
    timestamp: "May 15, 2026 · 9:00 AM",
    status: "Received",
    statusColor: "muted",
  },
  {
    id: "4",
    icon: "sanitize",
    title: "128 devices data sanitized — NIST 800-88 Purge",
    timestamp: "May 12, 2026 · 4:45 PM",
    status: "Data Sanitized",
    statusColor: "blue",
  },
];

export const certifications = [
  "NIST SP 800-88",
  "NAID AAA",
  "e-Stewards",
  "R2/RIOS",
  "ISO 14001",
];

export const assets: Asset[] = [
  {
    id: "1",
    manufacturer: "Dell",
    model: "Latitude 7430",
    serial: "9KJ2X1A",
    assetTag: "LRH-04412",
    status: "Remarketed",
    disposition: "Resale",
    value: 312,
    dateReceived: "2026-04-28",
    destructionMethod: "Overwrite — NIST 800-88 Purge",
  },
  {
    id: "2",
    manufacturer: "Lenovo",
    model: "ThinkPad X1 Carbon",
    serial: "PF3R9920",
    assetTag: "LRH-04418",
    status: "Remarketed",
    disposition: "Resale",
    value: 389,
    dateReceived: "2026-04-25",
    destructionMethod: "Overwrite — NIST 800-88 Purge",
  },
  {
    id: "3",
    manufacturer: "HP",
    model: "EliteDesk 800 G6",
    serial: "8CC1340RT2",
    assetTag: "LRH-04401",
    status: "Data Sanitized",
    disposition: "Redeployed",
    dateReceived: "2026-05-02",
    destructionMethod: "Overwrite — NIST 800-88 Clear",
  },
  {
    id: "4",
    manufacturer: "Apple",
    model: 'MacBook Pro 14"',
    serial: "C02GF1ABQ6",
    assetTag: "LRH-04455",
    status: "Remarketed",
    disposition: "Resale",
    value: 640,
    dateReceived: "2026-04-20",
    destructionMethod: "Cryptographic Erase",
  },
  {
    id: "5",
    manufacturer: "Dell",
    model: "PowerEdge R740",
    serial: "7XQ4P2B",
    assetTag: "LRH-03980",
    status: "Recycled",
    disposition: "Recycle",
    dateReceived: "2026-03-15",
    destructionMethod: "Degauss + Shred",
  },
  {
    id: "6",
    manufacturer: "Cisco",
    model: "Catalyst 9300",
    serial: "FCW2310L0KZ",
    assetTag: "LRH-04120",
    status: "Recycled",
    disposition: "Recycle",
    dateReceived: "2026-03-22",
    destructionMethod: "Overwrite — NIST 800-88 Purge",
  },
  {
    id: "7",
    manufacturer: "HP",
    model: "LaserJet M607",
    serial: "VNB3K01872",
    assetTag: "LRH-04209",
    status: "In Transit",
    disposition: "Pending",
    dateReceived: "2026-05-18",
  },
  {
    id: "8",
    manufacturer: "Samsung",
    model: '27" Monitor',
    serial: "0AHM4PCR",
    assetTag: "LRH-04330",
    status: "Recycled",
    disposition: "Recycle",
    dateReceived: "2026-04-05",
  },
  {
    id: "9",
    manufacturer: "Dell",
    model: "OptiPlex 7090",
    serial: "4LM8N3C",
    assetTag: "LRH-04377",
    status: "Data Sanitized",
    disposition: "Redeployed",
    dateReceived: "2026-05-08",
    destructionMethod: "Overwrite — NIST 800-88 Clear",
  },
  {
    id: "10",
    manufacturer: "Apple",
    model: "iPhone 12",
    serial: "DX3YH4K9",
    assetTag: "LRH-04501",
    status: "Remarketed",
    disposition: "Resale",
    value: 185,
    dateReceived: "2026-05-10",
    destructionMethod: "Cryptographic Erase",
  },
  {
    id: "11",
    manufacturer: "Lenovo",
    model: "ThinkCentre M70q",
    serial: "MJ0A7781",
    assetTag: "LRH-04444",
    status: "Remarketed",
    disposition: "Resale",
    value: 96,
    dateReceived: "2026-04-30",
    destructionMethod: "Overwrite — NIST 800-88 Purge",
  },
  {
    id: "12",
    manufacturer: "APC",
    model: "Smart-UPS 1500",
    serial: "3S2218X09",
    assetTag: "LRH-04060",
    status: "Recycled",
    disposition: "Recycle",
    dateReceived: "2026-02-18",
  },
];

export const environmental = {
  co2AvoidedKg: 8930,
  eWasteDivertedTons: 12.4,
  materialsRecoveredTons: 3.1,
  carsOffRoadEquivalent: 1.9,
  commodities: [
    { name: "Steel", kg: 1420 },
    { name: "Aluminum", kg: 610 },
    { name: "Copper", kg: 340 },
    { name: "Plastics", kg: 520 },
    { name: "Precious Metals", kg: 12 },
  ],
};

export const certificates: Certificate[] = [
  {
    id: "ACME-CDD-2026-0419",
    type: "Certificate of Data Destruction",
    dateIssued: "2026-05-19",
    assetsCovered: 842,
    method: "Overwrite (NIST 800-88 Purge) + Shred",
  },
  {
    id: "ACME-CDR-2026-0388",
    type: "Certificate of Recycling",
    dateIssued: "2026-05-02",
    assetsCovered: 511,
    method: "e-Stewards / R2",
  },
  {
    id: "ACME-CDD-2026-0301",
    type: "Certificate of Data Destruction",
    dateIssued: "2026-04-11",
    assetsCovered: 96,
    method: "Cryptographic Erase",
  },
  {
    id: "ACME-CDR-2026-0240",
    type: "Certificate of Recycling",
    dateIssued: "2026-03-22",
    assetsCovered: 308,
    method: "e-Stewards / R2",
  },
  {
    id: "ACME-CDD-2026-0188",
    type: "Certificate of Data Destruction",
    dateIssued: "2026-02-28",
    assetsCovered: 274,
    method: "Degauss + Shred",
  },
  {
    id: "ACME-CDD-2026-0102",
    type: "Certificate of Data Destruction",
    dateIssued: "2026-01-30",
    assetsCovered: 130,
    method: "Overwrite (NIST 800-88 Clear)",
  },
];
