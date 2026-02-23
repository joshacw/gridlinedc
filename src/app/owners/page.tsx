import type { Metadata } from 'next';
import OwnersPageContent from '@/components/owners/OwnersPageContent';

export const metadata: Metadata = {
  title: 'For Data Center Owners | GRIDLINE',
  description: 'Discover how small data centre owners are multiplying valuations through industry partnerships and institutional finance. Exclusive for APAC facility owners.',
};

export default function OwnersPage() {
  return <OwnersPageContent />;
}
