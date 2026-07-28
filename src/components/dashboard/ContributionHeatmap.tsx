import React from 'react';
import { Calendar } from 'lucide-react';
import { ContributionDay, GitHubProfile } from '../../types';

interface ContributionHeatmapProps {
  profile: GitHubProfile;
  heatmap: ContributionDay[];
  realCurrentStreak: number;
  realLongestStreak: number;
}

export const ContributionHeatmap: React.FC<ContributionHeatmapProps> = ({
  profile,
  heatmap,
  realCurrentStreak,
  realLongestStreak,
}) => {
  const totalContributions = heatmap.reduce((acc, d) => acc + d.count, 0);

  return (
    <div className="bg-[#0d1117] text-white border border-[#30363d] rounded-[20px] p-6 shadow-md space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#30363d] pb-3">
        <div>
          <h2 className="text-base font-extrabold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#39d353]" />
            <span>Yearly Commit Activity Matrix</span>
          </h2>
          <p className="text-xs text-gray-400 font-medium mt-0.5">
            @{profile.username} •{' '}
            <span className="text-[#39d353] font-bold">{totalContributions}</span> total contributions in
            the last year
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-gray-300">
          <div>
            Current Streak: <span className="text-[#39d353]">{realCurrentStreak} Days 🔥</span>
          </div>
          <div>
            Longest Streak: <span className="text-[#39d353]">{realLongestStreak} Days</span>
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="grid grid-rows-7 grid-flow-col gap-1 min-w-[620px] pt-2">
          {heatmap.slice(-364).map((day, idx) => {
            let colorClass = 'bg-[#161b22] border border-[#21262d]';
            if (day.level === 1) colorClass = 'bg-[#0e4429] border border-[#0e4429]';
            if (day.level === 2) colorClass = 'bg-[#006d32] border border-[#006d32]';
            if (day.level === 3) colorClass = 'bg-[#26a641] border border-[#26a641]';
            if (day.level === 4) colorClass = 'bg-[#39d353] border border-[#39d353]';

            return (
              <div
                key={idx}
                title={`${day.date}: ${day.count} contributions`}
                className={`w-2.5 h-2.5 rounded-[3px] transition-transform hover:scale-125 cursor-pointer ${colorClass}`}
              ></div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-400 font-semibold pt-2 border-t border-[#30363d]">
        <span>Less Contributions</span>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-[2px] bg-[#161b22] border border-[#21262d]" title="0 contributions"></span>
          <span className="w-3 h-3 rounded-[2px] bg-[#0e4429]" title="1-3 contributions"></span>
          <span className="w-3 h-3 rounded-[2px] bg-[#006d32]" title="4-8 contributions"></span>
          <span className="w-3 h-3 rounded-[2px] bg-[#26a641]" title="9-15 contributions"></span>
          <span className="w-3 h-3 rounded-[2px] bg-[#39d353]" title="16+ contributions"></span>
        </div>
        <span>More Contributions</span>
      </div>
    </div>
  );
};
