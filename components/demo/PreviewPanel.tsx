"use client";
import { cn } from "@/lib/utils";

interface PreviewPanelProps {
  children: React.ReactNode;
  className?: string;
}

export function PreviewPanel({ children, className }: PreviewPanelProps) {
  return (
    <div
      className={cn(
        "h-full overflow-auto",
        "bg-gradient-to-br from-slate-50 to-slate-100",
        "dark:from-slate-900 dark:to-slate-950",
        "rounded-lg",
        "flex items-center justify-center",
        className
      )}
    >
      <div className="w-full max-w-2xl p-6">
        {children}
      </div>
    </div>
  );
}
