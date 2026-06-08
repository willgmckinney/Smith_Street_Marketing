import duncanMeyerProfilePic from "../../../../assets/duncanMeyerProfile.jpg";
import dylanMorozowskiProfilePic from "../../../../assets/dylanMorozowskiProfile.jpg";
import GermayneCurryProfilePic from "../../../../assets/GermayneCurryProfile.jpg";
import willMcKinneyProfilePic from "../../../../assets/willMckinneyProfile.jpg";
import { BlueprintCard } from "../../../../components/Blueprint/BlueprintCard";

const teamList = [
  {
    name: "William McKinney",
    bio: "William built the ImageHunter API for Apollo Mapping on ECS Fargate. He owns the backend: FastAPI services, Postgres, and the AWS CDK that ships them.",
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
    bio: "Duncan shipped the LillyDirect checkout and order-status pages from Figma to production. He writes the front-end in React and TypeScript and keeps it tested.",
    profilePicture: duncanMeyerProfilePic,
    role: "Software Engineer",
  },
  {
    name: "Germayne Curry",
    bio: "Germayne scopes engagements and matches them to the right build. He turns a rough problem into a clear plan with a stack, a timeline, and a number.",
    profilePicture: GermayneCurryProfilePic,
    role: "Solutions Architect",
  },
];

export const Team = () => {
  return (
    <section className="bg-blueprint-base py-3cell px-cell relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start gap-4 sm:gap-cell mb-2cell">
          <span className="font-mono text-label-mono text-marker-start mt-2">
            02
          </span>
          <div>
            <h2 className="font-display font-extrabold text-display-2 text-chalk leading-[0.95]">
              The
              <br />
              crew
            </h2>
            <p className="text-body text-chalk/70 mt-4">
              The people who build it.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-cell">
          {teamList.map((teamMember) => (
            <BlueprintCard
              key={teamMember.name}
              className="flex flex-col p-6 h-full"
            >
              <div className="aspect-square mb-6 overflow-hidden rounded-spec border border-chalk/15 bg-blueprint-base">
                <img
                  src={teamMember.profilePicture}
                  alt={teamMember.name}
                  loading="eager"
                  className={`w-full h-full object-cover grayscale contrast-[1.05] ${
                    teamMember.name === "Germayne Curry"
                      ? "object-[center_15%]"
                      : "object-[center_top]"
                  }`}
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
