"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HOME_NAV_ITEMS } from '@/constants';
import { NavItem, PageContext } from '@/types';

interface NavbarProps {
  onInquireClick?: () => void;
  navItems?: NavItem[];
  pageContext?: PageContext;
}

const Navbar: React.FC<NavbarProps> = ({ onInquireClick, navItems, pageContext = 'home' }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const items = navItems || HOME_NAV_ITEMS;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isInternalLink = (href: string) => href.startsWith('/');

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`glass rounded-2xl flex items-center justify-between px-6 py-3 transition-all duration-300 ${isScrolled ? 'shadow-lg bg-white/80' : 'bg-white/40 shadow-sm'}`}>
          <div className="flex items-center gap-4">
            {pageContext !== 'home' && (
              <Link href="/" className="text-gridline-gray hover:text-primary-blue transition-colors mr-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
            )}
            <Link href="/">
              <span className="font-outfit text-2xl font-bold tracking-tighter text-dark-navy">
                GRID<span className="text-primary-blue">LINE</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {items.map((item) =>
              isInternalLink(item.href) ? (
                <Link
                  key={item.label}
                  href={item.href}
                  className="font-instrument-sans text-xs font-bold uppercase tracking-widest text-gridline-gray hover:text-primary-blue transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-instrument-sans text-xs font-bold uppercase tracking-widest text-gridline-gray hover:text-primary-blue transition-colors"
                >
                  {item.label}
                </a>
              )
            )}
          </div>

          <div className="flex items-center gap-4">
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
