import React from 'react';
import { FolderOpen } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Data Available',
  description = 'There are no items or insights to display at this moment.',
  icon = <FolderOpen className="w-8 h-8 text-[#8B8680]" />,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-[#FAF8F5] border border-[#E8E3D8] rounded-2xl text-center space-y-3">
      <div className="p-3 bg-[#E8E3D8]/50 rounded-full">{icon}</div>
      <h3 className="text-sm font-bold text-[#1E1E1E]">{title}</h3>
      <p className="text-xs text-[#8B8680] max-w-sm">{description}</p>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
};
