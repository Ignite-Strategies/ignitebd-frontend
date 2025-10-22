import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

export default function BusinessPointLawProposal() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [assessment, setAssessment] = useState({
    costEfficiency: 0,
    teamAlignment: 0,
    bdVelocity: 0
  });
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState(null);

  const steps = [
    {
      id: 'cost',
      title: 'Cost Efficiency',
      icon: '💰',
      prompt: 'How much of your current spend directly drives measurable outcomes?',
      label: 'Operational Efficiency %',
      tooltip: 'Higher = stronger ROI per dollar',
      description: 'For BusinessPoint Law: Does your marketing budget generate qualified leads? Are your case management systems saving billable hours? Is every team member contributing to client acquisition or retention?'
    },
    {
      id: 'human',
      title: 'Human Capital',
      icon: '⚡',
      prompt: 'How aligned and self-driven is your team?',
      label: 'Team Alignment %',
      tooltip: 'Higher = more initiative, less micromanagement',
      description: 'Can your associates handle client matters independently? Do you have systems in place so you can focus on business development and high-value legal work?'
    },
    {
      id: 'bd',
      title: 'BD Momentum',
      icon: '🚀',
      prompt: 'How fast does attention convert into opportunity?',
      label: 'Business Development Velocity %',
      tooltip: 'Higher = stronger pipeline velocity',
      description: 'From initial consultation to signed retainer agreement - how quickly and effectively do you convert prospects into paying clients? What\'s your average sales cycle?'
    }
  ];

  const handleSliderChange = (dimension, value) => {
    setAssessment(prev => ({
      ...prev,
      [dimension]: value
    }));
  };

  const computeIgniteCoefficient = async () => {
    try {
      setCalculating(true);
      const response = await api.post('/assessment/coefficient', assessment);
      setResult(response.data);
    } catch (err) {
      console.error('Error computing coefficient:', err);
      // Fallback to local calculation
      const weights = { costEfficiency: 0.3, teamAlignment: 0.4, bdVelocity: 0.3 };
      const score = (assessment.costEfficiency * weights.costEfficiency) + 
                    (assessment.teamAlignment * weights.teamAlignment) + 
                    (assessment.bdVelocity * weights.bdVelocity);
      setResult({
        score: Math.round(score),
        breakdown: assessment,
        insights: getResultText(Math.round(score)),
        recommendations: []
      });
    } finally {
      setCalculating(false);
    }
  };

  const getResultText = (score) => {
    if (score < 50) {
      return {
        title: "You're efficient, but stuck in Founder Mode",
        message: "Time to delegate and systematize. Your firm needs systems that work without you.",
        color: "red",
        priority: "high"
      };
    } else if (score < 75) {
      return {
        title: "You're gaining momentum",
        message: "With targeted investment, your growth can compound. Focus on the highest-leverage activities.",
        color: "yellow",
        priority: "medium"
      };
    } else {
      return {
        title: "Your business is igniting",
        message: "Keep balancing leverage with focus. You're on the path to true business freedom.",
        color: "green",
        priority: "low"
      };
    }
  };

  if (currentStep < steps.length) {
    const step = steps[currentStep];
    const value = assessment[step.id === 'cost' ? 'costEfficiency' : step.id === 'human' ? 'teamAlignment' : 'bdVelocity'];

    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800 flex items-center justify-center p-8">
        {/* Header with Logo */}
        <div className="absolute top-0 left-0 right-0 p-6 z-10">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Ignite Strategies" className="h-10" />
            </div>
            <div className="text-white/80 text-sm">
              BusinessPoint Law Proposal
            </div>
          </div>
        </div>

        <div className="max-w-4xl w-full">
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-white/60 mb-2">
              <span>Assessment Progress</span>
              <span>{currentStep + 1} of {steps.length}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-red-400 to-orange-500 rounded-full h-2 transition-all duration-500"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Assessment Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20">
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{step.icon}</div>
              <h1 className="text-4xl font-black text-white mb-3">{step.title}</h1>
              <p className="text-xl text-white/90 mb-4">{step.prompt}</p>
              <p className="text-white/70 text-sm max-w-2xl mx-auto">{step.description}</p>
            </div>

            {/* Slider */}
            <div className="mb-8">
              <div className="flex justify-between mb-4">
                <span className="text-white/80 text-sm">{step.label}</span>
                <span className="text-white font-bold text-2xl">{value}%</span>
              </div>
              
              <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={(e) => handleSliderChange(
                  step.id === 'cost' ? 'costEfficiency' : 
                  step.id === 'human' ? 'teamAlignment' : 'bdVelocity',
                  Number(e.target.value)
                )}
                className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #f97316 0%, #f97316 ${value}%, rgba(255,255,255,0.2) ${value}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
              
              <div className="flex justify-between text-xs text-white/60 mt-2">
                <span>0%</span>
                <span className="text-white/80">{step.tooltip}</span>
                <span>100%</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-8 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition"
                >
                  ← Back
                </button>
              )}
              
              <button
                onClick={() => currentStep < steps.length - 1 ? setCurrentStep(currentStep + 1) : computeIgniteCoefficient()}
                disabled={calculating}
                className="ml-auto px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-xl hover:shadow-lg transition hover:scale-105 disabled:opacity-50"
              >
                {calculating ? 'Computing...' : currentStep < steps.length - 1 ? 'Next →' : 'Compute My Ignite Coefficient'}
              </button>
            </div>
          </div>

          {/* Welcome Note */}
          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              Welcome, Joel! This assessment is tailored for BusinessPoint Law's growth journey.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-white text-xl">Computing your Ignite Coefficient...</p>
        </div>
      </div>
    );
  }

  const score = result.score;
  const insights = result.insights;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800 flex items-center justify-center p-8">
      <div className="max-w-5xl w-full">
        
        {/* Results Header */}
        <div className="text-center mb-12">
          <div className="text-8xl mb-6">🔥</div>
          <h1 className="text-6xl font-black text-white mb-4">
            Your Ignite Coefficient™
          </h1>
          <p className="text-2xl text-white/90">
            {score}/100
          </p>
        </div>

        {/* Score Visualization */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20 mb-8">
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-48 h-48 rounded-full bg-gradient-to-br ${
              insights.color === 'red' ? 'from-red-600 to-red-500' :
              insights.color === 'yellow' ? 'from-orange-500 to-red-500' :
              'from-red-500 to-orange-500'
            } mb-6`}>
              <span className="text-6xl font-black text-white">{score}</span>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">{insights.title}</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">{insights.message}</p>
          </div>
        </div>

        {/* Breakdown */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="text-xl font-bold text-white mb-2">Cost Efficiency</h3>
            <p className="text-3xl font-black text-red-400 mb-2">{result.breakdown.costEfficiency}%</p>
            <p className="text-white/70 text-sm">Operational ROI</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-xl font-bold text-white mb-2">Team Alignment</h3>
            <p className="text-3xl font-black text-red-400 mb-2">{result.breakdown.teamAlignment}%</p>
            <p className="text-white/70 text-sm">Self-driven execution</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="text-xl font-bold text-white mb-2">BD Velocity</h3>
            <p className="text-3xl font-black text-red-400 mb-2">{result.breakdown.bdVelocity}%</p>
            <p className="text-white/70 text-sm">Pipeline conversion</p>
          </div>
        </div>

        {/* Recommendations */}
        {result.recommendations && result.recommendations.length > 0 && (
          <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">💡 Personalized Recommendations for BusinessPoint Law</h3>
            <div className="space-y-4">
              {result.recommendations.map((rec, idx) => (
                <div key={idx} className="bg-white/20 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{rec.title}</h4>
                      <p className="text-white/80 text-sm mb-1">{rec.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-white/60">{rec.category}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          rec.impact === 'high' ? 'bg-red-500/20 text-red-300' :
                          rec.impact === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-green-500/20 text-green-300'
                        }`}>
                          {rec.impact} impact
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => navigate('/companydashboard')}
            className="px-12 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-red-500/50 transition-all hover:scale-105"
          >
            {insights.title.includes('igniting') ? "Let's scale your practice" : 
             insights.title.includes('momentum') ? "Let's accelerate your growth" : 
             "Let's build your delegation framework"} →
          </button>
          
          <div className="mt-6 space-y-2">
            <p className="text-white/60 text-sm">
              Ready to dive deeper? Explore your personalized BusinessPoint Law dashboard.
            </p>
            <p className="text-white/40 text-xs">
              Get access to pipeline management, team efficiency tools, and revenue optimization strategies.
            </p>
          </div>
          
          {/* Additional Law Firm Specific CTAs */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <button
              onClick={() => navigate('/bd/pipeline')}
              className="px-6 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition border border-white/30"
            >
              📊 View Pipeline Management
            </button>
            <button
              onClick={() => navigate('/bd/goals')}
              className="px-6 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition border border-white/30"
            >
              🎯 Set Revenue Goals
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
