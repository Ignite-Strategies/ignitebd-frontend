import { useNavigate } from 'react-router-dom';

export default function Ecosystem() {
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
              <h1 className="text-3xl font-bold text-gray-900">Ecosystem Build</h1>
              <p className="text-gray-600">Manage your institutional partnerships and associations</p>
            </div>
          </div>

          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏢</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ecosystem Build</h2>
            <p className="text-gray-600 mb-8">
              Track your institutional partnerships, associations, and strategic relationships.
            </p>
            
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 max-w-md mx-auto">
              <h3 className="font-semibold text-orange-800 mb-2">Coming Soon</h3>
              <p className="text-orange-700 text-sm">
                This module will help you manage partnerships, track association memberships, 
                and build your institutional network for business development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
