import { useState, useEffect } from 'react';
import { Sparkles, PenTool, TrendingUp } from 'lucide-react';
import IdentityPulse from './components/IdentityPulse';
import VoiceBuilder from './components/VoiceBuilder';
import MomentumLoop from './components/MomentumLoop';

export default function BrandingHub() {
  const [activeZone, setActiveZone] = useState('pulse');
  const [isHydrated, setIsHydrated] = useState(false);

  // Simulate hydration loading
  useEffect(() => {
    const timer = setTimeout(() => setIsHydrated(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const zones = [
    { id: 'pulse', name: 'Identity Pulse', icon: Sparkles, description: 'Who you are showing up as' },
    { id: 'voice', name: 'Voice Builder', icon: PenTool, description: 'Craft your authentic message' },
    { id: 'momentum', name: 'Momentum Loop', icon: TrendingUp, description: 'How your voice is landing' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Branding Hub
              </h1>
              <p className="text-gray-600 mt-1">Engineer authenticity as a business asset</p>
            </div>
          </div>
        </div>

        {/* Zone Navigation */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {zones.map((zone) => {
              const Icon = zone.icon;
              const isActive = activeZone === zone.id;
              return (
                <button
                  key={zone.id}
                  onClick={() => setActiveZone(zone.id)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-semibold">{zone.name}</div>
                    <div className={`text-xs ${isActive ? 'text-purple-100' : 'text-gray-500'}`}>
                      {zone.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Zone Content */}
        <div className="max-w-7xl mx-auto">
          {activeZone === 'pulse' && <IdentityPulse isHydrated={isHydrated} />}
          {activeZone === 'voice' && <VoiceBuilder isHydrated={isHydrated} />}
          {activeZone === 'momentum' && <MomentumLoop isHydrated={isHydrated} />}
        </div>
      </div>
    </div>
  );
}
