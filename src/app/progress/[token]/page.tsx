import type { Metadata } from 'next';
import ProgressPageContent from '@/components/progress/ProgressPageContent';

export const metadata: Metadata = {
  title: 'Your Progress | GRIDLINE',
  description: 'Track your onboarding progress with GRIDLINE.',
};

export default async function ProgressPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <ProgressPageContent token={token} />;
}
