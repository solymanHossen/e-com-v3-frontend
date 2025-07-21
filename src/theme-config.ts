// theme-config.ts

const API_URL = "http://localhost:3000/api/theme";

// Enum for type enforcement
export enum ConfigKeyType {
  Color = "color",
  TextSize = "textSize",
  Spacing = "spacing",
}

// Configuration Options
const API_COLORS: string[] = [
  "red",
  "green",
  "blue",
  "orange",
  "indigo",
  "violet",
  "gray",
];

const API_FONT_TEXT_SIZES: string[] = [
  "xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl",
];

// Utility Types
type AllowedTextSizes = typeof API_FONT_TEXT_SIZES[number];
type AllowedColors = typeof API_COLORS[number];

export type ThemeConfigKey =
  | { type: ConfigKeyType.Color; value: AllowedColors }
  | { type: ConfigKeyType.TextSize; value: AllowedTextSizes }
  | { type: ConfigKeyType.Spacing; value: string };

// API Response Types
interface APIThemeConfig {
  color: Record<string, string>;
  textSize: Record<string, string>;
  spacing: string;
}

// Generate configuration from fetched values
export const fetchAndBuildThemeConfig = async (): Promise<Record<string, string>> => {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch theme config");
  }

  const configData: APIThemeConfig = await res.json();

  const cssVariables: Record<string, string> = {};

  // Process colors
  Object.entries(configData.color).forEach(([key, value]) => {
    cssVariables[`--color-${key}`] = value;
  });

  // Process text sizes
  Object.entries(configData.textSize).forEach(([key, value]) => {
    cssVariables[`--text-${key}`] = value;
  });

  // Process spacing
  cssVariables['--spacing-base'] = configData.spacing;

  return cssVariables;
};
export const getThemeConfig = async (): Promise<Record<string, string>> => {
  try {
    return await fetchAndBuildThemeConfig();
  } catch (error) {
    console.error("Error fetching theme config:", error);
    return {};
  }
};
export const getThemeConfigUrl = () => API_URL;
export const getThemeConfigKeyType = (key: string): ConfigKeyType | null => {
  switch (key) {
    case "color":
      return ConfigKeyType.Color;
    case "textSize":
      return ConfigKeyType.TextSize;
    case "spacing":
      return ConfigKeyType.Spacing;
    default:
      return null;
  }
}