import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ChatIndexPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Atomic + Headless Demo</h1>
          <p className="text-muted-foreground text-lg">
            Demo thuyết trình về Atomic Design và Headless Pattern cho AI Chat
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>✅ Modern Approach</CardTitle>
              <CardDescription>
                Atomic Design + Headless Pattern
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/chat">
                <Button className="w-full" variant="default">
                  Main Chat Demo
                </Button>
              </Link>
              <Link href="/chat/forward-demo">
                <Button className="w-full" variant="outline">
                  Forward Modal Demo
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>❌ Legacy Approach</CardTitle>
              <CardDescription>
                Monolith với Boolean Hell
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/chat/legacy-demo">
                <Button className="w-full" variant="destructive">
                  Legacy Demo (So sánh)
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>📚 Key Concepts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <strong>Atomic Design:</strong> Tổ chức UI từ atoms → molecules → organisms
            </div>
            <div>
              <strong>Headless Pattern:</strong> Tách logic (Provider/Hook) khỏi UI
            </div>
            <div>
              <strong>Composition over Configuration:</strong> Không cần boolean/array phức tạp
            </div>
            <div>
              <strong>Dễ mở rộng:</strong> Tạo biến thể bằng thay UI hoặc đổi Provider
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

