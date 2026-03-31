"use client";

import React, { useState } from 'react';
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface Props {
  enquiryId: Id<"enquiries">;
  qualityScore: number;
  readinessScore: number;
  totalScore: number;
  tier: string;
}

const MAX_QUALITY = 18;
const MAX_READINESS = 21;

const TIER_COLORS: Record<string, string> = {
  "Priority Acquisition Target": "text-emerald-400",
  "Strong Candidate": "text-[#4a9eff]",
  "Conditional — Needs Alignment": "text-amber-400",
  "Unlikely Fit": "text-orange-400",
  "Not Aligned": "text-slate-400",
};

const TIER_MESSAGES: Record<string, string> = {
  "Priority Acquisition Target": "Your facility scores exceptionally across both asset quality and deal readiness. Expect to hear from us within 24 hours.",
  "Strong Candidate": "Your facility is a strong match for the GridLine platform. We'll be in touch within 24 hours to discuss next steps.",
  "Conditional — Needs Alignment": "Your facility shows potential, but there are areas that need alignment. We'll follow up to explore further.",
  "Unlikely Fit": "Your facility doesn't meet our current criteria in several areas, but circumstances change. We'll keep your details on file.",
  "Not Aligned": "Your facility isn't the right fit at this stage. We'll keep your details on file and be in touch if that shifts.",
};

