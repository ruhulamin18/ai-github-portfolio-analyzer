import React, { useState } from 'react';
import {
  Target,
  CheckCircle2,
  XCircle,
  Clock,
  BookOpen,
  Code2,
  BriefcaseBusiness,
  FileText,
  Gauge,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { SkillGapAnalysis } from '../types';

interface SkillGapViewProps {
  skillGap: SkillGapAnalysis | null;
  loading: boolean;
  onSelectRole: (role: string) => void;
  selectedRole: string;
}

export const SkillGapView: React.FC<SkillGapViewProps> = ({
  skillGap,
  loading,
  onSelectRole,
  selectedRole,
}) => {
  const targetRoles = [
    'Full Stack Developer',
    'Frontend Developer',
    'Backend Developer',
    'DevOps Engineer',
    'ML Engineer',
    'Data Scientist',
  ];
  const pieColors = ['#22C55E', '#F2C879'];
  const strongSkills = skillGap?.strongSkills || skillGap?.userSkills || [];
  const missingSkills = skillGap?.missingSkills || [];
  const requiredSkillsCount = strongSkills.length + missingSkills.length;
  const weakAreas = skillGap?.weakAreas || [];
  const skillDistribution = skillGap?.skillDistribution || [];
  const recommendations = skillGap?.recommendations || missingSkills.map((skill) => `Learn ${skill} and build one production project.`);
  const roadmap = skillGap?.roadmap || [];
  const recommendedProjects = skillGap?.recommendedProjects || [];
  const resumeSuggestions = skillGap?.resumeSuggestions || [];
  const learningPriorities = skillGap?.learningPriorities || [];
  const radarData = skillGap?.chartData?.radar || [];
  const barData = skillGap?.chartData?.bar || [
    ...strongSkills.map((skill) => ({ skill, status: 100 })),
    ...missingSkills.map((skill) => ({ skill, status: 0 })),
  ];
  const pieData = skillGap?.chartData?.pie || [
    { name: 'Matched Skills', value: strongSkills.length },
    { name: 'Missing Skills', value: missingSkills.length },
  ];

  return (
    <div className="space-y-6">
      
      {/* Target Role Selector Header */}
      <div className="bg-white border border-[#E8E3D8] rounded-3xl p-6 space-y-4 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-[#1E1E1E] flex items-center gap-2">
              <Target className="w-5 h-5 text-[#1E1E1E]" />
              <span>Skill Gap & Industry Readiness Analyzer</span>
            </h2>
            <p className="text-xs text-[#8B8680] font-medium mt-1">
              Compare your GitHub portfolio tech stack against target engineering job roles
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono bg-[#F2C879]/30 border border-[#F2C879] text-[#1E1E1E] px-3 py-1.5 rounded-xl font-bold">
            <span>Target Role:</span>
            <span>{selectedRole}</span>
          </div>
        </div>

        {/* Role Selection Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2">
          {targetRoles.map((role) => {
            const isSelected = selectedRole === role;
            return (
              <button
                key={role}
                onClick={() => onSelectRole(role)}
                disabled={loading}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#F2C879] text-[#1A1A1A] border-[#F2C879] shadow-xs'
                    : 'bg-[#F5F1E8] text-[#8B8680] border-[#E8E3D8] hover:text-[#1E1E1E] hover:bg-white'
                }`}
              >
                {role}
              </button>
            );
          })}
        </div>
      </div>

      {loading ? (
        <div className="bg-white border border-[#E8E3D8] rounded-3xl p-12 text-center space-y-3 shadow-xs">
          <div className="inline-flex p-3 rounded-full bg-[#F2C879]/30 border border-[#F2C879] text-[#1E1E1E] animate-pulse">
            <Target className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold text-[#8B8680]">Evaluating skill gaps for {selectedRole}...</p>
        </div>
      ) : skillGap ? (
        <div className="space-y-6">
          
          {/* Match Score Banner */}
          <div className="bg-white border border-[#E8E3D8] rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-[#8B8680]">
                Job Role Match Rating
              </div>
              <h3 className="text-2xl font-black text-[#1E1E1E] flex items-center gap-3">
                <span>{skillGap.targetRole}</span>
                <span className="text-[#22C55E] font-mono text-xl font-extrabold">{skillGap.matchPercentage}% Match</span>
              </h3>
              <p className="text-xs text-[#8B8680] font-medium">
                Industry readiness: <span className="font-bold text-[#1E1E1E]">{skillGap.industryReadiness || 'Needs Improvement'}</span>
              </p>
            </div>

            <div className="w-full md:w-64 space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#8B8680]">Readiness</span>
                <span className="text-[#22C55E] font-bold">{skillGap.matchPercentage}%</span>
              </div>
              <div className="w-full h-3 bg-[#F5F1E8] rounded-full border border-[#E8E3D8] overflow-hidden">
                <div
                  className="h-full bg-[#22C55E] transition-all duration-500"
                  style={{ width: `${skillGap.matchPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Dynamic Progress Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: 'Core Role Skills',
                value: skillGap.coreSkillsMatched ?? strongSkills.length,
                total: skillGap.coreSkillsTotal ?? requiredSkillsCount,
                icon: Target,
                color: '#22C55E',
              },
              {
                label: 'Strong Verified Skills',
                value: strongSkills.length,
                total: requiredSkillsCount,
                icon: CheckCircle2,
                color: '#22C55E',
              },
              {
                label: 'Missing Industry Skills',
                value: missingSkills.length,
                total: requiredSkillsCount,
                icon: XCircle,
                color: '#D97706',
              },
              {
                label: 'Weak Core Areas',
                value: weakAreas.length,
                total: missingSkills.length || 1,
                icon: Gauge,
                color: '#EF4444',
              },
            ].map((card) => {
              const Icon = card.icon;
              const percent = card.total ? Math.round((card.value / card.total) * 100) : 0;
              return (
                <div key={card.label} className="bg-white border border-[#E8E3D8] rounded-2xl p-4 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#8B8680]">{card.label}</span>
                    <Icon className="w-4 h-4 text-[#1E1E1E]" />
                  </div>
                  <div className="text-2xl font-black text-[#1E1E1E]">
                    {card.value}
                    <span className="text-xs text-[#8B8680] font-semibold">/{card.total}</span>
                  </div>
                  <div className="h-2 bg-[#F5F1E8] rounded-full overflow-hidden border border-[#E8E3D8]">
                    <div
                      className="h-full bg-[#F2C879] transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Role-Aware Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="bg-white border border-[#E8E3D8] rounded-3xl p-5 space-y-3 shadow-xs overflow-hidden">
              <h3 className="text-sm font-extrabold text-[#1E1E1E]">Category Radar</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="55%"
                    data={radarData}
                    margin={{ top: 10, right: 24, bottom: 10, left: 24 }}
                  >
                    <PolarGrid stroke="#E8E3D8" />
                    <PolarAngleAxis dataKey="category" tick={{ fontSize: 9, fill: '#4A4A4A', fontWeight: 600 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 8, fill: '#8B8680' }} />
                    <Radar dataKey="score" stroke="#22C55E" fill="#22C55E" fillOpacity={0.28} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white border border-[#E8E3D8] rounded-3xl p-5 space-y-3 shadow-xs">
              <h3 className="text-sm font-extrabold text-[#1E1E1E]">Skill Coverage</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 8, right: 8, bottom: 48, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E8E3D8" />
                    <XAxis dataKey="skill" tick={{ fontSize: 9, fill: '#8B8680' }} angle={-45} textAnchor="end" interval={0} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 9 }} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Covered']} />
                    <Bar dataKey="status" fill="#F2C879" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white border border-[#E8E3D8] rounded-3xl p-5 space-y-3 shadow-xs">
              <h3 className="text-sm font-extrabold text-[#1E1E1E]">Skill Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={88} paddingAngle={3}>
                      {pieData.map((entry, index) => (
                        <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* User Skills vs Missing Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Detected Skills */}
            <div className="bg-white border border-[#E8E3D8] rounded-3xl p-5 space-y-3 shadow-xs">
              <h3 className="text-sm font-extrabold text-[#22C55E] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Skills Verified in GitHub Portfolio ({strongSkills.length})</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {strongSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs font-bold bg-[#22C55E]/10 text-[#15803D] border border-[#22C55E]/20 rounded-xl flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#22C55E]" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="bg-white border border-[#E8E3D8] rounded-3xl p-5 space-y-3 shadow-xs">
              <h3 className="text-sm font-extrabold text-[#D97706] flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                <span>Missing Industry Skills ({missingSkills.length})</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs font-bold bg-[#F2C879]/30 text-[#B45309] border border-[#F2C879] rounded-xl flex items-center gap-1.5"
                  >
                    <XCircle className="w-3 h-3 text-[#D97706]" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Recommended Technologies */}
          <div className="bg-white border border-[#E8E3D8] rounded-3xl p-5 space-y-3 shadow-xs">
            <h3 className="text-sm font-extrabold text-[#1E1E1E] flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#8B8680]" />
              <span>Recommended Tech Stack Additions to Boost Match Score</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {(skillGap.recommendedTechnologies || missingSkills).map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono font-bold bg-[#F5F1E8] text-[#1E1E1E] border border-[#E8E3D8] rounded-xl"
                >
                  + {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Recommendations, Roadmap, Projects, Resume */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[
              { title: 'Recommendations From Missing Skills', icon: BookOpen, items: recommendations },
              { title: 'Role Learning Roadmap', icon: Target, items: roadmap.map((step, index) => `${index + 1}. ${step}`) },
              { title: 'Recommended Projects', icon: BriefcaseBusiness, items: recommendedProjects },
              { title: 'Resume Suggestions', icon: FileText, items: resumeSuggestions },
            ].map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.title} className="bg-white border border-[#E8E3D8] rounded-3xl p-5 space-y-3 shadow-xs">
                  <h3 className="text-sm font-extrabold text-[#1E1E1E] flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[#8B8680]" />
                    <span>{section.title}</span>
                  </h3>
                  <div className="space-y-2">
                    {section.items.length > 0 ? section.items.map((item) => (
                      <div key={item} className="text-xs font-medium leading-relaxed bg-[#F5F1E8] border border-[#E8E3D8] rounded-xl px-3 py-2 text-[#1E1E1E]">
                        {item}
                      </div>
                    )) : (
                      <div className="text-xs font-medium leading-relaxed bg-[#F5F1E8] border border-[#E8E3D8] rounded-xl px-3 py-2 text-[#8B8680]">
                        No action needed for this section.
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Prioritized Learning Action Steps */}
          <div className="bg-white border border-[#E8E3D8] rounded-3xl p-5 space-y-4 shadow-xs">
            <h3 className="text-sm font-extrabold text-[#1E1E1E] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#8B8680]" />
              <span>Prioritized Learning Plan & Hours Estimate</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learningPriorities.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#F5F1E8] p-4 rounded-2xl border border-[#E8E3D8] space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#1E1E1E]">{item.skill}</span>
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold rounded-lg ${
                          item.priority === 'High'
                            ? 'bg-[#F4A6A6]/30 text-[#991B1B] border border-[#F4A6A6]'
                            : 'bg-[#F2C879]/30 text-[#B45309] border border-[#F2C879]'
                        }`}
                      >
                        {item.priority} Priority
                      </span>
                    </div>
                    <p className="text-xs text-[#8B8680] font-medium leading-relaxed">{item.description}</p>
                  </div>

                  <div className="pt-2 border-t border-[#E8E3D8] flex items-center justify-between text-[11px] text-[#8B8680] font-mono">
                    <span className="flex items-center gap-1 font-bold text-[#1E1E1E]">
                      <Clock className="w-3 h-3 text-[#8B8680]" />
                      ~{item.estimatedHours} Hours
                    </span>
                    <span>Action Item #{idx + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : null}

    </div>
  );
};
