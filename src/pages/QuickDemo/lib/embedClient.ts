export type EmbedExperience = "dashboard" | "qna" | "quickchat";

export interface FetchEmbedUrlParams {
  experience: EmbedExperience;
  accessToken: string;
  dashboardId?: string;
  topicId?: string;
}

export interface EmbedUrlResponse {
  embedUrl: string;
}

const DEFAULT_ENDPOINT = "/api/embed-url";

/**
 * Calls the Vercel Serverless Function that mints a one-time QuickSight embed URL
 * for the configured shared Quick Suite reader user.
 *
 * The returned URL has a 5-minute redemption window. Once the SDK loads it
 * into an iframe, the embedded session lasts for the SessionLifetimeInMinutes
 * configured server-side (we set 600 = 10 hours).
 */
export async function fetchEmbedUrl({
  experience,
  accessToken,
  dashboardId,
  topicId,
}: FetchEmbedUrlParams): Promise<string> {
  const endpoint =
    (import.meta.env.VITE_EMBED_API_URL as string | undefined) || DEFAULT_ENDPOINT;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ experience, dashboardId, topicId }),
  });

  if (!res.ok) {
    let body = "";
    try {
      body = await res.text();
    } catch {
      // ignore
    }
    throw new Error(
      `Embed URL request failed (${res.status} ${res.statusText}): ${body}`,
    );
  }

  const data = (await res.json()) as EmbedUrlResponse;
  if (!data.embedUrl) {
    throw new Error("Embed URL response was missing the embedUrl field.");
  }
  return data.embedUrl;
}
