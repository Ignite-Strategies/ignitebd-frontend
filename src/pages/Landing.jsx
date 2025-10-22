import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800">
      
      {/* Header with Logo */}
      <div className="absolute top-0 left-0 right-0 p-6 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Ignite Strategies" className="h-12" />
          </div>
          <div className="text-white/80 text-sm">
            Revenue Building Strategies
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="max-w-6xl w-full">
          
          {/* Main Headline */}
          <div className="text-center mb-16">
            <h1 className="text-6xl font-black text-white mb-6 leading-tight">
              Are you ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">Ignite</span> your business through proven revenue building strategies?
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Ignite helps you grow through <span className="font-bold text-red-400">3 strategic pillars</span> that convert time, people, and dollars into measurable growth.
            </p>
          </div>

          {/* Three Pillars */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 text-center">
              <div className="text-6xl mb-4">💰</div>
              <h3 className="text-2xl font-bold text-white mb-3">Cost Efficiency</h3>
              <p className="text-white/80 leading-relaxed">
                Optimize your spend to drive measurable outcomes and stronger ROI per dollar invested.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 text-center">
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-white mb-3">Human Capital</h3>
              <p className="text-white/80 leading-relaxed">
                Build systems and capacity so your team executes with initiative, not micromanagement.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 text-center">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-white mb-3">Attract New Customers</h3>
              <p className="text-white/80 leading-relaxed">
                Convert attention into opportunity with proven business development strategies.
              </p>
            </div>
          </div>

          {/* Our Model Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20 mb-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-8">Our Model</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">📊</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Assess</h3>
                  <p className="text-white/80 text-sm">
                    Measure your current Ignite Coefficient across all three pillars
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🔧</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Build Systems</h3>
                  <p className="text-white/80 text-sm">
                    Create scalable processes that work without your constant input
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Execute</h3>
                  <p className="text-white/80 text-sm">
                    Launch targeted strategies that drive measurable revenue growth
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="grid md:grid-cols-3 gap-6 justify-center items-center max-w-4xl mx-auto">
              <button
                onClick={() => navigate('/home')}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white text-lg font-bold rounded-2xl hover:bg-white/30 transition-all hover:scale-105"
              >
                Learn More
              </button>
              
              <button
                onClick={() => navigate('/businesspoint-law-proposal')}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white text-lg font-bold rounded-2xl hover:bg-white/30 transition-all hover:scale-105"
              >
                Take Assessment
              </button>
              
              <button
                onClick={() => navigate('/splash')}
                className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white text-lg font-bold rounded-2xl shadow-2xl hover:shadow-red-500/50 transition-all hover:scale-105"
              >
                <span className="relative z-10">Try the Platform →</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-orange-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
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

