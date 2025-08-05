import { Button } from "@/components/ui/button";
import { Globe, Pin, MoreVertical, FileText, TestTube2, BookOpen, Check, Copy, Pen, Printer, FolderInput, ExternalLink, Tag, Merge, Download, Trash2, Undo } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoveToFolderDialog } from './MoveToFolderDialog';
import type { Folder } from '../DashboardLayout';

interface DeckCardProps {
  id: string;
  title: string;
  updated: string;
  type: "Flashcards" | "Notes" | "Exam";
  termCount: number;
  pinned: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
  onPinToggle: () => void;
  onTrash: () => void;
  onRestore?: () => void;
  isTrash?: boolean;
  isSelectMode?: boolean;
  onMoveToFolder?: (folderId: string | null) => void;
  folders?: Folder[];
}

const typeIcons = {
    Flashcards: <BookOpen className="w-4 h-4 mr-2" />,
    Notes: <FileText className="w-4 h-4 mr-2" />,
    Exam: <TestTube2 className="w-4 h-4 mr-2" />,
  }
  
  const typeColors = {
      Flashcards: "bg-blue-500/20 text-blue-300",
      Notes: "bg-green-500/20 text-green-300",
      Exam: "bg-purple-500/20 text-purple-300",
  }
  
  export function DeckCard({ id, title, updated, type, termCount, pinned, isSelected, onSelect, onPinToggle, onTrash, onRestore, isTrash = false, isSelectMode = false, onMoveToFolder, folders = [] }: DeckCardProps) {
    const navigate = useNavigate();
    const {attributes, listeners, setNodeRef, transform, isDragging} = useDraggable({
      id: id,
      disabled: isSelectMode,
    });
  
    const style = {
      transform: CSS.Translate.toString(transform),
      zIndex: isDragging ? 100 : 'auto',
      opacity: isDragging ? 0.5 : 1,
    };
  
    const handleCardClick = () => {
      if (isSelectMode && onSelect) {
        onSelect();
      } else if (!isSelectMode && !isTrash) {
        // Navigate to deck detail page
        navigate(`/deck/${encodeURIComponent(title)}`);
      }
    };
  
    return (
      <div
          ref={setNodeRef}
          style={style}
          className={cn(
              "bg-card border rounded-3xl p-6 flex flex-col justify-between h-64 hover:border-primary/50 transition-all duration-150 relative text-left",
              isSelected ? "border-primary/80" : "border-border/20",
              isSelectMode ? "cursor-pointer" : "cursor-grab"
          )}
          onClick={handleCardClick}
          {...attributes}
          {...listeners}
      >
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                  {isSelectMode && onSelect && (
                      <button
                          className={cn(
                              "w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all flex-shrink-0",
                              isSelected ? "bg-primary border-primary text-primary-foreground" : "bg-transparent border-muted-foreground/50 text-transparent"
                          )}
                          onClick={(e) => {
                              e.stopPropagation();
                              onSelect();
                          }}
                      >
                          <Check className="w-4 h-4" />
                      </button>
                  )}
                  <a href="#" className="flex-grow" onClick={(e) => e.stopPropagation()}>
                      <h3 className="font-bold text-base text-foreground truncate hover:underline">{title}</h3>
                      <p className="text-xs text-muted-foreground">Updated {updated}</p>
                  </a>
              </div>
          </div>
          <div className="mb-4">
              <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${typeColors[type]}`}>
                  {typeIcons[type]}
                  {type} ({termCount})
              </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-accent" onClick={(e) => {
            e.stopPropagation();
            toast.info('Public/Private toggle coming soon!');
          }}>
            <Globe className="w-4 h-4" />
          </Button>
          <div className="flex-grow"></div>
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-accent px-3" onClick={(e) => {
            e.stopPropagation();
            navigate(`/study/${encodeURIComponent(title)}`);
          }}>
            Preview
          </Button>
          {!isTrash && (
              <Button variant="ghost" size="icon" className={cn("text-muted-foreground hover:text-foreground hover:bg-accent", pinned && "text-primary")} onClick={(e) => { e.stopPropagation(); onPinToggle(); }}>
                <Pin className="w-4 h-4" />
              </Button>
          )}
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-accent" onClick={(e) => e.stopPropagation()}>
                    <MoreVertical className="w-4 h-4" />
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border" onPointerDown={(e) => e.stopPropagation()}>
                  {isTrash ? (
                      <>
                          <DropdownMenuItem onClick={onRestore}><Undo className="w-4 h-4 mr-2" />Restore</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500" onClick={() => {
                            if (confirm('Are you sure you want to permanently delete this deck? This action cannot be undone.')) {
                              // This would need permanent delete handler passed as prop
                              toast.error('Permanent delete functionality will be implemented soon');
                            }
                          }}><Trash2 className="w-4 h-4 mr-2" />Delete</DropdownMenuItem>
                      </>
                  ) : (
                      <>
                          <DropdownMenuItem onClick={() => toast.info('Duplicate deck feature coming soon!')}><Copy className="w-4 h-4 mr-2" />Duplicate</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/dashboard/create?edit=${encodeURIComponent(title)}`)}><Pen className="w-4 h-4 mr-2" />Edit this set</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info('PDF export feature coming soon!')}><Printer className="w-4 h-4 mr-2" />Export as PDF</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info('Sharing features coming soon!')}><Globe className="w-4 h-4 mr-2" />Manage sharing</DropdownMenuItem>
                          {onMoveToFolder && (
                            <MoveToFolderDialog 
                              folders={folders} 
                              onMoveToFolder={onMoveToFolder}
                              trigger={
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                  <FolderInput className="w-4 h-4 mr-2" />Move to
                                </DropdownMenuItem>
                              }
                            />
                          )}
                          <DropdownMenuItem onClick={() => window.open(`/deck/${encodeURIComponent(title)}`, '_blank')}><ExternalLink className="w-4 h-4 mr-2" />Open in new tab</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info('Edit tags feature coming soon!')}><Tag className="w-4 h-4 mr-2" />Edit tags</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info('Combine decks feature coming soon!')}><Merge className="w-4 h-4 mr-2" />Combine</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast.info('Export feature coming soon!')}><Download className="w-4 h-4 mr-2" />Export</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={onTrash} className="text-red-500"><Trash2 className="w-4 h-4 mr-2" />Trash this set</DropdownMenuItem>
                      </>
                  )}
              </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  }