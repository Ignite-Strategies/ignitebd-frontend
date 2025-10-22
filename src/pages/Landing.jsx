import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      
      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="max-w-6xl w-full">
          
          {/* Main Headline */}
          <div className="text-center mb-16">
            <h1 className="text-7xl font-black text-white mb-6 leading-tight">
              How much <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-600">growth energy</span> is your business really producing?
            </h1>
            
            <p className="text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              The <span className="font-bold text-orange-400">Ignite Coefficient™</span> measures how effectively your team converts time, people, and dollars into forward momentum.
            </p>
          </div>

          {/* Formula Display */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20 mb-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-6">The Ignite Coefficient™</h2>
              
              <div className="bg-white/20 rounded-2xl p-8 mb-6">
                <div className="text-4xl font-black text-white mb-4">
                  IC = (Growth Output × Leverage) ÷ (Founder Dependence + Operational Drag)
                </div>
              </div>
              
              <p className="text-xl text-white/90 italic">
                "It's not about cutting costs — it's about unlocking scale."
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <button
              onClick={() => navigate('/welcome-joel')}
              className="group relative px-16 py-6 bg-gradient-to-r from-orange-500 to-rose-600 text-white text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-orange-500/50 transition-all hover:scale-105"
            >
              <span className="relative z-10">Run Your Free Assessment →</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-rose-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            
            <p className="text-white/60 text-sm mt-4">
              Personalized for BusinessPoint Law • Takes 2 minutes
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white/5 backdrop-blur-sm py-20">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            What You'll Discover
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-2xl font-bold text-white mb-3">Cost Efficiency</h3>
              <p className="text-white/80">
                How much of your spend directly drives measurable outcomes. 
                Higher = stronger ROI per dollar.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-white mb-3">Human Capital</h3>
              <p className="text-white/80">
                How aligned and self-driven your team is. 
                Higher = more initiative, less micromanagement.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-white mb-3">BD Momentum</h3>
              <p className="text-white/80">
                How fast attention converts into opportunity. 
                Higher = stronger pipeline velocity.
              </p>
            </div>
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

