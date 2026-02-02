import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValuationRerating from './components/ValuationRerating';
import PartnershipOptions from './components/PartnershipOptions';
import InvestmentTiers from './components/InvestmentTiers';
import Footer from './components/Footer';
import { FEATURES } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      
      <main>
        <Hero />
        
        <section id="platform" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {FEATURES.map((feature, i) => (
                <div key={i} className="text-center md:text-left">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 font-outfit">{feature.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ValuationRerating />

        <section id="path" className="py-24 bg-slate-950 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-2xl mb-16">
              <h2 className="text-3xl font-outfit font-bold mb-4">Liquidity Path</h2>
              <p className="text-slate-400 leading-relaxed">
                Our roadmap to public listing ensures institutional liquidity for early asset owners by standardizing operations and aggregating scale.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: 'Phase 1', title: 'Onboarding', desc: 'Secure high-density sites and establish baseline governance.' },
                { step: 'Phase 2', title: 'Build-out', desc: 'Scale AI-ready infrastructure with superior capital efficiency.' },
                { step: 'Phase 3', title: 'Portfolio', desc: 'Unified asset aggregation to de-risk earnings via diversification.' },
                { step: 'Phase 4', title: 'Public Exit', desc: 'Institutional IPO / Exchange Listing at target 12x multiples.' }
              ].map((item, idx) => (
                <div key={idx} className="relative group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all">
                  <div className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-4">{item.step}</div>
                  <h4 className="text-lg font-bold mb-2 font-outfit">{item.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PartnershipOptions />

        <InvestmentTiers />

        <section className="py-32 bg-slate-50 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern id="dotPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="currentColor" className="text-slate-900" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#dotPattern)" />
            </svg>
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl font-outfit font-bold mb-6 text-slate-950">Partner with GridlineDC</h2>
            <p className="text-slate-600 mb-12 max-w-lg mx-auto leading-relaxed">
              Open to accredited investors and data center asset owners looking for a strategic exit via institutional rerating and portfolio aggregation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-10 py-5 bg-slate-950 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-2xl shadow-slate-300 uppercase tracking-widest text-xs">
                Connect with Advisory
              </button>
              <button className="px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all uppercase tracking-widest text-xs">
                Contact Strategy Team
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;