"use client";
import { cn } from "@/lib/utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeViewerProps {
  code: string;
  language: "tsx" | "ts";
  className?: string;
}

export function CodeViewer({ code, language, className }: CodeViewerProps) {
  return (
    <div className={cn("relative h-full flex flex-col", className)}>
      <div className="absolute top-2 right-2 z-10 text-xs text-muted-foreground uppercase bg-background/80 px-2 py-1 rounded backdrop-blur-sm">
        {language}
      </div>
      <div className="flex-1 overflow-auto rounded-lg">
        <SyntaxHighlighter
          language={language === "tsx" ? "tsx" : "typescript"}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "1rem",
            background: "#1e1e1e",
            height: "100%",
            fontSize: "0.875rem",
            lineHeight: "1.5",
            borderRadius: "0.5rem",
          }}
          codeTagProps={{
            style: {
              fontFamily: "var(--font-mono)",
              color: "#d4d4d4",
            },
          }}
          PreTag={({ children, ...props }) => (
            <pre {...props} style={{ margin: 0, background: "#1e1e1e" }}>
              {children}
            </pre>
          )}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
