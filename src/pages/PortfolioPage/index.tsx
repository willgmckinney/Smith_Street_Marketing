import { ProjectCard } from "./Components/ProjectCard";

export const PortfolioPage = () => {
  return (
    <div className="bg-neutral-color-2 min-h-screen pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Introduction Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-tirtiary-color mb-6">
            Our Portfolio
          </h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-tirtiary-color mb-6 leading-relaxed">
              At Smith Avenue Insights, we specialize in creating innovative
              digital solutions that drive business growth and enhance user
              experiences. Our approach combines cutting-edge technology with
              strategic thinking to deliver projects that not only meet but
              exceed expectations.
            </p>
            <p className="text-lg md:text-xl text-tirtiary-color leading-relaxed">
              We believe in building solutions that are scalable, maintainable,
              and user-centric. Each project reflects our commitment to quality,
              innovation, and delivering measurable results for our clients.
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          <ProjectCard
            title="Construction Site Manager"
            description="An interactive dashboard for construction project management with real-time KPIs, productivity tracking, and dynamic data visualization."
            imageUrl="/construction-hardhat.svg"
            linkUrl="/construction-dashboard"
            technologies={["HTML5", "JavaScript", "Chart.js", "Tailwind CSS"]}
          />
          <ProjectCard
            title="Real Estate Broker Dashboard"
            description="A comprehensive market intelligence dashboard for real estate professionals featuring property analytics, pipeline tracking, and dynamic filtering capabilities."
            imageUrl="/real-estate-house.svg"
            linkUrl="/real-estate-dashboard"
            technologies={["HTML5", "JavaScript", "Chart.js", "CSS3"]}
          />
          <ProjectCard
            title="Security Shift Scheduler"
            description="A comprehensive shift scheduling system for security personnel with user/admin views, real-time assignment management, and export capabilities."
            imageUrl="/security-shield.svg"
            linkUrl="/security-scheduling-dashboard"
            technologies={["HTML5", "JavaScript", "Tailwind", "LocalStorage"]}
          />
          <ProjectCard
            title="Trusted Tax Company"
            description="A comprehensive tax preparation dashboard featuring client management, return tracking, refund analytics, and revenue insights for tax professionals."
            imageUrl="/tax-calculator.svg"
            linkUrl="/tax-company-dashboard"
            technologies={["HTML5", "JavaScript", "Chart.js", "Tailwind CSS"]}
          />
        </div>
      </div>
    </div>
  );
};
