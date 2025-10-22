import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profilesetup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    annualRevenue: '',
    teamSize: '',
    goals: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Here you would typically save the profile data to your backend
      console.log('Profile data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to main dashboard
      navigate('/businesspoint-law-proposal');
    } catch (error) {
      console.error('Profile setup error:', error);
      alert('Profile setup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Ignite Strategies" className="h-16 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">Let's Set Up Your Profile</h1>
          <p className="text-white/80 text-lg">Tell us about your business so we can personalize your experience</p>
        </div>

        {/* Profile Setup Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-white mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your company name"
                  required
                />
              </div>

              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-white mb-2">
                  Industry *
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                >
                  <option value="" className="bg-gray-800">Select your industry</option>
                  <option value="legal" className="bg-gray-800">Legal Services</option>
                  <option value="consulting" className="bg-gray-800">Consulting</option>
                  <option value="technology" className="bg-gray-800">Technology</option>
                  <option value="healthcare" className="bg-gray-800">Healthcare</option>
                  <option value="finance" className="bg-gray-800">Finance</option>
                  <option value="other" className="bg-gray-800">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="annualRevenue" className="block text-sm font-medium text-white mb-2">
                  Annual Revenue
                </label>
                <select
                  id="annualRevenue"
                  name="annualRevenue"
                  value={formData.annualRevenue}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="" className="bg-gray-800">Select revenue range</option>
                  <option value="0-100k" className="bg-gray-800">$0 - $100K</option>
                  <option value="100k-500k" className="bg-gray-800">$100K - $500K</option>
                  <option value="500k-1m" className="bg-gray-800">$500K - $1M</option>
                  <option value="1m-5m" className="bg-gray-800">$1M - $5M</option>
                  <option value="5m+" className="bg-gray-800">$5M+</option>
                </select>
              </div>

              <div>
                <label htmlFor="teamSize" className="block text-sm font-medium text-white mb-2">
                  Team Size
                </label>
                <select
                  id="teamSize"
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="" className="bg-gray-800">Select team size</option>
                  <option value="1-5" className="bg-gray-800">1-5 people</option>
                  <option value="6-20" className="bg-gray-800">6-20 people</option>
                  <option value="21-50" className="bg-gray-800">21-50 people</option>
                  <option value="50+" className="bg-gray-800">50+ people</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="goals" className="block text-sm font-medium text-white mb-2">
                What are your main business goals?
              </label>
              <textarea
                id="goals"
                name="goals"
                value={formData.goals}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Tell us about your growth objectives, challenges, and what you hope to achieve with Ignite..."
              />
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/signin')}
                className="flex-1 px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all"
              >
                Back
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-xl hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Setting up...' : 'Complete Setup →'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
