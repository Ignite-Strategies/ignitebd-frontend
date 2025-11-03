import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { User, Building2, Inbox } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

// Pipeline stages for legal services
const stages = [
  { id: 'interested', name: 'Interested', color: 'bg-blue-100', borderColor: 'border-blue-300', textColor: 'text-blue-700' },
  { id: 'had-meeting', name: 'Had Meeting', color: 'bg-purple-100', borderColor: 'border-purple-300', textColor: 'text-purple-700' },
  { id: 'contract-negotiations', name: 'Contract Negotiations', color: 'bg-orange-100', borderColor: 'border-orange-300', textColor: 'text-orange-700' },
  { id: 'contract-signed', name: 'Contract Signed', color: 'bg-green-100', borderColor: 'border-green-300', textColor: 'text-green-700' }
];

// Contact types
const contactTypes = [
  { key: 'all', label: 'All', color: 'bg-gray-100 text-gray-700' },
  { key: 'prospects', label: 'Prospects', color: 'bg-blue-100 text-blue-700' },
  { key: 'collaborators', label: 'Collaborators', color: 'bg-green-100 text-green-700' },
  { key: 'tech-partners', label: 'Tech Partners', color: 'bg-purple-100 text-purple-700' }
];

// Demo contacts to hydrate the pipeline
const demoContacts = [
  { id: '1', name: 'David Chen', company: 'Ares Capital', title: 'Capital Partner', stage: 'Interested', type: 'prospects', value: 45000, source: 'LinkedIn' },
  { id: '2', name: 'Sarah Martinez', company: 'Orion Holdings', title: 'Portfolio Manager', stage: 'Interested', type: 'prospects', value: 32000, source: 'Event' },
  { id: '3', name: 'Michael Thompson', company: 'Meridian Partners', title: 'Investment Director', stage: 'Had Meeting', type: 'prospects', value: 65000, source: 'Referral' },
  { id: '4', name: 'Jennifer Wilson', company: 'Global Capital Group', title: 'Capital Partner', stage: 'Had Meeting', type: 'prospects', value: 55000, source: 'LinkedIn' },
  { id: '5', name: 'Robert Lee', company: 'Acme Ventures', title: 'Portfolio Manager', stage: 'Contract Negotiations', type: 'prospects', value: 75000, source: 'Event' },
  { id: '6', name: 'Amanda Brown', company: 'Strategic Investments LLC', title: 'Investment Director', stage: 'Contract Negotiations', type: 'prospects', value: 85000, source: 'Referral' },
  { id: '7', name: 'James Davis', company: 'Premier Capital', title: 'Capital Partner', stage: 'Contract Signed', type: 'prospects', value: 95000, source: 'LinkedIn' },
  { id: '8', name: 'Lisa Anderson', company: 'Summit Holdings', title: 'Portfolio Manager', stage: 'Contract Signed', type: 'prospects', value: 68000, source: 'Event' },
  { id: '9', name: 'Tech Solutions Inc', company: 'Tech Solutions Inc', title: 'CTO', stage: 'Interested', type: 'tech-partners', value: 0, source: 'Partnership' },
  { id: '10', name: 'Data Analytics Co', company: 'Data Analytics Co', title: 'CEO', stage: 'Had Meeting', type: 'tech-partners', value: 0, source: 'Partnership' },
  { id: '11', name: 'Legal Services Corp', company: 'Legal Services Corp', title: 'Founder', stage: 'Interested', type: 'collaborators', value: 0, source: 'Referral' },
];

