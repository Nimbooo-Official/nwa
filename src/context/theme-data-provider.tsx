"use client";
import setGlobalColorTheme from "@/lib/theme-colors";
import type { ThemeColors, ThemeColorStateParams } from "@/types/theme-types";
import { useTheme } from "next-themes";
import type { ThemeProviderProps } from "next-themes/dist/types";
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext<ThemeColorStateParams>(
  {} as ThemeColorStateParams,
);

export default function ThemeDataProvider({ children }: ThemeProviderProps) {
  const getSavedThemeColor = () => {
    // Ensure that localStorage is accessed only in the browser
    if (typeof window !== "undefined") {
      try {
        return (localStorage.getItem("themeColor") as ThemeColors) || "Green";
      } catch (error) {
        console.error(error);
      }
    }
    return "Green"; // Fallback value for server-side rendering
  };

  const [themeColor, setThemeColor] =
    useState<ThemeColors>(getSavedThemeColor());
  const [isMounted, setIsMounted] = useState(false); // Initial state is false since component isn't mounted yet
  const { theme } = useTheme();

  useEffect(() => {
    // Mark component as mounted on the client side
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("themeColor", themeColor);
      setGlobalColorTheme(theme as "light" | "dark", themeColor);
    }
  }, [themeColor, theme, isMounted]);

  if (!isMounted) {
    return null; // Don't render anything until component is mounted
  }

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
