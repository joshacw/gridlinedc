import type { Metadata } from "next";
import CompatibilityScore from "@/components/compatibility-score";

export const metadata: Metadata = {
  title: "Compatibility Score | GRIDLINE",
  description: "Find out how well your data centre aligns with the GridLine acquisition profile.",
};

export default function ScorePage() {
  return (
    <main className="min-h-screen bg-gradient-dark">
      <CompatibilityScore webhookUrl={process.env.NEXT_PUBLIC_SCORE_WEBHOOK_URL} />
    </main>
  );
}
