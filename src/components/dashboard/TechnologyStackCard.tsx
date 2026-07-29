import React from 'react';
<<<<<<< HEAD
import { Code2 } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
=======
import { Layers, Database, Wrench, Code2 } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
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
<<<<<<< HEAD
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
=======
    <div className="bg-white border border-[#E8E3D8] rounded-[20px] p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-[#1E1E1E] flex items-center gap-2">
            <Code2 className="w-4 h-4 text-[#3178C6]" />
            <span>Technology Stack & Languages</span>
          </h2>
          <span className="text-xs font-bold text-[#8B8680]">Donut Analysis</span>
        </div>
        <p className="text-xs text-[#8B8680] font-medium mt-1">
          Analyzed from GitHub code breakdown across {totalRepoCount} repositories
        </p>
      </div>

      {/* Donut Chart and Legend Row */}
      <div className="flex items-center gap-4 my-2">
        {/* Recharts Donut Chart */}
        <div className="w-28 h-28 shrink-0 relative flex items-center justify-center">
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={languageDistribution}
<<<<<<< HEAD
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
=======
                cx="50%"
                cy="50%"
                innerRadius={28}
                outerRadius={44}
                paddingAngle={3}
                dataKey="percentage"
              >
                {languageDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(val: any) => [`${val}%`, 'Language']}
                contentStyle={{
                  backgroundColor: '#1E1E1E',
                  color: '#fff',
                  borderRadius: '12px',
                  fontSize: '11px',
                  border: 'none',
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
<<<<<<< HEAD
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
=======

        {/* Donut Legend */}
        <div className="flex-1 space-y-1.5 text-xs font-bold">
          {languageDistribution.slice(0, 4).map((lang, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[#1E1E1E]">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lang.color }}></span>
                {lang.name}
              </span>
              <span className="text-[#8B8680]">{lang.displayVal}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Frameworks, Database & Tools below Donut Chart */}
      <div className="space-y-2.5 pt-3 border-t border-[#E8E3D8] text-xs">
        {/* Frameworks */}
        <div className="flex items-center justify-between">
          <span className="text-[#8B8680] font-bold flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#3178C6]" />
            Frameworks:
          </span>
          <div className="flex flex-wrap gap-1 justify-end">
            <span className="px-2 py-0.5 bg-[#F5F1E8] border border-[#E8E3D8] rounded-md text-[10px] font-bold text-[#1E1E1E]">
              React 19
            </span>
            <span className="px-2 py-0.5 bg-[#F5F1E8] border border-[#E8E3D8] rounded-md text-[10px] font-bold text-[#1E1E1E]">
              Tailwind CSS
            </span>
            <span className="px-2 py-0.5 bg-[#F5F1E8] border border-[#E8E3D8] rounded-md text-[10px] font-bold text-[#1E1E1E]">
              Express
            </span>
          </div>
        </div>

        {/* Database */}
        <div className="flex items-center justify-between">
          <span className="text-[#8B8680] font-bold flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-[#10B981]" />
            Database:
          </span>
          <div className="flex flex-wrap gap-1 justify-end">
            <span className="px-2 py-0.5 bg-[#F5F1E8] border border-[#E8E3D8] rounded-md text-[10px] font-bold text-[#1E1E1E]">
              MongoDB
            </span>
            <span className="px-2 py-0.5 bg-[#F5F1E8] border border-[#E8E3D8] rounded-md text-[10px] font-bold text-[#1E1E1E]">
              PostgreSQL
            </span>
            <span className="px-2 py-0.5 bg-[#F5F1E8] border border-[#E8E3D8] rounded-md text-[10px] font-bold text-[#1E1E1E]">
              Redis
            </span>
          </div>
        </div>

        {/* Tools & DevOps */}
        <div className="flex items-center justify-between">
          <span className="text-[#8B8680] font-bold flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5 text-[#D97706]" />
            Tools & DevOps:
          </span>
          <div className="flex flex-wrap gap-1 justify-end">
            <span className="px-2 py-0.5 bg-[#F5F1E8] border border-[#E8E3D8] rounded-md text-[10px] font-bold text-[#1E1E1E]">
              Docker
            </span>
            <span className="px-2 py-0.5 bg-[#F5F1E8] border border-[#E8E3D8] rounded-md text-[10px] font-bold text-[#1E1E1E]">
              GitHub Actions
            </span>
            <span className="px-2 py-0.5 bg-[#F5F1E8] border border-[#E8E3D8] rounded-md text-[10px] font-bold text-[#1E1E1E]">
              Vite
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
