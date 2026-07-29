import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { RepositoryHealthPillars } from '../../utils/scoreCalculator';

interface RepositoryHealthCardProps {
  healthPillars: RepositoryHealthPillars;
  totalRepoCount: number;
  onNavigateTab: (tab: string) => void;
}

export const RepositoryHealthCard: React.FC<RepositoryHealthCardProps> = ({
  healthPillars,
  totalRepoCount,
  onNavigateTab,
}) => {
  const { overallHealthScore, healthPillars: pillars } = healthPillars;

  return (
    <div className="bg-white border border-[#E8E3D8] rounded-[20px] p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-[#1E1E1E] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
            <span>Repository Health Overview</span>
          </h2>
          <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-[#22C55E]/15 text-[#22C55E] rounded-full border border-[#22C55E]/30">
            {overallHealthScore}%{' '}
            {overallHealthScore >= 85 ? 'Excellent' : overallHealthScore >= 70 ? 'Good' : 'Needs Review'}
          </span>
        </div>
        <p className="text-xs text-[#8B8680] font-medium mt-1">
          SaaS audit across key repository standards ({totalRepoCount} repos)
        </p>
      </div>

      {/* Health Indicators Rows */}
      <div className="space-y-3 my-4">
        {pillars.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-[#1E1E1E] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                {item.name}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#8B8680] font-medium">{item.label}</span>
                <span className="text-[#1E1E1E]">{item.score}%</span>
              </div>
            </div>
            <div className="w-full h-1.5 bg-[#F5F1E8] rounded-full overflow-hidden border border-[#E8E3D8]">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${item.score}%`, backgroundColor: item.color }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs pt-3 border-t border-[#E8E3D8] text-[#8B8680] font-semibold">
        <span>
          Overall Repository Health:{' '}
          <strong className="text-[#1E1E1E]">
            {overallHealthScore >= 85 ? 'A+ Grade' : overallHealthScore >= 75 ? 'B+ Grade' : 'C Grade'}{' '}
            ({overallHealthScore}/100)
          </strong>
        </span>
        <button
          onClick={() => onNavigateTab('repos')}
          className="text-[#1E1E1E] hover:underline font-bold flex items-center gap-1 cursor-pointer"
        >
          <span>Deep Audit</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
