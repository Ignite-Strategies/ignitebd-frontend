import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Eye, Linkedin, Mail, Link2, Wand2, Lightbulb, X, Heart, PenTool } from 'lucide-react';

export default function VoiceBuilder({ isHydrated }) {
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState('Update');
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [toneAnalysis, setToneAnalysis] = useState(null);

  const prompts = [
    {
      type: 'Insight',
      icon: Lightbulb,
      question: 'What did you learn this week?',
      placeholder: 'Share a key insight or lesson from your work...'
    },
    {
      type: 'Update',
      icon: PenTool,
      question: 'What progress did you make?',
      placeholder: 'Tell us about a milestone, feature, or win...'
    },
    {
      type: 'Gratitude',
      icon: Heart,
      question: 'Who helped you?',
      placeholder: 'Acknowledge someone who made a difference...'
    },
    {
      type: 'Launch',
      icon: Send,
      question: 'What are you launching?',
      placeholder: 'Announce a new product, feature, or initiative...'
    }
  ];

  // Simulate tone analysis
  useEffect(() => {
    if (content.length > 50) {
      const words = content.toLowerCase().split(' ');
      const analysis = {
        authenticity: Math.min(95, 70 + Math.random() * 25),
        clarity: Math.min(95, 75 + Math.random() * 20),
        engagement: Math.min(95, 65 + Math.random() * 30),
        tone: words.includes('learned') || words.includes('lesson') ? 'Reflective' :
              words.includes('grateful') || words.includes('thank') ? 'Grateful' :
              words.includes('launched') || words.includes('shipped') ? 'Energetic' : 'Balanced'
      };
      setToneAnalysis(analysis);
    } else {
      setToneAnalysis(null);
    }
  }, [content]);

  const handlePromptSelect = (prompt) => {
    setSelectedPrompt(prompt);
    setPostType(prompt.type);
    setContent('');
  };

  const handlePublish = () => {
    // In real app, this would publish to LinkedIn, email, etc.
    alert(`Post published as ${postType}! This would integrate with LinkedIn API, email digest, and Ignite Share Page.`);
    setContent('');
    setShowPreview(false);
  };

  if (!isHydrated) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
        <div className="inline-block mb-4">
          <PenTool className="h-12 w-12 text-purple-500" />
        </div>
        <p className="text-gray-600">Preparing your voice builder...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Editor */}
      <div className="lg:col-span-2 space-y-6">
        {/* Prompt Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Start with a prompt</h3>
          <div className="grid grid-cols-2 gap-3">
            {prompts.map((prompt) => {
              const Icon = prompt.icon;
              const isSelected = selectedPrompt?.type === prompt.type;
              return (
                <motion.button
                  key={prompt.type}
                  onClick={() => handlePromptSelect(prompt)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-xl text-left transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-5 w-5" />
                    <span className="font-semibold text-sm">{prompt.type}</span>
                  </div>
                  <p className="text-xs opacity-90">{prompt.question}</p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Editor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <PenTool className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-bold text-gray-900">Your Voice</h3>
              {postType && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                  {postType}
                </span>
              )}
            </div>
            {content.length > 0 && (
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                {showPreview ? 'Edit' : 'Preview'}
              </button>
            )}
          </div>

          {selectedPrompt && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 font-medium mb-1">{selectedPrompt.question}</p>
              <p className="text-xs text-blue-600">{selectedPrompt.placeholder}</p>
            </div>
          )}

          <AnimatePresence mode="wait">
            {!showPreview ? (
              <motion.textarea
                key="editor"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={selectedPrompt?.placeholder || "What's on your mind? Share authentically..."}
                className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-gray-800 leading-relaxed"
              />
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="min-h-[256px] p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-purple-200"
              >
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-xl">
                    👤
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Adam | GoFast</div>
                    <div className="text-xs text-gray-500">Just now</div>
                  </div>
                </div>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{content || 'Your post will appear here...'}</p>
                </div>
                {postType && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      {postType}
                    </span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {content.length} characters
            </div>
            {toneAnalysis && (
              <div className="flex items-center gap-2 text-sm text-purple-600">
                <Wand2 className="h-4 w-4" />
                <span>Tone: {toneAnalysis.tone}</span>
              </div>
            )}
          </div>

          {/* Publish Options */}
          {content.length > 20 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-medium text-gray-700">Publish to:</span>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </button>
                  <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4" />
                    Email Digest
                  </button>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 text-sm">
                    <Link2 className="h-4 w-4" />
                    Ignite Share
                  </button>
                </div>
              </div>
              <button
                onClick={handlePublish}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="h-5 w-5" />
                Publish & Share
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Sidebar - Tone Analysis & Tips */}
      <div className="space-y-6">
        {/* Tone Analysis */}
        {toneAnalysis && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-purple-600" />
              Tone Analysis
            </h3>
            <div className="space-y-4">
              {Object.entries(toneAnalysis).filter(([key]) => key !== 'tone').map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 capitalize">{key}</span>
                    <span className="font-semibold text-gray-900">{Math.round(value)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{ duration: 0.8 }}
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                    />
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <div className="text-sm">
                  <span className="text-gray-600">Overall Tone:</span>
                  <span className="ml-2 font-semibold text-purple-700">{toneAnalysis.tone}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-xl p-6 border border-purple-100"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Tips for Authenticity
          </h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>Share real experiences, not just wins</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>Show vulnerability and learning</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>Credit others who helped you</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>Connect your journey to your values</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

