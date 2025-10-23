import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  calculateGrowthCoefficient, 
  getPerformanceCategory, 
  generateGrowthScenarios,
  analyzeGrowthBottlenecks 
} from '../services/GrowthCoefficientService';

// Slider Component
function Slider({ label, value, onChange, min, max, step, unit, color = 'blue' }) {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500'
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <label className="text-lg font-semibold text-gray-900">{label}</label>
        <span className="text-2xl font-bold text-gray-900">
          {value}{unit}
        </span>
      </div>
      
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className={`w-full h-3 rounded-lg appearance-none cursor-pointer slider ${colorClasses[color]}`}
        style={{
          background: `linear-gradient(to right, ${colorClasses[color]} 0%, ${colorClasses[color]} ${((value - min) / (max - min)) * 100}%, #e5e7eb ${((value - min) / (max - min)) * 100}%, #e5e7eb 100%)`
        }}
      />
      
      <div className="flex justify-between text-sm text-gray-500 mt-2">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}

// Growth Coefficient Calculator
function GrowthCoefficientCalculator({ data }) {
  const {
    manpowerCosts,
    businessDevelopment,
    founderEngagement,
    customerGrowth
  } = data;

  // Use the service to calculate growth coefficient
  const coefficient = calculateGrowthCoefficient({
    businessDevelopment,
    manpowerCosts,
    founderEngagement,
    customerGrowth
  });

  const performance = getPerformanceCategory(coefficient.finalCoefficient);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Growth Coefficient Analysis</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-purple-600 mb-2">
            {coefficient.finalCoefficient}
          </div>
          <div className="text-sm text-gray-600">Growth Coefficient</div>
          <div className={`text-sm font-semibold ${getScoreColor(coefficient.finalCoefficient)}`}>
            {performance.label}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-4xl font-bold text-indigo-600 mb-2">
            {coefficient.totalScore}
          </div>
          <div className="text-sm text-gray-600">Base Score</div>
          <div className={`text-sm font-semibold ${getScoreColor(coefficient.totalScore)}`}>
            {getPerformanceCategory(coefficient.totalScore).label}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Business Development</span>
          <span className="font-semibold text-gray-900">{coefficient.bdScore}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Human Capital</span>
          <span className="font-semibold text-gray-900">{coefficient.manpowerScore}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Founder Engagement</span>
          <span className="font-semibold text-gray-900">{coefficient.founderScore}%</span>
        </div>
      </div>

      <div className="mt-6 p-4 bg-white rounded-lg border border-purple-200">
        <h4 className="font-semibold text-gray-900 mb-2">Growth Outlook</h4>
        <p className="text-sm text-gray-600">
          {performance.description}
        </p>
      </div>
    </div>
  );
}

