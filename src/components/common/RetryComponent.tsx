<<<<<<< HEAD
import React from 'react';
=======
import React, { useState } from 'react';
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface RetryComponentProps {
  message?: string;
  onRetry: () => void;
<<<<<<< HEAD
=======
  onSaveToken?: (token: string) => void;
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
}

export const RetryComponent: React.FC<RetryComponentProps> = ({
  message = 'Failed to load data from server.',
  onRetry,
<<<<<<< HEAD
}) => {
=======
  onSaveToken,
}) => {
  const [token, setToken] = useState('');
  const isRateLimit = /rate limit/i.test(message);

  const handleTokenSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const value = token.trim();
    if (value && onSaveToken) onSaveToken(value);
  };

>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-[#FAF8F5] border border-[#E8E3D8] rounded-2xl text-center space-y-3">
      <div className="p-3 bg-[#F4A6A6]/20 rounded-full text-[#EF4444]">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <p className="text-xs text-[#1E1E1E] font-medium">{message}</p>
<<<<<<< HEAD
=======
      {isRateLimit && onSaveToken && (
        <form onSubmit={handleTokenSubmit} className="w-full max-w-sm flex flex-col sm:flex-row gap-2 pt-1">
          <input
            type="password"
            value={token}
            onChange={(event) => setToken(event.target.value)}
            placeholder="Paste a GitHub personal access token"
            className="flex-1 px-3 py-2 text-xs bg-white border border-[#E8E3D8] rounded-xl text-[#1E1E1E] placeholder-[#8B8680] focus:outline-none focus:ring-2 focus:ring-[#F2C879]"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={!token.trim()}
            className="px-3.5 py-2 bg-[#1E1E1E] text-white rounded-xl text-xs font-semibold hover:bg-[#333] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Use Token
          </button>
        </form>
      )}
      {isRateLimit && onSaveToken && (
        <p className="text-[10px] text-[#8B8680] max-w-sm">The token is used only for this browser session to authenticate GitHub API requests.</p>
      )}
>>>>>>> d24ff4df7c58375cfcccee56ee8584842bba25ed
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1E1E1E] text-white rounded-xl text-xs font-semibold hover:bg-[#333] transition-colors"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        Retry Request
      </button>
    </div>
  );
};
