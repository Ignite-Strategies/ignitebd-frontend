import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

export default function BDPipeline() {
  const navigate = useNavigate();
  
  // Pipeline stages
  const dealStages = [
    { key: 'prospecting', label: 'Prospecting', color: 'bg-gray-100' },
    { key: 'qualification', label: 'Qualification', color: 'bg-blue-100' },
    { key: 'proposal', label: 'Proposal', color: 'bg-yellow-100' },
    { key: 'negotiation', label: 'Negotiation', color: 'bg-orange-100' },
    { key: 'closed-won', label: 'Closed Won', color: 'bg-green-100' },
    { key: 'closed-lost', label: 'Closed Lost', color: 'bg-red-100' }
  ];

  // Sample deals data
  const [dealsData] = useState({
    'prospecting': [
      { id: 1, company: 'TechCorp Inc', contact: 'John Smith', title: 'CEO', value: 25000, source: 'LinkedIn', stage: 'prospecting' },
      { id: 2, company: 'StartupXYZ', contact: 'Sarah Johnson', title: 'Founder', value: 15000, source: 'Referral', stage: 'prospecting' },
      { id: 3, company: 'LawFirm Partners', contact: 'Mike Davis', title: 'Managing Partner', value: 50000, source: 'Event', stage: 'prospecting' }
    ],
    'qualification': [
      { id: 4, company: 'Global Solutions', contact: 'Lisa Chen', title: 'VP Operations', value: 35000, source: 'Cold Email', stage: 'qualification' },
      { id: 5, company: 'Innovation Labs', contact: 'David Wilson', title: 'CTO', value: 20000, source: 'Website', stage: 'qualification' }
    ],
    'proposal': [
      { id: 6, company: 'Enterprise Corp', contact: 'Jennifer Brown', title: 'Director', value: 75000, source: 'Partnership', stage: 'proposal' }
    ],
    'negotiation': [
      { id: 7, company: 'MegaCorp Ltd', contact: 'Robert Taylor', title: 'CEO', value: 100000, source: 'Referral', stage: 'negotiation' }
    ],
    'closed-won': [
      { id: 8, company: 'Success Inc', contact: 'Amanda White', title: 'Founder', value: 30000, source: 'LinkedIn', stage: 'closed-won' }
    ],
    'closed-lost': [
      { id: 9, company: 'Failed Startup', contact: 'Tom Black', title: 'CEO', value: 15000, source: 'Cold Email', stage: 'closed-lost' }
    ]
  });

  const [selectedStage, setSelectedStage] = useState(null);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStageTotal = (stage) => {
    return dealsData[stage]?.reduce((sum, deal) => sum + deal.value, 0) || 0;
  };

  const getStageCount = (stage) => {
    return dealsData[stage]?.length || 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">BD Pipeline</h1>
            <p className="text-gray-600">Click on a stage to view deals in that stage</p>
          </div>

          {/* Stage Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {dealStages.map((stage) => (
              <div
                key={stage.key}
                className={`${stage.color} rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow ${
                  selectedStage === stage.key ? 'ring-2 ring-red-500' : ''
                }`}
                onClick={() => setSelectedStage(selectedStage === stage.key ? null : stage.key)}
              >
                <h3 className="font-semibold text-gray-900 mb-1">{stage.label}</h3>
                <div className="text-sm text-gray-600">
                  {getStageCount(stage.key)} deals
                </div>
                <div className="text-sm font-medium text-gray-800">
                  {formatCurrency(getStageTotal(stage.key))}
                </div>
              </div>
            ))}
          </div>

          {/* Selected Stage Details */}
          {selectedStage && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {dealStages.find(s => s.key === selectedStage)?.label} Deals
                </h2>
                <div className="text-sm text-gray-600">
                  {getStageCount(selectedStage)} deals • {formatCurrency(getStageTotal(selectedStage))}
                </div>
              </div>

              {/* Deals List */}
              <div className="space-y-4">
                {dealsData[selectedStage]?.map((deal) => (
                  <div key={deal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{deal.company}</div>
                        <div className="text-sm text-gray-600">{deal.contact} • {deal.title}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          {formatCurrency(deal.value)} • {deal.source}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">
                          {formatCurrency(deal.value)}
                        </div>
                        <div className="text-xs text-gray-500 capitalize">
                          {deal.source}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {Object.values(dealsData).flat().length}
                </div>
                <div className="text-sm text-gray-600">Total Deals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(getStageTotal('closed-won'))}
                </div>
                <div className="text-sm text-gray-600">Closed Won</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(Object.keys(dealsData).reduce((sum, stage) => sum + getStageTotal(stage), 0))}
                </div>
                <div className="text-sm text-gray-600">Total Pipeline Value</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}