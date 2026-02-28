import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | GRIDLINE",
  description:
    "GridLine Privacy Policy — how we collect, use, disclose, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-sm text-[#0a1e3d]/50 mb-10">
          Last Updated: February 23, 2026
        </p>

        <div className="prose prose-sm max-w-none text-[#0a1e3d]/80 space-y-8">
          <p>
            GridLine (&ldquo;Company,&rdquo; &ldquo;we,&rdquo;
            &ldquo;us,&rdquo; or &ldquo;our&rdquo;) values your privacy. This
            Privacy Policy explains how we collect, use, disclose, and protect
            your personal information when you visit or interact with our
            website (&ldquo;Site&rdquo;).
          </p>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              1. Information We Collect
            </h2>
            <p>
              We may collect personal and non-personal information, including:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                <strong>Personal Information:</strong> Name, email address,
                phone number, mailing address, company information, investor
                accreditation status, and any other information you provide.
              </li>
              <li>
                <strong>Non-Personal Information:</strong> Browser type, IP
                address, device information, pages visited, and usage patterns.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              2. How We Use Your Information
            </h2>
            <p>We use information for purposes including:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                Providing and improving our services and Site functionality
              </li>
              <li>Responding to inquiries or requests</li>
              <li>Administering accounts and transactions</li>
              <li>Evaluating potential investment opportunities</li>
              <li>Complying with legal and regulatory obligations</li>
              <li>
                Sending notices, updates, and marketing communications where
                permitted
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              3. How We Share Information
            </h2>
            <p>
              We do not sell your information. We may share information with:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                <strong>Service Providers:</strong> Vendors who provide services
                such as website hosting, analytics, KYC/AML verification, and
                payment processing
              </li>
              <li>
                <strong>Affiliates and Partners:</strong> To facilitate business
                operations and investment opportunities
              </li>
              <li>
                <strong>Legal or Regulatory Authorities:</strong> When required
                by law or in response to lawful requests
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with mergers,
                acquisitions, or sale of assets
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              4. Cookies and Tracking
            </h2>
            <p>
              We may use cookies, web beacons, and similar technologies to
              enhance your experience, analyze trends, and administer the Site.
              You may disable cookies through your browser settings, but some
              Site features may not function properly.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              5. Data Security
            </h2>
            <p>
              We implement reasonable administrative, technical, and physical
              safeguards to protect your information. However, no method of
              transmission or storage is completely secure. You acknowledge that
              you provide information at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              6. Data Retention
            </h2>
            <p>
              We retain your information as long as necessary to fulfill the
              purposes described in this Privacy Policy, comply with legal
              obligations, resolve disputes, and enforce our agreements.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              7. Your Rights
            </h2>
            <p>
              Depending on your jurisdiction, you may have the right to:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Access, correct, or delete personal information</li>
              <li>Opt out of certain communications</li>
              <li>Request restrictions on processing</li>
              <li>Withdraw consent where applicable</li>
            </ul>
            <p className="mt-2">
              To exercise these rights, contact us using the information below.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              8. International Users
            </h2>
            <p>
              By using the Site, you consent to transfer of your information to
              countries where GridLine or its service providers operate, which
              may have different data protection laws.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              9. Minors
            </h2>
            <p>
              The Site is not intended for individuals under 18. We do not
              knowingly collect personal information from minors.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              10. Changes to this Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy at any time. Updates will be
              posted on this page with the revised date. Continued use of the
              Site constitutes acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              11. Contact Information
            </h2>
            <p>
              If you have questions or concerns regarding this Privacy Policy,
              contact us at:
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
