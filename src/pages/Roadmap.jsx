import Navigation from '../components/Navigation';

export default function Roadmap() {
  const roadmapPhases = [
    {
      phase: "Foundation (Months 1-3)",
      color: "bg-red-500",
      activities: [
        "Complete BD Assessment & Baseline Analysis",
        "Build Core Ecosystem Map (Tech Partners, Collaborators)",
        "Develop 3-5 Buyer Personas with Pain Points",
        "Set up Pipeline Management System",
        "Launch Initial Content Strategy (SEO-focused)"
      ]
    },
    {
      phase: "Growth (Months 4-6)",
      color: "bg-orange-500",
      activities: [
        "Execute Anchor Collaborator Strategy",
        "Launch Targeted Ad Campaigns (Google, LinkedIn)",
        "Scale Content Production (Blog, Case Studies)",
        "Host First Networking Events",
        "Implement Email Campaign Automation"
      ]
    },
    {
      phase: "Scale (Months 7-9)",
      color: "bg-yellow-500",
      activities: [
        "Expand Event Portfolio (Virtual + In-Person)",
        "Launch Partner Co-Marketing Campaigns",
        "Scale SEO & Content Marketing",
        "Implement Advanced Lead Scoring",
        "Launch Referral Program"
      ]
    },
    {
      phase: "Optimize (Months 10-12)",
      color: "bg-green-500",
      activities: [
        "Advanced Analytics & ROI Optimization",
        "International Market Expansion",
        "Strategic Partnership Development",
        "Thought Leadership Positioning",
        "Automated Growth Systems"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="p-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">BD Growth Roadmap</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your 12-month strategic roadmap for building a sustainable business development engine
          </p>
        </div>

        <div className="space-y-8">
          {roadmapPhases.map((phase, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-red-500">
              <div className="flex items-center mb-6">
                <div className={`w-4 h-4 rounded-full ${phase.color} mr-4`}></div>
                <h2 className="text-2xl font-bold text-gray-900">{phase.phase}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {phase.activities.map((activity, activityIndex) => (
                  <div key={activityIndex} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{activity}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border border-red-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">🎯 Success Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">3x</div>
              <div className="text-gray-700">Lead Generation</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">5x</div>
              <div className="text-gray-700">Pipeline Value</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">2x</div>
              <div className="text-gray-700">Revenue Growth</div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            *Future state: This roadmap will be auto-generated based on your assessment results and industry benchmarks
          </p>
        </div>
      </div>
    </div>
  );
}