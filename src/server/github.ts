import axios from 'axios';
import {
  GitHubProfile,
  Repository,
  LanguageStat,
  ContributionDay,
  LatestActivity,
} from '../types';

const GITHUB_API_BASE = 'https://api.github.com';

function createGitHubHeaders(token?: string): Record<string, string> {
  const authToken = token || process.env.GITHUB_TOKEN;
  return {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'AI-GitHub-Portfolio-Analyzer',
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
  };
}

function isDeploymentUrl(value?: string): boolean {
  if (!value) return false;
  try {
    const hostname = new URL(value).hostname.toLowerCase();
    return hostname !== 'github.com' && hostname !== 'www.github.com';
  } catch {
    return false;
  }
}

export class GitHubApiError extends Error {
  constructor(message: string, public status = 502) {
    super(message);
    this.name = 'GitHubApiError';
  }
}

function toGitHubApiError(error: unknown): GitHubApiError {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    if (status === 404) return new GitHubApiError('GitHub user was not found.', 404);
    if (status === 403 || status === 429) {
      return new GitHubApiError('GitHub API rate limit reached. Add GITHUB_TOKEN to .env and restart the server.', 429);
    }
    if (error.code === 'ECONNABORTED') return new GitHubApiError('GitHub API request timed out. Please try again.', 504);
  }
  return new GitHubApiError('Could not connect to the GitHub API. Check your internet connection and try again.');
}

export async function fetchGitHubProfile(username: string, token?: string): Promise<GitHubProfile> {
  const headers = createGitHubHeaders(token);

  try {
    const res = await axios.get(`${GITHUB_API_BASE}/users/${username}`, { headers, timeout: 8000 });
    const data = res.data;

    return {
      username: data.login,
      name: data.name || data.login,
      avatarUrl: data.avatar_url,
      bio: data.bio || 'Software developer passionate about open source & clean code.',
      company: data.company || undefined,
      location: data.location || undefined,
      email: data.email || undefined,
      website: data.blog || undefined,
      twitterUsername: data.twitter_username || undefined,
      followers: data.followers || 0,
      following: data.following || 0,
      publicReposCount: data.public_repos || 0,
      // These totals are calculated from the real repository response in server.ts.
      starsCount: 0,
      forksCount: 0,
      contributionsLastYear: 0,
      createdAt: data.created_at || new Date().toISOString(),
    };
  } catch (error) {
    throw toGitHubApiError(error);
  }
}

export async function fetchUserRepos(username: string, token?: string): Promise<Repository[]> {
  const headers = createGitHubHeaders(token);

  try {
    const res = await axios.get(`${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=30`, {
      headers,
      timeout: 8000,
    });
    
    const reposData = res.data;

    if (!Array.isArray(reposData)) return [];

    return reposData.map((repo: any) => {
      const hasLicense = Boolean(repo.license);
      const hasDescription = Boolean(repo.description && repo.description.length > 10);
      const openIssues = repo.open_issues_count || 0;
      const stars = repo.stargazers_count || 0;
      const forks = repo.forks_count || 0;

      // Calculate completeness heuristic
      let completeness = 50;
      if (hasDescription) completeness += 15;
      if (hasLicense) completeness += 10;
      if (repo.homepage) completeness += 15;
      if (repo.topics && repo.topics.length > 0) completeness += 10;

      return {
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description || 'No description provided.',
        htmlUrl: repo.html_url,
        stars: stars,
        forks: forks,
        watchers: repo.watchers_count || stars,
        language: repo.language || 'TypeScript',
        topics: repo.topics || ['github', 'portfolio'],
        updatedAt: repo.pushed_at || repo.updated_at || new Date().toISOString(),
        defaultBranch: repo.default_branch || 'main',
        hasReadme: false,
        readmeScore: 0,
        repoScore: 0,
        hasLicense: hasLicense,
        hasWorkflows: false,
        hasSecurityFile: false,
        hasGitignore: false,
        hasContributing: false,
        deploymentUrl: isDeploymentUrl(repo.homepage) ? repo.homepage : undefined,
        hasPages: Boolean(repo.has_pages),
        openIssuesCount: openIssues,
        completenessScore: Math.min(100, completeness),
      };
    });
  } catch (error) {
    throw toGitHubApiError(error);
  }
}

