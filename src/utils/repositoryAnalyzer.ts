import { Repository } from '../types';

export function getLatestRepository(repos: Repository[]): Repository | undefined {
  if (!repos || repos.length === 0) return undefined;
  const sorted = [...repos].sort((a, b) => {
    const timeA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
    const timeB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
    return timeB - timeA;
  });
  return sorted[0];
}

export function generateDynamicInsights(
  repos: Repository[],
  languageDistribution: { name: string; displayVal: string }[] = []
): { type: 'green' | 'yellow' | 'red'; text: string }[] {
  const totalRepoCount = repos.length || 1;
  const readmeCount = repos.filter((r) => r.hasReadme).length;
  const readmePct = Math.round((readmeCount / totalRepoCount) * 100);
  const licensedCount = repos.filter((r) => Boolean(r.hasLicense)).length;
  const missingLicense = totalRepoCount - licensedCount;
  const workflowCount = repos.filter((r) => Boolean(r.hasWorkflows)).length;
  const deployedCount = repos.filter((r) => Boolean(r.deploymentUrl)).length;
  const topLanguage = languageDistribution[0];

  const dynamicInsights: { type: 'green' | 'yellow' | 'red'; text: string }[] = [];

  if (readmePct === 100) {
    dynamicInsights.push({
      type: 'green',
      text: `100% README coverage verified across all ${totalRepoCount} repositories`,
    });
  } else {
    dynamicInsights.push({
      type: 'yellow',
      text: `${readmeCount}/${totalRepoCount} repos have README (${totalRepoCount - readmeCount} missing documentation)`,
    });
  }

  if (missingLicense === 0) {
    dynamicInsights.push({
      type: 'green',
      text: `100% License compliance verified on all ${totalRepoCount} projects`,
    });
  } else {
    dynamicInsights.push({
      type: 'yellow',
      text: `${missingLicense} ${missingLicense === 1 ? 'repository is' : 'repositories are'} missing an open-source license file`,
    });
  }

  if (workflowCount > 0) {
    dynamicInsights.push({
      type: 'green',
      text: `${workflowCount}/${totalRepoCount} ${workflowCount === 1 ? 'repository has' : 'repositories have'} GitHub Actions CI/CD active`,
    });
  } else {
    dynamicInsights.push({
      type: 'red',
      text: `${totalRepoCount} ${totalRepoCount === 1 ? 'project requires' : 'projects require'} automated CI/CD test workflows`,
    });
  }

  if (topLanguage) {
    dynamicInsights.push({
      type: 'green',
      text: `Primary language is ${topLanguage.name} (${topLanguage.displayVal} of public codebase)`,
    });
  } else {
    dynamicInsights.push({
      type: 'green',
      text: `${totalRepoCount} active repositories analyzed from GitHub API`,
    });
  }

  if (deployedCount > 0) {
    dynamicInsights.push({
      type: 'green',
      text: `${deployedCount} live production ${deployedCount === 1 ? 'deployment' : 'deployments'} detected in repository metadata`,
    });
  }

  return dynamicInsights;
}
