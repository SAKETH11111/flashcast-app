"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Check, 
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StudyControlsProps {
  canGoBack: boolean;
  canGoForward: boolean;
  isFlipped: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onFlip: () => void;
  onMarkKnown: (known: boolean) => void;
}

const StudyControls: React.FC<StudyControlsProps> = ({
  canGoBack,
  canGoForward,
  isFlipped,
  onPrevious,
  onNext,
  onFlip,
  onMarkKnown,
}) => {
  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 300, damping: 20 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Knowledge assessment buttons (shown when flipped) */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isFlipped ? "auto" : 0, 
          opacity: isFlipped ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="flex items-center space-x-4 px-4">
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate={isFlipped ? "visible" : "hidden"}
            whileTap="tap"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => onMarkKnown(false)}
              className={cn(
                "flex items-center space-x-2 px-6 py-3",
                "border-red-500/50 text-red-600 hover:bg-red-500/10",
                "dark:border-red-400/50 dark:text-red-400 dark:hover:bg-red-400/10"
              )}
            >
              <X className="w-5 h-5" />
              <span>Don't Know</span>
            </Button>
          </motion.div>

          <motion.div
            variants={buttonVariants}
            initial="hidden"
            animate={isFlipped ? "visible" : "hidden"}
            whileTap="tap"
            transition={{ delay: 0.1 }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => onMarkKnown(true)}
              className={cn(
                "flex items-center space-x-2 px-6 py-3",
                "border-green-500/50 text-green-600 hover:bg-green-500/10",
                "dark:border-green-400/50 dark:text-green-400 dark:hover:bg-green-400/10"
              )}
            >
              <Check className="w-5 h-5" />
              <span>Know It</span>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Main navigation controls */}
      <motion.div
        className={cn(
          "flex items-center justify-center space-x-6 p-4 rounded-2xl",
          "bg-background/80 backdrop-blur-lg border border-border/50",
          "shadow-lg"
        )}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30,
          delay: 0.2 
        }}
      >
        {/* Previous button */}
        <motion.div
          variants={buttonVariants}
          initial="visible"
          whileTap="tap"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevious}
            disabled={!canGoBack}
            className={cn(
              "w-12 h-12 rounded-full",
              "hover:bg-primary/10 hover:text-primary",
              "disabled:opacity-30"
            )}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
        </motion.div>

        {/* Flip button */}
        <motion.div
          variants={buttonVariants}
          initial="visible"
          whileTap="tap"
        >
          <Button
            variant="default"
            size="lg"
            onClick={onFlip}
            className={cn(
              "flex items-center space-x-2 px-6 py-3 rounded-full",
              "bg-primary text-primary-foreground",
              "hover:bg-primary/90 shadow-lg"
            )}
          >
            <RotateCcw className="w-5 h-5" />
            <span className="hidden sm:inline">
              {isFlipped ? "Show Term" : "Show Definition"}
            </span>
            <span className="sm:hidden">Flip</span>
          </Button>
        </motion.div>

        {/* Next button */}
        <motion.div
          variants={buttonVariants}
          initial="visible"
          whileTap="tap"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            disabled={!canGoForward}
            className={cn(
              "w-12 h-12 rounded-full",
              "hover:bg-primary/10 hover:text-primary",
              "disabled:opacity-30"
            )}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Keyboard shortcuts hint */}
      <motion.div
        className="text-center text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p>
          <kbd className="px-2 py-1 text-xs bg-muted rounded">Space</kbd> to flip • 
          <kbd className="px-2 py-1 text-xs bg-muted rounded mx-1">←</kbd><kbd className="px-2 py-1 text-xs bg-muted rounded">→</kbd> to navigate
          {isFlipped && (
            <>
              {" • "}
              <kbd className="px-2 py-1 text-xs bg-muted rounded">1</kbd> don't know • 
              <kbd className="px-2 py-1 text-xs bg-muted rounded">2</kbd> know it
            </>
          )}
        </p>
      </motion.div>
    </div>
  );
};

export { StudyControls };