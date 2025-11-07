"use client";
import { LegacyMonolithComposer } from "@/components/organisms/LegacyMonolithComposer";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function LegacyDemoPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isForwarding, setIsForwarding] = useState(false);

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Legacy Monolith Demo</h1>
          <p className="text-muted-foreground">
            ❌ Anti-pattern: Boolean hell với nhiều if/else rải rác
          </p>
        </div>

        {/* Mode switcher */}
        <div className="flex gap-2 p-4 bg-muted rounded-lg">
          <Button
            variant={!isEditing && !isForwarding ? "default" : "outline"}
            onClick={() => {
              setIsEditing(false);
              setIsForwarding(false);
            }}
            size="sm"
          >
            Normal
          </Button>
          <Button
            variant={isEditing ? "default" : "outline"}
            onClick={() => {
              setIsEditing(true);
              setIsForwarding(false);
            }}
            size="sm"
          >
            Edit Mode
          </Button>
          <Button
            variant={isForwarding ? "default" : "outline"}
            onClick={() => {
              setIsEditing(false);
              setIsForwarding(true);
            }}
            size="sm"
          >
            Forward Mode
          </Button>
        </div>

        {/* Messages area */}
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Messages go here...</p>
          </div>
        </div>

        {/* Legacy Composer */}
        <LegacyMonolithComposer
          isEditing={isEditing}
          isForwarding={isForwarding}
        />

        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-sm text-destructive font-medium">
            ⚠️ Vấn đề: UI/logic lẫn lộn, khó mở rộng, nhiều boolean flags
          </p>
        </div>
      </div>
    </main>
  );
}

