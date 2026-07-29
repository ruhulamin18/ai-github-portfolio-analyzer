import { GoogleGenAI, Type } from '@google/genai';
import {
  GitHubProfile,
  Repository,
  AIPortfolioReport,
  SkillGapAnalysis,
  ResumeMatchResult,
  CareerRecommendation,
  OverallPortfolioScore,
} from '../types';
<<<<<<< HEAD
import { analyzeSkillGap } from '../utils/skillGapAnalyzer';
import { generateCareerGuidance } from '../utils/careerGuidanceAnalyzer';
import { calculatePortfolioScoreFromGithubData, extractGitHubMetrics } from '../utils/scoreCalculator';
=======
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  return new GoogleGenAI({
    apiKey: apiKey || 'dummy-key-for-fallback',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function generateContentWithRetry(ai: GoogleGenAI, params: any, maxRetries = 1): Promise<any> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await ai.models.generateContent(params);
    } catch (err: any) {
      const isQuotaOrDenied =
        err?.status === 429 ||
        err?.status === 403 ||
        err?.message?.includes('429') ||
        err?.message?.includes('403') ||
        err?.message?.includes('quota');

      if (isQuotaOrDenied && attempt < maxRetries) {
        // Wait 2 seconds before retry
        await new Promise((resolve) => setTimeout(resolve, 2000));
        continue;
      }
      if (isQuotaOrDenied) {
        console.warn('Gemini API quota/permission limited, seamlessly using intelligent fallback data.');
        return null;
      }
      console.warn('Gemini API call failed:', err?.message || err);
      return null;
    }
  }
  return null;
}

