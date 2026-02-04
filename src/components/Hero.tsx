import React from 'react';

interface HeroProps {
  onCtaClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden" style={{ backgroundColor: '#00030f' }}>
      {/* Vibrant Grid Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Bright Grid Pattern */}
        <div className="absolute inset-0 opacity-40">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="bright-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#2469ff" strokeWidth="1.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#bright-grid)" />
          </svg>
        </div>

        {/* Strong Blue Glow - Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-blue/20 blur-[150px] rounded-full"></div>

        {/* Additional Glow Effects */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary-blue/15 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-primary-blue/15 blur-[120px] rounded-full"></div>

        {/* Vignette Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-blue/10 border border-primary-blue/30 mb-8 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary-blue animate-ping"></span>
            <span className="font-instrument-sans text-[10px] font-bold text-primary-blue uppercase tracking-[0.25em]">Institutional Track 2026</span>
          </div>

          <h1 className="font-big-shoulders text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
            <span className="text-white">Secure the </span>
            <span className="text-primary-blue">Future of</span>
            <br />
            <span className="text-primary-blue">Digital Assets</span>
          </h1>

          <p className="font-inter text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            GRIDLINE provides a direct investment bridge to high-density data center infrastructure on the path to public listing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onCtaClick}
              className="w-full sm:w-auto px-8 py-3.5 bg-primary-blue hover:bg-[#1d5ae6] text-white rounded-full font-outfit font-bold uppercase tracking-wider text-[11px] transition-all shadow-lg shadow-primary-blue/30 hover:shadow-xl hover:shadow-primary-blue/40 active:scale-95"
            >
              For Asset Owners
            </button>
            <button
              onClick={onCtaClick}
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent border-2 border-primary-blue/40 text-primary-blue hover:bg-primary-blue/10 rounded-full font-outfit font-bold uppercase tracking-wider text-[11px] transition-all active:scale-95"
            >
              For Investors
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
