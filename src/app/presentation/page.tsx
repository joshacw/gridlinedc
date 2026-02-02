"use client";

import { useEffect, useState } from 'react';

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 8;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        scrollToSlide('next');
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollToSlide('prev');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  useEffect(() => {
    const slides = document.querySelectorAll('.slide');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slideNum = parseInt(entry.target.id.replace('slide-', ''));
            setCurrentSlide(slideNum);
          }
        });
      },
      { threshold: 0.5 }
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  const scrollToSlide = (direction: 'next' | 'prev') => {
    let newSlide = currentSlide;
    if (direction === 'next' && currentSlide < totalSlides) {
      newSlide = currentSlide + 1;
    } else if (direction === 'prev' && currentSlide > 1) {
      newSlide = currentSlide - 1;
    }

    const slideEl = document.getElementById(`slide-${newSlide}`);
    if (slideEl) {
      slideEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <>
      <style jsx global>{`
        body {
          background: #020617;
          color: #CBD5E1;
        }

        .presentation {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 20px;
          gap: 60px;
        }

        .slide {
          width: 1600px;
          height: 900px;
          max-width: 100%;
          background: linear-gradient(180deg, #0F172A 0%, #020617 100%);
          border-radius: 16px;
          border: 1px solid rgba(51, 65, 85, 0.5);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.05),
            0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .slide-content {
          padding: 60px 80px;
          flex: 1;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 1;
        }

        .slide-header {
          position: absolute;
          top: 24px;
          right: 80px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          z-index: 10;
        }

        .slide-header .logo-grid {
          font-weight: 700;
          color: #F8FAFC;
        }

        .slide-header .logo-line {
          font-weight: 700;
          color: #3B82F6;
        }

        .slide-header .separator {
          color: #475569;
          margin: 0 4px;
        }

        .slide-header .doc-title {
          color: #64748B;
        }

        .slide-footer {
          position: absolute;
          bottom: 24px;
          left: 0;
          right: 0;
          text-align: center;
          font-size: 11px;
          color: #475569;
          z-index: 10;
        }

        .bg-grid {
          position: absolute;
          inset: 0;
          opacity: 0.03;
          background-image:
            linear-gradient(#475569 1px, transparent 1px),
            linear-gradient(90deg, #475569 1px, transparent 1px);
          background-size: 80px 80px;
          pointer-events: none;
        }

        .bg-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.1;
          pointer-events: none;
        }

        .bg-glow.blue {
          background: #3B82F6;
        }

        .bg-glow.indigo {
          background: #6366F1;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          padding: 8px 16px;
          background: rgba(37, 99, 235, 0.1);
          border: 1px solid rgba(37, 99, 235, 0.3);
          border-radius: 100px;
          margin-bottom: 24px;
          width: fit-content;
        }

        .badge-text {
          font-size: 11px;
          font-weight: 700;
          font-style: italic;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #60A5FA;
        }

        .title-xl {
          font-size: 48px;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #F8FAFC;
          margin-bottom: 12px;
        }

        .title-lg {
          font-size: 38px;
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.01em;
          color: #F8FAFC;
          margin-bottom: 10px;
        }

        .heading-2 {
          font-size: 22px;
          font-weight: 700;
          line-height: 1.3;
          color: #60A5FA;
          margin-bottom: 12px;
          margin-top: 28px;
        }

        .heading-2:first-of-type {
          margin-top: 24px;
        }

        .subtitle {
          font-size: 16px;
          line-height: 1.6;
          color: #94A3B8;
          max-width: 700px;
        }

        .body-text {
          font-size: 15px;
          line-height: 1.6;
          color: #94A3B8;
        }

        .metrics-row {
          display: flex;
          gap: 16px;
          margin: 24px 0;
        }

        .metric-card {
          flex: 1;
          padding: 20px 16px;
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(51, 65, 85, 0.5);
          border-radius: 12px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .metric-card:hover {
          border-color: #3B82F6;
          transform: translateY(-2px);
        }

        .metric-value {
          font-size: 24px;
          font-weight: 700;
          color: #60A5FA;
          margin-bottom: 6px;
        }

        .metric-label {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #64748B;
        }

        .metric-card.highlighted {
          background: linear-gradient(135deg, #2563EB 0%, #4F46E5 100%);
          border-color: #3B82F6;
        }

        .metric-card.highlighted .metric-value {
          color: #FFFFFF;
        }

        .metric-card.highlighted .metric-label {
          color: #BFDBFE;
        }

        .comparison-group {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 28px;
          margin: 32px 0;
        }

        .comparison-card {
          width: 320px;
          padding: 36px 28px;
          border-radius: 16px;
          text-align: center;
        }

        .comparison-card.light {
          background: rgba(30, 41, 59, 0.5);
          border: 3px solid #334155;
        }

        .comparison-card.dark {
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(79, 70, 229, 0.15) 100%);
          border: 3px solid #3B82F6;
          box-shadow: 0 0 60px rgba(37, 99, 235, 0.2);
        }

        .comparison-card .card-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 16px;
        }

        .comparison-card.light .card-label {
          color: #64748B;
        }

        .comparison-card.dark .card-label {
          color: #60A5FA;
        }

        .comparison-card .card-value {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .comparison-card.light .card-value {
          color: #CBD5E1;
        }

        .comparison-card.dark .card-value {
          color: #FFFFFF;
        }

        .comparison-card .card-subtext {
          font-size: 12px;
          font-style: italic;
        }

        .comparison-card.light .card-subtext {
          color: #475569;
        }

        .comparison-card.dark .card-subtext {
          color: #93C5FD;
        }

        .arrow-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .arrow-icon {
          width: 48px;
          height: 48px;
          background: #2563EB;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 30px rgba(37, 99, 235, 0.4);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }

        .arrow-icon svg {
          width: 24px;
          height: 24px;
          color: #FFFFFF;
        }

        .arrow-label {
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #3B82F6;
        }

        .comparison-table {
          width: 100%;
          border-radius: 12px;
          border: 1px solid rgba(51, 65, 85, 0.5);
          overflow: hidden;
          margin-top: 24px;
        }

        .comparison-table table {
          width: 100%;
          border-collapse: collapse;
        }

        .comparison-table thead tr {
          background: rgba(30, 41, 59, 0.5);
        }

        .comparison-table th {
          padding: 14px 20px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          text-align: left;
          color: #64748B;
        }

        .comparison-table th:last-child {
          color: #60A5FA;
        }

        .comparison-table td {
          padding: 14px 20px;
          font-size: 13px;
          border-top: 1px solid rgba(51, 65, 85, 0.5);
        }

        .comparison-table td:first-child {
          font-weight: 600;
          color: #CBD5E1;
        }

        .comparison-table td:nth-child(2) {
          color: #64748B;
        }

        .comparison-table td:last-child {
          color: #60A5FA;
          font-weight: 500;
        }

        .comparison-table tbody tr {
          transition: background 0.2s ease;
        }

        .comparison-table tbody tr:hover {
          background: rgba(37, 99, 235, 0.05);
        }

        .bullet-list {
          list-style: none;
          margin: 16px 0;
          padding: 0;
        }

        .bullet-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 8px 0;
          font-size: 14px;
          color: #94A3B8;
          border-bottom: 1px solid rgba(51, 65, 85, 0.5);
        }

        .bullet-list li:last-child {
          border-bottom: none;
        }

        .bullet-list li::before {
          content: '';
          width: 6px;
          height: 6px;
          background: #3B82F6;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 7px;
        }

        .numbered-list {
          list-style: none;
          counter-reset: step;
          padding: 0;
        }

        .numbered-list li {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 14px 0;
          font-size: 14px;
          color: #94A3B8;
          border-bottom: 1px solid rgba(51, 65, 85, 0.5);
        }

        .numbered-list li:last-child {
          border-bottom: none;
        }

        .numbered-list li::before {
          counter-increment: step;
          content: counter(step);
          width: 28px;
          height: 28px;
          background: #2563EB;
          color: #FFFFFF;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          flex-shrink: 0;
        }

        .options-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 28px;
        }

        .option-card {
          padding: 24px 22px;
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(51, 65, 85, 0.5);
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .option-card:hover {
          transform: translateY(-4px);
          border-color: #3B82F6;
        }

        .option-card.featured {
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%);
          border-color: #3B82F6;
          box-shadow: 0 0 40px rgba(37, 99, 235, 0.15);
        }

        .option-type {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #60A5FA;
          margin-bottom: 12px;
        }

        .option-title {
          font-size: 17px;
          font-weight: 700;
          color: #F1F5F9;
          margin-bottom: 16px;
        }

        .option-points {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .option-points li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 12px;
          color: #64748B;
          padding: 5px 0;
        }

        .option-points li::before {
          content: '';
          width: 5px;
          height: 5px;
          background: #3B82F6;
          border-radius: 50%;
          flex-shrink: 0;
          margin-top: 6px;
        }

        .cover-slide .slide-content {
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .cover-logo {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 32px;
        }

        .cover-logo .grid {
          font-size: 42px;
          font-weight: 700;
          color: #F8FAFC;
          letter-spacing: -0.02em;
        }

        .cover-logo .line {
          font-size: 42px;
          font-weight: 700;
          color: #3B82F6;
          letter-spacing: -0.02em;
        }

        .accent-line {
          width: 180px;
          height: 3px;
          background: linear-gradient(90deg, #2563EB 0%, #6366F1 100%);
          border-radius: 2px;
          margin: 28px 0;
        }

        .cover-title {
          font-size: 56px;
          font-weight: 700;
          color: #F8FAFC;
          letter-spacing: -0.02em;
          margin-bottom: 14px;
        }

        .cover-subtitle {
          font-size: 18px;
          color: #94A3B8;
          max-width: 500px;
        }

        .cover-date {
          position: absolute;
          bottom: 80px;
          font-size: 12px;
          color: #475569;
        }

        .two-column {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-top: 24px;
        }

        .column-title {
          font-size: 18px;
          font-weight: 700;
          color: #60A5FA;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 2px solid rgba(37, 99, 235, 0.3);
        }

        .nav-controls {
          position: fixed;
          bottom: 40px;
          right: 40px;
          display: flex;
          gap: 12px;
          z-index: 100;
        }

        .nav-btn {
          width: 56px;
          height: 56px;
          background: #0F172A;
          border: 1px solid rgba(51, 65, 85, 0.5);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94A3B8;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-btn:hover {
          background: #2563EB;
          border-color: #3B82F6;
          color: #FFFFFF;
        }

        .nav-btn svg {
          width: 24px;
          height: 24px;
        }

        .slide-counter {
          position: fixed;
          bottom: 40px;
          left: 40px;
          background: #0F172A;
          border: 1px solid rgba(51, 65, 85, 0.5);
          padding: 12px 20px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          color: #94A3B8;
          z-index: 100;
        }

        .slide-counter .current {
          color: #60A5FA;
        }

        .capacity-visual {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          margin: 24px 0;
        }

        .donut-chart {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          background: conic-gradient(
            #3B82F6 0deg 180deg,
            #334155 180deg 270deg,
            #60A5FA 270deg 360deg
          );
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .donut-chart::before {
          content: '';
          width: 100px;
          height: 100px;
          background: #020617;
          border-radius: 50%;
        }

        .chart-legend {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .legend-color {
          width: 16px;
          height: 16px;
          border-radius: 4px;
        }

        .legend-color.contracted { background: #3B82F6; }
        .legend-color.available { background: #334155; }
        .legend-color.expansion { background: #60A5FA; }

        .legend-text {
          font-size: 14px;
          color: #94A3B8;
        }

        .legend-value {
          font-weight: 700;
          color: #E2E8F0;
          margin-left: auto;
        }

        .cred-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin: 24px 0;
        }

        .cred-metric {
          text-align: center;
          padding: 20px;
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(51, 65, 85, 0.5);
          border-radius: 12px;
        }

        .cred-metric .value {
          font-size: 30px;
          font-weight: 700;
          color: #60A5FA;
          margin-bottom: 8px;
        }

        .cred-metric .label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748B;
        }

        @media (max-width: 1700px) {
          .slide {
            transform: scale(0.85);
            transform-origin: top center;
            margin-bottom: -130px;
          }
        }

        @media (max-width: 1400px) {
          .slide {
            transform: scale(0.7);
            transform-origin: top center;
            margin-bottom: -260px;
          }
        }

        @media (max-width: 1100px) {
          .slide {
            transform: scale(0.55);
            margin-bottom: -400px;
          }
        }

        @media (max-width: 900px) {
          .slide {
            transform: scale(0.4);
            margin-bottom: -530px;
          }
        }
      `}</style>

      <div className="presentation">
        {/* Slide 1: Cover */}
        <div className="slide cover-slide" id="slide-1">
          <div className="bg-grid"></div>
          <div className="bg-glow blue" style={{ top: '-200px', left: '-200px' }}></div>
          <div className="bg-glow indigo" style={{ bottom: '-200px', right: '-200px' }}></div>

          <div className="slide-content">
            <div className="cover-logo font-outfit">
              <span className="grid">GRID</span><span className="line">LINE</span>
            </div>
            <div className="accent-line"></div>
            <h1 className="cover-title font-outfit">Financial Review</h1>
            <p className="cover-subtitle">Strategic assessment for data center asset integration and institutional value creation</p>
            <p className="cover-date">Confidential &bull; February 2026</p>
          </div>

          <div className="slide-footer">Confidential &bull; Page 1</div>
        </div>

        {/* Slide 2: Executive Summary */}
        <div className="slide" id="slide-2">
          <div className="bg-grid"></div>
          <div className="bg-glow blue" style={{ top: '50%', right: '-300px', transform: 'translateY(-50%)' }}></div>

          <div className="slide-header">
            <span className="logo-grid">GRID</span><span className="logo-line">LINE</span>
            <span className="separator">|</span>
            <span className="doc-title">Financial Review</span>
          </div>

          <div className="slide-content">
            <div className="badge">
              <span className="badge-text">Executive Summary</span>
            </div>
            <h1 className="title-lg font-outfit">Strategic Investment Opportunity</h1>
            <p className="subtitle">A comprehensive analysis of asset potential within the GRIDLINE institutional platform</p>

            <div style={{ marginTop: '40px' }}>
              <p className="body-text" style={{ marginBottom: '24px' }}>
                This financial review presents a strategic assessment for integrating high-quality data center assets into the GRIDLINE platform, unlocking institutional-grade valuation multiples and providing a clear path to public market liquidity.
              </p>

              <ul className="bullet-list">
                <li>Embedded growth capacity without new land or greenfield development</li>
                <li>Diversified end-market exposure across enterprise and hyperscale segments</li>
                <li>Anchor tenancy stability with long-term contracted revenue</li>
                <li>Operating leverage at current margins with upside potential</li>
                <li>Clean ownership structure enabling straightforward execution</li>
              </ul>
            </div>
          </div>

          <div className="slide-footer">Confidential &bull; Page 2</div>
        </div>

        {/* Slide 3: Asset Overview */}
        <div className="slide" id="slide-3">
          <div className="bg-grid"></div>
          <div className="bg-glow blue" style={{ top: '-100px', left: '50%', transform: 'translateX(-50%)' }}></div>

          <div className="slide-header">
            <span className="logo-grid">GRID</span><span className="logo-line">LINE</span>
            <span className="separator">|</span>
            <span className="doc-title">Financial Review</span>
          </div>

          <div className="slide-content">
            <div className="badge">
              <span className="badge-text">Asset Overview</span>
            </div>
            <h1 className="title-lg font-outfit">Infrastructure Metrics & Capacity</h1>
            <p className="subtitle">Current operational status and growth runway analysis</p>

            <div className="metrics-row">
              <div className="metric-card">
                <div className="metric-value font-outfit">4.2 MW</div>
                <div className="metric-label">IT Load Capacity</div>
              </div>
              <div className="metric-card highlighted">
                <div className="metric-value font-outfit">72%</div>
                <div className="metric-label">Current Utilization</div>
              </div>
              <div className="metric-card">
                <div className="metric-value font-outfit">1.35</div>
                <div className="metric-label">Average PUE</div>
              </div>
              <div className="metric-card">
                <div className="metric-value font-outfit">$8.2M</div>
                <div className="metric-label">Annual Revenue</div>
              </div>
            </div>

            <h2 className="heading-2 font-outfit">Capacity Allocation</h2>

            <div className="capacity-visual">
              <div className="donut-chart"></div>
              <div className="chart-legend">
                <div className="legend-item">
                  <div className="legend-color contracted"></div>
                  <span className="legend-text">Contracted Capacity</span>
                  <span className="legend-value">50%</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color available"></div>
                  <span className="legend-text">Available Capacity</span>
                  <span className="legend-value">25%</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color expansion"></div>
                  <span className="legend-text">Expansion Potential</span>
                  <span className="legend-value">25%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="slide-footer">Confidential &bull; Page 3</div>
        </div>

        {/* Slide 4: Strategic Assessment */}
        <div className="slide" id="slide-4">
          <div className="bg-grid"></div>
          <div className="bg-glow indigo" style={{ bottom: '-200px', left: '-200px' }}></div>

          <div className="slide-header">
            <span className="logo-grid">GRID</span><span className="logo-line">LINE</span>
            <span className="separator">|</span>
            <span className="doc-title">Financial Review</span>
          </div>

          <div className="slide-content">
            <div className="badge">
              <span className="badge-text">Strategic Assessment</span>
            </div>
            <h1 className="title-lg font-outfit">Strengths & Considerations</h1>
            <p className="subtitle">Comprehensive evaluation of asset positioning for platform integration</p>

            <div className="two-column">
              <div>
                <h3 className="column-title font-outfit">Key Strengths</h3>
                <ul className="bullet-list">
                  <li>Prime metropolitan location with robust connectivity</li>
                  <li>Tier III equivalent design with N+1 redundancy</li>
                  <li>Long-term anchor tenant with 11-year contract</li>
                  <li>Liquid cooling ready infrastructure</li>
                  <li>40% gross margin with optimization upside</li>
                </ul>
              </div>
              <div>
                <h3 className="column-title font-outfit">Considerations</h3>
                <ul className="bullet-list">
                  <li>Power expansion requires utility coordination</li>
                  <li>Single-tenant concentration at 60% of revenue</li>
                  <li>Fiber path diversity improvements needed</li>
                  <li>CAPEX required for AI-ready density upgrade</li>
                  <li>Operating team transition planning</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="slide-footer">Confidential &bull; Page 4</div>
        </div>

        {/* Slide 5: Platform Integration Value */}
        <div className="slide" id="slide-5">
          <div className="bg-grid"></div>
          <div className="bg-glow blue" style={{ top: '20%', right: '-300px' }}></div>
          <div className="bg-glow indigo" style={{ bottom: '20%', left: '-300px' }}></div>

          <div className="slide-header">
            <span className="logo-grid">GRID</span><span className="logo-line">LINE</span>
            <span className="separator">|</span>
            <span className="doc-title">Financial Review</span>
          </div>

          <div className="slide-content">
            <div className="badge">
              <span className="badge-text">Valuation Model</span>
            </div>
            <h1 className="title-lg font-outfit">Platform Integration Value</h1>
            <p className="subtitle">Why standalone assets are worth more inside a unified, public-ready platform</p>

            <div className="comparison-group">
              <div className="comparison-card light">
                <div className="card-label">Standalone Asset</div>
                <div className="card-value font-outfit">1x – 3x Revenue</div>
                <div className="card-subtext">Discounted for illiquidity</div>
              </div>

              <div className="arrow-block">
                <div className="arrow-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
                </div>
                <span className="arrow-label">Platform</span>
              </div>

              <div className="comparison-card dark">
                <div className="card-label">Institutional / Public</div>
                <div className="card-value font-outfit">*8 – 12x Multiple</div>
                <div className="card-subtext">Portfolio-wide rerating</div>
              </div>
            </div>

            <div className="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>What Changes</th>
                    <th>On Its Own</th>
                    <th>Inside GRIDLINE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>How it&apos;s valued</td>
                    <td>Based on DC EBITDA today</td>
                    <td>Based on platform scale and predictability</td>
                  </tr>
                  <tr>
                    <td>Risk profile</td>
                    <td>Concentrated in one asset</td>
                    <td>Spread across multiple assets</td>
                  </tr>
                  <tr>
                    <td>Capital access</td>
                    <td>Raised asset by asset</td>
                    <td>Raised at platform level</td>
                  </tr>
                  <tr>
                    <td>Exit options</td>
                    <td>Sell the asset</td>
                    <td>Multiple exit pathways</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="slide-footer">Confidential &bull; Page 5</div>
        </div>

        {/* Slide 6: Partnership Options */}
        <div className="slide" id="slide-6">
          <div className="bg-grid"></div>
          <div className="bg-glow blue" style={{ top: '50%', left: '-200px', transform: 'translateY(-50%)' }}></div>

          <div className="slide-header">
            <span className="logo-grid">GRID</span><span className="logo-line">LINE</span>
            <span className="separator">|</span>
            <span className="doc-title">Financial Review</span>
          </div>

          <div className="slide-content">
            <div className="badge">
              <span className="badge-text">Partnership Structure</span>
            </div>
            <h1 className="title-lg font-outfit">Transaction Options</h1>
            <p className="subtitle">Flexible structures designed to align incentives and maximize value creation</p>

            <div className="options-grid">
              <div className="option-card featured">
                <div className="option-type">Primary Option</div>
                <h3 className="option-title font-outfit">Vendor Finance with Platform Equity</h3>
                <ul className="option-points">
                  <li>Agreed enterprise valuation</li>
                  <li>Deferred consideration via vendor financing</li>
                  <li>Interest accrual over time</li>
                  <li>Repayment from free cash flow</li>
                  <li>Minority equity participation in GRIDLINE</li>
                </ul>
              </div>

              <div className="option-card">
                <div className="option-type">Alternative Option</div>
                <h3 className="option-title font-outfit">Partial Cash / Partial Equity</h3>
                <ul className="option-points">
                  <li>Partial liquidity at close</li>
                  <li>Increased execution complexity</li>
                  <li>Longer transaction timelines</li>
                  <li>Reduced alignment vs Option 1</li>
                </ul>
              </div>

              <div className="option-card">
                <div className="option-type">Fallback Option</div>
                <h3 className="option-title font-outfit">All Equity Contribution</h3>
                <ul className="option-points">
                  <li>No immediate liquidity</li>
                  <li>Full platform risk exposure</li>
                  <li>Maximum upside potential</li>
                  <li>Limited governance alignment</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="slide-footer">Confidential &bull; Page 6</div>
        </div>

        {/* Slide 7: Execution Credibility */}
        <div className="slide" id="slide-7">
          <div className="bg-grid"></div>
          <div className="bg-glow indigo" style={{ top: '-100px', right: '-200px' }}></div>

          <div className="slide-header">
            <span className="logo-grid">GRID</span><span className="logo-line">LINE</span>
            <span className="separator">|</span>
            <span className="doc-title">Financial Review</span>
          </div>

          <div className="slide-content">
            <div className="badge">
              <span className="badge-text">Track Record</span>
            </div>
            <h1 className="title-lg font-outfit">Execution Credibility</h1>
            <p className="subtitle">Proven capabilities in infrastructure aggregation and institutional exits</p>

            <div className="cred-metrics">
              <div className="cred-metric">
                <div className="value font-outfit">$2.4B</div>
                <div className="label">Assets Under<br/>Management</div>
              </div>
              <div className="cred-metric">
                <div className="value font-outfit">12</div>
                <div className="label">Completed<br/>Transactions</div>
              </div>
              <div className="cred-metric">
                <div className="value font-outfit">3</div>
                <div className="label">Public Market<br/>Exits</div>
              </div>
              <div className="cred-metric">
                <div className="value font-outfit">45MW</div>
                <div className="label">Total Capacity<br/>Aggregated</div>
              </div>
            </div>

            <h2 className="heading-2 font-outfit">Core Capabilities</h2>

            <ul className="bullet-list">
              <li>Deep relationships with institutional capital providers and strategic buyers</li>
              <li>Operational excellence team with 80+ years combined DC experience</li>
              <li>Proven integration playbook for governance standardization</li>
              <li>Active pipeline of complementary acquisition targets</li>
              <li>Board-level sponsorship from listed infrastructure veterans</li>
            </ul>
          </div>

          <div className="slide-footer">Confidential &bull; Page 7</div>
        </div>

        {/* Slide 8: Next Steps */}
        <div className="slide" id="slide-8">
          <div className="bg-grid"></div>
          <div className="bg-glow blue" style={{ bottom: '-200px', left: '50%', transform: 'translateX(-50%)' }}></div>

          <div className="slide-header">
            <span className="logo-grid">GRID</span><span className="logo-line">LINE</span>
            <span className="separator">|</span>
            <span className="doc-title">Financial Review</span>
          </div>

          <div className="slide-content">
            <div className="badge">
              <span className="badge-text">Path Forward</span>
            </div>
            <h1 className="title-lg font-outfit">Next Steps</h1>
            <p className="subtitle">Proposed timeline for moving from initial discussion to transaction close</p>

            <ol className="numbered-list" style={{ marginTop: '48px' }}>
              <li>
                <div>
                  <strong style={{ color: '#E2E8F0' }}>Initial Discussion</strong><br/>
                  <span style={{ color: '#64748B' }}>Alignment on indicative terms and partnership structure preference</span>
                </div>
              </li>
              <li>
                <div>
                  <strong style={{ color: '#E2E8F0' }}>Due Diligence Access</strong><br/>
                  <span style={{ color: '#64748B' }}>Data room setup for technical, financial, and legal review</span>
                </div>
              </li>
              <li>
                <div>
                  <strong style={{ color: '#E2E8F0' }}>Term Sheet Negotiation</strong><br/>
                  <span style={{ color: '#64748B' }}>Binding agreement on key commercial and governance terms</span>
                </div>
              </li>
              <li>
                <div>
                  <strong style={{ color: '#E2E8F0' }}>Transaction Close</strong><br/>
                  <span style={{ color: '#64748B' }}>Integration into GRIDLINE platform and value creation initiation</span>
                </div>
              </li>
            </ol>

            <div style={{
              marginTop: '48px',
              padding: '32px',
              background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%)',
              border: '1px solid rgba(37, 99, 235, 0.3)',
              borderRadius: '16px',
              textAlign: 'center'
            }}>
              <p className="body-text" style={{ color: '#CBD5E1', marginBottom: '16px' }}>
                Ready to explore how GRIDLINE can unlock institutional value for your asset?
              </p>
              <p style={{ fontSize: '14px', color: '#60A5FA', fontWeight: 600 }}>
                Contact: strategy@gridlinedc.com
              </p>
            </div>
          </div>

          <div className="slide-footer">Confidential &bull; Page 8</div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="nav-controls">
        <button className="nav-btn" onClick={() => scrollToSlide('prev')} aria-label="Previous slide">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7"/>
          </svg>
        </button>
        <button className="nav-btn" onClick={() => scrollToSlide('next')} aria-label="Next slide">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
      </div>

      {/* Slide Counter */}
      <div className="slide-counter">
        <span className="current">{currentSlide}</span> / {totalSlides}
      </div>
    </>
  );
}
