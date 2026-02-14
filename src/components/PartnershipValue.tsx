import React from 'react';

const PartnershipValue: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-outfit text-4xl md:text-5xl font-bold mb-6">
            How <span className="text-primary-blue">GRIDLINE</span> Partnership Changes Value
          </h2>
          <p className="font-inter text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Stand-alone data centres are typically valued on asset-level cash flow and concentration risk.
            Platform integration shifts the valuation lens towards:
          </p>
        </div>

        {/* Three pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary-blue/10 flex items-center justify-center">
              <span className="text-3xl">•</span>
            </div>
            <h3 className="font-outfit text-xl font-bold text-primary-blue mb-3">Scale</h3>
            <p className="font-inter text-sm text-slate-600 leading-relaxed">
              Aggregated portfolio commands institutional attention and better terms
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary-blue/10 flex items-center justify-center">
              <span className="text-3xl">•</span>
            </div>
            <h3 className="font-outfit text-xl font-bold text-primary-blue mb-3">Predictability</h3>
            <p className="font-inter text-sm text-slate-600 leading-relaxed">
              Standardised reporting and governance reduce perceived execution risk
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary-blue/10 flex items-center justify-center">
              <span className="text-3xl">•</span>
            </div>
            <h3 className="font-outfit text-xl font-bold text-primary-blue mb-3">Capital efficiency</h3>
            <p className="font-inter text-sm text-slate-600 leading-relaxed">
              Consolidated balance sheet unlocks cheaper debt and equity
            </p>
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="max-w-5xl mx-auto">
          <p className="text-center font-instrument-sans text-sm text-slate-500 mb-8 italic">
            This structural undergirds GRIDLINE's partnered transaction approach.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Standalone Asset Card */}
            <div className="bg-slate-50 rounded-3xl p-10 border-2 border-slate-200">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-6 bg-slate-200 rounded-2xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="font-outfit text-2xl font-bold text-slate-900 mb-2">STANDALONE ASSET</h3>
              </div>

              <ul className="space-y-4">
                {[
                  { icon: '○', label: 'Asset Cashflow', text: 'Single-site revenue concentration' },
                  { icon: '○', label: 'Concentration Risk', text: 'Tenant/location dependency' },
                  { icon: '○', label: 'Single Balance Sheet', text: 'Limited leverage capacity' }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-slate-400 text-xl mt-0.5">{item.icon}</span>
                    <div>
                      <div className="font-instrument-sans text-xs font-bold text-slate-900 uppercase tracking-wider">{item.label}</div>
                      <div className="font-inter text-sm text-slate-600">{item.text}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* GRIDLINE Platform Card */}
            <div className="bg-gradient-to-br from-dark-navy to-dark-blue rounded-3xl p-10 border-2 border-primary-blue relative overflow-hidden">
              {/* Glow effect */}
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
                  { icon: '●', label: 'De-risked earnings', text: 'Portfolio diversification across sites' },
                  { icon: '●', label: 'Predictable revenue', text: 'Standardised contracts & reporting' },
                  { icon: '●', label: 'Operational scale', text: 'Centralised management efficiency' },
                  { icon: '●', label: 'Enhanced positioning', text: 'Public-market ready structure' }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-primary-blue text-xl mt-0.5">{item.icon}</span>
                    <div>
                      <div className="font-instrument-sans text-xs font-bold text-primary-blue uppercase tracking-wider">{item.label}</div>
                      <div className="font-inter text-sm text-white/80">{item.text}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="font-inter text-base text-slate-700 mb-6 max-w-2xl mx-auto">
            We are actively sourcing acquisition targets now.<br />
            <span className="font-bold">If you are a data center owner, let's talk</span>
          </p>
          <button className="px-8 py-4 bg-primary-blue hover:bg-[#1d5ae6] text-white rounded-full font-outfit font-bold uppercase tracking-wider text-sm transition-all shadow-lg shadow-primary-blue/30 active:scale-95">
            Request Info Pack
          </button>
        </div>
      </div>
    </section>
  );
};

export default PartnershipValue;
