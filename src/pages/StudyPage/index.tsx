"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/ui/particles";
import { Flashcard } from "./components/Flashcard";
import { StudyControls } from "./components/StudyControls";
import { ProgressBar } from "./components/ProgressBar";
import { VoiceButton } from "./components/VoiceButton";
import type { FlashcardData, StudySession } from "./types";

export type { FlashcardData, StudySession } from "./types";

const mockCards: FlashcardData[] = [
  {
    id: "1",
    term: "Photosynthesis",
    definition: "The process by which plants use sunlight, water, and carbon dioxide to produce oxygen and energy in the form of sugar."
  },
  {
    id: "2",
    term: "Mitochondria",
    definition: "The powerhouse of the cell, responsible for producing ATP through cellular respiration."
  },
  {
    id: "3",
    term: "DNA",
    definition: "Deoxyribonucleic acid - a molecule that carries genetic information in all living organisms."
  },
  {
    id: "4",
    term: "Ecosystem",
    definition: "A biological community of interacting organisms and their physical environment."
  },
  {
    id: "5",
    term: "Gravity",
    definition: "A force that attracts objects with mass towards each other, keeping planets in orbit around stars."
  },
  {
    id: "6",
    term: "Photon",
    definition: "A particle of light with no mass that carries electromagnetic energy."
  },
  {
    id: "7",
    term: "Evolution",
    definition: "The process by which species change over time through natural selection and genetic variation."
  },
  {
    id: "8",
    term: "Atom",
    definition: "The smallest unit of matter that retains the properties of an element."
  },
  {
    id: "9",
    term: "Enzyme",
    definition: "A protein that acts as a catalyst to speed up chemical reactions in living organisms."
  },
  {
    id: "10",
    term: "Neuron",
    definition: "A nerve cell that transmits electrical signals throughout the nervous system."
  },
  {
    id: "11",
    term: "Chromosome",
    definition: "A structure containing DNA and proteins found in the nucleus of cells."
  },
  {
    id: "12",
    term: "Osmosis",
    definition: "The movement of water molecules through a semi-permeable membrane from low to high solute concentration."
  },
  {
    id: "13",
    term: "Catalyst",
    definition: "A substance that speeds up a chemical reaction without being consumed in the process."
  },
  {
    id: "14",
    term: "Mutation",
    definition: "A change in the DNA sequence that can lead to variations in traits."
  },
  {
    id: "15",
    term: "Homeostasis",
    definition: "The ability of an organism to maintain stable internal conditions despite external changes."
  }
];

const StudyPage: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  
  const [session, setSession] = useState<StudySession>({
    deckId: deckId || "sample",
    deckName: "Sample Biology Deck",
    cards: mockCards,
    currentIndex: 0,
    correctCount: 0,
    incorrectCount: 0
  });

  const [isFlipped, setIsFlipped] = useState(false);
  const [direction, setDirection] = useState(0);

  const currentCard = session.cards[session.currentIndex];

  const handleNext = useCallback(() => {
    if (session.currentIndex < session.cards.length - 1) {
      setDirection(1);
      setSession(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1
      }));
      setIsFlipped(false);
    }
  }, [session.currentIndex, session.cards.length]);

  const handlePrevious = useCallback(() => {
    if (session.currentIndex > 0) {
      setDirection(-1);
      setSession(prev => ({
        ...prev,
        currentIndex: prev.currentIndex - 1
      }));
      setIsFlipped(false);
    }
  }, [session.currentIndex]);

  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  const handleMarkKnown = useCallback((known: boolean) => {
    setSession(prev => ({
      ...prev,
      cards: prev.cards.map((card, index) => 
        index === prev.currentIndex 
          ? { ...card, known }
          : card
      ),
      correctCount: known ? prev.correctCount + 1 : prev.correctCount,
      incorrectCount: !known ? prev.incorrectCount + 1 : prev.incorrectCount
    }));
    
    setTimeout(() => {
      handleNext();
    }, 500);
  }, [handleNext]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.code) {
        case "Space":
          event.preventDefault();
          handleFlip();
          break;
        case "ArrowLeft":
          event.preventDefault();
          handlePrevious();
          break;
        case "ArrowRight":
          event.preventDefault();
          handleNext();
          break;
        case "Digit1":
          if (isFlipped) {
            event.preventDefault();
            handleMarkKnown(false);
          }
          break;
        case "Digit2":
          if (isFlipped) {
            event.preventDefault();
            handleMarkKnown(true);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleFlip, handleNext, handlePrevious, handleMarkKnown, isFlipped]);

  const handleExit = () => {
    const confirmExit = window.confirm("Are you sure you want to exit? Your progress will be lost.");
    if (confirmExit) {
      navigate("/");
    }
  };

  if (!currentCard) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Study session complete!</h2>
          <p className="text-muted-foreground mb-6">
            Correct: {session.correctCount} | Incorrect: {session.incorrectCount}
          </p>
          <Button onClick={() => navigate("/")}>Return Home</Button>
        </div>
      </div>
    );
  }

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
        <div className="flex items-center justify-between p-4 md:p-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleExit}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <ProgressBar
            current={session.currentIndex + 1}
            total={session.cards.length}
            correctCount={session.correctCount}
            incorrectCount={session.incorrectCount}
          />
          
          <div className="w-10 h-10" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
          <div className="flex flex-col items-center space-y-8">
            <Flashcard
              card={currentCard}
              isFlipped={isFlipped}
              direction={direction}
              onFlip={handleFlip}
              onNext={handleNext}
              onPrevious={handlePrevious}
              isPrevAvailable={session.currentIndex > 0}
              isNextAvailable={session.currentIndex < session.cards.length - 1}
            />
            
            <div className="flex flex-col items-center space-y-6">
              <VoiceButton />
              <StudyControls
                isFlipped={isFlipped}
                onFlip={handleFlip}
                onNext={handleNext}
                onPrevious={handlePrevious}
                canGoBack={session.currentIndex > 0}
                canGoForward={session.currentIndex < session.cards.length - 1}
                onMarkKnown={handleMarkKnown}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPage;