import type { Metadata } from "next";
import {
  NotoSans,
  geistSans,
  geistMono,
  poppins,
  poppinsThin,
  cinzelDecorative,
} from "@/lib/fonts";
import "./globals.css";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import ThemeDataProvider from "@/context/theme-data-provider";

export const metadata: Metadata = {
  title: "Nimbooo - Payment Links",
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
        className={`${NotoSans.className} ${geistSans.variable} ${geistMono.variable}
          ${poppins.variable} ${poppinsThin.variable} ${cinzelDecorative.variable}
          antialiased`}
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
