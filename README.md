# AI GitHub Portfolio Analyzer ⚡

An enterprise-grade, full-stack AI platform designed to evaluate GitHub profiles, audit repository code quality, analyze documentation completeness, detect skill gaps for target software engineering roles, match resumes against public GitHub codebases, and generate career roadmaps powered by **Google Gemini 2.5 Flash Architecture**.

---

## 🌟 Project Overview

The **AI GitHub Portfolio Analyzer** serves as an intelligent technical auditor and career guidance platform for software engineers, engineering managers, and technical recruiters. By integrating directly with the GitHub API and Google Gemini 2.5 Flash, it performs real-time static code analysis, evaluates repository health metrics, checks license compliance, and provides actionable career growth suggestions.

---

## ✨ Key Features

1. **Real-time GitHub Profile & Repository Evaluation**
   - Live GitHub REST API integration with rate-limit handling and optional OAuth token authentication.
   - Comprehensive profile scoring across activity, star counts, fork ratios, and commit streaks.

2. **Repository Health & Quality Audit**
   - Automated 6-pillar repository health scoring:
     - **README Quality** (structure, badges, usage examples, installation instructions)
     - **Documentation Score** (descriptions, topics, API specs)
     - **Deployment Status** (live production URLs, vercel/netlify/cloud run detection)
     - **License Compliance** (open-source OSI license checking)
     - **Security & Secret Scanning** (`SECURITY.md`, `.gitignore`, dependency audit)
     - **CI/CD Automation** (GitHub Actions workflows detection)

3. **Google Gemini 2.5 Flash Code Analysis**
   - Automated portfolio report generating technical strengths, critical fixes, and structural recommendations.
   - Deep inspection of individual repositories with custom README scorecards.

4. **Interactive Skill Gap & Target Role Alignment**
   - Evaluates current codebase languages and frameworks against target career roles (e.g., Full Stack, Frontend, Backend, ML Engineer, DevOps).
   - Generates priority learning roadmaps with estimated study hours.

5. **AI Resume & Portfolio Matcher**
   - Compares raw resume text against public GitHub repos to identify matching skills, inconsistencies, and recommended missing portfolio projects.

6. **Interactive Career Guidance & Certification Roadmap**
   - Role recommendations based on real repository tech stack analysis.
   - Suggested open-source projects to contribute to based on primary languages.

7. **PDF & Executive Report Exporter**
   - One-click PDF generation capturing complete portfolio scorecards and AI insights.

---

## 🏗️ Enterprise Architecture

The application follows a clean 3-tier full-stack architecture built with React, TypeScript, Express, and Google Gemini:

```
┌─────────────────────────────────────────────────────────┐
│                   React 19 Frontend                     │
│  (Tailwind CSS, Lucide Icons, Recharts, Motion)          │
└────────────────────────────┬────────────────────────────┘
                             │
                      REST API Layer
                             │
┌────────────────────────────▼────────────────────────────┐
│                  Express Node.js Server                 │
│  (GitHub REST API Client, Gemini 2.5 Flash SDK Integration)│
└────────────────────────────┬────────────────────────────┘
                             │
               ┌─────────────┴─────────────┐
               │                           │
┌──────────────▼───────────┐  ┌────────────▼────────────┐
│      GitHub API v3       │  │  Google Gemini 2.5 API │
└──────────────────────────┘  └─────────────────────────┘
```

---

## 📁 Modular Folder Structure

