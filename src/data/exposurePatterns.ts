export type ExposureType =
  | "Email"
  | "Phone number"
  | "API key or token"
  | "Credit card"
  | "SSN"
  | "IP address"
  | "Credentials in prose";

export type ExposurePattern = {
  type: ExposureType;
  regex: RegExp;
  luhn?: boolean;
};

export const EXPOSURE_PATTERNS: ExposurePattern[] = [
  {
    type: "Email",
    regex: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
  },
  {
    type: "Phone number",
    regex: /\b(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}\b/g,
  },
  {
    type: "API key or token",
    regex:
      /\b(?:sk-[A-Za-z0-9_-]{8,}|AKIA[0-9A-Z]{16}|ghp_[A-Za-z0-9]{20,}|Bearer\s+[A-Za-z0-9._-]{10,}|-----BEGIN(?:[\s\S]{0,40})?PRIVATE KEY-----|[A-Za-z0-9+/]{32,}={0,2})\b/g,
  },
  {
    type: "Credit card",
    regex: /\b(?:\d[ -]*?){13,16}\b/g,
    luhn: true,
  },
  {
    type: "SSN",
    regex: /\b\d{3}-\d{2}-\d{4}\b/g,
  },
  {
    type: "IP address",
    regex: /\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\b/g,
  },
  {
    type: "Credentials in prose",
    regex:
      /\b(?:password\s+is|pwd\s*:|pass\s*:|connection string|mysql:\/\/|postgres:\/\/|mongodb:\/\/)[^\s]{3,}/gi,
  },
];

export function luhnCheck(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  if (digits.length < 13 || digits.length > 16) return false;

  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let n = Number(digits[i]);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

export function redactSample(raw: string, maxVisible = 4): string {
  const trimmed = raw.trim();
  if (trimmed.length <= maxVisible * 2) {
    return "••••••••";
  }
  const start = trimmed.slice(0, maxVisible);
  const end = trimmed.slice(-maxVisible);
  return `${start}••••••••${end}`;
}
