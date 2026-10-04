import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fermor.in"),
  title: "Fermor — Understand. Act. Grow.",
  description:
    "Fermor runs the real math behind your money decisions — free calculators, a full view of your finances and forecasts you can adjust. Runs in your browser, no login wall.",
  openGraph: {
    title: "Fermor — Understand. Act. Grow.",
    description:
      "Free calculators, a full view of your money and forecasts you can adjust. Every result comes with the working.",
    url: "https://fermor.in",
    siteName: "Fermor",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fermor — Understand. Act. Grow.",
    description:
      "Free calculators, a full view of your money and forecasts you can adjust. Every result comes with the working.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f2f3f0",
};

const fontPreload = [
  "/fonts/archivo-latin.woff2",
  "/fonts/plexmono-400-latin.woff2",
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      {fontPreload.map((href) => (
        <link
          key={href}
          rel="preload"
          as="font"
          type="font/woff2"
          href={href}
          crossOrigin="anonymous"
        />
      ))}
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
