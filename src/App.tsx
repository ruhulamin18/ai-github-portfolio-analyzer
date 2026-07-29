import React, { useState, useEffect } from 'react';
import { Github, Search, Sparkles, ShieldCheck } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Sidebar, TabType } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { RepoAnalysisView } from './components/RepoAnalysisView';
import { AIPortfolioView } from './components/AIPortfolioView';
import { SkillGapView } from './components/SkillGapView';
import { ResumeMatchView } from './components/ResumeMatchView';
import { RoadmapView } from './components/RoadmapView';
import { CareerGuidanceView } from './components/CareerGuidanceView';
import { ReportExportView } from './components/ReportExportView';
import { LandingView } from './components/LandingView';
import { Footer } from './components/Footer';
import { OAuthModal } from './components/OAuthModal';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { DashboardSkeleton } from './components/common/SkeletonLoader';
import { RetryComponent } from './components/common/RetryComponent';

import { useGithubProfile } from './hooks/useGithubProfile';
import { useAIAnalysis } from './hooks/useAIAnalysis';
import { useResumeAnalysis } from './hooks/useResumeAnalysis';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [username, setUsername] = useState<string>('');
  const [customToken, setCustomToken] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');

  const [isOAuthOpen, setIsOAuthOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // Custom Hooks
  const {
    profile,
    repos,
    languages,
    heatmap,
    portfolioScore,
    latestActivity,
    loading: loadingProfile,
    error: profileError,
    refetch: refetchProfile,
    setProfile,
  } = useGithubProfile(username, customToken);

  const {
    aiReport,
    skillGap,
    career,
    selectedRole,
    setSelectedRole,
    loadingAI,
    loadingSkillGap,
    fetchAIPortfolio,
    fetchSkillGap,
    fetchCareer,
  } = useAIAnalysis();

  const {
    resumeMatch,
    loading: loadingResume,
    matchResume,
  } = useResumeAnalysis();

  // Trigger initial AI analysis upon profile load
  useEffect(() => {
    if (profile && repos.length > 0) {
      fetchAIPortfolio(profile, repos);
      const timer1 = setTimeout(() => fetchSkillGap(profile, repos, selectedRole), 1000);
      const timer2 = setTimeout(() => fetchCareer(profile, repos), 2200);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [profile, repos, fetchAIPortfolio, fetchSkillGap, fetchCareer, selectedRole]);

  const handleMatchResume = async (resumeText: string) => {
    if (repos) {
      await matchResume(resumeText, repos);
    }
  };

  const handleRoleChange = (newRole: string) => {
    setSelectedRole(newRole);
    if (profile && repos) {
      fetchSkillGap(profile, repos, newRole);
    }
  };

  const normalizeGitHubUsername = (value: string) => {
    const trimmed = value.trim();
    try {
      const url = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
      if (url.hostname === 'github.com' || url.hostname === 'www.github.com') {
        return url.pathname.split('/').filter(Boolean)[0] || '';
      }
    } catch {
      // Plain text
    }
    return trimmed.replace(/^@/, '').replace(/^github\.com\//i, '').split('/')[0];
  };

  const handleInitialSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = normalizeGitHubUsername(searchInput);
    if (cleanUser) {
      setUsername(cleanUser);
      setSearchInput('');
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#F5F1E8] text-[#1E1E1E] flex flex-col font-sans selection:bg-[#F2C879] selection:text-[#1A1A1A]">
        {/* Top Navbar - Only rendered when viewing a profile audit */}
        {Boolean(profile) && (
          <Navbar
            currentProfile={profile}
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
            onSearchUsername={(usr) => setUsername(usr)}
            customToken={customToken}
            onUpdateToken={(token) => setCustomToken(token)}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        )}

        {/* Main Body */}
        <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row">
          {/* Sidebar Navigation - Only shown when profile is active */}
          {Boolean(username && profile && portfolioScore) && (
            <Sidebar
              activeTab={activeTab}
              onTabChange={(tab) => setActiveTab(tab)}
              overallScore={portfolioScore?.totalScore || 0}
              letterGrade={portfolioScore?.letterGrade || 'â€”'}
              isOpen={isSidebarOpen}
            />
          )}

          {/* Content View Container */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto min-w-0">
            {loadingProfile ? (
              <DashboardSkeleton />
            ) : profileError ? (
              <RetryComponent message={profileError} onRetry={refetchProfile} />
            ) : !username || !profile || !portfolioScore ? (
              <LandingView
                onSearch={(usr) => setUsername(usr)}
                customToken={customToken}
                onUpdateToken={(token) => setCustomToken(token)}
              />
            ) : (
              <ErrorBoundary>
                {activeTab === 'dashboard' && (
                  <DashboardView
                    profile={profile}
                    repos={repos}
                    languages={languages}
                    heatmap={heatmap}
                    portfolioScore={portfolioScore}
                    latestActivity={latestActivity}
                    onAnalyzeRepo={() => setActiveTab('repos')}
                    onNavigateTab={(t) => setActiveTab(t)}
                  />
                )}

                {activeTab === 'repos' && (
                  <RepoAnalysisView repos={repos} onAnalyzeRepo={() => {}} />
                )}

                {activeTab === 'ai-report' && (
                  <AIPortfolioView
                    report={aiReport}
                    loading={loadingAI}
                    onRefreshReport={() => fetchAIPortfolio(profile, repos)}
                    profile={profile}
                  />
                )}

                {activeTab === 'skill-gap' && (
                  <SkillGapView
                    skillGap={skillGap}
                    loading={loadingSkillGap}
                    onSelectRole={handleRoleChange}
                    selectedRole={selectedRole}
                  />
                )}

                {activeTab === 'resume-match' && (
                  <ResumeMatchView
                    repos={repos}
                    onMatchResume={handleMatchResume}
                    matchResult={resumeMatch}
                    loading={loadingResume}
                  />
                )}

                {activeTab === 'roadmap' && <RoadmapView role={selectedRole} />}

                {activeTab === 'career' && (
                  <CareerGuidanceView career={career} loading={loadingAI} />
                )}

                {activeTab === 'export' && (
                  <ReportExportView
                    profile={profile}
                    repos={repos}
                    portfolioScore={portfolioScore}
                    aiReport={aiReport}
                  />
                )}
              </ErrorBoundary>
            )}
          </main>
        </div>

        {/* Premium Footer */}
        <Footer />

        {/* OAuth Login Modal */}
        <OAuthModal
          isOpen={isOAuthOpen}
          onClose={() => setIsOAuthOpen(false)}
          onSuccessLogin={(userData) => {
            setProfile(userData);
            setIsOAuthOpen(false);
          }}
        />
      </div>
    </ErrorBoundary>
  );
}

