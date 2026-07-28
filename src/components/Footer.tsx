import React from 'react';
import { Github, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-[#E8E3D8] py-6 px-4 sm:px-8 mt-12 text-xs text-[#8B8680] font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left branding */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#F2C879] flex items-center justify-center text-[#1A1A1A] font-bold shrink-0 shadow-xs">
            <Github className="w-3.5 h-3.5" />
          </div>
          <span className="font-extrabold text-[#1E1E1E]">© 2026 AI GitHub Portfolio Analyzer</span>
          <span className="text-[#E8E3D8] hidden sm:inline">•</span>
          <span className="hidden sm:inline font-medium">Enterprise Code Intelligence</span>
        </div>

        {/* Center author attribution */}
        <div className="flex items-center gap-1.5 font-medium text-[#1E1E1E]">
          <span>Built with</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
          <span>by <strong className="font-extrabold text-[#1E1E1E]">Ruhul Amin</strong></span>
        </div>

        {/* Right API tech stack & version */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 font-mono text-[11px] bg-[#F5F1E8] px-2.5 py-1 rounded-xl border border-[#E8E3D8]">
            <Sparkles className="w-3 h-3 text-[#1E1E1E]" />
            <span>Powered by GitHub API • Google Gemini AI</span>
          </div>
          <span className="font-mono text-[11px] font-bold text-[#1E1E1E] bg-[#F2C879]/30 px-2 py-0.5 rounded-lg border border-[#F2C879]">
            Version 2.5
          </span>
        </div>

      </div>
    </footer>
  );
};
