import type { Metadata } from "next";
import { Inter, Outfit, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GRIDLINE | Future of Data Center Infrastructure",
  description: "Aggregating premier digital infrastructure assets for the public markets. Direct investment bridge to high-density data center infrastructure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} ${instrumentSans.variable} antialiased bg-slate-50 text-slate-900`}
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
