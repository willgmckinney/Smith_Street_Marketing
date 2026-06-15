import {
  createRootRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { BlueprintButton } from "../components/Blueprint/BlueprintButton";
import { GoatMark } from "../components/Blueprint/GoatMark";
import { ScrollRule } from "../components/Blueprint/ScrollRule";

export const rootRoute = createRootRoute({
  component: () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const isAcmeLifecycle = location.pathname === "/acme-lifecycle";
    const isAiSnapshotFocused =
      location.pathname === "/ai-snapshot/dashboard" ||
      location.pathname === "/ai-snapshot/report";
    const isFullPageDemo = isAcmeLifecycle || isAiSnapshotFocused;

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

    return (
      <div className={`flex flex-col min-h-screen bg-blueprint-base text-chalk font-sans ${isFullPageDemo ? "bg-transparent" : ""}`}>
        {!isFullPageDemo && <ScrollRule />}
        {!isFullPageDemo && (
        <>
        <header
          className={`
            fixed top-0 left-0 right-0 z-50 transition-all duration-300
            px-4 sm:px-6 lg:px-8 py-4
            flex items-center justify-between
            ${scrolled || mobileMenuOpen ? "bg-blueprint-base border-b border-chalk/10" : "bg-transparent"}
          `}
        >
          <Link to="/" className="flex flex-row items-center gap-3 group">
            <GoatMark
              size={44}
              alt=""
              className="transition-transform duration-300 group-hover:-translate-y-px"
            />
            <p className="font-display font-bold text-lg sm:text-xl md:text-2xl text-chalk hidden sm:block tracking-tight">
              Smith Avenue Insights
            </p>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 sm:gap-4">
            <Link to="/company">
              {({ isActive }) => (
                <BlueprintButton
                  variant="secondary"
                  size="sm"
                  className={`bg-transparent border-transparent shadow-none hover:bg-chalk/10 font-mono font-normal lowercase tracking-[0.08em] ${isActive ? "text-marker-start" : "text-chalk"}`}
                >
                  about
                </BlueprintButton>
              )}
            </Link>

            <Link to="/portfolio">
              {({ isActive }) => (
                <BlueprintButton
                  variant="secondary"
                  size="sm"
                  className={`bg-transparent border-transparent shadow-none hover:bg-chalk/10 font-mono font-normal lowercase tracking-[0.08em] ${isActive ? "text-marker-start" : "text-chalk"}`}
                >
                  the work
                </BlueprintButton>
              )}
            </Link>

            <Link to="/how-we-work">
              {({ isActive }) => (
                <BlueprintButton
                  variant="secondary"
                  size="sm"
                  className={`bg-transparent border-transparent shadow-none hover:bg-chalk/10 font-mono font-normal lowercase tracking-[0.08em] ${isActive ? "text-marker-start" : "text-chalk"}`}
                >
                  process
                </BlueprintButton>
              )}
            </Link>

            <Link to="/blog">
              {({ isActive }) => (
                <BlueprintButton
                  variant="secondary"
                  size="sm"
                  className={`bg-transparent border-transparent shadow-none hover:bg-chalk/10 font-mono font-normal lowercase tracking-[0.08em] ${isActive ? "text-marker-start" : "text-chalk"}`}
                >
                  writing
                </BlueprintButton>
              )}
            </Link>

            <Link to="/demo">
              <BlueprintButton size="sm">Start a project</BlueprintButton>
            </Link>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden relative z-50 p-2 rounded-lg text-chalk hover:bg-chalk/10 transition-colors duration-200"
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
            className="absolute inset-0 bg-chalk/40"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Panel */}
          <nav
            className={`
              absolute top-0 right-0 h-full w-72 max-w-[80vw]
              bg-blueprint-base border-l border-chalk/10 shadow-2xl
              pt-24 pb-8 px-6
              transition-transform duration-300 ease-in-out
              ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}
              overflow-y-auto
            `}
          >
            <div className="flex flex-col gap-1">
              <Link
                to="/company"
                className="block"
                onClick={() => setMobileMenuOpen(false)}
              >
                {({ isActive }) => (
                  <span
                    className={`block px-4 py-3 rounded-lg font-mono lowercase tracking-[0.06em] transition-colors duration-200 ${
                      isActive
                        ? "text-marker-start bg-chalk/5"
                        : "text-chalk hover:bg-chalk/5"
                    }`}
                  >
                    about
                  </span>
                )}
              </Link>

              <Link
                to="/portfolio"
                className="block"
                onClick={() => setMobileMenuOpen(false)}
              >
                {({ isActive }) => (
                  <span
                    className={`block px-4 py-3 rounded-lg font-mono lowercase tracking-[0.06em] transition-colors duration-200 ${
                      isActive
                        ? "text-marker-start bg-chalk/5"
                        : "text-chalk hover:bg-chalk/5"
                    }`}
                  >
                    the work
                  </span>
                )}
              </Link>

              <Link
                to="/how-we-work"
                className="block"
                onClick={() => setMobileMenuOpen(false)}
              >
                {({ isActive }) => (
                  <span
                    className={`block px-4 py-3 rounded-lg font-mono lowercase tracking-[0.06em] transition-colors duration-200 ${
                      isActive
                        ? "text-marker-start bg-chalk/5"
                        : "text-chalk hover:bg-chalk/5"
                    }`}
                  >
                    process
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
                    className={`block px-4 py-3 rounded-lg font-mono lowercase tracking-[0.06em] transition-colors duration-200 ${
                      isActive
                        ? "text-marker-start bg-chalk/5"
                        : "text-chalk hover:bg-chalk/5"
                    }`}
                  >
                    writing
                  </span>
                )}
              </Link>

              {/* Divider */}
              <div className="my-3 border-t border-chalk/10" />

              <Link
                to="/demo"
                className="block"
                onClick={() => setMobileMenuOpen(false)}
              >
                <BlueprintButton size="md" className="w-full justify-center">
                  Start a project
                </BlueprintButton>
              </Link>
            </div>
          </nav>
        </div>
        </>
        )}

        <main className={`flex-grow relative z-10 ${isFullPageDemo ? "flex-grow-0" : ""}`}>
          <Outlet />
        </main>

        {!isFullPageDemo && (
        <div className="relative z-10">
          <Footer />
        </div>
        )}
      </div>
    );
  },
});
