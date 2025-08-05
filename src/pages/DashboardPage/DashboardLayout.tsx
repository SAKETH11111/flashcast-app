import { useState, useEffect } from 'react';
import { Outlet, useOutletContext, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { Sidebar } from './components/Sidebar';
import { cn } from '@/lib/utils';
import { Search, Bell, User } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React from 'react';
import type { FlashcardData } from '@/pages/StudyPage/types';

const StreakIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="18" height="18" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M9.03694 24C12.9377 24 16.4405 21.4325 17.605 17.5973C17.8514 16.7861 18.001 15.9249 18 15.0308C17.9956 11.0114 15.1454 6.96942 14.0257 5.53641C13.9171 5.39735 13.7109 5.51089 13.7502 5.6851C13.9485 6.5634 14.2372 8.07558 14.1229 9.01735C14.0429 9.67632 13.8602 10.2147 13.69 10.5989C13.6169 10.7638 13.419 10.6878 13.4381 10.5074C13.519 9.73943 13.5566 8.53444 13.1728 7.61391C12.4699 5.92867 11.1617 5.1469 10.6578 3.62953C10.2307 2.34352 10.5866 0.9032 10.8039 0.233155C10.8503 0.0901149 10.7139 -0.0482382 10.5823 0.0163087C9.75272 0.423456 7.65167 1.61661 6.03855 3.91412C4.48819 6.12226 4.66683 8.75384 4.96046 10.269C4.99816 10.4636 4.68947 10.6258 4.54898 10.491C4.41133 10.3588 4.24801 10.2141 4.05425 10.0571C3.31404 9.4571 3.25537 8.49877 3.3147 7.86695C3.33102 7.69314 3.11026 7.57011 2.99856 7.70068C2.07822 8.77657 -0.00378012 11.591 5.15456e-06 15.0309C0.00132425 16.2296 0.335763 17.4386 0.822252 18.5638C2.26078 21.8908 5.504 24 9.03694 24Z" fill="currentColor"/>
    <path d="M12.5928 18.6134C12.6732 16.5721 11.4313 15.2014 10.6589 14.323C9.72076 13.2559 9.57245 12.1251 9.57295 11.5141C9.57308 11.3565 9.38211 11.2476 9.26694 11.3504C8.48418 12.049 6.58532 13.8759 6.17231 15.4988C5.89967 16.5704 6.07799 17.3989 6.29684 17.9311C6.36614 18.0997 6.17782 18.3031 6.04821 18.1786C5.99934 18.1317 5.95247 18.0814 5.90969 18.0279C5.76303 17.8446 5.6555 17.6483 5.57895 17.4773C5.51312 17.3302 5.34697 17.3376 5.33746 17.4995C5.32088 17.782 5.32578 18.2066 5.3955 18.824C5.50894 19.8283 5.98052 20.5962 6.54672 21.1704C7.92288 22.566 10.1561 22.5299 11.5091 21.1092C12.0888 20.5006 12.5507 19.6838 12.5928 18.6134Z" fill="currentColor"/>
  </svg>
);

