"use client";

import React from 'react';

export default function ConfirmNextStepsStep() {
  return (
    <div className="bg-[#0d1b33] rounded-lg p-6 sm:p-8">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-[#4a9eff]/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-[#4a9eff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Confirm Next Steps</h2>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">
            Based on your meeting, our team is preparing the recommended path forward.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-slate-800/30 rounded-lg p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3">What we&apos;re preparing</p>
          <ul className="space-y-3">
            {[
              'Recommended partnership structure based on your facility profile',
              'Preliminary valuation framework for your review',
              'Timeline and milestones for the engagement process',
              'Documentation requirements for the next phase',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <svg className="w-4 h-4 text-[#4a9eff] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#4a9eff]/5 border border-[#4a9eff]/20 rounded-lg p-5">
          <p className="text-sm text-slate-300">
            <span className="text-[#4a9eff] font-bold">Coming soon:</span>{' '}
            Once you confirm your intent to proceed, we&apos;ll move into the formal engagement process — starting with financial review and culminating in a Letter of Intent.
          </p>
        </div>
      </div>
    </div>
  );
}
