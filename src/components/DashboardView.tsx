import React, { useMemo } from 'react';
import {
  GitHubProfile,
  Repository,
  LanguageStat,
  ContributionDay,
  LatestActivity,
  OverallPortfolioScore,
} from '../types';
import { DashboardHero } from './dashboard/DashboardHero';
import { RepositoryHealthCard } from './dashboard/RepositoryHealthCard';
import { TechnologyStackCard } from './dashboard/TechnologyStackCard';
import { AIInsightsCard } from './dashboard/AIInsightsCard';
import { ContributionHeatmap } from './dashboard/ContributionHeatmap';
import { RepositoryGrid } from './dashboard/RepositoryGrid';

import { parseLanguageDistribution } from '../utils/languageParser';
import { calculateRepositoryHealth } from '../utils/scoreCalculator';
import { generateDynamicInsights } from '../utils/repositoryAnalyzer';

interface DashboardViewProps {
  profile: GitHubProfile;
  repos: Repository[];
  languages: LanguageStat[];
  heatmap: ContributionDay[];
  portfolioScore: OverallPortfolioScore;
  latestActivity: LatestActivity | null;
  onAnalyzeRepo: (repo: Repository) => void;
  onNavigateTab: (tab: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  repos,
  languages,
  heatmap,
  portfolioScore,
  latestActivity,
  onAnalyzeRepo,
  onNavigateTab,
}) => {
  // Memoized repository analysis and calculations
  const healthPillars = useMemo(() => calculateRepositoryHealth(repos), [repos]);
  const totalRepoCount = repos.length || 1;

  const languageDistribution = useMemo(
    () => parseLanguageDistribution(languages, repos),
    [languages, repos]
  );

  // Calculate streaks from heatmap
  const { realLongestStreak, realCurrentStreak } = useMemo(() => {
    let longest = 0;
    let current = 0;
    let activeCounter = 0;

    if (heatmap && heatmap.length > 0) {
      heatmap.forEach((day) => {
        if (day.count > 0) {
          activeCounter++;
          if (activeCounter > longest) {
            longest = activeCounter;
          }
        } else {
          activeCounter = 0;
        }
      });

      for (let i = heatmap.length - 1; i >= 0; i--) {
        if (heatmap[i].count > 0) {
          current++;
        } else {
          if (i === heatmap.length - 1) continue;
          break;
        }
      }
    }

    return { realLongestStreak: longest, realCurrentStreak: current };
  }, [heatmap]);

  const dynamicInsights = useMemo(
    () => generateDynamicInsights(repos, languageDistribution),
    [repos, languageDistribution]
  );

  return (
    <div className="space-y-6 font-sans text-[#1E1E1E]">
      {/* Top Hero Section */}
      <DashboardHero
        profile={profile}
        portfolioScore={portfolioScore}
        repos={repos}
        latestActivity={latestActivity}
        onNavigateTab={onNavigateTab}
      />

      {/* Middle Core Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RepositoryHealthCard
          healthPillars={healthPillars}
          totalRepoCount={totalRepoCount}
          onNavigateTab={onNavigateTab}
        />

        <TechnologyStackCard
          languageDistribution={languageDistribution}
          totalRepoCount={totalRepoCount}
        />

        <AIInsightsCard
          overallHealthScore={healthPillars.overallHealthScore}
          dynamicInsights={dynamicInsights}
          onNavigateTab={onNavigateTab}
        />
      </div>

      {/* Yearly Commit Activity Matrix */}
      <ContributionHeatmap
        profile={profile}
        heatmap={heatmap}
        realCurrentStreak={realCurrentStreak}
        realLongestStreak={realLongestStreak}
      />

      {/* Featured Repositories Grid */}
      <RepositoryGrid
        repos={repos}
        onAnalyzeRepo={onAnalyzeRepo}
        onNavigateTab={onNavigateTab}
      />
    </div>
  );
};
