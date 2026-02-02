
import React, { useState, useEffect } from 'react';
import { getMarketInsights } from '../geminiService';

const MarketInsights: React.FC = () => {
  const [topic, setTopic] = useState('AI Compute Demand');
  const [insight, setInsight] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const topics = [
    'AI Compute Demand',
    'Power Grid Stability',
    'Public Listing Trends',
    'Green Energy DC',
    'Edge Computing'
  ];

  const fetchInsight = async (t: string) => {
    setLoading(true);
    try {
      const result = await getMarketInsights(t);
      setInsight(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsight(topic);
  }, []);

  return (
    <section id="insights" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-outfit font-bold text-slate-900 mb-4">Market Intelligence</h2>
            <p className="text-lg text-slate-600">
              Our proprietary AI analyst provides real-time insights into the digital infrastructure market, identifying high-yield opportunities before they go public.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {topics.map(t => (
              <button
                key={t}
                onClick={() => { setTopic(t); fetchInsight(t); }}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  topic === t 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-8 min-h-[400px] relative overflow-hidden">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-blue-600 font-bold animate-pulse">Analyzing Market Dynamics...</p>
              </div>
            </div>
          ) : insight && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-fade-in">
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                  {topic} Analysis
                </h3>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line">
                  {insight.analysis}
                </div>
                <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                  <h4 className="font-bold text-blue-900 mb-2">Strategic Recommendation</h4>
                  <p className="text-blue-800">{insight.recommendation}</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Key Performance Indicators</h4>
                {insight.keyMetrics.map((metric: any, i: number) => (
                  <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                    <p className="text-sm text-slate-500 mb-1">{metric.label}</p>
                    <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
                  </div>
                ))}
                
                <div className="mt-8 p-6 bg-slate-900 rounded-2xl text-white">
                  <p className="text-sm text-slate-400 mb-4">Want more detailed reports?</p>
                  <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold transition-all">
                    Download Full PDF
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MarketInsights;
