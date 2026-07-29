import { GitHubProfile, Repository, CareerRecommendation } from '../types';

export function generateCareerGuidance(profile: GitHubProfile, repos: Repository[]): CareerRecommendation {
  const languages = Array.from(new Set(repos.map((r) => r.language).filter(Boolean)));
  const topLanguage = languages[0] || 'TypeScript';

  const hasFrontend = languages.some((l) => ['typescript', 'javascript', 'html', 'css'].includes(l.toLowerCase()));
  const hasBackend = languages.some((l) => ['python', 'java', 'go', 'php', 'c#', 'ruby', 'c++'].includes(l.toLowerCase()));
  const hasPython = languages.some((l) => l.toLowerCase() === 'python');

  let primaryRole = 'Full Stack Engineer';
  let primaryFit = 92;
  let primaryReasoning = `Strong multi-language repository footprint (${languages.slice(0, 3).join(', ') || 'Modern Web Stack'}).`;

  if (hasPython) {
    primaryRole = 'Backend / AI Engineer';
    primaryFit = 94;
    primaryReasoning = 'Demonstrated Python ecosystem utilization and data processing capabilities.';
  } else if (hasFrontend && !hasBackend) {
    primaryRole = 'Frontend Specialist';
    primaryFit = 90;
    primaryReasoning = 'High density of client-side web components and UI frameworks.';
  }

  const deployedCount = repos.filter((r) => Boolean(r.deploymentUrl)).length;
  const readmeCount = repos.filter((r) => r.hasReadme).length;

  return {
    suggestedRoles: [
      {
        roleTitle: primaryRole,
        fitPercentage: primaryFit,
        reasoning: primaryReasoning,
      },
      {
        roleTitle: 'Software Systems Architect',
        fitPercentage: 85,
        reasoning: `Repository evaluation across ${repos.length} repositories indicates structured modular design.`,
      },
      {
        roleTitle: 'DevOps & Infrastructure Engineer',
        fitPercentage: 78,
        reasoning: 'Opportunities to expand automated CI/CD pipelines and deployment containerization.',
      },
    ],
    certifications: [
      {
        name: 'AWS Certified Solutions Architect - Associate',
        issuer: 'Amazon Web Services',
        relevance: 'High',
      },
      {
        name: `${topLanguage} Professional Developer Certification`,
        issuer: 'Open Source / Industry Standard',
        relevance: 'High',
      },
      {
        name: 'Docker Certified Associate (DCA)',
        issuer: 'Mirantis / Docker',
        relevance: 'Medium',
      },
    ],
    recommendedCourses: [
      {
        title: `Production Software Architecture with ${topLanguage}`,
        provider: 'Frontend Masters / O\'Reilly',
        level: 'Intermediate-Advanced',
      },
      {
        title: 'Cloud Native Microservices & Kubernetes',
        provider: 'Udemy / Coursera',
        level: 'Intermediate',
      },
    ],
    openSourceProjectsToContribute: [
      {
        name: `${topLanguage} Community Ecosystem`,
        repoUrl: `https://github.com/topics/${topLanguage.toLowerCase()}`,
        techStack: languages.slice(0, 3),
        description: `Popular open source repositories utilizing ${topLanguage}.`,
      },
    ],
    portfolioActionItems: [
      `Maintain README documentation across all ${repos.length} public repositories (currently ${readmeCount}/${repos.length}).`,
      `Add live deployment preview URLs to non-deployed projects (currently ${deployedCount}/${repos.length} deployed).`,
      'Configure automated GitHub Actions for unit testing and code linting.',
    ],
  };
}
