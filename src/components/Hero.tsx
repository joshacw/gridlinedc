import React from 'react';

interface HeroProps {
  onCtaClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-32 overflow-hidden bg-dark-navy">
      {/* Navy Grid Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="navy-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2469ff" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#navy-grid)" />
          </svg>
        </div>

        {/* Gradient Overlay from top */}
        <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-dark-blue/40 via-dark-navy/20 to-transparent"></div>

        {/* Blue Glow Effects */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary-blue/5 blur-[120px] rounded-full"></div>
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary-blue/8 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>

        {/* Subtle scan line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-blue/30 to-transparent animate-[scan_8s_linear_infinite]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-blue/10 border border-primary-blue/30 mb-8 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary-blue animate-ping"></span>
            <span className="font-instrument-sans text-[10px] font-bold text-primary-blue uppercase tracking-[0.2em]">Institutional Track 2026</span>
          </div>

          <h1 className="font-big-shoulders text-5xl md:text-mega font-bold tracking-tighter text-white mb-8 leading-[1.05]">
            Secure the Future of <br />
            <span className="text-primary-blue">Digital Assets</span>
          </h1>

          <p className="font-inter text-lg text-slate-300 mb-12 max-w-xl mx-auto leading-relaxed">
            GRIDLINE provides a direct investment bridge to high-density data center infrastructure on the path to public listing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={onCtaClick}
              className="w-full sm:w-auto px-10 py-4 bg-primary-blue hover:bg-cta-primary-hover text-white rounded-2xl font-outfit font-bold uppercase tracking-widest text-xs transition-all shadow-primary active:scale-95"
            >
              Secure Allocation
            </button>
            <button
              onClick={onCtaClick}
              className="w-full sm:w-auto px-10 py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-outfit font-bold uppercase tracking-widest text-xs hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              Strategy Brief
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
