import { DimensionLine } from "../../components/Blueprint/DimensionLine";
import { SpecLabel } from "../../components/Blueprint/SpecLabel";
import { BlueprintGrid } from "../../components/Blueprint/BlueprintGrid";
import { ProjectCard } from "./Components/ProjectCard";

const projects = [
  {
    title: "Image Hunter – Apollo Mapping",
    description:
      "Satellite imagery and geospatial solutions for the satellite industry. Explore high-resolution imagery, mapping tools, and discovery platforms powered by Apollo Mapping.",
    imageUrl: "/sattelite.png",
    linkUrl: "https://imagehunter.apollomapping.com/",
    technologies: ["Satellite Imagery", "Geospatial", "Web App"],
  },
  {
    title: "kontinu-ed – interactive higher education platform",
    description:
      "An interactive higher education platform for the kontinu-ed brand. Explore the platform and the features it offers.",
    imageUrl: "/book.png",
    linkUrl: "https://kontinued.com/",
    technologies: ["Web Development", "Education", "UI/UX Design"],
  },
  {
    title: "Ascent Pharmaceuticals Landing",
    description:
      "A modern, conversion-focused landing experience for pharmaceutical manufacturers showcasing facilities, product portfolio, and partnership opportunities.",
    imageUrl: "/pill.png",
    linkUrl: "/ascent-pharmaceuticals-landing",
    technologies: ["Web Development", "Brand Strategy"],
  },
  {
    title: "Construction Site Manager",
    description:
      "An interactive dashboard for construction project management with real-time KPIs, productivity tracking, and dynamic data visualization.",
    imageUrl: "/construction-cap.png",
    linkUrl: "/construction-dashboard",
    technologies: ["Data Analytics", "Web App"],
  },
  {
    title: "Real Estate Broker Dashboard",
    description:
      "A comprehensive market intelligence dashboard for real estate professionals featuring property analytics, pipeline tracking, and dynamic filtering capabilities.",
    imageUrl: "/tent.png",
    linkUrl: "/real-estate-dashboard",
    technologies: ["Data Analytics", "Web App"],
  },
  {
    title: "Security Shift Scheduler",
    description:
      "A comprehensive shift scheduling system for security personnel with user/admin views, real-time assignment management, and export capabilities.",
    imageUrl: "/lock.png",
    linkUrl: "/security-scheduling-dashboard",
    technologies: ["Custom Software Development", "Web App"],
  },
  {
    title: "Trusted Tax Company",
    description:
      "A comprehensive tax preparation dashboard featuring client management, return tracking, refund analytics, and revenue insights for tax professionals.",
    imageUrl: "/calculator.png",
    linkUrl: "/tax-company-dashboard",
    technologies: ["Data Analytics", "Web App"],
  },
  {
    title: "ACME Lifecycle — Fleet & Opportunity Radar",
    description:
      "A two-sided IT asset lifecycle demo for ACME Group. Track distributed fleets as the client, then flip to ACME's internal view to see the same data as ranked sales opportunities.",
    imageUrl: "/lock.png",
    linkUrl: "/acme-lifecycle",
    technologies: ["React", "Data Visualization", "Sales Demo"],
  },
];

export const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-blueprint-base pt-24">
      <div className="relative bg-drafting-surface py-20 border-b border-chalk/10 overflow-hidden">
        <BlueprintGrid className="opacity-20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <SpecLabel className="mb-4">recent builds</SpecLabel>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-chalk font-bold mb-6">
            Our Portfolio
          </h1>
          <DimensionLine label="jobs completed" className="max-w-xs mx-auto mb-8" />
          <div className="max-w-4xl mx-auto">
            <p className="font-sans text-xl text-chalk leading-relaxed mb-6">
              We build digital systems that hold up under load — scalable,
              maintainable, and built for the job.
            </p>
            <p className="font-sans text-lg text-chalk/70 leading-relaxed">
              Scalable. Maintainable. Built to spec.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-wrap justify-center gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} index={index + 1} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};
