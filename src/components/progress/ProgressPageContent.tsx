"use client";

import React, { useEffect } from 'react';
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { PIPELINE_STEPS } from '@/constants';
import ProgressStepper from './ProgressStepper';
import StepPanel from './StepPanel';

interface Props {
  token: string;
}

export default function ProgressPageContent({ token }: Props) {
  const data = useQuery(api.progress.getByToken, { token });

  // Suppress "Leave site?" dialog caused by Convex's real-time connection
  useEffect(() => {
    window.onbeforeunload = null;
    const suppress = () => { window.onbeforeunload = null; };
    const interval = setInterval(suppress, 1000);
    return () => clearInterval(interval);
  }, []);

  // Loading state
  if (data === undefined) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 text-sm">Loading your progress...</p>
        </div>
      </div>
    );
  }

  // Invalid token
  if (data === null) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Link Not Found</h1>
          <p className="text-slate-400 mb-8">
            This progress link is invalid or has expired. If you recently registered, please check your email for the correct link.
          </p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-[#4a9eff] hover:bg-[#5aa8ff] text-white rounded-lg font-bold uppercase tracking-widest text-xs transition-all"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  const currentStep = data.pipelineStep || 3;
  const firstName = data.name?.split(' ')[0] || 'there';

  return (
    <div className="min-h-screen bg-gradient-dark text-white">
      {/* Minimal navbar */}
      <nav className="py-6 px-6 sm:px-8 flex items-center justify-between">
        <a href="/" className="text-2xl font-bold tracking-tighter">
          GRID<span className="text-[#4a9eff]">LINE</span>
        </a>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="hidden sm:inline">Live updates enabled</span>
        </div>
      </nav>

      {/* Welcome header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-4">
        <p className="text-slate-400 text-xs sm:text-sm font-medium uppercase tracking-widest mb-2">
          Welcome back, {firstName}
        </p>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Your Onboarding Progress
        </h1>
        <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-2xl">
          Track your journey to partnering with GRIDLINE. Complete each step to move forward in the process.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left: Stepper */}
          <div className="lg:w-[340px] flex-shrink-0">
            <ProgressStepper
              steps={PIPELINE_STEPS}
              currentStep={currentStep}
            />
          </div>

          {/* Right: Active Step Content */}
          <div className="flex-1 min-w-0">
            <StepPanel
              currentStep={currentStep}
              enquiryId={data._id}
              enquiryData={data}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