// Cost-Benefit Analysis
function CostBenefitAnalysis({ data }) {
  const {
    manpowerCosts,
    businessDevelopment,
    founderEngagement,
    customerGrowth
  } = data;

  // Calculate cost scenarios
  const scenarios = [
    {
      name: "High Investment",
      description: "Maximum BD + Team + Founder engagement",
      bd: 100,
      manpower: 100,
      founder: 100,
      expectedGrowth: 95,
      cost: "High",
      color: "green"
    },
    {
      name: "Balanced Approach", 
      description: "Moderate investment across all areas",
      bd: 70,
      manpower: 70,
      founder: 70,
      expectedGrowth: 75,
      cost: "Medium",
      color: "blue"
    },
    {
      name: "Lean Growth",
      description: "Minimal investment, founder-heavy",
      bd: 30,
      manpower: 20,
      founder: 90,
      expectedGrowth: 45,
      cost: "Low",
      color: "orange"
    },
    {
      name: "Current Strategy",
      description: "Your current settings",
      bd: businessDevelopment,
      manpower: manpowerCosts,
      founder: founderEngagement,
      expectedGrowth: (businessDevelopment + manpowerCosts + founderEngagement) / 3,
      cost: "Variable",
      color: "purple"
    }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Growth Scenarios</h3>
      
      <div className="space-y-4">
        {scenarios.map((scenario, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-gray-900">{scenario.name}</h4>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                scenario.color === 'green' ? 'bg-green-100 text-green-800' :
                scenario.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                scenario.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {scenario.cost} Cost
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">{scenario.description}</p>
            
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">BD:</span>
                <span className="ml-1 font-semibold">{scenario.bd}%</span>
              </div>
              <div>
                <span className="text-gray-500">Team:</span>
                <span className="ml-1 font-semibold">{scenario.manpower}%</span>
              </div>
              <div>
                <span className="text-gray-500">Founder:</span>
                <span className="ml-1 font-semibold">{scenario.founder}%</span>
              </div>
              <div>
                <span className="text-gray-500">Growth:</span>
                <span className="ml-1 font-semibold text-green-600">{scenario.expectedGrowth.toFixed(0)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Growth Cost Outlook Component
export default function GrowthCostOutlook() {
  const navigate = useNavigate();
  const [sliderData, setSliderData] = useState({
    manpowerCosts: 50,
    businessDevelopment: 50,
    founderEngagement: 50,
    customerGrowth: 50
  });

  // Load assessment data from navigation state
  useEffect(() => {
    const assessmentData = localStorage.getItem('assessmentData');
    if (assessmentData) {
      const data = JSON.parse(assessmentData);
      // You can use this data to pre-populate sliders or make calculations
      console.log('Assessment data:', data);
    }
  }, []);

  const handleSliderChange = (key, value) => {
    setSliderData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // Save the growth outlook data
    const outlookData = {
      ...sliderData,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('growthOutlookData', JSON.stringify(outlookData));
    
    // Navigate to results or dashboard
    navigate('/growth-dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/assessment')}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              ← Back to Assessment
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Growth Cost Outlook</h1>
              <p className="text-gray-600">Analyze your growth investment strategy with algorithmic calculations</p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
              <div className="text-6xl mb-4">📊</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Growth Investment Analysis</h2>
              <p className="text-gray-600 mb-8">
                Adjust the sliders to see how different investment levels affect your growth potential.
                The algorithm calculates the optimal balance between manpower, business development, and founder engagement.
              </p>
            </div>

            {/* Sliders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Slider
                label="Increase Manpower Costs"
                value={sliderData.manpowerCosts}
                onChange={(value) => handleSliderChange('manpowerCosts', value)}
                min={0}
                max={100}
                step={5}
                unit="%"
                color="blue"
              />
              
              <Slider
                label="Business Development Investment"
                value={sliderData.businessDevelopment}
                onChange={(value) => handleSliderChange('businessDevelopment', value)}
                min={0}
                max={100}
                step={5}
                unit="%"
                color="green"
              />
              
              <Slider
                label="Founder Engagement Level"
                value={sliderData.founderEngagement}
                onChange={(value) => handleSliderChange('founderEngagement', value)}
                min={0}
                max={100}
                step={5}
                unit="%"
                color="orange"
              />
              
              <Slider
                label="Expected Customer Growth"
                value={sliderData.customerGrowth}
                onChange={(value) => handleSliderChange('customerGrowth', value)}
                min={0}
                max={100}
                step={5}
                unit="%"
                color="purple"
              />
            </div>

            {/* BD Spend Impact Calculator */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">BD Spend Impact Analysis</h3>
              <p className="text-gray-600 mb-6">
                Your BD investment of {sliderData.businessDevelopment}% translates to real growth outcomes:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round(sliderData.businessDevelopment * 0.8)}%
                  </div>
                  <div className="text-sm text-gray-600">Lead Generation Impact</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round(sliderData.businessDevelopment * 0.6)}%
                  </div>
                  <div className="text-sm text-gray-600">Customer Acquisition</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round(sliderData.businessDevelopment * 0.4)}%
                  </div>
                  <div className="text-sm text-gray-600">Revenue Growth</div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">What this means:</h4>
                <p className="text-sm text-gray-600">
                  {sliderData.businessDevelopment >= 70 
                    ? "Strong BD investment - you're likely to see significant growth from marketing and sales activities."
                    : sliderData.businessDevelopment >= 40
                    ? "Moderate BD investment - consider increasing spend or optimizing current channels for better results."
                    : "Low BD investment - this may be limiting your growth potential. Consider increasing business development activities."
                  }
                </p>
              </div>
            </div>

            {/* Growth Coefficient Calculator */}
            <GrowthCoefficientCalculator data={sliderData} />

            {/* Cost-Benefit Analysis */}
            <CostBenefitAnalysis data={sliderData} />

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate('/assessment')}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Back to Assessment
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Save Growth Outlook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
