import React from 'react';

const ValuationRerating: React.FC = () => {
  const comparisonRows = [
    { label: "How it's valued", private: "Based on DC EBITDA today", public: "Based on platform scale and predictability" },
    { label: "Risk", private: "Concentrated in one asset", public: "Spread across multiple assets" },
    { label: "Capital", private: "Raised asset by asset", public: "Raised at platform level" },
    { label: "Contracts & reporting", private: "Custom, harder to finance", public: "Standardised, easier to finance" },
    { label: "Exit options", private: "Sell the asset", public: "Multiple exit pathways" },
  ];

  return (
    <section id="rerating" className="py-24 bg-white overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-slate-100 border border-slate-200">
            <span className="font-instrument-sans text-[10px] font-bold uppercase tracking-widest text-gridline-gray italic">Institutional Alignment Model</span>
          </div>
          <h2 className="font-outfit text-xxl font-bold text-slate-900 mb-4 tracking-tight">DC Enhanced Valuation Within GRIDLINE Platform</h2>
          <p className="font-inter text-lg text-gridline-gray max-w-2xl mx-auto">
            Why Stand-alone Data Centres are worth more inside a unified, public-ready platform.
          </p>
        </div>

        {/* Visual Multiplier Diagram */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-24">
          <div className="w-full max-w-sm p-8 bg-slate-50 rounded-card border border-slate-200 text-center">
            <h4 className="font-instrument-sans text-xs font-bold text-gridline-gray uppercase tracking-widest mb-4">Standalone Asset</h4>
            <div className="font-outfit text-2xl font-bold text-slate-900 mb-2">1x – 3x Revenue</div>
            <div className="font-instrument-sans text-[10px] text-gridline-light-gray italic">Discounted for illiquidity</div>
          </div>

          <div className="flex flex-col items-center">
             <div className="p-3 bg-primary-blue text-white rounded-xl shadow-primary animate-pulse">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
             </div>
             <span className="font-instrument-sans text-[10px] font-bold text-primary-blue uppercase mt-2 tracking-tighter">Platform Integration</span>
          </div>

          <div className="w-full max-w-sm p-8 bg-dark-navy text-white rounded-card border-3 border-primary-blue text-center shadow-primary">
            <h4 className="font-instrument-sans text-xs font-bold text-primary-blue uppercase tracking-widest mb-4">UPSIDE POTENTIAL</h4>
            <div className="font-big-shoulders text-5xl font-bold text-white mb-2">8-10x*</div>
            <div className="font-instrument-sans text-[10px] text-primary-blue/70 italic">Portfolio-wide rerating</div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto overflow-hidden rounded-card border border-slate-200 bg-white shadow-card">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-6 font-instrument-sans text-[10px] font-bold text-gridline-gray uppercase tracking-widest">What Changes</th>
                <th className="p-6 font-instrument-sans text-[10px] font-bold text-gridline-gray uppercase tracking-widest">On Its Own</th>
                <th className="p-6 font-instrument-sans text-[10px] font-bold text-primary-blue uppercase tracking-widest">Inside GRIDLINE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonRows.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="p-6 font-outfit text-sm font-bold text-slate-900">{row.label}</td>
                  <td className="p-6 font-inter text-sm text-gridline-gray">{row.private}</td>
                  <td className="p-6 font-inter text-sm font-medium text-primary-blue">{row.public}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ValuationRerating;
