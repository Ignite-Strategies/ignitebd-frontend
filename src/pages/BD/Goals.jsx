import { useNavigate } from 'react-router-dom';
import { useActivation } from '../../context/ActivationContext';

export default function BDGoals() {
  const navigate = useNavigate();
  const { goalAnnual, setGoalAnnual, goalQuarter, setGoalQuarter } = useActivation();

  const progress = goalQuarter > 0 ? Math.min((goalQuarter / (goalAnnual / 4)) * 100, 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🎯</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">BD Goals</h1>
              <p className="text-sm text-gray-600">Revenue Targets & Progress</p>
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
              className="px-6 py-2 bg-white border-2 border-blue-500 text-blue-700 rounded-lg font-semibold whitespace-nowrap"
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
              className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition whitespace-nowrap"
            >
              Google Ads
            </button>
            <button
              onClick={() => navigate('/bd/pipeline')}
              className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition whitespace-nowrap"
            >
              Pipeline
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        
        {/* Goals Input */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200 mb-8">
          <h2 className="text-3xl font-black text-gray-900 mb-6">Set Your Revenue Goals</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Annual Revenue Goal ($)
              </label>
              <input
                type="number"
                value={goalAnnual}
                onChange={(e) => setGoalAnnual(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none text-lg"
              />
              <p className="text-xs text-gray-500 mt-1">Your target for the year</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                This Quarter's Target ($)
              </label>
              <input
                type="number"
                value={goalQuarter}
                onChange={(e) => setGoalQuarter(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none text-lg"
              />
              <p className="text-xs text-gray-500 mt-1">Q{Math.ceil((new Date().getMonth() + 1) / 3)} goal</p>
            </div>
          </div>
        </div>

        {/* Progress Visualization */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl shadow-2xl p-10 text-white mb-8">
          <h2 className="text-2xl font-bold mb-6">Annual Progress</h2>
          
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-white/90 text-sm">Quarter Progress</span>
              <span className="font-bold">{progress.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-6">
              <div
                className="bg-white rounded-full h-6 transition-all duration-500 flex items-center justify-end pr-3"
                style={{ width: `${progress}%` }}
              >
                {progress > 10 && (
                  <span className="text-green-600 text-xs font-bold">
                    {progress.toFixed(0)}%
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/20 rounded-xl p-4">
              <p className="text-white/80 text-sm">Annual Goal</p>
              <p className="text-3xl font-bold">${(goalAnnual / 1000).toFixed(0)}K</p>
            </div>
            <div className="bg-white/20 rounded-xl p-4">
              <p className="text-white/80 text-sm">Quarterly Target</p>
              <p className="text-3xl font-bold">${(goalAnnual / 4 / 1000).toFixed(0)}K</p>
            </div>
            <div className="bg-white/20 rounded-xl p-4">
              <p className="text-white/80 text-sm">This Quarter</p>
              <p className="text-3xl font-bold">${(goalQuarter / 1000).toFixed(0)}K</p>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">📅 Quarterly Milestones</h3>
          
          <div className="space-y-4">
            {['Q1', 'Q2', 'Q3', 'Q4'].map((q, idx) => {
              const target = goalAnnual / 4;
              const current = idx === Math.ceil((new Date().getMonth() + 1) / 3) - 1 ? goalQuarter : 0;
              
              return (
                <div key={q} className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${
                    idx === Math.ceil((new Date().getMonth() + 1) / 3) - 1 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {q}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold">${(target / 1000).toFixed(0)}K Target</span>
                      {current > 0 && (
                        <span className="text-green-600 font-bold">${(current / 1000).toFixed(0)}K ({(current / target * 100).toFixed(0)}%)</span>
                      )}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 rounded-full h-2"
                        style={{ width: `${current > 0 ? Math.min((current / target) * 100, 100) : 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

