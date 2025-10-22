import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

export default function Assessment() {
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState({
    name: '',
    company: '',
    industry: '',
    workTooMuch: '',
    assignTasks: '',
    wantMoreClients: '',
    revenueGrowthPercent: '',
    totalVolume: '',
    bdSpend: ''
  });
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState(null);

  const handleInputChange = (field, value) => {
    setAssessment(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const computeAssessment = async () => {
    try {
      setCalculating(true);
      
      // Call the backend AssessmentCalculationService with OpenAI integration
      const response = await api.post('/assessment/coefficient', assessment);
      
      const result = {
        score: response.data.score,
        breakdown: assessment,
        insights: response.data.insights,
        recommendations: response.data.insights.recommendations || [
          "Systematize your delegation processes",
          "Optimize your business development spend", 
          "Build scalable client acquisition systems"
        ]
      };
      
      // Save assessment to database
      try {
        await api.post('/assessmentSubmission/submit', {
          ...assessment,
          score: result.score,
          insights: JSON.stringify(result.insights)
        });
        console.log('✅ Assessment saved successfully');
      } catch (saveError) {
        console.error('❌ Failed to save assessment:', saveError);
        // Continue anyway - don't block the user from seeing results
      }
      
      setResult(result);
      
    } catch (error) {
      console.error('Error computing assessment:', error);
      // Fallback to simple result if API fails
      const result = {
        score: 65,
        breakdown: assessment,
        insights: {
          igniteGrowthAssessment: "Ignite Growth Assessment",
          relateWithUser: "It sounds like you are feeling overwhelmed with tasks and want to grow your business - you want more clients and better delegation.",
          growthNeeds: "To get there, you need more business development activities and a systematic approach to delegation and growth planning.",
          deeperDive: "This assessment shows the foundation for a deeper dive into your specific growth strategy once you become a client.",
          nextSteps: "Ready to take the next step in your growth journey?"
        },
        recommendations: [
          "Systematize your delegation processes",
          "Optimize your business development spend",
          "Build scalable client acquisition systems"
        ]
      };
      setResult(result);
    } finally {
      setCalculating(false);
    }
  };

  const isFormComplete = () => {
    return assessment.name && 
           assessment.company && 
           assessment.industry &&
           assessment.workTooMuch && 
           assessment.assignTasks && 
           assessment.wantMoreClients && 
           assessment.revenueGrowthPercent && 
           assessment.totalVolume && 
           assessment.bdSpend;
  };

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800 flex items-center justify-center p-8">
        <div className="max-w-5xl w-full">
          
          {/* Results Header */}
          <div className="text-center mb-12">
            <div className="text-8xl mb-6">🔥</div>
            <h1 className="text-6xl font-black text-white mb-4">
              Are you ready to Ignite?
            </h1>
            <p className="text-2xl text-white/90">
              Growth Potential Score: {result.score}/100
            </p>
          </div>

          {/* Score Visualization */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20 mb-8">
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-48 h-48 rounded-full bg-gradient-to-br ${
                result.score < 40 ? 'from-red-600 to-red-500' :
                result.score < 70 ? 'from-orange-500 to-red-500' :
                'from-red-500 to-orange-500'
              } mb-6`}>
                <span className="text-6xl font-black text-white">{result.score}</span>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-4">
                {result.score < 40 ? "High Growth Opportunity" : 
                 result.score < 70 ? "Strong Growth Potential" : 
                 "Excellent Growth Foundation"}
              </h2>
              
              <div className="space-y-6 mb-8">
                <p className="text-lg text-white/90 leading-relaxed">{result.insights.relateWithUser}</p>
                <p className="text-lg text-white/90 leading-relaxed">{result.insights.growthNeeds}</p>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6">💡 How We Can Support Your Growth</h3>
            <div className="space-y-4">
              {result.recommendations.map((rec, idx) => (
                <div key={idx} className="bg-white/20 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{rec}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button
              onClick={() => navigate('/assessment-results')}
              className="px-12 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-red-500/50 transition-all hover:scale-105"
            >
              See Detailed Analysis →
            </button>
            
            <p className="text-white/60 text-sm mt-4">
              Ready to unlock your business potential? Let's build your growth strategy.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800 flex items-center justify-center p-8">
      {/* Header with Logo */}
      <div className="absolute top-0 left-0 right-0 p-6 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Ignite Strategies" className="h-10" />
          </div>
          <div className="text-white/80 text-sm">
            Growth Assessment
          </div>
        </div>
      </div>

      <div className="max-w-4xl w-full">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">🔥</div>
          <h1 className="text-5xl font-black text-white mb-4">
            Are you ready to Ignite?
          </h1>
          <p className="text-xl text-white/90 mb-2">
            At Ignite we want you to find huge gains through growth.
          </p>
          <p className="text-lg text-white/80">
            The below will help us give you an assessment on how we can support?
          </p>
          <p className="text-sm text-white/70 mt-4">
            The below is structured for founders and CEOs
          </p>
        </div>

        {/* Assessment Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20">
          
          {/* Contact Information */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">👋</span>
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">What's your name?</label>
                <input
                  type="text"
                  value={assessment.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., John Smith"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">What's your company name?</label>
                <input
                  type="text"
                  value={assessment.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="e.g., Acme Corp"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">What's your industry?</label>
                <input
                  type="text"
                  value={assessment.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  placeholder="e.g., Technology, Legal, Healthcare"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          {/* Workload Assessment */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">⏰</span>
              Workload Assessment
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Do you feel you work too much on tasks?</h3>
                <div className="space-y-3">
                  {[
                    { value: 'always', label: 'Always - I do everything myself' },
                    { value: 'often', label: 'Often - I take on too much' },
                    { value: 'sometimes', label: 'Sometimes - I could delegate more' },
                    { value: 'rarely', label: 'Rarely - I delegate well' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="workTooMuch"
                        value={option.value}
                        checked={assessment.workTooMuch === option.value}
                        onChange={(e) => handleInputChange('workTooMuch', e.target.value)}
                        className="w-5 h-5 text-red-600"
                      />
                      <span className="text-white/90">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">You adequately assign to others</h3>
                <div className="space-y-3">
                  {[
                    { value: 'never', label: 'Never - I do everything myself' },
                    { value: 'rarely', label: 'Rarely - I struggle to delegate' },
                    { value: 'sometimes', label: 'Sometimes - I delegate when I remember' },
                    { value: 'always', label: 'Always - I delegate effectively' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="assignTasks"
                        value={option.value}
                        checked={assessment.assignTasks === option.value}
                        onChange={(e) => handleInputChange('assignTasks', e.target.value)}
                        className="w-5 h-5 text-red-600"
                      />
                      <span className="text-white/90">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Growth Goals */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">🚀</span>
              Growth Goals
            </h2>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Do you want to bring on more clients?</h3>
              <div className="space-y-3">
                {[
                  { value: 'yes', label: 'Yes - I need more clients to grow' },
                  { value: 'maybe', label: 'Maybe - depends on the right clients' },
                  { value: 'no', label: 'No - I have enough clients' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="wantMoreClients"
                      value={option.value}
                      checked={assessment.wantMoreClients === option.value}
                      onChange={(e) => handleInputChange('wantMoreClients', e.target.value)}
                      className="w-5 h-5 text-red-600"
                    />
                    <span className="text-white/90">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Revenue Targets */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">💰</span>
              Revenue Targets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">Ideally how much revenue growth do you want to see? (percentage)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={assessment.revenueGrowthPercent}
                    onChange={(e) => handleInputChange('revenueGrowthPercent', e.target.value)}
                    placeholder="e.g., 25"
                    className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <span className="text-white text-xl font-bold">%</span>
                </div>
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Total volume target</label>
                <div className="flex items-center gap-3">
                  <span className="text-white text-xl font-bold">$</span>
                  <input
                    type="number"
                    value={assessment.totalVolume}
                    onChange={(e) => handleInputChange('totalVolume', e.target.value)}
                    placeholder="e.g., 1000000"
                    className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Business Development Spend */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">📊</span>
              Business Development Spend
            </h2>
            <div>
              <label className="block text-white font-semibold mb-2">How much do you currently spend on business development either staffing or ad buy?</label>
              <div className="flex items-center gap-3">
                <span className="text-white text-xl font-bold">$</span>
                <input
                  type="number"
                  value={assessment.bdSpend}
                  onChange={(e) => handleInputChange('bdSpend', e.target.value)}
                  placeholder="e.g., 50000"
                  className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              onClick={computeAssessment}
              disabled={!isFormComplete() || calculating}
              className="px-12 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-red-500/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {calculating ? 'Computing Your Assessment...' : 'Get My Assessment'}
            </button>
            
            <p className="text-white/60 text-sm mt-4">
              Complete all fields to get your personalized growth assessment
            </p>
          </div>
        </div>

        {/* Welcome Note */}
        <div className="mt-6 text-center">
          <p className="text-white/60 text-sm">
            Structured for founders and CEOs - let's unlock your growth potential.
          </p>
        </div>
      </div>
    </div>
  );
}