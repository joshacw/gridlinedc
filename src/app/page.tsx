"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HomeHero from '@/components/HomeHero';
import Footer from '@/components/Footer';
import EnquiryModal from '@/components/EnquiryModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen selection:bg-blue-100 selection:text-blue-900">
      <Navbar onInquireClick={openModal} />

      <main>
        <HomeHero />
      </main>

      <Footer />

      <EnquiryModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
