"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, BookOpen, TestTube2, Plus, X, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/ui/particles";
import { useDashboard } from "@/pages/DashboardPage/DashboardLayout";
import type { FlashcardData } from "@/pages/StudyPage/types";
import { toast, Toaster } from "sonner";

interface Card {
  id: string;
  term: string;
  definition: string;
}

const CreateDeckPage: React.FC = () => {
  const navigate = useNavigate();
  const { decks, addDeck } = useDashboard();
  const [deckType, setDeckType] = useState<"Flashcards" | "Notes" | "Exam">("Flashcards");
  const [deckTitle, setDeckTitle] = useState("");
  const [cards, setCards] = useState<Card[]>([
    { id: '1', term: '', definition: '' },
    { id: '2', term: '', definition: '' }
  ]);
  const [currentStep, setCurrentStep] = useState<'basic' | 'cards'>('basic');


  const addCard = () => {
    const newCard: Card = {
      id: Date.now().toString(),
      term: '',
      definition: ''
    };
    setCards(prev => [...prev, newCard]);
  };

  const removeCard = (id: string) => {
    if (cards.length > 1) {
      setCards(prev => prev.filter(card => card.id !== id));
    }
  };

  const updateCard = (id: string, field: 'term' | 'definition', value: string) => {
    setCards(prev => prev.map(card => 
      card.id === id ? { ...card, [field]: value } : card
    ));
  };

  const handleKeyDown = (e: React.KeyboardEvent, cardId: string, field: 'term' | 'definition') => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (field === 'term') {
        // Focus definition field
        const definitionInput = document.querySelector(`[data-card-id="${cardId}"][data-field="definition"]`) as HTMLTextAreaElement;
        definitionInput?.focus();
      } else {
        // Add new card if this is the last card
        const cardIndex = cards.findIndex(card => card.id === cardId);
        if (cardIndex === cards.length - 1) {
          addCard();
          // Focus the term field of the new card after it's added
          setTimeout(() => {
            const newCards = document.querySelectorAll('[data-field="term"]');
            const lastTermInput = newCards[newCards.length - 1] as HTMLInputElement;
            lastTermInput?.focus();
          }, 100);
        } else {
          // Focus next card's term field
          const nextCard = cards[cardIndex + 1];
          if (nextCard) {
            const nextTermInput = document.querySelector(`[data-card-id="${nextCard.id}"][data-field="term"]`) as HTMLInputElement;
            nextTermInput?.focus();
          }
        }
      }
    }
  };

  const handleNext = () => {
    if (!deckTitle.trim()) {
      toast.error('Please enter a deck title');
      return;
    }
    setCurrentStep('cards');
  };

  const handleBack = () => {
    if (currentStep === 'cards') {
      setCurrentStep('basic');
    } else {
      navigate('/dashboard');
    }
  };

  const handleCreateDeck = () => {
    // Validate cards
    const validCards = cards.filter(card => card.term.trim() && card.definition.trim());
    
    if (validCards.length === 0) {
      toast.error('Please add at least one complete card with both term and definition');
      return;
    }

    // Check for duplicate deck title
    const existingDeck = decks.find(deck => deck.title.toLowerCase() === deckTitle.trim().toLowerCase());
    if (existingDeck) {
      toast.error('A deck with this title already exists');
      return;
    }

    // Create new deck object matching the existing Deck type
    const newDeck = {
      title: deckTitle.trim(),
      updated: 'now',
      type: deckType,
      termCount: validCards.length,
      lastUpdated: new Date(),
      tags: [deckType] as string[],
      pinned: false,
      status: 'active' as const
    };

    // Add to decks state
    addDeck(newDeck);
    
    // Store cards data (in a real app, this would be persisted to a database)
    // For now, we'll store it in localStorage with the deck title as key
    const flashcards: FlashcardData[] = validCards.map((card) => ({
      id: card.id,
      term: card.term.trim(),
      definition: card.definition.trim()
    }));
    
    localStorage.setItem(`flashcards_${deckTitle.trim()}`, JSON.stringify(flashcards));
    
    toast.success(`Deck "${deckTitle}" created with ${validCards.length} cards!`);
    
    // Navigate back to dashboard
    navigate('/dashboard');
  };

  const deckTypeOptions = [
    {
      type: "Flashcards" as const,
      icon: <BookOpen className="w-6 h-6" />,
      title: "Flashcards",
      description: "Create cards with terms and definitions"
    },
    {
      type: "Notes" as const,
      icon: <FileText className="w-6 h-6" />,
      title: "Notes",
      description: "Create study notes and summaries"
    },
    {
      type: "Exam" as const,
      icon: <TestTube2 className="w-6 h-6" />,
      title: "Exam",
      description: "Create practice exams and tests"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden">
      <Toaster
        theme="dark"
        position="top-center"
        richColors
      />
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
        <div className="flex items-center justify-between p-4 md:p-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <h1 className="text-2xl font-bold text-foreground">Create New Deck</h1>
          
          <div className="w-10 h-10" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 max-w-4xl mx-auto w-full">
          {currentStep === 'basic' ? (
            <div className="w-full max-w-2xl space-y-8">
              {/* Deck Title Input */}
              <div className="space-y-2">
                <label htmlFor="deck-title" className="text-sm font-medium text-foreground">
                  Deck Title
                </label>
                <input
                  id="deck-title"
                  type="text"
                  value={deckTitle}
                  onChange={(e) => setDeckTitle(e.target.value)}
                  placeholder="Enter deck title..."
                  className="w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {/* Deck Type Selection */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-foreground">
                  Deck Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {deckTypeOptions.map((option) => (
                    <button
                      key={option.type}
                      onClick={() => setDeckType(option.type)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        deckType === option.type
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg ${
                          deckType === option.type ? "bg-primary/20" : "bg-muted"
                        }`}>
                          {option.icon}
                        </div>
                        <h3 className="font-semibold text-foreground">{option.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-center pt-4">
                <Button
                  onClick={handleNext}
                  disabled={!deckTitle.trim()}
                  className="px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next: Add Cards
                </Button>
              </div>
            </div>
          ) : (
            <div className="w-full space-y-6">
              {/* Header */}
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-foreground">{deckTitle}</h2>
                <p className="text-muted-foreground">Add flashcards to your {deckType.toLowerCase()} deck</p>
                <p className="text-xs text-muted-foreground">Tip: Press Enter to move between fields and add new cards</p>
              </div>

              {/* Progress indicator */}
              <div className="flex items-center justify-between text-sm text-muted-foreground bg-muted/30 rounded-lg p-3">
                <span>Cards: {cards.length}</span>
                <span>Complete: {cards.filter(card => card.term.trim() && card.definition.trim()).length}</span>
                <span>Ready to create: {cards.filter(card => card.term.trim() && card.definition.trim()).length > 0 ? 'Yes' : 'No'}</span>
              </div>

              {/* Cards List */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {cards.map((card, index) => {
                  const isCardComplete = card.term.trim() && card.definition.trim();
                  return (
                  <div key={card.id} className={`bg-card border rounded-lg p-4 transition-all relative ${
                    isCardComplete ? 'border-green-500/30 bg-green-500/5' : 'border-border'
                  }`}>
                    <div className="flex items-start gap-4">
                      <div className="flex items-center gap-2 pt-2">
                        <GripVertical className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground w-6">{index + 1}</span>
                      </div>
                      
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Term</label>
                          <input
                            type="text"
                            value={card.term}
                            onChange={(e) => updateCard(card.id, 'term', e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, card.id, 'term')}
                            placeholder="Enter term..."
                            data-card-id={card.id}
                            data-field="term"
                            className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Definition</label>
                          <textarea
                            value={card.definition}
                            onChange={(e) => updateCard(card.id, 'definition', e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, card.id, 'definition')}
                            placeholder="Enter definition..."
                            rows={2}
                            data-card-id={card.id}
                            data-field="definition"
                            className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                          />
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeCard(card.id)}
                          disabled={cards.length <= 1}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Completion indicator */}
                    <div className="absolute top-2 right-12">
                      {isCardComplete && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                  )
                })}
              </div>

              {/* Add Card Button */}
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={addCard}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Card
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="px-6 py-2"
                >
                  Back
                </Button>
                
                <Button
                  onClick={handleCreateDeck}
                  disabled={cards.every(card => !card.term.trim() || !card.definition.trim())}
                  className="px-8 py-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cards.filter(card => card.term.trim() && card.definition.trim()).length === 0 
                    ? 'Add cards to create deck' 
                    : `Create Deck (${cards.filter(card => card.term.trim() && card.definition.trim()).length} cards)`
                  }
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateDeckPage;