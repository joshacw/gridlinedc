
import React from 'react';
import { ASSET_STRENGTHS } from '../constants';

const AssetProfile: React.FC = () => {
  return (
    <section id="asset-profile" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl font-outfit font-bold text-slate-900 mb-8">Capacity Utilisation</h2>
            
            <div className="flex items-center gap-12 mb-12">
              <div className="relative w-48 h-48">
                {/* SVG rotated -90deg so that the stroke-dasharray starts at the top (12 o'clock) */}
                <svg className="w-full h-full -rotate-90 transform">
                  <circle 
                    cx="96" 
                    cy="96" 
                    r="88" 
                    stroke="currentColor" 
                    strokeWidth="12" 
                    fill="transparent" 
                    className="text-slate-100" 
                  />
                  <circle 
                    cx="96" 
                    cy="96" 
                    r="88" 
                    stroke="currentColor" 
                    strokeWidth="12" 
                    fill="transparent" 
                    strokeDasharray={552.92} 
                    strokeDashoffset={552.92 * 0.75} 
                    strokeLinecap="round"
                    className="text-blue-600 transition-all duration-1000" 
                  />
                </svg>
                {/* Text overlay should be upright (not rotated) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-slate-900">25%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Utilised</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  <span className="text-sm font-medium text-slate-600">Utilised Capacity (25%)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                  <span className="text-sm font-medium text-slate-600">Available Headroom (75%)</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 font-outfit">Key Considerations</h4>
              <ul className="space-y-4">
                {[
                  'Customer concentration (top three customers ~83% of revenue)',
                  'Lease expiries clustered over the next 2–3 years',
                  'Revenue growth dependent on leasing execution'
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed italic">
                    <span className="text-blue-600 font-bold">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-outfit font-bold text-slate-900 mb-8">Asset Strengths Identified</h2>
            <div className="grid grid-cols-1 gap-4">
              {ASSET_STRENGTHS.map((strength, i) => (
                <div key={i} className="flex items-center gap-4 p-5 bg-slate-950 text-white rounded-2xl shadow-lg hover:translate-x-2 transition-transform cursor-default border border-blue-500/20">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium leading-relaxed">{strength}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssetProfile;
