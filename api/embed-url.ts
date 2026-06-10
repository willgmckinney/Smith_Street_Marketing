import type { VercelRequest, VercelResponse } from "@vercel/node";
import { verifyCognitoAccessToken } from "./_lib/cognito";
import {
  generateRegisteredUserEmbedUrl,
  type EmbedUrlParams,
  type ExperienceKind,
} from "./_lib/quicksight";

const KNOWN_EXPERIENCES: ReadonlySet<ExperienceKind> = new Set([
  "dashboard",
  "qna",
  "quickchat",
]);

function isValidBody(body: unknown): body is EmbedUrlParams {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  if (typeof b.experience !== "string") return false;
  if (!KNOWN_EXPERIENCES.has(b.experience as ExperienceKind)) return false;
  if (b.dashboardId !== undefined && typeof b.dashboardId !== "string") return false;
  if (b.topicId !== undefined && typeof b.topicId !== "string") return false;
  return true;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // ---- Auth: verify the Cognito access token in the Authorization header ----
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
    res.status(401).json({ error: "Missing bearer token" });
    return;
  }
  const token = authHeader.slice(7).trim();

  try {
    await verifyCognitoAccessToken(token);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Token verification failed";
    res.status(401).json({ error: "Invalid token", detail: message });
    return;
  }

  // ---- Validate body ----
  const body =
    typeof req.body === "string" ? safeJsonParse(req.body) : req.body;
  if (!isValidBody(body)) {
    res.status(400).json({
      error:
        "Invalid body. Expected { experience: 'dashboard' | 'qna' | 'quickchat', dashboardId?, topicId? }.",
    });
    return;
  }

  // ---- Mint embed URL via QuickSight SDK ----
  try {
    const embedUrl = await generateRegisteredUserEmbedUrl(body);
    res.status(200).json({ embedUrl });
  } catch (e) {
    const err = e as { name?: string; message?: string };
    console.error("GenerateEmbedUrlForRegisteredUser failed:", err);
    res.status(500).json({
      error: "GenerateEmbedUrl failed",
      code: err.name,
      message: err.message,
    });
  }
}

function safeJsonParse(s: string): unknown {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
