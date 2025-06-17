import { Button } from "@/components/ui/button";
import { MoreVertical, Pin, BookOpen, FileText, TestTube2, Check, Copy, Pen, Printer, Globe, FolderInput, ExternalLink, Tag, Merge, Download, Trash2, Undo } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface DeckListItemProps {
  title: string;
  updated: string;
  type: "Flashcards" | "Notes" | "Exam";
  tags: readonly string[];
  pinned: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  onPinToggle: () => void;
  onTrash: () => void;
  onRestore?: () => void;
  isTrash?: boolean;
}

const typeIcons = {
    Flashcards: <BookOpen className="w-5 h-5 text-blue-400" />,
    Notes: <FileText className="w-5 h-5 text-green-400" />,
    Exam: <TestTube2 className="w-5 h-5 text-purple-400" />,
}

const typeBgColors = {
    Flashcards: "bg-blue-500/10",
    Notes: "bg-green-500/10",
    Exam: "bg-purple-500/10",
}

export function DeckListItem({ title, updated, type, tags, pinned, isSelected, onSelect, onPinToggle, onTrash, onRestore, isTrash = false }: DeckListItemProps) {
  return (
    <tr
        className={cn("border-b-2 border-neutral-800 hover:bg-accent/50 cursor-pointer", isSelected && "bg-accent/50")}
        onClick={onSelect}
    >
        <td className="p-4">
            {onSelect && (
                <button
                    className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all",
                        isSelected ? "bg-primary border-primary text-primary-foreground" : "bg-transparent border-muted-foreground/50 text-transparent"
                    )}
                    onClick={(e) => {
                        e.stopPropagation(); // prevent row click from firing
                        onSelect();
                    }}
                >
                    <Check className="w-4 h-4" />
                </button>
            )}
        </td>
      <td className="p-4">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${typeBgColors[type]}`}>
            {typeIcons[type]}
          </div>
          <span className="font-semibold truncate">{title}</span>
        </div>
      </td>
      <td className="p-4 text-muted-foreground">
        <div className="flex gap-2">
            {tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-neutral-700/50 text-neutral-400 rounded-md text-xs font-medium">
                    {tag}
                </span>
            ))}
        </div>
      </td>
      <td className="p-4 text-muted-foreground">{updated}</td>
      <td className="p-4">
        <div className="flex items-center justify-end gap-1">
            {!isTrash && (
                <>
                    <Button variant="ghost" size="icon" className={cn("text-muted-foreground hover:text-foreground", pinned && "text-primary")} onClick={(e) => { e.stopPropagation(); onPinToggle(); }}>
                        <Pin className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                        <Pen className="w-4 h-4" />
                    </Button>
                </>
            )}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={(e) => e.stopPropagation()}>
                        <MoreVertical className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card border-border" onPointerDown={(e) => e.stopPropagation()}>
                    {isTrash ? (
                        <>
                            <DropdownMenuItem onClick={onRestore}><Undo className="w-4 h-4 mr-2" />Restore</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500"><Trash2 className="w-4 h-4 mr-2" />Delete</DropdownMenuItem>
                        </>
                    ) : (
                        <>
                            <DropdownMenuItem><Copy className="w-4 h-4 mr-2" />Duplicate</DropdownMenuItem>
                            <DropdownMenuItem><Printer className="w-4 h-4 mr-2" />Export as PDF</DropdownMenuItem>
                            <DropdownMenuItem><Globe className="w-4 h-4 mr-2" />Manage sharing</DropdownMenuItem>
                            <DropdownMenuItem><FolderInput className="w-4 h-4 mr-2" />Move to</DropdownMenuItem>
                            <DropdownMenuItem><ExternalLink className="w-4 h-4 mr-2" />Open in new tab</DropdownMenuItem>
                            <DropdownMenuItem><Tag className="w-4 h-4 mr-2" />Edit tags</DropdownMenuItem>
                            <DropdownMenuItem><Merge className="w-4 h-4 mr-2" />Combine</DropdownMenuItem>
                            <DropdownMenuItem><Download className="w-4 h-4 mr-2" />Export</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={onTrash} className="text-red-500"><Trash2 className="w-4 h-4 mr-2" />Trash this set</DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </td>
    </tr>
  );
}