import {
  createEmbeddingContext,
  type EmbeddingContext,
} from "amazon-quicksight-embedding-sdk";

let contextPromise: Promise<EmbeddingContext> | null = null;

/**
 * Lazily create a single QuickSightEmbedding context for the whole app and
 * reuse it across tab switches. The SDK is fine with one context owning many
 * embedded experiences, and re-creating it would tear down event wiring.
 */
export function getEmbeddingContext(): Promise<EmbeddingContext> {
  if (!contextPromise) {
    contextPromise = createEmbeddingContext({
      onChange: (changeEvent, metadata) => {
        if (import.meta.env.DEV) {
          console.debug("[QuickSightEmbedding] change", changeEvent, metadata);
        }
      },
    });
  }
  return contextPromise;
}
