"use client";

import React from 'react';
import { Id } from "../../../convex/_generated/dataModel";
import BookMeetingStep from './steps/BookMeetingStep';
import DCDetailsSurveyStep from './steps/DCDetailsSurveyStep';
import HaveMeetingStep from './steps/HaveMeetingStep';
import ConfirmNextStepsStep from './steps/ConfirmNextStepsStep';
import PostMeetingStep from './steps/PostMeetingStep';
import InvestorBookMeetingStep from './steps/InvestorBookMeetingStep';
import InvestorSurveyStep from './steps/InvestorSurveyStep';
import CompatibilityScoreStep from './steps/CompatibilityScoreStep';

interface EnquiryData {
  _id: Id<"enquiries">;
  name: string;
  email: string;
  companyName: string;
  enquiryType: 'investor' | 'asset_owner' | 'compatibility';
  pipelineStep?: number;
  survey?: Record<string, string | undefined>;
  investorSurvey?: Record<string, string | undefined>;
  detailedQualityScore?: number;
  detailedReadinessScore?: number;
  detailedTotalScore?: number;
  detailedTier?: string;
}

interface Props {
  currentStep: number;
  enquiryId: Id<"enquiries">;
  enquiryData: EnquiryData;
}

const DC_POST_MEETING_STEPS: Record<number, { label: string; description: string; detail: string }> = {
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

const INVESTOR_POST_STEPS: Record<number, { label: string; description: string; detail: string }> = {
  4: {
    label: 'Execute SAFE',
    description: 'Sign the SAFE agreement.',
    detail: 'The Simple Agreement for Future Equity (SAFE) outlines the terms of your investment. Our team will walk you through the agreement and ensure all questions are addressed before signing.',
  },
  5: {
    label: 'Invest',
    description: 'Complete your investment.',
    detail: 'Finalise your investment commitment and complete the funding process. Once complete, you will receive confirmation and access to investor updates and reporting.',
  },
};

export default function StepPanel({ currentStep, enquiryId, enquiryData }: Props) {
  if (enquiryData.enquiryType === 'compatibility') {
    return <CompatibilityStepPanel currentStep={currentStep} enquiryId={enquiryId} enquiryData={enquiryData} />;
  }

  if (enquiryData.enquiryType === 'investor') {
    return <InvestorStepPanel currentStep={currentStep} enquiryId={enquiryId} enquiryData={enquiryData} />;
  }

  return <DCOwnerStepPanel currentStep={currentStep} enquiryId={enquiryId} enquiryData={enquiryData} />;
}

function DCOwnerStepPanel({ currentStep, enquiryId, enquiryData }: Props) {
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
    const stepInfo = DC_POST_MEETING_STEPS[currentStep];
    return (
      <PostMeetingStep
        stepNumber={currentStep}
        label={stepInfo.label}
        description={stepInfo.description}
        detail={stepInfo.detail}
      />
    );
  }

  if (currentStep > 12) {
    return (
      <div className="bg-[#0d1b33] rounded-lg p-8 sm:p-10 text-center">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Partnership Complete</h2>
        <p className="text-slate-400 max-w-md mx-auto">
          Congratulations! Your data centre is now part of the GRIDLINE platform. Our team will be in touch with next steps.
        </p>
      </div>
    );
  }

  return null;
}

