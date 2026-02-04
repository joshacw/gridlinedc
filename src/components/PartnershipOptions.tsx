import React from 'react';
import { PARTNERSHIP_OPTIONS } from '@/constants';

interface PartnershipOptionsProps {
  onCtaClick?: () => void;
}

const PartnershipOptions: React.FC<PartnershipOptionsProps> = ({ onCtaClick }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'link':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        );
      case 'scale':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
        );
      case 'alert':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="partnership" className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-outfit text-xxl font-bold text-dark-navy mb-4">Partnership & Acquisition Options</h2>
          <p className="font-inter text-gridline-gray max-w-2xl mx-auto text-sm italic">
            The following options represent conceptual frameworks for discussion purposes only. They are not final terms and are subject to further negotiation and definitive documentation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PARTNERSHIP_OPTIONS.map((option, idx) => (
            <div
              key={idx}
              className={`relative bg-white p-10 rounded-card shadow-card border transition-all duration-500 hover:shadow-card-hover hover:-translate-y-1 ${
                idx === 0
                  ? 'border-primary-blue shadow-primary/20 ring-4 ring-primary-blue/5'
                  : 'border-slate-100'
              }`}
            >
              <div className="flex justify-between items-start mb-8">
                <div className={`p-4 rounded-2xl ${idx === 0 ? 'bg-primary-blue text-white' : 'bg-slate-50 text-slate-900'}`}>
                  {getIcon(option.icon)}
                </div>
                <div className={`inline-block px-3 py-1 rounded-full font-instrument-sans text-[10px] font-bold uppercase tracking-widest ${idx === 0 ? 'bg-primary-blue/10 text-primary-blue' : 'bg-slate-100 text-gridline-gray'}`}>
                  {option.type}
                </div>
              </div>

              <h3 className="font-outfit text-xl font-bold text-dark-navy mb-8 min-h-[56px] leading-snug">{option.title}</h3>

              <ul className="space-y-5 mb-10">
                {option.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex gap-4 font-inter text-xs text-gridline-gray leading-relaxed group/item">
                    <span className="text-primary-blue font-bold transition-transform group-hover/item:scale-125 inline-block">•</span>
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <button
                  onClick={onCtaClick}
                  className={`w-full py-4 rounded-2xl font-outfit font-bold text-xs uppercase tracking-widest transition-all shadow-primary active:scale-95 ${
                    idx === 0
                      ? 'bg-primary-blue text-white hover:bg-cta-primary-hover hover:shadow-card-hover'
                      : 'bg-dark-navy text-white hover:bg-dark-blue'
                  }`}
                >
                  Discuss Strategy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnershipOptions;
