import { Smile, Plus } from "lucide-react";
import { IconButton } from "@/components/atoms/IconButton";

export function CommonActions() {
  return (
    <div className="flex gap-2">
      <IconButton icon={Smile} title="Emoji" aria-label="Add emoji" />
      <IconButton icon={Plus} title="More actions" aria-label="More actions" />
    </div>
  );
}

