import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // List of available proposals (hardcoded for now, will be from API later)
  const proposals = [
    { id: 'businesspoint-law', name: 'BusinessPoint Law', company: 'BusinessPoint Law Firm', status: 'active', date: '2024-01-15' },
    // More proposals can be added here or fetched from API
  ];

  const filteredProposals = proposals.filter(proposal =>
    proposal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    proposal.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navItems = [
    { path: '/growth-dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/assessment', label: 'Assessment', icon: '📊' },
    { path: '/bdpipeline', label: 'Pipeline', icon: '🎯' },
    { path: '/roadmap', label: 'BD Roadmap', icon: '🗺️' },
    { path: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-blue-100 text-blue-700',
      draft: 'bg-gray-100 text-gray-700',
      approved: 'bg-green-100 text-green-700',
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[status] || styles.draft}`}>
        {status}
      </span>
    );
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
      <div className="p-4">
        {/* Logo/Brand */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/growth-dashboard')}
            className="flex items-center space-x-2 text-lg font-bold text-red-600 hover:text-red-700 transition-colors"
          >
            <span className="text-2xl">🔥</span>
            <span>Ignite BD</span>
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="mb-6">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive(item.path)
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Proposals Section */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
              Proposals
            </h2>
            <button
              onClick={() => navigate('/proposals')}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              View All
            </button>
          </div>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search proposals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Proposals List */}
          <div className="space-y-2">
            {filteredProposals.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                {searchQuery ? 'No proposals found' : 'No proposals yet'}
              </p>
            ) : (
              filteredProposals.map((proposal) => (
                <button
                  key={proposal.id}
                  onClick={() => navigate(`/proposals/${proposal.id}`)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    isActive(`/proposals/${proposal.id}`)
                      ? 'border-red-500 bg-red-50 shadow-sm'
                      : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {proposal.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {proposal.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    {getStatusBadge(proposal.status)}
                    <span className="text-xs text-gray-400">
                      {new Date(proposal.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Quick Access Button */}
          <button
            onClick={() => navigate('/proposals/businesspoint-law')}
            className="w-full mt-4 px-4 py-2.5 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg font-semibold text-sm hover:from-red-700 hover:to-orange-700 transition-all shadow-sm hover:shadow-md"
          >
            📄 View Latest Proposal
          </button>
        </div>
      </div>
    </aside>
  );
}

