import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, PenTool, TrendingUp, Share2, Eye, Heart, MessageCircle, ArrowRight } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-blue-50/30">
      {/* Animated Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto mb-8"
        >
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
        </motion.div>

        {/* Zone Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-7xl mx-auto mb-8"
        >
          <div className="flex gap-4 overflow-x-auto pb-2">
            {zones.map((zone) => {
              const Icon = zone.icon;
              const isActive = activeZone === zone.id;
              return (
                <motion.button
                  key={zone.id}
                  onClick={() => setActiveZone(zone.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
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
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Zone Content */}
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeZone === 'pulse' && (
              <motion.div
                key="pulse"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <IdentityPulse isHydrated={isHydrated} />
              </motion.div>
            )}
            {activeZone === 'voice' && (
              <motion.div
                key="voice"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <VoiceBuilder isHydrated={isHydrated} />
              </motion.div>
            )}
            {activeZone === 'momentum' && (
              <motion.div
                key="momentum"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <MomentumLoop isHydrated={isHydrated} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
