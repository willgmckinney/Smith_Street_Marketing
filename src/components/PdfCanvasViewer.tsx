import { useEffect, useState } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

GlobalWorkerOptions.workerSrc = pdfWorker;

interface PdfCanvasViewerProps {
  src: string;
  className?: string;
  /** Render scale. Defaults to 2 for crisp output on retina displays. */
  scale?: number;
}

/**
 * Renders a PDF as static page images on canvas, without the browser's
 * built-in PDF viewer chrome (toolbars, side panels, etc.).
 */
export const PdfCanvasViewer = ({
  src,
  className = "",
  scale = 2,
}: PdfCanvasViewerProps) => {
  const [pages, setPages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      setLoading(true);
      setError(null);
      setPages([]);

      try {
        const pdf = await getDocument(src).promise;
        const rendered: string[] = [];

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          if (cancelled) return;

          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          if (!context) {
            throw new Error("Could not create canvas context.");
          }

          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvasContext: context, viewport }).promise;
          rendered.push(canvas.toDataURL("image/png"));
        }

        if (!cancelled) {
          setPages(rendered);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load PDF.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void render();

    return () => {
      cancelled = true;
    };
  }, [src, scale]);

  if (loading) {
    return (
      <div
        className={`flex min-h-[480px] items-center justify-center border border-chalk/10 bg-drafting-surface/30 rounded-spec ${className}`}
      >
        <p className="font-mono text-label-mono lowercase text-chalk/45">
          loading document…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex min-h-[480px] items-center justify-center border border-chalk/10 bg-drafting-surface/30 rounded-spec ${className}`}
      >
        <p className="font-mono text-label-mono lowercase text-chalk/45">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-cell ${className}`}>
      {pages.map((pageSrc, index) => (
        <img
          key={pageSrc}
          src={pageSrc}
          alt={`Page ${index + 1}`}
          className="block w-full h-auto"
          draggable={false}
        />
      ))}
    </div>
  );
};