const DayCircle = ({ day, active, isToday }: { day: string, active: boolean, isToday: boolean }) => (
  <div className="flex flex-col items-center gap-2">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${active ? 'bg-orange-400' : 'bg-muted'} ${isToday ? 'border-2 border-dashed border-orange-400' : ''}`}>
    </div>
    <span className="text-xs font-bold text-muted-foreground">{day}</span>
  </div>
);

export type DeckType = "Flashcards" | "Notes" | "Exam";
export type DeckStatus = "active" | "trashed";

export interface Deck {
  title: string;
  updated: string;
  type: DeckType;
  termCount: number;
  lastUpdated: Date;
  tags: string[];
  pinned: boolean;
  status: DeckStatus;
  folderId?: string;
}

const initialDecks: Deck[] = [
  { 
    title: "Welcome to Flashcast!", 
    updated: "Demo", 
    type: "Flashcards", 
    termCount: 5, 
    lastUpdated: new Date(), 
    tags: ["Demo", "Tutorial"], 
    pinned: false, 
    status: 'active'
  },
];
export type DeckTitle = string;

const initialFolders = [
  { id: 'folder-1', name: "My Study Folders", deckCount: 0 },
];

export type Folder = (typeof initialFolders)[number];
export type FolderId = Folder["id"];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [isSidebarPinned, setIsSidebarPinned] = useState(false);
  const [decks, setDecks] = useState<Deck[]>(initialDecks);
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

  // Initialize demo flashcards for welcome deck and update folder deck counts
  useEffect(() => {
    const demoCards: FlashcardData[] = [
      { id: '1', term: 'Flashcast', definition: 'An AI-powered flashcard study app that helps you learn more effectively' },
      { id: '2', term: 'Spaced Repetition', definition: 'A learning technique that shows you cards just before you would forget them' },
      { id: '3', term: 'Active Recall', definition: 'The practice of actively retrieving information from memory to strengthen learning' },
      { id: '4', term: 'Study Modes', definition: 'Different ways to study your cards: Learn, Practice Test, Match, and more' },
      { id: '5', term: 'Voice Commands', definition: 'Use voice to flip cards and navigate - try saying "flip" or "next"!' }
    ];
    
    // Only set demo cards if they don't exist
    const existingCards = localStorage.getItem('flashcards_Welcome to Flashcast!');
    if (!existingCards) {
      localStorage.setItem('flashcards_Welcome to Flashcast!', JSON.stringify(demoCards));
    }
  }, []);

  // Update folder deck counts
  useEffect(() => {
    setFolders(prevFolders => prevFolders.map(folder => {
      const deckCount = decks.filter(deck => deck.folderId === folder.id && deck.status === 'active').length;
      return { ...folder, deckCount };
    }));
  }, [decks]);

  const handlePinToggle = (title: DeckTitle) => {
    let isPinned = false;
    setDecks(prevDecks => {
        const newDecks = prevDecks.map(deck => {
            if (deck.title === title) {
                isPinned = !deck.pinned;
                return { ...deck, pinned: isPinned };
            }
            return deck;
        });
        return newDecks;
    });
    toast.success(isPinned ? "Deck pinned" : "Deck unpinned");
  };

  const handleTrash = (titles: DeckTitle[]) => {
    setDecks(prevDecks =>
      prevDecks.map(deck =>
        titles.includes(deck.title) ? { ...deck, status: 'trashed' as const } : deck
      ) as Deck[]
    );
    toast.error(`${titles.length} deck${titles.length > 1 ? 's' : ''} moved to trash`);
  };

  const handleRestore = (titles: DeckTitle[]) => {
    setDecks(prevDecks =>
      prevDecks.map(deck =>
        titles.includes(deck.title) ? { ...deck, status: 'active' as const } : deck
      ) as Deck[]
    );
    toast.success(`${titles.length} deck${titles.length > 1 ? 's' : ''} restored`);
  };

  const handleTrashFolder = (folderId: FolderId) => {
    // Move all decks in this folder back to root
    setDecks(prevDecks => prevDecks.map(deck => 
      deck.folderId === folderId ? { ...deck, folderId: undefined } : deck
    ));
    setFolders(prevFolders => prevFolders.filter(folder => folder.id !== folderId));
    // If we're currently viewing this folder, go back to root
    if (currentFolder === folderId) {
      setCurrentFolder(null);
    }
    toast.error(`Folder moved to trash`);
  };

  const handleCreateFolder = (name: string) => {
    const newFolder: Folder = {
      id: `folder-${Date.now()}`,
      name,
      deckCount: 0
    };
    setFolders(prevFolders => [...prevFolders, newFolder]);
    toast.success(`Folder "${name}" created`);
    return newFolder.id;
  };

  const handleRenameFolder = (folderId: FolderId, newName: string) => {
    setFolders(prevFolders => prevFolders.map(folder => 
      folder.id === folderId ? { ...folder, name: newName } : folder
    ));
    toast.success(`Folder renamed to "${newName}"`);
  };

  const handleMoveDeckToFolder = (deckTitle: DeckTitle, folderId: string | null) => {
    setDecks(prevDecks => prevDecks.map(deck => 
      deck.title === deckTitle ? { ...deck, folderId: folderId || undefined } : deck
    ));
    const folderName = folderId ? folders.find(f => f.id === folderId)?.name : 'root';
    toast.success(`Deck moved to ${folderName || 'root'}`);
  };

  const handleMoveDecksToFolder = (deckTitles: DeckTitle[], folderId: string | null) => {
    setDecks(prevDecks => prevDecks.map(deck => 
      deckTitles.includes(deck.title) ? { ...deck, folderId: folderId || undefined } : deck
    ));
    const folderName = folderId ? folders.find(f => f.id === folderId)?.name : 'root';
    toast.success(`${deckTitles.length} deck${deckTitles.length > 1 ? 's' : ''} moved to ${folderName || 'root'}`);
  };

  const handleOpenFolder = (folderId: string) => {
    setCurrentFolder(folderId);
  };

  const handleBackToRoot = () => {
    setCurrentFolder(null);
  };

  const handlePermanentDelete = (titles: DeckTitle[]) => {
    setDecks(prevDecks => prevDecks.filter(deck => !titles.includes(deck.title)));
    // Also remove from localStorage if it's the demo deck
    titles.forEach(title => {
      localStorage.removeItem(`flashcards_${title}`);
    });
    toast.error(`${titles.length} deck${titles.length > 1 ? 's' : ''} permanently deleted`);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const addDeck = (newDeck: Omit<Deck, 'lastUpdated'> & { lastUpdated?: Date }) => {
    const deckWithDate = {
      ...newDeck,
      lastUpdated: newDeck.lastUpdated || new Date()
    } as Deck;
    setDecks(prevDecks => [deckWithDate, ...prevDecks]);
  };

  return (
    <div className="flex bg-background h-screen font-saira">
      <Sidebar isPinned={isSidebarPinned} onPinChange={setIsSidebarPinned} />
      <Toaster
        theme="dark"
        position="top-center"
        richColors
        toastOptions={{
          classNames: {
            error: 'bg-red-500 text-white',
          },
        }}
      />
      <div className={cn(
        "flex-1 flex flex-col overflow-auto bg-muted/30 transition-all duration-300 ease-in-out",
        isSidebarPinned ? "pl-20" : "pl-20"
      )}>
        <header className="sticky top-0 z-10 bg-transparent backdrop-blur-sm">
          <div className="flex items-center justify-between h-20 px-8 border-b border-border">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                  type="text"
                  placeholder="Search for anything"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-input border-transparent rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/dashboard/create')}
                className="w-10 h-10 bg-primary hover:bg-primary/90 rounded-lg flex items-center justify-center text-primary-foreground transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </button>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2">
                      <StreakIcon className="text-orange-400" />
                      <span className="text-sm font-bold text-foreground">0</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-card text-foreground border border-border p-4 rounded-lg shadow-lg w-80">
                    <div className="flex flex-col items-center gap-4">
                      <div className="flex items-center gap-2">
                        <StreakIcon className="text-muted-foreground w-8 h-10" />
                        <span className="text-5xl font-bold text-muted-foreground">0</span>
                      </div>
                      <p className="text-sm font-bold text-center">2h 45m remaining to start your streak!</p>
                      <div className="flex justify-between w-full p-2 rounded-lg border border-border">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                          <DayCircle key={i} day={day} active={false} isToday={i === 6} />
                        ))}
                      </div>
                      <div className="flex justify-between w-full">
                        <button 
                          onClick={() => toast.info('Streak help coming soon!')}
                          className="text-sm font-bold text-muted-foreground hover:text-foreground"
                        >
                          How to earn a streak
                        </button>
                        <button 
                          onClick={() => toast.info('Calendar feature coming soon!')}
                          className="text-sm font-bold text-white bg-primary px-4 py-2 rounded-full"
                        >
                          View Calendar
                        </button>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => toast.info('Notifications feature coming soon!')}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Bell size={20} />
                </button>
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                  <User size={16} />
                </div>
                <span className="text-sm text-muted-foreground">1,000,250 pts</span>
              </div>
            </div>
          </div>
        </header>
        <Outlet context={{ 
          decks, 
          folders, 
          currentFolder, 
          handlePinToggle, 
          handleTrash, 
          handleRestore, 
          handleTrashFolder, 
          handlePermanentDelete, 
          addDeck, 
          searchQuery,
          handleCreateFolder,
          handleRenameFolder,
          handleMoveDeckToFolder,
          handleMoveDecksToFolder,
          handleOpenFolder,
          handleBackToRoot
        }} />
      </div>
    </div>
  );
}

export function useDashboard() {
    return useOutletContext<{
        decks: Deck[];
        folders: Folder[];
        currentFolder: string | null;
        handlePinToggle: (title: DeckTitle) => void;
        handleTrash: (titles: DeckTitle[]) => void;
        handleRestore: (titles: DeckTitle[]) => void;
        handleTrashFolder: (folderId: FolderId) => void;
        handlePermanentDelete: (titles: DeckTitle[]) => void;
        addDeck: (newDeck: Omit<Deck, 'lastUpdated'> & { lastUpdated?: Date }) => void;
        searchQuery: string;
        handleCreateFolder: (name: string) => string;
        handleRenameFolder: (folderId: FolderId, newName: string) => void;
        handleMoveDeckToFolder: (deckTitle: DeckTitle, folderId: string | null) => void;
        handleMoveDecksToFolder: (deckTitles: DeckTitle[], folderId: string | null) => void;
        handleOpenFolder: (folderId: string) => void;
        handleBackToRoot: () => void;
    }>();
}