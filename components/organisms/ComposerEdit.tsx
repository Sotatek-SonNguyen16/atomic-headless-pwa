"use client";
import { useComposerContext } from "@/features/chat/headless/ComposerProvider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function ComposerEdit() {
  const { text, update, submit, isStreaming } = useComposerContext();
  
  return (
    <div className="border-t border-border p-3 grid gap-2">
      <Textarea
        className="rounded-lg min-h-[100px]"
        placeholder="Edit message…"
        value={text}
        onChange={(e) => update(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.ctrlKey) {
            e.preventDefault();
            if (text.trim() && !isStreaming) {
              submit("edit");
            }
          }
        }}
      />
      <div className="flex justify-end gap-2">
        <Button variant="secondary" type="button">
          Cancel
        </Button>
        <Button 
          onClick={() => submit("edit")} 
          disabled={isStreaming || !text.trim()}
        >
          {isStreaming ? "Saving…" : "Save"}
        </Button>
      </div>
    </div>
  );
}

