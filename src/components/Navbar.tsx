"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const NAV_ITEMS = [
  { label: 'About', href: '/about' },
  { label: 'For Owners', href: '/owners' },
  { label: 'For Investors', href: '/investors' },
];

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/5 border-b border-white/10 ${isScrolled ? 'backdrop-blur-sm' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-6 px-0">
          <div className="flex items-center">
            <Link href="/">
              <span className="text-2xl font-bold tracking-tighter text-white">
                GRID<span className="text-[#4a9eff]">LINE</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-10">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium uppercase tracking-wider text-white/80 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
