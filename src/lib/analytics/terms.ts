import { STOPWORDS } from "../../data/stopwords";
import type { FlatMessage } from "../parse/types";

export type TermCount = {
  term: string;
  count: number;
  score: number;
};

const FILLER_TERMS = new Set([
  "week",
  "help",
  "need",
  "write",
  "please",
  "want",
  "make",
  "using",
  "like",
  "just",
  "good",
  "best",
  "sure",
  "thanks",
  "thank",
  "could",
  "would",
  "should",
  "give",
  "show",
  "tell",
  "explain",
  "create",
  "build",
  "look",
  "looking",
  "work",
  "working",
  "file",
  "files",
  "list",
  "update",
  "updated",
  "version",
  "prompt",
  "chatgpt",
  "assistant",
  "question",
  "answer",
  "following",
  "below",
  "above",
  "here",
  "there",
  "this",
  "that",
  "these",
  "those",
  "into",
  "from",
  "with",
  "without",
  "about",
  "through",
  "across",
  "between",
  "under",
  "over",
  "again",
  "maybe",
  "someone",
  "something",
  "anything",
  "everything",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2 && !STOPWORDS.has(token) && !FILLER_TERMS.has(token));
}

export function computeTopTerms(messages: FlatMessage[], limit = 8): TermCount[] {
  const userMessages = messages.filter((m) => m.role === "user");
  const counts = new Map<string, number>();
  const docFreq = new Map<string, number>();

  userMessages.forEach((message) => {
    const uniqueInMessage = new Set(tokenize(message.text));
    for (const token of uniqueInMessage) {
      docFreq.set(token, (docFreq.get(token) ?? 0) + 1);
    }
    for (const token of tokenize(message.text)) {
      counts.set(token, (counts.get(token) ?? 0) + 1);
    }
  });

  const totalDocs = Math.max(userMessages.length, 1);

  return [...counts.entries()]
    .map(([term, count]) => {
      const df = docFreq.get(term) ?? 1;
      const score = count * Math.log(1 + totalDocs / df);
      return { term, count, score };
    })
    .sort((a, b) => b.score - a.score || b.count - a.count)
    .slice(0, limit);
}
