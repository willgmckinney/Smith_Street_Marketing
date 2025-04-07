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
];

export const CoreBeliefs = () => {
  return (
    <div>
      <div className="flex flex-row justify-between bg-neutral-color-2 px-[10%]">
        {coreBeliefList.map((coreBelief) => (
          <div className="flex flex-col items-center space-y-4">
            <h1 className="text-4xl text-accent-color-1">
              {coreBelief.subtitle}
            </h1>
            <p className="text-4xl tirtiary-color pb-2">{coreBelief.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
