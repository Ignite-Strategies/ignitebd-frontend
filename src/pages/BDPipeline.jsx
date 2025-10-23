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

  // Sample deals data with more realistic BD contacts
  const [dealsData, setDealsData] = useState({
    'prospecting': [
      { id: 1, name: 'TechCorp Inc', value: 25000, contact: 'John Smith', source: 'LinkedIn', days: 5, company: 'TechCorp Inc', title: 'CEO' },
      { id: 2, name: 'StartupXYZ', value: 15000, contact: 'Sarah Johnson', source: 'Referral', days: 12, company: 'StartupXYZ', title: 'Founder' },
      { id: 3, name: 'Enterprise Co', value: 50000, contact: 'Mike Davis', source: 'Website', days: 8, company: 'Enterprise Co', title: 'VP Sales' },
      { id: 4, name: 'Innovation Labs', value: 30000, contact: 'David Wilson', source: 'Cold Email', days: 7, company: 'Innovation Labs', title: 'CTO' }
    ],
    'qualification': [
      { id: 5, name: 'Global Systems', value: 75000, contact: 'Lisa Chen', source: 'Event', days: 3, company: 'Global Systems', title: 'Head of BD' },
      { id: 6, name: 'ScaleUp Inc', value: 40000, contact: 'Robert Taylor', source: 'Referral', days: 4, company: 'ScaleUp Inc', title: 'COO' }
    ],
    'proposal': [
      { id: 7, name: 'MegaCorp', value: 100000, contact: 'Jennifer Brown', source: 'Partner', days: 2, company: 'MegaCorp', title: 'Director' },
      { id: 8, name: 'Growth Partners', value: 60000, contact: 'Chris Martinez', source: 'LinkedIn', days: 3, company: 'Growth Partners', title: 'Managing Partner' }
    ],
    'negotiation': [
      { id: 9, name: 'Enterprise Solutions', value: 150000, contact: 'Amanda Garcia', source: 'Website', days: 1, company: 'Enterprise Solutions', title: 'VP Business Development' },
      { id: 10, name: 'Future Tech', value: 120000, contact: 'James Lee', source: 'Event', days: 0, company: 'Future Tech', title: 'CEO' }
    ],
    'closed-won': [
      { id: 11, name: 'Success Corp', value: 80000, contact: 'Maria Rodriguez', source: 'Referral', days: 0, company: 'Success Corp', title: 'Founder' },
      { id: 12, name: 'NextGen Systems', value: 95000, contact: 'Alex Thompson', source: 'Partner', days: 0, company: 'NextGen Systems', title: 'CTO' }
    ],
    'closed-lost': [
      { id: 13, name: 'Old Systems', value: 35000, contact: 'Tom Anderson', source: 'Cold Call', days: 0, company: 'Old Systems', title: 'CEO' },
      { id: 14, name: 'Budget Corp', value: 20000, contact: 'Susan White', source: 'Website', days: 0, company: 'Budget Corp', title: 'Founder' }
    ]
  });

  const [draggedDeal, setDraggedDeal] = useState(null);
  const [showAddDeal, setShowAddDeal] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getTotalValue = (stage) => {
    return dealsData[stage]?.reduce((sum, deal) => sum + deal.value, 0) || 0;
  };

  const getTotalPipelineValue = () => {
    return dealStages.slice(0, 4).reduce((sum, stage) => sum + getTotalValue(stage.key), 0);
  };

  const getLogicalNextStages = (currentStage) => {
    const stageOrder = ['prospecting', 'qualification', 'proposal', 'negotiation', 'closed-won', 'closed-lost'];
    const currentIndex = stageOrder.indexOf(currentStage);
    if (currentIndex === -1) return [];
    
    // Return all stages that come after the current stage
    return stageOrder.slice(currentIndex + 1);
  };

  const handleStageChange = (dealId, newStage) => {
    // Move deal to new stage
    const newDealsData = { ...dealsData };
    
    // Remove from old stage
    Object.keys(newDealsData).forEach(stage => {
      newDealsData[stage] = newDealsData[stage].filter(deal => deal.id !== dealId);
    });
    
    // Add to new stage
    newDealsData[newStage] = [...(newDealsData[newStage] || []), { 
      ...dealsData[Object.keys(dealsData).find(stage => dealsData[stage].some(deal => deal.id === dealId))]?.find(deal => deal.id === dealId),
      stage: newStage 
    }];
    
    setDealsData(newDealsData);
  };

  const DealCard = ({ deal, stage }) => (
    <div className="bg-gray-50 p-3 rounded border mb-3">
      <div className="font-medium text-gray-900 text-sm">
        {deal.company}
      </div>
      <div className="text-sm text-gray-600">
        {deal.contact}
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {deal.title}
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {formatCurrency(deal.value)} • {deal.source}
      </div>
      
      {/* Next Stage Button */}
      {getLogicalNextStages(stage).length > 0 && (
        <div className="mt-2">
          <button
            onClick={() => {
              const nextStage = getLogicalNextStages(stage)[0]; // Get first next stage
              handleStageChange(deal.id, nextStage);
            }}
            className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded font-medium hover:bg-red-200 transition-colors flex items-center gap-1"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Next Stage
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="p-8">
      <div className="max-w-7xl mx-auto">
          
        {/* Header */}
        <div className="mb-8">
            <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">BD Pipeline</h1>
                <p className="text-gray-600">Track your business development deals through the sales funnel</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(getTotalPipelineValue())}
                </div>
                <div className="text-sm text-gray-500">Total Pipeline Value</div>
              </div>
            </div>
          </div>

          {/* Pipeline Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
            {dealStages.map((stage) => (
              <div key={stage.key} className="bg-white rounded-xl shadow-lg p-4 text-center">
                <div className={`w-3 h-3 rounded-full ${stage.color} mx-auto mb-2`}></div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stage.deals}</div>
                <div className="text-sm font-semibold text-gray-700 mb-1">{stage.label}</div>
                <div className="text-xs text-gray-500">
                  {formatCurrency(getTotalValue(stage.key))}
                </div>
              </div>
            ))}
          </div>

          {/* Kanban Board */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Deal Pipeline</h2>
              <button
                onClick={() => setShowAddDeal(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                + Add Deal
              </button>
        </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
              {dealStages.map((stage) => (
                <div
                  key={stage.key}
                  className="bg-gray-50 rounded-lg p-4 min-h-[400px]"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, stage.key)}
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                      <h3 className="font-semibold text-gray-900">{stage.label}</h3>
                    </div>
                    <span className="text-sm text-gray-500">{stage.deals}</span>
                </div>

                  {/* Deal Cards */}
                    <div className="space-y-3">
                    {dealsData[stage.key]?.map((deal) => (
                      <DealCard key={deal.id} deal={deal} stage={stage.key} />
                    )) || (
                      <div className="text-center py-8 text-gray-400 text-sm">
                        No deals in this stage
                            </div>
                          )}
                        </div>
                </div>
              ))}
              </div>
        </div>

          {/* Add Deal Form */}
          {showAddDeal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Add New Deal</h3>
                  <button
                    onClick={() => setShowAddDeal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Title</label>
                    <input
                      type="text"
                      placeholder="e.g., CEO"
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
            </div>
          )}

          </div>
      </div>
    </div>
  );
}
