import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

export default function Settings() {
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState({
    companyName: '',
    industry: '',
    website: '',
    foundedYear: ''
  });

  const handleSave = () => {
    localStorage.setItem('companyData', JSON.stringify(companyData));
    alert('Company settings saved!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
          
          {/* Company Setup */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Setup</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  value={companyData.companyName}
                  onChange={(e) => setCompanyData({...companyData, companyName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., Acme Corp"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Industry</label>
                <input
                  type="text"
                  value={companyData.industry}
                  onChange={(e) => setCompanyData({...companyData, industry: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., Technology, Legal, Healthcare"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
                <input
                  type="url"
                  value={companyData.website}
                  onChange={(e) => setCompanyData({...companyData, website: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., https://acme.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Founded Year</label>
                <input
                  type="number"
                  value={companyData.foundedYear}
                  onChange={(e) => setCompanyData({...companyData, foundedYear: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., 2020"
                />
              </div>
              
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Save Company Settings
              </button>
            </div>
          </div>

          {/* Assessment */}
          <div className="mb-8 border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Assessments</h2>
            <p className="text-gray-600 mb-6">
              Complete our assessments to get personalized growth recommendations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Growth Assessment</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Revenue, Human Capital, and Target Acquisition analysis
                </p>
                <button
                  onClick={() => navigate('/assessment')}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                >
                  Start Growth Assessment →
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">BD Baseline Assessment</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Current BD activities, social followers, email list, website traffic
                </p>
                <button
                  onClick={() => navigate('/bd-baseline-assessment')}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                >
                  Start BD Baseline →
                </button>
              </div>
            </div>
          </div>

          {/* Roadmap */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Roadmap</h2>
            <p className="text-gray-600 mb-6">
              See what features we're building and what's coming next.
            </p>
            <button
              onClick={() => navigate('/roadmap')}
              className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              View Roadmap →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

