"use client";

import React, { useState, useEffect } from 'react';
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

const GHL_CALENDAR_URL = "https://l.ifted.net/widget/booking/fM4FD1UfwWqblr5tLSuH";
const GHL_FORM_EMBED_SCRIPT = "https://l.ifted.net/js/form_embed.js";

interface Props {
  enquiryId: Id<"enquiries">;
}

export default function BookMeetingStep({ enquiryId }: Props) {
  const advanceStep = useMutation(api.progress.advanceStep);
  const [confirming, setConfirming] = useState(false);

  // Load the GHL form embed script
  useEffect(() => {
    if (document.querySelector(`script[src="${GHL_FORM_EMBED_SCRIPT}"]`)) return;
    const script = document.createElement('script');
    script.src = GHL_FORM_EMBED_SCRIPT;
    script.type = 'text/javascript';
    document.body.appendChild(script);
  }, []);

  const handleConfirm = async () => {
    setConfirming(true);
    try {
      await advanceStep({ enquiryId, stepKey: "bookMeeting" });
    } catch (error) {
      console.error('Error advancing step:', error);
      setConfirming(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="bg-[#0d1b33] rounded-lg p-6 sm:p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-[#4a9eff]/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-[#4a9eff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Book Your Meeting</h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Schedule a time with our team to discuss your data centre and explore partnership options.
            </p>
          </div>
        </div>

        {/* What to expect */}
        <div className="bg-slate-800/30 rounded-lg p-5 mb-6">
          <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3">What to expect</p>
          <ul className="space-y-2">
            {[
              'A 30-minute introductory call with a member of our partnerships team',
              'Discussion of your facility and current operational profile',
              'Overview of GRIDLINE partnership structures and next steps',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <svg className="w-4 h-4 text-[#4a9eff] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Calendar embed */}
        <iframe
          src={GHL_CALENDAR_URL}
          style={{ width: '100%', border: 'none', overflow: 'hidden' }}
          scrolling="no"
          id="fM4FD1UfwWqblr5tLSuH_1771808208511"
          className="min-h-[600px] sm:min-h-[700px] rounded-lg"
          title="Schedule a Meeting"
        />
      </div>

      {/* Confirmation button */}
      <button
        onClick={handleConfirm}
        disabled={confirming}
        className="w-full py-4 bg-[#4a9eff] hover:bg-[#5aa8ff] text-white rounded-lg font-bold uppercase tracking-widest text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {confirming ? 'Confirming...' : "I've Booked My Meeting"}
      </button>
      <p className="text-center text-xs text-slate-500">
        Click the button above after you&apos;ve selected a time slot in the calendar.
      </p>
    </div>
  );
}
