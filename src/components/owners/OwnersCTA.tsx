import React from 'react';

interface OwnersCTAProps {
  onCtaClick?: () => void;
}

const OwnersCTA: React.FC<OwnersCTAProps> = ({ onCtaClick }) => {
  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="ownersDotPattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" className="text-slate-900" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#ownersDotPattern)" />
        </svg>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-xxl font-outfit font-bold mb-6 text-slate-950">
          Explore Strategic Alternatives
        </h2>
        <p className="text-slate-600 mb-12 max-w-xl mx-auto leading-relaxed">
          If you are a data center owner exploring strategic alternatives beyond a traditional asset sale, we welcome a confidential conversation.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onCtaClick}
            className="px-10 py-5 bg-slate-950 text-white rounded-card font-bold hover:bg-blue-600 transition-all shadow-2xl shadow-slate-300 uppercase tracking-widest text-xs"
          >
            Request Information Pack
          </button>
          <button
            onClick={onCtaClick}
            className="px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-card font-bold hover:bg-slate-50 transition-all uppercase tracking-widest text-xs"
          >
            Connect with Strategy Team
          </button>
        </div>
      </div>
    </section>
  );
};

export default OwnersCTA;
