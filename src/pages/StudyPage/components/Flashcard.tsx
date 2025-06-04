import React from 'react';
import { motion, PanInfo } from 'framer-motion';

interface FlashcardProps {
  id: string; // For AnimatePresence key
  term: string;
  definition: string;
  isFlipped: boolean;
  onFlip: () => void;
  onNext: () => void; // For swipe gesture
  onPrevious: () => void; // For swipe gesture
}

const swipeThreshold = 10000; // Based on offset.x * velocity.x

const Flashcard: React.FC<FlashcardProps> = ({
  id, term, definition, isFlipped, onFlip, onNext, onPrevious
}) => {
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info;
    const swipePower = offset.x * velocity.x;

    if (swipePower < -swipeThreshold) {
      onNext();
    } else if (swipePower > swipeThreshold) {
      onPrevious();
    }
  };

  return (
    <motion.div
      key={id} // Important for AnimatePresence
      className="w-[600px] h-[400px] rounded-3xl cursor-pointer bg-card/10 dark:bg-card/10 backdrop-blur-md border-2 border-transparent hover:border-primary shadow-lg hover:shadow-2xl"
      style={{ transformStyle: 'preserve-3d' }}
      onClick={() => !isFlipped && onFlip()} // Only flip if front is showing, to avoid conflict with drag/swipe
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      transition={{ duration: 0.4, type: 'spring', stiffness: 100, damping: 20 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
    >
      {/* Inner container for flip animation, separate from drag/swipe and AnimatePresence */}
      <motion.div
        style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
        onClick={(e) => { // Allow flip when clicking on the card face itself
          e.stopPropagation(); // Prevent outer div's onClick if it has one that conflicts
          onFlip();
        }}
      >
        {/* Front Side */}
        <motion.div
          className="absolute w-full h-full flex items-center justify-center text-2xl p-4 text-center text-white"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {term}
        </motion.div>

        {/* Back Side */}
        <motion.div
          className="absolute w-full h-full flex items-center justify-center text-lg p-4 text-center text-white"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {definition}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Flashcard;
