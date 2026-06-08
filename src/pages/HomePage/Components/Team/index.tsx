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
    <section className="bg-blueprint-base py-20 sm:py-32 px-4 sm:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-2cell space-y-4 max-w-2xl">
          <h2 className="font-display font-extrabold text-display-2 text-chalk">
            The crew
          </h2>
          <p className="text-body text-chalk/70">
            The people who build it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamList.map((teamMember) => (
            <BlueprintCard
              key={teamMember.name}
              className="flex flex-col items-center text-center p-6 h-full hover:bg-drafting-surface/90 transition-colors"
            >
              <div className="w-32 h-32 mb-6 rounded-full p-1 bg-white shadow-lg">
                <img
                  src={teamMember.profilePicture}
                  alt={teamMember.name}
                  loading="eager"
                  className={`w-full h-full object-cover rounded-full border-4 border-blueprint-base ${
                    teamMember.name === "Germayne Curry"
                      ? "object-[center_10%]"
                      : "object-center"
                  }`}
                />
              </div>

              <h3 className="font-display font-bold text-xl text-chalk mb-2">
                {teamMember.name}
              </h3>
              {/* <p className="text-marker-start text-sm font-bold uppercase tracking-wider mb-4">{teamMember.role}</p> */}

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
