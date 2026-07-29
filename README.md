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
```

---

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
```

---

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

```bash
npm install
```

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