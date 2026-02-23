"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EnquiryModal from '@/components/EnquiryModal';
import OwnersHero from './OwnersHero';

const NAV_ITEMS = [
  { label: 'For Owners', href: '/owners' },
  { label: 'For Investors', href: '/investors' },
];

export default function OwnersPageContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen selection:bg-blue-100 selection:text-blue-900">
      <Navbar
        onInquireClick={openModal}
        navItems={NAV_ITEMS}
        pageContext="owners"
      />

      <main>
        <OwnersHero onCtaClick={openModal} />
      </main>

      <Footer />

      <EnquiryModal isOpen={isModalOpen} onClose={closeModal} defaultEnquiryType="asset_owner" />
    </div>
  );
}
