import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

// Header Summary Component
function HeaderSummary({ targetRevenue, currentRevenue, timeHorizon }) {
  const progressPercent = targetRevenue > 0 ? (currentRevenue / targetRevenue) * 100 : 0;
  const remaining = Math.max(0, targetRevenue - currentRevenue);
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Growth Dashboard</h1>
          <p className="text-gray-600">Your command center for business development</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {progressPercent.toFixed(1)}% to goal
          </div>
          <div className="text-sm text-gray-500">
            ${remaining.toLocaleString()} remaining
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Current: ${currentRevenue.toLocaleString()}</span>
          <span>Target: ${targetRevenue.toLocaleString()}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          ></div>
        </div>
      </div>
      
      <div className="text-sm text-gray-500">
        Target: ${targetRevenue.toLocaleString()} in {timeHorizon} months
      </div>
    </div>
  );
}

// Stack Card Component
function StackCard({ name, metrics, insight, cta, icon, color, route }) {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
         onClick={() => navigate(route)}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
              <span className="text-white text-xl">{icon}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900">{name}</h3>
          </div>
          <div className="text-red-500 text-sm font-semibold">
            {cta} →
          </div>
        </div>
        
        {/* Metrics */}
        <div className="mb-4">
          {metrics.map((metric, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <span className="text-gray-600 text-sm">{metric.label}</span>
              <span className="font-semibold text-gray-900">{metric.value}</span>
            </div>
          ))}
        </div>
        
        {/* Insight */}
        <div className="text-sm text-gray-600 italic">
          "{insight}"
        </div>
      </div>
    </div>
  );
}

// Main Growth Dashboard Component
export default function GrowthDashboard() {
  const navigate = useNavigate();
  
  // Static dashboard data - no API calls
  const dashboardData = {
    targetRevenue: 1000000,
    currentRevenue: 150000,
    timeHorizon: 12
  };

  // Static stack cards - no API calls
  const stackCards = [
    {
      name: "Ecosystem Build",
      metrics: [
        { label: "Partners", value: "12" },
        { label: "Influence Score", value: "8.5/10" }
      ],
      insight: "Strong partner network, ready to expand",
      cta: "Open",
      icon: "🌐",
      color: "bg-blue-500",
      route: "/ecosystem"
    },
    {
      name: "Persona Development",
      metrics: [
        { label: "Buyer Personas", value: "3" },
        { label: "Engagement Rate", value: "24%" }
      ],
      insight: "Well-defined personas driving engagement",
      cta: "Open",
      icon: "👥",
      color: "bg-green-500",
      route: "/persona"
    },
    {
      name: "Ad Spend & Targeting",
      metrics: [
        { label: "Monthly Spend", value: "$2,400" },
        { label: "ROI", value: "340%" }
      ],
      insight: "Strong ad performance, ready to scale",
      cta: "Open",
      icon: "📊",
      color: "bg-orange-500",
      route: "/ads"
    },
    {
      name: "SEO & Content",
      metrics: [
        { label: "Organic Traffic", value: "2.1K" },
        { label: "Content Score", value: "B+" }
      ],
      insight: "Good SEO foundation, content performing well",
      cta: "Open",
      icon: "🔍",
      color: "bg-teal-500",
      route: "/seo"
    },
    {
      name: "Content Hub",
      metrics: [
        { label: "Blog Posts", value: "12" },
        { label: "Social Posts", value: "45" }
      ],
      insight: "Active content creation, strong engagement",
      cta: "Open",
      icon: "📝",
      color: "bg-indigo-500",
      route: "/content"
    },
    {
      name: "Event Tracker",
      metrics: [
        { label: "Upcoming Events", value: "4" },
        { label: "Networking Score", value: "9/10" }
      ],
      insight: "Active event schedule, strong networking",
      cta: "Open",
      icon: "📅",
      color: "bg-red-500",
      route: "/events"
    },
    {
      name: "Email Campaigns",
      metrics: [
        { label: "Open Rate", value: "18.5%" },
        { label: "Active Campaigns", value: "3" }
      ],
      insight: "Strong email engagement, ready to scale",
      cta: "Open",
      icon: "📧",
      color: "bg-cyan-500",
      route: "/email-campaigns"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
        
        {/* Header Summary */}
        <HeaderSummary 
          targetRevenue={dashboardData.targetRevenue}
          currentRevenue={dashboardData.currentRevenue}
          timeHorizon={dashboardData.timeHorizon}
        />

        {/* Functional Stack Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {stackCards.map((card, index) => (
            <StackCard key={index} {...card} />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/assessment')}
              className="p-4 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors"
            >
              <div className="text-red-600 font-semibold">Start Assessment</div>
              <div className="text-sm text-gray-600">Complete your growth analysis</div>
            </button>
            <button
              onClick={() => navigate('/revenue')}
              className="p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors"
            >
              <div className="text-blue-600 font-semibold">Update Revenue Stack</div>
              <div className="text-sm text-gray-600">Refresh your revenue metrics</div>
            </button>
            <button
              onClick={() => navigate('/settings')}
              className="p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors"
            >
              <div className="text-green-600 font-semibold">Settings & Setup</div>
              <div className="text-sm text-gray-600">Configure your account</div>
            </button>
          </div>
        </div>

        {/* Contact Sales */}
        <div className="mt-12 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl shadow-lg p-8 border border-red-200">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Scale Your Growth?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Get personalized insights and strategic guidance to accelerate your business development. 
              Our team can help you implement these systems and achieve your growth targets.
            </p>
            <button
              onClick={() => window.open('mailto:adam@ignitestrategies.co?subject=Growth Platform Inquiry', '_blank')}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white text-lg font-bold rounded-xl shadow-xl hover:shadow-red-500/50 transition-all hover:scale-105"
            >
              Contact Sales Team →
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Growth Dashboard • Your command center for business development
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}