import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import { runAnalytics, type SnapshotAnalytics } from "../analytics";
import type { FlatMessage } from "../parse/types";
import {
  clearStoredAnalytics,
  clearSnapshotStorage,
  loadStoredAnalytics,
  loadStoredContact,
  saveStoredAnalytics,
  saveStoredContact,
  type SnapshotContact,
} from "./token";

export type SnapshotSource = "upload" | "sample";

type SnapshotContextValue = {
  analytics: SnapshotAnalytics | null;
  contact: SnapshotContact;
  setContact: (contact: SnapshotContact) => void;
  processMessages: (
    messages: FlatMessage[],
    conversationCount: number,
    source: SnapshotSource,
  ) => SnapshotAnalytics;
  clearAnalytics: () => void;
  syncFromStorage: () => void;
  clear: () => void;
};

const SnapshotContext = createContext<SnapshotContextValue | null>(null);

function readStoredAnalytics(): SnapshotAnalytics | null {
  const stored = loadStoredAnalytics();
  if (!stored?.processedAt || !stored.source) return null;
  return stored;
}

export function SnapshotProvider({ children }: { children: ReactNode }) {
  const [analytics, setAnalytics] = useState<SnapshotAnalytics | null>(() => readStoredAnalytics());
  const [contact, setContactState] = useState<SnapshotContact>(() => loadStoredContact());

  const setContact = useCallback((next: SnapshotContact) => {
    saveStoredContact(next);
    setContactState(next);
  }, []);

  const clearAnalytics = useCallback(() => {
    clearStoredAnalytics();
    sessionStorage.removeItem("sai-ai-snapshot-v1");
    setAnalytics(null);
  }, []);

  const syncFromStorage = useCallback(() => {
    const stored = readStoredAnalytics();
    if (stored) setAnalytics(stored);
  }, []);

  const processMessages = useCallback(
    (messages: FlatMessage[], _conversationCount: number, source: SnapshotSource) => {
      const result = runAnalytics(messages, source);
      saveStoredAnalytics(result);
      flushSync(() => setAnalytics(result));
      return result;
    },
    [],
  );

  const clear = useCallback(() => {
    clearSnapshotStorage();
    setAnalytics(null);
    setContactState({});
  }, []);

  const value = useMemo(
    () => ({
      analytics,
      contact,
      setContact,
      processMessages,
      clearAnalytics,
      syncFromStorage,
      clear,
    }),
    [analytics, contact, setContact, processMessages, clearAnalytics, syncFromStorage, clear],
  );

  return <SnapshotContext.Provider value={value}>{children}</SnapshotContext.Provider>;
}

export function useSnapshot() {
  const ctx = useContext(SnapshotContext);
  if (!ctx) {
    throw new Error("useSnapshot must be used within SnapshotProvider");
  }
  return ctx;
}
