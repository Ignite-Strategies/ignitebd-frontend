import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

export default function BDBaselineResults() {
  const navigate = useNavigate();
  const [baselineData, setBaselineData] = useState(null);

  useEffect(() => {
    // Load BD baseline data from localStorage
    const savedData = localStorage.getItem('bdBaselineData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setBaselineData(data.baseline);
    }
  }, []);

  if (!baselineData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="p-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-6">⚠️</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">No BD Baseline Data Found</h1>
            <p className="text-gray-600 mb-8">Please complete the BD baseline assessment first.</p>
            <button
              onClick={() => navigate('/bd-baseline-assessment')}
              className="px-8 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
            >
              Go to BD Baseline Assessment →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-6">✅</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              BD Baseline Assessment Complete
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Here's a summary of your current business development foundation
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            
            {/* BD Summary */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your BD Foundation</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Team & Experience</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">BD Team Size:</span>
                        <span className="font-semibold text-gray-900">{baselineData.bdTeamSize} FTEs</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Average Experience:</span>
                        <span className="font-semibold text-gray-900">{baselineData.bdExperience} years</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Pipeline Metrics</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Active Pipeline:</span>
                        <span className="font-semibold text-gray-900">{baselineData.currentPipeline} deals</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Average Deal Size:</span>
                        <span className="font-semibold text-gray-900">${parseInt(baselineData.avgDealSize).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Close Rate:</span>
                        <span className="font-semibold text-gray-900">{baselineData.closeRate}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Channels & Tools</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Primary Channel:</span>
                        <span className="font-semibold text-gray-900 capitalize">{baselineData.primaryChannel.replace('-', ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">BD Tools:</span>
                        <span className="font-semibold text-gray-900">{baselineData.bdTools || 'Not specified'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Referral Program:</span>
                        <span className="font-semibold text-gray-900 capitalize">{baselineData.referralProgram}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h3>
              <div className="space-y-2 text-gray-700">
                <p>• Your BD baseline has been saved and will inform your growth strategy</p>
                <p>• Use this data to set realistic targets in your BD roadmap</p>
                <p>• Consider how to improve your weakest areas identified above</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-6">
              <button
                onClick={() => navigate('/bd-baseline-assessment')}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all"
              >
                ← Edit Assessment
              </button>
              <button
                onClick={() => navigate('/growth-dashboard')}
                className="px-8 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all"
              >
                Go to Dashboard →
              </button>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              BD Baseline Assessment Complete • Ready for growth planning
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