/** Enrich public repository metadata with file evidence from GitHub's git-tree API. */
export async function analyzeRepositoryEvidence(repos: Repository[], token?: string): Promise<Repository[]> {
  const headers = createGitHubHeaders(token);
  const batchSize = 5;
  const analyzed: Repository[] = [];

  for (let index = 0; index < repos.length; index += batchSize) {
    const batch = repos.slice(index, index + batchSize);
    const results = await Promise.all(batch.map(async (repo) => {
      try {
        const branch = encodeURIComponent(repo.defaultBranch);
        const response = await axios.get(`${GITHUB_API_BASE}/repos/${repo.fullName}/git/trees/${branch}?recursive=1`, {
          headers,
          timeout: 10000,
        });
        const paths = new Set<string>((response.data.tree || [])
          .filter((item: any) => item.type === 'blob')
          .map((item: any) => String(item.path).toLowerCase()));
        const hasReadme = [...paths].some((path) => /^readme(?:\.[a-z0-9]+)?$/i.test(path));
        const hasSecurityFile = [...paths].some((path) => /(^|\/)security(?:\.[a-z0-9]+)?$/i.test(path));
        const hasWorkflows = [...paths].some((path) => path.startsWith('.github/workflows/'));
        const hasGitignore = paths.has('.gitignore');
        const hasContributing = [...paths].some((path) => /(^|\/)contributing(?:\.[a-z0-9]+)?$/i.test(path));
        const hasSourceDirectory = [...paths].some((path) => /^(src|app|lib|packages|tests?|__tests__)\//.test(path));
        const organizationScore = Math.round((Number(hasSourceDirectory) + Number(hasGitignore) + Number(hasContributing)) / 3 * 100);
        const readmeScore = hasReadme ? 100 : 0;
        const evidenceScore = [hasReadme, Boolean(repo.description && repo.description !== 'No description provided.'), repo.hasLicense, hasWorkflows, hasSecurityFile, hasGitignore, Boolean(repo.deploymentUrl || repo.hasPages), hasSourceDirectory]
          .filter(Boolean).length;

        return {
          ...repo,
          hasReadme,
          readmeScore,
          hasSecurityFile,
          hasWorkflows,
          hasGitignore,
          hasContributing,
          organizationScore,
          repoScore: Math.round((evidenceScore / 8) * 100),
        };
      } catch (error) {
        throw toGitHubApiError(error);
      }
    }));
    analyzed.push(...results);
  }
  return analyzed;
}

export async function fetchLatestActivity(repos: Repository[], token?: string): Promise<LatestActivity | null> {
  const latestRepo = [...repos].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0];
  if (!latestRepo) return null;

  try {
    const response = await axios.get(`${GITHUB_API_BASE}/repos/${latestRepo.fullName}/commits?per_page=1`, {
      headers: createGitHubHeaders(token),
      timeout: 10000,
    });
    const commit = response.data?.[0];
    if (!commit?.commit?.message || !commit?.commit?.author?.date) return null;
    return {
      repoName: latestRepo.name,
      commitMessage: String(commit.commit.message).split('\n')[0],
      updatedAt: commit.commit.author.date,
    };
  } catch (error) {
    throw toGitHubApiError(error);
  }
}

export function calculateLanguageStats(repos: Repository[]): LanguageStat[] {
  const langMap: Record<string, number> = {};
  const colorMap: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    Java: '#b07219',
    'C++': '#f34b7d',
    Go: '#00ADD8',
    Rust: '#dea584',
    HTML: '#e34c26',
    CSS: '#563d7c',
    PHP: '#4F5D95',
    Dart: '#00B4AB',
    Ruby: '#701516',
    Swift: '#F05138',
    Kotlin: '#A97BFF',
    Shell: '#89e051',
  };

  repos.forEach((r) => {
    const lang = r.language || 'Other';
    langMap[lang] = (langMap[lang] || 0) + 1;
  });

  const total = repos.length || 1;
  const result: LanguageStat[] = [];

  Object.entries(langMap).forEach(([lang, count]) => {
    const percentage = Math.round((count / total) * 100);
    result.push({
      name: lang,
      bytes: count * 125000,
      percentage: percentage,
      color: colorMap[lang] || '#94a3b8',
      repoCount: count,
    });
  });

  return result.sort((a, b) => b.percentage - a.percentage);
}

export async function fetchUserEvents(username: string, token?: string): Promise<any[]> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'AI-GitHub-Portfolio-Analyzer',
  };

  const authHeader = token || process.env.GITHUB_TOKEN;
  if (authHeader) {
    headers.Authorization = `token ${authHeader}`;
  }

  try {
    const res = await axios.get(`${GITHUB_API_BASE}/users/${username}/events?per_page=100`, {
      headers,
      timeout: 8000,
    });
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    return [];
  }
}

