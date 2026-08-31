import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useTheme } from "../hooks/useTheme";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { profile } from "../data/profile";

const NAV_LINKS = [
  { label: "Home",          href: "#home" },
  { label: "About",         href: "#about" },
  { label: "Resume",        href: "#resume" },
  { label: "Certifications",href: "#certifications" },
  { label: "Skills",        href: "#skills" },
  { label: "Projects",      href: "#projects" },
  { label: "Contact",       href: "#contact" },
];

const SECTION_IDS = ["home", "about", "resume", "certifications", "skills", "projects", "contact"];

export default function Navbar() {
  const [theme, toggleTheme] = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ── Desktop & Tablet Navbar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-[#111827]/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 shadow-sm"
            : "bg-transparent"
        }`}
        role="banner"
      >
        <div className="section-container">
          <nav
            className="flex items-center justify-between h-16"
            aria-label="Main navigation"
          >
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
              className="text-base font-semibold text-gray-900 dark:text-white tracking-tight hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
              aria-label="Go to top"
            >
              {profile.name}
            </a>

            {/* Desktop links */}
            <ul className="hidden lg:flex items-center gap-6" role="list">
              {NAV_LINKS.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                      className={`nav-link text-sm font-medium transition-colors duration-150 ${
                        isActive
                          ? "text-accent-600 dark:text-accent-400"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Theme toggle (desktop) */}
            <div className="hidden lg:flex items-center">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            {/* Mobile: theme toggle + hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => setMenuOpen(true)}
                className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Open navigation menu"
                aria-expanded={menuOpen}
              >
                <Menu size={22} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* ── Mobile Drawer Overlay ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden animate-fade-in"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile Slide-in Drawer ── */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white dark:bg-[#1f2937] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {profile.name}
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-1.5 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-4 px-5" aria-label="Mobile navigation">
          <ul className="space-y-1" role="list">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-accent-50 dark:bg-accent-900/20 text-accent-600 dark:text-accent-400"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
            <li>
              <a
                href="/credentials"
                className="block px-3 py-2.5 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Credential Verification
              </a>
            </li>
          </ul>
        </nav>

        {/* Drawer footer */}
        <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">Profiles</p>
          <div className="flex items-center gap-3">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="GitHub profile"
            >
              <FaGithub size={18} /> GitHub
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="LinkedIn profile"
            >
              <FaLinkedinIn size={18} /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
