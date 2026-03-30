import React from 'react';
import Link from 'next/link';
import GridOverlay from '@/components/GridOverlay';

const HomeHero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-8 py-20 bg-[#0a1628]">
      <GridOverlay />
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h1 className="mb-6">
          <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 tracking-tight leading-tight">
            Secure the Future of
          </div>
          <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#4a9eff] tracking-tight leading-tight">
            Digital Infrastructure
          </div>
        </h1>

        <div className="text-3xl md:text-4xl font-medium text-white/70 mt-6 tracking-wide">
          Own. Aggregate. Institutionalise.
        </div>

        <p className="text-lg text-white/70 mt-8 max-w-3xl mx-auto leading-relaxed">
          GRIDLINE aggregates cash-flow-positive data center assets into institutional-grade portfolios
          built for scale, governance, and long-term durability.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link
            href="/score"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#4a9eff] hover:bg-[#5aa8ff] text-white rounded-lg font-semibold uppercase tracking-wider text-sm transition-all text-center"
          >
            For Data Center Owners
          </Link>
          <Link
            href="/investors"
            className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-[#4a9eff] text-[#4a9eff] hover:bg-[#4a9eff]/10 rounded-lg font-semibold uppercase tracking-wider text-sm transition-all text-center"
          >
            For Investors
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
