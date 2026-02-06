import {
  createRootRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import Footer from "../components/Footer";
import { SummitButton } from "../components/Summit/SummitButton";

export const rootRoute = createRootRoute({
  component: () => {
    const [scrolled, setScrolled] = useState(false);
    const [solutionsOpen, setSolutionsOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
    const location = useLocation();
    const isShopifyPage = location.pathname === "/shopify-profit-recovery";
    const isAgenticBIPage = location.pathname === "/agentic-bi";
    const isSolutionsPage = isShopifyPage || isAgenticBIPage;

    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 20);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
      setMobileMenuOpen(false);
      setMobileSolutionsOpen(false);
    }, [location.pathname]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
      if (mobileMenuOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, [mobileMenuOpen]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest(".solutions-dropdown")) {
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
            ${scrolled || mobileMenuOpen ? "bg-deep-horizon/80 backdrop-blur-md border-b border-white/10 shadow-lg" : "bg-transparent"}
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 sm:gap-4">
            <div className="relative solutions-dropdown">
              <SummitButton
                variant="secondary"
                size="sm"
                className={`bg-transparent border-transparent shadow-none hover:bg-white/10 ${
                  isSolutionsPage ? "text-golden-hour-start" : "text-granite"
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
                  className="absolute top-full left-0 mt-2 w-56 bg-atmospheric-haze rounded-lg border border-white/10 shadow-lg overflow-hidden z-50"
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
                    Shopify Profit Recovery
                  </Link>
                  <Link
                    to="/agentic-bi"
                    className={`block px-4 py-3 transition-colors duration-200 ${
                      isAgenticBIPage
                        ? "bg-white/10 text-golden-hour-start"
                        : "text-granite hover:bg-white/10 hover:text-golden-hour-start"
                    }`}
                    onClick={() => setSolutionsOpen(false)}
                  >
                    Agentic BI Migration
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
              <SummitButton size="sm">Get Started</SummitButton>
            </Link>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden relative z-50 p-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="h-6 w-6 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </header>

        {/* Mobile Menu Overlay */}
        <div
          className={`
            fixed inset-0 z-40 md:hidden transition-opacity duration-300
            ${mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
          `}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-deep-horizon/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Panel */}
          <nav
            className={`
              absolute top-0 right-0 h-full w-72 max-w-[80vw]
              bg-deep-horizon border-l border-white/10 shadow-2xl
              pt-24 pb-8 px-6
              transition-transform duration-300 ease-in-out
              ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}
              overflow-y-auto
            `}
          >
            <div className="flex flex-col gap-1">
              {/* Solutions Accordion */}
              <button
                className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-left font-semibold transition-colors duration-200 ${
                  isSolutionsPage
                    ? "text-golden-hour-start bg-white/5"
                    : "text-white hover:bg-white/5"
                }`}
                onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
              >
                Solutions
                <svg
                  className={`h-4 w-4 transition-transform duration-200 ${
                    mobileSolutionsOpen ? "rotate-180" : ""
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
              </button>

              <div
                className={`overflow-hidden transition-all duration-200 ${
                  mobileSolutionsOpen ? "max-h-40" : "max-h-0"
                }`}
              >
                <Link
                  to="/shopify-profit-recovery"
                  className={`block pl-8 pr-4 py-2.5 rounded-lg text-sm transition-colors duration-200 ${
                    isShopifyPage
                      ? "text-golden-hour-start bg-white/5"
                      : "text-granite hover:text-white hover:bg-white/5"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Shopify Profit Recovery
                </Link>
                <Link
                  to="/agentic-bi"
                  className={`block pl-8 pr-4 py-2.5 rounded-lg text-sm transition-colors duration-200 ${
                    isAgenticBIPage
                      ? "text-golden-hour-start bg-white/5"
                      : "text-granite hover:text-white hover:bg-white/5"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Agentic BI Migration
                </Link>
              </div>

              <Link
                to="/portfolio"
                className="block"
                onClick={() => setMobileMenuOpen(false)}
              >
                {({ isActive }) => (
                  <span
                    className={`block px-4 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                      isActive
                        ? "text-golden-hour-start bg-white/5"
                        : "text-white hover:bg-white/5"
                    }`}
                  >
                    Portfolio
                  </span>
                )}
              </Link>

              <Link
                to="/pricing"
                className="block"
                onClick={() => setMobileMenuOpen(false)}
              >
                {({ isActive }) => (
                  <span
                    className={`block px-4 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                      isActive
                        ? "text-golden-hour-start bg-white/5"
                        : "text-white hover:bg-white/5"
                    }`}
                  >
                    Pricing
                  </span>
                )}
              </Link>

              <Link
                to="/blog"
                className="block"
                onClick={() => setMobileMenuOpen(false)}
              >
                {({ isActive }) => (
                  <span
                    className={`block px-4 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                      isActive
                        ? "text-golden-hour-start bg-white/5"
                        : "text-white hover:bg-white/5"
                    }`}
                  >
                    Insights
                  </span>
                )}
              </Link>

              {/* Divider */}
              <div className="my-3 border-t border-white/10" />

              <Link
                to="/demo"
                className="block"
                onClick={() => setMobileMenuOpen(false)}
              >
                <SummitButton size="md" className="w-full justify-center">
                  Get Started
                </SummitButton>
              </Link>
            </div>
          </nav>
        </div>

        <main className="flex-grow">
          <Outlet />
        </main>

        <Footer />
      </div>
    );
  },
});