export async function fetchRealContributionData(username: string): Promise<ContributionDay[]> {
  if (!username) return [];

  // Method 1: Public GitHub contributions API
  try {
    const res = await axios.get(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
      timeout: 7000,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    if (res.data && Array.isArray(res.data.contributions) && res.data.contributions.length > 0) {
      return res.data.contributions.map((c: any) => ({
        date: c.date,
        count: Number(c.count) || 0,
        level: (Math.min(4, Math.max(0, Number(c.level) || 0))) as 0 | 1 | 2 | 3 | 4,
      }));
    }
  } catch (err) {
    // fallback
  }

  // Method 2: GitHub official public contribution HTML endpoint
  try {
    const htmlRes = await axios.get(`https://github.com/users/${username}/contributions`, {
      timeout: 7000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
      }
    });

    const html = String(htmlRes.data);
    const dateMap: Record<string, { count: number; level: number }> = {};

    const regex = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*?data-level="(\d)"/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      const date = match[1];
      const level = parseInt(match[2], 10) || 0;
      dateMap[date] = { level, count: level > 0 ? level * 2 : 0 };
    }

    if (Object.keys(dateMap).length > 0) {
      const today = new Date();
      const days: ContributionDay[] = [];
      for (let i = 364; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const item = dateMap[dateStr];
        const lvl = (item ? Math.min(4, Math.max(0, item.level)) : 0) as 0 | 1 | 2 | 3 | 4;
        const cnt = item ? item.count : 0;
        days.push({
          date: dateStr,
          count: cnt,
          level: lvl,
        });
      }
      return days;
    }
  } catch (err) {
    // fallback
  }

  return [];
}

export function generateContributionHeatmap(
  username?: string,
  repos: Repository[] = [],
  events: any[] = [],
  realDays: ContributionDay[] = []
): ContributionDay[] {
  if (Array.isArray(realDays) && realDays.length > 0) {
    return realDays;
  }

  const days: ContributionDay[] = [];
  const today = new Date();
  const dateCountMap: Record<string, number> = {};

  // 1. Process real user activity events from GitHub API
  if (Array.isArray(events) && events.length > 0) {
    events.forEach((evt) => {
      if (!evt.created_at) return;
      const dateStr = evt.created_at.split('T')[0];
      let addCount = 1;
      if (evt.type === 'PushEvent') {
        addCount = evt.payload?.size || evt.payload?.commits?.length || 1;
      }
      dateCountMap[dateStr] = (dateCountMap[dateStr] || 0) + addCount;
    });
  }

  // 2. Process real repository push / update timestamps
  if (Array.isArray(repos) && repos.length > 0) {
    repos.forEach((repo) => {
      if (repo.updatedAt) {
        const dateStr = repo.updatedAt.split('T')[0];
        if (!dateCountMap[dateStr]) {
          dateCountMap[dateStr] = 1;
        }
      }
    });
  }

  // 3. Generate 365 days of activity strictly matching real dates
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];

    const count = dateCountMap[dateStr] || 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (count > 0) {
      if (count <= 2) level = 1;
      else if (count <= 5) level = 2;
      else if (count <= 9) level = 3;
      else level = 4;
    }

    days.push({
      date: dateStr,
      count,
      level,
    });
  }

  return days;
}

export function getMockProfile(username: string): GitHubProfile {
  const isRuhul = !username || username.toLowerCase() === 'ruhulamin18' || username === 'alexdev';
  const uname = isRuhul ? 'ruhulamin18' : username;
  return {
    username: uname,
    name: isRuhul ? 'Ruhul Amin' : `${username.charAt(0).toUpperCase() + username.slice(1)} Developer`,
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${uname}`,
    bio: isRuhul ? 'Full Stack Software Engineer & Web Developer. Building scalable applications, React web apps, and modern AI tools.' : 'Full Stack Engineer & Open Source Contributor.',
    company: 'Software Innovation Lab',
    location: 'Dhaka, Bangladesh',
    email: `${uname}@dev.io`,
    website: `https://github.com/${uname}`,
    twitterUsername: uname,
    followers: 320,
    following: 150,
    publicReposCount: 32,
    starsCount: 420,
    forksCount: 110,
    contributionsLastYear: 920,
    createdAt: '2021-03-15T10:00:00Z',
  };
}

