import { TOPIC_DEFINITIONS, type TopicCategory } from "../../data/topicDictionaries";
import type { FlatMessage } from "../parse/types";

export type TopicSlice = {
  category: TopicCategory;
  count: number;
  percent: number;
  color: string;
  compliance: boolean;
};

export type TopicBreakdown = {
  slices: TopicSlice[];
  ranked: TopicSlice[];
  topCategory: TopicCategory;
};

function scoreMessage(text: string): { category: TopicCategory; score: number } {
  const lower = text.toLowerCase();
  let best: TopicCategory = "Other";
  let bestScore = 0;

  for (const topic of TOPIC_DEFINITIONS) {
    if (topic.id === "Other") continue;
    let score = 0;
    for (const keyword of topic.keywords) {
      if (lower.includes(keyword)) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = topic.id;
    }
  }

  return { category: bestScore > 0 ? best : "Other", score: bestScore };
}

export function computeTopics(messages: FlatMessage[]): TopicBreakdown {
  const userMessages = messages.filter((m) => m.role === "user");
  const counts = new Map<TopicCategory, number>();

  for (const topic of TOPIC_DEFINITIONS) {
    counts.set(topic.id, 0);
  }

  for (const message of userMessages) {
    const { category } = scoreMessage(message.text);
    counts.set(category, (counts.get(category) ?? 0) + 1);
  }

  const total = userMessages.length || 1;
  const slices: TopicSlice[] = TOPIC_DEFINITIONS.map((topic) => {
    const count = counts.get(topic.id) ?? 0;
    return {
      category: topic.id,
      count,
      percent: Math.round((count / total) * 100),
      color: topic.color,
      compliance: topic.compliance,
    };
  }).filter((slice) => slice.count > 0);

  const ranked = [...slices].sort((a, b) => b.count - a.count);
  const topCategory = ranked[0]?.category ?? "Other";

  return { slices, ranked, topCategory };
}
