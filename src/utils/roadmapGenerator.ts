import { GitHubProfile, Repository, SkillGapAnalysis, RoadmapNode } from '../types';

export function generatePersonalizedRoadmapNodes(
  profile?: GitHubProfile | null,
  repos: Repository[] = [],
  skillGap?: SkillGapAnalysis | null,
  targetRole: string = 'Full Stack Developer'
): RoadmapNode[] {
  const username = profile?.username || 'developer';
  const userLangs = new Set<string>();
  const userTopics = new Set<string>();

  repos.forEach((r) => {
    if (r.language) userLangs.add(r.language);
    (r.topics || []).forEach((t) => userTopics.add(t));
  });

  const userSkillsList = (skillGap?.userSkills || []).map((s) => s.toLowerCase());
  const missingSkillsList = (skillGap?.missingSkills || []).map((s) => s.toLowerCase());

  const hasSkill = (keywords: string[]): boolean => {
    return keywords.some((kw) => {
      const lower = kw.toLowerCase();
      if (userSkillsList.some((s) => s.includes(lower) || lower.includes(s))) return true;
      if (Array.from(userLangs).some((l) => l.toLowerCase().includes(lower) || lower.includes(l.toLowerCase()))) return true;
      if (Array.from(userTopics).some((t) => t.toLowerCase().includes(lower) || lower.includes(t.toLowerCase()))) return true;
      return false;
    });
  };

  const isMissingSkill = (keywords: string[]): boolean => {
    return keywords.some((kw) => {
      const lower = kw.toLowerCase();
      return missingSkillsList.some((m) => m.includes(lower) || lower.includes(m));
    });
  };

  const primaryLang = Array.from(userLangs)[0] || 'TypeScript';
  const roleLower = targetRole.toLowerCase();

  // 1. FRONTEND ROLE ROADMAP
  if (roleLower.includes('frontend') || roleLower.includes('ui/ux')) {
    return [
      {
        id: 'fe-1',
        title: 'HTML5, CSS3 & Responsive Design Fundamentals',
        category: 'Core Layout',
        level: 'Beginner',
        completed: hasSkill(['html', 'css', 'responsive', 'tailwind']),
        description: `Master semantic markup, Flexbox/Grid layouts, and responsive CSS standards for client interfaces.`,
        recommendedResource: 'https://developer.mozilla.org/en-US/docs/Learn',
        subtopics: ['Flexbox & Grid Layouts', 'Responsive Media Queries', 'Accessibility (a11y)', 'CSS Variables'],
      },
      {
        id: 'fe-2',
        title: 'Modern JavaScript (ES6+) & Async Programming',
        category: 'Language Core',
        level: 'Beginner',
        completed: hasSkill(['javascript', 'es6', 'js']),
        description: `Asynchronous ES6 execution, Promise handling, Fetch API, and DOM manipulation patterns.`,
        recommendedResource: 'https://javascript.info/',
        subtopics: ['Promises & Async/Await', 'Event Loop & DOM', 'ES6 Modules', 'Functional Array Methods'],
      },
      {
        id: 'fe-3',
        title: 'TypeScript Type Safety & Module Architecture',
        category: 'Type Systems',
        level: 'Intermediate',
        completed: hasSkill(['typescript']),
        description: `Strict type definitions, interface contracts, and generics integration for @${username}'s web projects.`,
        recommendedResource: 'https://www.typescriptlang.org/docs/',
        subtopics: ['Interfaces vs Types', 'Generics & Utility Types', 'Strict Null Checks', 'TSConfig Optimization'],
      },
      {
        id: 'fe-4',
        title: 'React / Modern UI Component Frameworks',
        category: 'UI Framework',
        level: 'Intermediate',
        completed: hasSkill(['react', 'vue', 'svelte', 'angular', 'next.js']),
        description: `Component lifecycles, custom hooks, state management, and virtual DOM rendering optimization.`,
        recommendedResource: 'https://react.dev/learn',
        subtopics: ['Custom React Hooks', 'Context & State Management', 'Memoization & Re-renders', 'Component Composition'],
      },
      {
        id: 'fe-5',
        title: 'Tailwind CSS & Component Styling Systems',
        category: 'Styling Architecture',
        level: 'Intermediate',
        completed: hasSkill(['tailwind', 'sass', 'styled-components']),
        description: `Utility-first CSS styling, theme customization, and modular design token structures.`,
        recommendedResource: 'https://tailwindcss.com/docs',
        subtopics: ['Utility-First Workflows', 'Theme Extensions', 'Responsive Prefixes', 'Component Styling'],
      },
      {
        id: 'fe-6',
        title: 'Frontend Unit Testing & Web Performance',
        category: 'Quality & Speed',
        level: 'Advanced',
        completed: hasSkill(['vitest', 'jest', 'cypress', 'testing', 'performance']),
        description: `Unit testing UI components with Vitest/Testing Library and optimizing Lighthouse Core Web Vitals.`,
        recommendedResource: 'https://testing-library.com/',
        subtopics: ['Component Unit Tests', 'Lighthouse Web Vitals', 'Code Splitting & Lazy Loading', 'E2E Testing'],
      },
      {
        id: 'fe-7',
        title: 'Automated CI/CD & Production CDN Hosting',
        category: 'Deployment',
        level: 'Advanced',
        completed: repos.some((r) => Boolean(r.deploymentUrl)),
        description: `Automated GitHub Actions workflow for building and deploying static web apps to Vercel or Cloud Run.`,
        recommendedResource: 'https://docs.github.com/en/actions',
        subtopics: ['GitHub Actions Workflows', 'Production Build Bundle', 'CDN Asset Caching', 'Environment Injection'],
      },
    ];
  }

  // 2. BACKEND ROLE ROADMAP
  if (roleLower.includes('backend') || roleLower.includes('api systems')) {
    return [
      {
        id: 'be-1',
        title: `${primaryLang} Language Engine & Async I/O`,
        category: 'Runtime Core',
        level: 'Beginner',
        completed: hasSkill([primaryLang, 'node.js', 'python', 'java', 'go', 'php', 'c#', 'ruby', 'c++']),
        description: `Execution semantics, memory allocation, and package management in ${primaryLang}.`,
        recommendedResource: `https://devdocs.io/${primaryLang.toLowerCase()}/`,
        subtopics: ['Async Processing', 'Package Management', 'Error Handling Paradigms', 'Modular Design'],
      },
      {
        id: 'be-2',
        title: 'RESTful API Architecture & Request Middlewares',
        category: 'API Engineering',
        level: 'Intermediate',
        completed: hasSkill(['rest api', 'express', 'fastapi', 'flask', 'django', 'spring', 'gin', 'nest']),
        description: `Designing idempotent REST HTTP endpoints, payload validation, and request middleware pipelines.`,
        recommendedResource: 'https://expressjs.com/',
        subtopics: ['HTTP Verbs & Status Codes', 'Request Payload Validation', 'Middleware Chains', 'CORS & Security Headers'],
      },
      {
        id: 'be-3',
        title: 'Relational Database Schema & SQL Query Tuning',
        category: 'Persistence Layer',
        level: 'Intermediate',
        completed: hasSkill(['sql', 'postgresql', 'mysql', 'database', 'sqlite', 'orm', 'drizzle']),
        description: `Designing normalized 3NF relational schemas, foreign key indexes, and migration scripts.`,
        recommendedResource: 'https://www.postgresql.org/docs/',
        subtopics: ['ACID Transactions', 'Foreign Key Constraints', 'Index Tuning (B-Tree)', 'Database Migrations'],
      },
      {
        id: 'be-4',
        title: 'User Authentication & Authorization Protocols',
        category: 'Security Engine',
        level: 'Intermediate',
        completed: hasSkill(['authentication', 'jwt', 'oauth', 'password', 'bcrypt', 'security']),
        description: `Implementing stateless JWT tokens, OAuth2 authorization flows, and bcrypt password hashing.`,
        recommendedResource: 'https://jwt.io/',
        subtopics: ['JWT Access & Refresh Tokens', 'OAuth2 Authorizations', 'Role-Based Access Control (RBAC)', 'CSRF & XSS Protection'],
      },
      {
        id: 'be-5',
        title: 'Caching & NoSQL In-Memory Data Stores',
        category: 'Performance Storage',
        level: 'Advanced',
        completed: hasSkill(['redis', 'mongodb', 'nosql', 'memcached']),
        description: `In-memory key-value caching layer with Redis to mitigate database query bottlenecks in @${username}'s APIs.`,
        recommendedResource: 'https://redis.io/docs/',
        subtopics: ['Redis Key TTL & Expiration', 'Cache Invalidation Strategies', 'NoSQL Document Indexing', 'Session Caching'],
      },
      {
        id: 'be-6',
        title: 'Docker Multi-Stage Containerization',
        category: 'Infrastructure',
        level: 'Advanced',
        completed: hasSkill(['docker', 'containerization']),
        description: `Containerizing ${primaryLang} backend services with multi-stage Dockerfiles and Docker Compose networking.`,
        recommendedResource: 'https://docs.docker.com/',
        subtopics: ['Multi-Stage Dockerfiles', 'Environment Variable Injection', 'Docker Compose Networking', 'Volume Persistence'],
      },
      {
        id: 'be-7',
        title: 'Continuous Integration & Production Deployment',
        category: 'Automation',
        level: 'Advanced',
        completed: repos.some((r) => r.hasWorkflows || Boolean(r.deploymentUrl)),
        description: `Building automated test runner pipelines and continuous delivery workflows for backend microservices.`,
        recommendedResource: 'https://docs.github.com/en/actions',
        subtopics: ['API Integration Testing', 'GitHub Actions CI/CD', 'Automated Health Checks', 'Cloud Container Deployment'],
      },
    ];
  }

  // 3. DEVOPS ROLE ROADMAP
  if (roleLower.includes('devops') || roleLower.includes('infrastructure')) {
    return [
      {
        id: 'do-1',
        title: 'Linux Systems Administration & Bash Scripting',
        category: 'OS Fundamentals',
        level: 'Beginner',
        completed: hasSkill(['linux', 'shell', 'bash', 'c']),
        description: `Command line proficiency, process monitoring, file permissions, and automated shell scripts.`,
        recommendedResource: 'https://www.linux.org/',
        subtopics: ['Shell Automation Scripts', 'File System Permissions', 'Process & Network Diagnostics', 'SSH Key Authentication'],
      },
      {
        id: 'do-2',
        title: 'Git Version Control & Repository Governance',
        category: 'Source Control',
        level: 'Beginner',
        completed: repos.length > 0,
        description: `Branching strategies, pull request reviews, tag releases, and commit message hygiene across @${username}'s repositories.`,
        recommendedResource: 'https://git-scm.com/doc',
        subtopics: ['Git Rebase & Merge', 'Branch Protection Rules', 'Semantic Versioning Tags', 'Conventional Commits'],
      },
      {
        id: 'do-3',
        title: 'Docker Container Architecture & Multi-Stage Builds',
        category: 'Containerization',
        level: 'Intermediate',
        completed: hasSkill(['docker', 'containerization']),
        description: `Creating slim, multi-stage Docker images for web runtimes and managing local multi-container environments.`,
        recommendedResource: 'https://docs.docker.com/',
        subtopics: ['Multi-Stage Dockerfiles', 'Layer Caching Optimization', 'Docker Compose Networks', 'Non-Root Security Contexts'],
      },
      {
        id: 'do-4',
        title: 'GitHub Actions & CI/CD Pipeline Automation',
        category: 'Automation',
        level: 'Intermediate',
        completed: repos.some((r) => r.hasWorkflows),
        description: `Designing automated CI build matrix workflows, unit testing, and automated release tags.`,
        recommendedResource: 'https://docs.github.com/en/actions',
        subtopics: ['Workflow YAML Triggers', 'Build Matrix Runs', 'Encrypted Secret Injection', 'Artifact Storage'],
      },
      {
        id: 'do-5',
        title: 'Cloud Infrastructure & PaaS/IaaS Deployment',
        category: 'Cloud Hosting',
        level: 'Advanced',
        completed: repos.some((r) => Boolean(r.deploymentUrl)),
        description: `Deploying containerized microservices to cloud platforms like GCP Cloud Run, AWS App Runner, or Kubernetes.`,
        recommendedResource: 'https://cloud.google.com/run/docs',
        subtopics: ['Cloud Container Services', 'Domain SSL & DNS Setup', 'Load Balancing & Ingress', 'Auto-scaling Policies'],
      },
      {
        id: 'do-6',
        title: 'Infrastructure as Code (IaC) with Terraform',
        category: 'Cloud Automation',
        level: 'Advanced',
        completed: hasSkill(['terraform', 'ansible']),
        description: `Declarative cloud infrastructure provisioning, state file management, and resource dependency graphs.`,
        recommendedResource: 'https://developer.hashicorp.com/terraform',
        subtopics: ['Declarative HCL Syntax', 'Remote State Locks', 'Terraform Modules', 'Resource Provisioning'],
      },
      {
        id: 'do-7',
        title: 'Kubernetes Cluster Orchestration & Helm Charts',
        category: 'Cloud Native',
        level: 'Advanced',
        completed: hasSkill(['kubernetes', 'k8s', 'helm']),
        description: `Managing production Kubernetes clusters, deployments, services, ingress routing, and health probes.`,
        recommendedResource: 'https://kubernetes.io/docs/',
        subtopics: ['Deployments & Pods', 'Service & Ingress Rules', 'Helm Package Management', 'ConfigMaps & Secrets'],
      },
    ];
  }

  // 4. AI / ML ENGINEER ROADMAP
  if (roleLower.includes('ml') || roleLower.includes('machine learning') || roleLower.includes('ai')) {
    return [
      {
        id: 'ml-1',
        title: 'Python Core & Numerical Computing (NumPy/Pandas)',
        category: 'Data Core',
        level: 'Beginner',
        completed: hasSkill(['python', 'pandas', 'numpy', 'jupyter']),
        description: `Efficient vector math, array broadcasting, and structured data processing in Python.`,
        recommendedResource: 'https://pandas.pydata.org/docs/',
        subtopics: ['NumPy Ndarrays & Vectorization', 'Pandas DataFrames & Indexing', 'Data Cleaning & Imputation', 'Memory Efficient Operations'],
      },
      {
        id: 'ml-2',
        title: 'Data Preprocessing & Exploratory Visualization',
        category: 'Data Analytics',
        level: 'Beginner',
        completed: hasSkill(['data preprocessing', 'data visualization', 'matplotlib', 'seaborn']),
        description: `Exploratory Data Analysis (EDA), feature scaling, categorical encoding, and distribution plotting.`,
        recommendedResource: 'https://seaborn.pydata.org/',
        subtopics: ['Feature Scaling & Normalization', 'One-Hot & Target Encoding', 'Matplotlib & Seaborn Plots', 'Correlation Analysis'],
      },
      {
        id: 'ml-3',
        title: 'Classical Machine Learning with Scikit-Learn',
        category: 'ML Modeling',
        level: 'Intermediate',
        completed: hasSkill(['scikit-learn', 'machine learning', 'algorithms']),
        description: `Supervised & unsupervised model training (Regression, Decision Trees, Random Forests, XGBoost).`,
        recommendedResource: 'https://scikit-learn.org/stable/',
        subtopics: ['Regression & Classification', 'Cross-Validation & GridSearch', 'Random Forests & Gradient Boosting', 'Model Evaluation Metrics'],
      },
      {
        id: 'ml-4',
        title: 'Deep Learning Architectures (PyTorch / TensorFlow)',
        category: 'Deep Learning',
        level: 'Intermediate',
        completed: hasSkill(['pytorch', 'tensorflow', 'neural networks', 'deep learning']),
        description: `Building neural networks, backpropagation, CNNs for computer vision, and Transformer architectures.`,
        recommendedResource: 'https://pytorch.org/tutorials/',
        subtopics: ['Tensors & Autograd', 'Convolutional Neural Networks', 'Recurrent & Transformer Models', 'Transfer Learning'],
      },
      {
        id: 'ml-5',
        title: 'FastAPI Model Serving & Inference Endpoints',
        category: 'Model Deployment',
        level: 'Advanced',
        completed: hasSkill(['fastapi', 'rest api', 'flask', 'api']),
        description: `Exposing trained ML model weights behind high-throughput REST inference endpoints using FastAPI.`,
        recommendedResource: 'https://fastapi.tiangolo.com/',
        subtopics: ['Asynchronous Model Inference', 'Pydantic Input Schemas', 'Batch Prediction Pipelines', 'Latency Optimization'],
      },
      {
        id: 'ml-6',
        title: 'Docker Containerization & MLOps Pipelines',
        category: 'MLOps',
        level: 'Advanced',
        completed: hasSkill(['docker', 'mlops', 'mlflow']),
        description: `Packaging ML training environments, model artifact versioning with MLflow, and reproducible container runs.`,
        recommendedResource: 'https://mlflow.org/docs/latest/index.html',
        subtopics: ['Reproducible Docker Envs', 'Model Registry & Versioning', 'Experiment Tracking', 'GPU Container Acceleration'],
      },
      {
        id: 'ml-7',
        title: 'Automated CI/CD for Model Retraining & Monitoring',
        category: 'Production AI',
        level: 'Advanced',
        completed: repos.some((r) => r.hasWorkflows || Boolean(r.deploymentUrl)),
        description: `Deploying automated retraining pipelines, data drift detection, and cloud inference hosting.`,
        recommendedResource: 'https://docs.github.com/en/actions',
        subtopics: ['Data & Concept Drift Monitoring', 'Continuous Model Retraining', 'Cloud Run Inference Hosting', 'A/B Testing Pipelines'],
      },
    ];
  }

  // 5. DEFAULT FULL STACK ROADMAP (Tailored to user's languages and profile)
  return [
    {
      id: 'fs-1',
      title: 'Modern Client Component Architecture (React / TypeScript)',
      category: 'Frontend Core',
      level: 'Beginner',
      completed: hasSkill(['react', 'typescript', 'javascript', 'html', 'css']),
      description: `Building modular, responsive UI components with clean state management and strict TypeScript types.`,
      recommendedResource: 'https://react.dev/learn',
      subtopics: ['Component Modularity', 'Custom Hooks & State', 'TypeScript Interface Contracts', 'Tailwind CSS Layouts'],
    },
    {
      id: 'fs-2',
      title: 'Type Safety & Module Resolution Patterns',
      category: 'Type Systems',
      level: 'Beginner',
      completed: hasSkill(['typescript']),
      description: `Strict typing across client and server modules for @${username}'s full-stack codebase.`,
      recommendedResource: 'https://www.typescriptlang.org/docs/',
      subtopics: ['Generics & Utility Types', 'Conditional Types', 'Module Resolution', 'Strict Compiler Options'],
    },
    {
      id: 'fs-3',
      title: `Server API Microservices (${primaryLang} & Express/REST)`,
      category: 'Backend Core',
      level: 'Intermediate',
      completed: hasSkill(['node.js', 'express', 'rest api', 'python', 'fastapi', 'java', 'backend']),
      description: `Building scalable RESTful API services with token authentication, validation, and error middlewares.`,
      recommendedResource: 'https://expressjs.com/',
      subtopics: ['REST Endpoint Design', 'JWT Authentication', 'Rate Limiting & Validation', 'Error Handling Middlewares'],
    },
    {
      id: 'fs-4',
      title: 'Relational & NoSQL Database Architecture',
      category: 'Database Layer',
      level: 'Intermediate',
      completed: hasSkill(['sql', 'postgresql', 'mysql', 'mongodb', 'drizzle', 'orm']),
      description: `Designing normalized database schemas, foreign key relationships, indexes, and ORM migrations.`,
      recommendedResource: 'https://orm.drizzle.team/',
      subtopics: ['Normalized Schema Design', 'Foreign Keys & Cascades', 'Indexing Strategies', 'Database Migrations'],
    },
    {
      id: 'fs-5',
      title: 'Docker & Multi-Stage Microservice Containerization',
      category: 'DevOps & Infra',
      level: 'Intermediate',
      completed: hasSkill(['docker', 'containerization']),
      description: `Containerizing client apps and backend microservices with multi-stage Dockerfiles and Docker Compose.`,
      recommendedResource: 'https://docs.docker.com/',
      subtopics: ['Multi-Stage Builds', 'Docker Compose Services', 'Environment Injection', 'Volume Mounts'],
    },
    {
      id: 'fs-6',
      title: 'GitHub Actions Automated CI/CD Pipelines',
      category: 'Automation',
      level: 'Advanced',
      completed: repos.some((r) => r.hasWorkflows),
      description: `Automating test execution, code quality linting, Docker image pushes, and Cloud Run deployments.`,
      recommendedResource: 'https://docs.github.com/en/actions',
      subtopics: ['Workflow YAML Triggers', 'Build Matrix Execution', 'Secret Injection', 'Automated Health Checks'],
    },
    {
      id: 'fs-7',
      title: 'Cloud Run / Production Hosting & Monitoring',
      category: 'Cloud Hosting',
      level: 'Advanced',
      completed: repos.some((r) => Boolean(r.deploymentUrl)),
      description: `Deploying live full-stack web applications with SSL certificates, environment security, and monitoring.`,
      recommendedResource: 'https://cloud.google.com/run',
      subtopics: ['Production Environment Variables', 'Domain SSL Setup', 'CDN Caching', 'Live Health Monitoring'],
    },
  ];
}
