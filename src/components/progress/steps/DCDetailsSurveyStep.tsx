"use client";

import React, { useState, useRef, useCallback } from 'react';
import { useAction } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { DC_SURVEY_QUESTIONS } from '@/constants';
import type { SurveyQuestion } from '@/types';

interface Props {
  enquiryId: Id<"enquiries">;
  existingSurvey?: Record<string, string | undefined>;
}

type SurveyData = Record<string, string>;

export default function DCDetailsSurveyStep({ enquiryId, existingSurvey }: Props) {
  const submitSurvey = useAction(api.progress.submitSurveyFromProgress);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [survey, setSurvey] = useState<SurveyData>(() => {
    const initial: SurveyData = {};
    DC_SURVEY_QUESTIONS.forEach(q => {
      initial[q.key] = existingSurvey?.[q.key] || '';
    });
    return initial;
  });

  // Start at the first unanswered question
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    if (!existingSurvey) return 0;
    const firstUnanswered = DC_SURVEY_QUESTIONS.findIndex(
      q => !existingSurvey[q.key]?.trim()
    );
    return firstUnanswered === -1 ? DC_SURVEY_QUESTIONS.length - 1 : firstUnanswered;
  });

  const currentQuestion = DC_SURVEY_QUESTIONS[currentIndex];
  const currentAnswered = survey[currentQuestion.key]?.trim().length > 0;
  const isLastQuestion = currentIndex === DC_SURVEY_QUESTIONS.length - 1;
  const completedCount = DC_SURVEY_QUESTIONS.filter(q => survey[q.key]?.trim()).length;

  const handleAnswer = useCallback((key: string, value: string) => {
    setSurvey(prev => ({ ...prev, [key]: value }));

    // Auto-advance for choice questions after a short delay
    const q = DC_SURVEY_QUESTIONS[currentIndex];
    if (q.type === 'choice' && currentIndex < DC_SURVEY_QUESTIONS.length - 1) {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
      advanceTimer.current = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 400);
    }
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < DC_SURVEY_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
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
      {/* Header card */}
      <div className="bg-[#0d1b33] rounded-lg p-6 sm:p-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-[#4a9eff]/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-[#4a9eff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Share Your DC Details</h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Answer {DC_SURVEY_QUESTIONS.length} quick questions about your facility.
            </p>
          </div>
        </div>

        {/* Wizard progress */}
        <WizardProgress
          currentIndex={currentIndex}
          questions={DC_SURVEY_QUESTIONS}
          answers={survey}
        />
      </div>

      {/* Question card */}
      <div key={currentIndex} className="bg-[#0d1b33] rounded-lg p-6 sm:p-8 animate-fade-in">
        <p className="text-xs font-bold text-[#4a9eff] uppercase tracking-wider mb-1">
          {currentQuestion.label}
        </p>
        <p className="text-lg sm:text-xl font-semibold text-white mb-6">
          {currentQuestion.question}
        </p>

        {currentQuestion.type === 'choice' ? (
          <ChoiceGrid
            options={currentQuestion.options}
            selected={survey[currentQuestion.key]}
            onSelect={(value) => handleAnswer(currentQuestion.key, value)}
          />
        ) : (
          <TextInput
            value={survey[currentQuestion.key]}
            onChange={(value) => handleAnswer(currentQuestion.key, value)}
            placeholder={currentQuestion.placeholder}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handleBack}
          disabled={currentIndex === 0}
          className="px-6 py-3 text-sm font-medium text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Back
        </button>

        <button
          onClick={isLastQuestion ? handleSubmit : handleNext}
          disabled={!currentAnswered || isSubmitting}
          className="flex-1 max-w-xs py-4 bg-[#4a9eff] hover:bg-[#5aa8ff] text-white rounded-lg font-bold uppercase tracking-widest text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : isLastQuestion ? 'Submit DC Details' : 'Next'}
        </button>
      </div>
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────── */

function WizardProgress({
  currentIndex,
  questions,
  answers,
}: {
  currentIndex: number;
  questions: SurveyQuestion[];
  answers: SurveyData;
}) {
  return (
    <div className="flex items-center gap-3 bg-slate-800/30 rounded-xl px-4 py-3">
      <div className="flex items-center gap-1.5 flex-1">
        {questions.map((q, i) => {
          const answered = answers[q.key]?.trim().length > 0;
          const isCurrent = i === currentIndex;
          return (
            <div
              key={q.key}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                isCurrent
                  ? 'w-6 bg-[#4a9eff]'
                  : answered
                  ? 'w-3 bg-[#4a9eff]/60'
                  : 'w-2 bg-slate-600'
              }`}
            />
          );
        })}
      </div>
      <span className="text-xs text-slate-400 font-medium whitespace-nowrap">
        {currentIndex + 1} / {questions.length}
      </span>
    </div>
  );
}

function ChoiceGrid({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((option) => {
        const isSelected = selected === option;
        return (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`relative text-left px-5 py-4 rounded-lg border-2 transition-all duration-200 ${
              isSelected
                ? 'border-[#4a9eff] bg-[#4a9eff]/10 text-white'
                : 'border-slate-700/40 bg-[#0a1628] text-slate-300 hover:border-slate-500 hover:bg-[#0a1628]/80'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                isSelected ? 'border-[#4a9eff]' : 'border-slate-600'
              }`}>
                {isSelected && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4a9eff]" />
                )}
              </div>
              <span className="text-sm font-medium">{option}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={3}
      className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#4a9eff] focus:ring-2 focus:ring-[#4a9eff]/20 transition-all resize-none text-sm"
    />
  );
}
