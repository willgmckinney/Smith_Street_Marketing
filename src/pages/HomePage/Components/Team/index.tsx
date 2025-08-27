// import duncanMeyerProfilePic from "../../../../assets/duncanMeyerProfile.jpg";
import dylanMorozowskiProfilePic from "../../../../assets/dylanMorozowskiProfile.jpg";
import willMcKinneyProfilePic from "../../../../assets/willMckinneyProfile.jpg";

const teamList = [
  {
    name: "William McKinney",
    bio: "William McKinney brings extensive expertise in software development and consulting, with a strong focus on building scalable solutions. His experience spans across full-stack development, cloud architecture, and technical leadership. William has successfully delivered complex projects for Fortune 500 companies, demonstrating his ability to transform business requirements into innovative technical solutions.",
    profilePicture: willMcKinneyProfilePic,
  },
  {
    name: "Dylan Morozowski",
    bio: "Dylan Morozowski is a seasoned software developer and AWS certified professional, specializing in cloud architecture and data analytics. With expertise in Amazon QuickSight and cloud development, Dylan has helped numerous organizations optimize their data infrastructure and implement cutting-edge analytics solutions. His technical leadership and innovative approach drive successful digital transformations.",
    profilePicture: dylanMorozowskiProfilePic,
  },
  // {
  //   name: "Duncan Meyer",
  //   bio: "Duncan Meyer is a skilled software engineer with a proven track record in developing robust applications and leading teams. His expertise in modern development practices and agile methodologies has enabled him to deliver high-quality solutions that drive business growth. Duncan's collaborative approach and technical excellence make him an invaluable asset to any project.",
  //   profilePicture: duncanMeyerProfilePic,
  // },
];

export const Team = () => {
  return (
    <div className="bg-neutral-color-2">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col items-center space-y-8 md:space-y-12 py-8 md:py-16 w-[100%]">
          <h1 className="text-4xl md:text-6xl text-accent-color font-bold">
            About Us
          </h1>
          <div className="flex flex-col md:flex-row w-full px-4 md:px-0">
            {teamList.map((teamMember) => (
              <div
                key={teamMember.name}
                className="flex flex-col justify-between items-center text-center space-y-4 px-4 md:px-8 py-8 md:py-12 m-2 md:m-4 bg-neutral-color-1 rounded-lg shadow-lg w-full md:w-auto"
              >
                <img
                  src={teamMember.profilePicture}
                  alt={teamMember.name}
                  className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full"
                />
                <h2 className="text-xl md:text-2xl text-[#00262D] font-semibold">
                  {teamMember.name}
                </h2>
                <p className="text-base md:text-lg text-[#00262D] text-center">
                  {teamMember.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
