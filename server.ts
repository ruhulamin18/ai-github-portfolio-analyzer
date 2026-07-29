import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
<<<<<<< HEAD
import jwt from 'jsonwebtoken';
=======
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
import { createServer as createViteServer } from 'vite';
import {
  fetchGitHubProfile,
  fetchUserRepos,
<<<<<<< HEAD
=======
  analyzeRepositoryEvidence,
  fetchLatestActivity,
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
  fetchUserEvents,
  fetchRealContributionData,
  calculateLanguageStats,
  generateContributionHeatmap,
<<<<<<< HEAD
  extractLatestActivity,
  getMockProfile,
  getMockRepos,
=======
  GitHubApiError,
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
} from './src/server/github.js';
import {
  generateAIPortfolioAnalysis,
  generateSkillGapAnalysis,
  generateResumeMatch,
  generateCareerRecommendations,
  calculatePortfolioScore,
} from './src/server/gemini.js';
import { UserFeedback } from './src/types.js';

dotenv.config();

const app = express();
const PORT = 3000;
<<<<<<< HEAD
const JWT_SECRET = process.env.JWT_SECRET || 'ai_github_portfolio_analyzer_jwt_secret_2026';
=======
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed

app.use(express.json({ limit: '10mb' }));

// In-memory data store for reports, user feedback, and usage metrics
const reportsStore: any[] = [];
const feedbackStore: UserFeedback[] = [
  {
    id: 'f1',
    username: 'alexdev',
    rating: 5,
    comment: 'The Gemini README score breakdown and Skill Gap analysis helped me land 3 interviews!',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'f2',
    username: 'sarah_codes',
    rating: 5,
    comment: 'The resume matcher pinpointed missing Docker projects on my profile instantly.',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
];

let apiCallsCountToday = 142;
let totalProfilesAnalyzed = 58;

<<<<<<< HEAD
// --- AUTH ROUTES ---
app.get('/api/auth/github/url', (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const appUrl = process.env.APP_URL || `${req.protocol}://${req.get('host')}`;
  const redirectUri = `${appUrl}/auth/callback`;

  if (!clientId) {
    // If client ID is missing, provide fallback message & URL
    return res.json({
      url: `https://github.com/login/oauth/authorize?client_id=MOCK_CLIENT_ID&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&scope=user,repo`,
      configured: false,
      redirectUri,
    });
  }

  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=read:user,repo`;

  res.json({ url: authUrl, configured: true, redirectUri });
});

app.get(['/auth/callback', '/auth/callback/'], async (req, res) => {
  const code = req.query.code;
  // Send postMessage HTML response to close popup gracefully
  res.send(`
    <!DOCTYPE html>
    <html>
      <head><title>GitHub Authentication Complete</title></head>
      <body style="font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; background: #0f172a; color: #f8fafc;">
        <div style="text-align: center; padding: 2rem; background: #1e293b; border-radius: 1rem; border: 1px solid #334155;">
          <h2 style="margin-bottom: 0.5rem;">Authentication Successful!</h2>
          <p style="color: #94a3b8;">Closing authentication window...</p>
        </div>
        <script>
          if (window.opener) {
            window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', code: '${code || 'demo'}' }, '*');
            window.close();
          } else {
            window.location.href = '/';
          }
        </script>
      </body>
    </html>
  `);
});

app.post('/api/auth/demo', (req, res) => {
  const username = req.body.username || 'ruhulamin18';
  const profile = getMockProfile(username);
  const token = jwt.sign({ username: profile.username, name: profile.name }, JWT_SECRET, {
    expiresIn: '7d',
  });

  res.json({
    token,
    user: profile,
  });
});

app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const profile = getMockProfile(decoded.username);
    res.json({ user: profile });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

=======
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
// --- GITHUB DATA ENDPOINTS ---
app.get('/api/github/profile/:username', async (req, res) => {
  apiCallsCountToday++;
  totalProfilesAnalyzed++;
<<<<<<< HEAD
  const rawUsername = req.params.username || '';
  const username = rawUsername.trim().replace(/^@/, '').replace(/^github\.com\//i, '').split('/')[0];
  const token = req.headers['x-github-token'] as string;

  if (!username) {
    return res.status(400).json({ error: 'GitHub username is required' });
  }

  // Handle explicit demo/sample request
  if (username.toLowerCase() === 'demo' || username.toLowerCase() === 'sample') {
    const profile = getMockProfile('ruhulamin18');
    const repos = getMockRepos('ruhulamin18');
    const languages = calculateLanguageStats(repos);
    const heatmap = generateContributionHeatmap('ruhulamin18', repos, []);
    profile.contributionsLastYear = heatmap.reduce((acc, d) => acc + d.count, 0);
    const portfolioScore = calculatePortfolioScore(profile, repos);
    const latestActivity = extractLatestActivity([], repos);

    return res.json({
      profile,
      repos,
      languages,
      heatmap,
      portfolioScore,
      latestActivity,
    });
  }

  try {
    const [profile, repos, events, realContribs] = await Promise.all([
=======
  const username = req.params.username;
  const token = req.headers['x-github-token'] as string;

  try {
    const [profile, fetchedRepos, events, realContribs] = await Promise.all([
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
      fetchGitHubProfile(username, token),
      fetchUserRepos(username, token),
      fetchUserEvents(username, token),
      fetchRealContributionData(username),
    ]);
<<<<<<< HEAD
=======
    const repos = await analyzeRepositoryEvidence(fetchedRepos, token);
    const latestActivity = await fetchLatestActivity(repos, token);
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
    
    // Calculate actual total stars and forks from fetched public repos
    const realTotalStars = repos.reduce((sum, r) => sum + (r.stars || 0), 0);
    const realTotalForks = repos.reduce((sum, r) => sum + (r.forks || 0), 0);
<<<<<<< HEAD
    profile.starsCount = realTotalStars;
    profile.forksCount = realTotalForks;
=======
    profile.starsCount = realTotalStars > 0 ? realTotalStars : profile.starsCount;
    profile.forksCount = realTotalForks > 0 ? realTotalForks : profile.forksCount;
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed

    const languages = calculateLanguageStats(repos);
    const heatmap = generateContributionHeatmap(username, repos, events, realContribs);
    profile.contributionsLastYear = heatmap.reduce((acc, d) => acc + d.count, 0);
    const portfolioScore = calculatePortfolioScore(profile, repos);
<<<<<<< HEAD
    const latestActivity = extractLatestActivity(events, repos);
=======
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed

    res.json({
      profile,
      repos,
      languages,
      heatmap,
      portfolioScore,
      latestActivity,
    });
<<<<<<< HEAD
  } catch (err: any) {
    const message = err.message || 'Failed to fetch GitHub data';
    const isNotFound = message.includes('not found');
    const isRateLimit = message.includes('rate limit');
    const status = isNotFound ? 404 : isRateLimit ? 403 : 400;

    res.status(status).json({ error: message });
=======
  } catch (error) {
    const apiError = error instanceof GitHubApiError
      ? error
      : new GitHubApiError('Unable to load data from GitHub. Please try again.');
    res.status(apiError.status).json({ error: apiError.message });
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
  }
});

// --- AI ANALYSIS ENDPOINTS ---
app.post('/api/analyze/portfolio', async (req, res) => {
  apiCallsCountToday++;
  const { profile, repos } = req.body;
  if (!profile || !repos) {
    return res.status(400).json({ error: 'Profile and repos are required' });
  }

  const aiReport = await generateAIPortfolioAnalysis(profile, repos);
  res.json(aiReport);
});

app.post('/api/analyze/skill-gap', async (req, res) => {
  apiCallsCountToday++;
  const { profile, repos, targetRole } = req.body;
<<<<<<< HEAD
  const role = targetRole || 'Full Stack Developer';

  const skillGap = await generateSkillGapAnalysis(
    profile || getMockProfile('ruhulamin18'),
    repos || getMockRepos('ruhulamin18'),
=======
  if (!profile || !repos) {
    return res.status(400).json({ error: 'Profile and repositories are required.' });
  }
  const role = targetRole || 'Full Stack Developer';

  const skillGap = await generateSkillGapAnalysis(
    profile,
    repos,
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
    role
  );
  res.json(skillGap);
});

app.post('/api/analyze/resume-match', async (req, res) => {
  apiCallsCountToday++;
  const { resumeText, repos } = req.body;
  if (!resumeText) {
    return res.status(400).json({ error: 'Resume text is required' });
  }

<<<<<<< HEAD
  const result = await generateResumeMatch(resumeText, repos || getMockRepos('ruhulamin18'));
=======
  if (!repos) return res.status(400).json({ error: 'Repositories are required.' });
  const result = await generateResumeMatch(resumeText, repos);
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
  res.json(result);
});

app.post('/api/career', async (req, res) => {
  apiCallsCountToday++;
  const { profile, repos } = req.body;
<<<<<<< HEAD
  const career = await generateCareerRecommendations(
    profile || getMockProfile('ruhulamin18'),
    repos || getMockRepos('ruhulamin18')
=======
  if (!profile || !repos) {
    return res.status(400).json({ error: 'Profile and repositories are required.' });
  }
  const career = await generateCareerRecommendations(
    profile,
    repos
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
  );
  res.json(career);
});

// --- REPORTS HISTORY ---
app.get('/api/reports', (req, res) => {
  res.json(reportsStore);
});

app.post('/api/reports', (req, res) => {
  const newReport = {
    id: `rep_${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...req.body,
  };
  reportsStore.unshift(newReport);
  res.json(newReport);
});

// --- FEEDBACK & ADMIN ENDPOINTS ---
app.get('/api/feedback', (req, res) => {
  res.json(feedbackStore);
});

app.post('/api/feedback', (req, res) => {
  const { username, rating, comment } = req.body;
  const item: UserFeedback = {
    id: `f_${Date.now()}`,
    username: username || 'Anonymous',
    rating: rating || 5,
    comment: comment || 'Great application!',
    createdAt: new Date().toISOString(),
  };
  feedbackStore.unshift(item);
  res.json(item);
});

app.get('/api/admin/analytics', (req, res) => {
  res.json({
    totalUsers: 124,
    totalProfilesAnalyzed,
    totalReposAnalyzed: totalProfilesAnalyzed * 14,
    geminiApiRequestsToday: apiCallsCountToday,
    averagePortfolioScore: 84,
    topTargetRole: 'Full Stack Developer',
    apiUsageHistory: [
      { date: 'Jul 22', calls: 82 },
      { date: 'Jul 23', calls: 110 },
      { date: 'Jul 24', calls: 95 },
      { date: 'Jul 25', calls: 130 },
      { date: 'Jul 26', calls: 128 },
      { date: 'Jul 27', calls: 156 },
      { date: 'Jul 28', calls: apiCallsCountToday },
    ],
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
