import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Users,
  Activity,
  Cpu,
  Star,
  MessageSquare,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  Send,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { AdminAnalytics, UserFeedback } from '../types';

export const AdminPanelView: React.FC = () => {
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [feedbacks, setFeedbacks] = useState<UserFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [res1, res2] = await Promise.all([
        fetch('/api/admin/analytics'),
        fetch('/api/feedback'),
      ]);
      if (res1.ok) {
        const data = await res1.json();
        setAnalytics(data);
      }
      if (res2.ok) {
        const data = await res2.json();
        setFeedbacks(data);
      }
    } catch (err) {
      console.error('Error loading admin analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'Current User',
          rating: newRating,
          comment: newComment,
        }),
      });
      if (res.ok) {
        const item = await res.json();
        setFeedbacks([item, ...feedbacks]);
        setNewComment('');
      }
    } catch (err) {
      console.error('Error posting feedback:', err);
    }
  };

  if (loading) {
    return (
      <div className="bg-white border border-[#E8E3D8] rounded-3xl p-12 text-center space-y-3 shadow-xs">
        <Activity className="w-8 h-8 text-[#1E1E1E] animate-spin mx-auto" />
        <p className="text-xs font-bold text-[#8B8680]">Loading System Analytics & API Usage...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white border border-[#E8E3D8] rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <h2 className="text-xl font-extrabold text-[#1E1E1E] flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#1E1E1E]" />
            <span>Admin Control Panel & System Monitoring</span>
          </h2>
          <p className="text-xs text-[#8B8680] font-medium mt-1">
            Real-time API throughput, Gemini request volume, user feedback queue, and usage stats
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#15803D] font-mono text-xs rounded-xl font-bold">
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
          <span>System Healthy (0.0.0.0:3000)</span>
        </div>
      </div>

      {/* Analytics KPI Cards */}
      {analytics && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#E8E3D8] p-4 rounded-2xl space-y-1 shadow-xs">
            <div className="flex items-center justify-between text-[#8B8680] text-xs font-bold">
              <span>Total Users</span>
              <Users className="w-4 h-4 text-[#1E1E1E]" />
            </div>
            <div className="text-2xl font-black font-mono text-[#1E1E1E]">{analytics.totalUsers}</div>
          </div>

          <div className="bg-white border border-[#E8E3D8] p-4 rounded-2xl space-y-1 shadow-xs">
            <div className="flex items-center justify-between text-[#8B8680] text-xs font-bold">
              <span>Profiles Analyzed</span>
              <Activity className="w-4 h-4 text-[#22C55E]" />
            </div>
            <div className="text-2xl font-black font-mono text-[#1E1E1E]">{analytics.totalProfilesAnalyzed}</div>
          </div>

          <div className="bg-white border border-[#E8E3D8] p-4 rounded-2xl space-y-1 shadow-xs">
            <div className="flex items-center justify-between text-[#8B8680] text-xs font-bold">
              <span>Gemini API Calls Today</span>
              <Cpu className="w-4 h-4 text-[#1E1E1E]" />
            </div>
            <div className="text-2xl font-black font-mono text-[#1E1E1E]">{analytics.geminiApiRequestsToday}</div>
          </div>

          <div className="bg-white border border-[#E8E3D8] p-4 rounded-2xl space-y-1 shadow-xs">
            <div className="flex items-center justify-between text-[#8B8680] text-xs font-bold">
              <span>Average Portfolio Score</span>
              <BarChart3 className="w-4 h-4 text-[#B45309]" />
            </div>
            <div className="text-2xl font-black font-mono text-[#1E1E1E]">{analytics.averagePortfolioScore} / 100</div>
          </div>
        </div>
      )}

      {/* API Usage Chart */}
      {analytics?.apiUsageHistory && (
        <div className="bg-white border border-[#E8E3D8] rounded-3xl p-5 space-y-4 shadow-xs">
          <h3 className="text-sm font-extrabold text-[#1E1E1E] flex items-center justify-between">
            <span>Gemini API Request Throughput (Last 7 Days)</span>
            <span className="text-xs text-[#8B8680] font-medium">Model: gemini-3.6-flash</span>
          </h3>

          <div className="h-48 my-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.apiUsageHistory}>
                <defs>
                  <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F2C879" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#F2C879" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#8B8680" fontSize={11} />
                <YAxis stroke="#8B8680" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E8E3D8', borderRadius: '12px', color: '#1E1E1E', fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="calls" stroke="#1E1E1E" strokeWidth={2} fillOpacity={1} fill="url(#colorCalls)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* User Feedback Queue & Form */}
      <div className="bg-white border border-[#E8E3D8] rounded-3xl p-5 space-y-4 shadow-xs">
        <h3 className="text-sm font-extrabold text-[#1E1E1E] flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#8B8680]" />
          <span>User Feedback & Audit Reviews ({feedbacks.length})</span>
        </h3>

        {/* Add Feedback Form */}
        <form onSubmit={handleAddFeedback} className="bg-[#F5F1E8] p-4 rounded-2xl border border-[#E8E3D8] space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#1E1E1E]">Submit Application Feedback:</span>
            <div className="flex items-center gap-1 text-[#D97706]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  onClick={() => setNewRating(star)}
                  className={`w-4 h-4 cursor-pointer ${
                    star <= newRating ? 'fill-[#D97706] text-[#D97706]' : 'text-[#8B8680]'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Leave feedback on accuracy, AI insights, or suggested features..."
              className="flex-1 bg-white border border-[#E8E3D8] rounded-xl px-3 py-1.5 text-xs text-[#1E1E1E] placeholder-[#8B8680] focus:outline-none focus:ring-1 focus:ring-[#F2C879]"
            />
            <button
              type="submit"
              className="px-4 py-1.5 bg-[#F2C879] hover:bg-[#e2b765] text-[#1A1A1A] font-extrabold text-xs rounded-xl transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              Submit
            </button>
          </div>
        </form>

        {/* Feedback List */}
        <div className="space-y-2.5">
          {feedbacks.map((item) => (
            <div key={item.id} className="bg-[#F5F1E8] p-3.5 rounded-2xl border border-[#E8E3D8] space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#1E1E1E]">{item.username}</span>
                <div className="flex items-center gap-1 text-[#D97706]">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#D97706] text-[#D97706]" />
                  ))}
                </div>
              </div>
              <p className="text-[#1E1E1E] font-medium leading-relaxed">{item.comment}</p>
              <div className="text-[10px] text-[#8B8680] font-medium">{new Date(item.createdAt).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