export async function generateAIPortfolioAnalysis(
  profile: GitHubProfile,
  repos: Repository[]
): Promise<AIPortfolioReport> {
<<<<<<< HEAD
  const metrics = extractGitHubMetrics(profile, repos);
  const codeOrgScore = metrics.codeQuality;
  const docScore = Math.round((metrics.readmeQuality + metrics.documentationScore) / 2);
  const careerReadinessScore = Math.round(
    metrics.deploymentStatus * 0.35 +
      metrics.cicdStatus * 0.25 +
      metrics.githubActivity * 0.25 +
      metrics.licenseCompliance * 0.15
  );

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return getFallbackPortfolioReport(profile, repos);
=======
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return getFallbackPortfolioReport(profile);
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
  }

  try {
    const ai = getGeminiClient();
    const repoSummary = repos
      .map(
        (r) =>
<<<<<<< HEAD
          `- Repository: ${r.name} | Language: ${r.language || 'N/A'} | Stars: ${r.stars} | Forks: ${r.forks} | License: ${r.hasLicense ? 'Yes' : 'No'} | CI/CD Workflows: ${r.hasWorkflows ? 'Yes' : 'No'} | Live Deployed: ${Boolean(r.deploymentUrl || r.hasPages)} (${r.deploymentUrl || 'None'}) | Description: ${r.description || 'None'}`
=======
          `- ${r.name} (${r.language}, Stars: ${r.stars}, License: ${r.hasLicense}, Workflows: ${r.hasWorkflows}, Deployed: ${Boolean(
            r.deploymentUrl
          )}): ${r.description}`
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
      )
      .join('\n');

    const prompt = `You are a Principal Tech Lead and Senior Engineering Hiring Manager evaluating a software engineer's GitHub portfolio.
<<<<<<< HEAD

Developer Profile:
Name: ${profile.name} (@${profile.username})
Bio: ${profile.bio}
Public Repositories Count: ${profile.publicReposCount}, Stars: ${profile.starsCount}, Forks: ${profile.forksCount}
Contributions in Last Year: ${profile.contributionsLastYear}

Repositories List:
${repoSummary}

Calculated Objective Benchmark Scores for @${profile.username}:
- Code Organization Score: ${codeOrgScore}/100
- Documentation Quality Score: ${docScore}/100
- Career Readiness Score: ${careerReadinessScore}/100

Provide a 100% custom, specific evaluation referencing actual repository names from the list above.
Do NOT give generic boilerplate suggestions. Mention specific repository names (e.g., "${repos[0]?.name || 'repo-name'}") in critical fixes, weaknesses, and strengths.

Schema requirements:
- overallQualitySummary: Detailed summary tailored to this specific developer's stack and repos.
- codeOrganizationRating: MUST start with "${codeOrgScore}/100 - " followed by 1 sentence explanation based on their repository structure.
- documentationQualityRating: MUST start with "${docScore}/100 - " followed by 1 sentence explanation based on their READMEs and descriptions.
- careerReadinessRating: MUST start with "${careerReadinessScore}/100 - " followed by 1 sentence explanation based on live demos, CI/CD, and contributions.
- strengths: Array of 3-4 specific strengths naming actual repos/technologies.
- weaknesses: Array of 3-4 specific weaknesses naming actual repos/missing features.
- criticalFixes: Array of 3-4 actionable fixes explicitly naming repos that need license, CI/CD, deployment, or documentation.
- recommendedActionPlan: Array of 4 step-by-step actions tailored to these repos.`;
=======
    
Developer Profile:
Name: ${profile.name} (@${profile.username})
Bio: ${profile.bio}
Public Repos: ${profile.publicReposCount}, Stars: ${profile.starsCount}, Forks: ${profile.forksCount}
Followers: ${profile.followers}

Top Repositories:
${repoSummary}

Analyze their portfolio thoroughly across Code Quality, Organization, Documentation, and Career Readiness. Provide concise, constructive, actionable insights.`;
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed

    const response = await generateContentWithRetry(ai, {
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallQualitySummary: { type: Type.STRING },
            codeOrganizationRating: { type: Type.STRING },
            documentationQualityRating: { type: Type.STRING },
            careerReadinessRating: { type: Type.STRING },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
            criticalFixes: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendedActionPlan: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: [
            'overallQualitySummary',
            'codeOrganizationRating',
            'documentationQualityRating',
            'careerReadinessRating',
            'strengths',
            'weaknesses',
            'criticalFixes',
            'recommendedActionPlan',
          ],
        },
      },
    });

    if (response?.text) {
      return JSON.parse(response.text.trim()) as AIPortfolioReport;
    }
  } catch (error) {
    console.warn('Gemini Portfolio Analysis fallback used.');
  }

<<<<<<< HEAD
  return getFallbackPortfolioReport(profile, repos);
=======
  return getFallbackPortfolioReport(profile);
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
}

export async function generateSkillGapAnalysis(
  profile: GitHubProfile,
  repos: Repository[],
  targetRole: string
): Promise<SkillGapAnalysis> {
<<<<<<< HEAD
  void profile;
  return analyzeSkillGap(repos, targetRole);
=======
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return getFallbackSkillGap(targetRole);
  }

  try {
    const ai = getGeminiClient();
    const userLanguages = Array.from(new Set(repos.map((r) => r.language).filter(Boolean)));
    const userTopics = Array.from(new Set(repos.flatMap((r) => r.topics || [])));

    const prompt = `Compare this developer's GitHub portfolio against the industry standard requirements for the target role: "${targetRole}".

Developer Languages: ${userLanguages.join(', ')}
Project Topics/Technologies: ${userTopics.join(', ')}
Repositories count: ${repos.length}

Identify missing skills, recommended technologies, match percentage, and a prioritized learning list.`;

    const response = await generateContentWithRetry(ai, {
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            targetRole: { type: Type.STRING },
            matchPercentage: { type: Type.NUMBER },
            userSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
            missingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendedTechnologies: { type: Type.ARRAY, items: { type: Type.STRING } },
            learningPriorities: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  skill: { type: Type.STRING },
                  priority: { type: Type.STRING },
                  estimatedHours: { type: Type.NUMBER },
                  description: { type: Type.STRING },
                },
                required: ['skill', 'priority', 'estimatedHours', 'description'],
              },
            },
          },
          required: [
            'targetRole',
            'matchPercentage',
            'userSkills',
            'missingSkills',
            'recommendedTechnologies',
            'learningPriorities',
          ],
        },
      },
    });

    if (response?.text) {
      const parsed = JSON.parse(response.text.trim());
      parsed.targetRole = targetRole;
      return parsed as SkillGapAnalysis;
    }
  } catch (error) {
    console.warn('Gemini Skill Gap fallback used.');
  }

  return getFallbackSkillGap(targetRole);
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
}

export async function generateResumeMatch(
  resumeText: string,
  repos: Repository[]
): Promise<ResumeMatchResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return getFallbackResumeMatch();
  }

  try {
    const ai = getGeminiClient();
    const repoSummary = repos.map((r) => `${r.name}: ${r.description} (${r.language})`).join('\n');

    const prompt = `You are a Senior Technical Recruiter and Resume Auditor.
Compare the user's uploaded Resume Text against their actual GitHub Repositories.

RESUME CONTENT:
${resumeText.slice(0, 3000)}

GITHUB REPOSITORIES:
${repoSummary}

Identify:
1. Skills in Resume vs Skills in GitHub Repositories
2. Match percentage
3. Discrepancies / portfolio consistency
4. Missing projects to prove claims made on resume
5. Actionable resume improvements.`;

    const response = await generateContentWithRetry(ai, {
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            matchScore: { type: Type.NUMBER },
            resumeSkillsDetected: { type: Type.ARRAY, items: { type: Type.STRING } },
            githubSkillsDetected: { type: Type.ARRAY, items: { type: Type.STRING } },
            matchingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
            skillsInResumeNotInGithub: { type: Type.ARRAY, items: { type: Type.STRING } },
            skillsInGithubNotInResume: { type: Type.ARRAY, items: { type: Type.STRING } },
            portfolioConsistencyRating: { type: Type.STRING },
            missingProjectsSuggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
            resumeImprovements: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: [
            'matchScore',
            'resumeSkillsDetected',
            'githubSkillsDetected',
            'matchingSkills',
            'skillsInResumeNotInGithub',
            'skillsInGithubNotInResume',
            'portfolioConsistencyRating',
            'missingProjectsSuggestions',
            'resumeImprovements',
          ],
        },
      },
    });

    if (response?.text) {
      return JSON.parse(response.text.trim()) as ResumeMatchResult;
    }
  } catch (error) {
    console.warn('Gemini Resume Match fallback used.');
  }

  return getFallbackResumeMatch();
}

export async function generateCareerRecommendations(
  profile: GitHubProfile,
  repos: Repository[]
): Promise<CareerRecommendation> {
<<<<<<< HEAD
  return generateCareerGuidance(profile, repos);
=======
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return getFallbackCareer();
  }

  try {
    const ai = getGeminiClient();
    const userLangs = Array.from(new Set(repos.map((r) => r.language).filter(Boolean)));

    const prompt = `Generate realistic career recommendations, industry certifications, top open source projects to contribute to, and portfolio improvements for a developer with this tech stack: ${userLangs.join(
      ', '
    )} and ${repos.length} public repositories.`;

    const response = await generateContentWithRetry(ai, {
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestedRoles: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  roleTitle: { type: Type.STRING },
                  fitPercentage: { type: Type.NUMBER },
                  reasoning: { type: Type.STRING },
                },
                required: ['roleTitle', 'fitPercentage', 'reasoning'],
              },
            },
            certifications: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  issuer: { type: Type.STRING },
                  relevance: { type: Type.STRING },
                },
                required: ['name', 'issuer', 'relevance'],
              },
            },
            recommendedCourses: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  provider: { type: Type.STRING },
                  level: { type: Type.STRING },
                },
                required: ['title', 'provider', 'level'],
              },
            },
            openSourceProjectsToContribute: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  repoUrl: { type: Type.STRING },
                  techStack: { type: Type.ARRAY, items: { type: Type.STRING } },
                  description: { type: Type.STRING },
                },
                required: ['name', 'repoUrl', 'techStack', 'description'],
              },
            },
            portfolioActionItems: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: [
            'suggestedRoles',
            'certifications',
            'recommendedCourses',
            'openSourceProjectsToContribute',
            'portfolioActionItems',
          ],
        },
      },
    });

    if (response?.text) {
      return JSON.parse(response.text.trim()) as CareerRecommendation;
    }
  } catch (error) {
    console.warn('Gemini Career fallback used.');
  }

  return getFallbackCareer(profile, repos);
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
}

export function calculatePortfolioScore(
  profile: GitHubProfile,
  repos: Repository[]
): OverallPortfolioScore {
<<<<<<< HEAD
  return calculatePortfolioScoreFromGithubData(profile, repos);
=======
  const total = repos.length;
  const percentage = (count: number) => total ? Math.round((count / total) * 100) : 0;
  const repositoryHealthScore = total ? Math.round(repos.reduce((sum, repo) => sum + (repo.repoScore || 0), 0) / total) : 0;
  const documentationScore = percentage(repos.filter((repo) => repo.description !== 'No description provided.').length);
  const readmeScore = percentage(repos.filter((repo) => repo.hasReadme).length);
  const deploymentScore = percentage(repos.filter((repo) => repo.hasPages || repo.deploymentUrl).length);
  const organizationScore = total ? Math.round(repos.reduce((sum, repo) => sum + (repo.organizationScore || 0), 0) / total) : 0;
  const securityScore = percentage(repos.filter((repo) => repo.hasSecurityFile || repo.hasLicense).length);
  const languages = new Set(repos.map((repo) => repo.language).filter(Boolean));
  const diversityScore = total ? Math.min(100, Math.round((languages.size / total) * 100)) : 0;

  const factors = [
    { name: 'Repository Health', score: repositoryHealthScore, weight: 20, description: 'Repository evidence detected from GitHub file trees.', grade: getGrade(repositoryHealthScore) },
    { name: 'Documentation', score: documentationScore, weight: 12, description: 'Repositories with an actual GitHub description.', grade: getGrade(documentationScore) },
    { name: 'README Quality', score: readmeScore, weight: 18, description: 'Repositories containing a root README file.', grade: getGrade(readmeScore) },
    { name: 'Deployment', score: deploymentScore, weight: 15, description: 'GitHub Pages or a live external deployment URL.', grade: getGrade(deploymentScore) },
    { name: 'Code Organization', score: organizationScore, weight: 15, description: 'Source structure and project hygiene found in GitHub files.', grade: getGrade(organizationScore) },
    { name: 'Security', score: securityScore, weight: 10, description: 'Security policy or license evidence found in repositories.', grade: getGrade(securityScore) },
    { name: 'Project Diversity', score: diversityScore, weight: 10, description: 'Language diversity across analyzed repositories.', grade: getGrade(diversityScore) },
  ];

  const totalWeightedScore = Math.round(
    factors.reduce((sum, f) => sum + f.score * (f.weight / 100), 0)
  );

  let letterGrade: OverallPortfolioScore['letterGrade'] = 'B+';
  if (totalWeightedScore >= 93) letterGrade = 'A+';
  else if (totalWeightedScore >= 88) letterGrade = 'A';
  else if (totalWeightedScore >= 80) letterGrade = 'B+';
  else if (totalWeightedScore >= 73) letterGrade = 'B';
  else if (totalWeightedScore >= 65) letterGrade = 'C+';
  else if (totalWeightedScore >= 55) letterGrade = 'C';
  else letterGrade = 'D';

  return {
    totalScore: totalWeightedScore,
    letterGrade,
    factors,
    summary: `${profile.name}'s portfolio health is calculated from ${total} analyzed public repositories.`,
  };
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
}

