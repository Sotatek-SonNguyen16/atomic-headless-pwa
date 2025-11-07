import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-dvh grid place-items-center p-10 bg-[--color-background] text-[--color-foreground]">
      <div className="space-y-6 text-center">
        <h1 className="text-3xl font-bold">Next 15 · React 19 · Tailwind v4 · shadcn</h1>
        <Button>It works 🚀</Button>
      </div>
    </main>
  );
}