export function getMockRepos(username: string): Repository[] {
  const user = (!username || username === 'alexdev') ? 'ruhulamin18' : username;
  return [
    {
      id: 101,
      name: 'ai-portfolio-analyzer',
      fullName: `${user}/ai-portfolio-analyzer`,
      description: 'Intelligent AI-powered GitHub Portfolio & Code Quality Analyzer built with React, Express, and Gemini API.',
      htmlUrl: `https://github.com/${user}/ai-portfolio-analyzer`,
      stars: 124,
      forks: 32,
      watchers: 124,
      language: 'TypeScript',
      topics: ['react', 'tailwindcss', 'gemini-api', 'portfolio', 'express'],
      updatedAt: '2026-07-25T14:30:00Z',
      defaultBranch: 'main',
      hasReadme: true,
      readmeScore: 94,
      repoScore: 92,
      hasLicense: true,
      hasWorkflows: true,
      hasSecurityFile: true,
      hasGitignore: true,
      hasContributing: true,
      deploymentUrl: 'https://ai-portfolio.vercel.app',
      openIssuesCount: 2,
      completenessScore: 95,
    },
    {
      id: 102,
      name: 'microservices-ecommerce-backend',
      fullName: `${user}/microservices-ecommerce-backend`,
      description: 'Scalable Express & Node.js backend architecture with Redis caching, PostgreSQL, JWT auth, and Docker.',
      htmlUrl: `https://github.com/${user}/microservices-ecommerce-backend`,
      stars: 88,
      forks: 19,
      watchers: 88,
      language: 'TypeScript',
      topics: ['nodejs', 'express', 'postgresql', 'docker', 'redis', 'microservices'],
      updatedAt: '2026-06-18T09:12:00Z',
      defaultBranch: 'main',
      hasReadme: true,
      readmeScore: 88,
      repoScore: 86,
      hasLicense: true,
      hasWorkflows: true,
      hasSecurityFile: false,
      hasGitignore: true,
      hasContributing: false,
      deploymentUrl: 'https://api-ecommerce.render.com',
      openIssuesCount: 4,
      completenessScore: 88,
    },
    {
      id: 103,
      name: 'realtime-collaborative-canvas',
      fullName: `${user}/realtime-collaborative-canvas`,
      description: 'Multi-user infinite canvas with WebSockets, CRDT synchronization, Konva.js, and offline persistence.',
      htmlUrl: `https://github.com/${user}/realtime-collaborative-canvas`,
      stars: 64,
      forks: 14,
      watchers: 64,
      language: 'JavaScript',
      topics: ['react', 'websockets', 'canvas', 'collaboration', 'realtime'],
      updatedAt: '2026-05-10T18:45:00Z',
      defaultBranch: 'main',
      hasReadme: true,
      readmeScore: 82,
      repoScore: 84,
      hasLicense: true,
      hasWorkflows: false,
      hasSecurityFile: false,
      hasGitignore: true,
      hasContributing: true,
      deploymentUrl: 'https://canvas-collab.netlify.app',
      openIssuesCount: 1,
      completenessScore: 82,
    },
    {
      id: 104,
      name: 'devops-kubernetes-ci-pipeline',
      fullName: `${user}/devops-kubernetes-ci-pipeline`,
      description: 'Production GitHub Actions CI/CD workflows, Terraform IaC manifests, and Kubernetes Helm charts.',
      htmlUrl: `https://github.com/${user}/devops-kubernetes-ci-pipeline`,
      stars: 45,
      forks: 11,
      watchers: 45,
      language: 'Python',
      topics: ['kubernetes', 'github-actions', 'terraform', 'helm', 'devops'],
      updatedAt: '2026-04-02T11:20:00Z',
      defaultBranch: 'main',
      hasReadme: true,
      readmeScore: 78,
      repoScore: 80,
      hasLicense: true,
      hasWorkflows: true,
      hasSecurityFile: true,
      hasGitignore: true,
      hasContributing: false,
      openIssuesCount: 0,
      completenessScore: 79,
    },
    {
      id: 105,
      name: 'python-data-science-toolkit',
      fullName: `${user}/python-data-science-toolkit`,
      description: 'Collection of pandas pipelines, automated EDA scripts, and Machine Learning baseline benchmarks.',
      htmlUrl: `https://github.com/${user}/python-data-science-toolkit`,
      stars: 31,
      forks: 8,
      watchers: 31,
      language: 'Python',
      topics: ['python', 'pandas', 'scikit-learn', 'machine-learning', 'data-science'],
      updatedAt: '2026-03-14T16:00:00Z',
      defaultBranch: 'main',
      hasReadme: true,
      readmeScore: 72,
      repoScore: 74,
      hasLicense: false,
      hasWorkflows: false,
      hasSecurityFile: false,
      hasGitignore: true,
      hasContributing: false,
      openIssuesCount: 0,
      completenessScore: 70,
    },
  ];
}
