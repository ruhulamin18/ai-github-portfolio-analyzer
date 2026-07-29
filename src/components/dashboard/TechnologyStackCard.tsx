import React from 'react';
import { Code2 } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ProcessedLanguage } from '../../utils/languageParser';

interface TechnologyStackCardProps {
  languageDistribution: ProcessedLanguage[];
  totalRepoCount: number;
}

export const TechnologyStackCard: React.FC<TechnologyStackCardProps> = ({
  languageDistribution,
  totalRepoCount,
}) => {
  return (
    <div className="bg-white border border-[#E8E3D8] rounded-[20px] p-5 shadow-xs">
      {/* Header */}
      <div className="mb-3">
        <h2 className="flex items-center gap-2 text-base font-extrabold text-[#1E1E1E]">
          <Code2 className="w-3.5 h-3.5 text-[#3178C6]" />
          Languages
        </h2>

        <p className="mt-1 text-[11px] text-[#8B8680] font-medium">
          Analyzed from GitHub code breakdown across{' '}
          <span className="font-bold">{totalRepoCount}</span> repositories
        </p>
      </div>

      {/* Donut Chart */}
      <div className="flex justify-center mb-4">
        <div className="w-36 h-36">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={languageDistribution}
                dataKey="percentage"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={38}
                outerRadius={56}
                paddingAngle={2}
                stroke="#fff"
                strokeWidth={2}
              >
                {languageDistribution.map((lang, index) => (
                  <Cell key={index} fill={lang.color} />
                ))}
              </Pie>

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item: any = payload[0].payload;

                    return (
                      <div
                        style={{
                          background: '#1E1E1E',
                          color: '#fff',
                          padding: '8px 10px',
                          borderRadius: '8px',
                          fontSize: '11px',
                          boxShadow: '0 4px 10px rgba(0,0,0,.15)',
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 700,
                            marginBottom: 2,
                          }}
                        >
                          {item.name}
                        </div>

                        <div>{item.displayVal}</div>
                      </div>
                    );
                  }

                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Language List */}
      <div className="space-y-1.5">
        {languageDistribution.map((lang, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-[#F2EEE6] pb-1.5"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: lang.color,
                }}
              />

              <span className="text-[13px] font-semibold text-[#1E1E1E]">
                {lang.name}
              </span>
            </div>

            <span className="text-[13px] font-bold text-[#6B7280]">
              {lang.displayVal}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-3 pt-2 border-t border-[#E8E3D8]">
        <p className="text-[11px] text-[#8B8680]">
          Total:{' '}
          <span className="font-bold text-[#1E1E1E]">
            {languageDistribution.length}
          </span>{' '}
          {languageDistribution.length === 1
            ? 'language'
            : 'languages'}
        </p>
      </div>
    </div>
  );
};