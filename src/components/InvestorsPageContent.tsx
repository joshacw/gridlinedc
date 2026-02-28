"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EnquiryModal from '@/components/EnquiryModal';

export default function InvestorsPageContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen selection:bg-blue-100 selection:text-blue-900">
      {/* Subtle grid overlay — visible on dark sections */}
      <div
        className="fixed inset-0 opacity-60 pointer-events-none z-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(74,158,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(74,158,255,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <Navbar />

      <main>
        {/* Hero + Cards (single dark section) */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-[#0a1628]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="text-center max-w-4xl mx-auto mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4a9eff]/10 border border-[#4a9eff]/30 mb-8">
                <span className="text-xs font-semibold text-[#4a9eff] uppercase tracking-[0.25em]">For Investors</span>
              </div>

              <h1 className="mb-8">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 tracking-tight leading-tight">
                  Institutional-Grade
                </div>
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#4a9eff] tracking-tight leading-tight">
                  Data Center Investment
                </div>
              </h1>

              <p className="text-lg text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed">
                We are preparing detailed investment information for qualified investors. Register your interest to receive our investor information pack when available.
              </p>

              <button
                onClick={openModal}
                className="px-10 py-4 bg-[#4a9eff] hover:bg-[#5aa8ff] text-white rounded-lg font-semibold uppercase tracking-wider text-sm transition-all"
              >
                Register Interest
              </button>
            </div>

            {/* Overview Cards — dark themed */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-[#0d1b33] border border-white/10 rounded-lg p-8 hover:border-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-[#4a9eff]/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-[#4a9eff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-3">Platform Scale</h3>
                <p className="text-white/60 leading-relaxed">
                  Aggregated data center portfolio designed for institutional capital deployment.
                </p>
              </div>

              <div className="bg-[#0d1b33] border border-white/10 rounded-lg p-8 hover:border-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-[#4a9eff]/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-[#4a9eff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-3">Valuation Arbitrage</h3>
                <p className="text-white/60 leading-relaxed">
                  Structural rerating from private-market multiples to institutional benchmarks.
                </p>
              </div>

              <div className="bg-[#0d1b33] border border-white/10 rounded-lg p-8 hover:border-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-[#4a9eff]/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-[#4a9eff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-3">Public-Market Path</h3>
                <p className="text-white/60 leading-relaxed">
                  Governance and reporting aligned with public exchange requirements.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <EnquiryModal isOpen={isModalOpen} onClose={closeModal} defaultEnquiryType="investor" />
    </div>
  );
}
