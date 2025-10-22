import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

export default function BDPipeline() {
  const navigate = useNavigate();
  const containerId = localStorage.getItem('containerId');
  
  // Pipeline stages configuration
  const stages = [
    { key: 'aware', label: 'Aware', emoji: '👀', desc: 'Know about your business' },
    { key: 'interested', label: 'Interested', emoji: '🤔', desc: 'Showing interest' },
    { key: 'qualified', label: 'Qualified', emoji: '✅', desc: 'Fit criteria & budget' },
    { key: 'proposal', label: 'Proposal', emoji: '📋', desc: 'Proposal sent' },
    { key: 'negotiation', label: 'Negotiation', emoji: '🤝', desc: 'Working on terms' },
    { key: 'closed_won', label: 'Closed Won', emoji: '🎉', desc: 'Deal closed!' },
    { key: 'closed_lost', label: 'Closed Lost', emoji: '❌', desc: 'Deal lost' }
  ];

  const [pipelineData, setPipelineData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [prospects, setProspects] = useState([]);
  const [newEntry, setNewEntry] = useState({
    customerId: '',
    prospectId: '',
    stage: 'aware',
    status: 'active',
    value: '',
    probability: '',
    notes: '',
    assignedTo: ''
  });

  useEffect(() => {
    if (containerId) {
      loadPipelineData();
      loadCustomersAndProspects();
    }
  }, [containerId]);

  const loadPipelineData = async () => {
    try {
      setLoading(true);
      console.log('📊 Loading BD pipeline data...');
      
      const response = await api.get(`/bdPipeline/${containerId}`);
      setPipelineData(response.data.stages || {});
      
    } catch (error) {
      console.error('❌ Error loading pipeline data:', error);
      // Use hardcoded data as fallback
      const hardcodedData = {
        'aware': { label: 'Aware', emoji: '👀', entries: [
          { id: '1', customer: { name: 'John Doe', email: 'john@example.com' }, value: 5000, probability: 20, status: 'active' },
          { id: '2', prospect: { name: 'Jane Smith', email: 'jane@example.com' }, value: 3000, probability: 15, status: 'active' }
        ]},
        'interested': { label: 'Interested', emoji: '🤔', entries: [
          { id: '3', customer: { name: 'Bob Johnson', email: 'bob@example.com' }, value: 8000, probability: 40, status: 'active' }
        ]},
        'qualified': { label: 'Qualified', emoji: '✅', entries: [
          { id: '4', prospect: { name: 'Alice Brown', email: 'alice@example.com' }, value: 12000, probability: 60, status: 'active' }
        ]},
        'proposal': { label: 'Proposal', emoji: '📋', entries: []},
        'negotiation': { label: 'Negotiation', emoji: '🤝', entries: []},
        'closed_won': { label: 'Closed Won', emoji: '🎉', entries: []},
        'closed_lost': { label: 'Closed Lost', emoji: '❌', entries: []}
      };
      setPipelineData(hardcodedData);
    } finally {
      setLoading(false);
    }
  };

  const loadCustomersAndProspects = async () => {
    try {
      // Load customers and prospects for the dropdown
      const [customersRes, prospectsRes] = await Promise.all([
        api.get(`/customers?companyId=${containerId}`),
        api.get(`/prospects?companyId=${containerId}`)
      ]);
      
      setCustomers(customersRes.data || []);
      setProspects(prospectsRes.data || []);
    } catch (error) {
      console.error('❌ Error loading customers/prospects:', error);
      // Use hardcoded data as fallback
      setCustomers([
        { id: '1', name: 'John Doe', email: 'john@example.com' },
        { id: '2', name: 'Bob Johnson', email: 'bob@example.com' }
      ]);
      setProspects([
        { id: '1', name: 'Jane Smith', email: 'jane@example.com' },
        { id: '2', name: 'Alice Brown', email: 'alice@example.com' }
      ]);
    }
  };

  const handleStageChange = async (entryId, newStage) => {
    try {
      console.log(`Moving entry ${entryId} to stage ${newStage}`);
      
      // Update the local state immediately for better UX
      setPipelineData(prevData => {
        const newData = { ...prevData };
        
        // Find and remove the entry from current stage
        let entryToMove = null;
        Object.keys(newData).forEach(stageKey => {
          if (newData[stageKey].entries) {
            const entryIndex = newData[stageKey].entries.findIndex(entry => entry.id === entryId);
            if (entryIndex !== -1) {
              entryToMove = newData[stageKey].entries.splice(entryIndex, 1)[0];
            }
          }
        });
        
        // Add entry to new stage
        if (entryToMove && newData[newStage]) {
          if (!newData[newStage].entries) {
            newData[newStage].entries = [];
          }
          newData[newStage].entries.push(entryToMove);
        }
        
        return newData;
      });
      
      // Make API call to update backend
      await api.put(`/bdPipeline/move/${entryId}`, { newStage, newStatus: 'active' });
      
    } catch (error) {
      console.error('Error updating pipeline entry stage:', error);
    }
  };

  const handleAddEntry = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/bdPipeline', {
        companyId: containerId,
        ...newEntry,
        value: newEntry.value ? parseFloat(newEntry.value) : null,
        probability: newEntry.probability ? parseFloat(newEntry.probability) : null
      });
      
      console.log('✅ Pipeline entry created:', response.data);
      setShowAddEntry(false);
      setNewEntry({
        customerId: '',
        prospectId: '',
        stage: 'aware',
        status: 'active',
        value: '',
        probability: '',
        notes: '',
        assignedTo: ''
      });
      
      // Reload pipeline data
      loadPipelineData();
      
    } catch (error) {
      console.error('❌ Error creating pipeline entry:', error);
      alert('Failed to create pipeline entry. Please try again.');
    }
  };

  const getContactsForStage = (stageKey) => {
    return pipelineData[stageKey]?.entries || [];
  };

  const getLogicalNextStages = (currentStage) => {
    const currentIndex = stages.findIndex(stage => stage.key === currentStage);
    if (currentIndex === -1) return [];
    
    // Return all stages that come after the current stage
    return stages.slice(currentIndex + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading BD pipeline...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <button
                onClick={() => navigate('/bd/goals')}
                className="text-red-600 hover:text-red-800 mb-4 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to BD Hub
              </button>
              <h1 className="text-3xl font-bold text-gray-900">Business Development Pipeline</h1>
              <p className="text-gray-600 mt-2">Track and move your prospects and customers through the sales funnel</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddEntry(true)}
                className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-orange-700 transition-colors"
              >
                Add Entry
              </button>
            </div>
          </div>
        </div>

        {/* Pipeline Stages - HubSpot Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
          {stages.map((stage) => {
            const stageEntries = getContactsForStage(stage.key);
            const totalValue = stageEntries.reduce((sum, entry) => sum + (entry.value || 0), 0);
            
            return (
              <div key={stage.key} className="bg-white rounded-lg shadow-sm border">
                {/* Stage Header */}
                <div className="p-4 border-b bg-gradient-to-r from-red-50 to-orange-50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{stage.emoji}</span>
                    <h3 className="font-semibold text-gray-900">
                      {stage.label}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">
                    {stageEntries.length} entries
                  </p>
                  <p className="text-sm text-gray-600 font-medium">
                    ${totalValue.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400">
                    {stage.desc}
                  </p>
                </div>

                {/* Entries */}
                <div className="p-4 min-h-[300px] max-h-[500px] overflow-y-auto">
                  {stageEntries.length > 0 ? (
                    <div className="space-y-3">
                      {stageEntries.map((entry) => (
                        <div key={entry.id} className="bg-gray-50 p-3 rounded border hover:shadow-sm transition-shadow">
                          <div className="font-medium text-gray-900">
                            {entry.customer?.name || entry.prospect?.name || 'Unknown'}
                          </div>
                          <div className="text-sm text-gray-600">
                            {entry.customer?.email || entry.prospect?.email || 'No email'}
                          </div>
                          {entry.value && (
                            <div className="text-sm text-green-600 font-medium">
                              ${entry.value.toLocaleString()}
                            </div>
                          )}
                          {entry.probability && (
                            <div className="text-xs text-blue-600">
                              {entry.probability}% chance
                            </div>
                          )}
                          
                          {/* Forward Arrow - Move to Next Stage */}
                          {getLogicalNextStages(stage.key).length > 0 && (
                            <div className="mt-2">
                              <button
                                onClick={() => {
                                  const nextStage = getLogicalNextStages(stage.key)[0];
                                  handleStageChange(entry.id, nextStage.key);
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
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <div className="text-4xl mb-2">{stage.emoji}</div>
                      <p className="text-sm">No entries in this stage</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Entry Modal */}
        {showAddEntry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4">Add Pipeline Entry</h3>
              
              <form onSubmit={handleAddEntry} className="space-y-4">
                {/* Customer/Prospect Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Customer</label>
                    <select
                      value={newEntry.customerId}
                      onChange={(e) => setNewEntry({ ...newEntry, customerId: e.target.value, prospectId: '' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Select Customer</option>
                      {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>{customer.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Prospect</label>
                    <select
                      value={newEntry.prospectId}
                      onChange={(e) => setNewEntry({ ...newEntry, prospectId: e.target.value, customerId: '' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Select Prospect</option>
                      {prospects.map(prospect => (
                        <option key={prospect.id} value={prospect.id}>{prospect.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Stage */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stage</label>
                  <select
                    value={newEntry.stage}
                    onChange={(e) => setNewEntry({ ...newEntry, stage: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  >
                    {stages.map(stage => (
                      <option key={stage.key} value={stage.key}>{stage.label}</option>
                    ))}
                  </select>
                </div>

                {/* Value and Probability */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Deal Value ($)</label>
                    <input
                      type="number"
                      value={newEntry.value}
                      onChange={(e) => setNewEntry({ ...newEntry, value: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="5000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Probability (%)</label>
                    <input
                      type="number"
                      value={newEntry.probability}
                      onChange={(e) => setNewEntry({ ...newEntry, probability: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="50"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    value={newEntry.notes}
                    onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    rows="3"
                    placeholder="Additional notes about this deal..."
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddEntry(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-orange-700"
                  >
                    Add Entry
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
