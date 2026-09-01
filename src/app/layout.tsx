import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Harshit Saxena — Software Engineering Student",
  description: "Software engineering student building thoughtful digital products, systems architecture, and web applications.",
  keywords: [
    "Harshit Saxena",
    "Software Engineering",
    "Next.js",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Harshit Saxena" }],
  openGraph: {
    title: "Harshit Saxena — Software Engineering Student",
    description: "Portfolio site focused on developer tooling, systems thinking, and applied web work.",
    type: "website",
  },
};

import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-background text-text-primary antialiased selection:bg-white selection:text-black`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
