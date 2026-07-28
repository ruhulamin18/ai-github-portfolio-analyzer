import React, { useState } from 'react';
import {
  Target,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ArrowRight,
  BookOpen,
  Code2,
  Award,
} from 'lucide-react';
import { SkillGapAnalysis, GitHubProfile, Repository } from '../types';

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
                Calculated by parsing repository language distributions, topic tags, and framework dependencies.
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

          {/* User Skills vs Missing Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Detected Skills */}
            <div className="bg-white border border-[#E8E3D8] rounded-3xl p-5 space-y-3 shadow-xs">
              <h3 className="text-sm font-extrabold text-[#22C55E] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Skills Verified in GitHub Portfolio ({skillGap.userSkills.length})</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGap.userSkills.map((skill) => (
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
                <span>Missing Industry Skills ({skillGap.missingSkills.length})</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGap.missingSkills.map((skill) => (
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
              {skillGap.recommendedTechnologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono font-bold bg-[#F5F1E8] text-[#1E1E1E] border border-[#E8E3D8] rounded-xl"
                >
                  + {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Prioritized Learning Action Steps */}
          <div className="bg-white border border-[#E8E3D8] rounded-3xl p-5 space-y-4 shadow-xs">
            <h3 className="text-sm font-extrabold text-[#1E1E1E] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#8B8680]" />
              <span>Prioritized Learning Plan & Hours Estimate</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skillGap.learningPriorities.map((item, idx) => (
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
