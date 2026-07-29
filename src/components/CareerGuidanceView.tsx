import React from 'react';
import {
  Briefcase,
  Award,
  BookOpen,
  GitPullRequest,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { CareerRecommendation } from '../types';

interface CareerGuidanceViewProps {
  career: CareerRecommendation | null;
  loading: boolean;
}

export const CareerGuidanceView: React.FC<CareerGuidanceViewProps> = ({
  career,
  loading,
}) => {
  if (loading) {
    return (
      <div className="bg-white border border-[#E8E3D8] rounded-3xl p-12 text-center space-y-3 shadow-xs">
        <Briefcase className="w-8 h-8 text-[#1E1E1E] animate-pulse mx-auto" />
        <p className="text-xs font-bold text-[#8B8680]">Generating personalized career advice & open source recommendations...</p>
      </div>
    );
  }

  if (!career) return null;

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-white border border-[#E8E3D8] rounded-3xl p-6 shadow-xs">
        <h2 className="text-xl font-extrabold text-[#1E1E1E] flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-[#1E1E1E]" />
          <span>AI Career Guidance & Industry Opportunities</span>
        </h2>
        <p className="text-xs text-[#8B8680] font-medium mt-1">
          Tailored engineering role recommendations, certifications, courses, and open source projects
        </p>
      </div>

      {/* Suggested Job Roles */}
      <div className="bg-white border border-[#E8E3D8] rounded-3xl p-5 space-y-4 shadow-xs">
        <h3 className="text-sm font-extrabold text-[#1E1E1E] flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#22C55E]" />
          <span>Target Software Engineering Roles & Fit Match</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {career.suggestedRoles.map((role) => (
            <div
              key={role.roleTitle}
              className="bg-[#F5F1E8] p-4 rounded-2xl border border-[#E8E3D8] space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-[#1E1E1E]">{role.roleTitle}</span>
                  <span className="font-mono font-bold text-[#22C55E]">{role.fitPercentage}% Fit</span>
                </div>
                <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-[#E8E3D8] my-2">
                  <div
                    className="h-full bg-[#22C55E]"
                    style={{ width: `${role.fitPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-[#8B8680] font-medium leading-relaxed">{role.reasoning}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications & Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Industry Certifications */}
        <div className="bg-white border border-[#E8E3D8] rounded-3xl p-5 space-y-3 shadow-xs">
          <h3 className="text-sm font-extrabold text-[#1E1E1E] flex items-center gap-2">
            <Award className="w-4 h-4 text-[#8B8680]" />
            <span>Recommended Industry Certifications</span>
          </h3>

          <div className="space-y-2.5">
            {career.certifications.map((cert) => (
              <div
                key={cert.name}
                className="bg-[#F5F1E8] p-3.5 rounded-2xl border border-[#E8E3D8] flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-[#1E1E1E]">{cert.name}</div>
                  <div className="text-[#8B8680] text-[11px] font-medium">{cert.issuer}</div>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#F2C879]/30 text-[#1E1E1E] border border-[#F2C879] rounded-lg">
                  {cert.relevance} Relevance
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Courses */}
        <div className="bg-white border border-[#E8E3D8] rounded-3xl p-5 space-y-3 shadow-xs">
          <h3 className="text-sm font-extrabold text-[#1E1E1E] flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#8B8680]" />
            <span>Top Curated Courses</span>
          </h3>

          <div className="space-y-2.5">
            {career.recommendedCourses.map((course) => (
              <div
                key={course.title}
                className="bg-[#F5F1E8] p-3.5 rounded-2xl border border-[#E8E3D8] flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-[#1E1E1E]">{course.title}</div>
                  <div className="text-[#8B8680] text-[11px] font-medium">{course.provider}</div>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#1A1A1A] text-white rounded-lg">
                  {course.level}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Open Source Projects to Contribute */}
      <div className="bg-white border border-[#E8E3D8] rounded-3xl p-5 space-y-4 shadow-xs">
        <h3 className="text-sm font-extrabold text-[#1E1E1E] flex items-center gap-2">
          <GitPullRequest className="w-4 h-4 text-[#8B8680]" />
          <span>High-Impact Open Source Repositories to Contribute To</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {career.openSourceProjectsToContribute.map((project) => (
            <div
              key={project.name}
              className="bg-[#F5F1E8] p-4 rounded-2xl border border-[#E8E3D8] space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-[#1E1E1E]">{project.name}</h4>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-[#1E1E1E] hover:underline flex items-center gap-1"
                  >
                    GitHub
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-xs text-[#8B8680] font-medium leading-relaxed">{project.description}</p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#E8E3D8]">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[10px] font-mono font-bold bg-white text-[#1E1E1E] border border-[#E8E3D8] rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Action Items */}
      <div className="bg-white border border-[#E8E3D8] rounded-3xl p-5 space-y-3 shadow-xs">
        <h3 className="text-sm font-extrabold text-[#1E1E1E] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
          <span>Portfolio Actions Based on Your GitHub Evidence</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {career.portfolioActionItems.map((item) => (
            <div
              key={item}
              className="bg-[#F5F1E8] p-3.5 rounded-2xl border border-[#E8E3D8] text-xs font-medium leading-relaxed text-[#1E1E1E]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
