# Demo: Atomic + Headless Design cho AI Chat (Next.js 15 + Tailwind 4 + shadcn)

## 1. Mục tiêu demo
- Thể hiện **Atomic structure** (atoms → organisms → templates)
- Thể hiện **Headless provider pattern** (logic tách riêng UI)
- Minh họa **Composition over Configuration** qua Composer component

## 2. Cấu trúc thư mục
```
/app/chat/page.tsx
/features/chat/headless/useComposer.ts
/features/chat/headless/ComposerProvider.tsx
/features/chat/ui/Composer.tsx
/components/atoms/IconButton.tsx
/components/molecules/CommonActions.tsx
/components/organisms/ComposerView.tsx
```

## 3. Headless layer — logic/state

### `useComposer.ts`
```ts
import { useState, useCallback } from "react";

export function useComposer() {
  const [text, setText] = useState("");
  const [isStreaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback((val: string) => setText(val), []);
  const submit = useCallback(async () => {
    try {
      setStreaming(true);
      await new Promise((r) => setTimeout(r, 1000));
    } catch (e) {
      setError("Failed to send");
    } finally {
      setStreaming(false);
      setText("");
    }
  }, []);

  return { text, update, submit, isStreaming, error };
}
```

### `ComposerProvider.tsx`
```tsx
"use client";
import { createContext, useContext } from "react";
import { useComposer } from "./useComposer";

const ComposerContext = createContext<ReturnType<typeof useComposer> | null>(null);

export function ComposerProvider({ children }: { children: React.ReactNode }) {
  const state = useComposer();
  return <ComposerContext.Provider value={state}>{children}</ComposerContext.Provider>;
}

export const useComposerContext = () => {
  const ctx = useContext(ComposerContext);
  if (!ctx) throw new Error("useComposerContext must be used within ComposerProvider");
  return ctx;
};
```

## 4. UI layer — Atomic → Organism

### `atoms/IconButton.tsx`
```tsx
import { cn } from "@/lib/utils";

export function IconButton({ icon: Icon, className, ...props }) {
  return (
    <button
      className={cn(
        "p-2 rounded-lg hover:bg-[--color-foreground]/10 transition",
        className
      )}
      {...props}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}
```

### `molecules/CommonActions.tsx`
```tsx
import { Smile, Plus } from "lucide-react";
import { IconButton } from "@/components/atoms/IconButton";

export function CommonActions() {
  return (
    <div className="flex gap-2">
      <IconButton icon={Smile} title="Emoji" />
      <IconButton icon={Plus} title="More actions" />
    </div>
  );
}
```

### `organisms/ComposerView.tsx`
```tsx
"use client";
import { useComposerContext } from "@/features/chat/headless/ComposerProvider";
import { CommonActions } from "@/components/molecules/CommonActions";
import { Button } from "@/components/ui/button";

export function ComposerView() {
  const { text, update, submit, isStreaming } = useComposerContext();

  return (
    <div className="border-t border-[--color-foreground]/20 p-3 flex items-end gap-3">
      <CommonActions />
      <textarea
        value={text}
        onChange={(e) => update(e.target.value)}
        className="flex-1 resize-none rounded-lg border p-2 bg-[--color-background]"
        placeholder="Type a message..."
      />
      <Button onClick={submit} disabled={isStreaming || !text.trim()}>
        {isStreaming ? "Sending..." : "Send"}
      </Button>
    </div>
  );
}
```

## 5. Integration trong page Next.js

### `app/chat/page.tsx`
```tsx
import { ComposerProvider } from "@/features/chat/headless/ComposerProvider";
import { ComposerView } from "@/components/organisms/ComposerView";

export default function ChatPage() {
  return (
    <ComposerProvider>
      <main className="flex flex-col min-h-dvh bg-[--color-background] text-[--color-foreground]">
        <div className="flex-1 p-6 overflow-y-auto">[Messages go here]</div>
        <ComposerView />
      </main>
    </ComposerProvider>
  );
}
```

## 6. Điểm nhấn khi demo
✅ Tách logic (Provider) khỏi UI  
✅ Không dùng `isEditing`, `isForwarding` booleans  
✅ Dễ mở rộng: có thể tạo `ForwardComposerProvider` chỉ cần thay logic  
✅ Có thể nâng Provider lên để chia sẻ state ngoài khung chat  

## 7. Mở rộng gợi ý demo
- Tạo thêm biến thể `ForwardComposerProvider` (ephemeral).
- Dùng `Dialog` (shadcn) để hiển thị Composer trong modal.
- So sánh với bản “monolith” nhiều boolean để thấy lợi ích rõ.

# Kết luận
> **Atomic = tổ chức giao diện. Headless = tách logic.**
> 
> → Dễ mở rộng, dễ test, ít bug, hỗ trợ AI tool tự động hiểu cấu trúc component.
