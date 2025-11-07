import { useCallback, useState } from "react";

export function useComposer() {
  const [text, setText] = useState("");
  const [isStreaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = useCallback((v: string) => setText(v), []);

  const submit = useCallback(async (mode: "new" | "edit" | "forward" = "new") => {
    try {
      setStreaming(true);
      setError(null);
      // Giả lập hành vi khác nhau theo mode
      await new Promise((r) => setTimeout(r, 600));
      // Simulate different behaviors based on mode
      console.log(`Submitting in ${mode} mode:`, text);
    } catch (e) {
      setError("Failed to send");
    } finally {
      setStreaming(false);
      setText("");
    }
  }, [text]);

  return { text, update, submit, isStreaming, error };
}

