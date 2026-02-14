import React from 'react';

interface OwnersArbitrageProps {
  onCtaClick?: () => void;
}

const OwnersArbitrage: React.FC<OwnersArbitrageProps> = ({ onCtaClick }) => {
  return (
    <section id="arbitrage" className="py-24 relative overflow-hidden bg-gradient-dark">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="owners-arb-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#2469ff" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#owners-arb-grid)" />
        </svg>
      </div>

      {/* Blue Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary-blue/10 blur-[150px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-outfit text-xxl font-bold mb-6 text-white">
            The Data Center Valuation <span className="text-primary-blue">Arbitrage</span>
          </h2>
          <p className="font-outfit text-lg text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Private, stand-alone data center assets typically transact at 1-3x revenue multiples, reflecting illiquidity and concentration risk.
            Institutional and publicly benchmarked data center platforms have historically commanded higher valuation multiples, driven by scale, predictability, governance, and access to capital.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Standalone Asset */}
            <div className="bg-dark-blue rounded-card p-12 border border-slate-700 text-center">
              <h3 className="font-instrument-sans text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
                STANDALONE ASSET
              </h3>
              <div className="mb-6">
                <div className="font-big-shoulders text-mega font-bold text-white mb-2">
                  1-3x
                </div>
                <div className="font-outfit text-lg font-semibold text-slate-400">
                  Revenue Multiple
                </div>
              </div>
              <div className="space-y-3 text-left pl-4">
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 text-xs shrink-0">&#9675;</span>
                  <p className="font-outfit text-base text-slate-300">Private market</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 text-xs shrink-0">&#9675;</span>
                  <p className="font-outfit text-base text-slate-300">Illiquidity discount</p>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
              <svg className="w-12 h-12 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>

            {/* Upside Potential */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary-blue/20 rounded-card blur-2xl"></div>
              <div className="relative bg-gradient-to-br from-primary-blue to-[#1d5ae6] rounded-card p-12 border-2 border-primary-blue text-center">
                <h3 className="font-instrument-sans text-sm font-bold text-white uppercase tracking-widest mb-6">
                  UPSIDE POTENTIAL
                </h3>
                <div className="mb-6">
                  <div className="font-big-shoulders text-mega font-bold text-white mb-2">
                    8-10x<span className="text-4xl">*</span>
                  </div>
                  <div className="font-outfit text-lg font-semibold text-white/90">
                    EBITDA Multiple
                  </div>
                </div>
                <div className="space-y-3 text-left pl-4">
                  <div className="flex items-center gap-3">
                    <span className="text-white text-xs shrink-0">&#9679;</span>
                    <p className="font-outfit text-base text-white/90">Public market</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white text-xs shrink-0">&#9679;</span>
                    <p className="font-outfit text-base text-white/90">Platform comparables</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center mt-12">
          <p className="font-outfit text-xs text-slate-500 max-w-3xl mx-auto italic">
            Illustrative ranges reflect observed market dynamics only. Actual outcomes depend on execution, scale, capital markets, and broader conditions. GRIDLINE does not guarantee valuation outcomes or liquidity events.
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button
            onClick={onCtaClick}
            className="px-10 py-4 bg-primary-blue hover:bg-cta-primary-hover text-white rounded-full font-outfit font-bold uppercase tracking-wider text-sm transition-all shadow-lg shadow-primary-blue/30 active:scale-95"
          >
            Request Information Pack
          </button>
        </div>
      </div>
    </section>
  );
};

export default OwnersArbitrage;
