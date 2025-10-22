import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AssessmentResults() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get data from navigation state
    if (location.state) {
      if (location.state.loading) {
        // Show loading state while AI processes
        setLoading(true);
        setResults(location.state);
      } else {
        // Show results
        setResults(location.state);
        setLoading(false);
      }
    } else {
      // If no data, redirect back to assessment
      navigate('/assessment');
    }
  }, [location.state, navigate]);


  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">🤖</div>
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-6"></div>
          <h2 className="text-3xl font-bold text-white mb-4">Getting Your Results...</h2>
          <p className="text-xl text-white/90 mb-2">Our AI is analyzing your assessment</p>
          <p className="text-lg text-white/70">This will just take a moment</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Assessment Data</h1>
          <button
            onClick={() => navigate('/assessment')}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Take Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Ignite Strategies" className="h-10" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Assessment Results</h1>
                <p className="text-gray-600">Growth analysis for {results.company}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* AI Analysis Header */}
        <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl shadow-xl p-8 text-white mb-8">
          <div className="text-center">
            <div className="text-6xl mb-4">🔥</div>
            <h2 className="text-4xl font-bold mb-2">AI-Powered Growth Analysis</h2>
            <p className="text-xl text-white/90">
              Personalized insights for {results.company}
            </p>
          </div>
        </div>

        {/* AI Analysis */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">🔥 AI Analysis</h3>
          <div className="space-y-6">
            {results.insights && (
              <>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {results.insights.relateWithUser}
                  </p>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {results.insights.growthNeeds}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>


        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => navigate('/prices')}
            className="px-12 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-red-500/50 transition-all hover:scale-105"
          >
            Learn How We Can Help →
          </button>
          
          <p className="text-gray-600 text-sm mt-4">
            Ready to unlock your growth potential? Let's build your success strategy.
          </p>
        </div>
      </div>
    </div>
  );
}