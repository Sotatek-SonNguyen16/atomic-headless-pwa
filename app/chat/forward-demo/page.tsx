"use client";
import { ForwardComposerProvider } from "@/features/chat/headless/ForwardComposerProvider";
import { ComposerForward } from "@/components/organisms/ComposerForward";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ForwardDemoPage() {
  const [open, setOpen] = useState(false);

  return (
    <main className="min-h-dvh bg-background text-foreground p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Forward Demo (Ephemeral)</h1>
          <p className="text-muted-foreground">
            Forward composer trong modal với state ephemeral — đóng modal là mất draft.
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Forward Message</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Forward Message</DialogTitle>
              <DialogDescription>
                Add a note to forward this message. The draft will be lost when you close this dialog.
              </DialogDescription>
            </DialogHeader>
            <ForwardComposerProvider>
              <ComposerForward />
            </ForwardComposerProvider>
          </DialogContent>
        </Dialog>

        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            💡 Tip: Type something in the forward composer, then close the dialog.
            When you reopen it, the text will be gone (ephemeral state).
          </p>
        </div>
      </div>
    </main>
  );
}

