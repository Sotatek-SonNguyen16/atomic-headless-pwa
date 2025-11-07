"use client";
import { useForwardComposer } from "@/features/chat/headless/ForwardComposerProvider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function ComposerForward() {
  const { text, update, submit, isStreaming } = useForwardComposer();
  
  return (
    <div className="border-t border-border p-3 grid gap-2">
      <Textarea
        className="rounded-lg min-h-[100px]"
        placeholder="Add a note to forward…"
        value={text}
        onChange={(e) => update(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.ctrlKey) {
            e.preventDefault();
            if (text.trim() && !isStreaming) {
              submit();
            }
          }
        }}
      />
      <div className="flex justify-end">
        <Button 
          onClick={submit} 
          disabled={isStreaming || !text.trim()}
        >
          {isStreaming ? "Forwarding…" : "Forward"}
        </Button>
      </div>
    </div>
  );
}

