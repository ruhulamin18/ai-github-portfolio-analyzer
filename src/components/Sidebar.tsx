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
  Sparkles,
  X,
  Github,
} from 'lucide-react';
import { GitHubProfile } from '../types';

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
  profile?: GitHubProfile | null;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  overallScore = 92,
  letterGrade = 'A',
  isOpen = false,
  onClose,
  profile,
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

  const handleSelectTab = (tab: TabType) => {
    onTabChange(tab);
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* ================= MOBILE LEFT DRAWER ================= */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />

          {/* Left Slide-in Drawer */}
          <div className="relative w-72 max-w-[80vw] bg-white h-full p-4 flex flex-col justify-between shadow-2xl border-r border-[#E8E3D8] z-10 overflow-y-auto font-sans">
            <div className="space-y-4">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E3D8]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#F2C879] flex items-center justify-center font-bold text-[#1A1A1A]">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-black text-xs text-[#1E1E1E] tracking-tight">
                      AI GitHub Analyzer
                    </h3>
                    {profile?.username && (
                      <p className="text-[11px] text-[#8B8680] font-medium">@{profile.username}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 text-[#8B8680] hover:text-[#1E1E1E] bg-[#F5F1E8] rounded-xl cursor-pointer"
                  title="Close sidebar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Score Badge Summary Card */}
              <div className="bg-[#F5F1E8] border border-[#E8E3D8] rounded-2xl p-3 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#8B8680]">
                    Quality Score
                  </div>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-xl font-black text-[#1E1E1E]">{overallScore}</span>
                    <span className="text-xs font-semibold text-[#8B8680]">/ 100</span>
                  </div>
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#F2C879] text-[#1A1A1A] font-black text-sm shadow-xs">
                  {letterGrade}
                </div>
              </div>

              {/* Navigation Menu Links */}
              <nav className="space-y-1">
                <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-[#8B8680]">
                  Menu Options
                </div>
                {menuItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectTab(item.id)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#F2C879] text-[#1A1A1A] shadow-xs'
                          : 'text-[#8B8680] hover:text-[#1E1E1E] hover:bg-[#F5F1E8]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={isActive ? 'text-[#1A1A1A]' : 'text-[#8B8680]'}>
                          {item.icon}
                        </span>
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

            {/* Footer */}
            <div className="pt-3 mt-4 border-t border-[#E8E3D8] text-xs text-[#1E1E1E]">
              <div className="bg-[#FAF8F5] border border-[#E8E3D8] rounded-2xl p-2.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <Sparkles className="w-4 h-4 text-[#D97706] shrink-0" />
                  <div className="text-[11px] font-medium leading-tight text-[#1E1E1E] truncate">
                    Google Gemini 2.5 Flash
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse shrink-0"></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= DESKTOP PERSISTENT / MINIMIZED SIDEBAR ================= */}
      {isOpen ? (
        <aside className="hidden md:flex w-64 bg-white border border-[#E8E3D8] p-4 flex-col justify-between shrink-0 font-sans my-4 ml-4 rounded-3xl shadow-xs transition-all duration-300">
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
                      <span className={isActive ? 'text-[#1A1A1A]' : 'text-[#8B8680]'}>
                        {item.icon}
                      </span>
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
              <span
                className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse shrink-0"
                title="AI Engine Active"
              ></span>
            </div>
          </div>
        </aside>
      ) : (
        <aside className="hidden md:flex w-20 bg-white border border-[#E8E3D8] p-3 flex-col items-center justify-between shrink-0 font-sans my-4 ml-4 rounded-3xl shadow-xs transition-all duration-300">
          <div className="flex flex-col items-center gap-3 w-full">
            {/* Minimized Score Grade */}
            <div
              className="w-10 h-10 rounded-2xl bg-[#F2C879] flex items-center justify-center font-black text-sm text-[#1A1A1A] shrink-0 shadow-xs"
              title={`Overall Score: ${overallScore}/100 (${letterGrade})`}
            >
              {letterGrade}
            </div>

            {/* Minimized Navigation Icons */}
            <nav className="flex flex-col items-center gap-1.5 w-full pt-2 border-t border-[#E8E3D8]">
              {menuItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    title={item.label}
                    className={`p-2.5 rounded-2xl transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#F2C879] text-[#1A1A1A] shadow-xs'
                        : 'text-[#8B8680] hover:text-[#1E1E1E] hover:bg-[#F5F1E8]'
                    }`}
                  >
                    {item.icon}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="pt-2 border-t border-[#E8E3D8] w-full flex justify-center">
            <span
              className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"
              title="AI Engine Active"
            ></span>
          </div>
        </aside>
      )}
    </>
  );
};
