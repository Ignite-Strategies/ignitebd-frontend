import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

export default function Assessment() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    company: ''
  });
  const [assessment, setAssessment] = useState({
    industry: '',
    workTooMuch: '',
    assignTasks: '',
    pricePerWidget: '',
    costPerWidget: '',
    widgetsPerMonth: '',
    bdSpend: ''
  });
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState(null);
  const [assessmentId, setAssessmentId] = useState(null);

  // Load from localStorage on page refresh
  useEffect(() => {
    const savedData = localStorage.getItem('assessmentData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setAssessmentId(data.id);
      
      // If we have results, show them
      if (data.result) {
        setResult(data.result);
        setAssessment(data.assessment);
        setContactInfo({
          name: data.assessment.name || '',
          email: data.assessment.email || '',
          company: data.assessment.company || ''
        });
        setCurrentStep(4); // Skip to results
      }
    }
  }, []);

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

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // Save assessment data to database first
      const response = await api.post('/platformProspect/save-assessment', assessment);
      
      console.log('✅ Assessment saved with ID:', response.data.id);
      
      // Save assessment ID to localStorage
      const assessmentData = {
        id: response.data.id,
        assessment: assessment,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem('assessmentData', JSON.stringify(assessmentData));
      setAssessmentId(response.data.id);
      
      // Then show contact form
      setShowContactForm(true);
      
    } catch (error) {
      console.error('Error saving assessment:', error);
      // Still show contact form even if save fails
      setShowContactForm(true);
    }
  };

  const computeAssessment = async () => {
    try {
      setCalculating(true);
      
      // Send assessment ID + contact info to complete the assessment
      const response = await api.post('/platformProspect/complete-assessment', {
        assessmentId: assessmentId,
        name: contactInfo.name,
        email: contactInfo.email,
        company: contactInfo.company
      });
      
      console.log('✅ Assessment completed:', response.data);
      
      // Update localStorage with results
      const assessmentData = {
        id: response.data.id,
        assessment: {
          ...assessment,
          name: contactInfo.name,
          email: contactInfo.email,
          company: contactInfo.company
        },
        result: {
          score: response.data.score,
          insights: response.data.insights
        },
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem('assessmentData', JSON.stringify(assessmentData));
      
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


  // Step 1: Welcome & Contact Info
  const renderStep1 = () => (
    <div className="text-center">
      <div className="text-6xl mb-6">🔥</div>
      <h1 className="text-5xl font-black text-white mb-4">
        Are you ready to Ignite?
      </h1>
      <p className="text-xl text-white/90 mb-2">
        At Ignite we want you to find huge gains through growth.
      </p>
      <p className="text-lg text-white/80 mb-8">
        This assessment will take about 5-7 minutes and will help us understand your business growth potential.
      </p>
      
      <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20">
        <h2 className="text-3xl font-bold text-white mb-8">Let's get started!</h2>
        <p className="text-lg text-white/90 mb-8">
          First, let's get some basic information from you:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-white font-semibold mb-2">Your Name</label>
            <input
              type="text"
              value={contactInfo.name}
              onChange={(e) => handleContactChange('name', e.target.value)}
              placeholder="e.g., John Smith"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-white font-semibold mb-2">Email Address</label>
            <input
              type="email"
              value={contactInfo.email}
              onChange={(e) => handleContactChange('email', e.target.value)}
              placeholder="e.g., john@company.com"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-white font-semibold mb-2">Company Name</label>
            <input
              type="text"
              value={contactInfo.company}
              onChange={(e) => handleContactChange('company', e.target.value)}
              placeholder="e.g., Acme Corp"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>
        
        <button
          onClick={handleNext}
          disabled={!contactInfo.name || !contactInfo.email || !contactInfo.company}
          className="px-12 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-red-500/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Let's Get Started! →
        </button>
        
        <p className="text-white/60 text-sm mt-4">
          This assessment is structured for founders and CEOs
        </p>
      </div>
    </div>
  );

  // Step 2: Business Information
  const renderStep2 = () => (
    <div className="text-center">
      <div className="text-6xl mb-6">🏢</div>
      <h1 className="text-4xl font-black text-white mb-4">
        Tell us about your business
      </h1>
      <p className="text-xl text-white/90 mb-8">
        Help us understand your industry and current situation
      </p>
      
      <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20">
        <div className="space-y-8">
          <div>
            <label className="block text-white font-semibold mb-4 text-lg">What's your industry?</label>
            <input
              type="text"
              value={assessment.industry}
              onChange={(e) => handleInputChange('industry', e.target.value)}
              placeholder="e.g., Technology, Legal, Healthcare, Consulting"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          
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
        
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            className="px-6 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors"
          >
            ← Previous
          </button>
          <button
            onClick={handleNext}
            disabled={!assessment.industry || !assessment.workTooMuch || !assessment.assignTasks}
            className="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );

  // Step 3: Growth Goals & Revenue
  const renderStep3 = () => (
    <div className="text-center">
      <div className="text-6xl mb-6">🚀</div>
      <h1 className="text-4xl font-black text-white mb-4">
        Let's calculate your growth potential
      </h1>
      <p className="text-xl text-white/90 mb-8">
        Based on your business model, we'll calculate what's realistic for growth
      </p>
      
      <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20">
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">What's your average price per widget/service?</h3>
            <div className="flex items-center gap-3">
              <span className="text-white text-xl font-bold">$</span>
              <input
                type="number"
                value={assessment.pricePerWidget}
                onChange={(e) => handleInputChange('pricePerWidget', e.target.value)}
                placeholder="e.g., 500"
                className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <p className="text-sm text-white/70 mt-2">The price you charge for one unit of your product/service</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">What's your cost to deliver one widget?</h3>
            <div className="flex items-center gap-3">
              <span className="text-white text-xl font-bold">$</span>
              <input
                type="number"
                value={assessment.costPerWidget}
                onChange={(e) => handleInputChange('costPerWidget', e.target.value)}
                placeholder="e.g., 200"
                className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <p className="text-sm text-white/70 mt-2">Your direct costs (materials, labor, etc.) to deliver one unit</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">How many widgets do you sell per month?</h3>
            <input
              type="number"
              value={assessment.widgetsPerMonth}
              onChange={(e) => handleInputChange('widgetsPerMonth', e.target.value)}
              placeholder="e.g., 100"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <p className="text-sm text-white/70 mt-2">Total units sold per month</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">How much do you currently spend on business development?</h3>
            <div className="flex items-center gap-3">
              <span className="text-white text-xl font-bold">$</span>
              <input
                type="number"
                value={assessment.bdSpend}
                onChange={(e) => handleInputChange('bdSpend', e.target.value)}
                placeholder="e.g., 5000"
                className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <span className="text-white text-sm">/month</span>
            </div>
            <p className="text-sm text-white/70 mt-2">This helps us calculate your BD ROI and growth potential</p>
          </div>

          {/* Real-time Unit Economics Calculation */}
          {assessment.pricePerWidget && assessment.costPerWidget && assessment.widgetsPerMonth && (
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
              <h4 className="text-lg font-semibold text-white mb-4">Your Unit Economics</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    ${(parseInt(assessment.pricePerWidget) - parseInt(assessment.costPerWidget)).toLocaleString()}
                  </div>
                  <div className="text-sm text-white/70">Profit per Widget</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    ${(parseInt(assessment.pricePerWidget) * parseInt(assessment.widgetsPerMonth)).toLocaleString()}
                  </div>
                  <div className="text-sm text-white/70">Monthly Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    ${((parseInt(assessment.pricePerWidget) - parseInt(assessment.costPerWidget)) * parseInt(assessment.widgetsPerMonth)).toLocaleString()}
                  </div>
                  <div className="text-sm text-white/70">Monthly Profit</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">
                    {Math.round(((parseInt(assessment.pricePerWidget) - parseInt(assessment.costPerWidget)) / parseInt(assessment.pricePerWidget)) * 100)}%
                  </div>
                  <div className="text-sm text-white/70">Profit Margin</div>
                </div>
              </div>
              <p className="text-sm text-white/80 mt-4 text-center">
                To add $200,000 revenue, you'd need to sell {Math.round(200000 / parseInt(assessment.pricePerWidget))} more widgets
              </p>
            </div>
          )}
        </div>
        
        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            className="px-6 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors"
          >
            ← Previous
          </button>
          <button
            onClick={handleSubmit}
            disabled={!assessment.pricePerWidget || !assessment.costPerWidget || !assessment.widgetsPerMonth || !assessment.bdSpend}
            className="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Calculate My Growth Potential →
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800 p-8">
      <div className="max-w-4xl w-full mx-auto">
        
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-center space-x-4 mb-4">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step <= currentStep
                    ? 'bg-white text-red-600'
                    : 'bg-white/20 text-white/60'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="text-center text-white/80 text-sm">
            Step {currentStep} of 3
          </div>
        </div>

        {/* Render Current Step */}
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}

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
                  onClick={() => navigate('/growth-cost-outlook')}
                  className="px-12 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-red-500/50 transition-all hover:scale-105"
                >
                  Analyze Growth Cost Outlook →
                </button>
                
                <p className="text-white/60 text-sm mt-4">
                  Ready to unlock your growth potential? Let's build your success strategy.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}