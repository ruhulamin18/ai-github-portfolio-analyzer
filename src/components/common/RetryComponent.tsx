import React from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface RetryComponentProps {
  message?: string;
  onRetry: () => void;
}

export const RetryComponent: React.FC<RetryComponentProps> = ({
  message = 'Failed to load data from server.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-[#FAF8F5] border border-[#E8E3D8] rounded-2xl text-center space-y-3">
      <div className="p-3 bg-[#F4A6A6]/20 rounded-full text-[#EF4444]">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <p className="text-xs text-[#1E1E1E] font-medium">{message}</p>
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
