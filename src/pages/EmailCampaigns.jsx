import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Email Campaign Card Component
function CampaignCard({ campaign, onEdit, onDelete, onView }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'sent': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOpenRateColor = (rate) => {
    if (rate >= 25) return 'text-green-600';
    if (rate >= 15) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">{campaign.name}</h3>
          <p className="text-gray-600">{campaign.subject}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
              {campaign.status}
            </span>
            <span className="text-sm text-gray-500">
              {campaign.recipients} recipients
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onView(campaign.id)}
            className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            View
          </button>
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
          <p className="text-sm text-gray-600">Open Rate</p>
          <p className={`font-semibold ${getOpenRateColor(campaign.openRate)}`}>
            {campaign.openRate}%
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Click Rate</p>
          <p className="font-semibold text-gray-900">{campaign.clickRate}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Unsubscribes</p>
          <p className="font-semibold text-gray-900">{campaign.unsubscribes}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Revenue</p>
          <p className="font-semibold text-gray-900">${campaign.revenue}</p>
        </div>
      </div>
      
      <div className="text-sm text-gray-600">
        <p><strong>Template:</strong> {campaign.template}</p>
        <p><strong>Sent:</strong> {campaign.sentDate || 'Not sent'}</p>
      </div>
    </div>
  );
}

// Email Template Card Component
function TemplateCard({ template, onEdit, onDelete, onUse }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{template.name}</h3>
          <p className="text-gray-600">{template.category}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onUse(template.id)}
            className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            Use
          </button>
          <button
            onClick={() => onEdit(template.id)}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(template.id)}
            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="text-sm text-gray-600 mb-2">Preview:</div>
        <div className="text-sm text-gray-800 line-clamp-3">
          {template.preview}
        </div>
      </div>
      
      <div className="text-sm text-gray-600">
        <p><strong>Type:</strong> {template.type}</p>
        <p><strong>Created:</strong> {template.createdDate}</p>
      </div>
    </div>
  );
}

