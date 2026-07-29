import { apiRequest } from './client';
import {
  GitHubProfile,
  Repository,
  LanguageStat,
  ContributionDay,
  OverallPortfolioScore,
  LatestActivity,
} from '../types';
import { calculateOverallGitHubScore, extractGitHubMetrics } from '../utils/githubScoreCalculator';

export interface GitHubDataResponse {
  profile: GitHubProfile;
  repos: Repository[];
  languages: LanguageStat[];
  heatmap: ContributionDay[];
  portfolioScore: OverallPortfolioScore;
  latestActivity?: LatestActivity | null;
}

export async function fetchGitHubUserDataDirect(
  targetUser: string,
  customToken?: string
): Promise<GitHubDataResponse> {
  const cleanUser = targetUser.trim().replace(/^@/, '').replace(/^github\.com\//i, '').split('/')[0];
  if (!cleanUser) {
    throw new Error('Please enter a valid GitHub username.');
  }

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  };

  const rawToken = customToken?.trim() || ((import.meta as any).env?.VITE_GITHUB_TOKEN as string || '').trim();
  if (rawToken) {
    const cleanToken = rawToken.replace(/^(bearer|token)\s+/i, '');
    headers.Authorization = cleanToken.startsWith('github_pat_')
      ? `Bearer ${cleanToken}`
      : `token ${cleanToken}`;
  }

  // Fetch Profile from GitHub REST API
  let profileData: any;
  try {
    const profileRes = await fetch(`https://api.github.com/users/${cleanUser}`, { headers });
    if (!profileRes.ok) {
      if (profileRes.status === 404) {
        throw new Error(`GitHub user "${cleanUser}" was not found. Please check the username.`);
      } else if (profileRes.status === 403) {
        throw new Error(`GitHub API rate limit exceeded. Please enter a Personal Access Token (PAT) above to continue.`);
      } else if (profileRes.status === 401) {
        throw new Error(`Invalid GitHub Personal Access Token. Please check your token.`);
      }
      throw new Error(`GitHub API returned status ${profileRes.status}`);
    }
    profileData = await profileRes.json();
  } catch (err: any) {
    throw new Error(err.message || `Failed to fetch GitHub profile for "${cleanUser}".`);
  }

  // Fetch Repositories
  let reposData: any[] = [];
  try {
    const reposRes = await fetch(`https://api.github.com/users/${cleanUser}/repos?sort=updated&per_page=30`, { headers });
    if (reposRes.ok) {
      const data = await reposRes.json();
      if (Array.isArray(data)) {
        reposData = data;
      }
    }
  } catch {
    // Ignore secondary repo fetch failure
  }

  const mappedRepos: Repository[] = reposData.map((repo: any) => {
    const descriptionText = repo.description || 'No description provided.';
    const descriptionDetailed = descriptionText.length >= 25;
    const hasHomepage = Boolean(repo.homepage && typeof repo.homepage === 'string' && repo.homepage.startsWith('http'));
    const hasPages = Boolean(repo.has_pages);
    const deploymentUrl = hasHomepage ? repo.homepage : hasPages ? `https://${cleanUser}.github.io/${repo.name}` : undefined;
    const topics: string[] = Array.isArray(repo.topics) ? repo.topics : [];
    const openIssuesCount = repo.open_issues_count || 0;
    const stars = repo.stargazers_count || 0;
    const forks = repo.forks_count || 0;
    const watchers = repo.watchers_count || 0;

    const hasReadme = true;
    const readmeScore = Math.min(100, Math.max(30, (descriptionText.length > 50 ? 80 : 50) + (topics.length > 0 ? 15 : 0)));
    const organizationScore = Math.min(100, Math.max(40, 50 + (repo.license ? 20 : 0) + (deploymentUrl ? 20 : 0) + (topics.length * 5)));
    const completenessScore = Math.round((readmeScore * 0.4) + (organizationScore * 0.4) + (deploymentUrl ? 20 : 0));

    return {
      id: repo.id || Math.floor(Math.random() * 100000),
      name: repo.name,
      fullName: repo.full_name || `${cleanUser}/${repo.name}`,
      description: descriptionText,
      language: repo.language || 'Other',
      stars,
      forks,
      watchers,
      openIssuesCount,
      updatedAt: repo.updated_at || new Date().toISOString(),
      defaultBranch: repo.default_branch || 'main',
      htmlUrl: repo.html_url,
      hasReadme,
      hasLicense: Boolean(repo.license),
      hasGitignore: true,
      hasContributing: false,
      hasWorkflows: false,
      hasSecurityFile: false,
      hasPages,
      deploymentUrl,
      topics,
      descriptionDetailed,
      readmeScore,
      organizationScore,
      completenessScore,
    };
  });

  const totalStars = mappedRepos.reduce((sum, r) => sum + r.stars, 0);
  const totalForks = mappedRepos.reduce((sum, r) => sum + r.forks, 0);

  const profile: GitHubProfile = {
    username: profileData.login || cleanUser,
    name: profileData.name || profileData.login || cleanUser,
    avatarUrl: profileData.avatar_url || `https://github.com/${cleanUser}.png`,
    bio: profileData.bio || 'Software developer passionate about open source and clean code.',
    location: profileData.location || 'Global',
    company: profileData.company || undefined,
    followers: profileData.followers || 0,
    following: profileData.following || 0,
    publicReposCount: profileData.public_repos || mappedRepos.length,
    starsCount: totalStars,
    forksCount: totalForks,
    contributionsLastYear: 0,
    createdAt: profileData.created_at || new Date().toISOString(),
  };

  const langCounts: Record<string, number> = {};
  mappedRepos.forEach((r) => {
    if (r.language) {
      langCounts[r.language] = (langCounts[r.language] || 0) + 1;
    }
  });
  const totalLangs = Object.values(langCounts).reduce((a, b) => a + b, 0) || 1;
  const languages: LanguageStat[] = Object.entries(langCounts)
    .map(([name, count]) => ({
      name,
      bytes: count * 125000,
      percentage: Math.round((count / totalLangs) * 100),
      color: '#3B82F6',
      repoCount: count,
    }))
    .sort((a, b) => b.percentage - a.percentage);

  const today = new Date();
  const heatmap: ContributionDay[] = [];
  for (let i = 180; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    heatmap.push({
      date: dateStr,
      count: 0,
      level: 0,
    });
  }

  const metrics = extractGitHubMetrics(profile, mappedRepos);
  const rawScoreResult = calculateOverallGitHubScore(metrics);
  const portfolioScore: OverallPortfolioScore = {
    totalScore: rawScoreResult.overallScore,
    letterGrade: rawScoreResult.letterGrade,
    performanceLevel: rawScoreResult.performanceLevel,
    factors: rawScoreResult.breakdown.map((b) => ({
      name: b.name,
      score: b.rawScore,
      weight: Math.round(b.weight * 100),
      description: b.description,
      grade: b.rawScore >= 80 ? 'A' : b.rawScore >= 70 ? 'B' : 'C',
    })),
    summary: `Overall portfolio score of ${rawScoreResult.overallScore}/100 calculated across ${mappedRepos.length} public repositories.`,
  };

  const latestActivity: LatestActivity | null = mappedRepos.length > 0 ? {
    repoName: mappedRepos[0].name,
    commitMessage: `Updated ${mappedRepos[0].name}`,
    updatedAt: mappedRepos[0].updatedAt,
  } : null;

  return {
    profile,
    repos: mappedRepos,
    languages,
    heatmap,
    portfolioScore,
    latestActivity,
  };
}

export async function fetchGitHubUserData(
  targetUser: string,
  customToken?: string
): Promise<GitHubDataResponse> {
  const headers: Record<string, string> = {};
  if (customToken) {
    headers['x-github-token'] = customToken;
  }

  try {
    return await apiRequest<GitHubDataResponse>(`/api/github/profile/${targetUser}`, {
      headers,
    });
  } catch (error: any) {
    if (
      error.status === 404 ||
      error.status === 500 ||
      error.message?.includes('404') ||
      error.message?.includes('Failed to fetch') ||
      error.message?.includes('HTTP error')
    ) {
      return await fetchGitHubUserDataDirect(targetUser, customToken);
    }
    throw error;
  }
}
