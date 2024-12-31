import logo from "../../../../assets/logo.png";
export const Header = () => {
  return (
    <header className="flex flex-row bg-neutral-color-2 border-b-2 border-accent-color-1 justify-between w-full fixed pr-8">
      <div className="flex flex-row items-center">
        <img src={logo} className="h-16 p-1" alt="logo" />
        <p className="text-2xl text-netural-color-1">Smith Avenue Insights</p>
      </div>
      <div className="flex flex-row items-center">
        <button className="text-netural-color-1 hover:text-neutral-color-1 bg-accent-color-1 h-auto p-2 rounded-lg">
          Contact Us Now
        </button>
      </div>
    </header>
  );
};
