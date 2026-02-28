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
      {/* Subtle grid overlay — visible on dark sections */}
      <div
        className="fixed inset-0 opacity-60 pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(74,158,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(74,158,255,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <Navbar />

      <main>
        <OwnersHero onCtaClick={openModal} />
      </main>

      <Footer />

      <EnquiryModal isOpen={isModalOpen} onClose={closeModal} defaultEnquiryType="asset_owner" />
    </div>
  );
}
