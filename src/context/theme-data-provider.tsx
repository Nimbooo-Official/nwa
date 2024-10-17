"use client";

import setGlobalColorTheme from "@/lib/theme-colors";
import { useTheme } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeColorStateParams, ThemeColors } from "@/types/theme-types"; // Import the correct types

// Create context with ThemeColorStateParams
const ThemeContext = createContext<ThemeColorStateParams | undefined>(undefined);

export default function ThemeDataProvider({ children }: ThemeProviderProps) {
  const getSavedThemeColor = (): ThemeColors => {
    try {
      return (localStorage.getItem("themeColor") as ThemeColors) || "Zinc";
    } catch (error) {
      console.log(error);
      return "Zinc"; // Default to Zinc if there's an error
    }
  };

  const [themeColor, setThemeColor] = useState<ThemeColors>(getSavedThemeColor());
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("themeColor", themeColor);
      setGlobalColorTheme(theme as "light" | "dark", themeColor);
    }
  }, [themeColor, theme, isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeDataProvider");
  }
  return context;
}
