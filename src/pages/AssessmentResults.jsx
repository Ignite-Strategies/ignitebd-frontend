import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../lib/api';

export default function AssessmentResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const assessmentId = searchParams.get('id');
  
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (assessmentId) {
      loadResults();
    } else {
      setLoading(false);
    }
  }, [assessmentId]);

  const loadResults = async () => {
    try {
      setLoading(true);
      // Get the assessment data from the submission
      const response = await api.get(`/assessmentSubmission/${assessmentId}`);
      const assessment = response.data;
      
      // Parse the insights JSON string
      let insights = null;
      if (assessment.insights) {
        try {
          insights = JSON.parse(assessment.insights);
        } catch (parseError) {
          console.error('❌ Failed to parse insights:', parseError);
        }
      }
      
      setResults({
        ...assessment,
        insights
      });
    } catch (error) {
      console.error('❌ Error loading assessment results:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Analyzing your assessment...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Assessment Not Found</h1>
          <button
            onClick={() => navigate('/assessment')}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Take Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Ignite Strategies" className="h-10" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Assessment Results</h1>
                <p className="text-gray-600">Growth analysis for {results.assessment.company}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Score Display */}
        <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl shadow-xl p-8 text-white mb-8">
          <div className="text-center">
            <div className="text-6xl mb-4">🔥</div>
            <h2 className="text-4xl font-bold mb-2">Growth Potential Score</h2>
            <div className="text-8xl font-black mb-4">{results.score}/100</div>
            <p className="text-xl text-white/90">
              {results.score < 40 ? "High Growth Opportunity" : 
               results.score < 70 ? "Strong Growth Potential" : 
               "Excellent Growth Foundation"}
            </p>
          </div>
        </div>

        {/* Analysis */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">📊 Here's the results of your assessment</h3>
          <div className="space-y-6">
            {results.insights && (
              <>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {results.insights.relateWithUser}
                  </p>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {results.insights.growthNeeds}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Assessment Summary */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">📋 Assessment Summary</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Workload Management</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Works too much:</span> {results.assessment.workTooMuch}</p>
                <p><span className="font-medium">Delegates effectively:</span> {results.assessment.assignTasks}</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Growth Goals</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Wants more clients:</span> {results.assessment.wantMoreClients}</p>
                <p><span className="font-medium">Revenue growth target:</span> {results.assessment.revenueGrowthPercent}%</p>
                <p><span className="font-medium">Total volume target:</span> ${results.assessment.totalVolume?.toLocaleString()}</p>
                <p><span className="font-medium">Current BD spend:</span> ${results.assessment.bdSpend?.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => navigate('/prices')}
            className="px-12 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-red-500/50 transition-all hover:scale-105"
          >
            Learn How We Can Help →
          </button>
          
          <p className="text-gray-600 text-sm mt-4">
            Ready to unlock your growth potential? Let's build your success strategy.
          </p>
        </div>
      </div>
    </div>
  );
}
