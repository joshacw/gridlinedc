import type { Metadata } from 'next';
import InvestorsPageContent from '@/components/InvestorsPageContent';

export const metadata: Metadata = {
  title: 'For Investors | GRIDLINE',
  description: 'Institutional-grade data center investment. Register your interest for direct investment into high-density data center infrastructure.',
};

export default function InvestorsPage() {
  return <InvestorsPageContent />;
}
