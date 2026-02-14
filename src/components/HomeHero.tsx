import React from 'react';
import Link from 'next/link';

const HomeHero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-dark">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-40">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="home-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#2469ff" strokeWidth="1.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#home-grid)" />
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
            <span className="font-instrument-sans text-xs-figma font-bold text-primary-blue uppercase tracking-[0.25em]">Institutional Platform 2026</span>
          </div>

          <h1 className="font-big-shoulders text-mega font-bold tracking-tight mb-8 leading-[1.1]">
            <span className="text-white">Secure the Future of</span>
            <br />
            <span className="text-primary-blue">Digital Infrastructure</span>
          </h1>

          <p className="font-outfit text-base-figma text-slate-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            GRIDLINE is an institutional platform focused on aggregating high-quality, cash-flow-positive data center assets into a scaled, governance-driven portfolio designed for long-term institutional participation.
          </p>

          <p className="font-outfit text-base-figma text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            We partner with data center owners and investors to build durable digital infrastructure platforms through disciplined acquisition, aggregation, and operational alignment.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/owners"
              className="w-full sm:w-auto px-8 py-3.5 bg-primary-blue hover:bg-cta-primary-hover text-white rounded-full font-outfit font-bold uppercase tracking-wider text-xs-figma transition-all shadow-lg shadow-primary-blue/30 hover:shadow-xl hover:shadow-primary-blue/40 active:scale-95 text-center"
            >
              For Data Center Owners
            </Link>
            <Link
              href="/investors"
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent border-2 border-primary-blue/40 text-primary-blue hover:bg-primary-blue/10 rounded-full font-outfit font-bold uppercase tracking-wider text-xs-figma transition-all active:scale-95 text-center"
            >
              For Investors
            </Link>
          </div>

          <p className="font-outfit text-xs-figma text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Purpose-built for scale, predictability, and institutional standards — without speculative development or operational disruption.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
