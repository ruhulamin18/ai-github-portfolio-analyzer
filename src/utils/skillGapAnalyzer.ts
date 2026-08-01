import { Repository, SkillGapAnalysis } from '../types';

const ROLE_SKILLS: Record<string, { required: string[]; optional: string[] }> = {
  'Frontend Developer': {
    required: ['JavaScript', 'TypeScript', 'React', 'HTML/CSS', 'Tailwind CSS', 'REST API', 'Responsive Design'],
    optional: ['Next.js', 'Vue.js', 'State Management (Redux/Zustand)', 'Jest/Vitest', 'Web Performance'],
  },
  'Backend Developer': {
    required: ['Node.js', 'Express', 'TypeScript', 'SQL/PostgreSQL', 'REST API', 'Database Design', 'Authentication'],
    optional: ['MongoDB', 'Docker', 'Redis', 'GraphQL', 'Microservices', 'CI/CD'],
  },
  'Full Stack Developer': {
    required: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'REST API', 'SQL/NoSQL', 'Git'],
    optional: ['Tailwind CSS', 'Docker', 'PostgreSQL', 'CI/CD', 'Next.js', 'Redis'],
  },
  'DevOps Engineer': {
    required: ['Docker', 'CI/CD Pipelines', 'GitHub Actions', 'Linux/Shell', 'Cloud Deployment', 'Git'],
    optional: ['Kubernetes', 'Terraform', 'Monitoring (Prometheus/Grafana)', 'Python', 'Nginx'],
  },
  'ML Engineer': {
    required: ['Python', 'Data Preprocessing', 'Machine Learning Algorithms', 'Git', 'Data Visualization'],
    optional: ['PyTorch', 'TensorFlow', 'Pandas/NumPy', 'Scikit-Learn', 'MLOps', 'FastAPI'],
  },
  'Data Scientist': {
    required: ['Python', 'SQL', 'Data Analysis', 'Statistics', 'Pandas/NumPy', 'Data Visualization'],
    optional: ['Jupyter Notebooks', 'R', 'Scikit-Learn', 'Tableau/PowerBI', 'BigQuery'],
  },
};

