"use client";

import React from 'react';

interface Props {
  name: string;
}

export default function HaveMeetingStep({ name }: Props) {
  const firstName = name?.split(' ')[0] || 'there';

  return (
    <div className="bg-[#030948] rounded-[19px] p-6 sm:p-8">
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-[#2469ff]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-[#2469ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white">Meeting Pending</h2>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">
            {firstName}, your meeting with the GRIDLINE team is coming up.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-slate-800/30 rounded-2xl p-5">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3">Prepare for your meeting</p>
          <ul className="space-y-3">
            {[
              'Review the DC details you submitted to ensure accuracy',
              'Prepare any questions about GRIDLINE partnership structures',
              'Have an overview of your facility\'s growth plans ready',
              'Consider which partnership option may suit your objectives',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                <span className="w-5 h-5 rounded-full bg-[#2469ff]/10 text-[#2469ff] flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#2469ff]/5 border border-[#2469ff]/20 rounded-2xl p-5">
          <p className="text-sm text-slate-300">
            <span className="text-[#2469ff] font-bold">What happens next:</span>{' '}
            After the meeting, our team will update your progress here. You&apos;ll be notified when the next step is ready.
          </p>
        </div>
      </div>
    </div>
  );
}
