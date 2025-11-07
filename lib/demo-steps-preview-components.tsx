"use client";
import { useState } from "react";
import { LegacyMonolithComposer } from "@/components/organisms/LegacyMonolithComposer";
import { Button } from "@/components/ui/button";
import { ComposerProvider, useComposerContext } from "@/features/chat/headless/ComposerProvider";
import { ForwardComposerProvider } from "@/features/chat/headless/ForwardComposerProvider";
import { ComposerForward } from "@/components/organisms/ComposerForward";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

export function BooleanHellDemo() {
  const [isEditing, setIsEditing] = useState(false);
  const [isForwarding, setIsForwarding] = useState(false);
  const [isThread, setIsThread] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="bg-gradient-to-r from-red-50 to-orange-50 px-4 py-3 border-b border-red-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-red-700">❌ Boolean Hell</p>
            <p className="text-xs text-red-600">Thêm flags → code phức tạp hơn</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-red-600">
            <span className="px-2 py-1 bg-red-100 rounded">
              {[isEditing, isForwarding, isThread, isReplying].filter(Boolean).length} flags
            </span>
          </div>
        </div>
      </div>

      {/* Boolean Flags Toggle */}
      <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
        <p className="text-xs font-semibold text-slate-700 mb-2">Toggle Boolean Flags:</p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={isEditing ? "default" : "outline"}
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs h-7"
          >
            isEditing {isEditing && "✓"}
          </Button>
          <Button
            variant={isForwarding ? "default" : "outline"}
            size="sm"
            onClick={() => setIsForwarding(!isForwarding)}
            className="text-xs h-7"
          >
            isForwarding {isForwarding && "✓"}
          </Button>
          <Button
            variant={isThread ? "default" : "outline"}
            size="sm"
            onClick={() => setIsThread(!isThread)}
            className="text-xs h-7"
          >
            isThread {isThread && "✓"}
          </Button>
          <Button
            variant={isReplying ? "default" : "outline"}
            size="sm"
            onClick={() => setIsReplying(!isReplying)}
            className="text-xs h-7"
          >
            isReplying {isReplying && "✓"}
          </Button>
        </div>
      </div>

      {/* Preview Component */}
      <LegacyMonolithComposer
        isEditing={isEditing}
        isForwarding={isForwarding}
        isThread={isThread}
      />
    </div>
  );
}

export function SendBarExternal() {
  const { submit, text } = useComposerContext();
  return (
    <div className="sticky bottom-0 bg-background p-3 border-t border-border">
      <Button onClick={() => submit("new")} disabled={!text.trim()}>
        Send (external)
      </Button>
    </div>
  );
}

export function ForwardModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Forward Message</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="sr-only">Forward Message</DialogTitle>
        <ForwardComposerProvider>
          <ComposerForward />
        </ForwardComposerProvider>
      </DialogContent>
    </Dialog>
  );
}