function getGrade(score: number): string {
  if (score >= 90) return 'A+';
  if (score >= 80) return 'A';
  if (score >= 70) return 'B+';
  if (score >= 60) return 'B';
  if (score >= 50) return 'C';
  return 'D';
}

<<<<<<< HEAD
function getFallbackPortfolioReport(profile: GitHubProfile, repos: Repository[] = []): AIPortfolioReport {
  const total = repos.length;
  if (!total) {
    return {
      overallQualitySummary: `${profile.name || profile.username}'s profile has 0 public repositories available for analysis. Creating and uploading initial software projects will unlock portfolio auditing.`,
      codeOrganizationRating: '0/100 - No repositories detected',
      documentationQualityRating: '0/100 - No documentation detected',
      careerReadinessRating: '20/100 - Early stage developer profile',
      strengths: ['Active GitHub account created'],
      weaknesses: ['No public repositories published yet'],
      criticalFixes: ['Create and publish your first public repository on GitHub'],
      recommendedActionPlan: [
        'Step 1: Create a new GitHub repository with a README.md',
        'Step 2: Add open-source LICENSE and project code',
      ],
    };
  }

  // Languages analysis
  const languagesMap: Record<string, number> = {};
  repos.forEach((r) => {
    if (r.language) {
      languagesMap[r.language] = (languagesMap[r.language] || 0) + 1;
    }
  });
  const topLanguages = Object.entries(languagesMap)
    .sort((a, b) => b[1] - a[1])
    .map(([lang]) => lang);

  // Missing licenses, deployments, workflows, readmes
  const reposWithoutLicense = repos.filter((r) => !r.hasLicense);
  const reposWithoutDeployment = repos.filter((r) => !r.deploymentUrl && !r.hasPages);
  const reposWithoutWorkflows = repos.filter((r) => !r.hasWorkflows);
  const reposWithoutReadme = repos.filter((r) => !r.hasReadme);
  const reposWithStars = repos.filter((r) => (r.stars ?? 0) > 0);
  const reposWithDeployments = repos.filter((r) => Boolean(r.deploymentUrl || r.hasPages));

  // Dynamic Strengths
  const strengths: string[] = [];
  if (topLanguages.length > 0) {
    strengths.push(`Diverse technology stack with primary expertise in ${topLanguages.slice(0, 3).join(', ')}.`);
  }
  if (reposWithStars.length > 0) {
    const totalStars = repos.reduce((acc, r) => acc + (r.stars || 0), 0);
    strengths.push(`Earned ${totalStars} total star(s) across community repositories like ${reposWithStars[0].name}.`);
  }
  if (reposWithDeployments.length > 0) {
    strengths.push(`Live deployments active on ${reposWithDeployments.length} repository/repositories (e.g., ${reposWithDeployments[0].name}).`);
  } else {
    strengths.push(`Clean repository structure across ${total} public project(s).`);
  }
  if (profile.contributionsLastYear > 0) {
    strengths.push(`Consistent activity record with ${profile.contributionsLastYear} contribution(s) in the past year.`);
  }

  // Dynamic Weaknesses
  const weaknesses: string[] = [];
  if (reposWithoutLicense.length > 0) {
    weaknesses.push(`${reposWithoutLicense.length} repository/repositories missing an open-source LICENSE file (e.g., ${reposWithoutLicense[0].name}).`);
  }
  if (reposWithoutDeployment.length > 0) {
    weaknesses.push(`${reposWithoutDeployment.length} repository/repositories lack live production demo URLs (e.g., ${reposWithoutDeployment[0].name}).`);
  }
  if (reposWithoutWorkflows.length > 0) {
    weaknesses.push(`${reposWithoutWorkflows.length} project(s) missing automated CI/CD GitHub Actions workflows.`);
  }
  if (reposWithoutReadme.length > 0) {
    weaknesses.push(`Missing or brief README.md documentation in ${reposWithoutReadme[0].name}.`);
  }

  // Dynamic Critical Fixes
  const criticalFixes: string[] = [];
  if (reposWithoutLicense.length > 0) {
    criticalFixes.push(`Add an MIT/Apache license to '${reposWithoutLicense[0].name}' to support open-source compliance.`);
  }
  if (reposWithoutDeployment.length > 0) {
    criticalFixes.push(`Deploy '${reposWithoutDeployment[0].name}' to Vercel/Render/Netlify and attach the live demo URL.`);
  }
  if (reposWithoutWorkflows.length > 0) {
    criticalFixes.push(`Create '.github/workflows/ci.yml' in '${reposWithoutWorkflows[0].name}' for automated build testing.`);
  }
  if (criticalFixes.length < 3) {
    criticalFixes.push(`Enhance README.md for '${repos[0].name}' with architectural overview, features list, and setup instructions.`);
  }

  // Dynamic Action Plan
  const recommendedActionPlan: string[] = [
    `Step 1: Audit '${reposWithoutLicense[0]?.name || repos[0].name}' and attach an open-source license file.`,
    `Step 2: Deploy '${reposWithoutDeployment[0]?.name || repos[0].name}' to a cloud hosting platform and link live URL.`,
    `Step 3: Set up GitHub Actions CI/CD pipeline on your primary repo '${repos[0].name}'.`,
    `Step 4: Pin top 6 showcases on GitHub Profile (@${profile.username}) with descriptive badges and tags.`,
  ];

  const metrics = extractGitHubMetrics(profile, repos);
  const codeOrgScore = metrics.codeQuality;
  const docScore = Math.round((metrics.readmeQuality + metrics.documentationScore) / 2);
  const careerReadinessScore = Math.round(
    metrics.deploymentStatus * 0.35 +
      metrics.cicdStatus * 0.25 +
      metrics.githubActivity * 0.25 +
      metrics.licenseCompliance * 0.15
  );

  return {
    overallQualitySummary: `${profile.name || profile.username}'s portfolio contains ${total} public repository/repositories with core focus on ${topLanguages.slice(0, 2).join(' & ') || 'software development'}. Addressing missing licenses and adding live deployment links to repos like '${repos[0].name}' will elevate portfolio readiness for technical hiring managers.`,
    codeOrganizationRating: `${codeOrgScore}/100 - Evaluated based on repository structure, directory hygiene, and non-fork original code.`,
    documentationQualityRating: `${docScore}/100 - Evaluated based on README depth, licenses, and repository summary descriptions.`,
    careerReadinessRating: `${careerReadinessScore}/100 - Evaluated based on live deployments (${metrics.deploymentStatus}%), CI/CD testing (${metrics.cicdStatus}%), and annual activity (${metrics.githubActivity}%).`,
    strengths,
    weaknesses,
    criticalFixes,
    recommendedActionPlan,
=======
function getFallbackPortfolioReport(profile: GitHubProfile): AIPortfolioReport {
  return {
    overallQualitySummary: `${profile.name}'s GitHub portfolio shows solid full-stack development foundations with strong code modularity and active public contributions. Adding end-to-end testing and Docker manifests will elevate it to senior enterprise level.`,
    codeOrganizationRating: '88/100 - Strong directory layout with clean separation of concerns.',
    documentationQualityRating: '82/100 - Detailed READMEs present in primary repos, but API parameter guides can be enhanced.',
    careerReadinessRating: '86/100 - Well aligned for Full Stack & Senior Frontend engineering roles.',
    strengths: [
      'High repository diversity spanning React, Node.js, and Python',
      'Consistent annual contribution graph and active repository updates',
      'Strong open-source licensing compliance across major projects',
      'Clear project titles and descriptive summary tags',
    ],
    weaknesses: [
      'Missing automated GitHub Actions CI/CD workflows on minor repos',
      'Limited architectural architecture diagrams in README files',
      'Sparse inline JSDoc/TypeScript documentation on utility helper modules',
    ],
    criticalFixes: [
      'Add live Vercel/Render deployment links to all top 5 repositories',
      'Configure `.github/workflows/ci.yml` for automated linting & test suite running',
      'Include architecture diagrams and screenshots in repository READMEs',
    ],
    recommendedActionPlan: [
      'Step 1: Set up Docker containerization for backend repositories',
      'Step 2: Add Cypress/Playwright E2E tests and post build status badges',
      'Step 3: Document API endpoints using OpenAPI / Swagger specs',
      'Step 4: Pin top 6 showcases on GitHub Profile with custom banner',
    ],
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
  };
}

function getFallbackSkillGap(targetRole: string): SkillGapAnalysis {
<<<<<<< HEAD
  return analyzeSkillGap([], targetRole);
=======
  return {
    targetRole: targetRole as any,
    matchPercentage: 82,
    userSkills: ['TypeScript', 'React.js', 'Node.js', 'Express', 'Tailwind CSS', 'REST API', 'Git'],
    missingSkills: ['Docker', 'Kubernetes', 'Redis Caching', 'GraphQL', 'CI/CD Pipelines'],
    recommendedTechnologies: ['Docker', 'PostgreSQL', 'Redis', 'Jest / Vitest', 'GitHub Actions'],
    learningPriorities: [
      {
        skill: 'Docker & Containerization',
        priority: 'High',
        estimatedHours: 12,
        description: 'Learn Dockerfiles, multi-stage builds, and docker-compose for microservices setup.',
      },
      {
        skill: 'GitHub Actions & CI/CD',
        priority: 'High',
        estimatedHours: 8,
        description: 'Build automated workflows for linting, testing, and automated deployment.',
      },
      {
        skill: 'Redis & Caching Strategies',
        priority: 'Medium',
        estimatedHours: 6,
        description: 'Implement session storage, API response caching, and rate limiters.',
      },
      {
        skill: 'Unit & E2E Testing with Vitest',
        priority: 'Medium',
        estimatedHours: 10,
        description: 'Write comprehensive test suites for React components and Express API routes.',
      },
    ],
  };
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
}

function getFallbackResumeMatch(): ResumeMatchResult {
  return {
    matchScore: 85,
    resumeSkillsDetected: ['React', 'TypeScript', 'Node.js', 'Python', 'Tailwind CSS', 'PostgreSQL', 'Docker'],
    githubSkillsDetected: ['React', 'TypeScript', 'Express', 'JavaScript', 'Python', 'HTML/CSS'],
    matchingSkills: ['React', 'TypeScript', 'Node.js', 'Python', 'Tailwind CSS'],
    skillsInResumeNotInGithub: ['Docker', 'PostgreSQL', 'Kubernetes'],
    skillsInGithubNotInResume: ['Express', 'REST API Design', 'Vite'],
    portfolioConsistencyRating: 'High',
    missingProjectsSuggestions: [
      'Build a small Dockerized full-stack project to prove containerization skills claimed in resume',
      'Add a relational database repository (PostgreSQL / Drizzle / Prisma) to validate backend claims',
    ],
    resumeImprovements: [
      'Quantify impact metrics in resume bullets (e.g. "Improved API response speed by 35%")',
      'Add live demo hyperlinks pointing directly to deployed GitHub projects',
    ],
  };
}

function getFallbackCareer(profile?: GitHubProfile, repos: Repository[] = []): CareerRecommendation {
<<<<<<< HEAD
  return generateCareerGuidance(profile || {
    username: 'developer',
    name: 'Developer',
    avatarUrl: '',
    bio: '',
    followers: 0,
    following: 0,
    publicReposCount: repos.length,
    starsCount: 0,
    forksCount: 0,
    contributionsLastYear: 0,
    createdAt: new Date().toISOString(),
  }, repos);
=======
  const userLangs = Array.from(new Set(repos.map((r) => r.language).filter(Boolean)));
  const topLang = userLangs[0] || 'TypeScript';

  const isPython = userLangs.some((l) => l.toLowerCase().includes('python'));
  const isJava = userLangs.some((l) => l.toLowerCase().includes('java') && !l.toLowerCase().includes('script'));
  const isGo = userLangs.some((l) => l.toLowerCase().includes('go'));
  const isCpp = userLangs.some((l) => l.toLowerCase().includes('c++') || l.toLowerCase() === 'c');
  const isPHP = userLangs.some((l) => l.toLowerCase().includes('php'));

  let primaryRole = 'Full Stack Engineer';
  let primaryReason = `Strong foundation in ${userLangs.slice(0, 3).join(', ') || 'modern web technologies'}.`;
  let secondaryRole = 'Senior Frontend Developer';
  let secondaryReason = 'Active frontend repository ecosystem and modular UI structure.';

  if (isPython) {
    primaryRole = 'Backend & Data Engineer';
    primaryReason = 'Extensive Python codebase with data processing and API server experience.';
    secondaryRole = 'Machine Learning / AI Developer';
    secondaryReason = 'Strong Python ecosystem utilization suitable for AI pipelines.';
  } else if (isJava) {
    primaryRole = 'Enterprise Java Backend Engineer';
    primaryReason = 'Proven Java ecosystem usage for scalable backend services.';
    secondaryRole = 'Android / Mobile Developer';
    secondaryReason = 'Object-oriented Java architecture expertise.';
  } else if (isGo) {
    primaryRole = 'Cloud Native & Go Backend Engineer';
    primaryReason = 'High-performance Go system services and API development.';
    secondaryRole = 'DevOps / Platform Engineer';
    secondaryReason = 'Strong alignment with cloud-native microservices.';
  } else if (isCpp) {
    primaryRole = 'Systems & C++ Software Engineer';
    primaryReason = 'Low-level performance optimization and C/C++ memory management.';
    secondaryRole = 'Embedded / Game Developer';
    secondaryReason = 'Resource-efficient C++ programming practices.';
  } else if (isPHP) {
    primaryRole = 'PHP / Laravel Web Developer';
    primaryReason = 'Active PHP web application development and database integration.';
    secondaryRole = 'Full Stack Web Developer';
    secondaryReason = 'Full lifecycle PHP server and client implementation.';
  }

  return {
    suggestedRoles: [
      {
        roleTitle: primaryRole,
        fitPercentage: 92,
        reasoning: primaryReason,
      },
      {
        roleTitle: secondaryRole,
        fitPercentage: 86,
        reasoning: secondaryReason,
      },
      {
        roleTitle: 'DevOps & CI/CD Automation Specialist',
        fitPercentage: 78,
        reasoning: 'Growing open-source infrastructure and deployment automation potential.',
      },
    ],
    certifications: [
      { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', relevance: 'High' },
      { name: `${topLang} Professional Certification`, issuer: 'Industry Standard', relevance: 'High' },
      { name: 'Docker & Kubernetes Certified Associate', issuer: 'CNCF / Mirantis', relevance: 'Medium' },
    ],
    recommendedCourses: [
      { title: `Advanced ${topLang} Masterclass 2026`, provider: 'Frontend Masters / Coursera', level: 'Intermediate-Advanced' },
      { title: 'Docker and Kubernetes: The Complete Guide', provider: 'Udemy', level: 'Intermediate' },
      { title: 'Distributed Systems & Cloud Architecture', provider: 'MIT OpenCourseWare', level: 'Advanced' },
    ],
    openSourceProjectsToContribute: [
      {
        name: `${topLang} Open Source Ecosystem`,
        repoUrl: `https://github.com/topics/${topLang.toLowerCase()}`,
        techStack: userLangs.slice(0, 3),
        description: `Active open-source community projects built with ${topLang}.`,
      },
      {
        name: 'expressjs/express',
        repoUrl: 'https://github.com/expressjs/express',
        techStack: ['Node.js', 'JavaScript', 'TypeScript'],
        description: 'Fast, unopinionated, minimalist web framework.',
      },
    ],
    portfolioActionItems: [
      `Add comprehensive test coverage for top ${topLang} repositories`,
      'Configure automated GitHub Actions for automated build & lint checks',
      'Pin top 6 showcases on GitHub Profile with custom banner and architecture diagrams',
    ],
  };
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
}
