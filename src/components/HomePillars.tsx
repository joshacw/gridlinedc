import React from 'react';

const PILLARS = [
  {
    title: 'Acquire',
    description: 'Operating, cash-flow-positive data center assets',
    icon: (
      <svg className="w-6 h-6 text-[#4a9eff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    title: 'Aggregate',
    description: 'Scaled platforms with aligned capital structures',
    icon: (
      <svg className="w-6 h-6 text-[#4a9eff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
  },
  {
    title: 'Govern',
    description: 'Institutional-grade oversight, controls, and reporting',
    icon: (
      <svg className="w-6 h-6 text-[#4a9eff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

const HomePillars: React.FC = () => {
  return (
    <>
      <section className="px-8 py-20 bg-white border-t border-[#0a1e3d]/10">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[#0a1e3d]/60 text-lg mb-16 max-w-3xl mx-auto leading-relaxed">
            Purpose-built for scale, predictability, and institutional standards — without speculative development or operational disruption.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="text-center group">
                <div className="w-14 h-14 rounded-xl border border-[#0a1e3d]/10 flex items-center justify-center mx-auto mb-6 group-hover:border-[#4a9eff]/30 transition-colors">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 tracking-wide text-[#0a1e3d]">
                  {pillar.title}
                </h3>
                <p className="text-[#0a1e3d]/60 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Region indicator */}
      <div className="px-8 py-8 bg-white border-t border-[#0a1e3d]/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#0a1e3d]/50 text-base">
            Operating across APAC, North America, and EMEA
          </p>
        </div>
      </div>
    </>
  );
};

export default HomePillars;
