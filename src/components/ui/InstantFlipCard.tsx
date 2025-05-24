"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { GridPatternBackground } from "./GridPatternBackground";

interface InstantFlipCardProps extends React.HTMLAttributes<HTMLDivElement> {}

const InstantFlipCard = ({ className }: InstantFlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div
      className={cn(
        "p-6 rounded-3xl overflow-hidden",
        "bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white",
        "relative text-card-foreground",
        "min-h-[250px] md:min-h-[300px]",
        "transform border-2 border-transparent",
        "transition-colors duration-300 ease-in-out",
        "hover:border-primary hover:shadow-2xl hover:bg-primary/10",
        "dark:hover:border-primary dark:hover:bg-primary/20",
        className
      )}
      whileHover={{
        scale: 1.05,
        rotate: -2
      }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      onClick={handleFlip}
    >
      <GridPatternBackground
        size={20}
        className="absolute inset-0 opacity-50 dark:opacity-30"
      />
      <div className="relative z-10 h-full">
        <AnimatePresence initial={false}>
          <motion.div
          key={isFlipped ? "back" : "front"}
          initial={{ rotateY: isFlipped ? -180 : 0 }}
          animate={{ rotateY: 0 }}
          exit={{ rotateY: 180 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 150, damping: 15 }}
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "1.5rem",
          }}
        >
          {isFlipped ? (
            <>
              <Info className="w-10 h-10 text-secondary mb-3" />
              <h4 className="text-lg font-semibold text-center mb-1 text-foreground dark:text-white">Answers at Your Fingertips!</h4>
              <p className="text-xs text-muted-foreground text-center">Revealed content goes here.</p>
            </>
          ) : (
            <>
              <RefreshCw className="w-10 h-10 text-primary mb-3" />
              <h3 className="text-xl md:text-2xl font-semibold mb-2 text-center text-foreground dark:text-white">
                Instant Flip
              </h3>
              <p className="text-muted-foreground text-sm md:text-base text-center">
                Seamlessly switch between questions and answers. Tap to reveal.
              </p>
            </>
          )}
        </motion.div>
      </AnimatePresence>
      </div>
    </motion.div>
  );
};

export { InstantFlipCard };