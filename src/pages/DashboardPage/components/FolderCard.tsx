import { Folder, MoreVertical, Palette, SmilePlus, Copy, FolderInput, PencilLine, Globe, ExternalLink, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDroppable } from '@dnd-kit/core';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface FolderCardProps {
  id: string;
  name: string;
  deckCount: number;
  onTrash: () => void;
}

export function FolderCard({ id, name, deckCount, onTrash }: FolderCardProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "bg-card border rounded-3xl p-6 flex items-center gap-4 hover:border-primary/50 transition-all duration-150 cursor-pointer relative text-left group",
        isOver ? "border-primary/80 ring-2 ring-primary/50" : "border-border/20"
      )}
    >
      <Folder className="w-10 h-10 text-primary" />
      <div className="flex-grow">
        <h3 className="font-bold text-lg text-foreground truncate">{name}</h3>
        <p className="text-sm text-muted-foreground">{deckCount} decks</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="absolute top-6 right-6 text-muted-foreground hover:text-foreground hover:bg-accent" onClick={(e) => e.stopPropagation()}>
                <MoreVertical className="w-5 h-5" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-card border-border text-base p-2" onPointerDown={(e) => e.stopPropagation()}>
            <DropdownMenuItem className="text-base"><Palette className="w-5 h-5 mr-3" />Change Folder Color</DropdownMenuItem>
            <DropdownMenuItem className="text-base"><SmilePlus className="w-5 h-5 mr-3" />Change Folder Emoji</DropdownMenuItem>
            <DropdownMenuItem className="text-base"><Copy className="w-5 h-5 mr-3" />Duplicate</DropdownMenuItem>
            <DropdownMenuItem className="text-base"><FolderInput className="w-5 h-5 mr-3" />Move to</DropdownMenuItem>
            <DropdownMenuItem className="text-base"><PencilLine className="w-5 h-5 mr-3" />Rename</DropdownMenuItem>
            <DropdownMenuItem className="text-base"><Globe className="w-5 h-5 mr-3" />Manage sharing</DropdownMenuItem>
            <DropdownMenuItem className="text-base"><ExternalLink className="w-5 h-5 mr-3" />Open in new tab</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500 text-base" onClick={onTrash}><Trash2 className="w-5 h-5 mr-3" />Trash this folder</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}