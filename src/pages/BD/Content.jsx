import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';

export default function BDContent() {
  const navigate = useNavigate();
  const [generating, setGenerating] = useState(false);
  const [plan, setPlan] = useState(null);

  const handleGenerate = async () => {
    try {
      setGenerating(true);
      const response = await api.post('/bd/content/generate');
      setPlan(response.data);
    } catch (err) {
      console.error('Error generating content plan:', err);
      alert('Failed to generate plan. Check console for details.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-3xl">📝</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Content Planner</h1>
              <p className="text-sm text-gray-600">Weekly content strategy</p>
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
              className="px-6 py-2 bg-white border-2 border-blue-500 text-blue-700 rounded-lg font-semibold whitespace-nowrap"
            >
              Content Planner
            </button>
            <button
              onClick={() => navigate('/bd/ads')}
              className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition whitespace-nowrap"
            >
              Google Ads
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        
        {!plan ? (
          <div className="space-y-6">
            {/* Explainer */}
            <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-200 text-center">
              <div className="text-6xl mb-4">✍️</div>
              <h2 className="text-4xl font-black text-gray-900 mb-4">
                Weekly Content Skeleton
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                A balanced content strategy: one deep piece, one visual/short, and one community engagement post.
              </p>
              
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 disabled:opacity-50"
              >
                {generating ? 'Generating...' : '✨ Generate Placeholder Plan'}
              </button>
            </div>

            {/* Content Types */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
                <div className="text-4xl mb-3">📄</div>
                <h3 className="text-xl font-bold mb-2">Long-Form</h3>
                <p className="text-white/90 text-sm">
                  LinkedIn article or blog post (2-3 hours)
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
                <div className="text-4xl mb-3">🎨</div>
                <h3 className="text-xl font-bold mb-2">Short/Visual</h3>
                <p className="text-white/90 text-sm">
                  Carousel, infographic, or video (45 min)
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
                <div className="text-4xl mb-3">💬</div>
                <h3 className="text-xl font-bold mb-2">Community</h3>
                <p className="text-white/90 text-sm">
                  Poll, question, or engagement post (15 min)
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <button
              onClick={() => setPlan(null)}
              className="text-gray-600 hover:text-gray-900 flex items-center gap-2 transition"
            >
              <span>←</span>
              <span>Generate New Plan</span>
            </button>

            {/* Week Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl shadow-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-2">Content Plan</h2>
              <p className="text-white/90">Week of {new Date(plan.week).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>

            {/* Content Slots */}
            <div className="space-y-6">
              {plan.slots.map((slot, idx) => (
                <div key={idx} className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${
                      slot.type === 'long' ? 'bg-blue-100' :
                      slot.type === 'short' ? 'bg-purple-100' :
                      'bg-green-100'
                    }`}>
                      {slot.type === 'long' ? '📄' : slot.type === 'short' ? '🎨' : '💬'}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{slot.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          slot.type === 'long' ? 'bg-blue-100 text-blue-700' :
                          slot.type === 'short' ? 'bg-purple-100 text-purple-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {slot.type.toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{slot.format}</p>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-500">⏱️ {slot.estTime}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-blue-600 font-semibold">CTA: {slot.cta}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Themes & Hashtags */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📌 Themes & Tags</h3>
              
              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Content Themes</p>
                <div className="flex flex-wrap gap-2">
                  {plan.themes.map((theme, idx) => (
                    <span key={idx} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                      {theme}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Hashtags</p>
                <div className="flex flex-wrap gap-2">
                  {plan.hashtags.map((tag, idx) => (
                    <span key={idx} className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

