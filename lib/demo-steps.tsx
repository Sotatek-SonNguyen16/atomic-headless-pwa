import React from "react";
import { LegacyMonolithComposer } from "@/components/organisms/LegacyMonolithComposer";
import { ComposerProvider } from "@/features/chat/headless/ComposerProvider";
import { ComposerView } from "@/components/organisms/ComposerView";
import { ComposerEdit } from "@/components/organisms/ComposerEdit";
import { CommonActions } from "@/components/molecules/CommonActions";
import { SendBarExternal, ForwardModalDemo, BooleanHellDemo } from "./demo-steps-preview-components";

export interface DemoStep {
  id: string;
  title: string;
  description: string;
  code: string;
  codeLanguage: "tsx" | "ts";
  previewComponent: React.ComponentType<any>;
  previewProps?: Record<string, any>;
}

// Export data array - this can be imported by server components
export const demoSteps: DemoStep[] = [
  {
    id: "step-0",
    title: "Step 0 — Boolean Hell (Anti-pattern)",
    description: "Component phụ thuộc nhiều boolean flags → khó mở rộng",
    codeLanguage: "tsx",
    code: `export function LegacyComposer({ 
  isEditing, 
  isForwarding, 
  isThread,
  isReplying 
}) {
  return (
    <div>
      {/* Actions phụ thuộc nhiều flags */}
      <div className="flex gap-2">
        {!isForwarding && !isReplying && <button>+</button>}
        {!isEditing && <button>🙂</button>}
        {isThread && <button>💬</button>}
      </div>
      
      <textarea 
        placeholder={
          isEditing ? "Edit..." : 
          isForwarding ? "Forward..." : 
          isReplying ? "Reply..." : 
          "Type..."
        } 
      />
      
      <Button>
        {isEditing ? "Save" : 
         isForwarding ? "Forward" : 
         isReplying ? "Reply" : 
         "Send"}
      </Button>
    </div>
  );
}`,
    previewComponent: BooleanHellDemo,
  },
  {
    id: "step-1",
    title: "Step 1 — Headless Hook",
    description: "Tách logic → hook headless",
    codeLanguage: "ts",
    code: `export function useComposer() {
  const [text, setText] = useState("");
  const [isStreaming, setStreaming] = useState(false);

  const update = (v) => setText(v);
  const submit = async (mode = "new") => {
    setStreaming(true);
    // ... xử lý
    setText("");
  };

  return { text, update, submit, isStreaming };
}`,
    previewComponent: () => (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
            <span className="text-xl">🧠</span>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-1">Headless Hook</h4>
            <p className="text-sm text-slate-600">
              Logic tách riêng → có thể dùng với nhiều UI khác nhau
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "step-2",
    title: "Step 2 — Provider (Context)",
    description: "Chia sẻ state qua Context API",
    codeLanguage: "tsx",
    code: `const ComposerContext = createContext(null);

export function ComposerProvider({ children }) {
  const api = useComposer();
  return (
    <ComposerContext.Provider value={api}>
      {children}
    </ComposerContext.Provider>
  );
}

export const useComposerContext = () => useContext(ComposerContext);`,
    previewComponent: () => (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <span className="text-xl">📦</span>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900">Provider Pattern</h4>
              <p className="text-xs text-slate-600">Chia sẻ state toàn cục</p>
            </div>
          </div>
          <div className="pl-14 space-y-2">
            <div className="text-xs text-slate-500 border-l-2 border-purple-200 pl-3">
              → Component A: useComposerContext()
            </div>
            <div className="text-xs text-slate-500 border-l-2 border-purple-200 pl-3">
              → Component B: useComposerContext()
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "step-3",
    title: "Step 3 — Atomic (Atoms → Molecules)",
    description: "Ghép các component nhỏ thành lớn",
    codeLanguage: "tsx",
    code: `// Atom: IconButton
export function IconButton({ children, ...props }) {
  return (
    <button className="p-2 rounded-lg hover:bg-slate-100" {...props}>
      {children}
    </button>
  );
}

// Molecule: CommonActions (ghép nhiều IconButton)
export function CommonActions() {
  return (
    <div className="flex gap-2">
      <IconButton>🙂</IconButton>
      <IconButton>＋</IconButton>
    </div>
  );
}`,
    previewComponent: () => (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚛️</span>
          <h4 className="font-semibold text-slate-900">Atomic Design</h4>
        </div>
        <div className="pl-8">
          <CommonActions />
        </div>
      </div>
    ),
  },
  {
    id: "step-4",
    title: "Step 4 — Organism (Ghép thành AI Chat)",
    description: "Molecule + State → Organism hoàn chỉnh",
    codeLanguage: "tsx",
    code: `// Organism: ComposerView
export function ComposerView() {
  const { text, update, submit, isStreaming } = useComposerContext();

  return (
    <div className="border-t p-3 flex items-end gap-3">
      <CommonActions />
      <textarea value={text} onChange={(e) => update(e.target.value)} />
      <Button onClick={() => submit("new")} disabled={isStreaming}>
        {isStreaming ? "Sending…" : "Send"}
      </Button>
    </div>
  );
}`,
    previewComponent: () => (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 border-b border-blue-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
              <span className="text-white text-sm font-bold">AI</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-blue-900">Chat Assistant</p>
              <p className="text-xs text-blue-600">Online</p>
            </div>
          </div>
        </div>
        <ComposerProvider>
          <div className="min-h-[200px] flex flex-col justify-end">
            <ComposerView />
          </div>
        </ComposerProvider>
      </div>
    ),
  },
  {
    id: "step-5",
    title: "Step 5 — Biến thể: Edit Mode",
    description: "Composition: tạo biến thể không cần boolean",
    codeLanguage: "tsx",
    code: `// Biến thể Edit (layout khác, không cần isEditing flag)
export function ComposerEdit() {
  const { text, update, submit, isStreaming } = useComposerContext();
  
  return (
    <div className="border-t p-3 grid gap-2">
      <textarea placeholder="Edit message…" value={text} onChange={...} />
      <div className="flex justify-end gap-2">
        <Button variant="secondary">Cancel</Button>
        <Button onClick={() => submit("edit")}>Save</Button>
      </div>
    </div>
  );
}`,
    previewComponent: () => (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 px-4 py-2 border-b border-amber-100">
          <p className="text-xs font-semibold text-amber-800">✏️ Edit Mode</p>
        </div>
        <ComposerProvider>
          <div className="min-h-[200px] flex flex-col justify-end">
            <ComposerEdit />
          </div>
        </ComposerProvider>
      </div>
    ),
  },
  {
    id: "step-6",
    title: "Step 6 — Forward (Ephemeral Provider)",
    description: "Provider khác → state tạm thời (đóng modal = mất)",
    codeLanguage: "tsx",
    code: `// Provider ephemeral cho Forward
export function ForwardComposerProvider({ children }) {
  const [text, setText] = useState("");

  return (
    <ForwardCtx.Provider
      value={{
        text,
        update: setText,
        submit: async () => {
          // ... xử lý forward
          setText(""); // ephemeral: đóng là mất
        },
      }}
    >
      {children}
    </ForwardCtx.Provider>
  );
}`,
    previewComponent: ForwardModalDemo,
  },
  {
    id: "step-7",
    title: "Step 7 — Lift State Up",
    description: "Nhiều component ở vị trí khác dùng chung state",
    codeLanguage: "tsx",
    code: `// External button ở vị trí khác cũng dùng chung state
function SendBarExternal() {
  const { submit, text } = useComposerContext();
  return (
    <div className="sticky bottom-0 p-3 border-t">
      <Button onClick={() => submit("new")}>Send (external)</Button>
    </div>
  );
}

export default function ChatPage() {
  return (
    <ComposerProvider>
      <div>[Messages]</div>
      <ComposerView />
      <SendBarExternal />
    </ComposerProvider>
  );
}`,
    previewComponent: () => (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-2 border-b border-emerald-100">
          <p className="text-xs font-semibold text-emerald-800">🔗 Shared State</p>
        </div>
        <ComposerProvider>
          <div className="min-h-[300px] flex flex-col">
            <div className="flex-1 p-4 bg-slate-50">
              <p className="text-xs text-slate-500">[Messages]</p>
            </div>
            <ComposerView />
            <SendBarExternal />
          </div>
        </ComposerProvider>
      </div>
    ),
  },
  {
    id: "step-8",
    title: "Step 8 — File Upload Component",
    description: "Headless file upload với preview",
    codeLanguage: "tsx",
    code: `// Headless file upload hook
export function useFileUpload() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const addFiles = (newFiles) => {
    setFiles([...files, ...newFiles]);
  };

  const removeFile = (id) => {
    setFiles(files.filter(f => f.id !== id));
  };

  return { files, addFiles, removeFile, uploading };
}

// UI Component
export function FileUploadZone() {
  const { addFiles } = useFileUpload();
  return (
    <div className="border-2 border-dashed rounded-lg p-4">
      <input type="file" onChange={...} />
      <p>Drop files here</p>
    </div>
  );
}`,
    previewComponent: () => (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
          <div className="flex flex-col items-center gap-2">
            <span className="text-4xl">📎</span>
            <p className="text-sm font-semibold text-slate-700">Drop files or click to upload</p>
            <p className="text-xs text-slate-500">Support: PDF, Images, Documents</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "step-9",
    title: "Step 9 — Mention Component",
    description: "Headless mention/autocomplete cho @user",
    codeLanguage: "tsx",
    code: `// Headless mention hook
export function useMention() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  const handleInput = (text) => {
    if (text.includes("@")) {
      setShowMenu(true);
      // ... fetch suggestions
    }
  };

  return { suggestions, showMenu, handleInput };
}

// UI với mention
export function MentionInput() {
  const { suggestions, showMenu } = useMention();
  return (
    <div>
      <textarea onChange={...} />
      {showMenu && <MentionMenu items={suggestions} />}
    </div>
  );
}`,
    previewComponent: () => (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 space-y-2">
        <div className="relative">
          <textarea 
            className="w-full p-3 border border-slate-300 rounded-lg resize-none"
            placeholder="Type @ to mention..."
            rows={3}
          />
          <div className="absolute bottom-full left-0 mb-2 bg-white border border-slate-200 rounded-lg shadow-xl w-64">
            <div className="p-2 space-y-1">
              {['@alice', '@bob', '@charlie'].map(user => (
                <div key={user} className="px-3 py-2 hover:bg-blue-50 rounded cursor-pointer text-sm">
                  {user}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "step-10",
    title: "Step 10 — Action Buttons (MCP Tools)",
    description: "Headless actions cho Model Context Protocol",
    codeLanguage: "tsx",
    code: `// Headless actions hook
export function useActions() {
  const [selectedAction, setSelectedAction] = useState(null);

  const executeAction = async (action) => {
    // ... call MCP tool
  };

  return { selectedAction, executeAction };
}

// UI with action buttons
export function ActionBar() {
  const { executeAction } = useActions();
  return (
    <div className="flex gap-2">
      <ActionButton icon="🔍" label="Search" onClick={...} />
      <ActionButton icon="📊" label="Analyze" onClick={...} />
      <ActionButton icon="✨" label="Generate" onClick={...} />
    </div>
  );
}`,
    previewComponent: () => (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4">
        <div className="flex flex-wrap gap-2">
          {[
            { icon: '🔍', label: 'Search', color: 'blue' },
            { icon: '📊', label: 'Analyze', color: 'purple' },
            { icon: '✨', label: 'Generate', color: 'pink' },
            { icon: '📝', label: 'Summarize', color: 'green' },
          ].map(action => (
            <button
              key={action.label}
              className={`px-4 py-2 bg-${action.color}-50 hover:bg-${action.color}-100 text-${action.color}-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2`}
            >
              <span>{action.icon}</span>
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "step-11",
    title: "Step 11 — Streaming Response",
    description: "Headless streaming text với animation",
    codeLanguage: "tsx",
    code: `// Headless streaming hook
export function useStreamingResponse() {
  const [text, setText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const startStreaming = async (prompt) => {
    setIsStreaming(true);
    // ... SSE or WebSocket
    for await (const chunk of stream) {
      setText(prev => prev + chunk);
    }
    setIsStreaming(false);
  };

  return { text, isStreaming, startStreaming };
}

// UI
export function StreamingMessage() {
  const { text, isStreaming } = useStreamingResponse();
  return (
    <div>
      <p>{text}</p>
      {isStreaming && <span className="animate-pulse">▊</span>}
    </div>
  );
}`,
    previewComponent: () => (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">AI</span>
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-sm text-slate-700">
              Here's a comprehensive analysis of the data you provided...
              <span className="inline-block ml-1 w-2 h-4 bg-blue-500 animate-pulse"></span>
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Streaming...
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "step-12",
    title: "Step 12 — Tổng hợp: Tất cả Components",
    description: "Tất cả components headless được ghép lại thành AI Chat hoàn chỉnh",
    codeLanguage: "tsx",
    code: `// Tổng hợp tất cả components
export default function AIChatApp() {
  return (
    <ComposerProvider>
      <FileUploadProvider>
        <MentionProvider>
          <ActionsProvider>
            <main>
              {/* Messages với streaming */}
              <StreamingMessage />
              
              {/* File upload zone */}
              <FileUploadZone />
              
              {/* Action buttons */}
              <ActionBar />
              
              {/* Composer với mention */}
              <ComposerView />
            </main>
          </ActionsProvider>
        </MentionProvider>
      </FileUploadProvider>
    </ComposerProvider>
  );
}`,
    previewComponent: () => (
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 px-4 py-3 border-b border-indigo-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-indigo-900">Complete AI Chat</p>
              <p className="text-xs text-indigo-600">All components integrated</p>
            </div>
          </div>
        </div>
        
        <ComposerProvider>
          <div className="min-h-[400px] flex flex-col">
            {/* Messages area */}
            <div className="flex-1 p-4 space-y-4 bg-slate-50">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-700">
                    Here's your analysis...
                    <span className="inline-block ml-1 w-2 h-4 bg-blue-500 animate-pulse"></span>
                  </p>
                </div>
              </div>
            </div>

            {/* File upload preview */}
            <div className="px-4 py-2 border-t border-slate-200 bg-white">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span>📎</span>
                <span>document.pdf</span>
                <span className="text-slate-400">•</span>
                <span>2.3 MB</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="px-4 py-2 border-t border-slate-200 bg-white">
              <div className="flex gap-2">
                <button className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
                  🔍 Search
                </button>
                <button className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-xs font-medium">
                  📊 Analyze
                </button>
              </div>
            </div>

            {/* Composer */}
            <ComposerView />
          </div>
        </ComposerProvider>
      </div>
    ),
  },
  {
    id: "step-13",
    title: "Step 13 — So sánh: Monolith vs Headless",
    description: "Side-by-side comparison: Boolean Hell vs Clean Architecture",
    codeLanguage: "tsx",
    code: `// ❌ Monolith (Boolean Hell)
export function MonolithChat({ isEditing, isForwarding, isThread, isReplying }) {
  return (
    <div>
      {!isForwarding && !isReplying && <button>+</button>}
      {!isEditing && <button>🙂</button>}
      {isThread && <button>💬</button>}
      <textarea placeholder={isEditing ? "Edit..." : isForwarding ? "Forward..." : "Type..."} />
      <Button>{isEditing ? "Save" : isForwarding ? "Forward" : "Send"}</Button>
    </div>
  );
}

// ✅ Headless (Clean)
export function HeadlessChat() {
  return (
    <ComposerProvider>
      <ComposerView />
    </ComposerProvider>
  );
}`,
    previewComponent: () => (
      <div className="space-y-4">
        {/* Monolith */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-red-200 overflow-hidden">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 px-4 py-2 border-b border-red-200">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-red-700">❌ Monolith (Boolean Hell)</p>
              <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">4+ flags</span>
            </div>
          </div>
          <div className="p-4">
            <LegacyMonolithComposer isEditing={false} isForwarding={false} />
            <div className="mt-3 pt-3 border-t border-red-100">
              <p className="text-xs text-red-600">
                ⚠️ Khó mở rộng • Nhiều if/else • Logic lẫn UI
              </p>
            </div>
          </div>
        </div>

        {/* Headless */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-emerald-200 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-2 border-b border-emerald-200">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-emerald-700">✅ Headless (Clean)</p>
              <span className="text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded">0 flags</span>
            </div>
          </div>
          <div className="p-4">
            <ComposerProvider>
              <ComposerView />
            </ComposerProvider>
            <div className="mt-3 pt-3 border-t border-emerald-100">
              <p className="text-xs text-emerald-600">
                ✨ Dễ mở rộng • Composition • Logic tách riêng
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];