```
src/
├── api/                   # Dedicated HTTP API clients
│   ├── client.ts          # Base fetch client with error handling
│   ├── githubApi.ts       # GitHub profile & repository endpoints
│   └── portfolioApi.ts    # AI analysis, skill-gap & resume matching APIs
├── services/              # Business logic layer
│   ├── githubService.ts
│   ├── repositoryService.ts
│   ├── statisticsService.ts
│   ├── portfolioService.ts
│   └── geminiService.ts
├── hooks/                 # Reusable React custom hooks
│   ├── useGithubProfile.ts
│   ├── useAIAnalysis.ts
│   └── useResumeAnalysis.ts
├── utils/                 # Pure helper functions
│   ├── dateUtils.ts       # Relative time and date formatters
│   ├── formatNumber.ts    # Compact number formatters
│   ├── languageParser.ts  # Language distribution & color mapping
│   ├── repositoryAnalyzer.ts # Real repository audit algorithms
│   └── scoreCalculator.ts # Repository health & pillar formulas
├── components/            # Reusable UI components
│   ├── common/            # Shared primitives (ErrorBoundary, Skeleton, Retry)
│   ├── dashboard/         # Dashboard modular subcomponents
│   │   ├── DashboardHero.tsx
│   │   ├── StatisticsCards.tsx
│   │   ├── RepositoryHealthCard.tsx
│   │   ├── TechnologyStackCard.tsx
│   │   ├── ContributionHeatmap.tsx
│   │   ├── AIInsightsCard.tsx
│   │   ├── RepositoryGrid.tsx
│   │   └── QuickActions.tsx
│   ├── Navbar.tsx
│   ├── Sidebar.tsx
│   ├── Footer.tsx
│   ├── DashboardView.tsx
│   ├── RepoAnalysisView.tsx
│   ├── AIPortfolioView.tsx
│   ├── SkillGapView.tsx
│   ├── ResumeMatchView.tsx
│   ├── RoadmapView.tsx
│   ├── CareerGuidanceView.tsx
│   ├── ReportExportView.tsx
│   └── AdminPanelView.tsx
├── server/                # Backend services & controllers
│   ├── gemini.ts          # Gemini 2.5 Flash SDK prompt handlers
│   └── mockData.ts        # Fallback dataset for sandbox offline testing
├── types.ts               # Shared TypeScript data models
├── App.tsx                # Main Application Entry Component
└── main.tsx               # DOM Mount Point
```

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React Icons, Recharts, Motion
- **Backend**: Express v4, Node.js, `tsx` runner, `esbuild` CommonJS bundler
- **AI Integration**: `@google/genai` TypeScript SDK (Gemini 2.5 Flash)
- **Export Capabilities**: `jspdf`, `html2canvas`

---

## ⚙️ Installation & Development Setup

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Step 1: Clone Repository
```bash
git clone https://github.com/ruhulamin18/ai-github-portfolio-analyzer.git
cd ai-github-portfolio-analyzer
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a `.env` file in the project root:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
PORT=3000
```

### Step 4: Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 🔑 Environment Variables

| Variable | Description | Required |
| --- | --- | --- |
| `GEMINI_API_KEY` | Google Gemini API key for real-time portfolio analysis | Yes |
| `PORT` | Application server port (default: `3000`) | Optional |

---

## 📡 API Overview

### `GET /api/github/profile/:username`
Fetches profile information, repositories, language breakdown, contribution heatmaps, and calculated portfolio scores from the GitHub API.

### `POST /api/analyze/portfolio`
Sends profile and repository metadata to Google Gemini 2.5 Flash for continuous code quality and documentation analysis.

### `POST /api/analyze/skill-gap`
Analyzes current repository language distributions against a target software engineering role.

### `POST /api/analyze/resume-match`
Compares raw text from a software engineering resume against GitHub code repos to detect matching skills and inconsistencies.

### `POST /api/career`
Generates career role recommendations, suggested open-source repositories to contribute to, and industry certifications.

---

## 🔮 Future Improvements

- [ ] GitHub OAuth App integration for private repository analysis
- [ ] Automated Pull Request quality auditor GitHub Action
- [ ] Team & Organization aggregate analytics dashboard
- [ ] AI-assisted automated README.md generator

---

## 📄 License

This project is open-source under the **MIT License**.

---

## 👨‍💻 Author 
Md. Ruhul Amin

Engineering Student
Department of Computer Science and Engineering
Daffodil International University

GitHub: https://github.com/ruhulamin18
LinkedIn: www.linkedin.com/in/md-ruhul-amin-r018