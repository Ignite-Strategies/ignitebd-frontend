import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

export default function Assessment() {
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState({
    company: '',
    industry: '',
    workTooMuch: '',
    assignTasks: '',
    wantMoreClients: '',
    revenueGrowthPercent: '',
    totalVolume: '',
    bdSpend: ''
  });
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    company: ''
  });
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);

  const handleInputChange = (field, value) => {
    setAssessment(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactChange = (field, value) => {
    setContactInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // First show contact form (like TripWell)
    setShowContactForm(true);
  };

  const computeAssessment = async () => {
    try {
      setCalculating(true);
      
      // Combine assessment with contact info for backend
      const fullAssessment = {
        ...assessment,
        name: contactInfo.name,
        email: contactInfo.email,
        company: contactInfo.company
      };
      
      // Call the working AssessmentCalculationService endpoint
      const response = await api.post('/assessment/coefficient', fullAssessment);
      
      console.log('✅ Assessment response:', response.data);
      
      // Set results state to show results on the same page (like TripWell)
      setResult({
        score: response.data.score,
        insights: response.data.insights
      });
      
    } catch (error) {
      console.error('Error computing assessment:', error);
      // Fallback - show basic results
      setResult({
        score: 65,
        insights: {
          relateWithUser: "It sounds like you are feeling overwhelmed with tasks and want to grow your business.",
          growthNeeds: "To get there, you need more business development activities and a systematic approach."
        }
      });
    } finally {
      setCalculating(false);
    }
  };

  const isAssessmentComplete = () => {
    return assessment.industry &&
           assessment.workTooMuch && 
           assessment.assignTasks && 
           assessment.wantMoreClients && 
           assessment.revenueGrowthPercent && 
           assessment.totalVolume && 
           assessment.bdSpend;
  };

  const isContactComplete = () => {
    return contactInfo.name && contactInfo.email && contactInfo.company;
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
          
          {/* Industry Information */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">🏢</span>
              Industry Information
            </h2>
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
              onClick={handleSubmit}
              disabled={!isAssessmentComplete()}
              className="px-12 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-red-500/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Want Your Results?
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

      {/* Contact Form - Shows after "Want Your Results?" */}
      {showContactForm && (
        <div className="max-w-4xl w-full mx-auto mt-8">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">📧</div>
              <h2 className="text-4xl font-bold text-white mb-2">Get Your Results</h2>
              <p className="text-xl text-white/90">Add your contact details to receive your personalized growth analysis</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-white font-semibold mb-2">What's your name?</label>
                <input
                  type="text"
                  value={contactInfo.name}
                  onChange={(e) => handleContactChange('name', e.target.value)}
                  placeholder="e.g., John Smith"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">What's your email?</label>
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => handleContactChange('email', e.target.value)}
                  placeholder="e.g., john@company.com"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">What's your company?</label>
                <input
                  type="text"
                  value={contactInfo.company}
                  onChange={(e) => handleContactChange('company', e.target.value)}
                  placeholder="e.g., Acme Corp"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={computeAssessment}
                disabled={!isContactComplete() || calculating}
                className="px-12 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-red-500/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {calculating ? 'Generating Your Analysis...' : 'Get My Results'}
              </button>
              
              <p className="text-white/60 text-sm mt-4">
                We'll send your personalized growth analysis to your email
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Results Section - Show on same page like TripWell */}
      {result && (
        <div className="max-w-4xl w-full mx-auto mt-8">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🔥</div>
              <h2 className="text-4xl font-bold text-white mb-2">Your Growth Analysis</h2>
              <p className="text-xl text-white/90">Personalized insights for {contactInfo.company}</p>
            </div>

            <div className="space-y-6">
              {result.insights && (
                <>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-white/90 leading-relaxed text-lg">
                      {result.insights.relateWithUser}
                    </p>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-white/90 leading-relaxed text-lg">
                      {result.insights.growthNeeds}
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => navigate('/prices')}
                className="px-12 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-red-500/50 transition-all hover:scale-105"
              >
                Learn How We Can Help →
              </button>
              
              <p className="text-white/60 text-sm mt-4">
                Ready to unlock your growth potential? Let's build your success strategy.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}