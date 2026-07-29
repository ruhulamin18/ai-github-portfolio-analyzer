import React, { useState } from 'react';

function formatRelativeTime(dateString?: string): string {
  if (!dateString) return 'Recently';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Recently';

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 0 || diffInSeconds < 60) return 'Just now';
  const mins = Math.floor(diffInSeconds / 60);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(months / 12);
  return `${years}y ago`;
}
import {
  Search,
  Filter,
  FileCode2,
  FolderTree,
  FileCheck,
  ShieldCheck,
  Play,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Sparkles,
  BookOpen,
  GitBranch,
  Layers,
  Zap,
} from 'lucide-react';
import { Repository } from '../types';

interface RepoAnalysisViewProps {
  repos: Repository[];
  onAnalyzeRepo: (repo: Repository) => void;
}

export const RepoAnalysisView: React.FC<RepoAnalysisViewProps> = ({
  repos,
  onAnalyzeRepo,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [selectedRepoModal, setSelectedRepoModal] = useState<Repository | null>(null);

  const languages = ['All', ...Array.from(new Set(repos.map((r) => r.language).filter(Boolean)))];

  const filteredRepos = repos.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLang = selectedLanguage === 'All' || r.language === selectedLanguage;
    return matchesSearch && matchesLang;
  });

  return (
    <div className="space-y-6 font-sans text-[#1E1E1E]">
      
      {/* Header & Filter Controls */}
      <div className="bg-white border border-[#E8E3D8] rounded-[20px] p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-[#1E1E1E] flex items-center gap-2">
              <FolderTree className="w-5 h-5 text-[#1E1E1E]" />
              <span>Repository Architecture & README Analyzer</span>
            </h2>
            <p className="text-xs text-[#8B8680] font-medium mt-1">
              Evaluating repository completeness, README score, directory hygiene, CI/CD, and open source files
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold bg-[#F5F1E8] px-3.5 py-2 rounded-xl border border-[#E8E3D8]">
            <span className="text-[#8B8680]">Total Evaluated:</span>
            <span className="text-[#1E1E1E] font-black">{repos.length} Repos</span>
          </div>
        </div>

        {/* Search & Language Filters */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8B8680] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search repositories by name or topic..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-[#F5F1E8] border border-[#E8E3D8] rounded-xl text-[#1E1E1E] placeholder-[#8B8680] focus:outline-none focus:ring-1 focus:ring-[#F2C879]"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#8B8680]" />
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3.5 py-2 text-xs bg-[#F5F1E8] border border-[#E8E3D8] rounded-xl text-[#1E1E1E] font-semibold focus:outline-none focus:ring-1 focus:ring-[#F2C879]"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Repositories Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredRepos.map((repo) => {
          const healthScore = repo.completenessScore ?? repo.repoScore ?? 0;
          const readmeScore = repo.readmeScore ?? 0;
          const isDeployed = Boolean(repo.deploymentUrl);
          const hasLicense = Boolean(repo.hasLicense);
          const lastCommitText = repo.updatedAt ? `Updated ${formatRelativeTime(repo.updatedAt)}` : 'Recently updated';

          return (
            <div
              key={repo.id}
              className="bg-white border border-[#E8E3D8] hover:border-[#F2C879] rounded-[20px] p-5 space-y-4 transition-all flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <a
                      href={repo.htmlUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-extrabold text-base text-[#1E1E1E] hover:underline flex items-center gap-1.5"
                    >
                      {repo.name}
                      <ExternalLink className="w-3.5 h-3.5 text-[#8B8680]" />
                    </a>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2.5 py-0.5 text-[10px] font-bold bg-[#F5F1E8] text-[#1E1E1E] border border-[#E8E3D8] rounded-full">
                        {repo.language || 'Unknown'}
                      </span>
                      <span className="text-[11px] text-[#8B8680] font-medium">
                        Branch: {repo.defaultBranch || 'main'}
                      </span>
                    </div>
                  </div>

                  {/* Health Score Badge */}
                  <span
                    className={`px-2.5 py-1 text-xs font-extrabold border rounded-xl shrink-0 ${
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

                <p className="text-xs text-[#8B8680] font-medium leading-relaxed line-clamp-2">
                  {repo.description || 'No description provided for this repository.'}
                </p>

                {/* Stars, Forks & Last Commit */}
                <div className="flex items-center gap-4 text-xs font-semibold text-[#1E1E1E] bg-[#F5F1E8] p-2.5 rounded-xl border border-[#E8E3D8]">
                  <span className="flex items-center gap-1">
                    <span className="text-[#F2C879]">â˜…</span>
                    <span>{repo.stars} Stars</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <GitBranch className="w-3.5 h-3.5 text-[#8B8680]" />
                    <span>{repo.forks} Forks</span>
                  </span>
                  <span className="text-[#8B8680] text-[11px] ml-auto">
                    {lastCommitText}
                  </span>
                </div>

                {/* Score Indicators */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="bg-[#F5F1E8] p-3 rounded-xl border border-[#E8E3D8]">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#8B8680] mb-1">
                      <span>README Quality</span>
                      <span className="text-[#22C55E]">{readmeScore}/100</span>
                    </div>
                    <div className="w-full h-1.5 bg-white rounded-full overflow-hidden border border-[#E8E3D8]">
                      <div
                        className="h-full bg-[#22C55E]"
                        style={{ width: `${readmeScore}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-[#F5F1E8] p-3 rounded-xl border border-[#E8E3D8]">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#8B8680] mb-1">
                      <span>Repository Health</span>
                      <span className="text-[#1E1E1E]">{healthScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white rounded-full overflow-hidden border border-[#E8E3D8]">
                      <div
                        className="h-full bg-[#F2C879]"
                        style={{ width: `${healthScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Status Badges Row */}
                <div className="flex flex-wrap gap-2 text-[11px] pt-1 font-bold">
                  <span
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border ${
                      hasLicense
                        ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30'
                        : 'bg-[#F5F1E8] text-[#8B8680] border-[#E8E3D8]'
                    }`}
                  >
                    {hasLicense ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    {hasLicense ? 'License Found' : 'No License'}
                  </span>

                  <span
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border ${
                      repo.hasWorkflows
                        ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30'
                        : 'bg-[#F5F1E8] text-[#8B8680] border-[#E8E3D8]'
                    }`}
                  >
                    {repo.hasWorkflows ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    CI/CD Active
                  </span>

                  <span
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border ${
                      isDeployed
                        ? 'bg-[#F2C879]/30 text-[#1E1E1E] border-[#F2C879]'
                        : 'bg-[#F5F1E8] text-[#8B8680] border-[#E8E3D8]'
                    }`}
                  >
                    {isDeployed ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    {isDeployed ? 'Live Deployed' : 'Local App'}
                  </span>
                </div>
              </div>

              {/* Card Footer Action Button */}
              <div className="pt-3 border-t border-[#E8E3D8] flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#8B8680]">
                  Evaluated from GitHub repository metadata
                </span>
                <button
                  onClick={() => setSelectedRepoModal(repo)}
                  className="px-4 py-2 text-xs font-bold bg-[#F2C879] hover:bg-[#e2b765] text-[#1A1A1A] rounded-xl transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Inspect Repository</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Repository Detail Inspection Modal */}
      {selectedRepoModal && (
        <div className="fixed inset-0 z-50 bg-[#1A1A1A]/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#E8E3D8] rounded-[24px] max-w-2xl w-full p-6 space-y-6 relative max-h-[90vh] overflow-y-auto shadow-2xl">
            
            <div className="flex items-start justify-between border-b border-[#E8E3D8] pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-[#1E1E1E] flex items-center gap-2">
                  <span>{selectedRepoModal.name}</span>
                  <span className="text-xs font-bold text-[#1E1E1E] bg-[#F2C879]/40 border border-[#F2C879] px-2.5 py-0.5 rounded-full">
                    {selectedRepoModal.language || 'TypeScript'}
                  </span>
                </h3>
                <p className="text-xs text-[#8B8680] font-medium mt-1">{selectedRepoModal.fullName}</p>
              </div>
              <button
                onClick={() => setSelectedRepoModal(null)}
                className="text-[#8B8680] hover:text-[#1E1E1E] text-lg font-bold p-1 cursor-pointer"
              >
                âœ•
              </button>
            </div>

            {/* README Evaluation Checklist */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#1E1E1E] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#22C55E]" />
                <span>README Checklist & Evaluation</span>
              </h4>

              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <div className="bg-[#F5F1E8] p-3 rounded-xl border border-[#E8E3D8] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                  <span>{selectedRepoModal.description !== 'No description provided.' ? 'Project description found' : 'Project description missing'}</span>
                </div>
                <div className="bg-[#F5F1E8] p-3 rounded-xl border border-[#E8E3D8] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                  <span>{selectedRepoModal.hasReadme ? 'README found' : 'README missing'}</span>
                </div>
                <div className="bg-[#F5F1E8] p-3 rounded-xl border border-[#E8E3D8] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                  <span>{selectedRepoModal.language || 'Primary language unknown'}</span>
                </div>
                <div className="bg-[#F5F1E8] p-3 rounded-xl border border-[#E8E3D8] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                  <span>{selectedRepoModal.deploymentUrl || selectedRepoModal.hasPages ? 'Deployment link found' : 'Deployment link missing'}</span>
                </div>
                <div className="bg-[#F5F1E8] p-3 rounded-xl border border-[#E8E3D8] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                  <span>{selectedRepoModal.hasLicense ? 'License found' : 'License missing'}</span>
                </div>
                <div className="bg-[#F5F1E8] p-3 rounded-xl border border-[#E8E3D8] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                  <span>{selectedRepoModal.hasWorkflows ? 'CI workflow found' : 'CI workflow missing'}</span>
                </div>
              </div>
            </div>

            {/* Structure & Architecture Insights */}
            <div className="bg-[#F5F1E8] border border-[#E8E3D8] p-4 rounded-2xl space-y-2">
              <h5 className="text-xs font-bold text-[#1E1E1E] uppercase tracking-wider">Directory Structure Assessment</h5>
              <p className="text-xs text-[#8B8680] font-medium leading-relaxed">
                {selectedRepoModal.organizationScore !== undefined
                  ? `Repository organization score is ${selectedRepoModal.organizationScore}/100 based on source directories, .gitignore, and contributing file evidence.`
                  : 'Repository organization evidence was not available from GitHub tree metadata.'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E8E3D8]">
              <button
                onClick={() => setSelectedRepoModal(null)}
                className="px-4 py-2 text-xs font-bold bg-[#F5F1E8] hover:bg-[#E8E3D8] text-[#1E1E1E] rounded-xl border border-[#E8E3D8] transition-colors cursor-pointer"
              >
                Close
              </button>
              <a
                href={selectedRepoModal.htmlUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 text-xs bg-[#F2C879] hover:bg-[#e2b765] text-[#1A1A1A] font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
              >
                View on GitHub
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
