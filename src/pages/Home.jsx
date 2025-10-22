import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActivation } from '../context/ActivationContext';

export default function Home() {
  const navigate = useNavigate();
  const {
    annualTarget,
    setAnnualTarget,
    avgDeal,
    setAvgDeal,
    winRate,
    setWinRate,
    cycleDays,
    setCycleDays
  } = useActivation();

  // Derived calculations
  const dealsNeeded = Math.ceil(annualTarget / Math.max(avgDeal, 1));
  const oppsNeeded = Math.ceil(dealsNeeded / Math.max(winRate, 0.0001));
  const monthlyTarget = Math.ceil(annualTarget / 12);
  const startsPerMonth = Math.ceil(oppsNeeded / (365 / Math.max(cycleDays, 1)) * (365 / 12));

  const pillars = [
    {
      id: 'cost',
      title: 'Cost / Ops',
      icon: '💰',
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Analyze spend, set reinvestment %, see runway',
      route: '/cost'
    },
    {
      id: 'human',
      title: 'Human Capital & Efficiency',
      icon: '⚡',
      gradient: 'from-purple-500 to-pink-500',
      description: 'Model capacity, utilization, and contractor hires',
      route: '/human'
    },
    {
      id: 'bd',
      title: 'Business Development',
      icon: '🚀',
      gradient: 'from-green-500 to-emerald-500',
      description: 'Goals → Events → Content → Google Ads',
      route: '/bd/goals'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🔥</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Ignite Home</h1>
              <p className="text-sm text-gray-600">Activation Accounting Dashboard</p>
            </div>
          </div>
          
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 transition"
          >
            ← Back
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Three Pillar Cards */}
        <div className="mb-12">
          <h2 className="text-3xl font-black text-gray-900 mb-6">Choose Your Path</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map(pillar => (
              <button
                key={pillar.id}
                onClick={() => navigate(pillar.route)}
                className={`group bg-gradient-to-br ${pillar.gradient} rounded-3xl shadow-xl hover:shadow-2xl transition-all p-8 text-left hover:scale-[1.03]`}
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{pillar.title}</h3>
                <p className="text-white/90 mb-6 leading-relaxed">
                  {pillar.description}
                </p>
                <div className="flex items-center gap-2 text-white font-semibold">
                  <span>Explore</span>
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Target Revenue Planner */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
          <div className="mb-6">
            <h2 className="text-3xl font-black text-gray-900 mb-2">Target Revenue Planner</h2>
            <p className="text-gray-600">
              Backsolve how many deals you need and how many opps to start each month
            </p>
          </div>

          {/* Inputs */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Annual Target ($)
              </label>
              <input
                type="number"
                value={annualTarget}
                onChange={(e) => setAnnualTarget(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Avg Deal Size ($)
              </label>
              <input
                type="number"
                value={avgDeal}
                onChange={(e) => setAvgDeal(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Win Rate (0-1)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={winRate}
                onChange={(e) => setWinRate(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sales Cycle (days)
              </label>
              <input
                type="number"
                value={cycleDays}
                onChange={(e) => setCycleDays(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Results */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
              <p className="text-sm text-blue-600 font-semibold mb-1">Deals Needed</p>
              <p className="text-4xl font-black text-blue-900">{dealsNeeded}</p>
              <p className="text-xs text-blue-600 mt-1">to hit target</p>
            </div>

            <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-6">
              <p className="text-sm text-purple-600 font-semibold mb-1">Opps Needed</p>
              <p className="text-4xl font-black text-purple-900">{oppsNeeded}</p>
              <p className="text-xs text-purple-600 mt-1">total pipeline</p>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
              <p className="text-sm text-green-600 font-semibold mb-1">Monthly Target</p>
              <p className="text-4xl font-black text-green-900">${(monthlyTarget / 1000).toFixed(0)}K</p>
              <p className="text-xs text-green-600 mt-1">revenue/month</p>
            </div>

            <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6">
              <p className="text-sm text-orange-600 font-semibold mb-1">Starts Per Month</p>
              <p className="text-4xl font-black text-orange-900">{startsPerMonth}</p>
              <p className="text-xs text-orange-600 mt-1">new opps needed</p>
            </div>
          </div>

          {/* Helper Text */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
            <p className="text-sm text-blue-900">
              <span className="font-bold">💡 Insight:</span> At a {cycleDays}-day cycle, you need to start{' '}
              <span className="font-bold">{startsPerMonth} new opportunities per month</span> to stay on pace for your annual target.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

