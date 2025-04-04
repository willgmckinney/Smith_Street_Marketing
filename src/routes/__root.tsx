import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import logo from "../assets/logo.png";

export const rootRoute = createRootRoute({
  component: () => (
    <>
      <header className="flex flex-row justify-between w-full fixed px-3 sm:px-4 md:px-6 lg:px-8 py-2 z-10 bg-neutral-color-2">
        <Link to="/" className="flex flex-row items-center">
          <img src={logo} className="h-12 sm:h-16 p-1" alt="logo" />
          <p className="text-lg sm:text-xl md:text-2xl text-netural-color-1 hidden sm:block">
            Smith Avenue Insights
          </p>
        </Link>
        <div className="flex flex-row items-center gap-2 sm:gap-4">
          <Link
            to="/pricing"
            className="text-neutral-color-1 bg-neutral-color-2 hover:bg-neutral-color-1/10 transition-colors duration-200 font-medium text-sm sm:text-base py-1.5 sm:py-2 px-2 sm:px-4 rounded-lg border-2 border-neutral-color-1 shadow-sm whitespace-nowrap"
          >
            Pricing
          </Link>
          <Link
            to="/demo"
            className="text-neutral-color-2 bg-neutral-color-1 hover:bg-neutral-color-1/90 transition-colors duration-200 font-medium text-sm sm:text-base py-1.5 sm:py-2 px-2 sm:px-4 rounded-lg border-2 border-neutral-color-1 shadow-sm whitespace-nowrap"
          >
            Request Demo
          </Link>
        </div>
      </header>
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
