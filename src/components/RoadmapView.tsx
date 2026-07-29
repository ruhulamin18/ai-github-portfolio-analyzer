import React, { useState } from 'react';
import {
  Route,
  CheckCircle2,
  Circle,
  ExternalLink,
  BookOpen,
  Award,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';
import { RoadmapNode } from '../types';

interface RoadmapViewProps {
  role?: string;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  role = 'Full Stack Engineering',
}) => {
  const [nodes, setNodes] = useState<RoadmapNode[]>([
    {
      id: 'r1',
      title: 'Modern React 19 & Architecture',
      category: 'Frontend Core',
      level: 'Beginner',
      completed: true,
      description: 'Master Server Components, React Hooks, Context API, and state management.',
      recommendedResource: 'https://react.dev/learn',
      subtopics: ['Custom Hooks', 'React Server Components', 'Component Modularity', 'Performance Profiling'],
    },
    {
      id: 'r2',
      title: 'TypeScript 5.8 Deep Dive',
      category: 'Language Hygiene',
      level: 'Beginner',
      completed: true,
      description: 'Strict type safety, generics, utility types, and module resolution patterns.',
      recommendedResource: 'https://www.typescriptlang.org/docs/',
      subtopics: ['Generics & Constraints', 'Mapped Types', 'Conditional Types', 'ESM Path Resolution'],
    },
    {
      id: 'r3',
      title: 'Node.js & Express REST Microservices',
      category: 'Backend Core',
      level: 'Intermediate',
      completed: true,
      description: 'Build scalable APIs with JWT auth, rate limiting, and middleware chains.',
      recommendedResource: 'https://expressjs.com/',
      subtopics: ['JWT Authentication', 'Rate Limiting', 'Error Handling Middlewares', 'Input Validation'],
    },
    {
      id: 'r4',
      title: 'PostgreSQL & Drizzle ORM Relational Databases',
      category: 'Database Architecture',
      level: 'Intermediate',
      completed: false,
      description: 'Design normalized SQL schemas, indexes, foreign keys, and migration scripts.',
      recommendedResource: 'https://orm.drizzle.team/',
      subtopics: ['Normalized Schema Design', 'Foreign Key Cascades', 'Indexing Strategies', 'Migrations'],
    },
    {
      id: 'r5',
      title: 'Docker & Multi-Stage Containerization',
      category: 'DevOps & Infra',
      level: 'Intermediate',
      completed: false,
      description: 'Containerize backend Node services and React frontend applications.',
      recommendedResource: 'https://docs.docker.com/',
      subtopics: ['Dockerfiles', 'Docker Compose', 'Multi-Stage Builds', 'Volume Mounts'],
    },
    {
      id: 'r6',
      title: 'GitHub Actions CI/CD Workflows',
      category: 'Automation',
      level: 'Advanced',
      completed: false,
      description: 'Automate testing, linting, Docker image pushes, and Cloud Run deployments.',
      recommendedResource: 'https://docs.github.com/en/actions',
      subtopics: ['Workflow Triggers', 'Matrix Builds', 'Secret Injection', 'Automated Testing'],
    },
    {
      id: 'r7',
      title: 'Kubernetes & Helm Deployment Orchestration',
      category: 'Cloud Native',
      level: 'Advanced',
      completed: false,
      description: 'Manage production clusters, auto-scaling, ingress proxies, and health probes.',
      recommendedResource: 'https://kubernetes.io/docs/',
      subtopics: ['Deployments & Services', 'Ingress Rules', 'Helm Charts', 'Resource Limits'],
    },
  ]);

  const toggleNode = (id: string) => {
    setNodes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, completed: !n.completed } : n))
    );
  };

  const completedCount = nodes.filter((n) => n.completed).length;
  const progressPercent = Math.round((completedCount / nodes.length) * 100);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-[#E8E3D8] rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[#1E1E1E] text-xs font-mono font-bold uppercase tracking-wider">
            <Route className="w-4 h-4 text-[#8B8680]" />
            <span>Interactive Learning Path</span>
          </div>
          <h2 className="text-xl font-extrabold text-[#1E1E1E] mt-1">
            {role} Career Roadmap
          </h2>
          <p className="text-xs text-[#8B8680] font-medium mt-1">
            Personalized step-by-step engineering progression with completion tracking
          </p>
        </div>

        <div className="w-full md:w-64 space-y-2 shrink-0">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-[#8B8680]">Roadmap Completion</span>
            <span className="text-[#1E1E1E] font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-3 bg-[#F5F1E8] rounded-full border border-[#E8E3D8] overflow-hidden">
            <div
              className="h-full bg-[#22C55E] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-[#8B8680] text-right font-medium">{completedCount} of {nodes.length} skills mastered</p>
        </div>
      </div>

      {/* Nodes Vertical Timeline */}
      <div className="space-y-4 relative before:absolute before:left-6 before:top-6 before:bottom-6 before:w-0.5 before:bg-[#E8E3D8]">
        {nodes.map((node, index) => (
          <div
            key={node.id}
            className={`relative pl-14 transition-all ${
              node.completed ? 'opacity-100' : 'opacity-85'
            }`}
          >
            {/* Timeline Circle Button */}
            <button
              onClick={() => toggleNode(node.id)}
              className={`absolute left-3.5 top-5 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                node.completed
                  ? 'bg-[#22C55E] border-[#22C55E] text-white font-bold shadow-xs'
                  : 'bg-white border-[#E8E3D8] text-[#8B8680] hover:border-[#F2C879]'
              }`}
            >
              {node.completed ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Circle className="w-3 h-3" />}
            </button>

            <div className="bg-white border border-[#E8E3D8] hover:border-[#F2C879] rounded-3xl p-5 space-y-3 shadow-xs">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-[#1E1E1E] bg-[#F2C879]/30 px-2 py-0.5 rounded-lg border border-[#F2C879]">
                      Step {index + 1}
                    </span>
                    <span className="text-xs text-[#8B8680] font-bold">[{node.category}]</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-lg font-mono font-bold ${
                        node.level === 'Beginner'
                          ? 'bg-[#22C55E]/10 text-[#15803D] border border-[#22C55E]/20'
                          : node.level === 'Intermediate'
                          ? 'bg-[#F2C879]/30 text-[#B45309] border border-[#F2C879]'
                          : 'bg-[#1A1A1A] text-white'
                      }`}
                    >
                      {node.level}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-[#1E1E1E] mt-1.5 flex items-center gap-2">
                    <span>{node.title}</span>
                  </h3>
                </div>

                <button
                  onClick={() => toggleNode(node.id)}
                  className={`px-3 py-1.5 text-xs rounded-xl font-bold transition-colors cursor-pointer ${
                    node.completed
                      ? 'bg-[#22C55E]/10 text-[#15803D] border border-[#22C55E]/20'
                      : 'bg-[#F5F1E8] hover:bg-[#E8E3D8] text-[#1E1E1E]'
                  }`}
                >
                  {node.completed ? 'Completed ✓' : 'Mark as Done'}
                </button>
              </div>

              <p className="text-xs text-[#1E1E1E] font-medium leading-relaxed">{node.description}</p>

              {/* Subtopics Checklist */}
              <div className="pt-2">
                <div className="text-[11px] font-bold text-[#8B8680] uppercase tracking-wider mb-2">Key Subtopics to Master:</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {node.subtopics.map((sub) => (
                    <div
                      key={sub}
                      className="bg-[#F5F1E8] px-2.5 py-1.5 rounded-xl border border-[#E8E3D8] text-[#1E1E1E] font-semibold flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F2C879]"></span>
                      <span className="line-clamp-1">{sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resource Link */}
              <div className="pt-2 border-t border-[#E8E3D8] flex items-center justify-between text-xs">
                <span className="text-[#8B8680] font-medium">Official Docs / Course:</span>
                <a
                  href={node.recommendedResource}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#1E1E1E] hover:underline flex items-center gap-1 font-bold"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Learning Material</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
