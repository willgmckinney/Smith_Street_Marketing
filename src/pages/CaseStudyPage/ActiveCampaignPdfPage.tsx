import { Link } from "@tanstack/react-router";
import { AssetFrame } from "../../components/Blueprint/AssetFrame";
import { BlueprintGrid } from "../../components/Blueprint/BlueprintGrid";
import { CtaSection } from "../../components/Blueprint/CtaSection";
import { DimensionLine } from "../../components/Blueprint/DimensionLine";
import { SpecLabel } from "../../components/Blueprint/SpecLabel";
import { PdfCanvasViewer } from "../../components/PdfCanvasViewer";
import { Seo } from "../../components/Seo";

const PDF_PATH = "/case-studies/activecampaign-case-study.pdf";

export const ActiveCampaignPdfPage = () => {
  return (
    <article className="min-h-screen bg-blueprint-base pt-24">
      <Seo
        title="ActiveCampaign case study (PDF)"
        description="ActiveCampaign case study PDF: how Smith Avenue Insights turned a 30-hour weekly reporting grind into a daily, automated pipeline."
        path="/case-studies/activecampaign/pdf"
      />

      <div className="relative overflow-hidden border-b border-chalk/10 bg-drafting-surface py-2cell">
        <BlueprintGrid opacity={0.55} />
        <div className="relative z-10 mx-auto max-w-7xl px-cell">
          <Link
            to="/portfolio"
            className="mb-cell inline-block font-mono text-label-mono lowercase text-chalk/50 transition-colors hover:text-marker-start"
          >
            ← the work
          </Link>
          <Link
            to="/case-studies/activecampaign"
            className="mb-cell ml-4 inline-block font-mono text-label-mono lowercase text-chalk/50 transition-colors hover:text-marker-start"
          >
            web version →
          </Link>
          <SpecLabel className="mb-cell">case study · document</SpecLabel>
          <p className="mb-3 font-mono text-label-mono lowercase text-chalk/45">
            ActiveCampaign · email marketing SaaS · marketing analytics & operations
          </p>
          <h1 className="max-w-4xl font-display text-display-2 font-extrabold leading-[0.95] text-chalk">
            150 hours recovered.
            <br />
            95% less reporting.
            <br />
            Zero manual touches.
          </h1>
          <DimensionLine
            reveal
            label="full case study document"
            className="my-cell max-w-xs"
          />
          <a
            href={PDF_PATH}
            download
            className="font-mono text-label-mono lowercase text-marker-start transition-colors hover:text-chalk"
          >
            download pdf
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-cell py-2cell">
        <AssetFrame figure={1} caption="activecampaign case study">
          <PdfCanvasViewer src={PDF_PATH} />
        </AssetFrame>
      </div>

      <CtaSection
        kicker="next step"
        headline="Want results like these?"
        body="Tell us what you are building. Most engagements start with a 30-minute scoping call, no commitment required."
        buttonLabel="Book a demo"
        to="/demo"
      />
    </article>
  );
};
