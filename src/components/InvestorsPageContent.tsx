"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EnquiryModal from '@/components/EnquiryModal';
import { INVESTORS_NAV_ITEMS } from '@/constants';

export default function InvestorsPageContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen selection:bg-blue-100 selection:text-blue-900">
      <Navbar
        onInquireClick={openModal}
        navItems={INVESTORS_NAV_ITEMS}
        pageContext="investors"
      />

      <main>
        {/* Hero */}
        <section id="overview" className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-gradient-dark">
          {/* Grid Background */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute inset-0 opacity-40">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="inv-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#2469ff" strokeWidth="1.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#inv-grid)" />
              </svg>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-blue/20 blur-[150px] rounded-full"></div>
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary-blue/15 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-primary-blue/15 blur-[120px] rounded-full"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-blue/10 border border-primary-blue/30 mb-8 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-primary-blue animate-ping"></span>
                <span className="font-instrument-sans text-xs-figma font-bold text-primary-blue uppercase tracking-[0.25em]">For Investors</span>
              </div>

              <h1 className="font-big-shoulders text-mega font-bold tracking-tight mb-8 leading-[1.1]">
                <span className="text-white">Institutional-Grade</span>
                <br />
                <span className="text-primary-blue">Data Center Investment</span>
              </h1>

              <p className="font-outfit text-lg text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                We are preparing detailed investment information for qualified investors. Register your interest to receive our investor information pack when available.
              </p>

              <button
                onClick={openModal}
                className="px-10 py-4 bg-primary-blue hover:bg-cta-primary-hover text-white rounded-full font-outfit font-bold uppercase tracking-wider text-sm transition-all shadow-lg shadow-primary-blue/30 hover:shadow-xl hover:shadow-primary-blue/40 active:scale-95"
              >
                Register Interest
              </button>
            </div>
          </div>
        </section>

        {/* Brief Overview */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-blue/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="font-outfit text-xl font-bold text-slate-900 mb-3">Platform Scale</h3>
                <p className="font-outfit text-base text-slate-600 leading-relaxed">
                  Aggregated data center portfolio designed for institutional capital deployment.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-blue/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="font-outfit text-xl font-bold text-slate-900 mb-3">Valuation Arbitrage</h3>
                <p className="font-outfit text-base text-slate-600 leading-relaxed">
                  Structural rerating from private-market multiples to institutional benchmarks.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-blue/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-outfit text-xl font-bold text-slate-900 mb-3">Public-Market Path</h3>
                <p className="font-outfit text-base text-slate-600 leading-relaxed">
                  Governance and reporting aligned with public exchange requirements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-32 bg-slate-50 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern id="invDotPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="currentColor" className="text-slate-900" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#invDotPattern)" />
            </svg>
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-xxl font-outfit font-bold mb-6 text-slate-950">Interested in GRIDLINE?</h2>
            <p className="text-lg text-slate-600 mb-12 max-w-lg mx-auto leading-relaxed">
              Register your interest and our investment team will be in touch with detailed information when available.
            </p>
            <button
              onClick={openModal}
              className="px-10 py-5 bg-slate-950 text-white rounded-card font-bold hover:bg-blue-600 transition-all shadow-2xl shadow-slate-300 uppercase tracking-widest text-xs"
            >
              Register Interest
            </button>
          </div>
        </section>
      </main>

      <Footer />

      <EnquiryModal isOpen={isModalOpen} onClose={closeModal} defaultEnquiryType="investor" />
    </div>
  );
}
