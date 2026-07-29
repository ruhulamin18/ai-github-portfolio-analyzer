import { Repository } from '../types';

export * from './githubScoreCalculator';

export interface RepositoryHealthPillars {
  readmeQualityScore: number;
  docScore: number;
  deployedCount: number;
  deploymentScore: number;
  licensedCount: number;
  licenseScore: number;
  securityCount: number;
  securityScore: number;
  workflowCount: number;
  cicdScore: number;
  overallHealthScore: number;
  healthPillars: {
    name: string;
    score: number;
    label: string;
    color: string;
  }[];
}

export function calculateRepositoryHealth(repos: Repository[]): RepositoryHealthPillars {
  const totalRepoCount = repos.length || 1;

  const readmeQualityScore = Math.min(
    100,
    Math.round(repos.reduce((acc, r) => acc + (r.readmeScore || 0), 0) / totalRepoCount)
  );

  const docScore = Math.min(
    100,
    Math.round(
      (repos.filter((r) => Boolean(r.description && r.description.length > 5 && r.description !== 'No description provided.')).length /
        totalRepoCount) *
        100
    )
  );

  const deployedCount = repos.filter((r) => Boolean(r.deploymentUrl || r.hasPages)).length;
  const deploymentScore = Math.min(100, Math.round((deployedCount / totalRepoCount) * 100));

  const licensedCount = repos.filter((r) => Boolean(r.hasLicense)).length;
  const licenseScore = Math.min(100, Math.round((licensedCount / totalRepoCount) * 100));

  const securityCount = repos.filter((r) => Boolean(r.hasSecurityFile || r.hasLicense)).length;
  const securityScore = Math.min(100, Math.round((securityCount / totalRepoCount) * 100));

  const workflowCount = repos.filter((r) => Boolean(r.hasWorkflows)).length;
  const cicdScore = Math.min(100, Math.round((workflowCount / totalRepoCount) * 100));

  const overallHealthScore = Math.round(
    readmeQualityScore * 0.25 +
      docScore * 0.20 +
      deploymentScore * 0.15 +
      licenseScore * 0.15 +
      securityScore * 0.15 +
      cicdScore * 0.10
  );

  const healthPillars = [
    {
      name: 'README Quality',
      score: readmeQualityScore,
      label: `${repos.filter((r) => r.hasReadme).length}/${totalRepoCount} Repos`,
      color: readmeQualityScore >= 80 ? '#22C55E' : '#F2C879',
    },
    {
      name: 'Documentation Score',
      score: docScore,
      label: `${repos.filter((r) => Boolean(r.description)).length}/${totalRepoCount} Described`,
      color: docScore >= 80 ? '#22C55E' : '#F2C879',
    },
    {
      name: 'Deployment Status',
      score: deploymentScore,
      label: `${deployedCount}/${totalRepoCount} Live Deployed`,
      color: deploymentScore > 0 ? '#22C55E' : '#8B8680',
    },
    {
      name: 'License Compliance',
      score: licenseScore,
      label: `${licensedCount}/${totalRepoCount} Open-Source`,
      color: licenseScore >= 80 ? '#22C55E' : '#F2C879',
    },
    {
      name: 'Security Score',
      score: securityScore,
      label: `${securityCount}/${totalRepoCount} Secured`,
      color: securityScore >= 80 ? '#22C55E' : '#F2C879',
    },
    {
      name: 'CI/CD Test Status',
      score: cicdScore,
      label: `${workflowCount}/${totalRepoCount} Actions Active`,
      color: cicdScore > 0 ? '#22C55E' : '#8B8680',
    },
  ];

  return {
    readmeQualityScore,
    docScore,
    deployedCount,
    deploymentScore,
    licensedCount,
    licenseScore,
    securityCount,
    securityScore,
    workflowCount,
    cicdScore,
    overallHealthScore,
    healthPillars,
  };
}
