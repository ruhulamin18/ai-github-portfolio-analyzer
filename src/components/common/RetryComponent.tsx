import React, { useState } from 'react';
import { RefreshCw, AlertTriangle, Home, Key, Lock, Zap, CheckCircle2 } from 'lucide-react';

interface RetryComponentProps {
  message?: string;
  onRetry: () => void;
  onGoHome?: () => void;
  customToken?: string;
  onUpdateToken?: (token: string) => void;
}

export const RetryComponent: React.FC<RetryComponentProps> = ({
  message = 'Failed to load data from server.',
  onRetry,
  onGoHome,
  customToken = '',
  onUpdateToken,
}) => {
  const [tokenInput, setTokenInput] = useState(customToken);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveToken = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanToken = tokenInput.trim();
    if (onUpdateToken) {
      onUpdateToken(cleanToken);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    }
    onRetry();
  };

  return (
    <div className="max-w-xl mx-auto my-8 bg-white border border-[#E8E3D8] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header / Error Indicator */}
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="p-3 bg-[#F4A6A6]/20 rounded-2xl text-[#EF4444] border border-[#F4A6A6]/40">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div className="space-y-1 max-w-md">
          <h3 className="text-base font-extrabold text-[#1E1E1E]">Unable to Complete Request</h3>
          <p className="text-xs sm:text-sm text-[#8B8680] font-medium leading-relaxed break-words">
            {message}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E1E1E] hover:bg-black text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Request</span>
          </button>

          {onGoHome && (
            <button
              onClick={onGoHome}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5F1E8] hover:bg-[#E8E3D8] text-[#1E1E1E] border border-[#E8E3D8] rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <Home className="w-3.5 h-3.5 text-[#8B8680]" />
              <span>Back to Home</span>
            </button>
          )}
        </div>
      </div>

      {/* GitHub Personal Access Token (PAT) Inline Form */}
      {onUpdateToken && (
        <div className="pt-5 border-t border-[#E8E3D8] space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#F2C879]/20 border border-[#F2C879] flex items-center justify-center text-[#D97706]">
              <Key className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-[#1E1E1E]">
                Add GitHub Personal Access Token (PAT)
              </h4>
              <p className="text-[11px] text-[#8B8680] font-medium">
                Fix rate limits (403) or private repository access by providing a free GitHub token.
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveToken} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B8680]">
                <Lock className="w-3.5 h-3.5" />
              </div>
              <input
                type="password"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="Paste token (ghp_... or github_pat_...)"
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#F5F1E8] border border-[#E8E3D8] rounded-xl text-[#1E1E1E] placeholder-[#8B8680] font-mono focus:outline-none focus:ring-2 focus:ring-[#F2C879] focus:bg-white transition-all"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-extrabold bg-[#F2C879] hover:bg-[#e2b765] text-[#1A1A1A] rounded-xl transition-all cursor-pointer shadow-2xs shrink-0"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5" />
                  <span>Save Token & Retry</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
