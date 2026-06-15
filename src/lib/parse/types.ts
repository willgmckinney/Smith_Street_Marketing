export type MessageRole = "user" | "assistant" | "system" | "tool";

export type FlatMessage = {
  role: MessageRole;
  text: string;
  timestamp: number | null;
  conversationId: string;
  conversationTitle: string;
};

export interface ExportAdapter {
  parse(raw: unknown): FlatMessage[];
}

export type ParsedExport = {
  messages: FlatMessage[];
  conversationCount: number;
};
