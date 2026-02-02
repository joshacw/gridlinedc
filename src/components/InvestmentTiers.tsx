import React from 'react';
import { INVESTMENT_TIERS } from '@/constants';

const InvestmentTiers: React.FC = () => {
  return (
    <section id="strategy" className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-outfit font-bold text-slate-900 mb-4">Aligned Investment Structures</h2>
          <p className="text-slate-600 max-w-lg mx-auto">
            Our yield targets are mathematically derived from the multiplier delta between private acquisition and public listing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {INVESTMENT_TIERS.map((tier) => (
            <div key={tier.id} className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100 hover:border-blue-400 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>

              <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-4">
                {tier.multiplierPath}
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{tier.name}</h3>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">{tier.focus}</p>

              <div className="space-y-4 mb-10">
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <span className="text-slate-500 text-sm">Commitment</span>
                  <span className="font-bold text-slate-900">{tier.minInvestment}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-100">
                  <div className="flex flex-col">
                    <span className="text-slate-500 text-sm">Target Yield</span>
                    <span className="text-[10px] text-blue-500 font-bold uppercase">Via Rerating</span>
                  </div>
                  <span className="font-bold text-blue-600 text-lg">{tier.targetYield}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-slate-500 text-sm">Exit Window</span>
                  <span className="font-bold text-slate-900">{tier.listingHorizon}</span>
                </div>
              </div>

              <button className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold transition-all hover:bg-blue-600 shadow-lg shadow-slate-200 hover:shadow-blue-200">
                Request Strategy Overview
              </button>

              <div className="mt-6 text-center">
                <p className="text-[10px] text-slate-400 font-medium">
                  Returns indexed to the 10x - 12x Portfolio Multiplier target.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestmentTiers;
