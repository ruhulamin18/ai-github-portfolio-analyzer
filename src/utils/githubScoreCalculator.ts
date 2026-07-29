import { GitHubProfile, OverallPortfolioScore, Repository } from '../types';

export type PerformanceLevel =
  | 'Outstanding'
  | 'Excellent'
  | 'Very Good'
  | 'Good'
  | 'Fair'
  | 'Needs Improvement';

export interface GitHubMetrics {
  repositoryQuality: number; // 0-100
  readmeQuality: number; // 0-100
  documentationScore: number; // 0-100
  deploymentStatus: number; // 0-100
  codeQuality: number; // 0-100
  githubActivity: number; // 0-100
  languageDiversity: number; // 0-100
  cicdStatus: number; // 0-100
  securityScore: number; // 0-100
  licenseCompliance: number; // 0-100
  openSourceContribution: number; // 0-100
}

export interface MetricWeightConfig {
  key: keyof GitHubMetrics;
  name: string;
  weight: number; // e.g. 0.15 for 15%
  description: string;
}

export interface WeightedMetricDetail {
  key: keyof GitHubMetrics;
  name: string;
  rawScore: number; // 0-100
  weight: number; // e.g. 0.15
  weightPercentage: string; // "15%"
  weightedScore: number; // rawScore * weight
  description: string;
}

export interface OverallGitHubScoreResult {
  overallScore: number; // 0-100 whole number
  performanceLevel: PerformanceLevel;
  metrics: GitHubMetrics;
  breakdown: WeightedMetricDetail[];
  letterGrade: string;
}

/**
 * Calculates the weighted score for a single metric.
 * If score is undefined, null, or NaN, it defaults to 0.
 */
export function calculateWeightedScore(score: number | undefined | null, weight: number): number {
  if (score === undefined || score === null || isNaN(score)) {
    return 0;
  }
  const safeScore = Math.max(0, Math.min(100, score));
  return safeScore * weight;
}

/**
 * Automatically determines the performance level based on the calculated Overall GitHub Score.
 * 90–100 → Outstanding
 * 80–89  → Excellent
 * 70–79  → Very Good
 * 60–69  → Good
 * 50–59  → Fair
 * Below 50 → Needs Improvement
 */
export function calculatePerformanceLevel(score: number): PerformanceLevel {
  const safeScore = isNaN(score) ? 0 : Math.round(score);
  if (safeScore >= 90) return 'Outstanding';
  if (safeScore >= 80) return 'Excellent';
  if (safeScore >= 70) return 'Very Good';
  if (safeScore >= 60) return 'Good';
  if (safeScore >= 50) return 'Fair';
  return 'Needs Improvement';
}

/**
 * Determines a standard letter grade based on a 0-100 score.
 */
export function calculateLetterGrade(score: number): string {
  const s = isNaN(score) ? 0 : Math.round(score);
  if (s >= 95) return 'A+';
  if (s >= 90) return 'A';
  if (s >= 85) return 'A-';
  if (s >= 80) return 'B+';
  if (s >= 75) return 'B';
  if (s >= 70) return 'B-';
  if (s >= 65) return 'C+';
  if (s >= 60) return 'C';
  if (s >= 50) return 'D';
  return 'F';
}

/**
 * Calculates the Overall GitHub Score using the strict 11-metric weighted formula.
 * Formula:
 * Overall GitHub Score =
 *   (RepositoryQuality × 0.15) +
 *   (READMEQuality × 0.15) +
 *   (DocumentationScore × 0.10) +
 *   (DeploymentStatus × 0.10) +
 *   (CodeQuality × 0.10) +
 *   (GitHubActivity × 0.10) +
 *   (LanguageDiversity × 0.10) +
 *   (CICDStatus × 0.05) +
 *   (SecurityScore × 0.05) +
 *   (LicenseCompliance × 0.05) +
 *   (OpenSourceContribution × 0.05)
 */
