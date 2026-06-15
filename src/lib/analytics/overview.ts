import type { FlatMessage } from "../parse/types";

export type OverviewStats = {
  totalConversations: number;
  totalMessages: number;
  userMessages: number;
  assistantMessages: number;
  dateRangeStart: string | null;
  dateRangeEnd: string | null;
  daysActive: number;
  avgMessagesPerConversation: number;
  longestConversationMessages: number;
  longestConversationTitle: string;
};

function formatDate(unixSeconds: number): string {
  return new Date(unixSeconds * 1000).toISOString().slice(0, 10);
}

function dayKey(unixSeconds: number): string {
  return formatDate(unixSeconds);
}

export function computeOverview(messages: FlatMessage[]): OverviewStats {
  const conversationIds = new Set(messages.map((m) => m.conversationId));
  const userMessages = messages.filter((m) => m.role === "user");
  const assistantMessages = messages.filter((m) => m.role === "assistant");

  const timestamps = messages
    .map((m) => m.timestamp)
    .filter((t): t is number => typeof t === "number" && Number.isFinite(t));

  const activeDays = new Set(
    userMessages
      .map((m) => m.timestamp)
      .filter((t): t is number => typeof t === "number")
      .map(dayKey),
  );

  const countsByConversation = new Map<string, { count: number; title: string }>();
  for (const message of messages) {
    const existing = countsByConversation.get(message.conversationId) ?? {
      count: 0,
      title: message.conversationTitle,
    };
    existing.count += 1;
    countsByConversation.set(message.conversationId, existing);
  }

  let longestConversationMessages = 0;
  let longestConversationTitle = "Untitled conversation";
  for (const entry of countsByConversation.values()) {
    if (entry.count > longestConversationMessages) {
      longestConversationMessages = entry.count;
      longestConversationTitle = entry.title;
    }
  }

  const sortedTimestamps = [...timestamps].sort((a, b) => a - b);

  return {
    totalConversations: conversationIds.size,
    totalMessages: messages.length,
    userMessages: userMessages.length,
    assistantMessages: assistantMessages.length,
    dateRangeStart: sortedTimestamps[0] ? formatDate(sortedTimestamps[0]) : null,
    dateRangeEnd: sortedTimestamps.length
      ? formatDate(sortedTimestamps[sortedTimestamps.length - 1])
      : null,
    daysActive: activeDays.size,
    avgMessagesPerConversation:
      conversationIds.size > 0
        ? Math.round((messages.length / conversationIds.size) * 10) / 10
        : 0,
    longestConversationMessages,
    longestConversationTitle,
  };
}
