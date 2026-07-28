import { apiRequest } from './client';
import {
  GitHubProfile,
  Repository,
  LanguageStat,
  ContributionDay,
  OverallPortfolioScore,
  LatestActivity,
} from '../types';

export interface GitHubDataResponse {
  profile: GitHubProfile;
  repos: Repository[];
  languages: LanguageStat[];
  heatmap: ContributionDay[];
  portfolioScore: OverallPortfolioScore;
  latestActivity: LatestActivity | null;
}

export async function fetchGitHubUserData(
  targetUser: string,
  customToken?: string
): Promise<GitHubDataResponse> {
  const headers: Record<string, string> = {};
  if (customToken) {
    headers['x-github-token'] = customToken;
  }

  return apiRequest<GitHubDataResponse>(`/api/github/profile/${encodeURIComponent(targetUser.trim())}`, {
    headers,
  });
}
