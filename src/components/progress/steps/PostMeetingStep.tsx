"use client";

import React from 'react';

interface Props {
  stepNumber: number;
  label: string;
  description: string;
  detail: string;
}

const STEP_ICONS: Record<number, React.ReactNode> = {
  7: (
    <svg className="w-6 h-6 text-[#2469ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  8: (
    <svg className="w-6 h-6 text-[#2469ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  9: (
    <svg className="w-6 h-6 text-[#2469ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  10: (
    <svg className="w-6 h-6 text-[#2469ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  11: (
    <svg className="w-6 h-6 text-[#2469ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  12: (
    <svg className="w-6 h-6 text-[#2469ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
    </svg>
  ),
};

export default function PostMeetingStep({ stepNumber, label, description, detail }: Props) {
  return (
    <div className="bg-[#030948] rounded-[19px] p-6 sm:p-8">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-[#2469ff]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
          {STEP_ICONS[stepNumber] || STEP_ICONS[7]}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-widest text-[#2469ff] font-bold">Step {stepNumber}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white">{label}</h2>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">{description}</p>
        </div>
      </div>

      <div className="bg-slate-800/30 rounded-2xl p-5">
        <p className="text-sm text-slate-300 leading-relaxed">{detail}</p>
      </div>

      <div className="mt-6 bg-[#2469ff]/5 border border-[#2469ff]/20 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-[#2469ff] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-slate-300">
            This step is managed by the GRIDLINE team. Your progress will update automatically as milestones are reached. If you have questions, reach out to your account contact.
          </p>
        </div>
      </div>
    </div>
  );
}
