import { useNavigate } from 'react-router-dom';

export default function LearnMore() {
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
        <div className="max-w-6xl w-full">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black text-white mb-4">
              How <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">Ignite</span> Works
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We transform your business through three strategic pillars that convert time, people, and dollars into measurable growth.
            </p>
          </div>

          {/* Cost Efficiency Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20 mb-12">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">💰</div>
              <h2 className="text-4xl font-bold text-white mb-4">Cost Efficiency</h2>
              <p className="text-xl text-white/90 mb-6">
                We do a full P&L assessment in three categories
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/20 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">👥</div>
                <h3 className="text-xl font-bold text-white mb-3">Manpower</h3>
                <p className="text-white/80 text-sm">
                  Analyze your team costs, productivity, and ROI per employee to optimize your human capital investment.
                </p>
              </div>
              
              <div className="bg-white/20 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">🏢</div>
                <h3 className="text-xl font-bold text-white mb-3">Overhead</h3>
                <p className="text-white/80 text-sm">
                  Review office space, technology, and operational expenses to identify cost-saving opportunities.
                </p>
              </div>
              
              <div className="bg-white/20 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">📈</div>
                <h3 className="text-xl font-bold text-white mb-3">Business Development</h3>
                <p className="text-white/80 text-sm">
                  Track marketing spend, lead generation costs, and customer acquisition expenses for maximum ROI.
                </p>
              </div>
            </div>
          </div>

          {/* Human Capital Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20 mb-12">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">⚡</div>
              <h2 className="text-4xl font-bold text-white mb-4">Human Capital</h2>
              <p className="text-xl text-white/90 mb-6">
                We want to maximize the use of your team through
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/20 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">🔄</div>
                <h3 className="text-xl font-bold text-white mb-3">Systems of Task Assignment and Feedback</h3>
                <p className="text-white/80 text-sm">
                  Create clear workflows, accountability structures, and performance feedback loops that keep your team aligned and productive.
                </p>
              </div>
              
              <div className="bg-white/20 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">📋</div>
                <h3 className="text-xl font-bold text-white mb-3">Expectation Management</h3>
                <p className="text-white/80 text-sm">
                  Set clear goals, define success metrics, and establish regular check-ins to ensure everyone knows what's expected.
                </p>
              </div>
              
              <div className="bg-white/20 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">⚖️</div>
                <h3 className="text-xl font-bold text-white mb-3">Workload and Compensation</h3>
                <p className="text-white/80 text-sm">
                  Balance team capacity with fair compensation, ensuring your people are motivated and not overwhelmed.
                </p>
              </div>
            </div>
          </div>

          {/* Business Development Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20 mb-12">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🚀</div>
              <h2 className="text-4xl font-bold text-white mb-4">Business Development</h2>
              <p className="text-xl text-white/90 mb-6">
                Here we get you as the founder out there and manage a CRM to track deals
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/20 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">✍️</div>
                <h3 className="text-xl font-bold text-white mb-3">Founder Content Strategy</h3>
                <p className="text-white/80 text-sm">
                  Position you as the thought leader in your space through strategic content that builds trust and attracts ideal clients.
                </p>
              </div>
              
              <div className="bg-white/20 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">🎪</div>
                <h3 className="text-xl font-bold text-white mb-3">Event Driven Lead Collection</h3>
                <p className="text-white/80 text-sm">
                  Turn networking events, conferences, and speaking opportunities into a systematic lead generation machine.
                </p>
              </div>
              
              <div className="bg-white/20 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="text-xl font-bold text-white mb-3">Google Ads</h3>
                <p className="text-white/80 text-sm">
                  Scale your reach with targeted advertising that drives qualified leads and measurable ROI on your ad spend.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/assessment')}
                className="px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/30 transition-all hover:scale-105"
              >
                Take Assessment
              </button>
              
              <button
                onClick={() => navigate('/splash')}
                className="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-xl shadow-xl hover:shadow-red-500/50 transition-all hover:scale-105"
              >
                <span className="relative z-10">Try the Platform →</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-orange-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
            
            <p className="text-white/60 text-sm mt-4">
              Ready to transform your business? Start with a free assessment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
