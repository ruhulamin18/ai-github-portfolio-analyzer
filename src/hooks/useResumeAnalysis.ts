import { useState, useCallback } from 'react';
import { fetchResumeMatchApi } from '../api/portfolioApi';
import { Repository, ResumeMatchResult } from '../types';

export function useResumeAnalysis() {
  const [resumeMatch, setResumeMatch] = useState<ResumeMatchResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const matchResume = useCallback(async (resumeText: string, repos: Repository[]) => {
    setLoading(true);
    setError(null);
    try {
      const match = await fetchResumeMatchApi(resumeText, repos);
      setResumeMatch(match);
      return match;
    } catch (err: any) {
      console.error('Error matching resume:', err);
      setError(err.message || 'Failed to analyze resume');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    resumeMatch,
    loading,
    error,
    matchResume,
    setResumeMatch,
  };
}
