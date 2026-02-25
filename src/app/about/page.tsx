import type { Metadata } from "next";
import AboutPageContent from "@/components/AboutPageContent";

export const metadata: Metadata = {
  title: "About | GRIDLINE",
  description: "We aggregate operating data center assets into institutional-grade portfolios designed for long-term value creation.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
