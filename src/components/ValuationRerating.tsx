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
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 italic">Institutional Alignment Model</span>
          </div>
          <h2 className="text-4xl font-outfit font-bold text-slate-900 mb-4 tracking-tight">DC Enhanced Valuation Within GRIDLINE Platform</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Why Stand-alone Data Centres are worth more inside a unified, public-ready platform.
          </p>
        </div>

        {/* Visual Multiplier Diagram */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-24">
          <div className="w-full max-w-sm p-8 bg-slate-50 rounded-3xl border border-slate-200 text-center">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Standalone Asset</h4>
            <div className="text-2xl font-bold text-slate-900 mb-2">1x – 3x Revenue</div>
            <div className="text-[10px] text-slate-500 italic">Discounted for illiquidity</div>
          </div>

          <div className="flex flex-col items-center">
             <div className="p-3 bg-blue-600 text-white rounded-xl shadow-lg animate-pulse">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
             </div>
             <span className="text-[10px] font-bold text-blue-600 uppercase mt-2 tracking-tighter">Platform Integration</span>
          </div>

          <div className="w-full max-w-sm p-8 bg-slate-950 text-white rounded-3xl border border-blue-500/30 text-center shadow-2xl">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">Institutional / Public Market</h4>
            <div className="text-2xl font-bold text-white mb-2">*8-12X Multiple</div>
            <div className="text-[10px] text-blue-300 italic">Portfolio-wide rerating</div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">What Changes</th>
                <th className="p-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">On Its Own</th>
                <th className="p-6 text-[10px] font-bold text-blue-600 uppercase tracking-widest">Inside GridLine</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonRows.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="p-6 text-sm font-bold text-slate-900">{row.label}</td>
                  <td className="p-6 text-sm text-slate-500">{row.private}</td>
                  <td className="p-6 text-sm font-medium text-blue-600">{row.public}</td>
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
