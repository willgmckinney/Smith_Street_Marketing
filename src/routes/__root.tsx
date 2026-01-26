import { createRootRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import Footer from "../components/Footer";
import { SummitButton } from "../components/Summit/SummitButton";

export const rootRoute = createRootRoute({
  component: () => {
    const [scrolled, setScrolled] = useState(false);
    const [solutionsOpen, setSolutionsOpen] = useState(false);
    const location = useLocation();
    const isShopifyPage = location.pathname === "/shopify-profit-recovery";

    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 20);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.solutions-dropdown')) {
          setSolutionsOpen(false);
        }
      };

      if (solutionsOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [solutionsOpen]);

    return (
      <div className="flex flex-col min-h-screen bg-deep-horizon text-granite font-sans">
        <header
          className={`
            fixed top-0 left-0 right-0 z-50 transition-all duration-300
            px-4 sm:px-6 lg:px-8 py-4
            flex items-center justify-between
            ${scrolled ? "bg-deep-horizon/80 backdrop-blur-md border-b border-white/10 shadow-lg" : "bg-transparent"}
          `}
        >
          <Link to="/" className="flex flex-row items-center gap-3 group">
            <img
              src={logo}
              className="h-10 sm:h-12 w-auto transition-transform duration-300 group-hover:scale-110"
              alt="Smith Avenue Insights Logo"
            />
            <p className="font-display font-bold text-lg sm:text-xl md:text-2xl text-white hidden sm:block tracking-tight">
              Smith Avenue Insights
            </p>
          </Link>

          <nav className="flex items-center gap-2 sm:gap-4">
            <div className="relative solutions-dropdown">
              <SummitButton
                variant="secondary"
                size="sm"
                className={`bg-transparent border-transparent shadow-none hover:bg-white/10 ${
                  isShopifyPage ? "text-golden-hour-start" : "text-granite"
                }`}
                onClick={() => setSolutionsOpen(!solutionsOpen)}
                onMouseEnter={() => setSolutionsOpen(true)}
              >
                Solutions
                <svg
                  className={`ml-1 h-4 w-4 inline-block transition-transform duration-200 ${
                    solutionsOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </SummitButton>

              {solutionsOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-48 bg-atmospheric-haze rounded-lg border border-white/10 shadow-lg overflow-hidden z-50"
                  onMouseLeave={() => setSolutionsOpen(false)}
                >
                  <Link
                    to="/shopify-profit-recovery"
                    className={`block px-4 py-3 transition-colors duration-200 ${
                      isShopifyPage
                        ? "bg-white/10 text-golden-hour-start"
                        : "text-granite hover:bg-white/10 hover:text-golden-hour-start"
                    }`}
                    onClick={() => setSolutionsOpen(false)}
                  >
                    Shopify
                  </Link>
                </div>
              )}
            </div>

            <Link to="/portfolio">
              {({ isActive }) => (
                <SummitButton
                  variant="secondary"
                  size="sm"
                  className={`bg-transparent border-transparent shadow-none hover:bg-white/10 ${isActive ? "text-golden-hour-start" : "text-granite"}`}
                >
                  Portfolio
                </SummitButton>
              )}
            </Link>

            <Link to="/pricing">
              {({ isActive }) => (
                <SummitButton
                  variant="secondary"
                  size="sm"
                  className={`bg-transparent border-transparent shadow-none hover:bg-white/10 ${isActive ? "text-golden-hour-start" : "text-granite"}`}
                >
                  Pricing
                </SummitButton>
              )}
            </Link>

            <Link to="/blog">
              {({ isActive }) => (
                <SummitButton
                  variant="secondary"
                  size="sm"
                  className={`bg-transparent border-transparent shadow-none hover:bg-white/10 ${isActive ? "text-golden-hour-start" : "text-granite"}`}
                >
                  Insights
                </SummitButton>
              )}
            </Link>

            <Link to="/demo">
              <SummitButton size="sm" className="hidden sm:flex">
                Get Started
              </SummitButton>
              {/* Mobile Icon Button */}
              <div className="sm:hidden bg-golden-gradient p-2 rounded-full text-deep-horizon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </Link>
          </nav>
        </header>

        <main className="flex-grow">
          <Outlet />
        </main>

        <Footer />
      </div>
    );
  },
});
