import type { Metadata } from 'next';
import OwnersPageContent from '@/components/owners/OwnersPageContent';

export const metadata: Metadata = {
  title: 'For Data Center Owners | GRIDLINE',
  description: 'Unlock institutional value for your data center. GRIDLINE partners with data center owners to integrate high-quality assets into a unified platform aligned with institutional and public-market standards.',
};

export default function OwnersPage() {
  return <OwnersPageContent />;
}
