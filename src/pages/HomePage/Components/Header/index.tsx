import logo from "../../../../assets/logo.png";
export const Header = () => {
  return (
    <header className="flex flex-row justify-between w-full fixed pr-8 z-10 bg-neutral-color-2">
      <div className="flex flex-row items-center">
        <img src={logo} className="h-16 p-1" alt="logo" />
        <p className="text-2xl text-netural-color-1">Smith Avenue Insights</p>
      </div>
      <div className="flex flex-row items-center gap-4">
        <button className="text-neutral-color-1 bg-neutral-color-2 hover:text-neutral-color-1 hover:bg-neutral-color-2 h-auto py-1 px-2 rounded-lg border-2 border-neutral-color-1">
          Pricing
        </button>
        <button className="text-neutral-color-1 bg-neutral-color-2 hover:text-neutral-color-1 hover:bg-neutral-color-2 h-auto py-1 px-2 rounded-lg border-2 border-neutral-color-1">
          About Us
        </button>
        <button className="text-neutral-color-2 bg-neutral-color-1 hover:text-neutral-color-1 hover:bg-neutral-color-2 h-auto py-1 px-3 rounded-lg border-2 border-neutral-color-1">
          Request Demo
        </button>
      </div>
    </header>
  );
};
