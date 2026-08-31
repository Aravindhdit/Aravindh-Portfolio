import { profile } from "../data/profile";
import ViewCounter from "./ViewCounter";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111827]"
      role="contentinfo"
    >
      <div className="section-container py-8 flex flex-col items-center gap-5">
        {/* View counter — centered, subtle */}
        <div className="flex justify-center">
          <ViewCounter />
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          <span className="hidden sm:inline">
            © {year} {profile.name} &nbsp;•&nbsp; Built with{" "}
            <span aria-label="love" role="img">❤️</span>
          </span>
          <span className="sm:hidden">
            © {year} {profile.name}
            <br />
            <span className="text-gray-400 dark:text-gray-500">
              • Built with{" "}
              <span aria-label="love" role="img">❤️</span>
            </span>
          </span>
        </p>
      </div>
    </footer>
  );
}
