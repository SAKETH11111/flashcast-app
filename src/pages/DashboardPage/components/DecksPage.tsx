import { useState, useMemo } from "react";
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
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
} from "lucide-react";
import { DeckCard } from "./DeckCard.tsx";
import { FolderCard } from "./FolderCard.tsx";
import { DeckListItem } from "./DeckListItem.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useDashboard } from "../DashboardLayout.tsx";
import type { Deck, DeckTitle } from "../DashboardLayout.tsx";

type DeckType = Deck["type"];

export function DecksPage() {
  const { decks, handlePinToggle, handleTrash } = useDashboard();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedTypes, setSelectedTypes] = useState<Set<DeckType>>(new Set());
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedDecks, setSelectedDecks] = useState<Set<DeckTitle>>(new Set());

  const [folders, setFolders] = useState([
    { id: 'folder-1', name: "Biology 101", deckCount: 5 },
    { id: 'folder-2', name: "History of Rome", deckCount: 3 },
    { id: 'folder-3', name: "Organic Chemistry", deckCount: 8 },
    { id: 'folder-4', name: "Calculus II", deckCount: 2 },
  ]);

  const activeDecks = useMemo(() => decks.filter(d => d.status === 'active'), [decks]);

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
      const folderId = over.id;
      const deckId = active.id;
      console.log(`Deck ${deckId} was dropped on folder ${folderId}`);
      // Here you would update the state to move the deck into the folder
    }
  }

  const filteredDecks = useMemo(() => activeDecks
    .filter(deck => selectedTypes.size === 0 || selectedTypes.has(deck.type))
    .sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        if (sortOrder === 'asc') return a.lastUpdated.getTime() - b.lastUpdated.getTime();
        return b.lastUpdated.getTime() - a.lastUpdated.getTime();
    }), [activeDecks, selectedTypes, sortOrder]);

  const ActionButton = ({ icon, text, count }: { icon: React.ReactNode, text: string, count: number }) => (
    <Button variant="ghost" className="text-muted-foreground hover:text-foreground gap-2 px-3">
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
        <h1 className="text-4xl font-bold text-left">Decks</h1>
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
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
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
                <ActionButton icon={<FolderInput className="w-5 h-5" />} text="Move to" count={selectedDecks.size} />
                <ActionButton icon={<Share className="w-5 h-5" />} text="Manage sharing" count={selectedDecks.size} />
                <ActionButton icon={<Merge className="w-5 h-5" />} text="Merge set" count={selectedDecks.size} />
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

      {/* Folders Content */}
      <div className="mb-12 w-full">
        <h2 className="text-2xl font-bold mb-6 text-left">Folders</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {folders.map((folder) => (
            <FolderCard key={folder.id} id={folder.id} name={folder.name} deckCount={folder.deckCount} />
          ))}
        </div>
      </div>

      {/* Decks Content */}
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-6 text-left">Decks</h2>
        {view === 'grid' ? (
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