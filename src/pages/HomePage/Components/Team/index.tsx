import duncanMeyerProfilePic from "../../../../assets/duncanMeyerProfile.jpg";
import dylanMorozowskiProfilePic from "../../../../assets/dylanMorozowskiProfile.jpg";
import GermayneCurryProfilePic from "../../../../assets/GermayneCurryProfile.jpg";
import willMcKinneyProfilePic from "../../../../assets/willMckinneyProfile.jpg";
import { SummitCard } from "../../../../components/Summit/SummitCard";

const teamList = [
  {
    name: "William McKinney",
    bio: "William brings extensive expertise in software development and consulting, with a strong focus on building scalable solutions. His experience spans across full-stack development, cloud architecture, and technical leadership.",
    profilePicture: willMcKinneyProfilePic,
    role: "Technical Lead", // Added for context if needed, or just display name
  },
  {
    name: "Dylan Morozowski",
    bio: "Dylan is a seasoned software developer and AWS certified professional, specializing in cloud architecture and data analytics. He helps organizations optimize their data infrastructure and implement cutting-edge analytics solutions.",
    profilePicture: dylanMorozowskiProfilePic,
    role: "Cloud Architect",
  },
  {
    name: "Duncan Meyer",
    bio: "Duncan is a skilled software engineer with a proven track record in developing robust applications and leading teams. His expertise in modern development practices and agile methodologies drives business growth.",
    profilePicture: duncanMeyerProfilePic,
    role: "Software Engineer",
  },
  {
    name: "Germayne Curry",
    bio: "Germayne connects businesses with tailored software solutions that help them move faster and operate smarter. His unique blend of background and skills allows him to understand complex problems and deliver impactful solutions.",
    profilePicture: GermayneCurryProfilePic,
    role: "Solutions Architect",
  },
];

export const Team = () => {
  return (
    <section className="bg-deep-horizon py-20 sm:py-32 px-4 sm:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white">
            The Team
          </h2>
          <p className="text-xl text-granite/70 max-w-2xl mx-auto">
            Expert climbers guiding your ascent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamList.map((teamMember) => (
            <SummitCard
              key={teamMember.name}
              className="flex flex-col items-center text-center p-6 h-full hover:bg-atmospheric-haze/90 transition-colors"
            >
              <div className="w-32 h-32 mb-6 rounded-full p-1 bg-gradient-to-br from-golden-hour-start to-golden-hour-end shadow-lg">
                <img
                  src={teamMember.profilePicture}
                  alt={teamMember.name}
                  loading="eager"
                  className={`w-full h-full object-cover rounded-full border-4 border-deep-horizon ${
                    teamMember.name === "Germayne Curry"
                      ? "object-[center_10%]"
                      : "object-center"
                  }`}
                />
              </div>

              <h3 className="font-display font-bold text-xl text-white mb-2">
                {teamMember.name}
              </h3>
              {/* <p className="text-golden-hour-start text-sm font-bold uppercase tracking-wider mb-4">{teamMember.role}</p> */}

              <p className="font-sans text-sm text-granite/70 leading-relaxed">
                {teamMember.bio}
              </p>
            </SummitCard>
          ))}
        </div>
      </div>
    </section>
  );
};
