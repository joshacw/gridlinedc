"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EnquiryModal from '@/components/EnquiryModal';
import OwnersHero from './OwnersHero';

export default function OwnersPageContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      <main>
        <OwnersHero onCtaClick={openModal} />
      </main>

      <Footer />

      <EnquiryModal isOpen={isModalOpen} onClose={closeModal} defaultEnquiryType="asset_owner" />
    </div>
  );
}
