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
  conversation_id?: string;
  id?: string;
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

const CONVERSATION_JSON_RE = /(?:^|\/)conversations(?:-(\d+))?\.json$/i;

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

/** Build child lists from parent pointers when the export omits `children` (newer format). */
function getChildrenMap(mapping: Record<string, ChatGPTMappingNode>): Map<string, string[]> {
  const hasExplicitChildren = Object.values(mapping).some((node) => node.children?.length);
  const childrenMap = new Map<string, string[]>();

  if (hasExplicitChildren) {
    for (const [nodeId, node] of Object.entries(mapping)) {
      if (node.children?.length) childrenMap.set(nodeId, [...node.children]);
    }
    return childrenMap;
  }

  for (const [nodeId, node] of Object.entries(mapping)) {
    const parentId = node.parent;
    if (!parentId || !mapping[parentId]) continue;
    const siblings = childrenMap.get(parentId) ?? [];
    siblings.push(nodeId);
    childrenMap.set(parentId, siblings);
  }

  for (const [parentId, childIds] of childrenMap) {
    childIds.sort((a, b) => {
      const timeA = mapping[a]?.message?.create_time ?? 0;
      const timeB = mapping[b]?.message?.create_time ?? 0;
      return timeA - timeB;
    });
    childrenMap.set(parentId, childIds);
  }

  return childrenMap;
}

function findRootIds(
  mapping: Record<string, ChatGPTMappingNode>,
  childrenMap: Map<string, string[]>,
): string[] {
  const childIds = new Set<string>();
  for (const children of childrenMap.values()) {
    for (const childId of children) childIds.add(childId);
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
  const conversationId =
    conversation.conversation_id ?? conversation.id ?? `conv-${index}`;
  const conversationTitle = conversation.title?.trim() || "Untitled conversation";
  const childrenMap = getChildrenMap(mapping);
  const messages: FlatMessage[] = [];
  const visited = new Set<string>();

  const visit = (nodeId: string) => {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);

    const node = mapping[nodeId];
    if (!node) return;

    const flat = nodeToMessage(node, conversation, conversationId, conversationTitle);
    if (flat) messages.push(flat);

    for (const childId of childrenMap.get(nodeId) ?? []) {
      visit(childId);
    }
  };

  for (const rootId of findRootIds(mapping, childrenMap)) {
    visit(rootId);
  }

  for (const nodeId of Object.keys(mapping)) {
    if (!visited.has(nodeId)) visit(nodeId);
  }

  return messages;
}

function parseConversationJson(text: string): ChatGPTConversation[] {
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    throw new Error("Could not parse JSON. Make sure this is a ChatGPT conversations export file.");
  }

  if (!Array.isArray(raw)) {
    throw new Error("Expected conversation export JSON to be an array of conversations.");
  }

  return raw as ChatGPTConversation[];
}

function sortConversationJsonPaths(paths: string[]): string[] {
  return [...paths].sort((a, b) => {
    const norm = (path: string) => path.replace(/\\/g, "/");
    const na = norm(a);
    const nb = norm(b);

    const ma = na.match(/conversations-(\d+)\.json$/i);
    const mb = nb.match(/conversations-(\d+)\.json$/i);
    if (ma && mb) return Number(ma[1]) - Number(mb[1]);
    if (/conversations\.json$/i.test(na)) return -1;
    if (/conversations\.json$/i.test(nb)) return 1;
    return na.localeCompare(nb);
  });
}

function findConversationJsonPaths(zipFiles: Record<string, { dir?: boolean }>): string[] {
  const paths = Object.keys(zipFiles).filter((path) => {
    const entry = zipFiles[path];
    if (entry.dir) return false;
    return CONVERSATION_JSON_RE.test(path.replace(/\\/g, "/"));
  });

  return sortConversationJsonPaths(paths);
}

async function loadConversationsFromZip(zip: {
  files: Record<string, { dir?: boolean }>;
  file: (path: string) => { async: (type: "text") => Promise<string> } | null;
}): Promise<ChatGPTConversation[]> {
  const paths = findConversationJsonPaths(zip.files);

  if (paths.length === 0) {
    throw new Error(
      "Could not find conversation data in this zip. Look for conversations.json or conversations-000.json inside your ChatGPT export.",
    );
  }

  const conversations: ChatGPTConversation[] = [];

  for (const path of paths) {
    const entry = zip.file(path);
    if (!entry) continue;
    const text = await entry.async("text");
    conversations.push(...parseConversationJson(text));
  }

  if (conversations.length === 0) {
    throw new Error("No conversations found in this ChatGPT export.");
  }

  return conversations;
}

export class ChatGPTAdapter implements ExportAdapter {
  parse(raw: unknown): FlatMessage[] {
    if (!Array.isArray(raw)) {
      throw new Error("Expected conversation export JSON to be an array of conversations.");
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
    const conversations = parseConversationJson(await file.text());
    const messages = adapter.parse(conversations);
    return {
      messages,
      conversationCount: conversations.length,
    };
  }

  if (!lowerName.endsWith(".zip")) {
    throw new Error("Please upload your ChatGPT export .zip or a conversations JSON file.");
  }

  if (file.size > 250 * 1024 * 1024) {
    throw new Error("This file is very large. Try uploading the conversations JSON files from inside the zip.");
  }

  const JSZip = (await import("jszip")).default;
  const zip = await JSZip.loadAsync(file);
  const conversations = await loadConversationsFromZip(zip);
  const messages = adapter.parse(conversations);

  return {
    messages,
    conversationCount: conversations.length,
  };
}
