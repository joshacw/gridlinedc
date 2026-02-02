import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated Grid Lines */}
        <div className="absolute inset-0 opacity-[0.15]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-400" />
              </pattern>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.2 }} />
                <stop offset="100%" style={{ stopColor: '#1d4ed8', stopOpacity: 0 }} />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating Geometric Shapes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 blur-[100px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-400/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Moving "Scanning" Line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-[scan_8s_linear_infinite]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-slate-200 mb-8 backdrop-blur-sm shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-ping"></span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Institutional Track 2026</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-outfit font-bold tracking-tighter text-slate-950 mb-8 leading-[1.05]">
            Secure the Future of <br />
            <span className="text-blue-600">Digital Assets</span>
          </h1>

          <p className="text-lg text-slate-600 mb-12 max-w-xl mx-auto leading-relaxed">
            GRIDLINE provides a direct investment bridge to high-density data center infrastructure on the path to public listing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto px-10 py-4 bg-slate-950 hover:bg-blue-600 text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-all shadow-xl active:scale-95">
              Secure Allocation
            </button>
            <button className="w-full sm:w-auto px-10 py-4 glass text-slate-900 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white transition-all">
              Strategy Brief
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
