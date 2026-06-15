import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { runAnalytics, type SnapshotAnalytics } from "../analytics";
import type { FlatMessage } from "../parse/types";
import {
  loadStoredAnalytics,
  loadStoredContact,
  saveStoredAnalytics,
  saveStoredContact,
  type SnapshotContact,
} from "./token";

type SnapshotContextValue = {
  analytics: SnapshotAnalytics | null;
  contact: SnapshotContact;
  setContact: (contact: SnapshotContact) => void;
  processMessages: (messages: FlatMessage[], conversationCount: number) => SnapshotAnalytics;
  clear: () => void;
};

const SnapshotContext = createContext<SnapshotContextValue | null>(null);

export function SnapshotProvider({ children }: { children: ReactNode }) {
  const [analytics, setAnalytics] = useState<SnapshotAnalytics | null>(() => loadStoredAnalytics());
  const [contact, setContactState] = useState<SnapshotContact>(() => {
    const stored = loadStoredContact();
    return stored;
  });

  const setContact = useCallback((next: SnapshotContact) => {
    saveStoredContact(next);
    setContactState(next);
  }, []);

  const processMessages = useCallback((_messages: FlatMessage[], _conversationCount: number) => {
    const result = runAnalytics(_messages);
    saveStoredAnalytics(result);
    setAnalytics(result);
    return result;
  }, []);

  const clear = useCallback(() => {
    sessionStorage.removeItem("sai-ai-snapshot-v1");
    sessionStorage.removeItem("sai-ai-snapshot-contact-v1");
    setAnalytics(null);
    setContactState({});
  }, []);

  const value = useMemo(
    () => ({
      analytics,
      contact,
      setContact,
      processMessages,
      clear,
    }),
    [analytics, contact, setContact, processMessages, clear],
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
