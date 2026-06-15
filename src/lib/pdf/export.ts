import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const PDF_WIDTH_PX = 720;

export async function exportReportPdf(container: HTMLElement, filename: string): Promise<void> {
  const canvas = await html2canvas(container, {
    scale: 2,
    backgroundColor: "#F4F3EF",
    useCORS: true,
    width: PDF_WIDTH_PX,
    windowWidth: PDF_WIDTH_PX,
  });

  const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 18;
  const maxWidth = pageWidth - margin * 2;
  const maxHeight = pageHeight - margin * 2;

  const imgData = canvas.toDataURL("image/png");
  let renderWidth = maxWidth;
  let renderHeight = (canvas.height * renderWidth) / canvas.width;

  if (renderHeight > maxHeight) {
    renderHeight = maxHeight;
    renderWidth = (canvas.width * renderHeight) / canvas.height;
  }

  const x = margin + (maxWidth - renderWidth) / 2;
  const y = margin + (maxHeight - renderHeight) / 2;

  pdf.addImage(imgData, "PNG", x, y, renderWidth, renderHeight);
  pdf.save(filename);
}

export function buildPdfFilename(date: string): string {
  return `smith-ave-ai-snapshot-${date}.pdf`;
}

export const PDF_EXPORT_WIDTH_PX = PDF_WIDTH_PX;
