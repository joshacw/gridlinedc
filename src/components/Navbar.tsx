"use client";

import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '@/constants';

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`glass rounded-2xl flex items-center justify-between px-6 py-3 transition-all duration-300 ${isScrolled ? 'shadow-lg bg-white/80' : 'bg-white/40 shadow-sm'}`}>
          <div className="flex items-center">
            <span className="font-outfit text-2xl font-bold tracking-tighter text-slate-950">
              GRID<span className="text-blue-600">LINE</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden sm:block text-xs font-bold uppercase tracking-widest text-slate-900 hover:text-blue-600">
              Login
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md hover:shadow-xl active:scale-95">
              Inquire
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
