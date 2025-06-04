"use client";

import React from "react";
import { motion } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";
import { GridPatternBackground } from "@/components/ui/GridPatternBackground";
import type { FlashcardData } from "../types";

interface FlashcardProps {
  card: FlashcardData;
  isFlipped: boolean;
  onFlip: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Flashcard: React.FC<FlashcardProps> = ({
  card,
  isFlipped,
  onFlip,
  onNext,
  onPrevious,
}) => {
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    
    if (info.offset.x > threshold) {
      onPrevious();
    } else if (info.offset.x < -threshold) {
      onNext();
    }
  };

  return (
    <motion.div
      className="relative w-full max-w-2xl mx-auto"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 0.95 }}
    >
      <motion.div
        className={cn(
          "relative w-full h-[400px] md:h-[500px] lg:h-[600px]",
          "rounded-3xl overflow-hidden cursor-pointer",
          "transform border-2 border-transparent",
          "transition-all duration-300 ease-in-out",
          "hover:border-primary/50 hover:shadow-2xl",
          "bg-gradient-to-br from-background/80 to-background/60",
          "backdrop-blur-lg"
        )}
        onClick={onFlip}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          perspective: "1000px",
        }}
      >
        {/* Grid pattern background */}
        <GridPatternBackground
          size={30}
          className="absolute inset-0 opacity-30"
        />

        {/* Card content container */}
        <div className="relative h-full" style={{ transformStyle: "preserve-3d" }}>
          {/* Front side */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-12"
            animate={{
              rotateY: isFlipped ? 180 : 0,
            }}
            transition={{
              duration: 0.6,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
            style={{
              backfaceVisibility: "hidden",
            }}
          >
            <div className="text-center max-w-lg">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  {card.term}
                </h2>
                <p className="text-lg text-muted-foreground">
                  Tap to reveal definition
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Back side */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-12"
            animate={{
              rotateY: isFlipped ? 0 : -180,
            }}
            transition={{
              duration: 0.6,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="text-center max-w-lg">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : 20 }}
                transition={{ delay: isFlipped ? 0.3 : 0 }}
              >
                <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-6">
                  {card.term}
                </h3>
                <p className="text-lg md:text-xl text-foreground leading-relaxed">
                  {card.definition}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
      </motion.div>

      {/* Card status indicator */}
      {card.known !== undefined && (
        <motion.div
          className={cn(
            "absolute -top-2 -right-2 w-6 h-6 rounded-full border-2 border-background",
            card.known
              ? "bg-green-500"
              : "bg-red-500"
          )}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      )}

      {/* Swipe indicators */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full text-muted-foreground/50 text-sm font-medium">
        ← Previous
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-full text-muted-foreground/50 text-sm font-medium">
        Next →
      </div>
    </motion.div>
  );
};

export { Flashcard };