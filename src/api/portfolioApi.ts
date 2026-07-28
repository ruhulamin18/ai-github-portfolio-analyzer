import { apiRequest } from './client';
import {
  GitHubProfile,
  Repository,
  AIPortfolioReport,
  SkillGapAnalysis,
  ResumeMatchResult,
  CareerRecommendation,
} from '../types';

export async function fetchAIPortfolioReportApi(
  profile: GitHubProfile,
  repos: Repository[]
): Promise<AIPortfolioReport> {
  return apiRequest<AIPortfolioReport>('/api/analyze/portfolio', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profile, repos }),
  });
}

export async function fetchSkillGapAnalysisApi(
  profile: GitHubProfile,
  repos: Repository[],
  targetRole: string
): Promise<SkillGapAnalysis> {
  return apiRequest<SkillGapAnalysis>('/api/analyze/skill-gap', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profile, repos, targetRole }),
  });
}

export async function fetchCareerGuidanceApi(
  profile: GitHubProfile,
  repos: Repository[]
): Promise<CareerRecommendation> {
  return apiRequest<CareerRecommendation>('/api/career', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profile, repos }),
  });
}

export async function fetchResumeMatchApi(
  resumeText: string,
  repos: Repository[]
): Promise<ResumeMatchResult> {
  return apiRequest<ResumeMatchResult>('/api/analyze/resume-match', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resumeText, repos }),
  });
}
