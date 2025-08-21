import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import logo from "../assets/logo.png";
import Footer from "../components/Footer";

export const rootRoute = createRootRoute({
  component: () => (
    <div className="flex flex-col min-h-screen">
      <header className="flex flex-row justify-between w-full fixed px-3 sm:px-4 md:px-6 lg:px-8 py-2 z-10 bg-neutral-color-2">
        <Link to="/" className="flex flex-row items-center">
          <img src={logo} className="h-12 sm:h-16 p-1" alt="logo" />
          <p className="text-lg sm:text-xl md:text-2xl text-netural-color-1 hidden sm:block">
            Smith Avenue Insights
          </p>
        </Link>
        <div className="flex flex-row items-center gap-2 sm:gap-4">
          <Link
            to="/portfolio"
            className="text-tirtiary-color bg-neutral-color-2 hover:bg-tirtiary-color/10 transition-colors duration-200 font-medium text-sm sm:text-base py-1.5 sm:py-2 px-2 sm:px-4 rounded-lg border-2 border-tirtiary-color shadow-sm whitespace-nowrap"
          >
            Portfolio
          </Link>
          <Link
            to="/pricing"
            className="text-tirtiary-color bg-neutral-color-2 hover:bg-tirtiary-color/10 transition-colors duration-200 font-medium text-sm sm:text-base py-1.5 sm:py-2 px-2 sm:px-4 rounded-lg border-2 border-tirtiary-color shadow-sm whitespace-nowrap"
          >
            Pricing
          </Link>
          <Link
            to="/demo"
            className="text-neutral-color-2 bg-tirtiary-color hover:bg-tirtiary-color/90 transition-colors duration-200 font-medium text-sm sm:text-base py-1.5 sm:py-2 px-2 sm:px-4 rounded-lg border-2 border-tirtiary-color shadow-sm whitespace-nowrap"
          >
            Get Started
          </Link>
        </div>
      </header>

      <Outlet />

      <Footer />
    </div>
  ),
});
