import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
            {timeHorizon} month target
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
            className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          ></div>
        </div>
      </div>
      
      {/* Summary Text */}
      <div className="text-center">
        <p className="text-gray-700">
          You've closed <span className="font-semibold text-orange-600">${currentRevenue.toLocaleString()}</span> of <span className="font-semibold">${targetRevenue.toLocaleString()}</span>. 
          <span className="font-semibold text-red-600"> ${remaining.toLocaleString()}</span> left to hit your goal.
        </p>
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
          <div className="text-orange-500 text-sm font-semibold">
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
  const [dashboardData, setDashboardData] = useState({
    targetRevenue: 250000,
    currentRevenue: 150000,
    timeHorizon: 12
  });

  // Sample data for the 6 functional areas
  const stackCards = [
    {
      name: "Ecosystem Build",
      metrics: [
        { label: "Partners", value: "12" },
        { label: "Associations", value: "3" }
      ],
      insight: "Strong network foundation, ready for expansion",
      cta: "Open",
      icon: "🏢",
      color: "bg-blue-500",
      route: "/ecosystem"
    },
    {
      name: "Persona Development",
      metrics: [
        { label: "Personas", value: "4" },
        { label: "Research Status", value: "Complete" }
      ],
      insight: "Well-defined buyer profiles driving targeted outreach",
      cta: "Open",
      icon: "👥",
      color: "bg-green-500",
      route: "/persona"
    },
    {
      name: "Pipeline Management",
      metrics: [
        { label: "Active Leads", value: "47" },
        { label: "Conversion Rate", value: "23%" }
      ],
      insight: "Healthy pipeline with room for optimization",
      cta: "Open",
      icon: "📊",
      color: "bg-purple-500",
      route: "/pipeline"
    },
    {
      name: "Ad Spend & Targeting",
      metrics: [
        { label: "Monthly Spend", value: "$2,400" },
        { label: "ROI", value: "4.2x" }
      ],
      insight: "Strong ad performance, consider scaling budget",
      cta: "Open",
      icon: "📈",
      color: "bg-yellow-500",
      route: "/ads"
    },
    {
      name: "SEO & Content",
      metrics: [
        { label: "Organic Traffic", value: "1,240" },
        { label: "Content Pieces", value: "18" }
      ],
      insight: "Growing organic presence, content strategy working",
      cta: "Open",
      icon: "🔍",
      color: "bg-indigo-500",
      route: "/seo"
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
    },
    {
      name: "Event Tracker",
      metrics: [
        { label: "Upcoming Events", value: "5" },
        { label: "Contacts Made", value: "127" }
      ],
      insight: "Active event participation driving quality leads",
      cta: "Open",
      icon: "🎯",
      color: "bg-red-500",
      route: "/events"
    }
  ];

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('dashboardData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setDashboardData(data);
    }

    // Try to get target data from target acquisition
    const targetData = localStorage.getItem('targetAcquisitionData');
    if (targetData) {
      const parsedTarget = JSON.parse(targetData);
      if (parsedTarget.targetData?.targetRevenue) {
        setDashboardData(prev => ({
          ...prev,
          targetRevenue: parseFloat(parsedTarget.targetData.targetRevenue)
        }));
      }
    }

    // Try to get current revenue from revenue stack
    const revenueData = localStorage.getItem('revenueData');
    if (revenueData) {
      const parsedRevenue = JSON.parse(revenueData);
      if (parsedRevenue.calculations?.annualRevenue) {
        setDashboardData(prev => ({
          ...prev,
          currentRevenue: parsedRevenue.calculations.annualRevenue
        }));
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Summary */}
        <HeaderSummary 
          targetRevenue={dashboardData.targetRevenue}
          currentRevenue={dashboardData.currentRevenue}
          timeHorizon={dashboardData.timeHorizon}
        />

        {/* Functional Stack Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stackCards.map((card, index) => (
            <StackCard
              key={index}
              name={card.name}
              metrics={card.metrics}
              insight={card.insight}
              cta={card.cta}
              icon={card.icon}
              color={card.color}
              route={card.route}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/revenue')}
              className="p-4 bg-orange-50 border border-orange-200 rounded-xl hover:bg-orange-100 transition-colors"
            >
              <div className="text-orange-600 font-semibold">Update Revenue Stack</div>
              <div className="text-sm text-gray-600">Refresh your revenue metrics</div>
            </button>
            <button
              onClick={() => navigate('/human-capital')}
              className="p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors"
            >
              <div className="text-blue-600 font-semibold">Review Team Capacity</div>
              <div className="text-sm text-gray-600">Check if you can deliver</div>
            </button>
            <button
              onClick={() => navigate('/target-acquisition')}
              className="p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors"
            >
              <div className="text-green-600 font-semibold">Set New Targets</div>
              <div className="text-sm text-gray-600">Define your growth goals</div>
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
  );
}
