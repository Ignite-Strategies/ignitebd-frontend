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
      
      // Navigate to results page immediately with loading state
      navigate('/assessment-results', { state: { loading: true, assessment } });
      
      // Call the NEW simplified demo endpoint - no database saves, just OpenAI
      const response = await api.post('/assessmentDemo/generate', assessment);
      
      console.log('✅ Assessment demo response:', response.data);
      
      // Navigate again with actual results
      navigate('/assessment-results', { state: {
        ...assessment,
        insights: response.data.assessmentDemo,
        loading: false
      }});
      
    } catch (error) {
      console.error('Error computing assessment:', error);
      // Fallback - still navigate to results with basic data
      navigate('/assessment-results', { state: {
        ...assessment,
        insights: {
          relateWithUser: "It sounds like you are feeling overwhelmed with tasks and want to grow your business.",
          growthNeeds: "To get there, you need more business development activities and a systematic approach."
        },
        loading: false
      }});
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


  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800 p-8">
      <div className="max-w-4xl w-full mx-auto">
        
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