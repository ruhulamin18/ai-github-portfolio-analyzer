<<<<<<< HEAD
# 🚀 AI GitHub Portfolio Analyzer

> **An AI-powered GitHub portfolio analysis platform that evaluates developer profiles, analyzes repository quality, detects skill gaps, matches resumes with GitHub projects, and generates personalized career insights using Google Gemini 2.5 Flash.**

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss)
![Gemini AI](https://img.shields.io/badge/Google-Gemini%202.5%20Flash-4285F4?logo=google)

---

# 📖 Overview

AI GitHub Portfolio Analyzer is a modern full-stack web application that helps developers evaluate the quality of their GitHub portfolio using real repository data and AI-powered insights.

The platform analyzes GitHub repositories, documentation quality, project health, programming languages, development activity, and overall portfolio strength. It then generates personalized recommendations, skill gap analysis, resume matching, and career guidance using **Google Gemini 2.5 Flash**.

Whether you're preparing for internships, software engineering jobs, or improving your open-source portfolio, this application provides meaningful insights to help you grow.

---

# ✨ Key Features

## 📊 GitHub Portfolio Dashboard

- Analyze any public GitHub profile
- Overall GitHub Score (0–100)
- Repository statistics
- Programming language distribution
- Contribution heatmap
- Top repositories
- GitHub activity overview

---

## 🤖 AI Portfolio Analysis

Powered by **Google Gemini 2.5 Flash**

Generate intelligent reports including:

- Portfolio strengths
- Weaknesses
- Improvement suggestions
- Code quality feedback
- Career recommendations
- Personalized developer insights

---

## 📈 Repository Health Analysis

Evaluate every repository using multiple quality metrics.

Includes:

- README Quality
- Documentation Score
- Deployment Status
- Security Score
- License Compliance
- CI/CD Detection
- Repository Quality

---

## 🎯 Skill Gap Analyzer

Compare your GitHub portfolio against industry job roles.

Supported Roles

- Frontend Developer
- Backend Developer
- Full Stack Developer
- DevOps Engineer
- Machine Learning Engineer
- Data Scientist

The analyzer provides

- Skill Match Score
- Missing Skills
- Industry Readiness
- Learning Roadmap
- Recommended Projects
- Priority Learning Areas

---

## 📄 Resume Match Analyzer

Compare your resume with your GitHub portfolio.

Detects

- Missing Skills
- Missing Projects
- Resume Consistency
- ATS Readiness
- Portfolio Alignment

---

## 🛣 Career Guidance

Receive AI-generated career recommendations based on your GitHub profile.

Includes

- Career Path Suggestions
- Learning Roadmaps
- Certification Recommendations
- Open Source Contribution Suggestions
- Industry Preparation Tips

---

## 📊 Overall GitHub Score

The application evaluates GitHub portfolios using an **11-metric weighted scoring model**.

| Metric | Weight |
|---------|--------|
| Repository Quality | 15% |
| README Quality | 15% |
| Documentation Score | 10% |
| Deployment Status | 10% |
| Code Quality | 10% |
| GitHub Activity | 10% |
| Language Diversity | 10% |
| CI/CD Status | 5% |
| Security Score | 5% |
| License Compliance | 5% |
| Open Source Contribution | 5% |

### Performance Levels

| Score | Level |
|--------|------------------|
| 90–100 | Outstanding |
| 80–89 | Excellent |
| 70–79 | Very Good |
| 60–69 | Good |
| 50–59 | Fair |
| Below 50 | Needs Improvement |

---

# 🏗 Architecture

```
                 React + TypeScript
                        │
                        ▼
                Express Backend API
                        │
        ┌───────────────┴───────────────┐
        │                               │
        ▼                               ▼
 GitHub REST API              Google Gemini 2.5 Flash
=======
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
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
```

---

<<<<<<< HEAD
# 🛠 Technology Stack

### Frontend

- React 19
- TypeScript
- Tailwind CSS v4
- Recharts
- Lucide React
- Motion

### Backend

- Node.js
- Express.js

### AI

- Google Gemini 2.5 Flash

### APIs

- GitHub REST API

### Export

- jsPDF
- html2canvas

---

# 📂 Project Structure

```
src/
│
├── api/
├── components/
├── hooks/
├── services/
├── server/
├── utils/
├── types/
├── App.tsx
└── main.tsx
=======
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
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
```

---

<<<<<<< HEAD
# ⚙ Installation

Clone the repository

```bash
git clone https://github.com/ruhulamin18/ai-github-portfolio-analyzer.git
```

Move into the project

```bash
cd ai-github-portfolio-analyzer
```

Install dependencies

=======
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
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
```bash
npm install
```

<<<<<<< HEAD
Create a `.env` file

```env
GEMINI_API_KEY=your_google_gemini_api_key
PORT=3000
```

Start the development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| GEMINI_API_KEY | Google Gemini API Key |
| PORT | Express Server Port |

---

# 📸 Screenshots

> Add application screenshots here.

- Dashboard
- Repository Analysis
- AI Portfolio Report
- Skill Gap Analysis
- Resume Match
- Career Guidance

---

# 🚀 Future Improvements

- GitHub OAuth Login
- Private Repository Analysis
- Dark Mode
- Team Dashboard
- Organization Analytics
- AI README Generator
- AI Project Recommendations
- Multi-language Support

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new feature branch
3. Commit your changes
4. Push the branch
5. Open a Pull Request

---

# 📄 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

## Md. Ruhul Amin

**Frontend Developer | Software Engineering Student**

🎓 **Bachelor of Science in Computer Science & Engineering**  
🏛 **Daffodil International University**

### Connect with Me

- 💻 **GitHub:** https://github.com/ruhulamin18
- 💼 **LinkedIn:** https://www.linkedin.com/in/md-ruhul-amin-r018
- 🌐 **Portfolio:** https://mdruhulamin18.vercel.app
---

# ⭐ Support

If you found this project helpful, please consider giving it a **Star ⭐** on GitHub.
=======
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
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
