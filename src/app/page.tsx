"use client";

import { useState } from 'react';
import Link from 'next/link';
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

        {/* Three Features Section */}
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
                <p className="font-outfit text-sm-figma text-slate-600 leading-relaxed">
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
                <p className="font-outfit text-sm-figma text-slate-600 leading-relaxed">
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
                <p className="font-outfit text-sm-figma text-slate-600 leading-relaxed">
                  Infrastructure optimized for high-density compute and liquid cooling.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Audience Routing CTA */}
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
            <h2 className="text-xxl font-outfit font-bold mb-6 text-slate-950">How Can We Help?</h2>
            <p className="text-slate-600 mb-12 max-w-lg mx-auto leading-relaxed">
              Select your path to learn more about how GRIDLINE can work for you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/owners"
                className="px-10 py-5 bg-slate-950 text-white rounded-card font-bold hover:bg-blue-600 transition-all shadow-2xl shadow-slate-300 uppercase tracking-widest text-xs text-center"
              >
                For Data Center Owners
              </Link>
              <Link
                href="/investors"
                className="px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-card font-bold hover:bg-slate-50 transition-all uppercase tracking-widest text-xs text-center"
              >
                For Investors
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <EnquiryModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
