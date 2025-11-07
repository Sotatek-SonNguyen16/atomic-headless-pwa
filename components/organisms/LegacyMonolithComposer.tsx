"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface LegacyMonolithComposerProps {
  isThread?: boolean;
  isEditing?: boolean;
  isForwarding?: boolean;
}

export function LegacyMonolithComposer({
  isThread,
  isEditing,
  isForwarding,
}: LegacyMonolithComposerProps) {
  const [text, setText] = useState("");

  const onSubmit = () => {
    // Nhiều nhánh điều kiện
    if (isEditing) {
      console.log("Updating message:", text);
    } else if (isForwarding) {
      console.log("Forwarding message:", text);
    } else {
      console.log("Sending new message:", text);
    }
    setText("");
  };

  return (
    <div className="border-t border-border p-3 space-y-2">
      {/* Dải actions phụ thuộc flags */}
      <div className="flex gap-2">
        {!isForwarding && (
          <button className="p-2 rounded-lg hover:bg-foreground/10 transition">
            ＋
          </button>
        )}
        {!isEditing && (
          <button className="p-2 rounded-lg hover:bg-foreground/10 transition">
            🙂
          </button>
        )}
      </div>

      <Textarea
        className="w-full"
        placeholder={isEditing ? "Edit message…" : "Type a message…"}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex justify-end gap-2">
        {isEditing && (
          <Button variant="secondary" type="button">
            Cancel
          </Button>
        )}
        <Button onClick={onSubmit}>
          {isEditing ? "Save" : isForwarding ? "Forward" : "Send"}
        </Button>
      </div>
    </div>
  );
}

