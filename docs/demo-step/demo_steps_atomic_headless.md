# Demo Steps — Atomic & Headless cho AI Chat (Next.js 15 · React 19 · Tailwind v4 · shadcn)

> Mục tiêu: tiến hành demo từng bước, mỗi bước có **code** và mô tả **UI** để nhìn rõ hành trình từ anti‑pattern → headless + atomic.

---

## Step 0 — Baseline *Monolith + Boolean Hell* (điểm xuất phát)

**Vấn đề minh họa**: Một `Composer` có quá nhiều boolean và `if/else` rải rác.

```tsx
// app/chat/legacy-monolith.tsx
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function LegacyMonolithComposer({
  isThread,
  isEditing,
  isForwarding,
}: { isThread?: boolean; isEditing?: boolean; isForwarding?: boolean }) {
  const [text, setText] = useState("");

  const onSubmit = () => {
    // nhiều nhánh điều kiện
    if (isEditing) {
      // ...update message
    } else if (isForwarding) {
      // ...forward message
    } else {
      // ...send new message
    }
    setText("");
  };

  return (
    <div className="border-t p-3 space-y-2">
      {/* dải actions phụ thuộc flags */}
      <div className="flex gap-2">
        {!isForwarding && <button>+</button>}
        {!isEditing && <button>🙂</button>}
      </div>

      <textarea
        className="w-full rounded border p-2"
        placeholder={isEditing ? "Edit message…" : "Type a message…"}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex justify-end gap-2">
        {isEditing && <Button variant="secondary">Cancel</Button>}
        <Button onClick={onSubmit}>
          {isEditing ? "Save" : isForwarding ? "Forward" : "Send"}
        </Button>
      </div>
    </div>
  );
}
```

**UI kỳ vọng**: chạy thử với các props khác nhau sẽ thấy UI/logic lẫn lộn, khó mở rộng.

---

## Step 1 — Rút *logic* ra hook headless `useComposer`

```ts
// features/chat/headless/useComposer.ts
import { useCallback, useState } from "react";

export function useComposer() {
  const [text, setText] = useState("");
  const [isStreaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback((v: string) => setText(v), []);

  const submit = useCallback(async (mode: "new" | "edit" | "forward" = "new") => {
    try {
      setStreaming(true);
      // giả lập hành vi khác nhau theo mode
      await new Promise((r) => setTimeout(r, 600));
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

**UI**: chưa đổi — chỉ tách được “não” khỏi UI.

---

## Step 2 — Tạo `ComposerProvider` (Context = *hợp đồng*)

```tsx
// features/chat/headless/ComposerProvider.tsx
"use client";
import { createContext, useContext } from "react";
import { useComposer } from "./useComposer";

type ComposerApi = ReturnType<typeof useComposer>;
const ComposerContext = createContext<ComposerApi | null>(null);

export function ComposerProvider({ children }: { children: React.ReactNode }) {
  const api = useComposer();
  return <ComposerContext.Provider value={api}>{children}</ComposerContext.Provider>;
}

export function useComposerContext() {
  const ctx = useContext(ComposerContext);
  if (!ctx) throw new Error("useComposerContext must be used inside ComposerProvider");
  return ctx;
}
```

**UI**: mọi component con sẽ chỉ “đọc/hành động” theo interface này.

---

## Step 3 — Atomic: tạo một vài **atoms/molecules**

```tsx
// components/atoms/IconButton.tsx
export function IconButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="p-2 rounded-lg hover:bg-[--color-foreground]/10 transition"
      {...props}
    >
      {children}
    </button>
  );
}
```

```tsx
// components/molecules/CommonActions.tsx
import { IconButton } from "@/components/atoms/IconButton";

