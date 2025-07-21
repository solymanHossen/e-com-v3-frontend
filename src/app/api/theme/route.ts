import { NextResponse } from "next/server";

export const THEME_CONFIG = {
  color: {
    primary: "#5465",
    secondary: "#sdfdff",
    success: "#5465",
    warning: "#f0ad4e",
  },
  textSize: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "32px",
    "4xl": "40px",
    "5xl": "48px",
    "6xl": "56px",
    "7xl": "64px",
    "8xl": "72px",
    "9xl": "80px",
    "10xl": "92px",
  },
  spacing: "0.25rem",
};

export const GET = async () => {
  // Future: fetch from CMS or DB
  return NextResponse.json(THEME_CONFIG);
};
