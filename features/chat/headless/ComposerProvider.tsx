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

