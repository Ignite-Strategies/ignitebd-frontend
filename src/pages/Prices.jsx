import { useNavigate } from 'react-router-dom';

export default function Prices() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800">
      
      {/* Header with Logo */}
      <div className="absolute top-0 left-0 right-0 p-6 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Ignite Strategies" className="h-12" />
          </div>
          
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 text-white/80 hover:text-white transition"
          >
            ← Back to Home
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="pt-20 p-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black text-white mb-4">
              Simple, Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">Pricing</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to ignite your business growth. No hidden fees, no complex tiers.
            </p>
          </div>

          {/* Pricing Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20 mb-12">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🚀</div>
              <h2 className="text-4xl font-bold text-white mb-4">Ignite Growth Package</h2>
              <div className="text-6xl font-black text-white mb-2">$1,000</div>
              <p className="text-xl text-white/90 mb-6">One-time setup + ongoing platform access</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/20 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-xl font-bold text-white mb-3">Onboarding & System Setup</h3>
                <p className="text-white/80 text-sm">
                  Complete business assessment, goal setting, and custom system implementation
                </p>
              </div>
              
              <div className="bg-white/20 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">💻</div>
                <h3 className="text-xl font-bold text-white mb-3">Platform Access</h3>
                <p className="text-white/80 text-sm">
                  Full access to our growth platform with pipeline management, analytics, and tools
                </p>
              </div>
              
              <div className="bg-white/20 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">🤝</div>
                <h3 className="text-xl font-bold text-white mb-3">Guided Support</h3>
                <p className="text-white/80 text-sm">
                  Ongoing advisory support and guidance to keep you on track for growth
                </p>
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-white/20 rounded-2xl p-6 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">What's Included</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-white/90">Complete business assessment & analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-white/90">Custom growth strategy development</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-white/90">Pipeline management system setup</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-white/90">Team efficiency optimization</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-white/90">Business development tools & training</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-white/90">Monthly check-ins & strategy adjustments</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <button
              onClick={() => navigate('/splash')}
              className="group relative px-12 py-6 bg-gradient-to-r from-red-600 to-orange-600 text-white text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-red-500/50 transition-all hover:scale-105"
            >
              <span className="relative z-10">I'm Ready! Let's Get Started →</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-orange-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            
            <p className="text-white/60 text-sm mt-4">
              Start your growth journey today. No long-term contracts, no hidden fees.
            </p>
            
            <div className="mt-8 text-center">
              <p className="text-white/80 text-sm">
                Questions? <span className="text-red-400 font-semibold">Contact us</span> for a free consultation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
