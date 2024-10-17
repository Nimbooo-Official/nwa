"use client";

import * as React from 'react';
import {
  Select as RadixSelect,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@radix-ui/react-select'; // Import from Radix UI
import { useThemeContext } from '@/context/theme-data-provider'; // Context for theme
import { useTheme } from 'next-themes'; // Theme switching utility
import { cn } from '@/lib/utils'; // Utility for classnames
import { ThemeColors } from '@/types/theme-types'; // Import the ThemeColors type

// Available theme colors
const availableThemeColors = [
  { name: 'Zinc', light: 'bg-zinc-900', dark: 'bg-zinc-700' },
  { name: 'Rose', light: 'bg-rose-600', dark: 'bg-rose-700' },
  { name: 'Blue', light: 'bg-blue-600', dark: 'bg-blue-700' },
  { name: 'Green', light: 'bg-green-600', dark: 'bg-green-500' },
  { name: 'Orange', light: 'bg-orange-500', dark: 'bg-orange-700' },
];

// Function Component
export function ThemeColorToggle() {
  const { themeColor, setThemeColor } = useThemeContext(); // Access theme context
  const { theme } = useTheme(); // Access current theme

  // Map theme colors into selectable items
  const createSelectItems = () => {
    return availableThemeColors.map(({ name, light, dark }) => (
      <SelectItem key={name} value={name}>
        <div className="flex items-center space-x-3 ">
          <div
            className={cn(
              'rounded-full',
              'w-[20px]',
              'h-[20px]',
              theme === 'light' ? light : dark // Conditional styling based on current theme
            )}
          ></div>
          <div className="text-sm">{name}</div>
        </div>
      </SelectItem>
    ));
  };

  return (
    <RadixSelect
      onValueChange={(value: string) => setThemeColor(value as ThemeColors)} // Use correct handler prop
      defaultValue={themeColor} // Set default theme color
    >
      <SelectTrigger  className="w-[180px] px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm ring-offset-transparent focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex justify-between items-center">
        <SelectValue>
          {themeColor ? themeColor : <span className="text-muted-foreground ">Select Color</span>}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="border-muted">
        {createSelectItems()} {/* Render selectable theme colors */}
      </SelectContent>
    </RadixSelect>
  );
}
