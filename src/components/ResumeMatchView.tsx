import React, { useState } from 'react';
import {
  FileCheck2,
  Upload,
  Sparkles,
  CheckCircle2,
  XCircle,
  FileText,
  AlertCircle,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { ResumeMatchResult, Repository } from '../types';

interface ResumeMatchViewProps {
  repos: Repository[];
  onMatchResume: (resumeText: string) => void;
  matchResult: ResumeMatchResult | null;
  loading: boolean;
}

export const ResumeMatchView: React.FC<ResumeMatchViewProps> = ({
  repos,
  onMatchResume,
  matchResult,
  loading,
}) => {
  const [resumeText, setResumeText] = useState(
    `SOFTWARE ENGINEER
Full Stack Developer experienced in TypeScript, React, Node.js, Express, Docker, PostgreSQL, microservices architecture, and cloud deployments on AWS.`
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const text = evt.target?.result as string;
        if (text) {
          setResumeText(text);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resumeText.trim()) {
      onMatchResume(resumeText.trim());
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white border border-[#E8E3D8] rounded-3xl p-6 space-y-4 shadow-xs">
        <div>
          <h2 className="text-xl font-extrabold text-[#1E1E1E] flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-[#1E1E1E]" />
            <span>AI Resume vs. GitHub Portfolio Consistency Matcher</span>
          </h2>
          <p className="text-xs text-[#8B8680] font-medium mt-1">
            Auditors and technical recruiters cross-verify resume skill claims against public GitHub proof.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#1E1E1E]">Paste Resume Text or Upload Resume File:</span>
            <label className="cursor-pointer text-[#1E1E1E] hover:underline flex items-center gap-1 font-bold">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload (.txt, .md, .pdf)</span>
              <input
                type="file"
                accept=".txt,.md,.pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          <textarea
            rows={5}
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your full resume summary, technical skills section, or project experience bullet points..."
            className="w-full p-3.5 text-xs bg-[#F5F1E8] border border-[#E8E3D8] rounded-2xl text-[#1E1E1E] placeholder-[#8B8680] focus:outline-none focus:ring-2 focus:ring-[#F2C879] focus:bg-white font-mono leading-relaxed"
          ></textarea>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || !resumeText.trim()}
              className="px-5 py-2.5 bg-[#F2C879] hover:bg-[#e2b765] text-[#1A1A1A] font-extrabold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {loading ? 'Matching with Gemini...' : 'Analyze Resume Consistency'}
            </button>
          </div>
        </form>
      </div>

      {/* Analysis Results */}
      {loading ? (
        <div className="bg-white border border-[#E8E3D8] rounded-3xl p-12 text-center space-y-3 shadow-xs">
          <RefreshCw className="w-8 h-8 text-[#1E1E1E] animate-spin mx-auto" />
          <p className="text-xs font-bold text-[#8B8680]">Auditing resume claims against {repos.length} GitHub repositories...</p>
        </div>
      ) : matchResult ? (
        <div className="space-y-6">
          
          {/* Consistency Score Banner */}
          <div className="bg-white border border-[#E8E3D8] rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-[#8B8680]">
                Portfolio Consistency Score
              </div>
              <h3 className="text-2xl font-black text-[#1E1E1E] flex items-center gap-3">
                <span className="text-[#22C55E] font-mono">{matchResult.matchScore}% Match</span>
                <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-[#F2C879]/30 text-[#1E1E1E] border border-[#F2C879] rounded-full">
                  Consistency: {matchResult.portfolioConsistencyRating}
                </span>
              </h3>
              <p className="text-xs text-[#8B8680] font-medium">
                Measures how closely claims made in your resume match verifiable code in public repositories.
              </p>
            </div>

            <div className="w-full md:w-64 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#8B8680]">Verification Rate</span>
                <span className="text-[#22C55E] font-bold">{matchResult.matchScore}%</span>
              </div>
              <div className="w-full h-3 bg-[#F5F1E8] rounded-full border border-[#E8E3D8] overflow-hidden">
                <div
                  className="h-full bg-[#22C55E] transition-all duration-500"
                  style={{ width: `${matchResult.matchScore}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Side by Side Skills Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Skills Verified on Both */}
            <div className="bg-white border border-[#E8E3D8] rounded-3xl p-5 space-y-3 shadow-xs">
              <h3 className="text-sm font-extrabold text-[#22C55E] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Skills (On Resume & GitHub)</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {matchResult.matchingSkills.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 text-xs font-bold bg-[#22C55E]/10 text-[#15803D] border border-[#22C55E]/20 rounded-xl flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#22C55E]" />
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Claimed on Resume but missing on GitHub */}
            <div className="bg-white border border-[#E8E3D8] rounded-3xl p-5 space-y-3 shadow-xs">
              <h3 className="text-sm font-extrabold text-[#D97706] flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>On Resume but Unverified on GitHub</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {matchResult.skillsInResumeNotInGithub.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 text-xs font-bold bg-[#F2C879]/30 text-[#B45309] border border-[#F2C879] rounded-xl flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3 text-[#D97706]" />
                    {s}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Missing Projects Recommendations */}
          <div className="bg-white border border-[#E8E3D8] rounded-3xl p-5 space-y-3 shadow-xs">
            <h3 className="text-sm font-extrabold text-[#1E1E1E] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8B8680]" />
              <span>Recommended GitHub Projects to Prove Resume Claims</span>
            </h3>

            <div className="space-y-2">
              {matchResult.missingProjectsSuggestions.map((proj, idx) => (
                <div
                  key={idx}
                  className="bg-[#F5F1E8] p-3.5 rounded-2xl border border-[#E8E3D8] text-xs text-[#1E1E1E] font-medium flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-[#F2C879] text-[#1A1A1A] font-mono text-[10px] font-black flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{proj}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : null}

    </div>
  );
};
