import { useState, useCallback } from 'react';
import {
  fetchAIPortfolioReportApi,
} from '../api/portfolioApi';
import { analyzeSkillGap } from '../utils/skillGapAnalyzer';
import { generateCareerGuidance } from '../utils/careerGuidanceAnalyzer';
import {
  GitHubProfile,
  Repository,
  AIPortfolioReport,
  SkillGapAnalysis,
  CareerRecommendation,
} from '../types';

export function useAIAnalysis() {
  const [aiReport, setAiReport] = useState<AIPortfolioReport | null>(null);
  const [skillGap, setSkillGap] = useState<SkillGapAnalysis | null>(null);
  const [career, setCareer] = useState<CareerRecommendation | null>(null);

  const [loadingAI, setLoadingAI] = useState<boolean>(false);
  const [loadingSkillGap, setLoadingSkillGap] = useState<boolean>(false);
  const [loadingCareer, setLoadingCareer] = useState<boolean>(false);

  const [selectedRole, setSelectedRole] = useState<string>('Full Stack Developer');

  const fetchAIPortfolio = useCallback(async (prof: GitHubProfile, repoList: Repository[]) => {
    setLoadingAI(true);
    try {
      const report = await fetchAIPortfolioReportApi(prof, repoList);
      setAiReport(report);
      return report;
    } catch (err) {
      console.error('Error fetching AI portfolio report:', err);
      return null;
    } finally {
      setLoadingAI(false);
    }
  }, []);

  const fetchSkillGap = useCallback(
    async (prof: GitHubProfile, repoList: Repository[], role: string) => {
      void prof;
      setLoadingSkillGap(true);
      try {
        const gap = analyzeSkillGap(repoList, role);
        setSkillGap(gap);
        return gap;
      } catch (err) {
        console.error('Error fetching skill gap analysis:', err);
        return null;
      } finally {
        setLoadingSkillGap(false);
      }
    },
    []
  );

  const fetchCareer = useCallback(async (prof: GitHubProfile, repoList: Repository[]) => {
    setLoadingCareer(true);
    try {
      const car = generateCareerGuidance(prof, repoList);
      setCareer(car);
      return car;
    } catch (err) {
      console.error('Error fetching career guidance:', err);
      return null;
    } finally {
      setLoadingCareer(false);
    }
  }, []);

  return {
    aiReport,
    skillGap,
    career,
    selectedRole,
    setSelectedRole,
    loadingAI,
    loadingSkillGap,
    loadingCareer,
    fetchAIPortfolio,
    fetchSkillGap,
    fetchCareer,
  };
}
