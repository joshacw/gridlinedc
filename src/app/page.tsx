"use client";

import Navbar from '@/components/Navbar';
import HomeHero from '@/components/HomeHero';
import HomePillars from '@/components/HomePillars';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      <main>
        <HomeHero />
        <HomePillars />
      </main>

      <Footer />
    </div>
  );
}
