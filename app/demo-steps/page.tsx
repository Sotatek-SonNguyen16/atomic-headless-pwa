"use client";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { demoSteps } from "@/lib/demo-steps";

export default function DemoStepsListPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Demo Steps</h1>
          <p className="text-muted-foreground">
            Danh sách các bước demo Atomic Design + Headless Pattern
          </p>
        </div>

        <div className="grid gap-4">
          {demoSteps.map((step, index) => (
            <Link key={step.id} href={`/demo-steps/${step.id}`}>
              <Card className="hover:bg-accent transition-colors cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">
                        {index + 1}. {step.title}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {step.description}
                      </CardDescription>
                    </div>
                    <div className="ml-4 text-2xl font-bold text-muted-foreground">
                      {index + 1}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

