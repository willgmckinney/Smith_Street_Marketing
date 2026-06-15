import {
  EXPOSURE_PATTERNS,
  luhnCheck,
  redactSample,
  type ExposureType,
} from "../../data/exposurePatterns";
import type { FlatMessage } from "../parse/types";

export type ExposureHit = {
  type: ExposureType;
  count: number;
  samples: string[];
};

export type ExposureResult = {
  /** Total pattern matches across all user prompts (headline number). */
  totalDetections: number;
  headlineCount: number;
  /** Distinct user prompts that contained at least one match. */
  flaggedPromptCount: number;
  hits: ExposureHit[];
};

function collectMatches(text: string, pattern: (typeof EXPOSURE_PATTERNS)[number]): string[] {
  const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
  const matches: string[] = [];
  let match: RegExpExecArray | null = regex.exec(text);

  while (match) {
    const value = match[0];
    if (pattern.luhn && !luhnCheck(value)) {
      match = regex.exec(text);
      continue;
    }
    matches.push(value);
    if (!pattern.regex.global) break;
    match = regex.exec(text);
  }

  return matches;
}

export function computeExposure(messages: FlatMessage[]): ExposureResult {
  const userMessages = messages.filter((m) => m.role === "user");
  const hitsByType = new Map<ExposureType, { count: number; samples: Set<string> }>();
  const flaggedMessages = new Set<number>();

  for (const pattern of EXPOSURE_PATTERNS) {
    hitsByType.set(pattern.type, { count: 0, samples: new Set() });
  }

  userMessages.forEach((message, index) => {
    let flagged = false;
    for (const pattern of EXPOSURE_PATTERNS) {
      const matches = collectMatches(message.text, pattern);
      if (matches.length === 0) continue;

      flagged = true;
      const bucket = hitsByType.get(pattern.type)!;
      bucket.count += matches.length;
      for (const sample of matches.slice(0, 3)) {
        if (bucket.samples.size < 3) {
          bucket.samples.add(redactSample(sample));
        }
      }
    }
    if (flagged) flaggedMessages.add(index);
  });

  const hits: ExposureHit[] = [...hitsByType.entries()]
    .map(([type, data]) => ({
      type,
      count: data.count,
      samples: [...data.samples],
    }))
    .filter((hit) => hit.count > 0)
    .sort((a, b) => b.count - a.count);

  const totalDetections = hits.reduce((sum, hit) => sum + hit.count, 0);

  return {
    totalDetections,
    headlineCount: totalDetections,
    flaggedPromptCount: flaggedMessages.size,
    hits,
  };
}
