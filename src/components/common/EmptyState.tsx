import { Button } from 'antd';
import { Inbox } from 'lucide-react';
import React from 'react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState = ({
  icon,
  title = "No Data Found",
  description = "There are no records to display at the moment. Try adjusting your filters or adding new items.",
  actionText,
  onAction,
  className = "",
}: EmptyStateProps) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center w-full overflow-hidden ${className}`}>
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-3xl scale-150 animate-pulse" />

        <div className="relative flex items-center justify-center w-24 h-24 rounded-3xl bg-linear-to-br from-slate-50 to-slate-100 border border-slate-200/50 shadow-sm group-hover:scale-105 transition-transform duration-500">
          {icon || (
            <Inbox
              size={40}
              className="text-slate-300 group-hover:text-blue-400 transition-colors duration-500"
              strokeWidth={1.5}
            />
          )}
        </div>
      </div>

      <div className="max-w-md space-y-3 relative z-10">
        <h3 className="text-xl font-extrabold text-slate-800 tracking-tight font-['Outfit']">
          {title}
        </h3>
        <p className="text-sm font-medium text-slate-400 leading-relaxed px-4">
          {description}
        </p>
      </div>

      {actionText && onAction && (
        <div className="mt-8">
          <Button
            type="primary"
            size="large"
            onClick={onAction}
            className="h-12 px-8 rounded-xl font-bold tracking-tight bg-blue-600 hover:bg-blue-500 border-none shadow-lg shadow-blue-500/20 transition-all active:scale-95"
          >
            {actionText}
          </Button>
        </div>
      )}
    </div>
  );
};
