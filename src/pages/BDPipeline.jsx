import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

export default function BDPipeline() {
  const navigate = useNavigate();
  
  // HubSpot-style deal stages
  const dealStages = [
    { key: 'prospecting', label: 'Prospecting', color: 'bg-gray-500', deals: 8 },
    { key: 'qualification', label: 'Qualification', color: 'bg-blue-500', deals: 5 },
    { key: 'proposal', label: 'Proposal', color: 'bg-yellow-500', deals: 3 },
    { key: 'negotiation', label: 'Negotiation', color: 'bg-orange-500', deals: 2 },
    { key: 'closed-won', label: 'Closed Won', color: 'bg-green-500', deals: 12 },
    { key: 'closed-lost', label: 'Closed Lost', color: 'bg-red-500', deals: 4 }
  ];

  // Sample deals data
  const dealsData = {
    'prospecting': [
      { id: 1, name: 'TechCorp Inc', value: 25000, contact: 'John Smith', source: 'LinkedIn', days: 5 },
      { id: 2, name: 'StartupXYZ', value: 15000, contact: 'Sarah Johnson', source: 'Referral', days: 12 },
      { id: 3, name: 'Enterprise Co', value: 50000, contact: 'Mike Davis', source: 'Website', days: 8 }
    ],
    'qualification': [
      { id: 4, name: 'Global Systems', value: 75000, contact: 'Lisa Chen', source: 'Event', days: 3 },
      { id: 5, name: 'Innovation Labs', value: 30000, contact: 'David Wilson', source: 'Cold Email', days: 7 }
    ],
    'proposal': [
      { id: 6, name: 'MegaCorp', value: 100000, contact: 'Jennifer Brown', source: 'Partner', days: 2 },
      { id: 7, name: 'ScaleUp Inc', value: 40000, contact: 'Robert Taylor', source: 'Referral', days: 4 }
    ],
    'negotiation': [
      { id: 8, name: 'Enterprise Solutions', value: 150000, contact: 'Amanda Garcia', source: 'Website', days: 1 },
      { id: 9, name: 'Growth Partners', value: 60000, contact: 'Chris Martinez', source: 'LinkedIn', days: 3 }
    ],
    'closed-won': [
      { id: 10, name: 'Success Corp', value: 80000, contact: 'Maria Rodriguez', source: 'Referral', days: 0 },
      { id: 11, name: 'Future Tech', value: 120000, contact: 'James Lee', source: 'Event', days: 0 }
    ],
    'closed-lost': [
      { id: 12, name: 'Old Systems', value: 35000, contact: 'Tom Anderson', source: 'Cold Call', days: 0 },
      { id: 13, name: 'Budget Corp', value: 20000, contact: 'Susan White', source: 'Website', days: 0 }
    ]
  };

  const [selectedStage, setSelectedStage] = useState(null);
  const [showAddDeal, setShowAddDeal] = useState(false);

  const getTotalValue = (stage) => {
    return dealsData[stage]?.reduce((sum, deal) => sum + deal.value, 0) || 0;
  };

  const getTotalPipelineValue = () => {
    return dealStages.slice(0, 4).reduce((sum, stage) => sum + getTotalValue(stage.key), 0);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">BD Pipeline</h1>
            <p className="text-gray-600">
              Track your business development deals through the sales funnel
            </p>
          </div>

          {/* Pipeline Overview */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Pipeline Overview</h2>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(getTotalPipelineValue())}
                </div>
                <div className="text-sm text-gray-500">Total Pipeline Value</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              {dealStages.map((stage) => (
                <div
                  key={stage.key}
                  className={`${stage.color} rounded-xl p-4 text-white cursor-pointer hover:opacity-90 transition-opacity`}
                  onClick={() => setSelectedStage(stage)}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">{stage.deals}</div>
                    <div className="text-sm font-semibold mb-1">{stage.label}</div>
                    <div className="text-xs opacity-90">
                      {formatCurrency(getTotalValue(stage.key))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Stage Details */}
          {selectedStage && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full ${selectedStage.color}`}></div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedStage.label}</h3>
                    <p className="text-gray-600">
                      {selectedStage.deals} deals • {formatCurrency(getTotalValue(selectedStage.key))} total value
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowAddDeal(true)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Add Deal
                  </button>
                  <button
                    onClick={() => setSelectedStage(null)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {dealsData[selectedStage.key]?.map((deal) => (
                  <div key={deal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h4 className="font-semibold text-gray-900">{deal.name}</h4>
                          <span className="text-sm text-gray-600">{deal.contact}</span>
                          <span className="text-sm text-gray-500">• {deal.source}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Value: {formatCurrency(deal.value)}</span>
                          <span>Days in stage: {deal.days}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          {formatCurrency(deal.value)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {deal.days} days
                        </div>
                      </div>
                    </div>
                  </div>
                )) || (
                  <div className="text-center py-8 text-gray-500">
                    No deals in this stage
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Add Deal Form */}
          {showAddDeal && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Add New Deal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    placeholder="e.g., TechCorp Inc"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Deal Value</label>
                  <input
                    type="number"
                    placeholder="e.g., 25000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Person</label>
                  <input
                    type="text"
                    placeholder="e.g., John Smith"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Lead Source</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                    <option value="">Select Source</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="referral">Referral</option>
                    <option value="website">Website</option>
                    <option value="event">Event</option>
                    <option value="cold-email">Cold Email</option>
                    <option value="partner">Partner</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Deal Stage</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                    <option value="prospecting">Prospecting</option>
                    <option value="qualification">Qualification</option>
                    <option value="proposal">Proposal</option>
                    <option value="negotiation">Negotiation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Close Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
                <textarea
                  placeholder="Additional notes about this deal..."
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                ></textarea>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowAddDeal(false)}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddDeal(false)}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Add Deal
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
