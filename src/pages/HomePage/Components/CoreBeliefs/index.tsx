const coreBeliefList = [
  {
    subtitle: "Belief #01",
    title: "Innovation is two sided",
  },
  {
    subtitle: "Belief #02",
    title: "Data over opinions",
  },
  {
    subtitle: "Belief #03",
    title: "Great demands debate",
  },
  {
    subtitle: "Belief #04",
    title: "To go far, go together",
  },
  {
    subtitle: "Belief #05",
    title: "Ideas are easy, impact is hard",
  },
];

export const CoreBeliefs = () => {
  return (
    <div>
      <div className="flex flex-row justify-between bg-[#00262D] px-14">
        {coreBeliefList.map((coreBelief) => (
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-3xl text-[#bfeb4b]">{coreBelief.subtitle}</h1>
            <p className="text-4xl text-white">{coreBelief.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
