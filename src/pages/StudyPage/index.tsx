import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import Particles from '../../components/ui/particles';
import { GridPatternBackground } from '../../components/ui/GridPatternBackground'; // Corrected import path
import Flashcard from './components/Flashcard';
import StudyControls from './components/StudyControls';
import ProgressBar from './components/ProgressBar';
import VoiceButton from './components/VoiceButton';
import { StudySession, FlashcardData } from '../../types/study'; // Import interfaces
import { mockStudySession } from '../../data/mockDecks'; // Import mock data

const StudyPage: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const [studySession, setStudySession] = useState<StudySession>(mockStudySession);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isListening, setIsListening] = useState(false); // For VoiceButton

  const triggerHapticFeedback = (duration: number = 10) => {
    if (navigator.vibrate) {
      navigator.vibrate(duration);
    }
  };

  useEffect(() => {
    // In a real app, you'd fetch the deck based on deckId here
    // For now, we just log it and use the mock session
    console.log("Current Deck ID from route:", deckId);
    // Potentially, initialize or filter mockStudySession.cards based on deckId if needed
    // For this task, we'll use the global mockStudySession directly.
    // If you wanted to simulate different decks, you could have a map of deckId to sessions.
    setStudySession(prevSession => ({ ...prevSession, deckId: deckId || mockStudySession.deckId }));
  }, [deckId]);

  const currentCard = studySession.cards[studySession.currentIndex];

  const handleNext = () => {
    if (studySession.currentIndex < studySession.cards.length - 1) {
      setStudySession(prev => ({ ...prev, currentIndex: prev.currentIndex + 1 }));
      setIsFlipped(false);
      triggerHapticFeedback(5); // Light tap for next/prev
    } else {
      // Handle end of deck (e.g., show summary, navigate away)
      console.log("End of deck reached!");
      triggerHapticFeedback(20); // Stronger tap for end of deck
    }
  };

  const handlePrevious = () => {
    if (studySession.currentIndex > 0) {
      setStudySession(prev => ({ ...prev, currentIndex: prev.currentIndex - 1 }));
      setIsFlipped(false);
      triggerHapticFeedback(5); // Light tap
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    triggerHapticFeedback(10); // Standard tap for flip
  };

  const handleMarkKnown = () => {
    const updatedCards = [...studySession.cards];
    updatedCards[studySession.currentIndex].known = true;
    setStudySession(prev => ({
      ...prev,
      cards: updatedCards,
      correctCount: prev.correctCount + 1,
    }));
    triggerHapticFeedback(15); // Slightly stronger for mark
    handleNext(); // handleNext will also trigger its own haptic
  };

  const handleMarkUnknown = () => {
    const updatedCards = [...studySession.cards];
    updatedCards[studySession.currentIndex].known = false; // Explicitly set if needed
    setStudySession(prev => ({
      ...prev,
      cards: updatedCards,
      incorrectCount: prev.incorrectCount + 1,
    }));
    triggerHapticFeedback(15); // Slightly stronger for mark
    handleNext(); // handleNext will also trigger its own haptic
  };

  if (!currentCard) {
    // This can happen if the deck is empty or currentIndex is out of bounds
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-slate-900 text-white">
        Loading card or deck finished...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-background"> {/* Changed bg-slate-900 to bg-background */}
      <GridPatternBackground
        width={80}
        height={80}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className="absolute inset-0 -z-20 h-full w-full fill-foreground/5 stroke-foreground/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
      />
      <ProgressBar
        currentIndex={studySession.currentIndex + 1} // Display 1-based index
        totalCards={studySession.cards.length}
      />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in" // Particles on top of grid
        quantity={300}
        staticity={30}
        ease={50}
        size={0.4}
        vx={0.05}
        vy={0.05}
        color="#ffffff"
      />
      <AnimatePresence mode="wait">
        <Flashcard
          id={currentCard.id} // Pass card id as key
          term={currentCard.term}
          definition={currentCard.definition}
          isFlipped={isFlipped}
          onFlip={handleFlip}
          onNext={handleNext} // Pass navigation handlers
          onPrevious={handlePrevious} // Pass navigation handlers
        />
      </AnimatePresence>
      <StudyControls
        onNext={handleNext}
        onPrevious={handlePrevious}
        onFlip={handleFlip}
        onMarkKnown={handleMarkKnown}
        onMarkUnknown={handleMarkUnknown}
      />
      <VoiceButton
        isListening={isListening}
        onClick={() => setIsListening(!isListening)}
      />
    </div>
  );
};

export default StudyPage;
