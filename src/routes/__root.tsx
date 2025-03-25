import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import logo from "../assets/logo.png";

export const rootRoute = createRootRoute({
  component: () => (
    <>
      <header className="flex flex-row justify-between w-full fixed pr-8 z-10 bg-neutral-color-2">
        <Link to="/" className="flex flex-row items-center">
          <img src={logo} className="h-16 p-1" alt="logo" />
          <p className="text-2xl text-netural-color-1">Smith Avenue Insights</p>
        </Link>
        <div className="flex flex-row items-center gap-4">
          <Link
            to="/pricing"
            className="text-neutral-color-1 bg-neutral-color-2 hover:bg-neutral-color-1/10 transition-colors duration-200 font-medium py-2 px-4 rounded-lg border-2 border-neutral-color-1 shadow-sm"
          >
            Pricing
          </Link>
          <Link
            to="/about"
            className="text-neutral-color-1 bg-neutral-color-2 hover:bg-neutral-color-1/10 transition-colors duration-200 font-medium py-2 px-4 rounded-lg border-2 border-neutral-color-1 shadow-sm"
          >
            About Us
          </Link>
          <Link
            to="/demo"
            className="text-neutral-color-2 bg-neutral-color-1 hover:bg-neutral-color-1/90 transition-colors duration-200 font-medium py-2 px-4 rounded-lg border-2 border-neutral-color-1 shadow-sm"
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
