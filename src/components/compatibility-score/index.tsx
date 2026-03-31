"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { QuizStage, ContactFormData, CompatibilityScoreProps } from "./types";
import { SECTIONS, QUESTIONS, computeDetailedScores } from "./questions";
import PlacesAutocomplete from "./PlacesAutocomplete";
import type { SurveyQuestion } from "@/types";

function generateToken(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: 24 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export default function CompatibilityScore({ webhookUrl: _webhookUrl }: CompatibilityScoreProps) {
  const router = useRouter();
  const submitToGHL = useAction(api.compatibility.submitScore);
  const [stage, setStage] = useState<QuizStage>("welcome");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contactForm, setContactForm] = useState<ContactFormData>({
    organisationName: "",
    facilityName: "",
    facilityLocation: "",
    facilityPlaceId: "",
    facilitySizeMW: "",
    firstName: "",
    role: "",
    email: "",
    phoneNumber: "",
    country: "",
  });
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [webhookError, setWebhookError] = useState<string | null>(null);

  const activeSection = SECTIONS[currentSection];
  const sectionQuestions = activeSection.questionKeys.map(
    (key) => QUESTIONS.find((q: SurveyQuestion) => q.key === key)!
  );
  const sectionAllAnswered = sectionQuestions.every((q) => {
    const val = answers[q.key]?.trim();
    return val && val.length > 0;
  });
  const isLastSection = currentSection === SECTIONS.length - 1;
  const totalQuestions = QUESTIONS.length;
  const answeredCount = QUESTIONS.filter((q: SurveyQuestion) => answers[q.key]?.trim()).length;

  const handleAnswer = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleContinue = () => {
    setStage("contact");
  };

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email);
  const isFormValid =
    contactForm.organisationName.trim() !== "" &&
    contactForm.facilityName.trim() !== "" &&
    contactForm.facilityLocation.trim() !== "" &&
    contactForm.firstName.trim() !== "" &&
    isEmailValid;

  const handleSubmit = async () => {
    if (!isFormValid) return;
    setIsSubmitting(true);
    setWebhookError(null);

    const scores = computeDetailedScores(answers);
    const token = generateToken();
    const progressUrl = `${window.location.origin}/progress/${token}`;

    try {
      await submitToGHL({
        firstName: contactForm.firstName.trim(),
        organisationName: contactForm.organisationName.trim(),
        facilityName: contactForm.facilityName.trim(),
        facilityLocation: contactForm.facilityLocation.trim(),
        facilitySizeMW: contactForm.facilitySizeMW.trim() || undefined,
        role: contactForm.role.trim() || undefined,
        email: contactForm.email.trim(),
        phoneNumber: contactForm.phoneNumber.trim() || undefined,
        country: contactForm.country.trim(),
        qualityScore: scores.qualityScore,
        readinessScore: scores.readinessScore,
        totalScore: scores.totalScore,
        tier: scores.tier,
        tierNumber: scores.tierNumber,
        survey: {
          criticalLoadCapacity: answers.criticalLoadCapacity || undefined,
          capacityUtilisation: answers.capacityUtilisation || undefined,
          expansionCapability: answers.expansionCapability || undefined,
          ebitdaMargin: answers.ebitdaMargin || undefined,
          powerCost: answers.powerCost || undefined,
          longTermContracts: answers.longTermContracts || undefined,
          tenantConcentration: answers.tenantConcentration || undefined,
          ownershipType: answers.ownershipType || undefined,
          realEstateStatus: answers.realEstateStatus || undefined,
          debtStatus: answers.debtStatus || undefined,
          marketDemand: answers.marketDemand || undefined,
          managementTeam: answers.managementTeam || undefined,
          transactionIntent: answers.transactionIntent || undefined,
          timeline: answers.timeline || undefined,
        },
        conditionalFlags: scores.conditionalFlags,
        token,
        progressUrl,
        submittedAt: new Date().toISOString(),
      });

      router.push(`/progress/${token}`);
    } catch (err) {
      console.error("Submission failed:", err);
      setWebhookError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  // ── Welcome Stage ──
  if (stage === "welcome") {
    return (
      <div className="max-w-[720px] mx-auto px-4 py-16 sm:py-24 sm:px-6">
        <div className="text-center">
          <p className="text-2xl font-bold tracking-tighter text-white mb-8">
            GRID<span className="text-[#4a9eff]">LINE</span>
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            Is your data centre a fit<br className="hidden sm:block" /> for the GridLine platform?
          </h1>
          <p className="text-[#94a3b8] text-base sm:text-lg leading-relaxed max-w-lg mx-auto mb-4">
            Answer {totalQuestions} short questions to find out how well your facility aligns with our acquisition criteria. Takes under 3 minutes.
          </p>
          <p className="text-[#94a3b8]/60 text-sm max-w-md mx-auto mb-10">
            Your answers are confidential and used solely to assess compatibility. No commitment required.
          </p>
          <button
            onClick={() => setStage("quiz")}
            className="px-10 py-4 rounded-lg text-base font-bold uppercase tracking-wider bg-[#4a9eff] text-white hover:bg-[#5aa8ff] shadow-[4px_4px_7px_3px_rgba(96,165,250,0.4)] transition-all duration-200 cursor-pointer"
          >
            Start Now
          </button>
        </div>
      </div>
    );
  }

  // ── Quiz Stage ──
  if (stage === "quiz") {
    return (
      <div className="max-w-[720px] mx-auto px-4 py-12 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-[#4a9eff] font-semibold mb-3">
            Compatibility Assessment
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Is your facility a fit for{" "}
            <span className="text-white">GRID</span>
            <span className="text-[#4a9eff]">LINE</span>?
          </h1>
          <p className="text-[#94a3b8] text-sm">
            {answeredCount} of {totalQuestions} answered
          </p>
        </div>

        {/* Progress steps */}
        <div className="flex gap-2 mb-8">
          {SECTIONS.map((section, i) => (
            <div
              key={section.id}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                i < currentSection
                  ? "bg-[#4a9eff]"
                  : i === currentSection
                    ? "bg-[#4a9eff]/50"
                    : "bg-white/10"
              }`}
            />
          ))}
        </div>

        {/* Current section */}
        <div key={activeSection.id}>
          {/* Section heading */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#4a9eff]">
              {String(currentSection + 1).padStart(2, "0")}
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#94a3b8]">
              {activeSection.label}
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Questions */}
          <div className="space-y-4">
            {sectionQuestions.map((question) => (
              <div
                key={question.key}
                className="bg-[#0d1b33] border border-white/10 rounded-[19px] p-6 sm:p-8"
              >
                <p className="text-white text-lg sm:text-xl font-medium leading-snug mb-5">
                  {question.question}
                </p>

                {question.type === "choice" ? (
                  <div className="space-y-2.5">
                    {question.options.map((option: string) => {
                      const isSelected = answers[question.key] === option;
                      return (
                        <button
                          key={option}
                          onClick={() => handleAnswer(question.key, option)}
                          className={`w-full text-left px-5 py-3.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? "bg-[#4a9eff] text-white border border-[#4a9eff] shadow-[0_0_12px_rgba(74,158,255,0.3)]"
                              : "bg-transparent text-[#94a3b8] border border-white/20 hover:border-white/40 hover:text-white"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <input
                    type="text"
                    value={answers[question.key] || ""}
                    onChange={(e) => handleAnswer(question.key, e.target.value)}
                    placeholder={question.placeholder}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3.5 text-white text-sm placeholder:text-[#94a3b8]/50 focus:outline-none focus:ring-2 focus:ring-[#4a9eff] focus:border-transparent transition-all"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between">
          <div>
            {currentSection > 0 && (
              <button
                onClick={() => setCurrentSection((s) => s - 1)}
                className="text-xs text-[#94a3b8] hover:text-white transition-colors cursor-pointer"
              >
                ← Back
              </button>
            )}
          </div>
          <button
            onClick={() => {
              if (isLastSection) {
                handleContinue();
              } else {
                setCurrentSection((s) => s + 1);
              }
            }}
            disabled={!sectionAllAnswered}
            className={`px-8 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              sectionAllAnswered
                ? "bg-[#4a9eff] text-white hover:bg-[#5aa8ff] shadow-[4px_4px_7px_3px_rgba(96,165,250,0.4)]"
                : "bg-white/5 text-[#94a3b8]/50 border border-white/10 cursor-not-allowed"
            }`}
          >
            {isLastSection ? "Continue" : "Next"}
          </button>
        </div>
      </div>
    );
  }

  // ── Contact Stage ──
  if (stage === "contact") {
    const inputBase =
      "w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white text-sm placeholder:text-[#94a3b8]/50 focus:outline-none focus:ring-2 focus:ring-[#4a9eff] focus:border-transparent transition-all";
    const labelBase =
      "block text-[11px] font-semibold uppercase tracking-wider text-[#94a3b8] mb-1.5";

    return (
      <div className="max-w-[680px] mx-auto px-4 py-10 sm:py-14 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.25em] text-[#4a9eff] font-semibold mb-2">
            Almost There
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1.5">
            See your compatibility result
          </h2>
          <p className="text-[#94a3b8] text-sm">
            Tell us about your facility and we&apos;ll show your score.
          </p>
        </div>

        {/* Section 1 — Organisation */}
        <div className="bg-[#0d1b33]/80 border border-white/[0.08] rounded-[19px] p-5 sm:p-7 mb-3">
          <div className="flex items-center gap-2.5 mb-5">
            <span className="w-6 h-6 rounded-full bg-[#4a9eff]/15 text-[#4a9eff] text-[11px] flex items-center justify-center font-bold shrink-0">
              1
            </span>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Your Organisation
            </h3>
          </div>
          <div>
            <label className={labelBase}>Organisation / Owner Name</label>
            <input
              type="text"
              value={contactForm.organisationName}
              onChange={(e) => setContactForm((f) => ({ ...f, organisationName: e.target.value }))}
              placeholder="e.g. Acme Holdings Ltd"
              className={`${inputBase} !text-lg !py-3.5`}
              autoFocus
            />
          </div>
        </div>

        {/* Section 2 — Facility */}
        <div className="bg-[#0d1b33]/80 border border-white/[0.08] rounded-[19px] p-5 sm:p-7 mb-3">
          <div className="flex items-center gap-2.5 mb-5">
            <span className="w-6 h-6 rounded-full bg-[#4a9eff]/15 text-[#4a9eff] text-[11px] flex items-center justify-center font-bold shrink-0">
              2
            </span>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Your Facility
            </h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className={labelBase}>Facility / Asset Name</label>
              <input
                type="text"
                value={contactForm.facilityName}
                onChange={(e) => setContactForm((f) => ({ ...f, facilityName: e.target.value }))}
                placeholder="e.g. London Docklands DC1"
                className={inputBase}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px] gap-4">
              <div>
                <label className={labelBase}>Facility Location</label>
                <PlacesAutocomplete
                  value={contactForm.facilityLocation}
                  onChange={(val) => setContactForm((f) => ({ ...f, facilityLocation: val }))}
                  onPlaceSelect={(place) =>
                    setContactForm((f) => ({
                      ...f,
                      facilityLocation: place.address,
                      facilityPlaceId: place.placeId,
                      country: place.country || f.country,
                    }))
                  }
                  placeholder="Start typing an address..."
                  className={inputBase}
                />
                {contactForm.country && (
                  <p className="text-[#4a9eff]/70 text-xs mt-1.5 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {contactForm.country}
                  </p>
                )}
              </div>
              <div>
                <label className={labelBase}>Size (MW)</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={contactForm.facilitySizeMW}
                  onChange={(e) => setContactForm((f) => ({ ...f, facilitySizeMW: e.target.value }))}
                  placeholder="e.g. 2.5"
                  className={inputBase}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3 — Representative */}
        <div className="bg-[#0d1b33]/80 border border-white/[0.08] rounded-[19px] p-5 sm:p-7 mb-6">
          <div className="flex items-center gap-2.5 mb-5">
            <span className="w-6 h-6 rounded-full bg-[#4a9eff]/15 text-[#4a9eff] text-[11px] flex items-center justify-center font-bold shrink-0">
              3
            </span>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Your Details
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelBase}>Full Name</label>
              <input
                type="text"
                value={contactForm.firstName}
                onChange={(e) => setContactForm((f) => ({ ...f, firstName: e.target.value }))}
                placeholder="John Smith"
                className={inputBase}
              />
            </div>
            <div>
              <label className={labelBase}>Role / Title</label>
              <input
                type="text"
                value={contactForm.role}
                onChange={(e) => setContactForm((f) => ({ ...f, role: e.target.value }))}
                placeholder="Managing Director"
                className={inputBase}
              />
            </div>
            <div>
              <label className={labelBase}>Email</label>
              <input
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="john@company.com"
                className={`${inputBase} ${
                  contactForm.email && !isEmailValid ? "!border-red-500/50" : ""
                }`}
              />
              {contactForm.email && !isEmailValid && (
                <p className="text-red-400 text-xs mt-1">Please enter a valid email.</p>
              )}
            </div>
            <div>
              <label className={labelBase}>Phone Number</label>
              <input
                type="tel"
                value={contactForm.phoneNumber}
                onChange={(e) => setContactForm((f) => ({ ...f, phoneNumber: e.target.value }))}
                placeholder="+44 7700 900000"
                className={inputBase}
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="text-center">
          {webhookError && (
            <p className="text-red-400 text-sm mb-3">{webhookError}</p>
          )}
          <button
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            className={`w-full sm:w-auto px-12 py-4 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              isFormValid && !isSubmitting
                ? "bg-[#4a9eff] text-white hover:bg-[#5aa8ff] shadow-[4px_4px_7px_3px_rgba(96,165,250,0.4)] hover:shadow-[4px_4px_14px_4px_rgba(96,165,250,0.5)]"
                : "bg-white/5 text-[#94a3b8]/50 border border-white/10 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "Submitting..." : "View My Result"}
          </button>
        </div>

        <button
          onClick={() => { setCurrentSection(SECTIONS.length - 1); setStage("quiz"); }}
          className="mt-5 mx-auto block text-xs text-[#94a3b8] hover:text-white transition-colors cursor-pointer"
        >
          ← Back to questions
        </button>
      </div>
    );
  }

  return null;
}