// Campaign Form Component
function CampaignForm({ campaign, templates, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    template: '',
    recipients: '',
    status: 'draft',
    scheduledDate: '',
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
              placeholder="e.g., Q4 Newsletter"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Subject Line</label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="e.g., Your Weekly Business Update"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Template</label>
            <select
              value={formData.template}
              onChange={(e) => setFormData({ ...formData, template: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Template</option>
              {templates.map(template => (
                <option key={template.id} value={template.name}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Recipients</label>
            <input
              type="number"
              value={formData.recipients}
              onChange={(e) => setFormData({ ...formData, recipients: parseInt(e.target.value) })}
              placeholder="e.g., 1500"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="sent">Sent</option>
              <option value="paused">Paused</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Scheduled Date</label>
            <input
              type="datetime-local"
              value={formData.scheduledDate}
              onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Additional notes about this campaign..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="3"
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
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {campaign ? 'Update Campaign' : 'Create Campaign'}
          </button>
        </div>
      </form>
    </div>
  );
}

// Template Form Component
function TemplateForm({ template, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    type: '',
    preview: '',
    content: ''
  });

  useEffect(() => {
    if (template) {
      setFormData(template);
    }
  }, [template]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        {template ? 'Edit Template' : 'Create New Template'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Template Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Welcome Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Category</option>
              <option value="Newsletter">Newsletter</option>
              <option value="Promotional">Promotional</option>
              <option value="Welcome">Welcome</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Announcement">Announcement</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Type</option>
              <option value="HTML">HTML</option>
              <option value="Plain Text">Plain Text</option>
              <option value="Rich Text">Rich Text</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Preview Text</label>
          <textarea
            value={formData.preview}
            onChange={(e) => setFormData({ ...formData, preview: e.target.value })}
            placeholder="Brief preview of the email content..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Content</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Enter your email content here..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="8"
            required
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
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {template ? 'Update Template' : 'Create Template'}
          </button>
        </div>
      </form>
    </div>
  );
}

// Performance Summary Component
function PerformanceSummary({ campaigns }) {
  const totalRecipients = campaigns.reduce((sum, campaign) => sum + campaign.recipients, 0);
  const avgOpenRate = campaigns.length > 0 ? campaigns.reduce((sum, campaign) => sum + campaign.openRate, 0) / campaigns.length : 0;
  const avgClickRate = campaigns.length > 0 ? campaigns.reduce((sum, campaign) => sum + campaign.clickRate, 0) / campaigns.length : 0;
  const totalRevenue = campaigns.reduce((sum, campaign) => sum + campaign.revenue, 0);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Email Performance Summary</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <p className="text-sm text-gray-600">Total Recipients</p>
          <p className="text-2xl font-bold text-gray-900">{totalRecipients.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Avg Open Rate</p>
          <p className="text-2xl font-bold text-gray-900">{avgOpenRate.toFixed(1)}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Avg Click Rate</p>
          <p className="text-2xl font-bold text-gray-900">{avgClickRate.toFixed(1)}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

// Main Email Campaigns Component
export default function EmailCampaigns() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [showTemplateForm, setShowTemplateForm] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [activeTab, setActiveTab] = useState('campaigns');

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('emailData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setCampaigns(data.campaigns || []);
      setTemplates(data.templates || []);
    }
  }, []);

  const handleSaveCampaign = (campaignData) => {
    if (editingCampaign) {
      setCampaigns(prev => prev.map(c => 
        c.id === editingCampaign.id ? { ...campaignData, id: editingCampaign.id } : c
      ));
    } else {
      setCampaigns(prev => [...prev, { 
        ...campaignData, 
        id: Date.now(),
        openRate: Math.floor(Math.random() * 30) + 10,
        clickRate: Math.floor(Math.random() * 10) + 2,
        unsubscribes: Math.floor(Math.random() * 5),
        revenue: Math.floor(Math.random() * 1000) + 100
      }]);
    }
    
    // Save to localStorage
    const dataToSave = {
      campaigns: editingCampaign ? campaigns.map(c => 
        c.id === editingCampaign.id ? { ...campaignData, id: editingCampaign.id } : c
      ) : [...campaigns, { 
        ...campaignData, 
        id: Date.now(),
        openRate: Math.floor(Math.random() * 30) + 10,
        clickRate: Math.floor(Math.random() * 10) + 2,
        unsubscribes: Math.floor(Math.random() * 5),
        revenue: Math.floor(Math.random() * 1000) + 100
      }],
      templates,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('emailData', JSON.stringify(dataToSave));
    
    setShowCampaignForm(false);
    setEditingCampaign(null);
  };

  const handleSaveTemplate = (templateData) => {
    if (editingTemplate) {
      setTemplates(prev => prev.map(t => 
        t.id === editingTemplate.id ? { ...templateData, id: editingTemplate.id } : t
      ));
    } else {
      setTemplates(prev => [...prev, { 
        ...templateData, 
        id: Date.now(),
        createdDate: new Date().toLocaleDateString()
      }]);
    }
    
    // Save to localStorage
    const dataToSave = {
      campaigns,
      templates: editingTemplate ? templates.map(t => 
        t.id === editingTemplate.id ? { ...templateData, id: editingTemplate.id } : t
      ) : [...templates, { 
        ...templateData, 
        id: Date.now(),
        createdDate: new Date().toLocaleDateString()
      }],
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('emailData', JSON.stringify(dataToSave));
    
    setShowTemplateForm(false);
    setEditingTemplate(null);
  };

  const handleDeleteCampaign = (campaignId) => {
    const updatedCampaigns = campaigns.filter(c => c.id !== campaignId);
    setCampaigns(updatedCampaigns);
    
    const dataToSave = {
      campaigns: updatedCampaigns,
      templates,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('emailData', JSON.stringify(dataToSave));
  };

  const handleDeleteTemplate = (templateId) => {
    const updatedTemplates = templates.filter(t => t.id !== templateId);
    setTemplates(updatedTemplates);
    
    const dataToSave = {
      campaigns,
      templates: updatedTemplates,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('emailData', JSON.stringify(dataToSave));
  };

  const handleUseTemplate = (templateId) => {
    const template = templates.find(t => t.id === templateId);
    setEditingCampaign({ template: template.name });
    setActiveTab('campaigns');
    setShowCampaignForm(true);
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
              <h1 className="text-3xl font-bold text-gray-900">Email Campaigns</h1>
              <p className="text-gray-600">Manage your email marketing campaigns and templates</p>
            </div>
          </div>

          {!showCampaignForm && !showTemplateForm ? (
            <div className="space-y-8">
              {/* Header */}
              <div className="text-center">
                <div className="text-6xl mb-4">📧</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Email Marketing</h2>
                <p className="text-gray-600 mb-8">
                  Create, manage, and track your email marketing campaigns and templates.
                </p>
              </div>

              {/* Performance Summary */}
              {campaigns.length > 0 && <PerformanceSummary campaigns={campaigns} />}

              {/* Tabs */}
              <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('campaigns')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'campaigns'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Campaigns ({campaigns.length})
                </button>
                <button
                  onClick={() => setActiveTab('templates')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'templates'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Templates ({templates.length})
                </button>
              </div>

              {/* Campaigns Tab */}
              {activeTab === 'campaigns' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900">Email Campaigns</h3>
                    <button
                      onClick={() => setShowCampaignForm(true)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Create Campaign
                    </button>
                  </div>

                  {campaigns.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {campaigns.map((campaign) => (
                        <CampaignCard
                          key={campaign.id}
                          campaign={campaign}
                          onEdit={(id) => {
                            setEditingCampaign(campaigns.find(c => c.id === id));
                            setShowCampaignForm(true);
                          }}
                          onDelete={handleDeleteCampaign}
                          onView={(id) => {
                            // Handle view campaign
                            console.log('View campaign:', id);
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-4xl mb-4">📧</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Campaigns Yet</h3>
                      <p className="text-gray-600 mb-6">
                        Start by creating your first email campaign to engage with your audience.
                      </p>
                      <button
                        onClick={() => setShowCampaignForm(true)}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Create Your First Campaign
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Templates Tab */}
              {activeTab === 'templates' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900">Email Templates</h3>
                    <button
                      onClick={() => setShowTemplateForm(true)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Create Template
                    </button>
                  </div>

                  {templates.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {templates.map((template) => (
                        <TemplateCard
                          key={template.id}
                          template={template}
                          onEdit={(id) => {
                            setEditingTemplate(templates.find(t => t.id === id));
                            setShowTemplateForm(true);
                          }}
                          onDelete={handleDeleteTemplate}
                          onUse={handleUseTemplate}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-4xl mb-4">📝</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Templates Yet</h3>
                      <p className="text-gray-600 mb-6">
                        Create reusable email templates to streamline your email marketing.
                      </p>
                      <button
                        onClick={() => setShowTemplateForm(true)}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Create Your First Template
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : showCampaignForm ? (
            <CampaignForm
              campaign={editingCampaign}
              templates={templates}
              onSave={handleSaveCampaign}
              onCancel={() => {
                setShowCampaignForm(false);
                setEditingCampaign(null);
              }}
            />
          ) : (
            <TemplateForm
              template={editingTemplate}
              onSave={handleSaveTemplate}
              onCancel={() => {
                setShowTemplateForm(false);
                setEditingTemplate(null);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