export function analyzeSkillGap(repos: Repository[], targetRole: string): SkillGapAnalysis {
  const roleData = ROLE_SKILLS[targetRole] || ROLE_SKILLS['Full Stack Developer'];
  const userLanguages = new Set<string>();
  const userTopics = new Set<string>();

  repos.forEach((repo) => {
    if (repo.language) userLanguages.add(repo.language.toLowerCase());
    if (repo.topics) repo.topics.forEach((t) => userTopics.add(t.toLowerCase()));
  });

  const checkSkillMatch = (skill: string): boolean => {
    const skillLower = skill.toLowerCase();
    const hasLang = Array.from(userLanguages).some(
      (l) => l.includes(skillLower) || skillLower.includes(l)
    );
    const hasTopic = Array.from(userTopics).some(
      (t) => t.includes(skillLower) || skillLower.includes(t)
    );

    let matched = hasLang || hasTopic;

    if (!matched) {
      if (skill === 'Git' || skill === 'HTML/CSS' || skill === 'Responsive Design') matched = repos.length > 0;
      if (
        skill === 'REST API' ||
        skill === 'Authentication' ||
        skill === 'Database Design'
      ) {
        matched = repos.some(
          (r) =>
            r.description?.toLowerCase().includes('api') ||
            r.description?.toLowerCase().includes('auth') ||
            r.topics?.some((t) => t.includes('api') || t.includes('auth'))
        );
      }
      if (
        skill === 'CI/CD' ||
        skill === 'CI/CD Pipelines' ||
        skill === 'GitHub Actions'
      ) {
        matched = repos.some((r) => r.hasWorkflows);
      }
      if (skill === 'Cloud Deployment') {
        matched = repos.some((r) => Boolean(r.deploymentUrl));
      }
      if (skill === 'Linux/Shell') {
        matched = repos.some((r) => r.hasWorkflows || r.language?.toLowerCase() === 'shell');
      }
    }
    return matched;
  };

  const detectedCoreSkills = roleData.required.filter(checkSkillMatch);
  const missingCoreSkills = roleData.required.filter((s) => !checkSkillMatch(s));

  const detectedOptionalSkills = roleData.optional.filter(checkSkillMatch);
  const missingOptionalSkills = roleData.optional.filter((s) => !checkSkillMatch(s));

  const detectedUserSkills = [...detectedCoreSkills, ...detectedOptionalSkills];
  const missingUserSkills = [...missingCoreSkills, ...missingOptionalSkills];

  const allRoleSkills = [...roleData.required, ...roleData.optional];
  const totalEvaluated = allRoleSkills.length;

  const matchPercentage =
    totalEvaluated > 0
      ? Math.round((detectedUserSkills.length / totalEvaluated) * 100)
      : 75;

  const userSkillsList = detectedUserSkills;
  const missingSkillsList = missingUserSkills;

  // Weak areas are critical missing core skills, or missing optional skills if core skills are all satisfied
  const weakAreas =
    missingCoreSkills.length > 0
      ? missingCoreSkills
      : missingOptionalSkills.length > 0
      ? missingOptionalSkills
      : ['Advanced System Architecture'];

  const learningPriorities = missingSkillsList.slice(0, 4).map((skill, index) => ({
    skill,
    priority: index === 0 ? 'High' : index < 2 ? 'Medium' : 'Low',
    estimatedHours: (index + 1) * 8,
    description: `Master ${skill} fundamentals and build a dedicated GitHub project to showcase practical proficiency.`,
  }));

  const readiness =
    matchPercentage >= 85
      ? 'Production Ready'
      : matchPercentage >= 70
      ? 'Industry Ready'
      : 'Needs Development';

  return {
    targetRole: targetRole as any,
    matchPercentage,
    userSkills: userSkillsList,
    missingSkills: missingSkillsList,
    coreSkillsTotal: roleData.required.length,
    coreSkillsMatched: detectedCoreSkills.length,
    recommendedTechnologies: missingSkillsList.slice(0, 5),
    learningPriorities,
    industryReadiness: readiness,
    strongSkills: userSkillsList,
    weakAreas,
    skillDistribution: [
      { name: 'Matched Skills', percentage: matchPercentage },
      { name: 'Skill Gap', percentage: 100 - matchPercentage },
    ],
    recommendations: missingSkillsList.map(
      (skill) => `Implement ${skill} in a real-world repository to demonstrate end-to-end expertise.`
    ),
    roadmap: [
      `Leverage verified strengths in ${userSkillsList.slice(0, 2).join(', ') || 'core languages'} for ${targetRole} projects`,
      `Incorporate key missing requirements (${missingSkillsList.slice(0, 3).join(', ') || 'Docker, CI/CD'}) into portfolio repositories`,
      `Configure automated testing pipelines & deployment links across all active repositories`,
    ],
    recommendedProjects: [
      `Full-stack production app incorporating ${missingSkillsList[0] || 'TypeScript'}`,
      `Microservice API demonstrating clean architecture and testing`,
    ],
    resumeSuggestions: [
      `Highlight practical projects using ${userSkillsList.slice(0, 3).join(', ') || 'your top skills'}`,
      `Quantify impact in repository README descriptions`,
    ],
    chartData: {
      radar: [
        { category: 'Languages', score: Math.min(100, userLanguages.size * 25) },
        { category: 'Docs', score: repos.length ? Math.round((repos.filter((r) => r.hasReadme).length / repos.length) * 100) : 0 },
        { category: 'Deployments', score: repos.length ? Math.round((repos.filter((r) => Boolean(r.deploymentUrl)).length / repos.length) * 100) : 0 },
        { category: 'CI/CD', score: repos.length ? Math.round((repos.filter((r) => r.hasWorkflows).length / repos.length) * 100) : 0 },
        { category: 'Security', score: repos.length ? Math.round((repos.filter((r) => r.hasLicense || r.hasSecurityFile).length / repos.length) * 100) : 0 },
      ],
      bar: [
        ...userSkillsList.map((skill) => {
          const skillLower = skill.toLowerCase();
          const matchingReposCount = repos.filter(
            (r) =>
              r.language?.toLowerCase().includes(skillLower) ||
              r.topics?.some((t) => t.toLowerCase().includes(skillLower)) ||
              r.description?.toLowerCase().includes(skillLower)
          ).length;

          // Dynamic score based on repository usage (range 65% - 95%)
          const calculatedScore = Math.min(
            95,
            Math.max(65, 65 + matchingReposCount * 10)
          );

          return { skill, status: calculatedScore };
        }),
        ...missingSkillsList.map((skill) => ({ skill, status: 0 })),
      ],
      pie: [
        { name: 'Matched Skills', value: userSkillsList.length },
        { name: 'Missing Skills', value: missingSkillsList.length },
      ],
    },
  };
}