export function calculateOverallGitHubScore(metrics: Partial<GitHubMetrics>): OverallGitHubScoreResult {
  const safeMetrics: GitHubMetrics = {
    repositoryQuality: metrics.repositoryQuality ?? 0,
    readmeQuality: metrics.readmeQuality ?? 0,
    documentationScore: metrics.documentationScore ?? 0,
    deploymentStatus: metrics.deploymentStatus ?? 0,
    codeQuality: metrics.codeQuality ?? 0,
    githubActivity: metrics.githubActivity ?? 0,
    languageDiversity: metrics.languageDiversity ?? 0,
    cicdStatus: metrics.cicdStatus ?? 0,
    securityScore: metrics.securityScore ?? 0,
    licenseCompliance: metrics.licenseCompliance ?? 0,
    openSourceContribution: metrics.openSourceContribution ?? 0,
  };

  const metricConfigs: MetricWeightConfig[] = [
    {
      key: 'repositoryQuality',
      name: 'Repository Quality',
      weight: 0.15,
      description: 'Completeness, star counts, fork count, and issue hygiene across repositories',
    },
    {
      key: 'readmeQuality',
      name: 'README Quality',
      weight: 0.15,
      description: 'Depth, installation steps, feature overview, and clarity of project READMEs',
    },
    {
      key: 'documentationScore',
      name: 'Documentation Score',
      weight: 0.10,
      description: 'Presence of repository summary text, topics, and API/usage documentation',
    },
    {
      key: 'deploymentStatus',
      name: 'Deployment Status',
      weight: 0.10,
      description: 'Live production URL or GitHub Pages deployment availability',
    },
    {
      key: 'codeQuality',
      name: 'Code Quality',
      weight: 0.10,
      description: 'Folder organization hygiene, non-fork status, and project file structure',
    },
    {
      key: 'githubActivity',
      name: 'GitHub Activity',
      weight: 0.10,
      description: 'Commit activity, contribution consistency, and recent repository updates',
    },
    {
      key: 'languageDiversity',
      name: 'Language Diversity',
      weight: 0.10,
      description: 'Breadth of technical stack, languages, and framework mastery',
    },
    {
      key: 'cicdStatus',
      name: 'CI/CD Test Status',
      weight: 0.05,
      description: 'Automated GitHub Actions workflows, test pipelines, and build setups',
    },
    {
      key: 'securityScore',
      name: 'Security Score',
      weight: 0.05,
      description: 'Security policy presence, dependabot checks, or security tags',
    },
    {
      key: 'licenseCompliance',
      name: 'License Compliance',
      weight: 0.05,
      description: 'OSI open source license presence across public repositories',
    },
    {
      key: 'openSourceContribution',
      name: 'Open Source Contribution',
      weight: 0.05,
      description: 'Community contributions, forks, pull requests, and star engagement',
    },
  ];

  let sumWeightedScores = 0;
  const breakdown: WeightedMetricDetail[] = metricConfigs.map((config) => {
    const rawVal = safeMetrics[config.key] ?? 0;
    const weightedVal = calculateWeightedScore(rawVal, config.weight);
    sumWeightedScores += weightedVal;

    return {
      key: config.key,
      name: config.name,
      rawScore: Math.round(Math.max(0, Math.min(100, rawVal))),
      weight: config.weight,
      weightPercentage: `${Math.round(config.weight * 100)}%`,
      weightedScore: Number(weightedVal.toFixed(2)),
      description: config.description,
    };
  });

  const clampedScore = Math.max(0, Math.min(100, sumWeightedScores));
  const overallScore = Math.round(clampedScore);
  const performanceLevel = calculatePerformanceLevel(overallScore);
  const letterGrade = calculateLetterGrade(overallScore);

  return {
    overallScore,
    performanceLevel,
    metrics: safeMetrics,
    breakdown,
    letterGrade,
  };
}

/**
 * Dynamically extracts all 11 GitHub metrics from GitHub profile & repository arrays.
 */
