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

