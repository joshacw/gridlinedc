import React from 'react';

interface OwnersHeroProps {
  onCtaClick?: () => void;
}

const OwnersHero: React.FC<OwnersHeroProps> = ({ onCtaClick }) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-dark">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="owners-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#2469ff" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#owners-grid)" />
          </svg>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-blue/15 blur-[150px] rounded-full"></div>
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary-blue/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-primary-blue/10 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Headline + Subtext */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-8 leading-[1.2] text-white">
            How Small Data Centre Owners Are Multiplying Valuations Through Industry Partnerships &amp; Institutional Finance
          </h1>

          <p className="font-outfit text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Discover how facilities under 5MW are connecting to larger portfolios to unlock higher valuations without adding new infrastructure, landing new contracts or any significant investments.
          </p>
        </div>

        {/* Valuation Comparison Cards */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative">
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
                  <p className="font-outfit text-lg text-slate-300">Private market</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 text-xs shrink-0">&#9675;</span>
                  <p className="font-outfit text-lg text-slate-300">Illiquidity discount</p>
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
                    <p className="font-outfit text-lg text-white/90">Public market</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white text-xs shrink-0">&#9679;</span>
                    <p className="font-outfit text-lg text-white/90">Platform comparables</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={onCtaClick}
            className="px-10 py-4 bg-primary-blue hover:bg-cta-primary-hover text-white rounded-full font-outfit font-bold uppercase tracking-wider text-sm transition-all shadow-lg shadow-primary-blue/30 hover:shadow-xl hover:shadow-primary-blue/40 active:scale-95 mb-6"
          >
            Explore Your Potential Upside
          </button>

          <p className="font-outfit text-sm text-slate-400 max-w-xl mx-auto mb-10">
            Exclusive for data centre owners in the APAC region with 100% ownership of their facility.
          </p>

          <p className="font-outfit text-xs text-slate-500 max-w-3xl mx-auto italic">
            * Illustrative ranges reflect observed market dynamics only. Actual outcomes depend on execution, scale, capital markets, and broader conditions. GRIDLINE does not guarantee valuation outcomes or liquidity events.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OwnersHero;
