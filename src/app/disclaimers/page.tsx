import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimers | GRIDLINE",
  description:
    "GridLine Disclaimers — important legal notices regarding our website and services.",
};

export default function DisclaimersPage() {
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
          Disclaimers
        </h1>
        <p className="text-sm text-[#0a1e3d]/50 mb-10">
          Last Updated: February 23, 2026
        </p>

        <div className="prose prose-sm max-w-none text-[#0a1e3d]/80 space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              1. General Disclaimer
            </h2>
            <p>
              All information on the GridLine website (&ldquo;Site&rdquo;) is
              for informational purposes only and does not constitute legal, tax,
              investment, or financial advice. Users should consult professional
              advisors before making any decisions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              2. Investment &amp; Securities Disclaimer
            </h2>
            <p>
              GridLine is a holding company seeking to acquire data centers and
              may raise capital from qualified or accredited investors. Any
              information on the Site:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>
                Is intended solely for qualified investors as defined under
                applicable securities laws
              </li>
              <li>Is subject to separate offering documents</li>
              <li>
                Does not constitute a public offering or solicitation in any
                jurisdiction where prohibited
              </li>
              <li>
                Involves substantial risks, including loss of principal,
                illiquidity, operational, and regulatory risks
              </li>
            </ul>
            <p className="mt-2">
              Users should carefully review all offering materials and
              disclosures before making any investment decision.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              3. No Broker-Dealer Services
            </h2>
            <p>
              GridLine does not provide brokerage, investment advisory, or dealer
              services unless expressly stated. Users should not rely on the Site
              as a substitute for professional advice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              4. Forward-Looking Statements
            </h2>
            <p>
              Statements regarding future plans, acquisitions, or performance
              are forward-looking and subject to risks and uncertainties. Actual
              results may differ materially.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              5. Third-Party Links
            </h2>
            <p>
              The Site may include links to third-party websites. GridLine is not
              responsible for the content, accuracy, or policies of these sites.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              6. Risk Acknowledgment
            </h2>
            <p>
              By accessing investment-related content, users acknowledge
              understanding the risks associated with private company investments
              and capital raising activities.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              7. Regulatory Compliance
            </h2>
            <p>
              Users must comply with all applicable securities laws, anti-money
              laundering regulations, and other legal requirements. GridLine
              reserves the right to refuse participation for compliance or
              regulatory reasons.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              8. Electronic Communications Consent
            </h2>
            <p>
              By submitting information or accessing investment materials, users
              consent to receive electronic communications from GridLine,
              including disclosures, notices, and offering documents.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#0a1e3d] mb-3">
              9. Contact Information
            </h2>
            <p>
              For questions regarding these disclaimers, contact:
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
