# Atomic Design + Headless Pattern Demo

Demo thuyết trình về **Atomic Design** và **Headless Pattern** cho AI Chat application.

## Cấu trúc dự án

```
├── app/
│   ├── chat/
│   │   ├── page.tsx              # Main chat demo (Step 4/7)
│   │   ├── index/page.tsx        # Demo index page
│   │   ├── forward-demo/page.tsx  # Forward modal demo (Step 6/11)
│   │   └── legacy-demo/page.tsx  # Legacy monolith comparison (Step 0)
│   └── page.tsx                  # Home page
│
├── components/
│   ├── atoms/
│   │   └── IconButton.tsx        # Atom component
│   ├── molecules/
│   │   └── CommonActions.tsx    # Molecule component
│   ├── organisms/
│   │   ├── ComposerView.tsx     # Organism - Main composer
│   │   ├── ComposerEdit.tsx     # Organism - Edit variant
│   │   ├── ComposerForward.tsx   # Organism - Forward variant
│   │   └── LegacyMonolithComposer.tsx  # Legacy anti-pattern
│   └── ui/                       # shadcn/ui components
│
└── features/
    └── chat/
        └── headless/
            ├── useComposer.ts              # Headless hook (logic)
            ├── ComposerProvider.tsx         # Context provider
            └── ForwardComposerProvider.tsx  # Ephemeral provider
```

## Các trang demo

1. **`/chat`** - Main chat demo
   - ComposerView với CommonActions
   - External send bar (lift state up)
   - Mode switcher giữa View và Edit

2. **`/chat/forward-demo`** - Forward modal demo
   - ForwardComposerProvider với ephemeral state
   - Dialog modal từ shadcn/ui
   - Đóng modal = mất draft

3. **`/chat/legacy-demo`** - Legacy comparison
   - Boolean hell anti-pattern
   - So sánh với approach mới

4. **`/chat/index`** - Demo index
   - Navigation đến tất cả demos
   - Key concepts summary

## Key Concepts

### Atomic Design
- **Atoms**: `IconButton` - Basic building blocks
- **Molecules**: `CommonActions` - Simple combinations
- **Organisms**: `ComposerView`, `ComposerEdit`, `ComposerForward` - Complex UI sections

### Headless Pattern
- **Logic layer**: `useComposer` hook - Pure business logic
- **Provider layer**: `ComposerProvider` - Context API wrapper
- **UI layer**: Organisms consume context, no logic

### Composition over Configuration
- Không cần boolean flags (`isEditing`, `isForwarding`)
- Tạo biến thể bằng cách thay UI component hoặc đổi Provider
- Dễ test, dễ mở rộng, dễ maintain

## Chạy demo

```bash
pnpm dev
```

Truy cập:
- Home: `http://localhost:3000`
- Chat Demo: `http://localhost:3000/chat`
- All Demos: `http://localhost:3000/chat/index`

## Demo Steps (theo tài liệu)

- **Step 0**: Legacy monolith với boolean hell
- **Step 1**: Rút logic ra hook headless
- **Step 2**: Tạo ComposerProvider (Context)
- **Step 3**: Atomic components (atoms/molecules)
- **Step 4**: Organism ComposerView (không boolean props)
- **Step 5**: Biến thể Edit bằng JSX composition
- **Step 6**: Biến thể Forward với Provider khác (ephemeral)
- **Step 7**: Lift state up - external send bar
- **Step 11**: Forward trong Modal (ephemeral)

## Takeaways

✅ **Headless = não** (Provider/Hook), **Atomic = cơ thể** (atoms → organisms)  
✅ **Composition over configuration**: không cần boolean/array phức tạp  
✅ Dễ tạo **biến thể** (Edit/Forward) bằng **thay UI** hoặc **đổi Provider**  
✅ Logic testable độc lập UI  
✅ Dễ mở rộng, dễ maintain, ít bug

