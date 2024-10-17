// Kaushal suggested adding export and then importing to avoid ESlint Typescript errors

export type ThemeColors = "Zinc" | "Rose" | "Blue" | "Green" | "Orange";

export interface ThemeColorStateParams {
  themeColor: ThemeColors;
  setThemeColor: React.Dispatch<React.SetStateAction<ThemeColors>>;
}
