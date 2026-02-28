import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="px-8 py-12 bg-white border-t border-[#0a1e3d]/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Logo + Description */}
          <div>
            <div className="mb-4">
              <span className="text-xl font-bold tracking-tighter text-[#0a1e3d]">
                GRID<span className="text-[#4a9eff]">LINE</span>
              </span>
            </div>
            <p className="text-sm text-[#0a1e3d]/60 leading-relaxed">
              Institutional digital infrastructure platform
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-[#0a1e3d]/90 tracking-wide">Platform</h4>
            <ul className="space-y-3">
              <li><Link href="/owners" className="text-sm text-[#0a1e3d]/50 hover:text-[#0a1e3d] transition-colors">For Owners</Link></li>
              <li><Link href="/investors" className="text-sm text-[#0a1e3d]/50 hover:text-[#0a1e3d] transition-colors">For Investors</Link></li>
              <li><a href="#" className="text-sm text-[#0a1e3d]/50 hover:text-[#0a1e3d] transition-colors">Governance</a></li>
            </ul>
          </div>

          {/* Regions */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-[#0a1e3d]/90 tracking-wide">Regions</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-[#0a1e3d]/50 hover:text-[#0a1e3d] transition-colors">APAC</a></li>
              <li><a href="#" className="text-sm text-[#0a1e3d]/50 hover:text-[#0a1e3d] transition-colors">North America</a></li>
              <li><a href="#" className="text-sm text-[#0a1e3d]/50 hover:text-[#0a1e3d] transition-colors">EMEA</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-[#0a1e3d]/90 tracking-wide">Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/terms" className="text-sm text-[#0a1e3d]/50 hover:text-[#0a1e3d] transition-colors">Terms</Link></li>
              <li><Link href="/privacy" className="text-sm text-[#0a1e3d]/50 hover:text-[#0a1e3d] transition-colors">Privacy</Link></li>
              <li><Link href="/disclaimers" className="text-sm text-[#0a1e3d]/50 hover:text-[#0a1e3d] transition-colors">Disclaimers</Link></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer + Copyright */}
        <div className="pt-8 border-t border-[#0a1e3d]/10">
          <p className="text-xs text-[#0a1e3d]/40 leading-relaxed mb-4">
            This website does not constitute an offer of securities. All investments involve risk, including possible loss of principal. Past performance does not guarantee future results. GRIDLINE operates under applicable securities regulations in each jurisdiction.
          </p>
          <p className="text-xs text-[#0a1e3d]/40">
            &copy; 2026 GRIDLINE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
