export type DeviceStatus =
  | "Active"
  | "Idle"
  | "Unreachable"
  | "Pending Recovery"
  | "End-of-Life";

export interface Device {
  id: string;
  assetTag: string;
  assignee: string;
  department: string;
  former: boolean;
  status: DeviceStatus;
  model: string;
  location: string;
  lastSeen: string;
  lastSeenDays: number;
  age: string;
  ageYears: number;
  dataBearing: boolean;
}

export interface RecoveryItem {
  id: string;
  assignee: string;
  department: string;
  model: string;
  location: string;
  daysUnreachable: number;
  dataBearing: boolean;
  estimatedValue: number;
}

export interface OpportunityClient {
  id: string;
  name: string;
  refreshWindowDevices: number;
  refreshNote?: string;
  estimatedRecoverable: number;
  lastEngagement: string;
  lastEngagementMonths: number;
  priority: "High" | "Med" | "Low";
  recommendedAction: string;
  drillDown?: string;
}

export interface ClientStats {
  name: string;
  shortName: string;
  tracked: number;
  coverage: number;
  needAttention: number;
  unreachableOver30: number;
  enteringRefreshWindow: number;
  lastSync: string;
}

export interface LifecycleSegment {
  label: string;
  count: number;
  color: string;
}

export const clientStats: ClientStats = {
  name: "Lakeshore Regional Health System",
  shortName: "Lakeshore Regional",
  tracked: 1206,
  coverage: 96,
  needAttention: 37,
  unreachableOver30: 9,
  enteringRefreshWindow: 142,
  lastSync: "6m ago",
};

export const lifecycleDistribution: LifecycleSegment[] = [
  { label: "New", count: 148, color: "#1565C0" },
  { label: "In Service", count: 712, color: "#2E9E5B" },
  { label: "Aging", count: 204, color: "#61707E" },
  { label: "End-of-Life", count: 142, color: "#E3B23C" },
];

export const devices: Device[] = [
  {
    id: "d1",
    assetTag: "LRH-04412",
    assignee: "Dana W.",
    department: "Radiology",
    former: false,
    status: "Active",
    model: "Dell Latitude 7430",
    location: "Office: Evanston",
    lastSeen: "4m ago",
    lastSeenDays: 0,
    age: "2.1y",
    ageYears: 2.1,
    dataBearing: true,
  },
  {
    id: "d2",
    assetTag: "LRH-03891",
    assignee: "Marcus L.",
    department: "Billing",
    former: false,
    status: "Active",
    model: "HP EliteBook 840",
    location: "Remote: Madison, WI",
    lastSeen: "22m ago",
    lastSeenDays: 0,
    age: "1.4y",
    ageYears: 1.4,
    dataBearing: true,
  },
  {
    id: "d3",
    assetTag: "LRH-02107",
    assignee: "Priya S.",
    department: "IT",
    former: false,
    status: "Idle",
    model: "Lenovo ThinkPad X1",
    location: "Office: Evanston",
    lastSeen: "3d ago",
    lastSeenDays: 3,
    age: "3.8y",
    ageYears: 3.8,
    dataBearing: true,
  },
  {
    id: "d4",
    assetTag: "LRH-03304",
    assignee: "Maria T.",
    department: "Sales",
    former: true,
    status: "Unreachable",
    model: 'MacBook Pro 14"',
    location: "Remote: Austin, TX",
    lastSeen: "41d ago",
    lastSeenDays: 41,
    age: "2.6y",
    ageYears: 2.6,
    dataBearing: true,
  },
  {
    id: "d5",
    assetTag: "LRH-01988",
    assignee: "Greg N.",
    department: "Facilities",
    former: false,
    status: "Active",
    model: "Dell OptiPlex 7090",
    location: "Office: Gurnee",
    lastSeen: "1h ago",
    lastSeenDays: 0,
    age: "4.2y",
    ageYears: 4.2,
    dataBearing: true,
  },
  {
    id: "d6",
    assetTag: "LRH-02756",
    assignee: "Alan R.",
    department: "Finance",
    former: true,
    status: "Unreachable",
    model: "Lenovo ThinkPad T14",
    location: "Remote: Denver, CO",
    lastSeen: "58d ago",
    lastSeenDays: 58,
    age: "3.1y",
    ageYears: 3.1,
    dataBearing: true,
  },
  {
    id: "d7",
    assetTag: "LRH-05102",
    assignee: "Tomas V.",
    department: "Lab",
    former: false,
    status: "Active",
    model: "HP Z2 Workstation",
    location: "Office: Evanston",
    lastSeen: "12m ago",
    lastSeenDays: 0,
    age: "0.9y",
    ageYears: 0.9,
    dataBearing: true,
  },
  {
    id: "d8",
    assetTag: "LRH-04119",
    assignee: "Bridget K.",
    department: "Nursing",
    former: false,
    status: "Idle",
    model: 'iPad Pro 11"',
    location: "Remote: Rockford, IL",
    lastSeen: "6d ago",
    lastSeenDays: 6,
    age: "2.0y",
    ageYears: 2.0,
    dataBearing: false,
  },
  {
    id: "d9",
    assetTag: "LRH-03670",
    assignee: "Dev P.",
    department: "Marketing",
    former: true,
    status: "Unreachable",
    model: "MacBook Air M2",
    location: "Remote: Chicago, IL",
    lastSeen: "34d ago",
    lastSeenDays: 34,
    age: "1.8y",
    ageYears: 1.8,
    dataBearing: true,
  },
  {
    id: "d10",
    assetTag: "LRH-01445",
    assignee: "Sandra O.",
    department: "HR",
    former: false,
    status: "Active",
    model: "Dell Latitude 5430",
    location: "Office: Evanston",
    lastSeen: "38m ago",
    lastSeenDays: 0,
    age: "4.0y",
    ageYears: 4.0,
    dataBearing: true,
  },
  {
    id: "d11",
    assetTag: "LRH-02933",
    assignee: "Kevin H.",
    department: "Pharmacy",
    former: false,
    status: "Pending Recovery",
    model: "Dell Latitude 5520",
    location: "Office: Evanston",
    lastSeen: "18d ago",
    lastSeenDays: 18,
    age: "3.4y",
    ageYears: 3.4,
    dataBearing: true,
  },
  {
    id: "d12",
    assetTag: "LRH-04801",
    assignee: "Nina C.",
    department: "Emergency",
    former: false,
    status: "End-of-Life",
    model: "HP EliteBook 830",
    location: "Office: Gurnee",
    lastSeen: "2h ago",
    lastSeenDays: 0,
    age: "5.1y",
    ageYears: 5.1,
    dataBearing: true,
  },
  {
    id: "d13",
    assetTag: "LRH-05218",
    assignee: "James F.",
    department: "Administration",
    former: false,
    status: "Active",
    model: "Lenovo ThinkPad T14s",
    location: "Remote: Milwaukee, WI",
    lastSeen: "51m ago",
    lastSeenDays: 0,
    age: "1.2y",
    ageYears: 1.2,
    dataBearing: true,
  },
  {
    id: "d14",
    assetTag: "LRH-01762",
    assignee: "Rachel M.",
    department: "Compliance",
    former: false,
    status: "Idle",
    model: "Dell OptiPlex 7080",
    location: "Office: Evanston",
    lastSeen: "9d ago",
    lastSeenDays: 9,
    age: "4.6y",
    ageYears: 4.6,
    dataBearing: true,
  },
];

