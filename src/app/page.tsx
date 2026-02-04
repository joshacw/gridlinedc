"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PartnershipValue from '@/components/PartnershipValue';
import DCArbitrage from '@/components/DCArbitrage';
import ValuationRerating from '@/components/ValuationRerating';
import PartnershipOptions from '@/components/PartnershipOptions';
import InvestmentTiers from '@/components/InvestmentTiers';
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
        <Hero onCtaClick={openModal} />

        {/* Three Features Section - Matching Figma */}
        <section id="platform" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {/* Asset Aggregation */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-blue/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="font-outfit text-xl font-bold text-slate-900 mb-3">Asset Aggregation</h3>
                <p className="font-inter text-sm text-slate-600 leading-relaxed">
                  We bundle high-quality data center assets into a unified portfolio for public markets.
                </p>
              </div>

              {/* Listing Readiness */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-blue/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-outfit text-xl font-bold text-slate-900 mb-3">Listing Readiness</h3>
                <p className="font-inter text-sm text-slate-600 leading-relaxed">
                  Institutional-grade governance designed to meet public exchange requirements.
                </p>
              </div>

              {/* AI Workloads */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-blue/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-outfit text-xl font-bold text-slate-900 mb-3">AI Workloads</h3>
                <p className="font-inter text-sm text-slate-600 leading-relaxed">
                  Infrastructure optimized for high-density compute and liquid cooling.
                </p>
              </div>
            </div>
          </div>
        </section>

        <PartnershipValue />

        <DCArbitrage onCtaClick={openModal} />

        <ValuationRerating />

        <section id="path" className="py-24 bg-slate-950 text-white relative overflow-hidden" style={{ display: 'none' }}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-2xl mb-16">
              <h2 className="text-3xl font-outfit font-bold mb-4">Liquidity Path</h2>
              <p className="text-slate-400 leading-relaxed">
                Our roadmap to public listing ensures institutional liquidity for early asset owners by standardizing operations and aggregating scale.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: 'Phase 1', title: 'Onboarding', desc: 'Secure high-density sites and establish baseline governance.' },
                { step: 'Phase 2', title: 'Build-out', desc: 'Scale AI-ready infrastructure with superior capital efficiency.' },
                { step: 'Phase 3', title: 'Portfolio', desc: 'Unified asset aggregation to de-risk earnings via diversification.' },
                { step: 'Phase 4', title: 'Public Exit', desc: 'Institutional IPO / Exchange Listing at target 12x multiples.' }
              ].map((item, idx) => (
                <div key={idx} className="relative group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all">
                  <div className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-4">{item.step}</div>
                  <h4 className="text-lg font-bold mb-2 font-outfit">{item.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PartnershipOptions onCtaClick={openModal} />

        <InvestmentTiers onCtaClick={openModal} />

        <section className="py-32 bg-slate-50 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern id="dotPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="currentColor" className="text-slate-900" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#dotPattern)" />
            </svg>
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl font-outfit font-bold mb-6 text-slate-950">Partner with GridlineDC</h2>
            <p className="text-slate-600 mb-12 max-w-lg mx-auto leading-relaxed">
              Open to accredited investors and data center asset owners looking for a strategic exit via institutional rerating and portfolio aggregation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={openModal}
                className="px-10 py-5 bg-slate-950 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-2xl shadow-slate-300 uppercase tracking-widest text-xs"
              >
                Connect with Advisory
              </button>
              <button
                onClick={openModal}
                className="px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all uppercase tracking-widest text-xs"
              >
                Contact Strategy Team
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <EnquiryModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
