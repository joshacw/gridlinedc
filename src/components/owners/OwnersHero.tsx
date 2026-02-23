import React from 'react';

interface OwnersHeroProps {
  onCtaClick?: () => void;
}

const OwnersHero: React.FC<OwnersHeroProps> = ({ onCtaClick }) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-gradient-dark">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-40">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="owners-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#2469ff" strokeWidth="1.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#owners-grid)" />
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
            <span className="font-instrument-sans text-xs-figma font-bold text-primary-blue uppercase tracking-[0.25em]">For Data Center Owners</span>
          </div>

          <h1 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-8 leading-[1.2] text-white">
            How Small Data Centre Owners Are Multiplying Valuations Through Industry Partnerships &amp; Institutional Finance
          </h1>

          <p className="font-outfit text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Discover how facilities under 5MW are connecting to larger portfolios to unlock higher valuations without adding new infrastructure, landing new contracts or any significant investments. Exclusive for data centre owners in the APAC region with 100% ownership of their facility.
          </p>

          <button
            onClick={onCtaClick}
            className="px-10 py-4 bg-primary-blue hover:bg-cta-primary-hover text-white rounded-full font-outfit font-bold uppercase tracking-wider text-sm transition-all shadow-lg shadow-primary-blue/30 hover:shadow-xl hover:shadow-primary-blue/40 active:scale-95"
          >
            Register Interest
          </button>
        </div>
      </div>
    </section>
  );
};

export default OwnersHero;
