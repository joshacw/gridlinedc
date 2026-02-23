"use client";

import React from 'react';
import { Id } from "../../../convex/_generated/dataModel";
import BookMeetingStep from './steps/BookMeetingStep';
import DCDetailsSurveyStep from './steps/DCDetailsSurveyStep';
import HaveMeetingStep from './steps/HaveMeetingStep';
import ConfirmNextStepsStep from './steps/ConfirmNextStepsStep';
import PostMeetingStep from './steps/PostMeetingStep';

interface EnquiryData {
  _id: Id<"enquiries">;
  name: string;
  email: string;
  companyName: string;
  pipelineStep?: number;
  survey?: Record<string, string | undefined>;
}

interface Props {
  currentStep: number;
  enquiryId: Id<"enquiries">;
  enquiryData: EnquiryData;
}

const POST_MEETING_STEPS: Record<number, { label: string; description: string; detail: string }> = {
  7: {
    label: 'Share Financials',
    description: 'Provide financial documentation for your data centre.',
    detail: 'Our team will guide you through the financial documentation required. This typically includes annual revenue figures, operating costs, EBITDA, and capital expenditure history.',
  },
  8: {
    label: 'Prepare Report',
    description: 'GRIDLINE is preparing your valuation report.',
    detail: 'Our analysts are reviewing your facility data and financials to prepare a comprehensive valuation and partnership proposal tailored to your asset.',
  },
  9: {
    label: 'Present Offer',
    description: 'Review the partnership proposal.',
    detail: 'We will present our partnership offer including the recommended structure, valuation, and terms. This is your opportunity to review and discuss all details with our team.',
  },
  10: {
    label: 'Due Diligence',
    description: 'Formal verification process underway.',
    detail: 'The due diligence phase involves a thorough review of legal, financial, and operational aspects of your data centre to ensure alignment and readiness for partnership.',
  },
  11: {
    label: 'Letter of Intent',
    description: 'Formalising the partnership commitment.',
    detail: 'The LOI outlines the key terms and conditions of the partnership agreement. Once signed, this represents a formal commitment to proceed towards closing.',
  },
  12: {
    label: 'Closing',
    description: 'Finalising the partnership agreement.',
    detail: 'The final step — all agreements are signed, and your data centre officially becomes part of the GRIDLINE platform. Welcome to the future of data centre infrastructure.',
  },
};

export default function StepPanel({ currentStep, enquiryId, enquiryData }: Props) {
  if (currentStep === 3) {
    return <BookMeetingStep enquiryId={enquiryId} />;
  }

  if (currentStep === 4) {
    return <DCDetailsSurveyStep enquiryId={enquiryId} existingSurvey={enquiryData.survey} />;
  }

  if (currentStep === 5) {
    return <HaveMeetingStep name={enquiryData.name} />;
  }

  if (currentStep === 6) {
    return <ConfirmNextStepsStep />;
  }

  if (currentStep >= 7 && currentStep <= 12) {
    const stepInfo = POST_MEETING_STEPS[currentStep];
    return (
      <PostMeetingStep
        stepNumber={currentStep}
        label={stepInfo.label}
        description={stepInfo.description}
        detail={stepInfo.detail}
      />
    );
  }

  // Steps 1-2 are auto-complete, step > 12 means done
  if (currentStep > 12) {
    return (
      <div className="bg-[#030948] rounded-[19px] p-8 sm:p-10 text-center">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-outfit font-bold text-white mb-3">Partnership Complete</h2>
        <p className="text-slate-400 max-w-md mx-auto">
          Congratulations! Your data centre is now part of the GRIDLINE platform. Our team will be in touch with next steps.
        </p>
      </div>
    );
  }

  return null;
}
