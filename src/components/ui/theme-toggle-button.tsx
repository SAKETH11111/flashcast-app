"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "../theme-provider" // Use our ThemeProvider
import { Toggle } from "./toggle" // Use our Toggle primitive

export function ThemeToggleButton() {
  const { theme, setTheme } = useTheme()

  // Determine the effective theme if system is selected
  const [effectiveTheme, setEffectiveTheme] = React.useState(theme)

  React.useEffect(() => {
    if (theme === "system") {
      const systemPref = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setEffectiveTheme(systemPref);
    } else {
      setEffectiveTheme(theme);
    }
  }, [theme]);

  // Handle theme changes from system preference
  React.useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      setEffectiveTheme(mediaQuery.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);


  const toggleTheme = () => {
    const newTheme = effectiveTheme === "dark" ? "light" : "dark";
    setTheme(newTheme); // This will update LS and the class on <html>
  }

  return (
    <Toggle
      variant="outline"
      className="group size-9 data-[state=on]:bg-transparent data-[state=on]:hover:bg-muted"
      pressed={effectiveTheme === "dark"}
      onPressedChange={toggleTheme}
      aria-label={`Switch to ${effectiveTheme === "dark" ? "light" : "dark"} mode`}
    >
      <Moon
        size={16}
        strokeWidth={2}
        className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
        aria-hidden="true"
      />
      <Sun
        size={16}
        strokeWidth={2}
        className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
        aria-hidden="true"
      />
    </Toggle>
  )
}