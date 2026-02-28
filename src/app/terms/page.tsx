import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use | GRIDLINE",
  description:
    "GridLine Terms of Use — the terms governing your use of our website and services.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link
          href="/"
          className="inline-block mb-10 text-sm text-[#0a1e3d]/50 hover:text-[#0a1e3d] transition-colors"
        >
          &larr; Back to home
        </Link>

        <h1 className="text-3xl font-bold text-[#0a1e3d] mb-2 font-[family-name:var(--font-outfit)]">
          Terms of Use
        </h1>
        <p className="text-sm text-[#0a1e3d]/50 mb-10">
          Last Updated: February 23, 2026
        </p>

        <div className="prose prose-sm max-w-none text-[#0a1e3d]/80 space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using the GridLine website (&ldquo;Site&rdquo;),
              you agree to be bound by these Terms of Use
              (&ldquo;Terms&rdquo;). If you do not agree, you may not access or
              use this Site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              2. Company Information
            </h2>
            <p>
              GridLine (&ldquo;Company,&rdquo; &ldquo;we,&rdquo;
              &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates this Site and
              related services.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              3. Eligibility
            </h2>
            <p>
              You must be at least 18 years old and legally capable of entering
              into a binding contract. By using the Site, you represent and
              warrant that you meet these requirements.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              4. Account Registration
            </h2>
            <p>If you create an account, you agree to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Provide accurate and complete information</li>
              <li>Maintain confidentiality of your login credentials</li>
              <li>
                Notify us immediately of any unauthorized access
              </li>
            </ul>
            <p className="mt-2">
              We may suspend or terminate accounts at our discretion.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              5. Use of the Site
            </h2>
            <p>
              You agree to use the Site only for lawful purposes and in
              accordance with these Terms. You may not:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe intellectual property rights</li>
              <li>
                Transmit malicious software or attempt unauthorized access
              </li>
              <li>Interfere with Site functionality or security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              6. Intellectual Property
            </h2>
            <p>
              All content on the Site, including text, graphics, logos, software,
              and designs, is owned by or licensed to GridLine and is protected
              by intellectual property laws. You may not copy, distribute, or
              create derivative works without prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              7. Third-Party Links
            </h2>
            <p>
              The Site may contain links to third-party websites. We are not
              responsible for the content, policies, or practices of third-party
              sites.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              8. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, GridLine shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages arising from your use of the Site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              9. Indemnification
            </h2>
            <p>
              You agree to defend, indemnify, and hold harmless GridLine and its
              affiliates, officers, directors, employees, and agents from any
              claims, damages, liabilities, or expenses arising from your use of
              the Site or violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              10. No Warranties
            </h2>
            <p>
              The Site and its content are provided &ldquo;AS IS&rdquo; and
              &ldquo;AS AVAILABLE&rdquo; without warranties of any kind, whether
              express or implied, including merchantability, fitness for a
              particular purpose, or non-infringement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              11. Termination
            </h2>
            <p>
              We may suspend or terminate access to the Site at any time,
              without notice, for conduct that violates these Terms or is
              otherwise harmful.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              12. Modifications
            </h2>
            <p>
              We may revise these Terms at any time. Updated versions will be
              posted on this page with a revised date. Continued use of the Site
              constitutes acceptance of updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              13. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with
              the laws of the State of Wyoming, USA, without regard to its
              conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              14. Dispute Resolution
            </h2>
            <p>
              Any disputes arising from these Terms shall be resolved through
              binding arbitration in Denver, Colorado, USA, except where
              prohibited by law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              15. Severability
            </h2>
            <p>
              If any provision of these Terms is found unenforceable, the
              remaining provisions will remain in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              16. Entire Agreement
            </h2>
            <p>
              These Terms constitute the entire agreement between you and
              GridLine regarding use of the Site and supersede any prior
              agreements.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              17. Contact Information
            </h2>
            <p>
              If you have questions about these Terms, contact us at:
            </p>
            <address className="not-italic mt-3 leading-relaxed">
              GridLine Inc.
              <br />
              32 N. Gould St.
              <br />
              Sheridan, WY 82801
              <br />
              <a
                href="mailto:info@gridline.network"
                className="text-[#2469ff] hover:underline"
              >
                info@gridline.network
              </a>
              <br />
              303-960-2858
            </address>
          </section>
        </div>
      </div>
    </main>
  );
}
