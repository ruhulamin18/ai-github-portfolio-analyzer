import React, { useState } from 'react';
import {
  Github,
  Search,
  ShieldCheck,
  Key,
  Bell,
  Menu,
  X,
  LayoutDashboard,
  FolderGit2,
  BrainCircuit,
  Target,
  FileCheck2,
  FileDown,
  Briefcase,
} from 'lucide-react';
import { GitHubProfile } from '../types';
import { TabType } from './Sidebar';

interface NavbarProps {
  currentProfile: GitHubProfile | null;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onSearchUsername: (username: string) => void;
  customToken: string;
  onUpdateToken: (token: string) => void;
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentProfile,
  activeTab,
  onTabChange,
  onSearchUsername,
  customToken,
  onUpdateToken,
  onToggleSidebar,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [tokenValue, setTokenValue] = useState(customToken);
  const [showNotifications, setShowNotifications] = useState(false);

  const normalizeGitHubUsername = (value: string) => {
    const trimmed = value.trim();
    try {
      const url = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
      if (url.hostname === 'github.com' || url.hostname === 'www.github.com') {
        return url.pathname.split('/').filter(Boolean)[0] || '';
      }
    } catch {
      // A plain username is expected when the value is not a URL.
    }
    return trimmed.replace(/^@/, '').replace(/^github\.com\//i, '').split('/')[0];
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const username = normalizeGitHubUsername(searchQuery);
    if (username) {
      onSearchUsername(username);
      setSearchQuery('');
    }
  };

  const handleSaveToken = () => {
    onUpdateToken(tokenValue.trim());
    setShowTokenInput(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8E3D8] text-[#1E1E1E] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo, Brand & Sidebar Toggle */}
          <div className="flex items-center gap-3">
            {currentProfile && (
              <button
                onClick={onToggleSidebar}
                className="p-2 text-[#1E1E1E] bg-[#F5F1E8] hover:bg-[#E8E3D8] border border-[#E8E3D8] rounded-xl cursor-pointer transition-colors"
                title="Toggle Navigation Sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            <div className="w-10 h-10 rounded-2xl bg-[#F2C879] flex items-center justify-center shadow-xs text-[#1A1A1A] font-bold shrink-0">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-[#1E1E1E]">
                  AI GitHub Analyzer
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-[#F2C879]/30 text-[#1E1E1E] border border-[#F2C879] rounded-full">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-[#8B8680] font-medium hidden sm:block">
                SaaS Code Quality & Insights
              </p>
            </div>
          </div>

          {/* Search Bar (Center Header) - Only visible when profile is active */}
          {currentProfile ? (
            <form onSubmit={handleSearchSubmit} className="flex items-center max-w-md relative flex-1 mx-2 sm:mx-6">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-[#8B8680] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Analyze GitHub user..."
                  className="w-full pl-10 pr-20 py-2 text-xs bg-[#F5F1E8] border border-[#E8E3D8] rounded-xl text-[#1E1E1E] placeholder-[#8B8680] focus:outline-none focus:ring-2 focus:ring-[#F2C879] focus:bg-white transition-all font-medium"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 text-[11px] font-bold bg-[#F2C879] hover:bg-[#e2b765] text-[#1A1A1A] rounded-lg transition-all cursor-pointer shadow-xs"
                >
                  Search
                </button>
              </div>
            </form>
          ) : (
            <div className="flex-1" />
          )}

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-[#8B8680] hover:text-[#1E1E1E] bg-[#F5F1E8] hover:bg-[#E8E3D8] border border-[#E8E3D8] rounded-xl transition-colors relative cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#22C55E]"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-[#E8E3D8] rounded-2xl shadow-xl p-3 z-50 text-xs text-[#1E1E1E]">
                  <div className="font-bold border-b border-[#E8E3D8] pb-2 mb-2 flex justify-between items-center">
                    <span>Recent Activity</span>
                    <span className="text-[10px] text-[#8B8680]">2 New</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 rounded-xl bg-[#F5F1E8]">
                      <p className="font-semibold text-[11px]">AI Audit Completed</p>
                      <p className="text-[10px] text-[#8B8680]">Portfolio score calculated at 92/100.</p>
                    </div>
                    <div className="p-2 rounded-xl bg-[#F5F1E8]">
                      <p className="font-semibold text-[11px]">Repo Sync Successful</p>
                      <p className="text-[10px] text-[#8B8680]">32 repositories fetched from GitHub.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* PAT Token Toggle */}
            <button
              onClick={() => setShowTokenInput(!showTokenInput)}
              title="Add GitHub Personal Access Token"
              className={`p-2 rounded-xl border text-xs flex items-center gap-1 transition-colors cursor-pointer ${
                customToken
                  ? 'bg-[#22C55E]/10 border-[#22C55E]/30 text-[#22C55E]'
                  : 'bg-[#F5F1E8] border-[#E8E3D8] text-[#8B8680] hover:text-[#1E1E1E]'
              }`}
            >
              <Key className="w-4 h-4" />
            </button>

            {/* Profile Avatar */}
            {currentProfile && <div className="flex items-center gap-2 pl-2 border-l border-[#E8E3D8]">
              <img
                src={currentProfile.avatarUrl}
                alt={currentProfile.username}
                className="w-8 h-8 rounded-full border border-[#F2C879] bg-[#F5F1E8] object-cover"
              />
              <span className="hidden sm:inline font-bold text-xs text-[#1E1E1E]">
                @{currentProfile.username}
              </span>
            </div>}

          </div>
        </div>

        {/* Token Input Drawer */}
        {showTokenInput && (
          <div className="py-2.5 px-4 bg-[#F5F1E8] border-t border-[#E8E3D8] flex flex-wrap items-center gap-3 text-xs rounded-b-2xl">
            <span className="text-[#8B8680] font-medium whitespace-nowrap">GitHub Personal Access Token:</span>
            <input
              type="password"
              value={tokenValue}
              onChange={(e) => setTokenValue(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              className="flex-1 bg-white border border-[#E8E3D8] rounded-xl px-3 py-1 font-mono text-[#1E1E1E] focus:outline-none focus:ring-1 focus:ring-[#F2C879]"
            />
            <button
              onClick={handleSaveToken}
              className="px-3 py-1 bg-[#F2C879] text-[#1A1A1A] font-bold rounded-xl hover:bg-[#e2b765] transition-colors"
            >
              Save Token
            </button>
            <button
              onClick={() => {
                setTokenValue('');
                onUpdateToken('');
                setShowTokenInput(false);
              }}
              className="px-2 py-1 text-[#8B8680] hover:text-[#1E1E1E]"
            >
              Clear
            </button>
          </div>
        )}

      </div>
    </header>
  );
};
