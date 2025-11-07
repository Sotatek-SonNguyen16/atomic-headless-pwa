import { notFound } from "next/navigation";
import { demoSteps } from "@/lib/demo-steps";
import { CodeViewer } from "@/components/demo/CodeViewer";
import { PreviewPanel } from "@/components/demo/PreviewPanel";
import { StepPreview } from "@/components/demo/StepPreview";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface DemoStepPageProps {
  params: Promise<{ stepId: string }>;
}

export default async function DemoStepPage({ params }: DemoStepPageProps) {
  const { stepId } = await params;
  const step = demoSteps.find((s) => s.id === stepId);

  if (!step) {
    notFound();
  }

  const currentIndex = demoSteps.findIndex((s) => s.id === stepId);
  const prevStep = currentIndex > 0 ? demoSteps[currentIndex - 1] : null;
  const nextStep =
    currentIndex < demoSteps.length - 1 ? demoSteps[currentIndex + 1] : null;

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="h-dvh flex flex-col">
        {/* Header */}
        <div className="border-b border-border p-4 bg-background">
          <div className="max-w-[1920px] mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/demo-steps">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to List
                  </Link>
                </Button>
                <div>
                  <h1 className="text-xl font-bold">{step.title}</h1>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {prevStep && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/demo-steps/${prevStep.id}`}>
                      ← Prev
                    </Link>
                  </Button>
                )}
                {nextStep && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/demo-steps/${nextStep.id}`}>
                      Next →
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content: Code + Preview */}
        <div className="flex-1 grid grid-cols-2 gap-4 p-4 overflow-hidden">
          {/* Code Column */}
          <div className="flex flex-col overflow-hidden">
            <div className="mb-2">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase">
                Code
              </h2>
            </div>
            <CodeViewer code={step.code} language={step.codeLanguage} />
          </div>

          {/* Preview Column */}
          <div className="flex flex-col overflow-hidden">
            <div className="mb-2">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase">
                Preview
              </h2>
            </div>
            <PreviewPanel>
              <StepPreview stepId={step.id} />
            </PreviewPanel>
          </div>
        </div>
      </div>
    </main>
  );
}

