import duncanMeyerProfilePic from "../../../../assets/duncanMeyerProfile.jpg";
import dylanMorozowskiProfilePic from "../../../../assets/dylanMorozowskiProfile.jpg";
import GermayneCurryProfilePic from "../../../../assets/GermayneCurryProfile.jpg";
import willMcKinneyProfilePic from "../../../../assets/willMckinneyProfile.jpg";
import { BlueprintCard } from "../../../../components/Blueprint/BlueprintCard";
import { SpecLabel } from "../../../../components/Blueprint/SpecLabel";

const teamList = [
  {
    name: "William McKinney",
    bio: "William leads backend and cloud delivery: APIs on ECS Fargate, Postgres, and the AWS CDK that ships them.",
    profilePicture: willMcKinneyProfilePic,
    role: "Technical Lead",
  },
  {
    name: "Dylan Morozowski",
    bio: "Dylan built the satellite imagery lakehouse for Airbus on Glue and Redshift. AWS certified, he designs the data infrastructure that reporting runs on.",
    profilePicture: dylanMorozowskiProfilePic,
    role: "Cloud Architect",
  },
  {
    name: "Duncan Meyer",
    bio: "Duncan models data and ships analysis pipelines teams actually use. He works in Python and SQL and turns messy inputs into clear metrics.",
    profilePicture: duncanMeyerProfilePic,
    role: "Data Science Lead",
  },
  {
    name: "Germayne Curry",
    bio: "Germayne runs sales and brings engagements from first conversation to signed scope. He matches the problem to the right team and keeps delivery aligned with what the client needs.",
    profilePicture: GermayneCurryProfilePic,
    role: "Head of Sales",
  },
];

export const Team = () => {
  return (
    <section className="bg-blueprint-base py-3cell px-cell relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-2cell">
          <SpecLabel className="mb-cell">the team</SpecLabel>
          <h2 className="font-display font-extrabold text-display-2 text-chalk leading-[0.95]">
            The
            <br />
            crew
          </h2>
          <p className="text-body text-chalk/70 mt-4 max-w-xl">
            Every engagement is staffed by the same people you see here. No
            offshore handoffs. No bait and switch.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-cell">
          {teamList.map((teamMember) => (
            <BlueprintCard
              key={teamMember.name}
              className="flex flex-col p-6 h-full"
            >
              <div className="group relative aspect-square mb-6 overflow-hidden rounded-spec border border-chalk/15 bg-blueprint-base">
                <img
                  src={teamMember.profilePicture}
                  alt={`${teamMember.name}, ${teamMember.role}, Smith Avenue Insights`}
                  loading="eager"
                  className={`w-full h-full object-cover grayscale contrast-[1.05] transition duration-300 group-hover:grayscale-0 group-hover:contrast-100 ${
                    teamMember.name === "Germayne Curry"
                      ? "object-[center_15%]"
                      : "object-[center_top]"
                  }`}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-marker-start opacity-0 mix-blend-color transition-opacity duration-300 group-hover:opacity-30"
                />
              </div>

              <h3 className="font-display font-bold text-h text-chalk mb-1">
                {teamMember.name}
              </h3>
              <p className="font-mono text-label-mono text-marker-start lowercase mb-3">
                {teamMember.role}
              </p>

              <p className="font-sans text-sm text-chalk/70 leading-relaxed">
                {teamMember.bio}
              </p>
            </BlueprintCard>
          ))}
        </div>
      </div>
    </section>
  );
};
