import * as React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  children?: React.ReactNode;
}

export function IconButton({ 
  icon: Icon, 
  children, 
  className, 
  ...props 
}: IconButtonProps) {
  return (
    <button
      className={cn(
        "p-2 rounded-lg hover:bg-foreground/10 transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      {...props}
    >
      {Icon ? <Icon className="w-5 h-5" /> : children}
    </button>
  );
}

