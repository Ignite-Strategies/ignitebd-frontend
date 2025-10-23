import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

export default function Roadmap() {
  const navigate = useNavigate();

  const roadmapPhases = [
    {
      title: 'Phase 1: Foundation (Months 1-3)',
      description: 'Establish core understanding and infrastructure for growth.',
      icon: '🌱',
      color: 'bg-red-500',
      activities: [
        'Complete Growth Assessment (Revenue, Human Capital, Target Acquisition, BD Baseline)',
        'Map Business Ecosystem (Identify collaborators, partners, platforms)',
        'Define Key Personas (Buyers, Tech Partners, Anchor Collaborators)',
        'Set up BD Pipeline (HubSpot-style deal stages)',
        'Initial Content Strategy (Identify core topics, SEO keywords)',
      ],
      deliverables: [
        'BD Assessment Report',
        'Ecosystem Map',
        'Persona Profiles',
        'Pipeline Setup',
        'Content Calendar'
      ]
    },
    {
      title: 'Phase 2: Growth Acceleration (Months 4-6)',
      description: 'Launch targeted initiatives to generate leads and build relationships.',
      icon: '🚀',
      color: 'bg-orange-500',
      activities: [
        'Engage Anchor Collaborators (Joint ventures, co-marketing)',
        'Launch Targeted Ad Campaigns (Google Ads, Meta Ads for BD services)',
        'Implement Email Automation (Nurture sequences, outreach campaigns)',
        'Develop Core Content Assets (Blog posts, case studies, whitepapers)',
        'Participate in Strategic Events (Networking, speaking engagements)',
      ],
      deliverables: [
        'Anchor Partner Agreements',
        'Ad Campaign Performance',
        'Email Sequences',
        'Content Library',
        'Event Attendance'
      ]
    },
    {
      title: 'Phase 3: Scale & Expand (Months 7-9)',
      description: 'Amplify successful strategies and explore new channels.',
      icon: '📈',
      color: 'bg-yellow-500',
      activities: [
        'Expand Event Presence (More conferences, webinars)',
        'Scale Content Production (Video, podcasts, advanced guides)',
        'Optimize SEO for Long-Tail Keywords (Capture niche demand)',
        'Explore Co-Marketing Opportunities with Tech Partners',
        'Implement Lead Scoring and Nurturing Workflows',
      ],
      deliverables: [
        'Event Portfolio',
        'Content Scaling',
        'SEO Rankings',
        'Co-Marketing Campaigns',
        'Lead Scoring System'
      ]
    },
    {
      title: 'Phase 4: Optimize & Innovate (Months 10-12)',
      description: 'Refine processes, leverage data, and plan for future growth.',
      icon: '💡',
      color: 'bg-green-500',
      activities: [
        'Comprehensive Analytics Review (Identify top-performing channels)',
        'Automate BD Outreach (Advanced CRM integrations)',
        'Explore International Market Opportunities',
        'Develop New Partnership Models',
        'Refine BD Engine Formula based on performance data',
      ],
      deliverables: [
        'Analytics Dashboard',
        'Automation Workflows',
        'International Strategy',
        'Partnership Models',
        'Optimized BD Formula'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">12-Month BD Strategic Roadmap</h1>
            <p className="text-xl text-gray-600">
              A phased approach to building a sustainable business development engine.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Future State: This roadmap will be auto-generated based on your assessment results.
            </p>
          </div>

          <div className="space-y-10">
            {roadmapPhases.map((phase, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full ${phase.color} flex items-center justify-center text-2xl text-white`}>
                      {phase.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{phase.title}</h3>
                      <p className="text-gray-600">{phase.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pl-16">
                  <h4 className="text-lg font-semibold text-gray-700 mb-3">Key Activities:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {phase.activities.map((activity, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2 text-red-500">•</span>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <h4 className="text-lg font-semibold text-gray-700 mb-3 mt-6">Deliverables:</h4>
                  <div className="flex flex-wrap gap-2">
                    {phase.deliverables.map((deliverable, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {deliverable}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Success Metrics</h2>
            <p className="text-lg text-gray-700 mb-6">
              By following this roadmap, you can expect to achieve:
            </p>
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-red-600">3x</p>
                <p className="text-gray-600">Qualified Leads</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-orange-600">5x</p>
                <p className="text-gray-600">Pipeline Value</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-green-600">2x</p>
                <p className="text-gray-600">Revenue Growth</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/assessment')}
              className="px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              Start Your BD Assessment →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}