import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

export default function Roadmap() {
  const navigate = useNavigate();

  const roadmapItems = [
    {
      status: 'live',
      title: 'Growth Dashboard',
      description: 'Command center for all business development activities',
      features: ['Ecosystem Build', 'Persona Development', 'Pipeline Management', 'Ad Spend Tracking', 'SEO Tools', 'Email Campaigns', 'Event Tracker']
    },
    {
      status: 'live',
      title: 'Growth Assessment',
      description: 'Calculate your growth potential with unit economics',
      features: ['Unit economics calculator', 'Revenue target modeling', 'BD baseline assessment', 'Growth cost analysis']
    },
    {
      status: 'in-progress',
      title: 'BD Engine Formula',
      description: 'Algorithmic approach to business development',
      features: ['Anchor collaborators in tech', 'Organic customer funnel through content', 'Strategic event placement', 'Mix optimization based on goals']
    },
    {
      status: 'planned',
      title: 'Advanced Pipeline Management',
      description: 'Enhanced categorization and tracking',
      features: ['Prospects', 'Customers', 'Collaborators', 'Tech Partners', 'Dynamic categories based on ecosystem']
    },
    {
      status: 'planned',
      title: 'AI-Powered Recommendations',
      description: 'Smart suggestions for growth activities',
      features: ['BD channel recommendations', 'Content topic suggestions', 'Event targeting', 'Partnership opportunities']
    },
    {
      status: 'planned',
      title: 'Integration Hub',
      description: 'Connect all your business tools',
      features: ['CRM integrations', 'Marketing automation', 'Analytics platforms', 'Communication tools']
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'live':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'planned':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Roadmap</h1>
            <p className="text-xl text-gray-600">
              Our vision for building the best business development platform
            </p>
          </div>

          <div className="space-y-6">
            {roadmapItems.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadge(item.status)}`}>
                    {item.status === 'live' ? '✓ Live' : item.status === 'in-progress' ? '⏳ In Progress' : '📅 Planned'}
                  </span>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Features:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {item.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <span className="text-orange-500 mr-2">•</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              Have feedback or feature requests?
            </p>
            <button
              onClick={() => navigate('/settings')}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Back to Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

