import React, { useState } from 'react';
import {
  FileDown,
  Printer,
  Copy,
  Check,
  Award,
  Sparkles,
  BookOpen,
  Share2,
  Download,
  Loader2,
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { GitHubProfile, Repository, OverallPortfolioScore, AIPortfolioReport } from '../types';

interface ReportExportViewProps {
  profile: GitHubProfile;
  repos: Repository[];
  portfolioScore: OverallPortfolioScore;
  aiReport: AIPortfolioReport | null;
}

export const ReportExportView: React.FC<ReportExportViewProps> = ({
  profile,
  repos,
  portfolioScore,
  aiReport,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const generateMarkdownSummary = () => {
    return `# AI GitHub Portfolio Audit Report for ${profile.name} (@${profile.username})

## Overall Score: ${portfolioScore.totalScore}/100 (Grade: ${portfolioScore.letterGrade})

### Developer Metrics
- **Public Repositories:** ${profile.publicReposCount}
- **Total Stars:** ${profile.starsCount}
- **Total Forks:** ${profile.forksCount}
- **Annual Contributions:** ${profile.contributionsLastYear}

### AI Executive Summary
${aiReport?.overallQualitySummary || 'Solid portfolio with high code quality and modular organization.'}

### Top Portfolio Strengths
${aiReport?.strengths.map((s) => `- ${s}`).join('\n') || '- Active contribution graph'}

### Recommended Action Items
${aiReport?.recommendedActionPlan.map((a) => `- ${a}`).join('\n') || '- Add CI/CD workflows'}
`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdownSummary());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      const element = document.getElementById('printable-report');
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#FFFFFF',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`AI_Portfolio_Report_${profile.username || 'dev'}.pdf`);
    } catch (err) {
      console.error('PDF generation error, falling back to print:', err);
      window.print();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Action Header */}
      <div className="bg-white border border-[#E8E3D8] rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div>
          <h2 className="text-xl font-extrabold text-[#1E1E1E] flex items-center gap-2">
            <FileDown className="w-5 h-5 text-[#1E1E1E]" />
            <span>Portfolio Report Export & PDF Generator</span>
          </h2>
          <p className="text-xs text-[#8B8680] font-medium mt-1">
            Export a clean, professional audit report suitable for recruiters, hiring managers, or portfolio showcase.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyMarkdown}
            className="px-4 py-2 bg-[#F5F1E8] hover:bg-[#E8E3D8] text-[#1E1E1E] font-bold text-xs rounded-xl border border-[#E8E3D8] flex items-center gap-2 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-[#22C55E]" /> : <Copy className="w-4 h-4 text-[#8B8680]" />}
            {copied ? 'Copied Markdown' : 'Copy Markdown'}
          </button>

          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="px-4 py-2 bg-[#F2C879] hover:bg-[#e2b765] text-[#1A1A1A] font-extrabold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            <span>{downloading ? 'Generating PDF...' : 'Download PDF Report'}</span>
          </button>
        </div>
      </div>

      {/* Printable Report Preview Card */}
      <div id="printable-report" className="bg-white border border-[#E8E3D8] rounded-3xl p-8 space-y-8 shadow-xs">
        
        {/* Document Title Header */}
        <div className="border-b border-[#E8E3D8] pb-6 flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-[#8B8680] font-bold uppercase tracking-wider">
              Official AI GitHub Portfolio Evaluation Report
            </div>
            <h1 className="text-2xl font-black text-[#1E1E1E] mt-1">{profile.name} (@{profile.username})</h1>
            <p className="text-xs text-[#8B8680] font-medium mt-0.5">Generated on {new Date().toLocaleDateString()}</p>
          </div>

          <div className="text-right">
            <div className="text-3xl font-black font-mono text-[#1E1E1E]">{portfolioScore.totalScore} / 100</div>
            <div className="text-xs font-mono font-bold text-[#22C55E]">Grade: {portfolioScore.letterGrade}</div>
          </div>
        </div>

        {/* Profile Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#F5F1E8] p-4 rounded-2xl border border-[#E8E3D8] text-xs">
          <div>
            <span className="text-[#8B8680] font-medium">Public Repositories:</span>
            <div className="text-sm font-bold font-mono text-[#1E1E1E] mt-0.5">{profile.publicReposCount}</div>
          </div>
          <div>
            <span className="text-[#8B8680] font-medium">Total Stars:</span>
            <div className="text-sm font-bold font-mono text-[#1E1E1E] mt-0.5">{profile.starsCount}</div>
          </div>
          <div>
            <span className="text-[#8B8680] font-medium">Total Forks:</span>
            <div className="text-sm font-bold font-mono text-[#1E1E1E] mt-0.5">{profile.forksCount}</div>
          </div>
          <div>
            <span className="text-[#8B8680] font-medium">Annual Contributions:</span>
            <div className="text-sm font-bold font-mono text-[#22C55E] mt-0.5">{profile.contributionsLastYear}</div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-2">
          <h3 className="text-sm font-extrabold text-[#1E1E1E] uppercase tracking-wider">Executive Summary</h3>
          <p className="text-xs text-[#1E1E1E] font-medium leading-relaxed bg-[#F5F1E8] p-4 rounded-2xl border border-[#E8E3D8]">
            {aiReport?.overallQualitySummary || portfolioScore.summary}
          </p>
        </div>

        {/* Score Factor Breakdown */}
        <div className="space-y-3">
          <h3 className="text-sm font-extrabold text-[#1E1E1E] uppercase tracking-wider">Evaluation Factors Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {portfolioScore.factors.map((f) => (
              <div key={f.name} className="bg-[#F5F1E8] p-3.5 rounded-2xl border border-[#E8E3D8] flex items-center justify-between">
                <span className="font-bold text-[#1E1E1E]">{f.name}</span>
                <span className="font-mono font-bold text-[#1E1E1E]">{f.score}/100</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Plan */}
        {aiReport?.recommendedActionPlan && (
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-[#1E1E1E] uppercase tracking-wider">Recommended Action Items</h3>
            <div className="space-y-2 text-xs">
              {aiReport.recommendedActionPlan.map((act, i) => (
                <div key={i} className="bg-[#F5F1E8] p-3.5 rounded-2xl border border-[#E8E3D8] text-[#1E1E1E] font-medium">
                  {act}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
