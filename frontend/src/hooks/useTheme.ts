import { useEffect } from "react";
import { useSettings } from "./useSettings";

export const useTheme = () => {
  const { settings } = useSettings();

  useEffect(() => {
    if (settings?.theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else if (settings?.theme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else if (settings?.theme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.classList.toggle("dark", prefersDark);
      document.documentElement.classList.toggle("light", !prefersDark);
    }
  }, [settings?.theme]);

  return {
    theme: settings?.theme || "dark",
    isDark: document.documentElement.classList.contains("dark"),
  };
};
