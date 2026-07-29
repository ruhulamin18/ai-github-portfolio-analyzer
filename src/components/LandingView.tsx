import React, { useState } from 'react';
import {
  Github,
  Search,
  Sparkles,
  ShieldCheck,
  BarChart3,
  FileCode2,
  Briefcase,
  ArrowRight,
  Cpu,
  Key,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Lock,
  Zap,
  Info,
} from 'lucide-react';

interface LandingViewProps {
  onSearch: (username: string) => void;
  customToken?: string;
  onUpdateToken?: (token: string) => void;
}

const SAMPLE_USERS = [
  { username: 'torvalds', name: 'Linus Torvalds', role: 'Creator of Linux & Git', avatar: 'https://github.com/torvalds.png' },
  { username: 'gaearon', name: 'Dan Abramov', role: 'Co-creator of Redux', avatar: 'https://github.com/gaearon.png' },
  { username: 'yyx99', name: 'Evan You', role: 'Creator of Vue.js & Vite', avatar: 'https://github.com/yyx99.png' },
  { username: 'shadcn', name: 'shadcn', role: 'Creator of shadcn/ui', avatar: 'https://github.com/shadcn.png' },
  { username: 'sundarpichai', name: 'Sundar Pichai', role: 'CEO, Google & Alphabet', avatar: 'https://github.com/sundarpichai.png' },
];

