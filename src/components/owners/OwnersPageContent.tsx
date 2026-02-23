"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EnquiryModal from '@/components/EnquiryModal';
import OwnersHero from './OwnersHero';
import OwnersArbitrage from './OwnersArbitrage';
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
        <OwnersArbitrage onCtaClick={openModal} />
      </main>

      <Footer />

      <EnquiryModal isOpen={isModalOpen} onClose={closeModal} defaultEnquiryType="asset_owner" />
    </div>
  );
}
