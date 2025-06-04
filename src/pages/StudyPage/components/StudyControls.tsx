import React, { useEffect } from 'react';
import { Button } from '../../../../components/ui/button'; // Adjusted path

interface StudyControlsProps {
  onNext: () => void;
  onPrevious: () => void;
  onFlip: () => void;
  onMarkKnown: () => void;
  onMarkUnknown: () => void;
}

const StudyControls: React.FC<StudyControlsProps> = ({
  onNext,
  onPrevious,
  onFlip,
  onMarkKnown,
  onMarkUnknown,
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'ArrowLeft') {
        onPrevious();
      } else if (event.code === 'ArrowRight') {
        onNext();
      } else if (event.code === 'Space') {
        event.preventDefault(); // Prevent spacebar from scrolling
        onFlip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onNext, onPrevious, onFlip]);

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-center items-center space-x-4 bg-slate-100/20 dark:bg-black/20 backdrop-blur-sm">
      <Button variant="ghost" size="icon" onClick={onMarkUnknown} aria-label="Mark as Unknown">
        X
      </Button>
      <Button variant="ghost" size="icon" onClick={onPrevious} aria-label="Previous Card">
        &lt;
      </Button>
      <Button variant="ghost" size="lg" onClick={onFlip} aria-label="Flip Card">
        Flip
      </Button>
      <Button variant="ghost" size="icon" onClick={onNext} aria-label="Next Card">
        &gt;
      </Button>
      <Button variant="ghost" size="icon" onClick={onMarkKnown} aria-label="Mark as Known">
        ✓
      </Button>
    </div>
  );
};

export default StudyControls;
