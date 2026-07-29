import React from 'react';
import { ExternalLink, Star, GitFork, BookOpen, Server, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Repository } from '../../types';
import { formatRelativeTime } from '../../utils/dateUtils';

interface RepositoryGridProps {
  repos: Repository[];
  onAnalyzeRepo: (repo: Repository) => void;
  onNavigateTab: (tab: string) => void;
}

export const RepositoryGrid: React.FC<RepositoryGridProps> = ({
  repos,
  onAnalyzeRepo,
  onNavigateTab,
}) => {
  return (
    <div className="bg-white border border-[#E8E3D8] rounded-[20px] p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-[#1E1E1E]">Featured Public Repositories</h2>
          <p className="text-xs text-[#8B8680] font-medium">
            Evaluated with Repository Health Score, README status, stars & deployment status
          </p>
        </div>
        <button
          onClick={() => onNavigateTab('repos')}
          className="px-4 py-2 text-xs font-bold bg-[#F5F1E8] hover:bg-[#E8E3D8] text-[#1E1E1E] rounded-xl border border-[#E8E3D8] transition-colors cursor-pointer"
        >
          View All ({repos.length}) Repositories
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repos.slice(0, 4).map((repo) => {
          const healthScore = repo.completenessScore ?? repo.repoScore ?? 0;
          const isDeployed = Boolean(repo.deploymentUrl);
          const hasLicense = Boolean(repo.hasLicense);
          const lastCommitText = repo.updatedAt
            ? `Updated ${formatRelativeTime(repo.updatedAt)}`
            : 'Recently updated';

          return (
            <div
              key={repo.id}
              className="bg-[#F5F1E8] border border-[#E8E3D8] hover:border-[#F2C879] rounded-[16px] p-4 transition-all space-y-3 flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <a
                    href={repo.htmlUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-extrabold text-sm text-[#1E1E1E] hover:underline flex items-center gap-1.5 line-clamp-1"
                  >
                    {repo.name}
                    <ExternalLink className="w-3.5 h-3.5 text-[#8B8680]" />
                  </a>

                  {/* Repository Health Score Badge */}
                  <span
                    className={`px-2.5 py-0.5 text-[10px] font-extrabold border rounded-full shrink-0 ${
                      healthScore >= 80
                        ? 'bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/30'
                        : healthScore >= 60
                        ? 'bg-[#F2C879]/20 text-[#B45309] border-[#F2C879]/50'
                        : 'bg-rose-50 text-rose-700 border-rose-200'
                    }`}
                  >
                    Health: {healthScore}/100
                  </span>
                </div>

                <p className="text-xs text-[#8B8680] font-medium line-clamp-2 leading-relaxed">
                  {repo.description || 'No description provided for this repository.'}
                </p>

                {/* Primary Language, Stars, Forks & Last Commit */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#8B8680] font-semibold pt-1">
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-white text-[#1E1E1E] border border-[#E8E3D8] rounded-md">
                    {repo.language || 'TypeScript'}
                  </span>
                  <span className="flex items-center gap-1 text-[#1E1E1E]">
                    <Star className="w-3.5 h-3.5 fill-[#F2C879] text-[#F2C879]" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1 text-[#1E1E1E]">
                    <GitFork className="w-3.5 h-3.5" />
                    {repo.forks}
                  </span>
                  <span className="text-[11px] text-[#8B8680] font-medium">{lastCommitText}</span>
                </div>

                {/* Status Badges Row: README, Deployment, License */}
                <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold pt-1">
                  <span className="px-2 py-0.5 rounded-md bg-white border border-[#E8E3D8] text-[#1E1E1E] flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#22C55E]" />
                    <span>{repo.hasReadme ? 'README Found' : 'README Missing'}</span>
                  </span>

                  <span
                    className={`px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                      isDeployed
                        ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30'
                        : 'bg-white text-[#8B8680] border-[#E8E3D8]'
                    }`}
                  >
                    <Server className="w-3 h-3" />
                    <span>{isDeployed ? 'Deployed' : 'Local App'}</span>
                  </span>

                  <span className="px-2 py-0.5 rounded-md bg-white border border-[#E8E3D8] text-[#1E1E1E] flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#22C55E]" />
                    <span>{hasLicense ? 'License Found' : 'No License'}</span>
                  </span>
                </div>
              </div>

              {/* Inspect Button Footer */}
              <div className="pt-3 border-t border-[#E8E3D8] flex items-center justify-between">
                <span className="text-[11px] text-[#8B8680] font-medium">
                  Branch: {repo.defaultBranch || 'main'}
                </span>
                <button
                  onClick={() => onAnalyzeRepo(repo)}
                  className="px-3.5 py-1.5 text-xs bg-[#F2C879] text-[#1A1A1A] font-bold rounded-xl hover:bg-[#e2b765] transition-colors cursor-pointer shadow-xs flex items-center gap-1"
                >
                  <span>Inspect Repository</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
