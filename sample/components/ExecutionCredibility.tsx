
import React from 'react';

const ExecutionCredibility: React.FC = () => {
  const assets = [
    { name: 'Asset 1', capacity: '1.0 MW', revenue: '$0.5M' },
    { name: 'Asset 2', capacity: '1.5 MW', revenue: '$1.2M' },
    { name: 'Asset 3', capacity: '2.0 MW', revenue: '$1.6M' },
    { name: 'Asset 4', capacity: '3.0 MW', revenue: '$1.8M' },
  ];

  return (
    <section id="credibility" className="py-24 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3">
            <h2 className="text-3xl font-outfit font-bold mb-6">Execution Credibility</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              GridLine operates a related platform under a similar aggregation model. To date, that platform has acquired four operating data centers.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <span className="block text-3xl font-bold text-blue-500 mb-1">4</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Operating Tier II/III DCs</span>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <span className="block text-3xl font-bold text-blue-500 mb-1">12X</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Target After IPO</span>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <span className="block text-3xl font-bold text-blue-500 mb-1">~$58M</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Indicative Mkt Cap</span>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <span className="block text-3xl font-bold text-blue-500 mb-1">~$4M</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Annual Revenue</span>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3 w-full">
            <div className="overflow-hidden border border-white/10 rounded-3xl">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5">
                    {assets.map((asset, i) => (
                      <th key={i} className="p-6 font-bold border-b border-white/10 text-blue-400">{asset.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {assets.map((asset, i) => (
                      <td key={i} className="p-6 border-b border-white/10">
                        <span className="block text-[10px] text-slate-500 uppercase font-bold mb-1">Capacity</span>
                        <span className="text-sm font-medium">{asset.capacity}</span>
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-white/5">
                    {assets.map((asset, i) => (
                      <td key={i} className="p-6">
                        <span className="block text-[10px] text-slate-500 uppercase font-bold mb-1">Annual Revenue</span>
                        <span className="text-sm font-medium">~{asset.revenue}</span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-8 flex justify-center gap-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="w-12 h-16 bg-white/5 rounded-lg border border-white/10 flex flex-col items-center justify-center">
                  <svg className="w-8 h-8 text-blue-500/50" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 21H5V7H19V21ZM17 19V9H7V19H17Z" />
                    <path d="M1 21V1H15V5H23V21H1V21ZM3 19H5V3H13V5H15V19H21V7H15V3H13V19H3Z" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExecutionCredibility;
