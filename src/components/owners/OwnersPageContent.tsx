"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EnquiryModal from '@/components/EnquiryModal';
import OwnersHero from './OwnersHero';
import WhyPartner from './WhyPartner';
import PlatformComparison from './PlatformComparison';
import OwnerPartnershipOptions from './OwnerPartnershipOptions';
import OwnersArbitrage from './OwnersArbitrage';
import OwnersApproach from './OwnersApproach';
import OwnersCTA from './OwnersCTA';
import { OWNERS_NAV_ITEMS } from '@/constants';

export default function OwnersPageContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen selection:bg-blue-100 selection:text-blue-900">
      <Navbar
        onInquireClick={openModal}
        navItems={OWNERS_NAV_ITEMS}
        pageContext="owners"
      />

      <main>
        <OwnersHero onCtaClick={openModal} />
        <WhyPartner />
        <PlatformComparison />
        <OwnerPartnershipOptions onCtaClick={openModal} />
        <OwnersArbitrage onCtaClick={openModal} />
        <OwnersApproach />
        <OwnersCTA onCtaClick={openModal} />
      </main>

      <Footer />

      <EnquiryModal isOpen={isModalOpen} onClose={closeModal} defaultEnquiryType="asset_owner" />
    </div>
  );
}
