"use client";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CAPABILITIES = [
  {
    title: 'Asset Selection',
    description: 'We target operational facilities with proven cash flows, not speculative development projects. Every acquisition must meet strict criteria for operational maturity, customer quality, and technical infrastructure.',
    icon: (
      <svg className="w-6 h-6 text-[#4a9eff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Value Creation',
    description: 'We enhance portfolio value through operational improvements, capital structure optimization, and strategic positioning. Our approach prioritizes sustainable growth over short-term financial engineering.',
    icon: (
      <svg className="w-6 h-6 text-[#4a9eff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    title: 'Global Reach',
    description: 'We operate across APAC, North America, and EMEA, providing geographic diversification and access to high-growth digital infrastructure markets. Our platform is designed for global scale.',
    icon: (
      <svg className="w-6 h-6 text-[#4a9eff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  {
    title: 'Partnership Approach',
    description: 'We work collaboratively with data center owners and institutional investors to create mutually beneficial outcomes. Our process is designed to be transparent, efficient, and aligned with stakeholder objectives.',
    icon: (
      <svg className="w-6 h-6 text-[#4a9eff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

export default function AboutPageContent() {
  return (
    <div className="min-h-screen selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      <main>
        {/* Hero Banner */}
        <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-[#0a1628]">
          <div className="max-w-4xl mx-auto px-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              About <span className="text-[#4a9eff]">GRIDLINE</span>
            </h1>
            <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
              We aggregate operating data center assets into institutional-grade portfolios designed for long-term value creation.
            </p>
          </div>
        </section>

        {/* What We Do */}
        <section className="px-8 py-20 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#0a1e3d] mb-12">What We Do</h2>

            <div className="space-y-10">
              <div>
                <h3 className="text-xl font-bold text-[#0a1e3d] mb-3">Strategic Acquisition</h3>
                <p className="text-[#0a1e3d]/70 leading-relaxed">
                  We identify and acquire cash-flow-positive, operating data center facilities across global markets. Our focus is on proven assets with established customer bases, reliable revenue streams, and operational track records.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#0a1e3d] mb-3">Portfolio Aggregation</h3>
                <p className="text-[#0a1e3d]/70 leading-relaxed">
                  We build scaled platforms by aggregating complementary assets into unified portfolios. This approach creates economies of scale, diversifies risk across geographies and customer segments, and establishes platform-level operational efficiency.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#0a1e3d] mb-3">Institutional Governance</h3>
                <p className="text-[#0a1e3d]/70 leading-relaxed">
                  We implement institutional-grade governance frameworks including standardized reporting, financial controls, operational oversight, and compliance management. This ensures transparency, predictability, and alignment with institutional investor requirements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="px-8 pb-20 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CAPABILITIES.map((cap) => (
                <div key={cap.title} className="border border-[#0a1e3d]/10 rounded-lg p-8">
                  <div className="mb-4">
                    {cap.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#0a1e3d] mb-3">{cap.title}</h3>
                  <p className="text-[#0a1e3d]/60 leading-relaxed text-sm">
                    {cap.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why It Matters */}
        <section className="px-8 py-20 bg-white border-t border-[#0a1e3d]/10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#0a1e3d] mb-8">Why It Matters</h2>

            <div className="space-y-6 text-[#0a1e3d]/70 leading-relaxed">
              <p>
                The digital infrastructure sector is undergoing rapid transformation. While demand for data center capacity continues to accelerate, the market remains fragmented with many owner-operated facilities lacking the scale, governance, and capital structures required by institutional investors.
              </p>
              <p>
                GRIDLINE bridges this gap by creating institutional-grade portfolios from operating assets. We provide data center owners with liquidity and growth capital while delivering institutional investors with access to scaled, professionally managed digital infrastructure platforms.
              </p>
              <p>
                Our focus on cash-flow-positive, operating assets ensures portfolio durability and predictable returns. We do not engage in speculative development or rely on future capacity expansions to drive value. Every asset in our portfolio generates revenue from day one.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
