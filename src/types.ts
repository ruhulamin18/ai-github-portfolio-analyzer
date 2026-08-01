export interface LatestActivity {
  repoName: string;
  commitMessage: string;
  updatedAt: string;
}

export interface GitHubProfile {
  username: string;
  name: string;
  avatarUrl: string;
  bio: string;
  company?: string;
  location?: string;
  email?: string;
  website?: string;
  twitterUsername?: string;
  followers: number;
  following: number;
  publicReposCount: number;
  starsCount: number;
  forksCount: number;
  contributionsLastYear: number;
  createdAt: string;
}

export interface LanguageStat {
  name: string;
  bytes: number;
  percentage: number;
  color: string;
  repoCount: number;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface Repository {
  id: number;
  name: string;
  fullName: string;
  description: string;
  htmlUrl: string;
  stars: number;
  forks: number;
  watchers: number;
  language: string;
  topics: string[];
  updatedAt: string;
  defaultBranch: string;
  hasReadme: boolean;
  readmeScore?: number;
  repoScore?: number;
  hasLicense: boolean;
  hasWorkflows: boolean; // CI/CD
  hasSecurityFile: boolean;
  hasGitignore: boolean;
  hasContributing: boolean;
  hasPages?: boolean;
  organizationScore?: number;
  deploymentUrl?: string;
  openIssuesCount: number;
  completenessScore: number;
}

export interface RepoAnalysisDetail {
  repoName: string;
  overallScore: number;
  readmeScore: number;
  readmeChecklist: {
    hasDescription: boolean;
    hasInstallation: boolean;
    hasFeatures: boolean;
    hasTechStack: boolean;
    hasScreenshots: boolean;
    hasApiDocs: boolean;
    hasLicense: boolean;
    hasDemoLink: boolean;
    hasUsage: boolean;
    hasBadges: boolean;
  };
  structureRating: 'Excellent' | 'Good' | 'Needs Improvement';
  fileOrganizationScore: number;
  commitFrequency: 'High' | 'Moderate' | 'Low' | 'Inactive';
  deploymentStatus: 'Deployed' | 'Not Deployed';
  cicdStatus: 'Configured' | 'Missing';
  securityScore: number;
  keyStrengths: string[];
  recommendations: string[];
}

export interface PortfolioScoreFactor {
  name: string;
  score: number; // 0 - 100
  weight: number;
  description: string;
  grade: string;
}

export interface OverallPortfolioScore {
  totalScore: number; // 0 - 100
  letterGrade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D' | 'F' | string;
  performanceLevel?: 'Outstanding' | 'Excellent' | 'Very Good' | 'Good' | 'Fair' | 'Needs Improvement' | string;
  factors: PortfolioScoreFactor[];
  summary: string;
}

export interface AIPortfolioReport {
  overallQualitySummary: string;
  codeOrganizationRating: string;
  documentationQualityRating: string;
  careerReadinessRating: string;
  strengths: string[];
  weaknesses: string[];
  criticalFixes: string[];
  recommendedActionPlan: string[];
}

export interface SkillGapAnalysis {
  targetRole: 'Frontend Developer' | 'Backend Developer' | 'Full Stack Developer' | 'ML Engineer' | 'Data Scientist' | 'DevOps Engineer' | string;
  matchPercentage: number;
  userSkills: string[];
  missingSkills: string[];
  coreSkillsTotal?: number;
  coreSkillsMatched?: number;
  recommendedTechnologies: string[];
  learningPriorities: {
    skill: string;
    priority: 'High' | 'Medium' | 'Low' | string;
    estimatedHours: number;
    description: string;
  }[];
  industryReadiness?: string;
  strongSkills?: string[];
  weakAreas?: string[];
  skillDistribution?: { name: string; percentage: number }[];
  recommendations?: string[];
  roadmap?: string[];
  recommendedProjects?: string[];
  resumeSuggestions?: string[];
  chartData?: {
    radar?: { category: string; score: number }[];
    bar?: { skill: string; status: number }[];
    pie?: { name: string; value: number }[];
  };
}

export interface ResumeMatchResult {
  matchScore: number;
  resumeSkillsDetected: string[];
  githubSkillsDetected: string[];
  matchingSkills: string[];
  skillsInResumeNotInGithub: string[];
  skillsInGithubNotInResume: string[];
  portfolioConsistencyRating: 'High' | 'Moderate' | 'Low';
  missingProjectsSuggestions: string[];
  resumeImprovements: string[];
}

export interface RoadmapNode {
  id: string;
  title: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  completed: boolean;
  description: string;
  recommendedResource: string;
  subtopics: string[];
}

export interface LearningRoadmap {
  role: string;
  nodes: RoadmapNode[];
}

export interface CareerRecommendation {
  suggestedRoles: {
    roleTitle: string;
    fitPercentage: number;
    reasoning: string;
  }[];
  certifications: {
    name: string;
    issuer: string;
    relevance: string;
  }[];
  recommendedCourses: {
    title: string;
    provider: string;
    level: string;
  }[];
  openSourceProjectsToContribute: {
    name: string;
    repoUrl: string;
    techStack: string[];
    description: string;
  }[];
  portfolioActionItems: string[];
}

export interface UserFeedback {
  id: string;
  username: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface AdminAnalytics {
  totalUsers: number;
  totalProfilesAnalyzed: number;
  totalReposAnalyzed: number;
  geminiApiRequestsToday: number;
  averagePortfolioScore: number;
  topTargetRole: string;
  apiUsageHistory: { date: string; calls: number }[];
}
