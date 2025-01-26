import duncanMeyerProfilePic from "../../../../assets/duncanMeyerProfile.jpg";
import dylanMorozowskiProfilePic from "../../../../assets/dylanMorozowskiProfile.jpg";
import willMcKinneyProfilePic from "../../../../assets/willMckinneyProfile.jpg";

const teamList = [
  {
    name: "William McKinney",
    bio: "William McKinney is a super cool guy. He is an expert at a lot of cool stuff. He is passionate about things and loves doing normal stuff in his free time. William McKinney is a super cool guy. He is an expert at a lot of cool stuff. He is passionate about things and loves doing normal stuff in his free time. William McKinney is a super cool guy. He is an expert at a lot of cool stuff. He is passionate about things and loves doing normal stuff in his free time.",
    profilePicture: willMcKinneyProfilePic,
  },
  {
    name: "Dylan Morozowski",
    bio: "Dylan Morozowski is a super cool guy. He is an expert at a lot of cool stuff. He is passionate about things and loves doing normal stuff in his free time. Dylan Morozowski is a super cool guy. He is an expert at a lot of cool stuff. He is passionate about things and loves doing normal stuff in his free time. Dylan Morozowski is a super cool guy. He is an expert at a lot of cool stuff. He is passionate about things and loves doing normal stuff in his free time.",
    profilePicture: dylanMorozowskiProfilePic,
  },
  {
    name: "Duncan Meyer",
    bio: "Duncan Meyer is a super cool guy. He is an expert at a lot of cool stuff. He is passionate about things and loves doing normal stuff in his free time. Duncan Meyer is a super cool guy. He is an expert at a lot of cool stuff. He is passionate about things and loves doing normal stuff in his free time. Duncan Meyer is a super cool guy. He is an expert at a lot of cool stuff. He is passionate about things and loves doing normal stuff in his free time.",
    profilePicture: duncanMeyerProfilePic,
  },
];

export const Team = () => {
  return (
    <div className="bg-neutral-color-2">
      <div className="flex flex-row">
        <div className="flex flex-col items-center space-y-12 py-16 w-[100%]">
          <h1 className="text-4xl text-accent-color-1">Our Team</h1>
          <div className=" flex flex-row">
            {teamList.map((teamMember) => (
              <div
                key={teamMember.name}
                className="flex flex-col justify-between items-center text-center space-y-4 px-8 py-12 m-4 bg-secondary-color-1 rounded-lg shadow-lg"
              >
                <img
                  src={teamMember.profilePicture}
                  alt={teamMember.name}
                  className="w-40 h-40 object-cover rounded-full"
                />
                <h2 className="text-2xl text-[#00262D] font-semibold">
                  {teamMember.name}
                </h2>
                <p className="text-lg text-[#00262D] text-center">
                  {teamMember.bio}
                </p>
                <button className="bg-accent-color-1 hover:text-neutral-color-1 text-3xl px-8 py-3 rounded-full">
                  <h1 className="text-xl">Get Started</h1>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
