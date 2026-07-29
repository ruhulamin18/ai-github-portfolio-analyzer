import { useState, useEffect, useCallback } from 'react';
import { fetchGitHubUserData } from '../api/githubApi';
import {
  GitHubProfile,
  Repository,
  LanguageStat,
  ContributionDay,
  OverallPortfolioScore,
  LatestActivity,
} from '../types';

export function useGithubProfile(username: string, customToken: string = '') {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [languages, setLanguages] = useState<LanguageStat[]>([]);
  const [heatmap, setHeatmap] = useState<ContributionDay[]>([]);
  const [portfolioScore, setPortfolioScore] = useState<OverallPortfolioScore | null>(null);
  const [latestActivity, setLatestActivity] = useState<LatestActivity | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchGitHubUserData(username, customToken);
      setProfile(data.profile);
      setRepos(data.repos);
      setLanguages(data.languages);
      setHeatmap(data.heatmap);
      setPortfolioScore(data.portfolioScore);
<<<<<<< HEAD
      setLatestActivity(data.latestActivity || null);
=======
      setLatestActivity(data.latestActivity);
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
      return data;
    } catch (err: any) {
      console.error('Error loading GitHub profile:', err);
      setError(err.message || 'Failed to load GitHub data');
      return null;
    } finally {
      setLoading(false);
    }
  }, [username, customToken]);

  useEffect(() => {
    if (!username.trim()) {
      setProfile(null);
      setRepos([]);
      setLanguages([]);
      setHeatmap([]);
      setPortfolioScore(null);
      setLatestActivity(null);
      setError(null);
      setLoading(false);
      return;
    }
    loadProfile();
  }, [loadProfile]);

  return {
    profile,
    repos,
    languages,
    heatmap,
    portfolioScore,
    latestActivity,
    loading,
    error,
    refetch: loadProfile,
<<<<<<< HEAD
    setProfile,
=======
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
  };
}
