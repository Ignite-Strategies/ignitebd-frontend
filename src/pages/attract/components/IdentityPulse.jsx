import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Building2, Heart, TrendingUp, Calendar } from 'lucide-react';

export default function IdentityPulse({ isHydrated }) {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [engagement, setEngagement] = useState(null);

  // Mock profile data - in real app, this would come from user profile/API
  useEffect(() => {
    if (isHydrated) {
      setProfile({
        name: 'Adam',
        venture: 'GoFast',
        avatar: '👤',
        toneTags: ['Builder', 'Grit', 'Authentic'],
        lastActive: '2 weeks ago',
        bio: 'Founder building the future of legal operations'
      });

      setPosts([
        {
          id: 1,
          content: 'Just shipped our biggest feature yet. 90 days of heads-down building, now ready to share.',
          date: '2024-01-15',
          type: 'Update',
          engagement: { views: 342, likes: 28, comments: 5 }
        },
        {
          id: 2,
          content: 'The biggest lesson from our last sprint: progress > perfection. Ship, learn, iterate.',
          date: '2024-01-08',
          type: 'Insight',
          engagement: { views: 189, likes: 15, comments: 3 }
        },
        {
          id: 3,
          content: 'Grateful for the mentors who pushed us to think bigger. Your network is your net worth.',
          date: '2024-01-01',
          type: 'Gratitude',
          engagement: { views: 267, likes: 22, comments: 7 }
        }
      ]);

      setEngagement({
        totalViews: 798,
        totalLikes: 65,
        totalComments: 15,
        avgEngagementRate: 10.2,
        lastPostDays: 14
      });
    }
  }, [isHydrated]);

  if (!isHydrated || !profile) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
        <div className="inline-block mb-4">
          <User className="h-12 w-12 text-purple-500" />
        </div>
        <p className="text-gray-600">Loading your identity pulse...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100"
      >
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-4xl shadow-lg">
            {profile.avatar}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
              <Building2 className="h-5 w-5 text-gray-400" />
              <span className="text-gray-600">{profile.venture}</span>
            </div>
            <p className="text-gray-600 mb-4">{profile.bio}</p>
            
            {/* Tone Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.toneTags.map((tag, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full text-sm font-medium"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>Last active: {profile.lastActive}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Engagement Stats */}
      {engagement && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100">
            <div className="flex items-center gap-3 mb-2">
              <Eye className="h-5 w-5 text-purple-600" />
              <span className="text-sm text-gray-600">Total Views</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{engagement.totalViews.toLocaleString()}</div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-600">Total Likes</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{engagement.totalLikes}</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border border-green-100">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-600">Engagement Rate</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{engagement.avgEngagementRate}%</div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl p-6 border border-orange-100">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <span className="text-sm text-gray-600">Days Since Last Post</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{engagement.lastPostDays}</div>
          </div>
        </motion.div>
      )}

      {/* Recent Posts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Posts</h3>
        {posts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">The world hasn't heard from you in a while</p>
            <p className="text-sm text-gray-500">Let's fix that — start crafting your voice</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-purple-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      {post.type}
                    </span>
                    <span className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <p className="text-gray-800 mb-4 leading-relaxed">{post.content}</p>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" /> {post.engagement.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4" /> {post.engagement.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" /> {post.engagement.comments}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
