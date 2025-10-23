import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  calculateBDRoi, 
  calculateOptimalBDAllocation,
  BD_CONVERSION_METRICS 
} from '../services/GrowthCoefficientService';

// BD Channel Selector Component
function BDChannelSelector({ selectedChannel, onChannelChange }) {
  const channels = Object.keys(BD_CONVERSION_METRICS.LEAD_GENERATION);
  
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Select Your Primary BD Channel</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {channels.map(channel => {
          const metrics = BD_CONVERSION_METRICS.LEAD_GENERATION[channel];
          const isSelected = selectedChannel === channel;
          
          return (
            <button
              key={channel}
              onClick={() => onChannelChange(channel)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                isSelected 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-900">
                  {channel.replace('_', ' ')}
                </h4>
                <span className={`text-sm px-2 py-1 rounded ${
                  isSelected ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {Math.round(metrics.conversionRate * 100)}% conversion
                </span>
              </div>
              
              <div className="text-sm text-gray-600 space-y-1">
                <p>Cost per lead: ${metrics.costPerLead}</p>
                <p>CAC: ${metrics.costPerCustomer}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// BD ROI Results Component
function BDROIResults({ roiData }) {
  const {
    monthlySpend,
    leadsGenerated,
    customersAcquired,
    revenueGenerated,
    profit,
    roi,
    costPerCustomer,
    recommendations
  } = roiData;

  const getROIColor = (roi) => {
    if (roi >= 4) return 'text-green-600';
    if (roi >= 2) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getROILabel = (roi) => {
    if (roi >= 4) return 'Excellent';
    if (roi >= 2) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Your BD ROI Analysis</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">${monthlySpend.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Monthly Spend</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{leadsGenerated}</div>
          <div className="text-sm text-gray-600">Leads Generated</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{customersAcquired}</div>
          <div className="text-sm text-gray-600">Customers Acquired</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">${revenueGenerated.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Revenue Generated</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="text-center">
          <div className={`text-3xl font-bold ${getROIColor(roi)}`}>
            {roi}x
          </div>
          <div className="text-sm text-gray-600">ROI</div>
          <div className={`text-sm font-semibold ${getROIColor(roi)}`}>
            {getROILabel(roi)}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">
            ${costPerCustomer.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Cost per Customer</div>
        </div>
        
        <div className="text-center">
          <div className={`text-3xl font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${profit.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Monthly Profit</div>
        </div>
      </div>
      
      {recommendations.length > 0 && (
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3">Recommendations</h4>
          <ul className="space-y-2">
            {recommendations.map((rec, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Channel Comparison Component
function ChannelComparison({ monthlySpend, averageDealSize }) {
  const channels = Object.keys(BD_CONVERSION_METRICS.LEAD_GENERATION);
  
  const channelData = channels.map(channel => {
    const metrics = BD_CONVERSION_METRICS.LEAD_GENERATION[channel];
    const leadsGenerated = Math.floor(monthlySpend / metrics.costPerLead);
    const customersAcquired = Math.floor(leadsGenerated * metrics.conversionRate);
    const revenueGenerated = customersAcquired * averageDealSize;
    const roi = monthlySpend > 0 ? (revenueGenerated / monthlySpend) : 0;
    
    return {
      channel,
      metrics,
      leadsGenerated,
      customersAcquired,
      revenueGenerated,
      roi: Math.round(roi * 100) / 100
    };
  }).sort((a, b) => b.roi - a.roi);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Channel Performance Comparison</h3>
      
      <div className="space-y-4">
        {channelData.map((data, index) => (
          <div key={data.channel} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-semibold text-gray-900">
                {data.channel.replace('_', ' ')}
              </h4>
              <div className="text-right">
                <div className={`text-lg font-bold ${
                  data.roi >= 4 ? 'text-green-600' : 
                  data.roi >= 2 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {data.roi}x ROI
                </div>
                <div className="text-sm text-gray-600">
                  {data.customersAcquired} customers
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Leads:</span>
                <span className="ml-1 font-semibold">{data.leadsGenerated}</span>
              </div>
              <div>
                <span className="text-gray-500">Revenue:</span>
                <span className="ml-1 font-semibold">${data.revenueGenerated.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-gray-500">Conversion:</span>
                <span className="ml-1 font-semibold">{Math.round(data.metrics.conversionRate * 100)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main BD ROI Analyzer Component
export default function BDROIAnalyzer() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    monthlySpend: 5000,
    primaryChannel: 'GOOGLE_ADS',
    averageDealSize: 10000
  });
  const [roiData, setRoiData] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateROI = () => {
    try {
      const results = calculateBDRoi(formData);
      setRoiData(results);
      setShowResults(true);
    } catch (error) {
      console.error('Error calculating ROI:', error);
    }
  };

  const handleSave = () => {
    const dataToSave = {
      formData,
      roiData,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('bdROIData', JSON.stringify(dataToSave));
    navigate('/growth-dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/growth-dashboard')}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              ← Back to Dashboard
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">BD ROI Analyzer</h1>
              <p className="text-gray-600">Analyze your business development spend with real industry metrics</p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
              <div className="text-6xl mb-4">📊</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Business Development ROI Analysis</h2>
              <p className="text-gray-600 mb-8">
                Get real insights into your BD spend using industry-standard conversion rates and proven metrics.
              </p>
            </div>

            {/* BD Channel Selection */}
            <BDChannelSelector
              selectedChannel={formData.primaryChannel}
              onChannelChange={(channel) => handleInputChange('primaryChannel', channel)}
            />

            {/* Input Form */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Your BD Investment</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Monthly BD Spend ($)
                  </label>
                  <input
                    type="number"
                    value={formData.monthlySpend}
                    onChange={(e) => handleInputChange('monthlySpend', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 5000"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Average Deal Size ($)
                  </label>
                  <input
                    type="number"
                    value={formData.averageDealSize}
                    onChange={(e) => handleInputChange('averageDealSize', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 10000"
                  />
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <button
                  onClick={calculateROI}
                  className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Calculate ROI
                </button>
              </div>
            </div>

            {/* Results */}
            {showResults && roiData && (
              <>
                <BDROIResults roiData={roiData} />
                
                <ChannelComparison
                  monthlySpend={formData.monthlySpend}
                  averageDealSize={formData.averageDealSize}
                />
              </>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate('/growth-dashboard')}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Back to Dashboard
              </button>
              {showResults && (
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Save Analysis
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
