import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, TestTube2, Brain, Zap, Target, Edit, Volume2, Lightbulb, MoreVertical, Pin, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Particles } from '@/components/ui/particles';
import type { FlashcardData } from '@/pages/StudyPage/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface StudyMode {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  route: string;
}

const studyModes: StudyMode[] = [
  {
    id: 'learn',
    name: 'Learn',
    description: 'Study all cards in this set',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'bg-blue-500',
    route: '/study'
  },
  {
    id: 'practice',
    name: 'Practice Test',
    description: 'Test your knowledge with practice questions',
    icon: <TestTube2 className="w-6 h-6" />,
    color: 'bg-green-500',
    route: '/study'
  },
  {
    id: 'spaced',
    name: 'Spaced Repetition',
    description: 'Smart review based on your progress',
    icon: <Brain className="w-6 h-6" />,
    color: 'bg-purple-500',
    route: '/study'
  },
  {
    id: 'match',
    name: 'Match',
    description: 'Match terms with their definitions',
    icon: <Target className="w-6 h-6" />,
    color: 'bg-orange-500',
    route: '/study'
  },
  {
    id: 'flashcards',
    name: 'Flashcards',
    description: 'Classic flashcard study mode',
    icon: <Zap className="w-6 h-6" />,
    color: 'bg-yellow-500',
    route: '/study'
  }
];

