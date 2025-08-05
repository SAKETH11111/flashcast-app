import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  FileStack,
  ChevronDown,
  ArrowDown,
  LayoutGrid,
  List,
  ChevronsUpDown,
  X,
  Undo,
  FileX2
} from "lucide-react";
import { DeckCard } from "./DeckCard.tsx";
import { DeckListItem } from "./DeckListItem.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useDashboard } from "../DashboardLayout.tsx";
import type { DeckTitle, DeckType } from "../DashboardLayout.tsx";

export function TrashPage() {
  const { decks, handleRestore, handlePermanentDelete } = useDashboard();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedTypes, setSelectedTypes] = useState<Set<DeckType>>(new Set());
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedTrashItems, setSelectedTrashItems] = useState<Set<DeckTitle>>(new Set());

  const trashedItems = useMemo(() => decks.filter(d => d.status === 'trashed'), [decks]);

  const handleTypeChange = (type: DeckType) => {
    setSelectedTypes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(type)) newSet.delete(type);
      else newSet.add(type);
      return newSet;
    });
  };

  const toggleSortOrder = () => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');

  const handleTrashItemSelect = (title: DeckTitle) => {
    setSelectedTrashItems(prev => {
        const newSet = new Set(prev);
        if (newSet.has(title)) newSet.delete(title);
        else newSet.add(title);
        return newSet;
    });
  }

  const filteredTrashItems = useMemo(() => trashedItems
    .filter(item => selectedTypes.size === 0 || selectedTypes.has(item.type))
    .sort((a, b) => {
        if (sortOrder === 'asc') return a.lastUpdated.getTime() - b.lastUpdated.getTime();
        return b.lastUpdated.getTime() - a.lastUpdated.getTime();
    }), [trashedItems, selectedTypes, sortOrder]);

  const handleSelectAll = () => {
    if (selectedTrashItems.size === filteredTrashItems.length) {
        setSelectedTrashItems(new Set());
    } else {
        setSelectedTrashItems(new Set(filteredTrashItems.map(f => f.title)));
    }
  }

  const handleRestoreClick = () => {
    handleRestore(Array.from(selectedTrashItems));
    setSelectedTrashItems(new Set());
    setIsSelectMode(false);
  }

  const handlePermanentDeleteClick = () => {
    if (confirm(`Are you sure you want to permanently delete ${selectedTrashItems.size} deck${selectedTrashItems.size > 1 ? 's' : ''}? This action cannot be undone.`)) {
      handlePermanentDelete(Array.from(selectedTrashItems));
      setSelectedTrashItems(new Set());
      setIsSelectMode(false);
    }
  }

  const ActionButton = ({ icon, text, count, onClick, disabled }: { icon: React.ReactNode, text: string, count: number, onClick?: () => void, disabled?: boolean }) => (
    <Button variant="ghost" className="text-muted-foreground hover:text-foreground gap-2 px-3" onClick={onClick} disabled={disabled}>
        {count > 0 && <div className="w-5 h-5 bg-foreground text-background text-xs font-bold rounded-full flex items-center justify-center">{count}</div>}
        {icon}
        {text}
    </Button>
  );

  return (
    <div className="flex-1 px-8 py-10 text-white">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Trash</h1>
        <div className="flex items-center gap-4">
            {isSelectMode ? (
                <Button variant="outline" className="bg-transparent text-white border-neutral-700 hover:bg-neutral-800 hover:text-white" onClick={() => { setIsSelectMode(false); setSelectedTrashItems(new Set()); }}>
                    <X className="w-5 h-5 mr-2" />
                    Cancel
                </Button>
            ) : (
                <>
                    <Button variant="outline" className="bg-transparent text-white border-neutral-700 hover:bg-neutral-800 hover:text-white" onClick={() => setIsSelectMode(true)}>
                        <FileStack className="w-5 h-5 mr-2" />
                        Select multiple
                    </Button>
                </>
            )}
        </div>
      </div>

      {/* Controls */}
      {isSelectMode ? (
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-2 flex-wrap">
                <ActionButton icon={<Undo className="w-5 h-5" />} text="Restore" count={selectedTrashItems.size} onClick={handleRestoreClick} disabled={selectedTrashItems.size === 0} />
                <Button variant="ghost" className="text-red-500 hover:text-red-400 gap-2 px-3" disabled={selectedTrashItems.size === 0} onClick={handlePermanentDeleteClick}>
                    {selectedTrashItems.size > 0 && <div className="w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">{selectedTrashItems.size}</div>}
                    <FileX2 className="w-5 h-5" />
                    Delete Permanently
                </Button>
            </div>
            <Button variant="ghost" onClick={handleSelectAll}>
                {selectedTrashItems.size === filteredTrashItems.length ? 'Deselect all' : 'Select all'}
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

      {/* Trash Content */}
      <div>
        {view === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredTrashItems.map((item) => (
                <DeckCard
                    key={item.title}
                    id={item.title}
                    {...item}
                    onTrash={() => {}}
                    onRestore={() => handleRestore([item.title])}
                    onPinToggle={() => {}}
                    isSelected={selectedTrashItems.has(item.title)}
                    onSelect={isSelectMode ? () => handleTrashItemSelect(item.title) : undefined}
                    isTrash
                />
            ))}
            </div>
        ) : (
            <div className="bg-card border border-border/20 rounded-2xl overflow-hidden">
                <table className="w-full">
                    <thead className="border-b border-border/50">
                        <tr className="text-left text-sm font-semibold text-muted-foreground">
                            <th className="p-4">
                                {isSelectMode ? <input type="checkbox" className="cursor-pointer" onChange={handleSelectAll} checked={selectedTrashItems.size === filteredTrashItems.length} /> : null}
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
                        {filteredTrashItems.map((item) => (
                            <DeckListItem
                                key={item.title}
                                {...item}
                                onTrash={() => {}}
                                onRestore={() => handleRestore([item.title])}
                                onPinToggle={() => {}}
                                isSelected={selectedTrashItems.has(item.title)}
                                onSelect={isSelectMode ? () => handleTrashItemSelect(item.title) : undefined}
                                isTrash
                            />
                        ))}
                    </tbody>
                </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}