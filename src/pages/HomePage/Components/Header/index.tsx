import logo from "../../../../assets/logo.png";
export const Header = () => {
  return (
    <header className="flex flex-row bg-[#00262D] border-b-2 border-[#bfeb4b] justify-between w-full	 fixed pr-8">
      <div className="flex flex-row items-center">
        <img src={logo} className="h-16" alt="logo" />
        <p className="text-2xl	text-white">Smith Street Solutions</p>
      </div>
      <div className="flex flex-row items-center">
        <button className="text-black hover:text-white bg-[#bfeb4b] h-auto p-2 rounded-lg">
          Contact Us Now
        </button>
      </div>
    </header>
  );
};