const COMPAT_POST_STEPS: Record<number, { label: string; description: string; detail: string }> = {
  3: {
    label: 'Share More Details',
    description: 'Provide additional facility information.',
    detail: 'Our team will guide you through the additional information required to progress your assessment. This ensures we have a complete picture of your facility.',
  },
  4: {
    label: 'Heads Of Agreement',
    description: 'Outline the partnership terms.',
    detail: 'The Heads of Agreement outlines the key commercial terms and structure of the proposed partnership. This provides a framework for both parties to proceed with confidence.',
  },
  5: {
    label: 'Review Audited Financials',
    description: 'Financial documentation review.',
    detail: 'We will review your audited financial statements including annual revenue, operating costs, EBITDA, and capital expenditure history to support the valuation process.',
  },
  6: {
    label: 'Letter of Intent',
    description: 'Formalising the partnership commitment.',
    detail: 'The LOI outlines the key terms and conditions of the partnership agreement. Once signed, this represents a formal commitment to proceed towards closing.',
  },
  7: {
    label: 'Due Diligence',
    description: 'Including site visit.',
    detail: 'The due diligence phase involves a thorough review of legal, financial, and operational aspects of your data centre, including an on-site visit to assess the facility first-hand.',
  },
  8: {
    label: 'Sign Definitive Acquisition Documents',
    description: 'Execute acquisition agreements.',
    detail: 'The definitive acquisition documents formalise all terms of the partnership. Our legal teams will work together to finalise and execute the agreements.',
  },
  9: {
    label: 'Closing',
    description: 'Finalising the partnership agreement.',
    detail: 'The final step — all agreements are signed, and your data centre officially becomes part of the GRIDLINE platform. Welcome to the future of data centre infrastructure.',
  },
};

function CompatibilityStepPanel({ currentStep, enquiryId, enquiryData }: Props) {
  // Step 1: Discover Your Fit — show score + PDF
  if (currentStep === 1 && enquiryData.detailedTier) {
    return (
      <CompatibilityScoreStep
        enquiryId={enquiryId}
        qualityScore={enquiryData.detailedQualityScore ?? 0}
        readinessScore={enquiryData.detailedReadinessScore ?? 0}
        totalScore={enquiryData.detailedTotalScore ?? 0}
        tier={enquiryData.detailedTier}
      />
    );
  }

  // Step 2: Book a call
  if (currentStep === 2) {
    return <BookMeetingStep enquiryId={enquiryId} />;
  }

  // Steps 3-9: Managed steps
  if (currentStep >= 3 && currentStep <= 9) {
    const stepInfo = COMPAT_POST_STEPS[currentStep];
    return (
      <PostMeetingStep
        stepNumber={currentStep}
        label={stepInfo.label}
        description={stepInfo.description}
        detail={stepInfo.detail}
      />
    );
  }

  // Completed
  if (currentStep > 9) {
    return (
      <div className="bg-[#0d1b33] rounded-lg p-8 sm:p-10 text-center">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Partnership Complete</h2>
        <p className="text-slate-400 max-w-md mx-auto">
          Congratulations! Your data centre is now part of the GRIDLINE platform. Our team will be in touch with next steps.
        </p>
      </div>
    );
  }

  return null;
}

function InvestorStepPanel({ currentStep, enquiryId, enquiryData }: Props) {
  // Step 2: Book meeting / explore opportunity
  if (currentStep === 2) {
    return <InvestorBookMeetingStep enquiryId={enquiryId} />;
  }

  // Step 3: Investor survey
  if (currentStep === 3) {
    return <InvestorSurveyStep enquiryId={enquiryId} existingSurvey={enquiryData.investorSurvey} />;
  }

  // Steps 4-5: Post-meeting managed steps
  if (currentStep >= 4 && currentStep <= 5) {
    const stepInfo = INVESTOR_POST_STEPS[currentStep];
    return (
      <PostMeetingStep
        stepNumber={currentStep}
        label={stepInfo.label}
        description={stepInfo.description}
        detail={stepInfo.detail}
      />
    );
  }

  // Step > 5: completed
  if (currentStep > 5) {
    return (
      <div className="bg-[#0d1b33] rounded-lg p-8 sm:p-10 text-center">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Investment Complete</h2>
        <p className="text-slate-400 max-w-md mx-auto">
          Thank you for investing with GRIDLINE. You will receive ongoing investor updates and reporting from our team.
        </p>
      </div>
    );
  }

  return null;
}