export const recoveryItems: RecoveryItem[] = [
  {
    id: "r1",
    assignee: "Maria T.",
    department: "Sales",
    model: 'MacBook Pro 14"',
    location: "Austin, TX",
    daysUnreachable: 41,
    dataBearing: true,
    estimatedValue: 640,
  },
  {
    id: "r2",
    assignee: "Alan R.",
    department: "Finance",
    model: "ThinkPad T14",
    location: "Denver, CO",
    daysUnreachable: 58,
    dataBearing: true,
    estimatedValue: 410,
  },
  {
    id: "r3",
    assignee: "Dev P.",
    department: "Marketing",
    model: "MacBook Air M2",
    location: "Chicago, IL",
    daysUnreachable: 34,
    dataBearing: true,
    estimatedValue: 520,
  },
];

export const opportunityClients: OpportunityClient[] = [
  {
    id: "c1",
    name: "Lakeshore Regional Health",
    refreshWindowDevices: 142,
    estimatedRecoverable: 61400,
    lastEngagement: "7 mo ago",
    lastEngagementMonths: 7,
    priority: "High",
    recommendedAction: "Bundle recovery + refresh",
    drillDown:
      "142 devices entering refresh window in Q3 · est. $61,400 recoverable · last engagement 7 mo ago · 9 data-bearing devices currently unreachable → bundle recovery + refresh + disposition.",
  },
  {
    id: "c2",
    name: "Prairie State University",
    refreshWindowDevices: 310,
    refreshNote: "lab refresh",
    estimatedRecoverable: 52100,
    lastEngagement: "14 mo ago",
    lastEngagementMonths: 14,
    priority: "High",
    recommendedAction: "Lab refresh outreach",
  },
  {
    id: "c3",
    name: "Calumet Financial Group",
    refreshWindowDevices: 88,
    estimatedRecoverable: 44900,
    lastEngagement: "3 mo ago",
    lastEngagementMonths: 3,
    priority: "Med",
    recommendedAction: "Quarterly check-in",
  },
  {
    id: "c4",
    name: "Northgate Logistics",
    refreshWindowDevices: 47,
    estimatedRecoverable: 18200,
    lastEngagement: "1 mo ago",
    lastEngagementMonths: 1,
    priority: "Low",
    recommendedAction: "Monitor: recent touch",
  },
];

export const totalPipeline = 176600;

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function isRiskRow(device: Device): boolean {
  return (
    device.dataBearing &&
    device.status === "Unreachable" &&
    device.lastSeenDays > 30
  );
}
