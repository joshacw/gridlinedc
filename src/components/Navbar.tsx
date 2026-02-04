"use client";

import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '@/constants';

interface NavbarProps {
  onInquireClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onInquireClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`glass rounded-2xl flex items-center justify-between px-6 py-3 transition-all duration-300 ${isScrolled ? 'shadow-lg bg-white/80' : 'bg-white/40 shadow-sm'}`}>
          <div className="flex items-center">
            <span className="font-outfit text-2xl font-bold tracking-tighter text-dark-navy">
              GRID<span className="text-primary-blue">LINE</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-instrument-sans text-xs font-bold uppercase tracking-widest text-gridline-gray hover:text-primary-blue transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden sm:block font-instrument-sans text-xs font-bold uppercase tracking-widest text-dark-navy hover:text-primary-blue">
              Login
            </button>
            <button
              onClick={onInquireClick}
              className="bg-primary-blue hover:bg-cta-primary-hover text-white px-5 py-2.5 rounded-xl font-outfit text-xs font-bold uppercase tracking-widest transition-all shadow-primary hover:shadow-card-hover active:scale-95"
            >
              Inquire
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
