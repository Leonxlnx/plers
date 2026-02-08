import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import { LenisProvider } from "@/components/lenis-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Plers BioSciences — Engineering Tomorrow's Health",
  description:
    "Plers merges biotechnology with artificial intelligence to develop personalized therapies with the potential to transform millions of lives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`}>
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
