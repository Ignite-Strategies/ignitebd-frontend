import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Campaign Card Component
function CampaignCard({ campaign, onEdit, onDelete }) {
  const getROIColor = (roi) => {
    if (roi >= 4) return 'text-green-600';
    if (roi >= 2) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{campaign.name}</h3>
          <p className="text-gray-600">{campaign.platform} • {campaign.status}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(campaign.id)}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(campaign.id)}
            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Monthly Spend</p>
          <p className="font-semibold text-gray-900">${campaign.monthlySpend.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">ROI</p>
          <p className={`font-semibold ${getROIColor(campaign.roi)}`}>{campaign.roi}x</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Clicks</p>
          <p className="font-semibold text-gray-900">{campaign.clicks.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Conversions</p>
          <p className="font-semibold text-gray-900">{campaign.conversions}</p>
        </div>
      </div>
      
      <div className="text-sm text-gray-600">
        <p><strong>Target:</strong> {campaign.targetAudience}</p>
        <p><strong>Goal:</strong> {campaign.goal}</p>
      </div>
    </div>
  );
}

// Campaign Form Component
function CampaignForm({ campaign, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    platform: '',
    status: 'active',
    monthlySpend: '',
    roi: '',
    clicks: '',
    conversions: '',
    targetAudience: '',
    goal: '',
    notes: ''
  });

  useEffect(() => {
    if (campaign) {
      setFormData(campaign);
    }
  }, [campaign]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        {campaign ? 'Edit Campaign' : 'Create New Campaign'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Campaign Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Q4 Lead Generation"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Platform</label>
            <select
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              required
            >
              <option value="">Select Platform</option>
              <option value="Google Ads">Google Ads</option>
              <option value="Facebook Ads">Facebook Ads</option>
              <option value="LinkedIn Ads">LinkedIn Ads</option>
              <option value="Twitter Ads">Twitter Ads</option>
              <option value="Instagram Ads">Instagram Ads</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              required
            >
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Spend ($)</label>
            <input
              type="number"
              value={formData.monthlySpend}
              onChange={(e) => setFormData({ ...formData, monthlySpend: parseFloat(e.target.value) })}
              placeholder="e.g., 2400"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">ROI (x)</label>
            <input
              type="number"
              step="0.1"
              value={formData.roi}
              onChange={(e) => setFormData({ ...formData, roi: parseFloat(e.target.value) })}
              placeholder="e.g., 4.2"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Clicks</label>
            <input
              type="number"
              value={formData.clicks}
              onChange={(e) => setFormData({ ...formData, clicks: parseInt(e.target.value) })}
              placeholder="e.g., 1200"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Conversions</label>
            <input
              type="number"
              value={formData.conversions}
              onChange={(e) => setFormData({ ...formData, conversions: parseInt(e.target.value) })}
              placeholder="e.g., 48"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Target Audience</label>
            <input
              type="text"
              value={formData.targetAudience}
              onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
              placeholder="e.g., B2B SaaS Founders"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Campaign Goal</label>
          <textarea
            value={formData.goal}
            onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
            placeholder="What is this campaign trying to achieve?"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            rows="2"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Additional notes about this campaign..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            rows="2"
          />
        </div>
        
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            {campaign ? 'Update Campaign' : 'Create Campaign'}
          </button>
        </div>
      </form>
    </div>
  );
}

// Performance Summary Component
function PerformanceSummary({ campaigns }) {
  const totalSpend = campaigns.reduce((sum, campaign) => sum + campaign.monthlySpend, 0);
  const totalClicks = campaigns.reduce((sum, campaign) => sum + campaign.clicks, 0);
  const totalConversions = campaigns.reduce((sum, campaign) => sum + campaign.conversions, 0);
  const avgROI = campaigns.length > 0 ? campaigns.reduce((sum, campaign) => sum + campaign.roi, 0) / campaigns.length : 0;
  const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks * 100).toFixed(2) : 0;

  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6 mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Summary</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <p className="text-sm text-gray-600">Total Monthly Spend</p>
          <p className="text-2xl font-bold text-gray-900">${totalSpend.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Average ROI</p>
          <p className="text-2xl font-bold text-gray-900">{avgROI.toFixed(1)}x</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Clicks</p>
          <p className="text-2xl font-bold text-gray-900">{totalClicks.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Conversion Rate</p>
          <p className="text-2xl font-bold text-gray-900">{conversionRate}%</p>
        </div>
      </div>
    </div>
  );
}

// Main Ads Component
export default function Ads() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('adsData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setCampaigns(data.campaigns || []);
    }
  }, []);

  const handleSave = (campaignData) => {
    if (editingCampaign) {
      // Update existing campaign
      setCampaigns(prev => prev.map(c => 
        c.id === editingCampaign.id ? { ...campaignData, id: editingCampaign.id } : c
      ));
    } else {
      // Create new campaign
      setCampaigns(prev => [...prev, { ...campaignData, id: Date.now() }]);
    }
    
    // Save to localStorage
    const dataToSave = {
      campaigns: editingCampaign ? campaigns.map(c => 
        c.id === editingCampaign.id ? { ...campaignData, id: editingCampaign.id } : c
      ) : [...campaigns, { ...campaignData, id: Date.now() }],
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('adsData', JSON.stringify(dataToSave));
    
    setShowForm(false);
    setEditingCampaign(null);
  };

  const handleEdit = (campaignId) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    setEditingCampaign(campaign);
    setShowForm(true);
  };

  const handleDelete = (campaignId) => {
    const updatedCampaigns = campaigns.filter(c => c.id !== campaignId);
    setCampaigns(updatedCampaigns);
    
    // Save to localStorage
    const dataToSave = {
      campaigns: updatedCampaigns,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('adsData', JSON.stringify(dataToSave));
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCampaign(null);
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
              <h1 className="text-3xl font-bold text-gray-900">Ad Spend & Targeting</h1>
              <p className="text-gray-600">Monitor your advertising performance and ROI</p>
            </div>
          </div>

          {!showForm ? (
            <div className="space-y-8">
              {/* Performance Summary */}
              {campaigns.length > 0 && <PerformanceSummary campaigns={campaigns} />}

              {/* Header */}
              <div className="text-center">
                <div className="text-6xl mb-4">📈</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Advertising Campaigns</h2>
                <p className="text-gray-600 mb-8">
                  Track your advertising campaigns, analyze performance, and optimize your ad spend.
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  Create New Campaign
                </button>
              </div>

              {/* Campaigns Grid */}
              {campaigns.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {campaigns.map((campaign) => (
                    <CampaignCard
                      key={campaign.id}
                      campaign={campaign}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Campaigns Yet</h3>
                  <p className="text-gray-600 mb-6">
                    Start by creating your first advertising campaign to track performance and ROI.
                  </p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  >
                    Create Your First Campaign
                  </button>
                </div>
              )}
            </div>
          ) : (
            <CampaignForm
              campaign={editingCampaign}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}
        </div>
      </div>
    </div>
  );
}
