import React from 'react';
import { OWNERS_PARTNERSHIP_OPTIONS } from '@/constants';

interface OwnerPartnershipOptionsProps {
  onCtaClick?: () => void;
}

const OwnerPartnershipOptions: React.FC<OwnerPartnershipOptionsProps> = ({ onCtaClick }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'star':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        );
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
      default:
        return null;
    }
  };

  return (
    <section id="partnership-options" className="py-28 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-outfit text-xxl font-bold text-dark-navy mb-4">Partnership &amp; Acquisition Options</h2>
          <p className="font-outfit text-gridline-gray max-w-3xl mx-auto text-lg italic">
            The following structures represent conceptual frameworks designed to align technology infrastructure owners with GRIDLINE&apos;s institutional platform strategy.
            Final terms are subject to diligence, structuring, and definitive documentation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {OWNERS_PARTNERSHIP_OPTIONS.map((option, idx) => (
            <div
              key={idx}
              className={`relative bg-white p-10 rounded-card shadow-card border transition-all duration-500 hover:shadow-card-hover hover:-translate-y-1 flex flex-col ${
                option.highlighted
                  ? 'border-primary-blue shadow-primary/20 ring-4 ring-primary-blue/5'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex justify-between items-start mb-8">
                <div className={`p-4 rounded-2xl ${option.highlighted ? 'bg-primary-blue text-white' : 'bg-slate-50 text-slate-900'}`}>
                  {getIcon(option.icon)}
                </div>
                <div className={`inline-block px-3 py-1 rounded-full font-instrument-sans text-xs-figma font-bold uppercase tracking-widest ${
                  option.highlighted ? 'bg-primary-blue/10 text-primary-blue' : 'bg-slate-100 text-gridline-gray'
                }`}>
                  {option.type}
                </div>
              </div>

              <h3 className="font-outfit text-xl font-bold text-dark-navy mb-4 min-h-[56px] leading-snug">{option.title}</h3>

              <ul className="space-y-5 mb-6">
                {option.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex gap-4 font-outfit text-lg text-slate-600 leading-relaxed group/item">
                    <span className="text-primary-blue font-bold transition-transform group-hover/item:scale-125 inline-block">&#8226;</span>
                    {point}
                  </li>
                ))}
              </ul>

              <p className="font-outfit text-lg text-slate-600 italic mb-8">{option.description}</p>

              <div className="mt-auto">
                <button
                  onClick={onCtaClick}
                  className={`w-full py-4 rounded-card font-outfit font-bold text-xs uppercase tracking-widest transition-all shadow-primary active:scale-95 ${
                    option.highlighted
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

export default OwnerPartnershipOptions;