export function CommonActions() {
  return (
    <div className="flex gap-2">
      <IconButton title="Emoji">🙂</IconButton>
      <IconButton title="More">＋</IconButton>
    </div>
  );
}
```

**UI**: dải actions đơn giản, có thể thay skin nhanh.

---

## Step 4 — Organism: `ComposerView` *không còn boolean props*

```tsx
// components/organisms/ComposerView.tsx
"use client";
import { useComposerContext } from "@/features/chat/headless/ComposerProvider";
import { CommonActions } from "@/components/molecules/CommonActions";
import { Button } from "@/components/ui/button";

export function ComposerView({ submitLabel = "Send" }: { submitLabel?: string }) {
  const { text, update, submit, isStreaming } = useComposerContext();

  return (
    <div className="border-t border-[--color-foreground]/20 p-3 flex items-end gap-3">
      <CommonActions />
      <textarea
        value={text}
        onChange={(e) => update(e.target.value)}
        className="flex-1 resize-none rounded-lg border p-2 bg-[--color-background]"
        placeholder="Type a message…"
      />
      <Button onClick={() => submit("new")} disabled={isStreaming || !text.trim()}>
        {isStreaming ? "Sending…" : submitLabel}
      </Button>
    </div>
  );
}
```

**UI**: một composer “trong sáng”, không biết edit/forward là gì.

---

## Step 5 — *Composition over configuration*: biến thể **Edit** bằng JSX

```tsx
// components/organisms/ComposerEdit.tsx
"use client";
import { useComposerContext } from "@/features/chat/headless/ComposerProvider";
import { Button } from "@/components/ui/button";

export function ComposerEdit() {
  const { text, update, submit, isStreaming } = useComposerContext();
  return (
    <div className="border-t p-3 grid gap-2">
      <textarea
        className="rounded-lg border p-2"
        placeholder="Edit message…"
        value={text}
        onChange={(e) => update(e.target.value)}
      />
      <div className="flex justify-end gap-2">
        <Button variant="secondary">Cancel</Button>
        <Button onClick={() => submit("edit")} disabled={isStreaming || !text.trim()}>
          {isStreaming ? "Saving…" : "Save"}
        </Button>
      </div>
    </div>
  );
}
```

**UI**: màn **Edit** có layout & actions riêng, **không cần** `isEditing` boolean.

---

## Step 6 — Biến thể **Forward (ephemeral)** bằng Provider khác

```tsx
// features/chat/headless/ForwardComposerProvider.tsx
"use client";
import { createContext, useContext, useState } from "react";

type ForwardApi = {
  text: string;
  update: (v: string) => void;
  submit: () => Promise<void>;
  isStreaming: boolean;
};

const ForwardCtx = createContext<ForwardApi | null>(null);

export function ForwardComposerProvider({ children }: { children: React.ReactNode }) {
  const [text, setText] = useState("");
  const [isStreaming, setStreaming] = useState(false);

  return (
    <ForwardCtx.Provider
      value={{
        text,
        update: setText,
        submit: async () => {
          setStreaming(true);
          await new Promise((r) => setTimeout(r, 400));
          setStreaming(false);
          setText(""); // ephemeral: đóng modal là mất draft
        },
        isStreaming,
      }}
    >
      {children}
    </ForwardCtx.Provider>
  );
}

export const useForwardComposer = () => {
  const v = useContext(ForwardCtx);
  if (!v) throw new Error("useForwardComposer must be used within ForwardComposerProvider");
  return v;
};
```

```tsx
// components/organisms/ComposerForward.tsx
"use client";
import { useForwardComposer } from "@/features/chat/headless/ForwardComposerProvider";
import { Button } from "@/components/ui/button";