export default function Pipeline() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [selectedStage, setSelectedStage] = useState(null);
  const [contactType, setContactType] = useState('all');

  // Hydrate with demo data if contacts are empty
  useEffect(() => {
    if (contacts.length === 0) {
      setContacts(demoContacts);
    }
  }, []);

  // Group contacts by stage with normalized stage names
  const contactsByStage = useMemo(() => {
    const grouped = {};
    stages.forEach(stage => {
      grouped[stage.id] = contacts.filter(c => {
        const contactStage = (c.stage || 'Interested').toLowerCase()
          .replace(/\s+/g, '-')
          .replace('prospect', 'interested')
          .replace('prospecting', 'interested')
          .replace('warm', 'interested')
          .replace('meeting', 'had-meeting')
          .replace('had-meeting', 'had-meeting')
          .replace('negotiation', 'contract-negotiations')
          .replace('negotiations', 'contract-negotiations')
          .replace('proposal', 'contract-negotiations')
          .replace('client', 'contract-signed')
          .replace('closed-won', 'contract-signed')
          .replace('signed', 'contract-signed');
        return contactStage === stage.id;
      });
    });
    return grouped;
  }, [contacts]);

  const getStageCount = (stageId) => {
    const deals = contactsByStage[stageId] || [];
    if (contactType === 'all') return deals.length;
    return deals.filter(deal => (deal.type || 'prospects') === contactType).length;
  };

  const getFilteredContacts = (stageId) => {
    const deals = contactsByStage[stageId] || [];
    if (contactType === 'all') return deals;
    return deals.filter(deal => (deal.type || 'prospects') === contactType);
  };

  const formatCurrency = (amount) => {
    if (!amount || amount === 0) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStageTotal = (stageId) => {
    const deals = contactsByStage[stageId] || [];
    return deals.reduce((sum, deal) => sum + (deal.value || deal.dealValue || 0), 0);
  };

  const getContactTypeColor = (type) => {
    const contactTypeMap = {
      'prospects': 'bg-blue-100 text-blue-700',
      'collaborators': 'bg-green-100 text-green-700',
      'tech-partners': 'bg-purple-100 text-purple-700',
    };
    return contactTypeMap[type] || 'bg-gray-100 text-gray-700';
  };

  const getContactTypeLabel = (type) => {
    if (type === 'tech-partners') return 'Tech Partner';
    if (type === 'prospects') return 'Prospect';
    return type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Prospect';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Pipeline"
        subtitle="Manage deals and contacts across pipeline stages"
        backTo="/contacts"
        backLabel="← Back to Contacts"
      />

      {/* Contact Type Filter */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Filter by contact type:</span>
          <div className="flex gap-2">
            {contactTypes.map((type) => (
              <button
                key={type.key}
                onClick={() => setContactType(type.key)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  contactType === type.key 
                    ? `${type.color} ring-2 ring-current` 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stage Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stages.map((stage) => (
          <div
            key={stage.id}
            className={`${stage.color} rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow ${
              selectedStage === stage.id ? 'ring-2 ring-indigo-500' : ''
            }`}
            onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
          >
            <h3 className="font-semibold text-gray-900 mb-1 text-base">{stage.name}</h3>
            <div className="text-sm text-gray-600">
              {getStageCount(stage.id)} {getStageCount(stage.id) === 1 ? 'deal' : 'deals'}
            </div>
            <div className="text-sm font-medium text-gray-800 mt-1">
              {formatCurrency(getStageTotal(stage.id))}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Stage Details */}
      {selectedStage && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {stages.find(s => s.id === selectedStage)?.name} Deals
            </h2>
            <div className="text-sm text-gray-600">
              {getStageCount(selectedStage)} deals • {formatCurrency(getStageTotal(selectedStage))}
            </div>
          </div>

          {/* Contacts List */}
          {getFilteredContacts(selectedStage).length === 0 ? (
            <div className="text-center py-12">
              <Inbox className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">No contacts in this stage</p>
              <button
                onClick={() => navigate('/contacts')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Add Contacts
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {getFilteredContacts(selectedStage).map((contact) => {
                const contactTypeValue = contact.type || 'prospects';
                const stageInfo = stages.find(s => s.id === selectedStage) || stages[0];
                
                return (
                  <div
                    key={contact.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="font-semibold text-gray-900 text-base">{contact.name || contact.contact || 'Unknown'}</div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getContactTypeColor(contactTypeValue)}`}>
                            {getContactTypeLabel(contactTypeValue)}
                          </span>
                          <span className={`inline-flex px-2 py-1 text-xs rounded-full font-medium ${stageInfo.color} ${stageInfo.textColor}`}>
                            {stageInfo.name}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {contact.company || 'No company'} {contact.title && `• ${contact.title}`}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {formatCurrency(contact.value || contact.dealValue || 0)} {contact.source && `• ${contact.source}`}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-lg font-semibold text-gray-900">
                            {formatCurrency(contact.value || contact.dealValue || 0)}
                          </div>
                          {contact.source && (
                            <div className="text-xs text-gray-500 capitalize">
                              {contact.source}
                            </div>
                          )}
                        </div>
                        <select
                          value={selectedStage}
                          onChange={(e) => {
                            const updated = contacts.map(c => 
                              c.id === contact.id 
                                ? { 
                                    ...c, 
                                    stage: e.target.value.split('-').map(word => 
                                      word.charAt(0).toUpperCase() + word.slice(1)
                                    ).join(' ')
                                  }
                                : c
                            );
                            setContacts(updated);
                            setSelectedStage(e.target.value);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium border-2 ${stageInfo.borderColor} ${stageInfo.color} ${stageInfo.textColor} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        >
                          {stages.map(stage => (
                            <option key={stage.id} value={stage.id}>
                              {stage.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Quick Stats */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {contacts.length}
            </div>
            <div className="text-sm text-gray-600">Total Contacts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(getStageTotal('contract-signed'))}
            </div>
            <div className="text-sm text-gray-600">Contract Signed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(stages.reduce((sum, stage) => sum + getStageTotal(stage.id), 0))}
            </div>
            <div className="text-sm text-gray-600">Total Pipeline Value</div>
          </div>
        </div>
      </div>
    </div>
  );
}

