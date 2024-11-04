// font setup

import localFont from "next/font/local";

export const cinzelDecorative = localFont({
  src: "../assets/fonts/CinzelDecorative-Bold.ttf",
  variable: "--font-cinzel-deco",
  weight: "100 400 900",
});

export const geistSans = localFont({
  src: "../assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const geistMono = localFont({
  src: "../assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const NotoSans = localFont({
  src: [
    {
      path: "../assets/fonts/NotoSans-VariableFont.ttf",
      weight: "100 400 800",
      style: "normal",
    },
    {
      path: "../assets/fonts/NotoSans-Italic-VariableFont.ttf",
      weight: "100 400 800",
      style: "italic",
    },
  ],
  variable: "--font-noto-sans",
  display: "swap",
});

export const poppins = localFont({
  src: "../assets/fonts/Poppins-Regular.ttf",
  variable: "--font-poppins",
  style: "Regular",
  display: "swap",
});

export const poppinsThin = localFont({
  src: "../assets/fonts/Poppins-Thin.ttf",
  variable: "--font-poppinsThin",
  display: "swap",
});
