import React from 'react';

const PlatformComparison: React.FC = () => {
  return (
    <section id="comparison" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-outfit text-xxl font-bold mb-6">
            Stand-Alone Asset vs. <span className="text-primary-blue">GRIDLINE</span> Platform
          </h2>
          <p className="font-outfit text-base-figma text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Operational control at the site level remains intact. The value transformation occurs at the platform level.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Standalone Asset Card */}
            <div className="bg-slate-50 rounded-card p-10 border-2 border-slate-200">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-6 bg-slate-200 rounded-2xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="font-outfit text-2xl font-bold text-slate-900 mb-2">STAND-ALONE ASSET</h3>
              </div>

              <ul className="space-y-4">
                {[
                  { label: 'Valuation', text: 'Asset-level cash flow valuation' },
                  { label: 'Concentration', text: 'Single-site tenant and geographic concentration' },
                  { label: 'Financing', text: 'Limited leverage and financing flexibility' },
                  { label: 'Liquidity', text: 'Illiquidity discount in private markets' },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-slate-400 text-xl mt-0.5">&#9675;</span>
                    <div>
                      <div className="font-instrument-sans text-xs font-bold text-slate-900 uppercase tracking-wider">{item.label}</div>
                      <div className="font-outfit text-sm-figma text-slate-600">{item.text}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* GRIDLINE Platform Card */}
            <div className="bg-gradient-to-br from-dark-navy to-dark-blue rounded-card p-10 border-2 border-primary-blue relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary-blue/20 rounded-full blur-3xl"></div>

              <div className="text-center mb-8 relative">
                <div className="w-20 h-20 mx-auto mb-6 bg-primary-blue/20 rounded-2xl flex items-center justify-center border border-primary-blue/40">
                  <svg className="w-10 h-10 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="font-outfit text-2xl font-bold text-white mb-2">
                  GRID<span className="text-primary-blue">LINE</span> PLATFORM
                </h3>
              </div>

              <ul className="space-y-4 relative">
                {[
                  { label: 'Earnings', text: 'Portfolio-diversified earnings' },
                  { label: 'Revenue', text: 'Predictable revenue through standardized reporting' },
                  { label: 'Governance', text: 'Centralized operational and governance discipline' },
                  { label: 'Structure', text: 'Aligned with institutional and public-market benchmarks' },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-primary-blue text-xl mt-0.5">&#9679;</span>
                    <div>
                      <div className="font-instrument-sans text-xs font-bold text-primary-blue uppercase tracking-wider">{item.label}</div>
                      <div className="font-outfit text-sm-figma text-white/80">{item.text}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformComparison;