export default function CompatibilityScoreStep({ enquiryId, qualityScore, readinessScore, totalScore, tier }: Props) {
  const advanceStep = useMutation(api.progress.advanceStep);
  const [advancing, setAdvancing] = useState(false);

  const handleAdvance = async () => {
    setAdvancing(true);
    try {
      await advanceStep({ enquiryId, stepKey: "discoverFit" });
    } catch (error) {
      console.error('Error advancing step:', error);
      setAdvancing(false);
    }
  };

  const tierColor = TIER_COLORS[tier] || "text-white";
  const qualityPct = Math.round((qualityScore / MAX_QUALITY) * 100);
  const readinessPct = Math.round((readinessScore / MAX_READINESS) * 100);

  // Determine quadrant
  const isHighQuality = qualityPct >= 50;
  const isHighReadiness = readinessPct >= 50;

  return (
    <div className="space-y-6">
      {/* Tier card */}
      <div className="bg-[#0d1b33] rounded-lg p-6 sm:p-8 text-center">
        <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-4">
          Your Compatibility Rating
        </p>
        <div className="inline-block bg-white/5 border border-white/10 rounded-[19px] px-8 py-5 mb-4">
          <p className={`text-2xl sm:text-3xl font-bold ${tierColor}`}>
            {tier}
          </p>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto">
          {TIER_MESSAGES[tier] || ""}
        </p>
      </div>

      {/* Score breakdown */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#0d1b33] rounded-lg p-5 text-center">
          <p className="text-xs uppercase tracking-wider text-[#4a9eff] font-bold mb-2">
            Asset Quality
          </p>
          <p className="text-3xl font-bold text-white mb-1">
            {qualityScore}<span className="text-slate-500 text-sm font-normal">/{MAX_QUALITY}</span>
          </p>
          <div className="w-full h-1.5 bg-white/10 rounded-full mt-3">
            <div
              className="h-full bg-[#4a9eff] rounded-full transition-all duration-500"
              style={{ width: `${qualityPct}%` }}
            />
          </div>
        </div>
        <div className="bg-[#0d1b33] rounded-lg p-5 text-center">
          <p className="text-xs uppercase tracking-wider text-[#4a9eff] font-bold mb-2">
            Deal Readiness
          </p>
          <p className="text-3xl font-bold text-white mb-1">
            {readinessScore}<span className="text-slate-500 text-sm font-normal">/{MAX_READINESS}</span>
          </p>
          <div className="w-full h-1.5 bg-white/10 rounded-full mt-3">
            <div
              className="h-full bg-[#4a9eff] rounded-full transition-all duration-500"
              style={{ width: `${readinessPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2-Axis Quality vs Readiness Chart */}
      <div className="bg-[#0d1b33] rounded-lg p-6 sm:p-8">
        <p className="text-xs uppercase tracking-widest text-[#4a9eff] font-bold mb-1">
          Qualification Framework
        </p>
        <p className="text-white font-bold text-lg mb-6">Where Your Facility Sits</p>

        <div className="relative">
          {/* Y-axis label */}
          <div className="absolute -left-1 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] text-slate-500 font-medium uppercase tracking-wider whitespace-nowrap">
            Asset Quality
          </div>

          <div className="ml-6">
            <div className="grid grid-cols-2 gap-1 mb-1">
              {/* Top-left: High Quality, Low Readiness = Nurture */}
              <div className={`border rounded-lg p-4 min-h-[80px] flex flex-col justify-center items-center text-center transition-all ${
                isHighQuality && !isHighReadiness
                  ? 'bg-amber-500/15 border-amber-500/40 ring-2 ring-amber-500/30'
                  : 'bg-amber-500/5 border-amber-500/15'
              }`}>
                <p className="text-amber-400 text-xs font-bold">Nurture</p>
                <p className="text-[10px] text-slate-500 mt-1">High Quality, Low Readiness</p>
                {isHighQuality && !isHighReadiness && (
                  <div className="w-3 h-3 rounded-full bg-amber-400 mt-2 animate-pulse" />
                )}
              </div>
              {/* Top-right: High Quality, High Readiness = Fast-Track */}
              <div className={`border rounded-lg p-4 min-h-[80px] flex flex-col justify-center items-center text-center transition-all ${
                isHighQuality && isHighReadiness
                  ? 'bg-emerald-500/15 border-emerald-500/40 ring-2 ring-emerald-500/30'
                  : 'bg-emerald-500/5 border-emerald-500/15'
              }`}>
                <p className="text-emerald-400 text-xs font-bold">Fast-Track</p>
                <p className="text-[10px] text-slate-500 mt-1">High Quality, High Readiness</p>
                {isHighQuality && isHighReadiness && (
                  <div className="w-3 h-3 rounded-full bg-emerald-400 mt-2 animate-pulse" />
                )}
              </div>
              {/* Bottom-left: Low Quality, Low Readiness = Park */}
              <div className={`border rounded-lg p-4 min-h-[80px] flex flex-col justify-center items-center text-center transition-all ${
                !isHighQuality && !isHighReadiness
                  ? 'bg-slate-500/15 border-slate-500/40 ring-2 ring-slate-500/30'
                  : 'bg-slate-500/5 border-slate-500/15'
              }`}>
                <p className="text-slate-400 text-xs font-bold">Park</p>
                <p className="text-[10px] text-slate-500 mt-1">Low Quality, Low Readiness</p>
                {!isHighQuality && !isHighReadiness && (
                  <div className="w-3 h-3 rounded-full bg-slate-400 mt-2 animate-pulse" />
                )}
              </div>
              {/* Bottom-right: Low Quality, High Readiness = Pass */}
              <div className={`border rounded-lg p-4 min-h-[80px] flex flex-col justify-center items-center text-center transition-all ${
                !isHighQuality && isHighReadiness
                  ? 'bg-slate-500/15 border-slate-500/40 ring-2 ring-slate-500/30'
                  : 'bg-slate-500/5 border-slate-500/15'
              }`}>
                <p className="text-slate-400 text-xs font-bold">Pass</p>
                <p className="text-[10px] text-slate-500 mt-1">Low Quality, High Readiness</p>
                {!isHighQuality && isHighReadiness && (
                  <div className="w-3 h-3 rounded-full bg-slate-400 mt-2 animate-pulse" />
                )}
              </div>
            </div>
            <p className="text-center text-[10px] text-slate-500 font-medium uppercase tracking-wider mt-2">
              Deal Readiness →
            </p>
          </div>
        </div>
      </div>

      {/* PDF download */}
      <div className="bg-[#0d1b33] rounded-lg p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#4a9eff]/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-[#4a9eff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg">Evaluation Report</h3>
            <p className="text-slate-400 text-sm mt-1 mb-4">
              Download our acquisition evaluation framework to understand how we assess and value data centre assets.
            </p>
            <a
              href="/GridlineDC_Your_Fit.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/20 rounded-lg text-sm font-semibold text-white hover:bg-white/10 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </a>
          </div>
        </div>
      </div>

      {/* Advance CTA */}
      <button
        onClick={handleAdvance}
        disabled={advancing}
        className="w-full py-4 bg-[#4a9eff] hover:bg-[#5aa8ff] text-white rounded-lg font-bold uppercase tracking-widest text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {advancing ? 'Continuing...' : 'Continue — Book A Call'}
      </button>
    </div>
  );
}
