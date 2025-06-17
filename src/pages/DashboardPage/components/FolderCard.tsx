import { Folder } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDroppable } from '@dnd-kit/core';

interface FolderCardProps {
  id: string;
  name: string;
  deckCount: number;
}

export function FolderCard({ id, name, deckCount }: FolderCardProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "bg-card border rounded-3xl p-6 flex items-center gap-4 hover:border-primary/50 transition-all duration-150 cursor-pointer relative text-left",
        isOver ? "border-primary/80 ring-2 ring-primary/50" : "border-border/20"
      )}
    >
      <Folder className="w-10 h-10 text-primary" />
      <div className="flex-grow">
        <h3 className="font-bold text-base text-foreground truncate">{name}</h3>
        <p className="text-xs text-muted-foreground">{deckCount} decks</p>
      </div>
    </div>
  );
}