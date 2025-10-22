import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';

export default function BDAds() {
  const navigate = useNavigate();
  const [budget, setBudget] = useState(1000);
  const [estCPC, setEstCPC] = useState(3.5);
  const [convRate, setConvRate] = useState(0.05);
  const [simulating, setSimulating] = useState(false);
  const [result, setResult] = useState(null);

  const handleSimulate = async () => {
    try {
      setSimulating(true);
      const response = await api.post('/bd/ads/simulate', {
        budget,
        estCPC,
        convRate
      });
      setResult(response.data);
    } catch (err) {
      console.error('Error simulating ads:', err);
      alert('Failed to simulate. Check console for details.');
    } finally {
      setSimulating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🎯</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Google Ads Simulator</h1>
              <p className="text-sm text-gray-600">Model campaign performance</p>
            </div>
          </div>
          
          <button
            onClick={() => navigate('/home')}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 transition"
          >
            ← Back to Home
          </button>
        </div>
      </div>

      {/* BD Nav */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-4 overflow-x-auto py-3">
            <button
              onClick={() => navigate('/bd/goals')}
              className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition whitespace-nowrap"
            >
              Goals
            </button>
            <button
              onClick={() => navigate('/bd/events')}
              className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition whitespace-nowrap"
            >
              Events Outreach
            </button>
            <button
              onClick={() => navigate('/bd/content')}
              className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition whitespace-nowrap"
            >
              Content Planner
            </button>
            <button
              onClick={() => navigate('/bd/ads')}
              className="px-6 py-2 bg-white border-2 border-blue-500 text-blue-700 rounded-lg font-semibold whitespace-nowrap"
            >
              Google Ads
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        
        {/* Disclaimer */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <span className="text-3xl">⚠️</span>
            <div>
              <h3 className="font-bold text-yellow-900 mb-1">Demo Simulator</h3>
              <p className="text-yellow-800 text-sm">
                This is a placeholder simulator. We'll wire it to the actual Google Ads API once OAuth is cleared.
                For now, it shows you the math and strategy behind campaign planning.
              </p>
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200 mb-8">
          <h2 className="text-3xl font-black text-gray-900 mb-6">Campaign Parameters</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Monthly Budget ($)
              </label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Est. CPC ($)
              </label>
              <input
                type="number"
                step="0.1"
                value={estCPC}
                onChange={(e) => setEstCPC(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Conversion Rate (0-1)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={convRate}
                onChange={(e) => setConvRate(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
              />
              <p className="text-xs text-gray-500 mt-1">{Math.round(convRate * 100)}%</p>
            </div>
          </div>

          <button
            onClick={handleSimulate}
            disabled={simulating}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] disabled:opacity-50"
          >
            {simulating ? 'Simulating...' : '🚀 Simulate Campaign'}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Metrics Card */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl p-10 text-white">
              <h2 className="text-2xl font-bold mb-6">Projected Performance</h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white/20 rounded-xl p-4">
                  <p className="text-white/80 text-sm mb-1">Clicks</p>
                  <p className="text-5xl font-black">{result.clicks}</p>
                </div>
                <div className="bg-white/20 rounded-xl p-4">
                  <p className="text-white/80 text-sm mb-1">Leads</p>
                  <p className="text-5xl font-black">{result.leads}</p>
                </div>
                <div className="bg-white/20 rounded-xl p-4">
                  <p className="text-white/80 text-sm mb-1">Cost Per Lead</p>
                  <p className="text-5xl font-black">${typeof result.estCPA === 'number' ? result.estCPA : '∞'}</p>
                </div>
              </div>

              <p className="text-white/90 text-sm">{result.summary}</p>
            </div>

            {/* Tactical Notes */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">💡 Tactical Recommendations</h3>
              
              <div className="space-y-3">
                {result.notes.map((note, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-4"
                  >
                    <p className="text-gray-900">{note}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  🎯 <span className="font-semibold">Next Step:</span> Once we connect the real Google Ads API, 
                  we'll pull live keyword data, competition metrics, and push campaigns directly from this interface.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!result && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-10 text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-blue-900 mb-2">Ready to Simulate</h3>
            <p className="text-blue-700">
              Enter your campaign parameters above and click Simulate to see projected performance
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

