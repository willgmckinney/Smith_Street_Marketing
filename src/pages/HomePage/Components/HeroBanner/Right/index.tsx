import computerGIF from "../../../../../assets/computerGraphic.gif";
export const Right = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#00262D] text-white w-1/2">
      <img className="h-auto w-2/3" src={computerGIF} alt="" />
    </div>
  );
};
