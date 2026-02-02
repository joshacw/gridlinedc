"use client";

import React, { useState, useEffect } from 'react';
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type EnquiryType = 'investor' | 'asset_owner' | null;

interface ContactInfo {
  name: string;
  email: string;
  companyName: string;
  phoneNumber: string;
  enquiryType: EnquiryType;
  heardAbout: string;
}

interface DCOwnerSurvey {
  ownershipStructure: string;
  currentPowerUtilisation: string;
  powerScalability: string;
  customerBase: string;
  customerConcentration: string;
  contractTenure: string;
  anchorTenants: string;
  networkConnectivity: string;
  annualRevenue: string;
  ebitdaRange: string;
  capitalOutlook: string;
}

const HEARD_ABOUT_OPTIONS = [
  'LinkedIn',
  'Industry Event',
  'Referral',
  'Web Search',
  'News Article',
  'Other'
];

const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const submitEnquiry = useAction(api.enquiries.submitWithWebhook);

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: '',
    email: '',
    companyName: '',
    phoneNumber: '',
    enquiryType: null,
    heardAbout: ''
  });

  const [dcSurvey, setDcSurvey] = useState<DCOwnerSurvey>({
    ownershipStructure: '',
    currentPowerUtilisation: '',
    powerScalability: '',
    customerBase: '',
    customerConcentration: '',
    contractTenure: '',
    anchorTenants: '',
    networkConnectivity: '',
    annualRevenue: '',
    ebitdaRange: '',
    capitalOutlook: ''
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setIsSuccess(false);
        setContactInfo({
          name: '',
          email: '',
          companyName: '',
          phoneNumber: '',
          enquiryType: null,
          heardAbout: ''
        });
        setDcSurvey({
          ownershipStructure: '',
          currentPowerUtilisation: '',
          powerScalability: '',
          customerBase: '',
          customerConcentration: '',
          contractTenure: '',
          anchorTenants: '',
          networkConnectivity: '',
          annualRevenue: '',
          ebitdaRange: '',
          capitalOutlook: ''
        });
      }, 300);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleContactChange = (field: keyof ContactInfo, value: string | EnquiryType) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSurveyChange = (field: keyof DCOwnerSurvey, value: string) => {
    setDcSurvey(prev => ({ ...prev, [field]: value }));
  };

  const isContactValid = () => {
    return (
      contactInfo.name.trim() !== '' &&
      contactInfo.email.trim() !== '' &&
      contactInfo.companyName.trim() !== '' &&
      contactInfo.enquiryType !== null &&
      contactInfo.heardAbout !== ''
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      await submitEnquiry({
        name: contactInfo.name,
        email: contactInfo.email,
        companyName: contactInfo.companyName,
        phoneNumber: contactInfo.phoneNumber || undefined,
        enquiryType: contactInfo.enquiryType as "investor" | "asset_owner",
        heardAbout: contactInfo.heardAbout,
        survey: contactInfo.enquiryType === 'asset_owner' ? {
          ownershipStructure: dcSurvey.ownershipStructure || undefined,
          currentPowerUtilisation: dcSurvey.currentPowerUtilisation || undefined,
          powerScalability: dcSurvey.powerScalability || undefined,
          customerBase: dcSurvey.customerBase || undefined,
          customerConcentration: dcSurvey.customerConcentration || undefined,
          contractTenure: dcSurvey.contractTenure || undefined,
          anchorTenants: dcSurvey.anchorTenants || undefined,
          networkConnectivity: dcSurvey.networkConnectivity || undefined,
          annualRevenue: dcSurvey.annualRevenue || undefined,
          ebitdaRange: dcSurvey.ebitdaRange || undefined,
          capitalOutlook: dcSurvey.capitalOutlook || undefined,
        } : undefined,
        submittedAt: new Date().toISOString(),
      });

      setIsSuccess(true);
    } catch (error) {
      console.error('Error submitting enquiry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-outfit font-bold text-slate-900 mb-2">Get in Touch</h2>
        <p className="text-slate-500 text-sm">Tell us about yourself and how we can help.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={contactInfo.name}
            onChange={(e) => handleContactChange('name', e.target.value)}
            placeholder="John Smith"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={contactInfo.email}
            onChange={(e) => handleContactChange('email', e.target.value)}
            placeholder="john@company.com"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            Company Name *
          </label>
          <input
            type="text"
            value={contactInfo.companyName}
            onChange={(e) => handleContactChange('companyName', e.target.value)}
            placeholder="Company Ltd"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={contactInfo.phoneNumber}
            onChange={(e) => handleContactChange('phoneNumber', e.target.value)}
            placeholder="+60 12 345 6789"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">
          I am a *
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleContactChange('enquiryType', 'investor')}
            className={`p-4 rounded-2xl border-2 transition-all ${
              contactInfo.enquiryType === 'investor'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-bold text-sm">Investor</span>
            </div>
          </button>
          <button
            type="button"
            onClick={() => handleContactChange('enquiryType', 'asset_owner')}
            className={`p-4 rounded-2xl border-2 transition-all ${
              contactInfo.enquiryType === 'asset_owner'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="font-bold text-sm">Data Center Owner</span>
            </div>
          </button>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
          How did you hear about GRIDLINE? *
        </label>
        <select
          value={contactInfo.heardAbout}
          onChange={(e) => handleContactChange('heardAbout', e.target.value)}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
        >
          <option value="">Select an option</option>
          {HEARD_ABOUT_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <button
        onClick={() => setStep(2)}
        disabled={!isContactValid()}
        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
      >
        Continue
      </button>
    </div>
  );

  const isSurveyValid = () => {
    return (
      dcSurvey.ownershipStructure.trim() !== '' &&
      dcSurvey.currentPowerUtilisation.trim() !== '' &&
      dcSurvey.powerScalability.trim() !== '' &&
      dcSurvey.customerBase.trim() !== '' &&
      dcSurvey.customerConcentration.trim() !== '' &&
      dcSurvey.contractTenure.trim() !== '' &&
      dcSurvey.anchorTenants.trim() !== '' &&
      dcSurvey.networkConnectivity.trim() !== '' &&
      dcSurvey.annualRevenue.trim() !== '' &&
      dcSurvey.ebitdaRange.trim() !== '' &&
      dcSurvey.capitalOutlook.trim() !== ''
    );
  };

  const renderStep2AssetOwner = () => {
    const questions = [
      { key: 'ownershipStructure', label: 'Ownership Structure', question: 'Is the data centre fully owned, or are there any external shareholders or partners involved?', placeholder: 'e.g., Fully owned / 70% owned with 30% external partner' },
      { key: 'currentPowerUtilisation', label: 'Current Power Utilisation', question: 'What is the current IT load and overall power utilisation of the facility?', placeholder: 'e.g., 5MW IT load, 60% utilisation' },
      { key: 'powerScalability', label: 'Power Scalability', question: 'What is the maximum designed power capacity the facility can scale to?', placeholder: 'e.g., 20MW maximum capacity' },
      { key: 'customerBase', label: 'Customer Base', question: 'Approximately how many active customer contracts are in place?', placeholder: 'e.g., 15 active contracts' },
      { key: 'customerConcentration', label: 'Customer Concentration', question: 'What percentage of total revenue is generated by the top three customers?', placeholder: 'e.g., Top 3 customers = 65% of revenue' },
      { key: 'contractTenure', label: 'Contract Tenure', question: 'What is the typical contract length and renewal profile across customers?', placeholder: 'e.g., 3-5 year terms, 85% renewal rate' },
      { key: 'anchorTenants', label: 'Anchor Tenant(s)', question: 'Who are the anchor tenant(s), and what is the remaining contract term in place?', placeholder: 'e.g., Major telco, 8 years remaining' },
      { key: 'networkConnectivity', label: 'Network Connectivity', question: 'How many network carriers are available on-site or through existing partnerships?', placeholder: 'e.g., 6 carriers on-site' },
      { key: 'annualRevenue', label: 'Annual Revenue', question: 'What is the current annual revenue (and, if available, historical year-on-year figures)?', placeholder: 'e.g., MYR 25M (2024), MYR 22M (2023)' },
      { key: 'ebitdaRange', label: 'EBITDA Range', question: 'What is the typical EBITDA range or margin for the facility?', placeholder: 'e.g., 35-40% EBITDA margin' },
      { key: 'capitalOutlook', label: 'Capital & Maintenance Outlook', question: 'Are there any major maintenance events or capital expenditures anticipated within the next 12 to 24 months?', placeholder: 'e.g., Generator upgrade planned Q3 2025' }
    ];

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-3">
            Data Center Profile
          </div>
          <h2 className="text-xl font-outfit font-bold text-slate-900 mb-2">Tell us about your facility</h2>
          <p className="text-slate-500 text-sm">This information helps us understand your asset and identify the best partnership structure. All fields are required.</p>
        </div>

        <div className="space-y-5 max-h-[50vh] overflow-y-auto pr-2 -mr-2">
          {questions.map(({ key, label, question, placeholder }) => (
            <div key={key} className="bg-slate-50 rounded-2xl p-4">
              <label className="block text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
                {label} *
              </label>
              <p className="text-sm text-slate-700 mb-3">{question}</p>
              <textarea
                value={dcSurvey[key as keyof DCOwnerSurvey]}
                onChange={(e) => handleSurveyChange(key as keyof DCOwnerSurvey, e.target.value)}
                placeholder={placeholder}
                rows={2}
                className={`w-full px-4 py-3 bg-white border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none ${
                  dcSurvey[key as keyof DCOwnerSurvey].trim() === '' ? 'border-slate-200' : 'border-green-300'
                }`}
              />
            </div>
          ))}
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={() => setStep(1)}
            className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !isSurveyValid()}
            className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
          </button>
        </div>
      </div>
    );
  };

  const renderStep2Investor = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-3">
          Investor Enquiry
        </div>
        <h2 className="text-xl font-outfit font-bold text-slate-900 mb-2">Thank you for your interest</h2>
        <p className="text-slate-500 text-sm">Our investment team will be in touch shortly to discuss opportunities.</p>
      </div>

      <div className="bg-slate-50 rounded-2xl p-6 text-center">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">
          We&apos;re preparing our investor survey. In the meantime, your contact details have been captured and a member of our team will reach out within 48 hours.
        </p>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          onClick={() => setStep(1)}
          className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
        </button>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center py-8">
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-outfit font-bold text-slate-900 mb-3">Enquiry Submitted</h2>
      <p className="text-slate-500 mb-8 max-w-sm mx-auto">
        Thank you for your interest in GRIDLINE. Our team will review your submission and contact you within 48 hours.
      </p>
      <button
        onClick={onClose}
        className="px-10 py-4 bg-slate-950 hover:bg-blue-600 text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-all"
      >
        Close
      </button>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Progress indicator */}
        {!isSuccess && (
          <div className="px-8 pt-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className={`h-1.5 w-16 rounded-full transition-colors ${step >= 1 ? 'bg-blue-600' : 'bg-slate-200'}`} />
              <div className={`h-1.5 w-16 rounded-full transition-colors ${step >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`} />
            </div>
            <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest font-bold">
              Step {step} of 2
            </p>
          </div>
        )}

        {/* Content */}
        <div className="p-8">
          {isSuccess ? (
            renderSuccess()
          ) : step === 1 ? (
            renderStep1()
          ) : contactInfo.enquiryType === 'asset_owner' ? (
            renderStep2AssetOwner()
          ) : (
            renderStep2Investor()
          )}
        </div>
      </div>
    </div>
  );
};

export default EnquiryModal;
