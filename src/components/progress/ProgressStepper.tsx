"use client";

import React, { useState } from 'react';

interface StepDef {
  number: number;
  key: string;
  label: string;
  description: string;
  phase: 'pre' | 'post';
}

interface Props {
  steps: StepDef[];
  currentStep: number;
}

function getStepState(stepNumber: number, currentStep: number): 'completed' | 'active' | 'locked' {
  if (stepNumber < currentStep) return 'completed';
  if (stepNumber === currentStep) return 'active';
  return 'locked';
}

export default function ProgressStepper({ steps, currentStep }: Props) {
  const [expanded, setExpanded] = useState(false);
  const preSteps = steps.filter(s => s.phase === 'pre');
  const postSteps = steps.filter(s => s.phase === 'post');
  const completedCount = steps.filter(s => s.number < currentStep).length;
  const activeStep = steps.find(s => s.number === currentStep);

  return (
    <>
      {/* Mobile: compact bar */}
      <div className="lg:hidden">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full bg-[#0d1b33] rounded-lg p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {steps.map((step) => {
                const state = getStepState(step.number, currentStep);
                return (
                  <div
                    key={step.number}
                    className={`h-1.5 rounded-full transition-all ${
                      state === 'completed' ? 'w-4 bg-[#4a9eff]' :
                      state === 'active' ? 'w-6 bg-[#4a9eff]' :
                      'w-2 bg-slate-600'
                    }`}
                  />
                );
              })}
            </div>
            <span className="text-sm text-white font-medium">
              Step {currentStep} of {steps.length}
            </span>
          </div>
          <svg
            className={`w-5 h-5 text-slate-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {activeStep && !expanded && (
          <p className="text-xs text-slate-400 mt-2 px-1">
            Current: <span className="text-white">{activeStep.label}</span> &mdash; {activeStep.description}
          </p>
        )}

        {expanded && (
          <div className="mt-3 bg-[#0d1b33] rounded-lg p-4 space-y-1">
            {renderStepList(preSteps, currentStep, 'Getting Started')}
            {postSteps.length > 0 && currentStep > preSteps[preSteps.length - 1]?.number && renderStepList(postSteps, currentStep, 'Next Steps')}
          </div>
        )}
      </div>

      {/* Desktop: full vertical stepper */}
      <div className="hidden lg:block sticky top-8">
        <div className="bg-[#0d1b33] rounded-lg p-6">
          {/* Progress summary */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs text-slate-400 uppercase tracking-widest font-medium">Progress</span>
            <span className="text-xs text-[#4a9eff] font-bold">{completedCount} / {steps.length}</span>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-slate-700/50 rounded-full mb-8 overflow-hidden">
            <div
              className="h-full bg-[#4a9eff] rounded-full transition-all duration-700"
              style={{ width: `${(completedCount / steps.length) * 100}%` }}
            />
          </div>

          {/* Pre-meeting steps */}
          <div className="mb-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-4">Getting Started</p>
            <div className="space-y-1">
              {preSteps.map((step, i) => (
                <StepItem
                  key={step.number}
                  step={step}
                  state={getStepState(step.number, currentStep)}
                  isLast={i === preSteps.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Post steps */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-4">
              {steps.length <= 5 ? 'Investment Process' : 'Partnership Process'}
            </p>
            <div className="space-y-1">
              {postSteps.map((step, i) => (
                <StepItem
                  key={step.number}
                  step={step}
                  state={getStepState(step.number, currentStep)}
                  isLast={i === postSteps.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function StepItem({ step, state, isLast }: { step: StepDef; state: 'completed' | 'active' | 'locked'; isLast: boolean }) {
  return (
    <div className="flex items-start gap-3">
      {/* Indicator column */}
      <div className="flex flex-col items-center">
        {state === 'completed' ? (
          <div className="w-7 h-7 rounded-full bg-[#4a9eff] flex items-center justify-center flex-shrink-0">
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : state === 'active' ? (
          <div className="w-7 h-7 rounded-full border-2 border-[#4a9eff] bg-[#4a9eff]/10 flex items-center justify-center flex-shrink-0 relative">
            <div className="w-2.5 h-2.5 rounded-full bg-[#4a9eff]" />
            <div className="absolute inset-0 rounded-full border-2 border-[#4a9eff] animate-ping opacity-30" />
          </div>
        ) : (
          <div className="w-7 h-7 rounded-full border border-slate-600/40 bg-slate-800/30 flex items-center justify-center flex-shrink-0">
            <svg className="w-3 h-3 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        )}
        {!isLast && (
          <div className={`w-px h-6 ${
            state === 'completed' ? 'bg-[#4a9eff]/40' :
            state === 'active' ? 'bg-[#4a9eff]/20' :
            'bg-slate-700/30'
          }`} />
        )}
      </div>

      {/* Label */}
      <div className="pt-1 pb-3 min-w-0">
        <p className={`text-sm font-medium leading-tight ${
          state === 'completed' ? 'text-slate-300' :
          state === 'active' ? 'text-white' :
          'text-slate-500'
        }`}>
          {step.label}
        </p>
        {state === 'active' && (
          <p className="text-xs text-slate-400 mt-0.5">{step.description}</p>
        )}
      </div>
    </div>
  );
}

function renderStepList(steps: StepDef[], currentStep: number, title: string) {
  return (
    <div className="mb-4 last:mb-0">
      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-2">{title}</p>
      {steps.map((step) => {
        const state = getStepState(step.number, currentStep);
        return (
          <div key={step.number} className="flex items-center gap-2 py-1.5">
            {state === 'completed' ? (
              <div className="w-5 h-5 rounded-full bg-[#4a9eff] flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : state === 'active' ? (
              <div className="w-5 h-5 rounded-full border-2 border-[#4a9eff] bg-[#4a9eff]/10 flex items-center justify-center flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-[#4a9eff]" />
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full border border-slate-600/40 flex items-center justify-center flex-shrink-0">
                <div className="w-1 h-1 rounded-full bg-slate-600" />
              </div>
            )}
            <span className={`text-sm ${
              state === 'active' ? 'text-white font-medium' :
              state === 'completed' ? 'text-slate-400' :
              'text-slate-500'
            }`}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
