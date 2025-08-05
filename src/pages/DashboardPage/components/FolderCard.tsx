import { Folder, MoreVertical, Palette, SmilePlus, Copy, FolderInput, PencilLine, Globe, ExternalLink, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDroppable } from '@dnd-kit/core';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';

interface FolderCardProps {
  id: string;
  name: string;
  deckCount: number;
  onTrash: () => void;
  onClick: () => void;
  onRename: (newName: string) => void;
}

export function FolderCard({ id, name, deckCount, onTrash, onClick, onRename }: FolderCardProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(name);

  const handleRename = () => {
    if (newName.trim() && newName !== name) {
      onRename(newName.trim());
    }
    setIsRenaming(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRename();
    } else if (e.key === 'Escape') {
      setNewName(name);
      setIsRenaming(false);
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "bg-card border rounded-3xl p-6 flex items-center gap-4 hover:border-primary/50 transition-all duration-150 cursor-pointer relative text-left group",
        isOver ? "border-primary/80 ring-2 ring-primary/50" : "border-border/20"
      )}
      onClick={!isRenaming ? onClick : undefined}
    >
      <Folder className="w-10 h-10 text-primary" />
      <div className="flex-grow">
        {isRenaming ? (
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleRename}
            onKeyDown={handleKeyPress}
            className="font-bold text-lg bg-transparent border-none p-0 h-auto focus:ring-0 focus:ring-offset-0"
            autoFocus
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <h3 className="font-bold text-lg text-foreground truncate">{name}</h3>
        )}
        <p className="text-sm text-muted-foreground">{deckCount} deck{deckCount !== 1 ? 's' : ''}</p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="absolute top-6 right-6 text-muted-foreground hover:text-foreground hover:bg-accent" onClick={(e) => e.stopPropagation()}>
                <MoreVertical className="w-5 h-5" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-card border-border text-base p-2" onPointerDown={(e) => e.stopPropagation()}>
            <DropdownMenuItem className="text-base" onClick={() => toast.info('Folder colors coming soon!')}><Palette className="w-5 h-5 mr-3" />Change Folder Color</DropdownMenuItem>
            <DropdownMenuItem className="text-base" onClick={() => toast.info('Folder emojis coming soon!')}><SmilePlus className="w-5 h-5 mr-3" />Change Folder Emoji</DropdownMenuItem>
            <DropdownMenuItem className="text-base" onClick={() => toast.info('Duplicate folder coming soon!')}><Copy className="w-5 h-5 mr-3" />Duplicate</DropdownMenuItem>
            <DropdownMenuItem className="text-base" onClick={() => toast.info('Move folder coming soon!')}><FolderInput className="w-5 h-5 mr-3" />Move to</DropdownMenuItem>
            <DropdownMenuItem className="text-base" onClick={() => { setIsRenaming(true); setNewName(name); }}><PencilLine className="w-5 h-5 mr-3" />Rename</DropdownMenuItem>
            <DropdownMenuItem className="text-base" onClick={() => toast.info('Folder sharing coming soon!')}><Globe className="w-5 h-5 mr-3" />Manage sharing</DropdownMenuItem>
            <DropdownMenuItem className="text-base" onClick={() => toast.info('Open in new tab coming soon!')}><ExternalLink className="w-5 h-5 mr-3" />Open in new tab</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500 text-base" onClick={onTrash}><Trash2 className="w-5 h-5 mr-3" />Trash this folder</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}