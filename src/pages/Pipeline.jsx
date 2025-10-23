import { useNavigate } from 'react-router-dom';

export default function Pipeline() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/growth-dashboard')}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              ← Back to Dashboard
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Pipeline Management</h1>
              <p className="text-gray-600">Track your lead flow and conversion metrics</p>
            </div>
          </div>

          <div className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pipeline Management</h2>
            <p className="text-gray-600 mb-8">
              Monitor your sales pipeline, track conversions, and optimize your lead flow.
            </p>
            
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 max-w-md mx-auto">
              <h3 className="font-semibold text-purple-800 mb-2">Coming Soon</h3>
              <p className="text-purple-700 text-sm">
                This module will provide comprehensive pipeline tracking, conversion analysis, 
                and lead management tools to optimize your sales process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
