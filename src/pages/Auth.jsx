import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

export default function Auth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter an email');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const response = await api.post('/auth/mock', { email });
      
      console.log('✅ Auth successful:', response.data);
      
      // Redirect to home
      navigate('/home');
    } catch (err) {
      console.error('❌ Auth failed:', err);
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 transition"
        >
          <span>←</span>
          <span>Back to Home</span>
        </button>

        {/* Auth Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-200">
          
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🔥</div>
            <h1 className="text-4xl font-black text-gray-900 mb-3">Welcome Back</h1>
            <p className="text-gray-600">
              Demo auth — we'll swap in SmartEngage OAuth later
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="founder@startup.co"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:outline-none transition text-lg"
                disabled={loading}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-rose-600 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Continue →'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500">
              🔐 This is a demo environment. No real authentication required.
            </p>
          </div>
        </div>

        {/* Demo Note */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <p className="text-sm text-blue-800 text-center">
            <span className="font-semibold">💡 Demo Tip:</span> Enter any email to continue. No password needed!
          </p>
        </div>
      </div>
    </div>
  );
}

