"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useThemeContext } from "@/context/theme-data-provider";
import type { ThemeColors } from "@/types/theme-types";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const availableThemeColors = [
  { name: "Zinc", light: "bg-zinc-900", dark: "bg-zinc-700" },
  { name: "Rose", light: "bg-rose-600", dark: "bg-rose-700" },
  { name: "Blue", light: "bg-blue-600", dark: "bg-blue-700" },
  { name: "Green", light: "bg-green-600", dark: "bg-green-500" },
  { name: "Orange", light: "bg-orange-500", dark: "bg-orange-700" },
];

export function ThemeColorToggle() {
  const { themeColor, setThemeColor } = useThemeContext();
  const { theme } = useTheme();

  const createSelectItems = () => {
    return availableThemeColors.map(({ name, light, dark }) => (
      <SelectItem key={name} value={name}>
        <div className="flex item-center space-x-2">
          <div
            className={cn(
              "rounded-full",
              "w-[24px]",
              "h-[24px]",
              theme === "light" ? light : dark,
            )}
          />
          {/* disabled color name display to save space */}
          <div className="text-base">{name}</div>
        </div>
      </SelectItem>
    ));
  };

  return (
    <Select
      onValueChange={(value) => setThemeColor(value as ThemeColors)}
      defaultValue={themeColor}
    >
      <SelectTrigger className="w-[180px] ring-offset-transparent focus:ring-transparent">
        <SelectValue placeholder="Select Color" />
      </SelectTrigger>
      <SelectContent className="border-muted">
        {createSelectItems()}
      </SelectContent>
    </Select>
  );
}
