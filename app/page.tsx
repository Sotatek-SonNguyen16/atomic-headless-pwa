import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-dvh grid place-items-center p-10 bg-background text-foreground">
      <div className="space-y-6 text-center">
        <h1 className="text-3xl font-bold">Next 15 · React 19 · Tailwind v4 · shadcn</h1>
        <p className="text-muted-foreground">
          Atomic Design + Headless Pattern Demo
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button asChild>
            <Link href="/demo-steps">Demo Steps</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/chat">Chat Demo</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/chat/index">All Demos</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
