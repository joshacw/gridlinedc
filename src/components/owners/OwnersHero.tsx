import React from 'react';

interface OwnersHeroProps {
  onCtaClick?: () => void;
}

const OwnersHero: React.FC<OwnersHeroProps> = ({ onCtaClick }) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-[#0a1628]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Headline + Subtext */}
        <div className="text-center max-w-5xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-8">
            How <span className="text-[#4a9eff]">Small Data Centre Owners Are Multiplying Valuations</span> Through Industry Partnerships &amp; Institutional Finance
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            Discover how facilities are connecting to larger portfolios to unlock higher valuations without adding new infrastructure, landing new contracts or any significant investments.
          </p>
        </div>

        {/* Valuation Comparison Cards */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative">
            {/* Standalone Asset */}
            <div className="bg-[#0d1b33] rounded-lg p-12 border border-white/10 text-center">
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-6">
                STANDALONE ASSET
              </h3>
              <div className="mb-6">
                <div className="text-6xl lg:text-7xl font-bold text-white mb-2">
                  1-3x
                </div>
                <div className="text-lg font-semibold text-white/50">
                  Revenue Multiple
                </div>
              </div>
              <div className="space-y-3 text-left pl-4">
                <div className="flex items-center gap-3">
                  <span className="text-white/30 text-xs shrink-0">&#9679;</span>
                  <p className="text-lg text-white/70">Private market</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white/30 text-xs shrink-0">&#9679;</span>
                  <p className="text-lg text-white/70">Illiquidity discount</p>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
              <svg className="w-12 h-12 text-[#4a9eff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>

            {/* Upside Potential */}
            <div className="bg-[#4a9eff] rounded-lg p-12 text-center">
              <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-6">
                UPSIDE POTENTIAL
              </h3>
              <div className="mb-6">
                <div className="text-6xl lg:text-7xl font-bold text-white mb-2">
                  8-10x<span className="text-4xl">*</span>
                </div>
                <div className="text-lg font-semibold text-white/90">
                  EBITDA Multiple
                </div>
              </div>
              <div className="space-y-3 text-left pl-4">
                <div className="flex items-center gap-3">
                  <span className="text-white text-xs shrink-0">&#9679;</span>
                  <p className="text-lg text-white/90">Public market</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-white text-xs shrink-0">&#9679;</span>
                  <p className="text-lg text-white/90">Platform comparables</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={onCtaClick}
            className="px-10 py-4 bg-[#4a9eff] hover:bg-[#5aa8ff] text-white rounded-lg font-semibold uppercase tracking-wider text-sm transition-all mb-6"
          >
            Explore Your Potential Upside
          </button>

          <p className="text-sm text-white/50 max-w-xl mx-auto mb-10">
            Exclusive for data centre owners in the APAC region with 100% ownership of their facility.
          </p>

          <p className="text-xs text-white/30 max-w-3xl mx-auto italic">
            * Illustrative ranges reflect observed market dynamics only. Actual outcomes depend on execution, scale, capital markets, and broader conditions. GRIDLINE does not guarantee valuation outcomes or liquidity events.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OwnersHero;
