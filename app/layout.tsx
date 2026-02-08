import type { Metadata } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import { LenisProvider } from "@/components/lenis-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Plers BioSciences — Engineering Tomorrow's Health",
  description:
    "Plers merges biotechnology with artificial intelligence to develop personalized therapies with the potential to transform millions of lives.",
  keywords: ["biotech", "health-tech", "genomics", "AI diagnostics", "personalized medicine"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable}`}>
      <body>
        <LenisProvider>
          <div className="grain" aria-hidden="true" />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
