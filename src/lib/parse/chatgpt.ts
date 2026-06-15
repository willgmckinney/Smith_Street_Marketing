import type { ExportAdapter, FlatMessage, MessageRole, ParsedExport } from "./types";

type ChatGPTMappingNode = {
  id?: string;
  message?: {
    author?: { role?: string };
    create_time?: number | null;
    content?: {
      content_type?: string;
      parts?: unknown[];
      text?: string;
    };
  };
  parent?: string | null;
  children?: string[];
};

type ChatGPTConversation = {
  title?: string;
  create_time?: number;
  update_time?: number;
  current_node?: string;
  mapping?: Record<string, ChatGPTMappingNode>;
};

const TEXT_CONTENT_TYPES = new Set([
  "text",
  "multimodal_text",
  "code",
  "execution_output",
  "tether_browsing_display",
  "user_editable_context",
]);

function normalizeRole(role: string | undefined): MessageRole | null {
  if (role === "user" || role === "assistant" || role === "system" || role === "tool") {
    return role;
  }
  return null;
}

function extractText(content: ChatGPTMappingNode["message"] extends infer M
  ? M extends { content?: infer C }
    ? C
    : never
  : never): string {
  if (!content || typeof content !== "object") return "";

  const record = content as { parts?: unknown[]; text?: string };
  if (typeof record.text === "string" && record.text.trim()) {
    return record.text.trim();
  }

  if (!record.parts?.length) return "";

  return record.parts
    .map((part) => {
      if (typeof part === "string") return part;
      if (part && typeof part === "object") {
        if ("text" in part && typeof (part as { text?: unknown }).text === "string") {
          return (part as { text: string }).text;
        }
        if ("content" in part && typeof (part as { content?: unknown }).content === "string") {
          return (part as { content: string }).content;
        }
      }
      return "";
    })
    .filter(Boolean)
    .join("\n")
    .trim();
}

function nodeToMessage(
  node: ChatGPTMappingNode,
  conversation: ChatGPTConversation,
  conversationId: string,
  conversationTitle: string,
): FlatMessage | null {
  const message = node.message;
  if (!message?.content) return null;

  const contentType = message.content.content_type ?? "text";
  if (!TEXT_CONTENT_TYPES.has(contentType) && !message.content.parts?.length && !message.content.text) {
    return null;
  }

  const text = extractText(message.content);
  if (!text) return null;

  const role = normalizeRole(message.author?.role);
  if (!role) return null;

  return {
    role,
    text,
    timestamp: message.create_time ?? conversation.update_time ?? conversation.create_time ?? null,
    conversationId,
    conversationTitle,
  };
}

function findRootIds(mapping: Record<string, ChatGPTMappingNode>): string[] {
  const childIds = new Set<string>();
  for (const node of Object.values(mapping)) {
    for (const child of node.children ?? []) {
      childIds.add(child);
    }
  }

  const explicitRoots = Object.entries(mapping)
    .filter(([, node]) => node.parent == null)
    .map(([id]) => id);

  if (explicitRoots.length > 0) return explicitRoots;

  const unreferenced = Object.keys(mapping).filter((id) => !childIds.has(id));
  return unreferenced.length > 0 ? unreferenced : Object.keys(mapping);
}

function walkConversation(conversation: ChatGPTConversation, index: number): FlatMessage[] {
  const mapping = conversation.mapping ?? {};
  const conversationId = `conv-${index}`;
  const conversationTitle = conversation.title?.trim() || "Untitled conversation";
  const messages: FlatMessage[] = [];
  const visited = new Set<string>();

  const visit = (nodeId: string) => {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);

    const node = mapping[nodeId];
    if (!node) return;

    const flat = nodeToMessage(node, conversation, conversationId, conversationTitle);
    if (flat) messages.push(flat);

    for (const childId of node.children ?? []) {
      visit(childId);
    }
  };

  for (const rootId of findRootIds(mapping)) {
    visit(rootId);
  }

  // Catch orphaned branches not reachable from declared roots.
  for (const nodeId of Object.keys(mapping)) {
    if (!visited.has(nodeId)) visit(nodeId);
  }

  return messages;
}

export class ChatGPTAdapter implements ExportAdapter {
  parse(raw: unknown): FlatMessage[] {
    if (!Array.isArray(raw)) {
      throw new Error("Expected conversations.json to be an array of conversations.");
    }

    const conversations = raw as ChatGPTConversation[];
    if (conversations.length === 0) {
      throw new Error("No conversations found in this export.");
    }

    const hasMapping = conversations.some((c) => c.mapping && Object.keys(c.mapping).length > 0);
    if (!hasMapping) {
      throw new Error("This file does not look like a ChatGPT export (missing conversation mapping).");
    }

    return conversations.flatMap((conversation, index) => walkConversation(conversation, index));
  }
}

export async function parseChatGPTExportFile(file: File): Promise<ParsedExport> {
  const adapter = new ChatGPTAdapter();
  const lowerName = file.name.toLowerCase();

  if (lowerName.endsWith(".json")) {
    const text = await file.text();
    let raw: unknown;
    try {
      raw = JSON.parse(text);
    } catch {
      throw new Error("Could not parse JSON. Make sure you selected conversations.json from your ChatGPT export.");
    }
    const messages = adapter.parse(raw);
    return {
      messages,
      conversationCount: Array.isArray(raw) ? raw.length : 0,
    };
  }

  if (!lowerName.endsWith(".zip")) {
    throw new Error("Please upload your ChatGPT export .zip or a conversations.json file.");
  }

  if (file.size > 250 * 1024 * 1024) {
    throw new Error("This file is very large. Try uploading conversations.json directly from inside the zip.");
  }

  const JSZip = (await import("jszip")).default;
  const zip = await JSZip.loadAsync(file);
  const jsonEntry =
    zip.file("conversations.json") ??
    Object.values(zip.files).find((entry) => entry.name.endsWith("conversations.json") && !entry.dir);

  if (!jsonEntry) {
    throw new Error("Could not find conversations.json inside the zip. Export again from ChatGPT settings.");
  }

  const text = await jsonEntry.async("text");
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    throw new Error("conversations.json inside the zip could not be parsed.");
  }

  const messages = adapter.parse(raw);
  return {
    messages,
    conversationCount: Array.isArray(raw) ? raw.length : 0,
  };
}
