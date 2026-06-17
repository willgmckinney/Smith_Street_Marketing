export const AI_PROVIDERS = [
  "chatgpt",
  "claude",
  "gemini",
  "copilot",
  "amazon_quick",
] as const;

export type AiProvider = (typeof AI_PROVIDERS)[number];

export const AI_PROVIDER_LABELS: Record<AiProvider, string> = {
  chatgpt: "ChatGPT",
  claude: "Claude",
  gemini: "Google Gemini",
  copilot: "Microsoft Copilot",
  amazon_quick: "Amazon Quick",
};

const HUBSPOT_OPTION_IDS: Record<string, AiProvider> = {
  koKqQ63o46y2yuGuyKkN0: "chatgpt",
  OJs8a78lKbE5vBqSi2x7n: "claude",
  BFLFLkz6FbIoGZTcVS4vf: "gemini",
  gdx26u16VYTWMLjtT8Zb_: "copilot",
  yvHVznKrEX5As8ERoI1_Z: "amazon_quick",
};

export function normalizeAiProvider(raw: string | undefined | null): AiProvider | undefined {
  if (!raw) return undefined;

  const trimmed = raw.trim();
  if (!trimmed) return undefined;

  if (HUBSPOT_OPTION_IDS[trimmed]) {
    return HUBSPOT_OPTION_IDS[trimmed];
  }

  const value = trimmed.toLowerCase();

  if (AI_PROVIDERS.includes(value as AiProvider)) {
    return value as AiProvider;
  }

  if (value.includes("chatgpt") || value.includes("openai")) return "chatgpt";
  if (value.includes("claude") || value.includes("anthropic")) return "claude";
  if (value.includes("gemini") || value.includes("google")) return "gemini";
  if (value.includes("copilot") || value.includes("microsoft")) return "copilot";
  if (value.includes("quick") || value.includes("amazon")) return "amazon_quick";

  return undefined;
}

function splitHubSpotMultiValue(raw: string): string[] {
  return raw
    .split(/[;,]/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function normalizeAiProviders(
  raw: string | string[] | undefined | null,
): AiProvider[] {
  const parts = Array.isArray(raw)
    ? raw
    : typeof raw === "string"
      ? splitHubSpotMultiValue(raw)
      : [];

  const providers = parts
    .map((part) => normalizeAiProvider(part))
    .filter((provider): provider is AiProvider => provider !== undefined);

  return [...new Set(providers)];
}
