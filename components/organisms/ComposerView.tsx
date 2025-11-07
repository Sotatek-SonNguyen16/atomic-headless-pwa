"use client";
import { useComposerContext } from "@/features/chat/headless/ComposerProvider";
import { CommonActions } from "@/components/molecules/CommonActions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ComposerViewProps {
  submitLabel?: string;
}

export function ComposerView({ submitLabel = "Send" }: ComposerViewProps) {
  const { text, update, submit, isStreaming } = useComposerContext();

  return (
    <div className="border-t border-border p-3 flex items-end gap-3">
      <CommonActions />
      <Textarea
        value={text}
        onChange={(e) => update(e.target.value)}
        className="flex-1 resize-none min-h-[60px] max-h-[200px]"
        placeholder="Type a message…"
        rows={1}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (text.trim() && !isStreaming) {
              submit("new");
            }
          }
        }}
      />
      <Button 
        onClick={() => submit("new")} 
        disabled={isStreaming || !text.trim()}
        size="default"
      >
        {isStreaming ? "Sending…" : submitLabel}
      </Button>
    </div>
  );
}

