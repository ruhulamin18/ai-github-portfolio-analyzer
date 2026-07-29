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
<<<<<<< HEAD
  latestActivity?: LatestActivity | null;
=======
  latestActivity: LatestActivity | null;
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
}

export async function fetchGitHubUserData(
  targetUser: string,
  customToken?: string
): Promise<GitHubDataResponse> {
  const headers: Record<string, string> = {};
  if (customToken) {
    headers['x-github-token'] = customToken;
  }

<<<<<<< HEAD
  return apiRequest<GitHubDataResponse>(`/api/github/profile/${targetUser}`, {
=======
  return apiRequest<GitHubDataResponse>(`/api/github/profile/${encodeURIComponent(targetUser.trim())}`, {
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
    headers,
  });
}
