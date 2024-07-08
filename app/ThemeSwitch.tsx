"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

// Icons
import { SunIcon, MoonIcon } from "lucide-react"

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!mounted) return null;

  return (
    <>
      <button
        aria-label="Toggle Theme"
        type="button"
        onClick={toggleTheme}
      >
        {theme === "dark" ? (
          <SunIcon className="h-5 w-5" />
        ) : (
          <MoonIcon className="h-5 w-5" />
        )}
      </button>
    </>
  );
};

export default ThemeSwitch;
