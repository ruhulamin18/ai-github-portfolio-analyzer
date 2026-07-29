import React from 'react';
import { Zap, ArrowRight } from 'lucide-react';

interface AIInsightsCardProps {
  overallHealthScore: number;
  dynamicInsights: { type: 'green' | 'yellow' | 'red'; text: string }[];
  onNavigateTab: (tab: string) => void;
}

export const AIInsightsCard: React.FC<AIInsightsCardProps> = ({
  overallHealthScore,
  dynamicInsights,
  onNavigateTab,
}) => {
  return (
    <div className="bg-white border border-[#E8E3D8] rounded-[20px] p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-[#1E1E1E] flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#F2C879] fill-current" />
            <span>AI Insights & Findings</span>
          </h2>
          <span className="text-xs font-black text-[#1E1E1E]">{overallHealthScore}% Optimized</span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-[#F5F1E8] rounded-full overflow-hidden border border-[#E8E3D8] my-2">
          <div
            className="h-full bg-[#F2C879] rounded-full transition-all duration-500"
            style={{ width: `${overallHealthScore}%` }}
          ></div>
        </div>
      </div>

      {/* Dark Live Gemini Audit Card */}
      <div className="my-3 bg-[#1A1A1A] text-white p-4 rounded-[16px] shadow-md space-y-3">
        <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
          <span className="font-bold text-[#F2C879] uppercase tracking-wider text-[10px]">
            Real GitHub API Audit
          </span>
          <span className="text-[10px] text-gray-400">Live Real Data</span>
        </div>

        <div className="space-y-2.5 text-xs">
          {dynamicInsights.slice(0, 4).map((insight, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span
                className={`w-2 h-2 rounded-full mt-1 shrink-0 ${
                  insight.type === 'green'
                    ? 'bg-[#22C55E]'
                    : insight.type === 'yellow'
                    ? 'bg-[#F2C879]'
                    : 'bg-[#F4A6A6]'
                }`}
              ></span>
              <span className="text-gray-200 leading-snug">{insight.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs pt-2 border-t border-[#E8E3D8]">
        <span className="text-[#8B8680] font-medium">Automated Gemini code audit</span>
        <button
          onClick={() => onNavigateTab('ai-report')}
          className="text-[#1E1E1E] hover:underline font-bold flex items-center gap-1 cursor-pointer"
        >
          <span>Full Report</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
