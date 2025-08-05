import { useState, useMemo } from "react";
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  FileStack,
  Plus,
  ChevronDown,
  ArrowDown,
  LayoutGrid,
  List,
  ChevronsUpDown,
  X,
  FolderInput,
  Share,
  Trash2,
  Merge,
  BookOpen,
  ArrowLeft,
} from "lucide-react";
import { DeckCard } from "./DeckCard.tsx";
import { FolderCard } from "./FolderCard.tsx";
import { DeckListItem } from "./DeckListItem.tsx";
import { CreateFolderDialog } from "./CreateFolderDialog.tsx";
import { MoveToFolderDialog } from "./MoveToFolderDialog.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useDashboard } from "../DashboardLayout.tsx";
import type { DeckTitle, DeckType } from "../DashboardLayout.tsx";
import { toast } from "sonner";

export function DecksPage() {
  const navigate = useNavigate();
  const { 
    decks, 
    folders, 
    currentFolder, 
    handlePinToggle, 
    handleTrash, 
    handleTrashFolder, 
    handleCreateFolder,
    handleRenameFolder,
    handleMoveDeckToFolder,
    handleMoveDecksToFolder,
    handleOpenFolder,
    handleBackToRoot,
    searchQuery 
  } = useDashboard();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedTypes, setSelectedTypes] = useState<Set<DeckType>>(new Set());
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedDecks, setSelectedDecks] = useState<Set<DeckTitle>>(new Set());

  const activeDecks = useMemo(() => {
    const filtered = decks.filter(d => d.status === 'active');
    // Filter by current folder
    if (currentFolder) {
      return filtered.filter(d => d.folderId === currentFolder);
    } else {
      return filtered.filter(d => !d.folderId); // Only show decks not in any folder
    }
  }, [decks, currentFolder]);

  const currentFolderData = useMemo(() => {
    return currentFolder ? folders.find(f => f.id === currentFolder) : null;
  }, [currentFolder, folders]);

  const handleTypeChange = (type: DeckType) => {
    setSelectedTypes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(type)) newSet.delete(type);
      else newSet.add(type);
      return newSet;
    });
  };

  const toggleSortOrder = () => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');

  const handleDeckSelect = (title: DeckTitle) => {
    setSelectedDecks(prev => {
        const newSet = new Set(prev);
        if (newSet.has(title)) newSet.delete(title);
        else newSet.add(title);
        return newSet;
    });
  }

  const handleSelectAll = () => {
    if (selectedDecks.size === filteredDecks.length) {
        setSelectedDecks(new Set());
    } else {
        setSelectedDecks(new Set(filteredDecks.map(d => d.title)));
    }
  }

  const handleTrashClick = () => {
    handleTrash(Array.from(selectedDecks));
    setSelectedDecks(new Set());
    setIsSelectMode(false);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (over && over.id.toString().startsWith('folder-')) {
      const deckTitle = active.id.toString();
      const folderId = over.id.toString();
      handleMoveDeckToFolder(deckTitle, folderId);
    }
  }

  const filteredDecks = useMemo(() => activeDecks
    .filter(deck => {
      const matchesType = selectedTypes.size === 0 || selectedTypes.has(deck.type);
      const matchesSearch = !searchQuery || 
        deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deck.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesType && matchesSearch;
    })
    .sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        if (sortOrder === 'asc') return a.lastUpdated.getTime() - b.lastUpdated.getTime();
        return b.lastUpdated.getTime() - a.lastUpdated.getTime();
    }), [activeDecks, selectedTypes, sortOrder, searchQuery]);

  const ActionButton = ({ icon, text, count, onClick }: { icon: React.ReactNode, text: string, count: number, onClick?: () => void }) => (
    <Button variant="ghost" className="text-muted-foreground hover:text-foreground gap-2 px-3" onClick={onClick} disabled={count === 0}>
        {count > 0 && <div className="w-5 h-5 bg-foreground text-background text-xs font-bold rounded-full flex items-center justify-center">{count}</div>}
        {icon}
        {text}
    </Button>
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex-1 px-64 py-10 text-white">
        <div className="w-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col gap-2">
            {currentFolder && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleBackToRoot}
                  className="text-muted-foreground hover:text-foreground px-2 py-1 h-auto rounded-md flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to all decks
                </Button>
              </div>
            )}
            <h1 className="text-4xl font-bold text-left">
              {currentFolder ? currentFolderData?.name : 'Decks'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {isSelectMode ? (
                <Button variant="outline" className="bg-transparent text-white border-neutral-700 hover:bg-neutral-800 hover:text-white" onClick={() => { setIsSelectMode(false); setSelectedDecks(new Set()); }}>
                    <X className="w-5 h-5 mr-2" />
                    Cancel
                </Button>
            ) : (
                <>
                    <Button variant="outline" className="bg-transparent text-white border-neutral-700 hover:bg-neutral-800 hover:text-white" onClick={() => setIsSelectMode(true)}>
                        <FileStack className="w-5 h-5 mr-2" />
                        Select multiple
                    </Button>
                    {!currentFolder && (
                      <CreateFolderDialog onCreateFolder={handleCreateFolder} />
                    )}
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => navigate('/dashboard/create')}>
                        <Plus className="w-5 h-5 mr-2" />
                        Create
                    </Button>
                </>
            )}
        </div>
      </div>

      {/* Controls */}
      {isSelectMode ? (
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-2 flex-wrap">
                <MoveToFolderDialog 
                  folders={folders} 
                  onMoveToFolder={(folderId) => handleMoveDecksToFolder(Array.from(selectedDecks), folderId)}
                  selectedCount={selectedDecks.size}
                  trigger={
                    <Button variant="ghost" className="text-muted-foreground hover:text-foreground gap-2 px-3" disabled={selectedDecks.size === 0}>
                      {selectedDecks.size > 0 && <div className="w-5 h-5 bg-foreground text-background text-xs font-bold rounded-full flex items-center justify-center">{selectedDecks.size}</div>}
                      <FolderInput className="w-5 h-5" />
                      Move to
                    </Button>
                  }
                />
                <ActionButton icon={<Share className="w-5 h-5" />} text="Manage sharing" count={selectedDecks.size} onClick={() => toast.info('Sharing features coming soon!')} />
                <ActionButton icon={<Merge className="w-5 h-5" />} text="Merge set" count={selectedDecks.size} onClick={() => toast.info('Merge decks feature coming soon!')} />
                <Button variant="ghost" className="text-red-500 hover:text-red-400 gap-2 px-3" onClick={handleTrashClick} disabled={selectedDecks.size === 0}>
                    {selectedDecks.size > 0 && <div className="w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">{selectedDecks.size}</div>}
                    <Trash2 className="w-5 h-5" />
                    Move to trash
                </Button>
            </div>
            <Button variant="ghost" onClick={handleSelectAll}>
                {selectedDecks.size === filteredDecks.length ? 'Deselect all' : 'Select all'}
            </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="bg-neutral-800 text-white border-neutral-700 hover:bg-neutral-700">
                            Type {selectedTypes.size > 0 && `(${selectedTypes.size})`}
                            <ChevronDown className="w-4 h-4 ml-2" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-card border-border text-foreground">
                        <DropdownMenuCheckboxItem checked={selectedTypes.has("Flashcards")} onCheckedChange={() => handleTypeChange("Flashcards")}>Flashcards</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked={selectedTypes.has("Notes")} onCheckedChange={() => handleTypeChange("Notes")}>Notes</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked={selectedTypes.has("Exam")} onCheckedChange={() => handleTypeChange("Exam")}>Exam</DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="hover:bg-neutral-800" onClick={toggleSortOrder}>
                    <ArrowDown className={cn("w-5 h-5 transition-transform", sortOrder === 'asc' && 'rotate-180')} />
                </Button>
                <span className="text-sm">Last Updated</span>
                <div className="flex items-center gap-1 p-1 rounded-md bg-neutral-800 ml-2">
                    <Button variant="ghost" size="icon" className={cn("hover:bg-neutral-700", view === 'grid' && 'bg-neutral-700')} onClick={() => setView('grid')}>
                        <LayoutGrid className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className={cn("hover:bg-neutral-700", view === 'list' && 'bg-neutral-700')} onClick={() => setView('list')}>
                        <List className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
      )}

      {/* Folders Content - Only show when not inside a folder */}
      {!currentFolder && (
        <div className="mb-12 w-full">
          <h2 className="text-2xl font-bold mb-6 text-left">Folders</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {folders.map((folder) => (
              <FolderCard 
                key={folder.id} 
                {...folder} 
                onTrash={() => handleTrashFolder(folder.id)}
                onClick={() => handleOpenFolder(folder.id)}
                onRename={(newName) => handleRenameFolder(folder.id, newName)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Decks Content */}
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-6 text-left">
          {currentFolder ? 'Decks in this folder' : 'Decks'}
        </h2>
        {filteredDecks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
              <BookOpen className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              {currentFolder ? 'No decks in this folder' : 'No decks found'}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              {currentFolder 
                ? 'This folder is empty. Create a new deck or move existing decks here.'
                : searchQuery 
                  ? 'No decks match your search criteria.'
                  : 'Get started by creating your first deck!'}
            </p>
            <Button 
              onClick={() => navigate('/dashboard/create')} 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Deck
            </Button>
          </div>
        ) : view === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredDecks.map((deck) => (
                <DeckCard
                    key={deck.title}
                    id={deck.title}
                    {...deck}
                    isSelected={selectedDecks.has(deck.title)}
                    onSelect={isSelectMode ? () => handleDeckSelect(deck.title) : undefined}
                    onPinToggle={() => handlePinToggle(deck.title)}
                    onTrash={() => handleTrash([deck.title])}
                    isSelectMode={isSelectMode}
                    onMoveToFolder={(folderId) => handleMoveDeckToFolder(deck.title, folderId)}
                    folders={folders}
                />
            ))}
            </div>
        ) : (
            <div className="bg-card border border-border/20 rounded-2xl overflow-hidden">
                <table className="w-full">
                    <thead className="border-b border-border/50">
                        <tr className="text-left text-sm font-semibold text-muted-foreground">
                            <th className="p-4">
                                {isSelectMode ? <input type="checkbox" className="cursor-pointer" onChange={handleSelectAll} checked={selectedDecks.size === filteredDecks.length} /> : null}
                            </th>
                            <th className="p-4 flex items-center gap-2 cursor-pointer" onClick={toggleSortOrder}>
                                Name <ChevronsUpDown className="w-4 h-4" />
                            </th>
                            <th className="p-4">Tags</th>
                            <th className="p-4 cursor-pointer flex items-center gap-2" onClick={toggleSortOrder}>
                                Modified <ArrowDown className={cn("w-4 h-4 transition-transform", sortOrder === 'asc' && 'rotate-180')} />
                            </th>
                            <th className="p-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDecks.map((deck) => (
                            <DeckListItem
                                key={deck.title}
                                {...deck}
                                isSelected={selectedDecks.has(deck.title)}
                                onSelect={isSelectMode ? () => handleDeckSelect(deck.title) : undefined}
                                onPinToggle={() => handlePinToggle(deck.title)}
                                onTrash={() => handleTrash([deck.title])}
                                onMoveToFolder={(folderId) => handleMoveDeckToFolder(deck.title, folderId)}
                                folders={folders}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
          )}
        </div>
      </div>
    </div>
    </DndContext>
  );
}