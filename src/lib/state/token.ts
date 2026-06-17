const STORAGE_KEY = "sai-ai-snapshot-v2";
const CONTACT_KEY = "sai-ai-snapshot-contact-v1";

import type { AiProvider } from "../aiProviders";

export type SnapshotContact = {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  role?: string;
  aiProviders?: AiProvider[];
};

export function encodeContactToken(email: string): string {
  return btoa(email.trim().toLowerCase());
}

export function decodeContactToken(token: string | null | undefined): SnapshotContact {
  if (!token) return {};
  try {
    const email = atob(decodeURIComponent(token));
    if (!email.includes("@")) return {};
    return { email };
  } catch {
    return {};
  }
}

export function withContactToken(path: string, token: string | null | undefined): string {
  if (!token) return path;
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}c=${encodeURIComponent(token)}`;
}

export function loadStoredAnalytics(): import("../analytics").SnapshotAnalytics | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearStoredAnalytics(): void {
  sessionStorage.removeItem(STORAGE_KEY);
}

export function saveStoredAnalytics(data: import("../analytics").SnapshotAnalytics): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // sessionStorage full or unavailable; in-memory state still drives this tab
  }
}

export function loadStoredContact(): SnapshotContact {
  try {
    const raw = sessionStorage.getItem(CONTACT_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function saveStoredContact(contact: SnapshotContact): void {
  sessionStorage.setItem(CONTACT_KEY, JSON.stringify(contact));
}

export function clearSnapshotStorage(): void {
  sessionStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem(CONTACT_KEY);
  // Drop legacy key from earlier builds so stale demo data cannot reload
  sessionStorage.removeItem("sai-ai-snapshot-v1");
}
