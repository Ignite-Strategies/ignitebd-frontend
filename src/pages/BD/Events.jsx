import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';

export default function BDEvents() {
  const navigate = useNavigate();
  const [activating, setActivating] = useState(false);
  const [result, setResult] = useState(null);

  const events = [
    {
      id: 'saas-summit',
      name: 'SaaS Summit 2025',
      date: '2025-03-15',
      location: 'San Francisco, CA',
      attendees: 350,
      icon: '🚀'
    },
    {
      id: 'founder-forum',
      name: 'Founder Forum Q2',
      date: '2025-04-20',
      location: 'Austin, TX',
      attendees: 120,
      icon: '💼'
    },
    {
      id: 'tech-connect',
      name: 'Tech Connect NYC',
      date: '2025-05-10',
      location: 'New York, NY',
      attendees: 500,
      icon: '🌆'
    }
  ];

  const handleActivate = async (eventId) => {
    try {
      setActivating(true);
      const response = await api.post('/bd/events/activate', {
        eventId,
        seats: 1
      });
      setResult(response.data);
    } catch (err) {
      console.error('Error activating event:', err);
      alert('Failed to activate event. Check console for details.');
    } finally {
      setActivating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🎪</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Events Outreach</h1>
              <p className="text-sm text-gray-600">Activate event-based BD</p>
            </div>
          </div>
          
          <button
            onClick={() => navigate('/home')}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 transition"
          >
            ← Back to Home
          </button>
        </div>
      </div>

      {/* BD Nav */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-4 overflow-x-auto py-3">
            <button
              onClick={() => navigate('/bd/goals')}
              className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition whitespace-nowrap"
            >
              Goals
            </button>
            <button
              onClick={() => navigate('/bd/events')}
              className="px-6 py-2 bg-white border-2 border-blue-500 text-blue-700 rounded-lg font-semibold whitespace-nowrap"
            >
              Events Outreach
            </button>
            <button
              onClick={() => navigate('/bd/content')}
              className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition whitespace-nowrap"
            >
              Content Planner
            </button>
            <button
              onClick={() => navigate('/bd/ads')}
              className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition whitespace-nowrap"
            >
              Google Ads
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Events List */}
        {!result && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-gray-900 mb-6">Upcoming Events</h2>
            
            {events.map(event => (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{event.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{event.name}</h3>
                      <p className="text-gray-600">
                        📅 {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · 
                        📍 {event.location}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        👥 {event.attendees} expected attendees
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleActivate(event.id)}
                    disabled={activating}
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg transition hover:scale-105 disabled:opacity-50"
                  >
                    {activating ? 'Activating...' : 'Activate Outreach'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Activation Plan Result */}
        {result && (
          <div className="space-y-6">
            <button
              onClick={() => setResult(null)}
              className="text-gray-600 hover:text-gray-900 flex items-center gap-2 transition"
            >
              <span>←</span>
              <span>Back to Events</span>
            </button>

            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl shadow-2xl p-10 text-white">
              <h2 className="text-3xl font-bold mb-2">{result.eventName}</h2>
              <p className="text-white/90 mb-4">Activation Plan Generated</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/20 rounded-xl p-4">
                  <p className="text-white/80 text-sm">Est. Reach</p>
                  <p className="text-4xl font-black">{result.estimatedReach}</p>
                  <p className="text-white/80 text-xs">contacts</p>
                </div>
                <div className="bg-white/20 rounded-xl p-4">
                  <p className="text-white/80 text-sm">Priority</p>
                  <p className="text-4xl font-black uppercase">{result.priority}</p>
                </div>
              </div>
            </div>

            {/* Tasks */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">✅ Action Items</h3>
              <div className="space-y-3">
                {result.tasks.map((task, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-gray-900">{task}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Contacts */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">👥 Priority Contacts</h3>
              <div className="space-y-3">
                {result.suggestedContacts.map((contact, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div>
                      <p className="font-bold text-gray-900">{contact.name}</p>
                      <p className="text-sm text-gray-600">{contact.title}</p>
                      <p className="text-sm text-gray-500">{contact.email}</p>
                    </div>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition">
                      Email
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Template */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">✉️ Message Template</h3>
              <div className="bg-gray-50 border border-gray-300 rounded-xl p-6">
                <pre className="whitespace-pre-wrap text-gray-800 font-mono text-sm">
                  {result.messageTemplate}
                </pre>
              </div>
              <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                📋 Copy Template
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

