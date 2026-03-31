"use client";

import React, { useState } from 'react';
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface CompatibilityScoreData {
  score: number;
  scoreLabel: string;
  band1Score: number;
  band2Score: number;
  band3Score: number;
  answers: Record<string, boolean>;
}

interface Props {
  enquiryId: Id<"enquiries">;
  compatibilityScore: CompatibilityScoreData;
}

const BAND_INFO = [
  { key: 'band1Score', label: 'Thesis', description: 'Investment rationale alignment' },
  { key: 'band2Score', label: 'Structure', description: 'Clean deal fundamentals' },
  { key: 'band3Score', label: 'Quality', description: 'Operational durability & fit' },
] as const;

const LABEL_COLORS: Record<string, string> = {
  "Exceptional Match": "text-emerald-400",
  "Strong Fit": "text-[#4a9eff]",
  "Qualified": "text-[#60a5fa]",
  "Emerging": "text-amber-400",
  "Not Right Now": "text-slate-400",
};

export default function CompatibilityScoreStep({ enquiryId, compatibilityScore }: Props) {
  const advanceStep = useMutation(api.progress.advanceStep);
  const [advancing, setAdvancing] = useState(false);

  const handleAdvance = async () => {
    setAdvancing(true);
    try {
      await advanceStep({ enquiryId, stepKey: "compatViewScore" });
    } catch (error) {
      console.error('Error advancing step:', error);
      setAdvancing(false);
    }
  };

  const labelColor = LABEL_COLORS[compatibilityScore.scoreLabel] || "text-white";

  return (
    <div className="space-y-6">
      {/* Score card */}
      <div className="bg-[#0d1b33] rounded-lg p-6 sm:p-8 text-center">
        <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-4">
          Your Compatibility Rating
        </p>
        <div className="inline-block bg-white/5 border border-white/10 rounded-[19px] px-8 py-5 mb-4">
          <p className={`text-2xl sm:text-3xl font-bold ${labelColor}`}>
            {compatibilityScore.scoreLabel}
          </p>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed max-w-md mx-auto">
          {getScoreMessage(compatibilityScore.scoreLabel)}
        </p>
      </div>

      {/* Band breakdown */}
      <div className="grid grid-cols-3 gap-3">
        {BAND_INFO.map((band) => {
          const score = compatibilityScore[band.key];
          return (
            <div key={band.key} className="bg-[#0d1b33] rounded-lg p-4 text-center">
              <p className="text-xs uppercase tracking-wider text-[#4a9eff] font-bold mb-2">
                {band.label}
              </p>
              <p className="text-2xl font-bold text-white mb-1">
                {score}<span className="text-slate-500 text-sm font-normal">/2</span>
              </p>
              <p className="text-[10px] text-slate-500 leading-tight">
                {band.description}
              </p>
            </div>
          );
        })}
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

      {/* 2-Axis Quality vs Readiness Chart (placeholder — populated after detailed survey) */}
      <QualityReadinessChart />

      {/* Advance CTA */}
      <button
        onClick={handleAdvance}
        disabled={advancing}
        className="w-full py-4 bg-[#4a9eff] hover:bg-[#5aa8ff] text-white rounded-lg font-bold uppercase tracking-widest text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {advancing ? 'Continuing...' : 'Continue — Share Your Facility Details'}
      </button>
      <p className="text-center text-xs text-slate-500">
        Complete the detailed facility survey to unlock your full Quality vs Readiness assessment.
      </p>
    </div>
  );
}

function QualityReadinessChart() {
  // Preview of the 2-axis framework — actual position shown after detailed survey
  return (
    <div className="bg-[#0d1b33] rounded-lg p-6 sm:p-8">
      <p className="text-xs uppercase tracking-widest text-[#4a9eff] font-bold mb-1">
        Qualification Framework
      </p>
      <p className="text-white font-bold text-lg mb-1">Asset Quality vs Deal Readiness</p>
      <p className="text-slate-400 text-xs mb-6">
        Your position on this chart will be determined after completing the detailed facility survey.
      </p>

      <div className="relative">
        {/* Y-axis label */}
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] text-slate-500 font-medium uppercase tracking-wider whitespace-nowrap">
          Asset Quality
        </div>

        {/* Chart area */}
        <div className="ml-6">
          {/* X-axis label */}
          <div className="grid grid-cols-2 gap-1 mb-1">
            {/* Top-left: High Quality, Low Readiness */}
            <div className="bg-amber-500/8 border border-amber-500/20 rounded-lg p-4 min-h-[80px] flex flex-col justify-center items-center text-center">
              <p className="text-amber-400 text-xs font-bold">Nurture</p>
              <p className="text-[10px] text-slate-500 mt-1">High Quality</p>
              <p className="text-[10px] text-slate-500">Low Readiness</p>
            </div>
            {/* Top-right: High Quality, High Readiness */}
            <div className="bg-emerald-500/8 border border-emerald-500/20 rounded-lg p-4 min-h-[80px] flex flex-col justify-center items-center text-center">
              <p className="text-emerald-400 text-xs font-bold">Fast-Track</p>
              <p className="text-[10px] text-slate-500 mt-1">High Quality</p>
              <p className="text-[10px] text-slate-500">High Readiness</p>
            </div>
            {/* Bottom-left: Low Quality, Low Readiness */}
            <div className="bg-slate-500/8 border border-slate-500/20 rounded-lg p-4 min-h-[80px] flex flex-col justify-center items-center text-center">
              <p className="text-slate-400 text-xs font-bold">Park</p>
              <p className="text-[10px] text-slate-500 mt-1">Low Quality</p>
              <p className="text-[10px] text-slate-500">Low Readiness</p>
            </div>
            {/* Bottom-right: Low Quality, High Readiness */}
            <div className="bg-slate-500/8 border border-slate-500/20 rounded-lg p-4 min-h-[80px] flex flex-col justify-center items-center text-center">
              <p className="text-slate-400 text-xs font-bold">Pass</p>
              <p className="text-[10px] text-slate-500 mt-1">Low Quality</p>
              <p className="text-[10px] text-slate-500">High Readiness</p>
            </div>
          </div>
          <p className="text-center text-[10px] text-slate-500 font-medium uppercase tracking-wider mt-2">
            Deal Readiness →
          </p>
        </div>
      </div>
    </div>
  );
}

function getScoreMessage(label: string): string {
  const messages: Record<string, string> = {
    "Exceptional Match": "Your facility aligns with every dimension of the GridLine acquisition profile. Expect to hear from us within 24 hours.",
    "Strong Fit": "Your facility is a strong candidate for the GridLine platform. We'll be in touch within 24 hours to arrange a conversation.",
    "Qualified": "Your facility meets the core criteria. There are a few areas we'd like to explore together — we'll follow up shortly.",
    "Emerging": "Your facility shows real promise. Timing or structure may need to align further. We'll follow up to discuss.",
    "Not Right Now": "Your facility isn't the right fit at this stage, but circumstances change. We'll keep your details on file and be in touch if that shifts.",
  };
  return messages[label] || "";
}
