"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { QuizStage, ContactFormData, CompatibilityScoreProps } from "./types";
import { QUESTIONS, BANDS } from "./questions";
import { computeAllScores, getRating } from "./scoring";

function generateToken(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: 24 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export default function CompatibilityScore({ webhookUrl: _webhookUrl }: CompatibilityScoreProps) {
  const router = useRouter();
  const submitToGHL = useAction(api.compatibility.submitScore);
  const [stage, setStage] = useState<QuizStage>("welcome");
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [contactForm, setContactForm] = useState<ContactFormData>({
    firstName: "",
    facilityName: "",
    email: "",
    country: "",
  });
  const [currentBand, setCurrentBand] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [webhookError, setWebhookError] = useState<string | null>(null);
  const [scores, setScores] = useState<{
    band1Score: number;
    band2Score: number;
    band3Score: number;
    total: number;
  } | null>(null);

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === QUESTIONS.length;
  const activeBand = BANDS[currentBand];
  const bandQuestions = QUESTIONS.filter((q) => q.bandId === activeBand.id);
  const bandAllAnswered = bandQuestions.every((q) => answers[q.id] !== undefined);
  const isLastBand = currentBand === BANDS.length - 1;

  const handleAnswer = (questionId: number, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleContinue = () => {
    const computed = computeAllScores(answers);
    setScores(computed);
    setStage("contact");
  };

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email);
  const isFormValid =
    contactForm.firstName.trim() !== "" &&
    contactForm.facilityName.trim() !== "" &&
    isEmailValid &&
    contactForm.country.trim() !== "";

  const handleSubmit = async () => {
    if (!scores || !isFormValid) return;
    setIsSubmitting(true);
    setWebhookError(null);

    const rating = getRating(scores.total);
    const token = generateToken();
    const progressUrl = `${window.location.origin}/progress/${token}`;

    try {
      await submitToGHL({
        firstName: contactForm.firstName.trim(),
        facilityName: contactForm.facilityName.trim(),
        email: contactForm.email.trim(),
        country: contactForm.country.trim(),
        score: scores.total,
        scoreLabel: rating.label,
        band1Score: scores.band1Score,
        band2Score: scores.band2Score,
        band3Score: scores.band3Score,
        answers: {
          q1: answers[1] ?? false,
          q2: answers[2] ?? false,
          q3: answers[3] ?? false,
          q4: answers[4] ?? false,
          q5: answers[5] ?? false,
          q6: answers[6] ?? false,
          q7: answers[7] ?? false,
          q8: answers[8] ?? false,
          q9: answers[9] ?? false,
        },
        token,
        progressUrl,
        submittedAt: new Date().toISOString(),
      });

      // Redirect to progress page
      router.push(`/progress/${token}`);
    } catch (err) {
      console.error("Submission failed:", err);
      setWebhookError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const rating = scores ? getRating(scores.total) : null;

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
            Answer 9 short questions to find out how well your facility aligns with our acquisition criteria. Takes under 2 minutes.
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
            Answer 9 questions to find out how well your data centre aligns with our acquisition profile.
          </p>
        </div>

        {/* Progress steps */}
        <div className="flex gap-2 mb-8">
          {BANDS.map((band, i) => (
            <div
              key={band.id}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                i < currentBand
                  ? "bg-[#4a9eff]"
                  : i === currentBand
                    ? "bg-[#4a9eff]/50"
                    : "bg-white/10"
              }`}
            />
          ))}
        </div>

        {/* Current band */}
        <div key={activeBand.id}>
          {/* Band heading */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#4a9eff]">
              {String(currentBand + 1).padStart(2, "0")}
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#94a3b8]">
              {activeBand.label}
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Questions */}
          <div className="space-y-4">
            {bandQuestions.map((question) => (
              <div
                key={question.id}
                className="bg-[#0d1b33] border border-white/10 rounded-[19px] p-6 sm:p-8"
              >
                <p className="text-white text-lg sm:text-xl font-medium leading-snug mb-5">
                  {question.text}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    data-testid={`q${question.id}-yes`}
                    onClick={() => handleAnswer(question.id, true)}
                    className={`w-full py-3.5 rounded-lg text-base font-semibold transition-all duration-200 cursor-pointer ${
                      answers[question.id] === true
                        ? "bg-[#4a9eff] text-white border border-[#4a9eff] shadow-[0_0_12px_rgba(74,158,255,0.3)]"
                        : "bg-transparent text-[#94a3b8] border border-white/20 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    data-testid={`q${question.id}-no`}
                    onClick={() => handleAnswer(question.id, false)}
                    className={`w-full py-3.5 rounded-lg text-base font-semibold transition-all duration-200 cursor-pointer ${
                      answers[question.id] === false
                        ? "bg-white/10 text-white border border-white/30"
                        : "bg-transparent text-[#94a3b8] border border-white/20 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between">
          <div>
            {currentBand > 0 && (
              <button
                onClick={() => setCurrentBand((b) => b - 1)}
                className="text-xs text-[#94a3b8] hover:text-white transition-colors cursor-pointer"
              >
                ← Back
              </button>
            )}
          </div>
          <button
            data-testid="quiz-next"
            onClick={() => {
              if (isLastBand) {
                handleContinue();
              } else {
                setCurrentBand((b) => b + 1);
              }
            }}
            disabled={!bandAllAnswered}
            className={`px-8 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              bandAllAnswered
                ? "bg-[#4a9eff] text-white hover:bg-[#5aa8ff] shadow-[4px_4px_7px_3px_rgba(96,165,250,0.4)]"
                : "bg-white/5 text-[#94a3b8]/50 border border-white/10 cursor-not-allowed"
            }`}
          >
            {isLastBand ? "Continue" : "Next"}
          </button>
        </div>
      </div>
    );
  }

  // ── Contact Stage ──
  if (stage === "contact") {
    return (
      <div className="max-w-[720px] mx-auto px-4 py-12 sm:px-6">
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.2em] text-[#4a9eff] font-semibold mb-3">
            Almost There
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            See your compatibility result
          </h2>
          <p className="text-[#94a3b8] text-sm">
            Enter your details below to view your rating.
          </p>
        </div>

        <div className="bg-[#0d1b33] border border-white/10 rounded-[19px] p-6 sm:p-8">
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#94a3b8] mb-2">
                First Name
              </label>
              <input
                type="text"
                value={contactForm.firstName}
                onChange={(e) => setContactForm((f) => ({ ...f, firstName: e.target.value }))}
                placeholder="John"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white text-sm placeholder:text-[#94a3b8]/50 focus:outline-none focus:ring-2 focus:ring-[#4a9eff] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#94a3b8] mb-2">
                Facility Name
              </label>
              <input
                type="text"
                value={contactForm.facilityName}
                onChange={(e) => setContactForm((f) => ({ ...f, facilityName: e.target.value }))}
                placeholder="Acme Data Centre"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white text-sm placeholder:text-[#94a3b8]/50 focus:outline-none focus:ring-2 focus:ring-[#4a9eff] focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#94a3b8] mb-2">
                Email
              </label>
              <input
                type="email"
                value={contactForm.email}
                onChange={(e) => setContactForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="john@company.com"
                className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white text-sm placeholder:text-[#94a3b8]/50 focus:outline-none focus:ring-2 focus:ring-[#4a9eff] focus:border-transparent transition-all ${
                  contactForm.email && !isEmailValid ? "border-red-500/50" : "border-white/20"
                }`}
              />
              {contactForm.email && !isEmailValid && (
                <p className="text-red-400 text-xs mt-1">Please enter a valid email address.</p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#94a3b8] mb-2">
                Country
              </label>
              <input
                type="text"
                value={contactForm.country}
                onChange={(e) => setContactForm((f) => ({ ...f, country: e.target.value }))}
                placeholder="United Kingdom"
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white text-sm placeholder:text-[#94a3b8]/50 focus:outline-none focus:ring-2 focus:ring-[#4a9eff] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleSubmit}
              disabled={!isFormValid || isSubmitting}
              className={`px-8 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                isFormValid && !isSubmitting
                  ? "bg-[#4a9eff] text-white hover:bg-[#5aa8ff] shadow-[4px_4px_7px_3px_rgba(96,165,250,0.4)]"
                  : "bg-white/5 text-[#94a3b8]/50 border border-white/10 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Submitting..." : "View My Result"}
            </button>
          </div>
        </div>

        <button
          onClick={() => { setCurrentBand(BANDS.length - 1); setStage("quiz"); }}
          className="mt-6 mx-auto block text-xs text-[#94a3b8] hover:text-white transition-colors cursor-pointer"
        >
          ← Back to questions
        </button>
      </div>
    );
  }

  return null;
}
