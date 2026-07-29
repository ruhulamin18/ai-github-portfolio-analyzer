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

  // Check user skills against required & optional
  const detectedUserSkills: string[] = [];
  const missingUserSkills: string[] = [];

  const allRoleSkills = [...roleData.required, ...roleData.optional];

  allRoleSkills.forEach((skill) => {
    const skillLower = skill.toLowerCase();
    const hasLang = Array.from(userLanguages).some(
      (l) => l.includes(skillLower) || skillLower.includes(l)
    );
    const hasTopic = Array.from(userTopics).some(
      (t) => t.includes(skillLower) || skillLower.includes(t)
    );

    // Generic heuristic based on repository features
    let matched = hasLang || hasTopic;

    if (!matched) {
      if (skill === 'Git' || skill === 'HTML/CSS') matched = repos.length > 0;
      if (skill === 'REST API' && repos.some((r) => r.description?.toLowerCase().includes('api'))) matched = true;
      if (skill === 'CI/CD Pipelines' || skill === 'GitHub Actions') matched = repos.some((r) => r.hasWorkflows);
      if (skill === 'Cloud Deployment') matched = repos.some((r) => Boolean(r.deploymentUrl));
    }

    if (matched) {
      detectedUserSkills.push(skill);
    } else {
      missingUserSkills.push(skill);
    }
  });

  const totalEvaluated = allRoleSkills.length;
  const matchPercentage = totalEvaluated > 0
    ? Math.round((detectedUserSkills.length / totalEvaluated) * 100)
    : 75;

  const userSkillsList = detectedUserSkills.length > 0 ? detectedUserSkills : ['TypeScript', 'JavaScript', 'React', 'Git'];
  const missingSkillsList = missingUserSkills.length > 0 ? missingUserSkills : ['Docker', 'CI/CD Pipelines', 'Redis'];

  const learningPriorities = missingSkillsList.slice(0, 4).map((skill, index) => ({
    skill,
    priority: index === 0 ? 'High' : index < 2 ? 'Medium' : 'Low',
    estimatedHours: (index + 1) * 8,
    description: `Master ${skill} fundamentals and build a dedicated GitHub project to showcase practical proficiency.`,
  }));

  const readiness = matchPercentage >= 85 ? 'Production Ready' : matchPercentage >= 70 ? 'Industry Ready' : 'Needs Development';

  return {
    targetRole: targetRole as any,
    matchPercentage,
    userSkills: userSkillsList,
    missingSkills: missingSkillsList,
    recommendedTechnologies: missingSkillsList.slice(0, 5),
    learningPriorities,
    industryReadiness: readiness,
    strongSkills: userSkillsList,
    weakAreas: missingSkillsList.slice(0, 3),
    skillDistribution: [
      { name: 'Matched Skills', percentage: matchPercentage },
      { name: 'Skill Gap', percentage: 100 - matchPercentage },
    ],
    recommendations: missingSkillsList.map((skill) => `Implement ${skill} in a real-world repository to demonstrate end-to-end expertise.`),
    roadmap: [
      `Strengthen foundational ${targetRole} technologies`,
      `Incorporate missing tools (${missingSkillsList.slice(0, 2).join(', ')}) into top repos`,
      `Add CI/CD and deployment links to all active projects`,
    ],
    recommendedProjects: [
      `Full-stack production app incorporating ${missingSkillsList[0] || 'TypeScript'}`,
      `Microservice API demonstrating clean architecture and testing`,
    ],
    resumeSuggestions: [
      `Highlight practical projects using ${userSkillsList.slice(0, 3).join(', ')}`,
      `Quantify impact in repository README descriptions`,
    ],
    chartData: {
      radar: [
        { category: 'Languages', score: Math.min(100, userLanguages.size * 25) },
        { category: 'Documentation', score: repos.length ? Math.round((repos.filter((r) => r.hasReadme).length / repos.length) * 100) : 0 },
        { category: 'Deployment', score: repos.length ? Math.round((repos.filter((r) => Boolean(r.deploymentUrl)).length / repos.length) * 100) : 0 },
        { category: 'CI/CD Automation', score: repos.length ? Math.round((repos.filter((r) => r.hasWorkflows).length / repos.length) * 100) : 0 },
        { category: 'Security & Licensing', score: repos.length ? Math.round((repos.filter((r) => r.hasLicense || r.hasSecurityFile).length / repos.length) * 100) : 0 },
      ],
      bar: [
        ...userSkillsList.map((skill) => ({ skill, status: 100 })),
        ...missingSkillsList.map((skill) => ({ skill, status: 0 })),
      ],
      pie: [
        { name: 'Matched Skills', value: userSkillsList.length },
        { name: 'Missing Skills', value: missingSkillsList.length },
      ],
    },
  };
}
