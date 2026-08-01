import { GitHubProfile, Repository, CareerRecommendation } from '../types';

interface RoleEvaluation {
  roleTitle: string;
  fitPercentage: number;
  reasoning: string;
}

export function generateCareerGuidance(profile: GitHubProfile, repos: Repository[]): CareerRecommendation {
  const totalRepos = repos.length || 1;
  
  // Collect languages & counts
  const langCounts: Record<string, number> = {};
  repos.forEach((r) => {
    if (r.language) {
      langCounts[r.language] = (langCounts[r.language] || 0) + 1;
    }
  });

  const sortedLangs = Object.entries(langCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([lang]) => lang);

  const topLanguage = sortedLangs[0] || 'TypeScript';

  // Collect topics
  const allTopics = new Set<string>();
  repos.forEach((r) => {
    (r.topics || []).forEach((t) => allTopics.add(t.toLowerCase()));
  });

  // Category language helpers
  const frontendLangs = ['typescript', 'javascript', 'html', 'css', 'vue', 'svelte', 'tsx', 'jsx', 'scss'];
  const backendLangs = ['python', 'java', 'go', 'php', 'c#', 'ruby', 'c++', 'rust', 'typescript', 'javascript'];
  const pureBackendLangs = ['python', 'java', 'go', 'php', 'c#', 'ruby', 'c++', 'rust'];
  const aiDataLangs = ['python', 'r', 'jupyter notebook', 'jupyter', 'scala', 'julia'];
  const mobileLangs = ['swift', 'kotlin', 'dart', 'java', 'objective-c'];

  // Topic keywords
  const frontendTopics = ['react', 'vue', 'angular', 'frontend', 'nextjs', 'tailwind', 'ui', 'ux', 'web', 'svelte', 'css', 'html'];
  const backendTopics = ['api', 'backend', 'express', 'django', 'flask', 'database', 'postgresql', 'mongodb', 'mysql', 'rest', 'graphql', 'fastapi', 'server', 'microservices'];
  const aiTopics = ['ai', 'ml', 'machine-learning', 'deep-learning', 'pytorch', 'tensorflow', 'data-science', 'pandas', 'numpy', 'scikit-learn', 'nlp', 'llm', 'computer-vision', 'neural-network', 'kaggle'];
  const devopsTopics = ['docker', 'kubernetes', 'devops', 'ci-cd', 'github-actions', 'terraform', 'aws', 'cloud', 'nginx', 'ansible'];
  const mobileTopics = ['mobile', 'android', 'ios', 'flutter', 'react-native'];

  // Counts across repos
  const frontendRepoCount = repos.filter((r) => 
    frontendLangs.includes((r.language || '').toLowerCase()) ||
    (r.topics || []).some((t) => frontendTopics.includes(t.toLowerCase()))
  ).length;

  const backendRepoCount = repos.filter((r) =>
    pureBackendLangs.includes((r.language || '').toLowerCase()) ||
    (r.topics || []).some((t) => backendTopics.includes(t.toLowerCase())) ||
    ['typescript', 'javascript'].includes((r.language || '').toLowerCase())
  ).length;

  const aiRepoCount = repos.filter((r) =>
    aiDataLangs.includes((r.language || '').toLowerCase()) ||
    (r.topics || []).some((t) => aiTopics.includes(t.toLowerCase())) ||
    (r.description || '').toLowerCase().match(/ai|machine learning|deep learning|data|model|predict/i)
  ).length;

  const mobileRepoCount = repos.filter((r) =>
    mobileLangs.includes((r.language || '').toLowerCase()) ||
    (r.topics || []).some((t) => mobileTopics.includes(t.toLowerCase()))
  ).length;

  const cicdWorkflowCount = repos.filter((r) => r.hasWorkflows).length;
  const deployedCount = repos.filter((r) => Boolean(r.deploymentUrl)).length;
  const readmeCount = repos.filter((r) => r.hasReadme).length;

  // 1. Calculate Frontend Fit
  const feRatio = frontendRepoCount / totalRepos;
  let feFit = Math.round(feRatio * 60 + (deployedCount > 0 ? 15 : 0) + (sortedLangs.some(l => frontendLangs.includes(l.toLowerCase())) ? 20 : 5));
  feFit = Math.min(96, Math.max(25, feFit));
  const feReason = `Matched ${frontendRepoCount}/${totalRepos} repositories utilizing frontend stacks (${sortedLangs.filter(l => frontendLangs.includes(l.toLowerCase())).slice(0, 3).join(', ') || 'Web Tech'}) with ${deployedCount} live deployments.`;

  // 2. Calculate Backend Fit
  const beRatio = backendRepoCount / totalRepos;
  let beFit = Math.round(beRatio * 60 + (readmeCount > 0 ? 15 : 5) + (sortedLangs.some(l => backendLangs.includes(l.toLowerCase())) ? 20 : 5));
  beFit = Math.min(96, Math.max(25, beFit));
  const beReason = `Identified ${backendRepoCount}/${totalRepos} server-side API or system components built with ${sortedLangs.filter(l => backendLangs.includes(l.toLowerCase())).slice(0, 3).join(', ') || 'Backend stacks'}.`;

  // 3. Calculate Full-Stack Fit
  let fsFit = Math.round((feFit + beFit) / 2 + (frontendRepoCount > 0 && backendRepoCount > 0 ? 8 : -10));
  fsFit = Math.min(98, Math.max(30, fsFit));
  const fsReason = `Evaluated client & server-side versatility across ${totalRepos} projects (${sortedLangs.slice(0, 3).join(', ') || 'Multi-stack'}).`;

  // 4. Calculate AI / ML Fit
  const aiRatio = aiRepoCount / totalRepos;
  let aiFit = Math.round(aiRatio * 65 + (sortedLangs.some(l => aiDataLangs.includes(l.toLowerCase())) ? 25 : 10));
  aiFit = Math.min(95, Math.max(20, aiFit));
  const aiReason = aiRepoCount > 0
    ? `Detected ${aiRepoCount} repositories focused on data engineering, Python processing, or AI topics.`
    : `Limited AI/ML framework footprint (PyTorch/TensorFlow) detected in public repositories.`;

  // 5. Calculate DevOps Fit
  const devopsRatio = cicdWorkflowCount / totalRepos;
  let devopsFit = Math.round(devopsRatio * 50 + (deployedCount > 0 ? 25 : 10) + (repos.some(r => r.hasWorkflows) ? 15 : 5));
  devopsFit = Math.min(92, Math.max(20, devopsFit));
  const devopsReason = `Configured automated CI/CD workflows in ${cicdWorkflowCount}/${totalRepos} repos and live cloud deployments in ${deployedCount}/${totalRepos} repos.`;

  // 6. Calculate Mobile Fit
  const mobileRatio = mobileRepoCount / totalRepos;
  let mobileFit = Math.round(mobileRatio * 70 + (sortedLangs.some(l => mobileLangs.includes(l.toLowerCase())) ? 20 : 10));
  mobileFit = Math.min(94, Math.max(15, mobileFit));
  const mobileReason = mobileRepoCount > 0
    ? `Found ${mobileRepoCount} repositories with cross-platform or native mobile development components.`
    : `Primary focus is centered on Web & System engineering rather than mobile app runtimes.`;

  const allRoles: RoleEvaluation[] = [
    { roleTitle: 'Full-Stack Software Engineer', fitPercentage: fsFit, reasoning: fsReason },
    { roleTitle: 'Frontend & UI/UX Engineer', fitPercentage: feFit, reasoning: feReason },
    { roleTitle: 'Backend & API Systems Engineer', fitPercentage: beFit, reasoning: beReason },
    { roleTitle: 'AI / Data & Machine Learning Engineer', fitPercentage: aiFit, reasoning: aiReason },
    { roleTitle: 'DevOps & Cloud Infrastructure Engineer', fitPercentage: devopsFit, reasoning: devopsReason },
    { roleTitle: 'Mobile Application Developer', fitPercentage: mobileFit, reasoning: mobileReason },
  ];

  // Sort by fit percentage descending
  allRoles.sort((a, b) => b.fitPercentage - a.fitPercentage);

  // Take top 3 distinct roles
  const suggestedRoles = allRoles.slice(0, 3);

  return {
    suggestedRoles,
    certifications: [
      {
        name: `${topLanguage} Certified Professional Developer`,
        issuer: 'Industry Standard / Ecosystem Authority',
        relevance: 'High',
      },
      {
        name: 'AWS Certified Solutions Architect - Associate',
        issuer: 'Amazon Web Services',
        relevance: devopsFit > 60 ? 'High' : 'Medium',
      },
      {
        name: 'Docker Certified Associate (DCA)',
        issuer: 'Mirantis / Docker',
        relevance: cicdWorkflowCount > 0 ? 'High' : 'Medium',
      },
    ],
    recommendedCourses: [
      {
        title: `Production System Architecture with ${topLanguage}`,
        provider: 'Frontend Masters / O\'Reilly',
        level: 'Intermediate-Advanced',
      },
      {
        title: 'Cloud Native Microservices & CI/CD Pipelines',
        provider: 'Udemy / Coursera',
        level: 'Intermediate',
      },
    ],
    openSourceProjectsToContribute: [
      {
        name: `${topLanguage} Community Ecosystem`,
        repoUrl: `https://github.com/topics/${topLanguage.toLowerCase()}`,
        techStack: sortedLangs.slice(0, 3),
        description: `Active open-source repositories matching your primary stack (${sortedLangs.slice(0, 3).join(', ')}).`,
      },
    ],
    portfolioActionItems: [
      `Maintain README documentation across all ${totalRepos} public repositories (currently ${readmeCount}/${totalRepos}).`,
      `Add live deployment preview URLs to non-deployed projects (currently ${deployedCount}/${totalRepos} deployed).`,
      `Configure automated GitHub Actions CI/CD workflows (currently ${cicdWorkflowCount}/${totalRepos} configured).`,
    ],
  };
}

