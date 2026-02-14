import { ProjectCard } from "./Components/ProjectCard";

export const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-deep-horizon pt-24">
      <div className="bg-atmospheric-haze py-20 border-b border-white/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-golden-hour-start to-golden-hour-end font-bold mb-6">
            Our Portfolio
          </h1>
          <div className="max-w-4xl mx-auto">
            <p className="font-sans text-xl text-granite leading-relaxed mb-6">
              At Smith Avenue Insights, we specialize in creating innovative
              digital solutions that drive business growth.
            </p>
            <p className="font-sans text-lg text-granite/70 leading-relaxed">
              Scalable. Maintainable. User-centric.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        {/* Projects Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          <ProjectCard
            title="Ascent Pharmaceuticals Landing"
            description="A modern, conversion-focused landing experience for pharmaceutical manufacturers showcasing facilities, product portfolio, and partnership opportunities."
            imageUrl="/pill.png"
            linkUrl="/ascent-pharmaceuticals-landing"
            technologies={["Web Development", "Brand Strategy"]}
          />
          <ProjectCard
            title="Construction Site Manager"
            description="An interactive dashboard for construction project management with real-time KPIs, productivity tracking, and dynamic data visualization."
            imageUrl="/construction-cap.png"
            linkUrl="/construction-dashboard"
            technologies={["Data Analytics", "Web App"]}
          />
          <ProjectCard
            title="Real Estate Broker Dashboard"
            description="A comprehensive market intelligence dashboard for real estate professionals featuring property analytics, pipeline tracking, and dynamic filtering capabilities."
            imageUrl="/tent.png"
            linkUrl="/real-estate-dashboard"
            technologies={["Data Analytics", "Web App"]}
          />
          <ProjectCard
            title="Security Shift Scheduler"
            description="A comprehensive shift scheduling system for security personnel with user/admin views, real-time assignment management, and export capabilities."
            imageUrl="/lock.png"
            linkUrl="/security-scheduling-dashboard"
            technologies={["Custom Software Development", "Web App"]}
          />
          <ProjectCard
            title="Trusted Tax Company"
            description="A comprehensive tax preparation dashboard featuring client management, return tracking, refund analytics, and revenue insights for tax professionals."
            imageUrl="/calculator.png"
            linkUrl="/tax-company-dashboard"
            technologies={["Data Analytics", "Web App"]}
          />
        </div>
      </div>
    </div>
  );
};