export function LandingView({ onSearch, customToken = '', onUpdateToken }: LandingViewProps) {
  const [inputVal, setInputVal] = useState('');
  const [tokenInput, setTokenInput] = useState(customToken);
  const [isTokenSaved, setIsTokenSaved] = useState(Boolean(customToken));
  const [showTokenHelp, setShowTokenHelp] = useState(false);

  const normalizeUsername = (val: string) => {
    const trimmed = val.trim();
    try {
      const url = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
      if (url.hostname === 'github.com' || url.hostname === 'www.github.com') {
        return url.pathname.split('/').filter(Boolean)[0] || '';
      }
    } catch {
      // Plain string
    }
    return trimmed.replace(/^@/, '').replace(/^github\.com\//i, '').split('/')[0];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = normalizeUsername(inputVal);
    if (clean) {
      onSearch(clean);
    }
  };

  const handleSaveToken = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = tokenInput.trim();
    if (onUpdateToken) {
      onUpdateToken(cleaned);
      setIsTokenSaved(Boolean(cleaned));
    }
  };

  const handleClearToken = () => {
    setTokenInput('');
    if (onUpdateToken) {
      onUpdateToken('');
      setIsTokenSaved(false);
    }
  };

  return (
    <div className="w-full space-y-6 py-2">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white border border-[#E8E3D8] rounded-[28px] p-6 sm:p-10 shadow-sm">
        {/* Background decorative ambient glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#F2C879]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#22C55E]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header inside Hero Box */}
        <div className="relative z-10 flex items-center justify-between pb-6 mb-4 border-b border-[#E8E3D8]/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#F2C879] flex items-center justify-center text-[#1A1A1A] font-bold shadow-2xs shrink-0">
              <Github className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-black text-[#1E1E1E] tracking-tight">
                AI GitHub Analyzer
              </span>
              <span className="px-2 py-0.5 bg-[#FDE8C7] text-[#1E1E1E] border border-[#F2C879] text-[10px] font-black rounded-full uppercase tracking-wider">
                PRO
              </span>
            </div>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F1E8] border border-[#E8E3D8] text-xs font-bold text-[#1E1E1E]">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706] animate-pulse" />
            <span>AI Audit Engine</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
            <span className="text-[10px] text-[#8B8680] uppercase tracking-wider font-extrabold">v2.5</span>
          </div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6 py-2">
          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl font-black text-[#1E1E1E] tracking-tight leading-[1.15]">
            Transform Your GitHub Into a <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#1E1E1E] via-[#D97706] to-[#1E1E1E] bg-clip-text text-transparent">
              Job-Ready Engineering Portfolio
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[#8B8680] font-medium leading-relaxed max-w-2xl mx-auto">
            Evaluate your public repositories with our strict <span className="text-[#1E1E1E] font-bold">11-Metric Health Formula</span>. Get instant Gemini AI feedback, role-based skill gap benchmarks, and ATS resume matching.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSubmit} className="pt-2 max-w-xl mx-auto">
            <div className="relative flex items-center shadow-md rounded-2xl overflow-hidden transition-all focus-within:ring-2 focus-within:ring-[#F2C879] border border-[#E8E3D8] bg-[#F5F1E8]">
              <div className="pl-4 pr-2 text-[#8B8680] flex items-center justify-center">
                <Github className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Enter GitHub username or URL (e.g. torvalds, octocat)"
                className="w-full py-4 pr-32 text-xs sm:text-sm bg-transparent text-[#1E1E1E] placeholder-[#8B8680] focus:outline-none font-medium"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-5 py-2.5 text-xs font-extrabold bg-[#1A1A1A] hover:bg-black text-white rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-2 group"
              >
                <span>Analyze Now</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </form>

          {/* Example Profiles */}
          <div className="pt-2 flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-[#8B8680] uppercase tracking-wider">
              Or analyze famous developer profiles:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {SAMPLE_USERS.map((user) => (
                <button
                  key={user.username}
                  type="button"
                  onClick={() => onSearch(user.username)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#F5F1E8] hover:bg-[#E8E3D8] text-[#1E1E1E] rounded-xl border border-[#E8E3D8] transition-all cursor-pointer text-xs font-bold shadow-2xs group"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-5 h-5 rounded-full object-cover border border-white"
                  />
                  <span>@{user.username}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* GitHub Personal Access Token (PAT) Settings - Dedicated Box */}
      <div className="bg-white border border-[#E8E3D8] rounded-[24px] p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E3D8] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F2C879]/20 border border-[#F2C879] flex items-center justify-center text-[#D97706] shrink-0">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-[#1E1E1E]">
                  GitHub Personal Access Token (PAT)
                </h3>
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 bg-[#F5F1E8] border border-[#E8E3D8] text-[#8B8680] rounded-full">
                  Optional
                </span>
              </div>
              <p className="text-xs text-[#8B8680] font-medium">
                Higher API rate limits (5,000 requests/hr) for deep scanning of large accounts and workflows.
              </p>
            </div>
          </div>

          {/* Active Status Badge */}
          <div className="flex items-center gap-2">
            {isTokenSaved ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#15803D] text-xs font-extrabold">
                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                <span>Token Active (5,000 req/hr)</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5F1E8] border border-[#E8E3D8] text-[#8B8680] text-xs font-bold">
                <AlertTriangle className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Public Rate Limit (60 req/hr)</span>
              </span>
            )}
          </div>
        </div>

        {/* Token Input Form */}
        <form onSubmit={handleSaveToken} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B8680]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="Paste GitHub Personal Access Token (ghp_... or github_pat_...)"
                className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-[#F5F1E8] border border-[#E8E3D8] rounded-xl text-[#1E1E1E] placeholder-[#8B8680] font-mono focus:outline-none focus:ring-2 focus:ring-[#F2C879] focus:bg-white transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="px-5 py-3 text-xs font-extrabold bg-[#1A1A1A] hover:bg-black text-white rounded-xl transition-all cursor-pointer shadow-xs flex items-center justify-center gap-2 shrink-0"
              >
                <Zap className="w-4 h-4 text-[#F2C879]" />
                <span>{isTokenSaved ? 'Update Token' : 'Save Token'}</span>
              </button>
              {tokenInput && (
                <button
                  type="button"
                  onClick={handleClearToken}
                  className="px-4 py-3 text-xs font-bold text-[#8B8680] hover:text-[#1E1E1E] bg-[#F5F1E8] hover:bg-[#E8E3D8] border border-[#E8E3D8] rounded-xl transition-colors cursor-pointer shrink-0"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#8B8680]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
              <span className="font-medium">100% Client-Side Privacy: Token is stored securely in browser local storage only.</span>
            </div>

            <button
              type="button"
              onClick={() => setShowTokenHelp(!showTokenHelp)}
              className="font-bold text-[#1E1E1E] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Info className="w-3.5 h-3.5 text-[#D97706]" />
              <span>How to create a GitHub token?</span>
            </button>
          </div>
        </form>

        {/* Step-by-Step Token Creation Guide */}
        {showTokenHelp && (
          <div className="pt-4 border-t border-[#E8E3D8] bg-[#F5F1E8]/60 p-4 rounded-2xl space-y-3 text-xs text-[#1E1E1E]">
            <div className="font-extrabold flex items-center justify-between">
              <span>Steps to generate a free GitHub Fine-grained or Classic Token:</span>
              <a
                href="https://github.com/settings/tokens"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[#D97706] hover:underline font-bold"
              >
                <span>Open GitHub Token Settings</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-[#8B8680] font-medium">
              <li>Go to <strong className="text-[#1E1E1E]">GitHub Settings &gt; Developer Settings &gt; Personal Access Tokens</strong>.</li>
              <li>Click <strong className="text-[#1E1E1E]">Generate new token (Fine-grained or Classic)</strong>.</li>
              <li>Select read-only access for <strong className="text-[#1E1E1E]">public_repo</strong> and <strong className="text-[#1E1E1E]">read:user</strong>.</li>
              <li>Copy the generated token string and paste it into the box above.</li>
            </ol>
          </div>
        )}
      </div>

      {/* Feature Pillars Grid */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-[#1E1E1E] tracking-tight">
            Comprehensive Developer Analysis Engine
          </h2>
          <p className="text-xs sm:text-sm text-[#8B8680] font-medium">
            Everything recruiters and engineering managers evaluate, aggregated into one dynamic audit dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-white border border-[#E8E3D8] rounded-2xl p-5 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#F2C879]/20 border border-[#F2C879]/40 flex items-center justify-center text-[#D97706]">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-[#1E1E1E]">11-Metric Health Score</h3>
              <p className="text-xs text-[#8B8680] font-medium leading-relaxed">
                Evaluates Repository Quality (15%), README depth (15%), Documentation (10%), Live Deployments (10%), CI/CD (5%), and Open Source Licenses.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E8E3D8] flex items-center justify-between text-[11px] font-extrabold text-[#1E1E1E]">
              <span>Weighted Formula</span>
              <span className="text-[#22C55E]">Strict 0-100 Rating</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-[#E8E3D8] rounded-2xl p-5 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#16A34A]">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-[#1E1E1E]">Gemini AI Audit</h3>
              <p className="text-xs text-[#8B8680] font-medium leading-relaxed">
                Generates repository-specific strengths, missing licenses, critical security fixes, and a step-by-step career action plan.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E8E3D8] flex items-center justify-between text-[11px] font-extrabold text-[#1E1E1E]">
              <span>Powered by Gemini 2.5</span>
              <span className="text-[#D97706]">Repo-Specific</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-[#E8E3D8] rounded-2xl p-5 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/15 border border-[#3B82F6]/30 flex items-center justify-center text-[#2563EB]">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-[#1E1E1E]">Skill Gap Analyzer</h3>
              <p className="text-xs text-[#8B8680] font-medium leading-relaxed">
                Benchmark your codebase against job requirements for Senior Frontend, Full Stack, Backend, DevOps, or AI Engineer roles.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E8E3D8] flex items-center justify-between text-[11px] font-extrabold text-[#1E1E1E]">
              <span>Role Benchmarks</span>
              <span className="text-[#2563EB]">5 Target Paths</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-[#E8E3D8] rounded-2xl p-5 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#7C3AED]">
                <FileCode2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-[#1E1E1E]">ATS Resume Matcher</h3>
              <p className="text-xs text-[#8B8680] font-medium leading-relaxed">
                Paste your resume text to match repository technologies against resume claims and uncover missing skills.
              </p>
            </div>
            <div className="pt-3 border-t border-[#E8E3D8] flex items-center justify-between text-[11px] font-extrabold text-[#1E1E1E]">
              <span>ATS Keyword Match</span>
              <span className="text-[#7C3AED]">Instant Alignment</span>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white border border-[#E8E3D8] rounded-[24px] p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E3D8] pb-4">
          <div>
            <h3 className="text-lg font-black text-[#1E1E1E]">How The Audit Works</h3>
            <p className="text-xs text-[#8B8680] font-medium">
              3-step automated pipeline connecting real-time GitHub APIs to AI evaluation.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#8B8680] bg-[#F5F1E8] px-3 py-1.5 rounded-xl border border-[#E8E3D8]">
            <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
            <span>100% Read-Only & Safe</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2 relative">
            <div className="w-8 h-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center font-black text-xs">
              1
            </div>
            <h4 className="text-sm font-extrabold text-[#1E1E1E]">Enter Any GitHub Handle</h4>
            <p className="text-xs text-[#8B8680] font-medium leading-relaxed">
              No login required. Works with any public GitHub profile handle or URL.
            </p>
          </div>

          <div className="space-y-2 relative">
            <div className="w-8 h-8 rounded-full bg-[#D97706] text-white flex items-center justify-center font-black text-xs">
              2
            </div>
            <h4 className="text-sm font-extrabold text-[#1E1E1E]">Multi-Vector Deep Scan</h4>
            <p className="text-xs text-[#8B8680] font-medium leading-relaxed">
              Fetches commit activity, repository metadata, licenses, workflows, READMEs, and live deployment URLs.
            </p>
          </div>

          <div className="space-y-2 relative">
            <div className="w-8 h-8 rounded-full bg-[#22C55E] text-white flex items-center justify-center font-black text-xs">
              3
            </div>
            <h4 className="text-sm font-extrabold text-[#1E1E1E]">Instant Interactive Audit</h4>
            <p className="text-xs text-[#8B8680] font-medium leading-relaxed">
              Explore your overall score breakdown, AI recommendations, skill gaps, and export an audit report.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
