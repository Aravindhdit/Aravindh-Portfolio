import { useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(() => {
    // 1. Check localStorage first
    const stored = localStorage.getItem("portfolio-theme") as Theme | null;
    if (stored === "light" || stored === "dark") return stored;
    // 2. Fall back to system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  // Apply class to <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  return [theme, toggleTheme];
}
