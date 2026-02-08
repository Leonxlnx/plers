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
    "Plers verbindet Biotechnologie mit künstlicher Intelligenz, um Therapien zu entwickeln, die Leben verändern. Genomik, KI-Diagnostik und personalisierte Medizin.",
  keywords: ["biotech", "health-tech", "genomics", "AI diagnostics", "personalized medicine"],
  openGraph: {
    title: "Plers BioSciences — Engineering Tomorrow's Health",
    description: "Revolutionizing medicine through biotechnology and artificial intelligence.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable}`}>
      <body>
        <LenisProvider>
          <div className="grain-overlay" aria-hidden="true" />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
