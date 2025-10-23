import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

export default function BDPipeline() {
  const navigate = useNavigate();
  
  // Pipeline stages configuration - Updated for BD Engine Formula
  const stages = [
    { key: 'prospects', label: 'Prospects', emoji: '🎯', desc: 'Potential customers', count: 12 },
    { key: 'customers', label: 'Customers', emoji: '👥', desc: 'Active customers', count: 8 },
    { key: 'collaborators', label: 'Collaborators', emoji: '🤝', desc: 'Strategic partners', count: 5 },
    { key: 'tech_partners', label: 'Tech Partners', emoji: '⚙️', desc: 'Technology partners', count: 3 },
    { key: 'anchor_collaborators', label: 'Anchor Collaborators', emoji: '⚓', desc: 'Key strategic relationships', count: 2 },
    { key: 'content_leads', label: 'Content Leads', emoji: '📝', desc: 'Organic content leads', count: 15 },
    { key: 'search_leads', label: 'Search Leads', emoji: '🔍', desc: 'SEO-driven leads', count: 9 },
    { key: 'event_leads', label: 'Event Leads', emoji: '📅', desc: 'Event-generated leads', count: 6 }
  ];

  const [selectedStage, setSelectedStage] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">BD Pipeline</h1>
            <p className="text-gray-600">
              Track your business development relationships across all stages of engagement
            </p>
          </div>

          {/* Pipeline Overview */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pipeline Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {stages.map((stage) => (
                <div
                  key={stage.key}
                  className="text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => setSelectedStage(stage)}
                >
                  <div className="text-3xl mb-2">{stage.emoji}</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stage.count}</div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">{stage.label}</div>
                  <div className="text-xs text-gray-500">{stage.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Stage Details */}
          {selectedStage && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{selectedStage.emoji}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedStage.label}</h3>
                    <p className="text-gray-600">{selectedStage.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStage(null)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Sample entries for the selected stage */}
                {Array.from({ length: Math.min(selectedStage.count, 6) }, (_, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">
                        {selectedStage.key === 'prospects' && `Prospect ${i + 1}`}
                        {selectedStage.key === 'customers' && `Customer ${i + 1}`}
                        {selectedStage.key === 'collaborators' && `Partner ${i + 1}`}
                        {selectedStage.key === 'tech_partners' && `Tech Partner ${i + 1}`}
                        {selectedStage.key === 'anchor_collaborators' && `Anchor ${i + 1}`}
                        {selectedStage.key === 'content_leads' && `Content Lead ${i + 1}`}
                        {selectedStage.key === 'search_leads' && `Search Lead ${i + 1}`}
                        {selectedStage.key === 'event_leads' && `Event Lead ${i + 1}`}
                      </h4>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Active
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {selectedStage.key === 'prospects' && 'Potential customer showing interest'}
                      {selectedStage.key === 'customers' && 'Active paying customer'}
                      {selectedStage.key === 'collaborators' && 'Strategic business partner'}
                      {selectedStage.key === 'tech_partners' && 'Technology integration partner'}
                      {selectedStage.key === 'anchor_collaborators' && 'Key strategic relationship'}
                      {selectedStage.key === 'content_leads' && 'Lead from content marketing'}
                      {selectedStage.key === 'search_leads' && 'Lead from SEO/organic search'}
                      {selectedStage.key === 'event_leads' && 'Lead from networking event'}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Value: $5,000</span>
                      <span className="text-gray-500">90%</span>
                    </div>
                  </div>
                ))}
              </div>

              {selectedStage.count > 6 && (
                <div className="mt-4 text-center">
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    View All {selectedStage.count} {selectedStage.label}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors">
                <div className="text-red-600 font-semibold">Add New Lead</div>
                <div className="text-sm text-gray-600">Add a new prospect or lead</div>
              </button>
              <button className="p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors">
                <div className="text-blue-600 font-semibold">Import Contacts</div>
                <div className="text-sm text-gray-600">Bulk import from CSV</div>
              </button>
              <button className="p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors">
                <div className="text-green-600 font-semibold">Export Pipeline</div>
                <div className="text-sm text-gray-600">Download pipeline data</div>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}