const DeckDetailPage: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [selectedCard, setSelectedCard] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!deckId) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate slight loading delay for better UX
    setTimeout(() => {
      // Load flashcards from localStorage
      const storedCards = localStorage.getItem(`flashcards_${decodeURIComponent(deckId)}`);
      if (storedCards) {
        try {
          setFlashcards(JSON.parse(storedCards));
        } catch (error) {
          console.error('Error parsing flashcards:', error);
          setFlashcards([]);
        }
      } else {
        // Demo cards for the welcome deck
        if (decodeURIComponent(deckId) === 'Welcome to Flashcast!') {
          const demoCards: FlashcardData[] = [
            { id: '1', term: 'Flashcast', definition: 'An AI-powered flashcard study app that helps you learn more effectively' },
            { id: '2', term: 'Spaced Repetition', definition: 'A learning technique that shows you cards just before you would forget them' },
            { id: '3', term: 'Active Recall', definition: 'The practice of actively retrieving information from memory to strengthen learning' },
            { id: '4', term: 'Study Modes', definition: 'Different ways to study your cards: Learn, Practice Test, Match, and more' },
            { id: '5', term: 'Voice Commands', definition: 'Use voice to flip cards and navigate - try saying "flip" or "next"!' }
          ];
          setFlashcards(demoCards);
        } else {
          setFlashcards([]);
        }
      }
      setIsLoading(false);
    }, 200);
  }, [deckId]);

  const handleStudyMode = (mode: StudyMode) => {
    if (!deckId) return;
    navigate(`${mode.route}/${encodeURIComponent(deckId)}?mode=${mode.id}`);
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleEditCard = (cardId: string, field: 'term' | 'definition', value: string) => {
    setIsEditing(`${cardId}-${field}`);
    setEditValue(value);
  };

  const handleSaveEdit = () => {
    if (!isEditing || !deckId) return;
    
    const [cardId, field] = isEditing.split('-');
    const updatedCards = flashcards.map(card => 
      card.id === cardId 
        ? { ...card, [field]: editValue }
        : card
    );
    
    setFlashcards(updatedCards);
    localStorage.setItem(`flashcards_${decodeURIComponent(deckId)}`, JSON.stringify(updatedCards));
    setIsEditing(null);
    setEditValue('');
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setEditValue('');
  };

  if (!deckId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Deck not found</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-background relative overflow-hidden">
        <Particles
          className="absolute inset-0 z-0"
          quantity={200}
          size={0.3}
          vx={0.02}
          vy={0.02}
          ease={60}
          staticity={40}
        />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading deck...</p>
          </div>
        </div>
      </div>
    );
  }

  const deckTitle = decodeURIComponent(deckId);
  const studiedCount = Math.floor(flashcards.length * 0.6); // Mock studied count

  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden">
      <Particles
        className="absolute inset-0 z-0"
        quantity={200}
        size={0.3}
        vx={0.02}
        vy={0.02}
        ease={60}
        staticity={40}
      />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border/20">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <h1 className="text-2xl font-bold text-foreground">{deckTitle}</h1>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card border-border">
              <DropdownMenuItem><Pin className="w-4 h-4 mr-2" />Pin this deck</DropdownMenuItem>
              <DropdownMenuItem><Edit className="w-4 h-4 mr-2" />Edit deck info</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500"><Trash2 className="w-4 h-4 mr-2" />Delete deck</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex-1 p-4 md:p-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Deck Stats */}
            <div className="bg-card border border-border/20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-2">{deckTitle}</h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{flashcards.length} cards</span>
                    <span>•</span>
                    <span>{studiedCount} studied</span>
                    <span>•</span>
                    <span>Last studied 2 days ago</span>
                  </div>
                </div>
                <Button 
                  onClick={() => setIsEditing('editing-mode')}
                  variant="outline" 
                  className="flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit flashcards
                </Button>
              </div>
            </div>

            {/* Study Modes */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-6">Choose a study mode</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {studyModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => handleStudyMode(mode)}
                    className="bg-card border border-border/20 rounded-2xl p-6 text-left hover:border-primary/50 transition-all group"
                  >
                    <div className={`w-12 h-12 rounded-xl ${mode.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                      {mode.icon}
                    </div>
                    <h4 className="font-bold text-foreground mb-2">{mode.name}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{mode.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Flashcard Preview/Editor */}
            {flashcards.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-foreground">
                    {isEditing === 'editing-mode' ? 'Edit flashcards' : 'Preview flashcards'}
                  </h3>
                  {isEditing === 'editing-mode' && (
                    <Button 
                      onClick={() => setIsEditing(null)}
                      variant="outline"
                    >
                      Done editing
                    </Button>
                  )}
                </div>

                {/* Card Navigation */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCard(Math.max(0, selectedCard - 1))}
                    disabled={selectedCard === 0}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {selectedCard + 1} of {flashcards.length}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedCard(Math.min(flashcards.length - 1, selectedCard + 1))}
                    disabled={selectedCard === flashcards.length - 1}
                  >
                    Next
                  </Button>
                </div>

                {/* Flashcard */}
                <div className="bg-card border border-border/20 rounded-2xl p-8 max-w-2xl mx-auto">
                  <div className="space-y-6">
                    {/* Term */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-muted-foreground">TERM</label>
                        {isEditing === 'editing-mode' && (
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Volume2 className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Lightbulb className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                      {isEditing === `${flashcards[selectedCard]?.id}-term` ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            autoFocus
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={handleSaveEdit}>Save</Button>
                            <Button size="sm" variant="outline" onClick={handleCancelEdit}>Cancel</Button>
                          </div>
                        </div>
                      ) : (
                        <div 
                          className={`text-lg font-medium text-foreground ${isEditing === 'editing-mode' ? 'cursor-pointer hover:bg-muted/20 p-2 rounded' : ''}`}
                          onClick={() => isEditing === 'editing-mode' && handleEditCard(flashcards[selectedCard]?.id, 'term', flashcards[selectedCard]?.term)}
                        >
                          {flashcards[selectedCard]?.term}
                        </div>
                      )}
                    </div>

                    {/* Definition */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-muted-foreground">DEFINITION</label>
                        {isEditing === 'editing-mode' && (
                          <Button 
                            size="sm" 
                            variant="ghost"
                            className="text-xs"
                          >
                            Get a hint
                          </Button>
                        )}
                      </div>
                      {isEditing === `${flashcards[selectedCard]?.id}-definition` ? (
                        <div className="space-y-2">
                          <textarea
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px] resize-none"
                            autoFocus
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={handleSaveEdit}>Save</Button>
                            <Button size="sm" variant="outline" onClick={handleCancelEdit}>Cancel</Button>
                          </div>
                        </div>
                      ) : (
                        <div 
                          className={`text-foreground leading-relaxed ${isEditing === 'editing-mode' ? 'cursor-pointer hover:bg-muted/20 p-2 rounded min-h-[100px]' : ''}`}
                          onClick={() => isEditing === 'editing-mode' && handleEditCard(flashcards[selectedCard]?.id, 'definition', flashcards[selectedCard]?.definition)}
                        >
                          {flashcards[selectedCard]?.definition}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeckDetailPage;