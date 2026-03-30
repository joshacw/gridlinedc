"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEnquiryType?: EnquiryType;
}

type EnquiryType = 'investor' | 'asset_owner' | null;

interface ContactInfo {
  name: string;
  email: string;
  companyName: string;
  phoneNumber: string;
  dcLocation: string;
  enquiryType: EnquiryType;
  heardAbout: string;
}

const HEARD_ABOUT_OPTIONS = [
  'LinkedIn',
  'Industry Event',
  'Referral',
  'Web Search',
  'News Article',
  'Other'
];

const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose, defaultEnquiryType }) => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const submitEnquiry = useMutation(api.enquiries.submit);
  const storeProgressToken = useMutation(api.enquiries.storeProgressToken);
  const storeInvestorProgressToken = useMutation(api.enquiries.storeInvestorProgressToken);

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: '',
    email: '',
    companyName: '',
    phoneNumber: '',
    dcLocation: '',
    enquiryType: defaultEnquiryType || null,
    heardAbout: ''
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
          dcLocation: '',
          enquiryType: defaultEnquiryType || null,
          heardAbout: ''
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

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone: string) => {
    if (!phone.trim()) return true; // optional field
    const digits = phone.replace(/[\s\-\(\)\+\.]/g, '');
    return /^\d{7,15}$/.test(digits);
  };

  const isContactValid = () => {
    const isInvestor = contactInfo.enquiryType === 'investor';
    return (
      contactInfo.name.trim() !== '' &&
      contactInfo.email.trim() !== '' &&
      isValidEmail(contactInfo.email) &&
      contactInfo.companyName.trim() !== '' &&
      isValidPhone(contactInfo.phoneNumber) &&
      contactInfo.enquiryType !== null &&
      (isInvestor || contactInfo.dcLocation.trim() !== '') &&
      contactInfo.heardAbout !== ''
    );
  };

  // GHL Pipeline IDs
  const GHL_PIPELINE_INVESTOR = "vaMWg7E7OUATkFu5FWSp";
  const GHL_PIPELINE_DC_OWNER = "RZjD4cW2ONonKOH2BLW6";

  // Asset owner flow: save to DB → store token (schedules GHL sync server-side) → redirect
  const handleAssetOwnerSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Step 1: Save to DB directly via mutation (returns reliable Id)
      const enquiryId: Id<"enquiries"> = await submitEnquiry({
        name: contactInfo.name,
        email: contactInfo.email,
        companyName: contactInfo.companyName,
        phoneNumber: contactInfo.phoneNumber || undefined,
        dcLocation: contactInfo.dcLocation || undefined,
        enquiryType: "asset_owner",
        heardAbout: contactInfo.heardAbout,
        submittedAt: new Date().toISOString(),
      });

      // Step 2: Generate token
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let token = "";
      for (let i = 0; i < 24; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      const progressUrl = `${window.location.origin}/progress/${token}`;

      // Step 3: Store token + schedule GHL sync server-side (runs even after navigation)
      await storeProgressToken({
        token,
        enquiryId,
        name: contactInfo.name,
        email: contactInfo.email,
        companyName: contactInfo.companyName,
        phoneNumber: contactInfo.phoneNumber || undefined,
        heardAbout: contactInfo.heardAbout,
        dcLocation: contactInfo.dcLocation || undefined,
        progressUrl,
        pipelineId: GHL_PIPELINE_DC_OWNER,
      });

      // Step 4: Client-side navigate (no beforeunload dialog)
      setIsRedirecting(true);
      router.push(`/progress/${token}`);
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Investor flow: save to DB → store token (schedules GHL sync server-side) → redirect
  const handleInvestorSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Step 1: Save to DB
      const enquiryId: Id<"enquiries"> = await submitEnquiry({
        name: contactInfo.name,
        email: contactInfo.email,
        companyName: contactInfo.companyName,
        phoneNumber: contactInfo.phoneNumber || undefined,
        enquiryType: "investor",
        heardAbout: contactInfo.heardAbout,
        submittedAt: new Date().toISOString(),
      });

      // Step 2: Generate token
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let token = "";
      for (let i = 0; i < 24; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
      }

      const progressUrl = `${window.location.origin}/progress/${token}`;

      // Step 3: Store token + schedule GHL sync server-side (runs even after navigation)
      await storeInvestorProgressToken({
        token,
        enquiryId,
        name: contactInfo.name,
        email: contactInfo.email,
        companyName: contactInfo.companyName,
        phoneNumber: contactInfo.phoneNumber || undefined,
        heardAbout: contactInfo.heardAbout,
        progressUrl,
        pipelineId: GHL_PIPELINE_INVESTOR,
      });

      // Step 4: Client-side navigate (no beforeunload dialog)
      setIsRedirecting(true);
      router.push(`/progress/${token}`);
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Both flows now submit and redirect on step 1
  const handleContinue = () => {
    if (contactInfo.enquiryType === 'asset_owner') {
      handleAssetOwnerSubmit();
    } else {
      handleInvestorSubmit();
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-outfit font-bold text-slate-900 mb-2">
          {defaultEnquiryType === 'investor' ? 'Explore The GridLine Opportunity' : 'Explore Your Potential Upside'}
        </h2>
        <p className="text-slate-500 text-sm">
          {defaultEnquiryType === 'investor'
            ? 'Limited time opportunity for early stage investors.'
            : 'Exclusive for data centre owners in the APAC region.'}
        </p>
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
            className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ${
              contactInfo.email && !isValidEmail(contactInfo.email) ? 'border-red-400' : 'border-slate-200'
            }`}
          />
          {contactInfo.email && !isValidEmail(contactInfo.email) && (
            <p className="text-red-500 text-xs mt-1">Please enter a valid email address</p>
          )}
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
            className={`w-full px-4 py-3 bg-slate-50 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ${
              contactInfo.phoneNumber && !isValidPhone(contactInfo.phoneNumber) ? 'border-red-400' : 'border-slate-200'
            }`}
          />
          {contactInfo.phoneNumber && !isValidPhone(contactInfo.phoneNumber) && (
            <p className="text-red-500 text-xs mt-1">Please enter a valid phone number</p>
          )}
        </div>
      </div>

      <div className={`grid grid-cols-1 ${defaultEnquiryType !== 'investor' ? 'sm:grid-cols-2' : ''} gap-4`}>
        {defaultEnquiryType !== 'investor' && (
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Location of the DC Asset *
            </label>
            <input
              type="text"
              value={contactInfo.dcLocation}
              onChange={(e) => handleContactChange('dcLocation', e.target.value)}
              placeholder="Singapore"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        )}
        <div>
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            How did you hear about us? *
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
      </div>

      {/* Only show type selector when not pre-set by page context */}
      {!defaultEnquiryType && (
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
      )}

      <button
        onClick={handleContinue}
        disabled={!isContactValid() || isSubmitting}
        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold uppercase tracking-widest text-xs transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
      >
        {isSubmitting ? 'Submitting...' : 'Continue'}
      </button>
    </div>
  );

  const renderRedirecting = () => (
    <div className="text-center py-12">
      <div className="w-16 h-16 mx-auto mb-6 relative">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
        <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
      </div>
      <h2 className="text-xl font-outfit font-bold text-slate-900 mb-2">Setting up your dashboard</h2>
      <p className="text-slate-500 text-sm">Redirecting you to your personalized progress page...</p>
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

        {/* Content */}
        <div className="p-8">
          {isRedirecting ? (
            renderRedirecting()
          ) : isSuccess ? (
            renderSuccess()
          ) : (
            renderStep1()
          )}
        </div>
      </div>
    </div>
  );
};

export default EnquiryModal;
