import React from 'react';
import {
  LayoutDashboard,
  FolderGit2,
  BrainCircuit,
  Target,
  FileCheck2,
  Route,
  Briefcase,
  FileDown,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

export type TabType =
  | 'dashboard'
  | 'repos'
  | 'ai-report'
  | 'skill-gap'
  | 'resume-match'
  | 'roadmap'
  | 'career'
  | 'export';

interface SidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  overallScore?: number;
  letterGrade?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  overallScore = 92,
  letterGrade = 'A',
  isOpen = true,
  onClose,
}) => {
  const menuItems: { id: TabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard Overview',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      id: 'repos',
      label: 'Repositories',
      icon: <FolderGit2 className="w-4 h-4" />,
    },
    {
      id: 'ai-report',
      label: 'AI Portfolio Audit',
      icon: <BrainCircuit className="w-4 h-4 text-[#1E1E1E]" />,
      badge: 'Gemini',
    },
    {
      id: 'skill-gap',
      label: 'Skill Gap Analysis',
      icon: <Target className="w-4 h-4" />,
    },
    {
      id: 'resume-match',
      label: 'AI Resume Matcher',
      icon: <FileCheck2 className="w-4 h-4" />,
    },
    {
      id: 'roadmap',
      label: 'Learning Roadmap',
      icon: <Route className="w-4 h-4" />,
    },
    {
      id: 'career',
      label: 'Career Guidance',
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      id: 'export',
      label: 'PDF Report & Export',
      icon: <FileDown className="w-4 h-4" />,
    },
  ];

  // If closed on mobile view, render a minimized horizontal pill bar
  if (!isOpen) {
    return (
      <aside className="w-full md:w-20 bg-white border border-[#E8E3D8] p-2 flex md:flex-col items-center justify-between shrink-0 font-sans my-2 md:my-4 md:ml-4 rounded-2xl shadow-xs transition-all duration-300">
        <div className="flex md:flex-col items-center gap-2 overflow-x-auto w-full justify-around md:justify-start">
          <div className="w-9 h-9 rounded-xl bg-[#F2C879] flex items-center justify-center font-black text-sm text-[#1A1A1A] shrink-0 shadow-xs">
            {letterGrade}
          </div>

          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                title={item.label}
                className={`p-2.5 rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#F2C879] text-[#1A1A1A] shadow-xs'
                    : 'text-[#8B8680] hover:text-[#1E1E1E] hover:bg-[#F5F1E8]'
                }`}
              >
                {item.icon}
              </button>
            );
          })}
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-full md:w-64 bg-white border border-[#E8E3D8] p-4 flex flex-col justify-between shrink-0 font-sans my-2 md:my-4 md:ml-4 rounded-3xl shadow-xs transition-all duration-300">
      <div className="space-y-5">
        
        {/* Score Badge Summary Card */}
        <div className="bg-[#F5F1E8] border border-[#E8E3D8] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#8B8680]">
              Overall Quality Score
            </div>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-black text-[#1E1E1E]">{overallScore}</span>
              <span className="text-xs font-semibold text-[#8B8680]">/ 100</span>
            </div>
          </div>
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#F2C879] text-[#1A1A1A] font-black text-base shadow-xs">
            {letterGrade}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#8B8680]">
            Navigation Menu
          </div>
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#F2C879] text-[#1A1A1A] shadow-xs'
                    : 'text-[#8B8680] hover:text-[#1E1E1E] hover:bg-[#F5F1E8]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-[#1A1A1A]' : 'text-[#8B8680]'}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-[9px] font-extrabold rounded-full bg-[#1A1A1A] text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="pt-3.5 mt-2 border-t border-[#E8E3D8] text-xs text-[#1E1E1E]">
        <div className="bg-[#FAF8F5] border border-[#E8E3D8] rounded-2xl p-2.5 flex items-center justify-between gap-2 shadow-2xs">
          <div className="flex items-center gap-1.5 min-w-0">
            <Sparkles className="w-4 h-4 text-[#D97706] shrink-0" />
            <div className="text-[11px] font-medium leading-tight text-[#1E1E1E] truncate">
              Powered by <strong className="font-extrabold text-[#1E1E1E] block">Google Gemini 2.5 Flash</strong>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse shrink-0" title="AI Engine Active"></span>
        </div>
      </div>
    </aside>
  );
};
