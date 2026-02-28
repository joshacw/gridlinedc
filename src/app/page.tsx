"use client";

import Navbar from '@/components/Navbar';
import HomeHero from '@/components/HomeHero';
import HomePillars from '@/components/HomePillars';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen selection:bg-blue-100 selection:text-blue-900">
      {/* Subtle grid overlay — visible on dark sections */}
      <div
        className="fixed inset-0 opacity-60 pointer-events-none z-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(74,158,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(74,158,255,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <Navbar />

      <main>
        <HomeHero />
        <HomePillars />
      </main>

      <Footer />
    </div>
  );
}
