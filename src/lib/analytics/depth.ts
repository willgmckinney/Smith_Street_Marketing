import type { FlatMessage } from "../parse/types";

export type DepthBucket = {
  label: string;
  count: number;
};

export function computeDepthDistribution(messages: FlatMessage[]): DepthBucket[] {
  const countsByConversation = new Map<string, number>();

  for (const message of messages) {
    countsByConversation.set(
      message.conversationId,
      (countsByConversation.get(message.conversationId) ?? 0) + 1,
    );
  }

  const buckets = [
    { label: "1-5", min: 1, max: 5, count: 0 },
    { label: "6-10", min: 6, max: 10, count: 0 },
    { label: "11-20", min: 11, max: 20, count: 0 },
    { label: "21-50", min: 21, max: 50, count: 0 },
    { label: "51+", min: 51, max: Infinity, count: 0 },
  ];

  for (const count of countsByConversation.values()) {
    const bucket = buckets.find((entry) => count >= entry.min && count <= entry.max);
    if (bucket) bucket.count += 1;
  }

  return buckets.map(({ label, count }) => ({ label, count }));
}
