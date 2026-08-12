// components/ModeToggle.tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-9 w-9" />; // Component load হওয়ার আগ পর্যন্ত placeholder
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle theme"
      className="cursor-pointer h-9 w-9 rounded-full transition-all duration-300
        flex items-center justify-center shadow-md hover:shadow-lg
        backdrop-blur-sm bg-white/30 dark:bg-slate-700/30
        text-yellow-500 dark:text-purple-300 focus:outline-none"
    >
      <div className="relative h-5 w-5">
        <Sun
          strokeWidth={2.5}
          className={`absolute inset-0 h-5 w-5 transition-all duration-500 transform ${
            isDark ? "opacity-0 scale-90 rotate-90" : "opacity-100 scale-100 rotate-0"
          }`}
        />
        <Moon
          strokeWidth={2.5}
          className={`absolute inset-0 h-5 w-5 transition-all duration-500 transform ${
            isDark ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-90 -rotate-90"
          }`}
        />
      </div>
    </button>
  );
}