"use client";
import { demoSteps } from "@/lib/demo-steps";
import { useMemo } from "react";

interface StepPreviewProps {
  stepId: string;
}

export function StepPreview({ stepId }: StepPreviewProps) {
  const step = useMemo(() => demoSteps.find((s) => s.id === stepId), [stepId]);

  if (!step) {
    return <div>Step not found</div>;
  }

  const PreviewComponent = step.previewComponent;
  return <PreviewComponent {...(step.previewProps || {})} />;
}
