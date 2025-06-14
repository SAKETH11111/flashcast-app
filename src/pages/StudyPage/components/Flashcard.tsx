"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FlashcardData } from "../types";

interface FlashcardProps {
  card: FlashcardData;
  isFlipped: boolean;
  direction: number;
  onFlip: () => void;
  onNext: () => void;
  onPrevious: () => void;
  isPrevAvailable: boolean;
  isNextAvailable: boolean;
}

const cardVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 200 : -200,
    opacity: 0,
  }),
};

const Flashcard: React.FC<FlashcardProps> = ({ 
  card, 
  isFlipped, 
  direction, 
  onFlip, 
  onNext, 
  onPrevious, 
  isPrevAvailable, 
  isNextAvailable 
}) => {
  return (
    <div className="relative w-[500px] h-[300px] mx-auto">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={card.id}
          custom={direction}
          variants={cardVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 400, damping: 40 },
            opacity: { duration: 0.15 },
          }}
          className="absolute w-full h-full"
        >
          <div
            className="relative w-full h-full cursor-pointer"
            style={{ transformStyle: "preserve-3d" }}
            onClick={onFlip}
          >
            {/* Front of card (Term) */}
            <div
              className={cn(
                "absolute inset-0 w-full h-full",
                "rounded-3xl border border-white/10 bg-black/30 backdrop-blur-lg",
                "flex flex-col items-center justify-center text-center p-8",
                "shadow-2xl",
              )}
              style={{
                backfaceVisibility: "hidden",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                transition: "transform 0.4s ease-in-out",
              }}
            >
              <div className="max-w-lg">
                <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
                  {card.term}
                </h2>
              </div>
              <p className="absolute bottom-6 text-base text-white/60">
                Tap to reveal definition
              </p>
            </div>

            {/* Back of card (Definition) */}
            <div
              className={cn(
                "absolute inset-0 w-full h-full",
                "rounded-3xl border border-white/10 bg-black/30 backdrop-blur-lg",
                "flex flex-col items-center justify-center text-center p-8",
                "shadow-2xl",
              )}
              style={{
                backfaceVisibility: "hidden",
                transform: isFlipped ? "rotateY(0deg)" : "rotateY(-180deg)",
                transition: "transform 0.4s ease-in-out",
              }}
            >
              <div className="max-w-lg">
                <h3 className="text-3xl font-bold text-yellow-400 mb-6">
                  {card.term}
                </h3>
                <p className="text-xl text-white/90 leading-relaxed">
                  {card.definition}
                </p>
              </div>
              <p className="absolute bottom-6 text-sm text-white/50">
                Tap to flip back
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrevious();
        }}
        disabled={!isPrevAvailable}
        className={cn(
          "absolute left-[-60px] top-1/2 -translate-y-1/2 z-20",
          "w-14 h-14 rounded-full",
          "bg-black/20 hover:bg-black/40 border border-white/10",
          "text-white disabled:opacity-30 disabled:cursor-not-allowed",
          "transition-all duration-200 hover:scale-105",
          "backdrop-blur-sm flex items-center justify-center",
        )}
        aria-label="Previous card"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        disabled={!isNextAvailable}
        className={cn(
          "absolute right-[-60px] top-1/2 -translate-y-1/2 z-20",
          "w-14 h-14 rounded-full",
          "bg-black/20 hover:bg-black/40 border border-white/10",
          "text-white disabled:opacity-30 disabled:cursor-not-allowed",
          "transition-all duration-200 hover:scale-105",
          "backdrop-blur-sm flex items-center justify-center",
        )}
        aria-label="Next card"
      >
        <ChevronRight className="w-7 h-7" />
      </button>
    </div>
  );
};

export { Flashcard };