export function extractGitHubMetrics(
  profile: GitHubProfile | null,
  repos: Repository[] = []
): GitHubMetrics {
  const total = repos.length;
  if (!total) {
    return {
      repositoryQuality: 0,
      readmeQuality: 0,
      documentationScore: 0,
      deploymentStatus: 0,
      codeQuality: 0,
      githubActivity: 0,
      languageDiversity: 0,
      cicdStatus: 0,
      securityScore: 0,
      licenseCompliance: 0,
      openSourceContribution: 0,
    };
  }

  // 1. Repository Quality (15%)
  const repoQuality = Math.round(
    repos.reduce((acc, r) => acc + (r.completenessScore ?? r.repoScore ?? 50), 0) / total
  );

  // 2. README Quality (15%)
  const readmeQuality = Math.round(
    repos.reduce((acc, r) => acc + (r.readmeScore ?? (r.hasReadme ? 70 : 0)), 0) / total
  );

  // 3. Documentation Score (10%)
  const docCount = repos.filter(
    (r) =>
      r.description &&
      r.description.trim().length > 5 &&
      r.description !== 'No description provided.'
  ).length;
  const docScore = Math.round((docCount / total) * 100);

  // 4. Deployment Status (10%)
  const deployedCount = repos.filter((r) => Boolean(r.deploymentUrl || r.hasPages)).length;
  const deploymentStatus = Math.round((deployedCount / total) * 100);

  // 5. Code Quality (10%)
  const codeQuality = Math.round(
    repos.reduce((acc, r) => acc + (r.organizationScore ?? 70), 0) / total
  );

  // 6. GitHub Activity (10%)
  const contribs = profile?.contributionsLastYear ?? 0;
  let activityScore = 0;
  if (contribs > 0) {
    activityScore = Math.min(100, Math.round((contribs / 300) * 100));
  } else {
    // Fallback based on recent push activity across repos
    const recentlyUpdated = repos.filter((r) => {
      const diffMs = Date.now() - new Date(r.updatedAt).getTime();
      return diffMs < 180 * 24 * 60 * 60 * 1000; // updated in last 180 days
    }).length;
    activityScore = Math.round((recentlyUpdated / total) * 100);
  }

  // 7. Language Diversity (10%)
  const languages = new Set(repos.map((r) => r.language).filter(Boolean));
  const languageDiversity = Math.min(100, Math.round((languages.size / Math.min(total, 4)) * 100));

  // 8. CI/CD Test Status (5%)
  const cicdCount = repos.filter((r) => Boolean(r.hasWorkflows)).length;
  const cicdStatus = Math.round((cicdCount / total) * 100);

  // 9. Security Score (5%)
  const securityCount = repos.filter((r) => Boolean(r.hasSecurityFile || r.hasLicense)).length;
  const securityScore = Math.round((securityCount / total) * 100);

  // 10. License Compliance (5%)
  const licenseCount = repos.filter((r) => Boolean(r.hasLicense)).length;
  const licenseCompliance = Math.round((licenseCount / total) * 100);

  // 11. Open Source Contribution (5%)
  const osCount = repos.filter(
    (r) =>
      Boolean(r.hasContributing) ||
      (r.stars ?? 0) > 0 ||
      (r.forks ?? 0) > 0 ||
      (r.topics && r.topics.some((t) => ['open-source', 'community', 'hacktoberfest'].includes(t.toLowerCase())))
  ).length;
  const openSourceContribution = Math.min(100, Math.round((osCount / total) * 100));

  return {
    repositoryQuality: Math.max(0, Math.min(100, repoQuality)),
    readmeQuality: Math.max(0, Math.min(100, readmeQuality)),
    documentationScore: Math.max(0, Math.min(100, docScore)),
    deploymentStatus: Math.max(0, Math.min(100, deploymentStatus)),
    codeQuality: Math.max(0, Math.min(100, codeQuality)),
    githubActivity: Math.max(0, Math.min(100, activityScore)),
    languageDiversity: Math.max(0, Math.min(100, languageDiversity)),
    cicdStatus: Math.max(0, Math.min(100, cicdStatus)),
    securityScore: Math.max(0, Math.min(100, securityScore)),
    licenseCompliance: Math.max(0, Math.min(100, licenseCompliance)),
    openSourceContribution: Math.max(0, Math.min(100, openSourceContribution)),
  };
}

/**
 * Calculates the complete OverallPortfolioScore object dynamically from raw GitHub profile & repos data.
 */
export function calculatePortfolioScoreFromGithubData(
  profile: GitHubProfile | null,
  repos: Repository[] = []
): OverallPortfolioScore {
  const metrics = extractGitHubMetrics(profile, repos);
  const result = calculateOverallGitHubScore(metrics);

  const factors = result.breakdown.map((item) => ({
    name: item.name,
    score: item.rawScore,
    weight: Math.round(item.weight * 100),
    description: `${item.description} (${item.weightPercentage} weight, weighted contribution: ${item.weightedScore.toFixed(1)} pts)`,
    grade: calculateLetterGrade(item.rawScore),
  }));

  const userName = profile?.name || profile?.username || 'Developer';

  return {
    totalScore: result.overallScore,
    letterGrade: result.letterGrade,
    performanceLevel: result.performanceLevel,
    factors,
    summary: `${userName}'s Overall GitHub Score is ${result.overallScore}/100 (${result.performanceLevel}). Calculated dynamically across 11 weighted engineering metrics from ${repos.length} public repositories.`,
  };
}
