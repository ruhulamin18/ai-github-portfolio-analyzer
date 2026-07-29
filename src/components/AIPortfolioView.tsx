import React, { useState } from 'react';
import {
  BrainCircuit,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Zap,
  TrendingUp,
  ShieldAlert,
  ListOrdered,
  RefreshCw,
} from 'lucide-react';
import { AIPortfolioReport, GitHubProfile, Repository } from '../types';

interface AIPortfolioViewProps {
  report: AIPortfolioReport | null;
  loading: boolean;
  onRefreshReport: () => void;
  profile: GitHubProfile;
}

export const AIPortfolioView: React.FC<AIPortfolioViewProps> = ({
  report,
  loading,
  onRefreshReport,
  profile,
}) => {
  return (
    <div className="space-y-6 font-sans text-[#1E1E1E]">
      
      {/* Header Banner */}
      <div className="bg-white border border-[#E8E3D8] rounded-[20px] p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-6 h-6 text-[#1E1E1E]" />
              <h2 className="text-xl font-extrabold text-[#1E1E1E]">AI Portfolio Deep Analysis</h2>
              <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-[#F2C879] text-[#1A1A1A] rounded-full border border-[#e2b765]">
                Gemini 3.6 Flash
              </span>
            </div>
            <p className="text-xs text-[#8B8680] font-medium mt-1 max-w-2xl">
              Constructive AI evaluation based on senior engineering hiring standards, repository patterns, and open-source hygiene.
            </p>
          </div>

          <button
            onClick={onRefreshReport}
            disabled={loading}
            className="px-4 py-2 bg-[#F2C879] hover:bg-[#e2b765] text-[#1A1A1A] font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-all disabled:opacity-50 shrink-0 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Analyzing with Gemini...' : 'Re-Run AI Analysis'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="bg-white border border-[#E8E3D8] rounded-[20px] p-12 text-center space-y-4 shadow-xs">
          <div className="inline-flex p-4 rounded-full bg-[#F5F1E8] border border-[#E8E3D8] text-[#1E1E1E] animate-pulse">
            <BrainCircuit className="w-8 h-8" />
          </div>
          <h3 className="text-base font-extrabold text-[#1E1E1E]">Evaluating Developer Portfolio with Gemini API...</h3>
          <p className="text-xs text-[#8B8680] font-medium max-w-md mx-auto">
            Analyzing repository file structures, documentation depth, commit patterns, and career readiness...
          </p>
        </div>
      ) : report ? (
        <div className="space-y-6">
          
          {/* Executive Quality Summary Card */}
          <div className="bg-white border border-[#E8E3D8] rounded-[20px] p-6 space-y-4 shadow-xs">
            <h3 className="text-xs font-black text-[#1E1E1E] uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F2C879]" />
              Executive Evaluation Summary
            </h3>
            <p className="text-xs text-[#1E1E1E] font-medium leading-relaxed bg-[#F5F1E8] p-4 rounded-xl border border-[#E8E3D8]">
              {report.overallQualitySummary}
            </p>

            {/* Quality Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-[#F5F1E8] p-4 rounded-xl border border-[#E8E3D8] space-y-1">
                <div className="text-[11px] font-bold text-[#8B8680]">Code Organization</div>
                <div className="text-sm font-extrabold text-[#22C55E]">{report.codeOrganizationRating}</div>
              </div>

              <div className="bg-[#F5F1E8] p-4 rounded-xl border border-[#E8E3D8] space-y-1">
                <div className="text-[11px] font-bold text-[#8B8680]">Documentation Quality</div>
                <div className="text-sm font-extrabold text-[#1E1E1E]">{report.documentationQualityRating}</div>
              </div>

              <div className="bg-[#F5F1E8] p-4 rounded-xl border border-[#E8E3D8] space-y-1">
                <div className="text-[11px] font-bold text-[#8B8680]">Career Readiness</div>
                <div className="text-sm font-extrabold text-[#1E1E1E]">{report.careerReadinessRating}</div>
              </div>
            </div>
          </div>

          {/* Strengths & Weaknesses 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Strengths */}
            <div className="bg-white border border-[#E8E3D8] rounded-[20px] p-5 space-y-3 shadow-xs">
              <h3 className="text-sm font-extrabold text-[#22C55E] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Key Portfolio Strengths</span>
              </h3>
              <div className="space-y-2">
                {report.strengths.map((strength, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F5F1E8] p-3 rounded-xl border border-[#E8E3D8] text-xs font-semibold text-[#1E1E1E] flex items-start gap-2.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#22C55E] mt-1.5 shrink-0"></span>
                    <span className="leading-relaxed">{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weaknesses */}
            <div className="bg-white border border-[#E8E3D8] rounded-[20px] p-5 space-y-3 shadow-xs">
              <h3 className="text-sm font-extrabold text-[#1E1E1E] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#F4A6A6]" />
                <span>Areas for Growth & Weaknesses</span>
              </h3>
              <div className="space-y-2">
                {report.weaknesses.map((weakness, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F5F1E8] p-3 rounded-xl border border-[#E8E3D8] text-xs font-semibold text-[#1E1E1E] flex items-start gap-2.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#F4A6A6] mt-1.5 shrink-0"></span>
                    <span className="leading-relaxed">{weakness}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Critical Fixes & Recommended Action Plan */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Critical Fixes */}
            <div className="bg-white border border-[#E8E3D8] rounded-[20px] p-5 space-y-3 shadow-xs">
              <h3 className="text-sm font-extrabold text-[#1E1E1E] flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#F4A6A6]" />
                <span>Critical Priority Fixes</span>
              </h3>
              <div className="space-y-2">
                {report.criticalFixes.map((fix, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F5F1E8] p-3 rounded-xl border border-[#E8E3D8] text-xs font-semibold text-[#1E1E1E] flex items-start gap-3"
                  >
                    <span className="px-2 py-0.5 text-[10px] font-extrabold bg-[#F4A6A6]/20 text-[#1E1E1E] border border-[#F4A6A6]/40 rounded-md shrink-0">
                      FIX #{idx + 1}
                    </span>
                    <span className="leading-relaxed">{fix}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Plan */}
            <div className="bg-white border border-[#E8E3D8] rounded-[20px] p-5 space-y-3 shadow-xs">
              <h3 className="text-sm font-extrabold text-[#1E1E1E] flex items-center gap-2">
                <ListOrdered className="w-4 h-4 text-[#22C55E]" />
                <span>Recommended 30-Day Action Plan</span>
              </h3>
              <div className="space-y-2">
                {report.recommendedActionPlan.map((action, idx) => (
                  <div
                    key={idx}
                    className="bg-[#F5F1E8] p-3 rounded-xl border border-[#E8E3D8] text-xs font-semibold text-[#1E1E1E] flex items-start gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#F2C879] text-[#1A1A1A] font-black text-[10px] flex items-center justify-center shrink-0 border border-[#e2b765]">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{action}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      ) : null}

    </div>
  );
};
