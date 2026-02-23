"use client";

import React, { useState } from 'react';
import { useAction } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { DC_SURVEY_QUESTIONS } from '@/constants';

interface Props {
  enquiryId: Id<"enquiries">;
  existingSurvey?: Record<string, string | undefined>;
}

type SurveyData = Record<string, string>;

export default function DCDetailsSurveyStep({ enquiryId, existingSurvey }: Props) {
  const submitSurvey = useAction(api.progress.submitSurveyFromProgress);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [survey, setSurvey] = useState<SurveyData>(() => {
    const initial: SurveyData = {};
    DC_SURVEY_QUESTIONS.forEach(q => {
      initial[q.key] = existingSurvey?.[q.key] || '';
    });
    return initial;
  });

  const completedCount = DC_SURVEY_QUESTIONS.filter(q => survey[q.key]?.trim()).length;
  const allComplete = completedCount === DC_SURVEY_QUESTIONS.length;

  const handleSubmit = async () => {
    if (!allComplete) return;
    setIsSubmitting(true);
    try {
      await submitSurvey({
        enquiryId,
        survey: {
          ownershipStructure: survey.ownershipStructure || undefined,
          currentPowerUtilisation: survey.currentPowerUtilisation || undefined,
          powerScalability: survey.powerScalability || undefined,
          customerBase: survey.customerBase || undefined,
          customerConcentration: survey.customerConcentration || undefined,
          contractTenure: survey.contractTenure || undefined,
          anchorTenants: survey.anchorTenants || undefined,
          networkConnectivity: survey.networkConnectivity || undefined,
          annualRevenue: survey.annualRevenue || undefined,
          ebitdaRange: survey.ebitdaRange || undefined,
          capitalOutlook: survey.capitalOutlook || undefined,
        },
      });
    } catch (error) {
      console.error('Error submitting survey:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#030948] rounded-[19px] p-6 sm:p-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-[#2469ff]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-[#2469ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-outfit font-bold text-white">Share Your DC Details</h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              This information helps us understand your asset and prepare for the meeting. Please complete all fields before your call.
            </p>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-3 bg-slate-800/30 rounded-xl px-4 py-3">
          <div className="flex-1 h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2469ff] rounded-full transition-all duration-300"
              style={{ width: `${(completedCount / DC_SURVEY_QUESTIONS.length) * 100}%` }}
            />
          </div>
          <span className="text-xs text-slate-400 font-medium whitespace-nowrap">
            {completedCount} / {DC_SURVEY_QUESTIONS.length}
          </span>
        </div>
      </div>

      {/* Survey questions */}
      <div className="space-y-4">
        {DC_SURVEY_QUESTIONS.map(({ key, label, question, placeholder }) => (
          <div key={key} className="bg-[#030948] rounded-[19px] p-5 sm:p-6">
            <label className="block text-xs font-bold text-[#2469ff] uppercase tracking-wider mb-1">
              {label} *
            </label>
            <p className="text-sm text-slate-300 mb-3">{question}</p>
            <textarea
              value={survey[key]}
              onChange={(e) => setSurvey(prev => ({ ...prev, [key]: e.target.value }))}
              placeholder={placeholder}
              rows={2}
              className={`w-full px-4 py-3 bg-[#010825] border rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-[#2469ff] focus:ring-2 focus:ring-[#2469ff]/20 transition-all resize-none ${
                survey[key]?.trim() ? 'border-[#2469ff]/30' : 'border-slate-700/30'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting || !allComplete}
        className="w-full py-4 bg-[#2469ff] hover:bg-[#1d5ae6] text-white rounded-[19px] font-bold uppercase tracking-widest text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit DC Details'}
      </button>
      {!allComplete && (
        <p className="text-center text-xs text-slate-500">
          Please complete all {DC_SURVEY_QUESTIONS.length} fields to continue.
        </p>
      )}
    </div>
  );
}
