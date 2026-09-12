import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./Header";

const rightSerif = localFont({
  src: [
    {
      path: "./fonts/PPRightSerifMono-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PPRightSerifMono-Dark.otf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-right-serif",
});

const rightGrotesk = localFont({
  src: [
    {
      path: "./fonts/PPRightGroteskMono-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/PPRightGroteskMono-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-right-grotesk",
});

const paplane = localFont({
  src: "./fonts/TT-Paplane-Regular.ttf",
  variable: "--font-paplane",
});

const bitcount = localFont({
  src: "./fonts/BitcountPropSingle-Variable.ttf",
  variable: "--font-bitcount",
});

export const metadata: Metadata = {
  title: "PCD'26 @ NYC",
  description:
    "A full day of talks, workshops, and performances related to creative coding at NYU ITP on October 3, 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${rightSerif.variable} ${rightGrotesk.variable} ${paplane.variable} ${bitcount.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
