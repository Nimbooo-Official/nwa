import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import ThemeDataProvider from "@/context/theme-data-provider";

// font setup
const geistSans = localFont({
  src: "../assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const NotoSans = localFont({
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

export const metadata: Metadata = {
  title: "Nimbooo - Monetization Simplified",
  description:
    "Nimbooo enables creators monetize their work on the internet by generating payment links to post along with their content anywhere on the Internet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${NotoSans.variable} antialiased`}
      >
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeDataProvider>{children}</ThemeDataProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}