export function ComposerForward() {
  const { text, update, submit, isStreaming } = useForwardComposer();
  return (
    <div className="border-t p-3 grid gap-2">
      <textarea
        className="rounded-lg border p-2"
        placeholder="Add a note to forward…"
        value={text}
        onChange={(e) => update(e.target.value)}
      />
      <div className="flex justify-end">
        <Button onClick={submit} disabled={isStreaming || !text.trim()}>
          {isStreaming ? "Forwarding…" : "Forward"}
        </Button>
      </div>
    </div>
  );
}
```

**UI**: Forward trong **modal** dùng state **ephemeral** — đóng là mất.

---

## Step 7 — *Lift state up*: nút gửi đặt **ngoài** khung Composer

```tsx
// app/chat/page.tsx (trích)
import { ComposerProvider } from "@/features/chat/headless/ComposerProvider";
import { ComposerView } from "@/components/organisms/ComposerView";
import { Button } from "@/components/ui/button";
import { useComposerContext } from "@/features/chat/headless/ComposerProvider";

function SendBarExternal() {
  const { submit, text } = useComposerContext();
  return (
    <div className="sticky bottom-0 bg-[--color-background] p-3 border-t">
      <Button onClick={() => submit("new")} disabled={!text.trim()}>Send (external)</Button>
    </div>
  );
}

export default function ChatPage() {
  return (
    <ComposerProvider>
      <main className="min-h-dvh grid grid-rows-[1fr_auto]">
        <div className="p-6 overflow-y-auto">[Messages]</div>
        <>
          <ComposerView />
          <SendBarExternal />
        </>
      </main>
    </ComposerProvider>
  );
}
```

**UI**: có **2 vị trí điều khiển** cùng chia sẻ state, không props‑drilling.

---

## Step 8 — So sánh: *Config array* vs **JSX actions**

```tsx
// ❌ Cách cũ (mảng cấu hình dễ vỡ)
const actions = [
  { type: "emoji", show: true },
  { type: "attach", show: false, when: "notForwarding" },
];
```

```tsx
// ✅ Cách mới (composition)
<CommonActions />
{/* Khi cần action đặc thù cho Edit */}
<div className="ml-auto flex gap-2">
  <CancelButton />
  <SaveButton />
</div>
```

**UI**: đơn giản, dễ đọc, *escape hatch* luôn sẵn sàng.

---

## Step 9 — A11y & Keyboard (headless primitives)

Gợi ý: thêm **keyboard handlers** và props a11y vào textarea + buttons, dùng **Dialog/Combobox** của shadcn ở chế độ headless để tạo **slash‑commands**/mentions. (Có thể chèn live demo nhỏ nếu còn thời gian.)

---

## Step 10 — Testing nhanh cho hook headless

```ts
// features/chat/headless/useComposer.test.ts
import { renderHook, act } from "@testing-library/react";
import { useComposer } from "./useComposer";

test("submit clears text", async () => {
  const { result } = renderHook(() => useComposer());
  act(() => result.current.update("hello"));
  await act(async () => {
    await result.current.submit("new");
  });
  expect(result.current.text).toBe("");
});
```

**UI**: không đổi — nhưng demo cho thấy **logic testable** độc lập UI.

---

## Step 11 — Bonus: Forward trong Modal (éphemeral)

```tsx
// app/chat/forward-demo.tsx (trích)
import { ForwardComposerProvider } from "@/features/chat/headless/ForwardComposerProvider";
import { ComposerForward } from "@/components/organisms/ComposerForward";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function ForwardDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild><button className="btn">Forward</button></DialogTrigger>
      <DialogContent>
        <ForwardComposerProvider>
          <ComposerForward />
        </ForwardComposerProvider>
      </DialogContent>
    </Dialog>
  );
}
```

**UI**: mở dialog → forward message, đóng dialog mất draft.

---

## Cách chạy demo
1) Tạo các file như trên theo đúng đường dẫn.
2) Truy cập `/chat` để xem **Step 4/7** (composer + external bar).
3) Truy cập trang forward demo để xem **Step 6/11** (ephemeral).

---

## Key Takeaways khi trình bày
- Headless (Provider/Hook) = **não**, Atomic (atoms → organisms) = **cơ thể**.
- **Composition over configuration**: không cần boolean/array phức tạp.
- Dễ tạo **biến thể** (Edit/Forward) bằng **thay UI** hoặc **đổi Provider**.
