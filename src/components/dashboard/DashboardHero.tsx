import React from 'react';
import { Sparkles, Zap, ShieldCheck, Clock, FileText, Rocket } from 'lucide-react';
import { GitHubProfile, LatestActivity, OverallPortfolioScore, Repository } from '../../types';
import { formatRelativeTime } from '../../utils/dateUtils';

interface DashboardHeroProps {
  profile: GitHubProfile | null;
  portfolioScore: OverallPortfolioScore | null;
  repos: Repository[];
  latestActivity: LatestActivity | null;
  onNavigateTab: (tab: string) => void;
}

export const DashboardHero: React.FC<DashboardHeroProps> = ({
  profile,
  portfolioScore,
  repos,
  latestActivity,
  onNavigateTab,
}) => {
  const totalRepos = repos.length;
  const score = portfolioScore?.totalScore ?? 0;
  const grade = portfolioScore?.letterGrade ?? '—';
  const readmeCount = repos.filter((repo) => repo.hasReadme).length;
  const deployedCount = repos.filter((repo) => repo.hasPages || repo.deploymentUrl).length;
  const percentage = (count: number) => totalRepos ? ((count / totalRepos) * 100).toFixed(1) : '0.0';

  return (
    <div className="bg-white border border-[#E8E3D8] rounded-[20px] p-6 sm:p-8 shadow-xs relative overflow-hidden">
      <div className="space-y-6">
        {/* Top Welcome Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2C879]/30 text-[#1E1E1E] text-xs font-bold border border-[#F2C879]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI GitHub Analyzer v2.5 Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1E1E1E] tracking-tight">
              {profile ? `Welcome back, ${profile.name || profile.username}! 👋` : 'Search a GitHub username to begin'}
            </h1>
            <p className="text-xs sm:text-sm text-[#8B8680] font-medium">
              Real-time repository health, continuous code audit, and engineering portfolio analytics.
            </p>
          </div>

          {/* Quick Action Button */}
          <button
            onClick={() => onNavigateTab('ai-report')}
            disabled={!profile}
            className="px-4 py-2.5 bg-[#1A1A1A] hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Zap className="w-4 h-4 text-[#F2C879] fill-current" />
            <span>Full AI Portfolio Audit</span>
          </button>
        </div>

        {/* Compact Portfolio Summary Widgets */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-[#E8E3D8]">
          {/* Widget 1: Portfolio Health Score */}
          <div className="bg-[#F5F1E8] border border-[#E8E3D8] rounded-2xl p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#8B8680] font-bold">
              <span>Portfolio Health Score</span>
              <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-[#1E1E1E]">{score}</span>
              <span className="text-xs font-bold text-[#22C55E]">
                /100 ({grade})
              </span>
            </div>
            <div className="w-full h-1.5 bg-white rounded-full overflow-hidden border border-[#E8E3D8] mt-2">
              <div
                className="h-full bg-[#22C55E] rounded-full transition-all duration-500"
                style={{ width: `${score}%` }}
              ></div>
            </div>
          </div>

          {/* Widget 2: README Coverage */}
          <div className="bg-[#F5F1E8] border border-[#E8E3D8] rounded-2xl p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#8B8680] font-bold">
              <span>README Coverage</span>
              <FileText className="w-4 h-4 text-[#1E1E1E]" />
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-[#1E1E1E]">{readmeCount} / {totalRepos}</span>
              <span className="text-xs font-bold text-[#8B8680]">Repositories</span>
            </div>
            <div className="text-[10px] text-[#22C55E] font-bold mt-1">
              {percentage(readmeCount)}% coverage
            </div>
          </div>

          {/* Widget 3: Deployment Coverage */}
          <div className="bg-[#F5F1E8] border border-[#E8E3D8] rounded-2xl p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#8B8680] font-bold">
              <span>Deployment Coverage</span>
              <Rocket className="w-4 h-4 text-[#D97706]" />
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-[#1E1E1E]">{deployedCount} / {totalRepos}</span>
              <span className="text-xs font-bold text-[#8B8680]">Repositories</span>
            </div>
            <div className="text-[10px] text-[#D97706] font-bold mt-1">
              {percentage(deployedCount)}% deployed
            </div>
          </div>

          {/* Widget 4: Latest GitHub Activity */}
          <div className="bg-[#1A1A1A] text-white border border-[#1A1A1A] rounded-2xl p-3.5 flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#F2C879] font-bold">
              <span>Latest GitHub Activity</span>
              <Clock className="w-4 h-4 text-[#F2C879]" />
            </div>
            {latestActivity ? (
              <div className="mt-2 min-w-0">
                <span className="text-sm font-black text-white block truncate" title={latestActivity.repoName}>{latestActivity.repoName}</span>
                <span className="text-[11px] text-gray-300 truncate block font-medium" title={latestActivity.commitMessage}>{latestActivity.commitMessage}</span>
                <span className="text-[10px] text-[#F2C879] font-bold mt-1 block">{formatRelativeTime(latestActivity.updatedAt)}</span>
              </div>
            ) : (
              <span className="mt-2 text-xs text-gray-300 font-medium">{profile ? 'No public commit history found' : 'Search to load activity'}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
