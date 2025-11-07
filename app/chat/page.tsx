"use client";
import { ComposerProvider, useComposerContext } from "@/features/chat/headless/ComposerProvider";
import { ComposerView } from "@/components/organisms/ComposerView";
import { ComposerEdit } from "@/components/organisms/ComposerEdit";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function SendBarExternal() {
  const { submit, text } = useComposerContext();
  return (
    <div className="sticky bottom-0 bg-background p-3 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <Button 
          onClick={() => submit("new")} 
          disabled={!text.trim()}
          variant="outline"
          className="w-full"
        >
          Send (external bar)
        </Button>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const [mode, setMode] = useState<"view" | "edit">("view");

  return (
    <ComposerProvider>
      <main className="min-h-dvh grid grid-rows-[1fr_auto] bg-background text-foreground">
        <div className="p-6 overflow-y-auto max-w-4xl mx-auto w-full">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">AI Chat Demo</h1>
              <p className="text-muted-foreground">
                Demo Atomic Design + Headless Pattern
              </p>
            </div>

            {/* Mode switcher */}
            <div className="flex gap-2 p-4 bg-muted rounded-lg">
              <Button
                variant={mode === "view" ? "default" : "outline"}
                onClick={() => setMode("view")}
                size="sm"
              >
                Composer View
              </Button>
              <Button
                variant={mode === "edit" ? "default" : "outline"}
                onClick={() => setMode("edit")}
                size="sm"
              >
                Edit Mode
              </Button>
            </div>

            {/* Messages area */}
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Messages go here...</p>
              </div>
            </div>
          </div>
        </div>

        {/* Composer area */}
        <div>
          {mode === "view" ? <ComposerView /> : <ComposerEdit />}
          <SendBarExternal />
        </div>
      </main>
    </ComposerProvider>
  );
}

