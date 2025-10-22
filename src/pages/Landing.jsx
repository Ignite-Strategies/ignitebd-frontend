import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800">
      
      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="max-w-6xl w-full">
          
                  {/* Logo Front and Center */}
                  <div className="text-center mb-12">
                    <img src="/logo.png" alt="Ignite Strategies" className="h-32 mx-auto mb-8" />
                  </div>
          
          {/* Main Headline */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-white mb-4 leading-tight">
              Are you ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">Ignite</span> your business through proven revenue building strategies?
            </h1>
            
            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Ignite helps you grow through <span className="font-bold text-red-400">3 strategic pillars</span> that convert time, people, and dollars into measurable growth.
            </p>
          </div>

          {/* Three Pillars */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 text-center">
              <div className="text-5xl mb-3">💰</div>
              <h3 className="text-xl font-bold text-white mb-2">Cost Efficiency</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Optimize your spend to drive measurable outcomes and stronger ROI per dollar invested.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 text-center">
              <div className="text-5xl mb-3">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">Human Capital</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Build systems and capacity so your team executes with initiative, not micromanagement.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20 text-center">
              <div className="text-5xl mb-3">🚀</div>
              <h3 className="text-xl font-bold text-white mb-2">Attract New Customers</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                Convert attention into opportunity with proven business development strategies.
              </p>
            </div>
          </div>

          {/* Our Model Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 mb-10">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-6">Our Model</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Assess</h3>
                  <p className="text-white/80 text-sm">
                    Measure your current Ignite Coefficient across all three pillars
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🔧</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Build Systems</h3>
                  <p className="text-white/80 text-sm">
                    Create scalable processes that work without your constant input
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Execute</h3>
                  <p className="text-white/80 text-sm">
                    Launch targeted strategies that drive measurable revenue growth
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-3xl mx-auto">
              <button
                onClick={() => navigate('/learn-more')}
                className="px-6 py-3 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/30 transition-all hover:scale-105"
              >
                Learn More
              </button>
              
              <button
                onClick={() => navigate('/assessment')}
                className="px-6 py-3 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/30 transition-all hover:scale-105"
              >
                Take Assessment
              </button>
              
              <button
                onClick={() => navigate('/splash')}
                className="group relative px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-xl shadow-xl hover:shadow-red-500/50 transition-all hover:scale-105"
              >
                <span className="relative z-10">Try the Platform →</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-orange-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
            
            <p className="text-white/60 text-sm mt-4">
              Free 2-minute assessment • Full platform access • Personalized for your business
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-12 text-center">
        <p className="text-white/60 text-sm">
          "Efficiency is good — but liberation is better."
        </p>
        <p className="text-white/40 text-xs mt-2">
          The Ignite Coefficient shows how well your dollars convert into freedom and growth.
        </p>
      </div>
    </div>
  );
}

