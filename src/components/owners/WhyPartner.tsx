import React from 'react';

const WhyPartner: React.FC = () => {
  return (
    <section id="why-partner" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-outfit text-xxl font-bold mb-6">
            Why Partner with <span className="text-primary-blue">GRIDLINE</span>
          </h2>
          <p className="font-outfit text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Stand-alone data centers are typically valued on asset-level cash flow and concentration risk.
            Integration into the GRIDLINE platform shifts the valuation framework toward institutional metrics:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Scale */}
          <div className="text-center p-8 rounded-card bg-slate-50 border border-slate-200 hover:border-primary-blue/30 transition-all">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary-blue/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="font-outfit text-xl font-bold text-primary-blue mb-3">Scale</h3>
            <p className="font-outfit text-lg text-slate-600 leading-relaxed">
              Aggregated assets attract institutional capital, strategic buyers, and broader financing options.
            </p>
          </div>

          {/* Predictability */}
          <div className="text-center p-8 rounded-card bg-slate-50 border border-slate-200 hover:border-primary-blue/30 transition-all">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary-blue/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-outfit text-xl font-bold text-primary-blue mb-3">Predictability</h3>
            <p className="font-outfit text-lg text-slate-600 leading-relaxed">
              Standardized reporting, governance, and contracts reduce perceived execution risk.
            </p>
          </div>

          {/* Capital Efficiency */}
          <div className="text-center p-8 rounded-card bg-slate-50 border border-slate-200 hover:border-primary-blue/30 transition-all">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary-blue/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-outfit text-xl font-bold text-primary-blue mb-3">Capital Efficiency</h3>
            <p className="font-outfit text-lg text-slate-600 leading-relaxed">
              A platform-level balance sheet supports more efficient capital structures.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="font-instrument-sans text-sm text-slate-500 italic">
            This structural arbitrage underpins GRIDLINE&apos;s partnered transaction approach.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyPartner;
