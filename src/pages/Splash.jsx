import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        
        {/* Main Hero */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="text-9xl mb-8 animate-bounce">🔥</div>
          
          <h1 className="text-7xl font-black text-white mb-6 leading-tight">
            Are you ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-600">ignite</span>?
          </h1>
          
          <p className="text-2xl text-gray-300 mb-4 max-w-4xl mx-auto leading-relaxed">
            Activation Accounting for founders: plan targets, activate growth moves, and track momentum with the{' '}
            <span className="font-bold text-orange-400">Ignite Coefficient</span>.
          </p>
          
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-12">
            Deploy time, talent, and cash with intent. Show investors and partners exactly how you're turning resources into revenue.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => navigate('/auth')}
              className="group relative px-12 py-5 bg-gradient-to-r from-orange-500 to-rose-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-orange-500/50 transition-all hover:scale-105"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-rose-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
            
            <button
              onClick={() => navigate('/home')}
              className="px-12 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white text-xl font-bold rounded-2xl hover:bg-white/20 transition-all hover:scale-105"
            >
              Try the Demo →
            </button>
          </div>
        </div>

        {/* Three Pillars Preview */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-5xl mb-3">📊</div>
            <h3 className="text-xl font-bold text-white mb-2">Plan</h3>
            <p className="text-gray-300 text-sm">
              Set targets, model capacity, and backsolve revenue goals
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-5xl mb-3">⚡</div>
            <h3 className="text-xl font-bold text-white mb-2">Activate</h3>
            <p className="text-gray-300 text-sm">
              Events, content, ads—execute growth moves that generate revenue
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-5xl mb-3">🎯</div>
            <h3 className="text-xl font-bold text-white mb-2">Track</h3>
            <p className="text-gray-300 text-sm">
              Monitor your Ignite Coefficient and optimize reinvestment
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            This is a demo prototype. Real integrations (Google Ads, SmartEngage OAuth) coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}

