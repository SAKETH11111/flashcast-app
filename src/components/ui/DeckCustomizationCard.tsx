"use client";

import React from "react";
import { motion } from "framer-motion";
import { Settings2, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { GridPatternBackground } from "./GridPatternBackground";

interface DeckCustomizationCardProps extends React.HTMLAttributes<HTMLDivElement> {}

const DeckCustomizationCard = ({ className }: DeckCustomizationCardProps) => {
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
        rotate: 2
      }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <GridPatternBackground
        size={20}
        className="absolute inset-0 opacity-50 dark:opacity-30"
      />
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-4">
          <Settings2 className="w-8 h-8 text-secondary" />
        </div>
        <h3 className="text-xl md:text-2xl font-semibold mb-2 text-foreground dark:text-white">
          Customize Your Study
        </h3>
        <p className="text-muted-foreground text-sm md:text-base flex-grow">
          Tailor decks to your learning style with rich formatting options and appearance settings.
        </p>
        <div className="mt-auto flex items-center space-x-2">
          <Palette className="w-5 h-5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Themes, Fonts, Colors & More</span>
        </div>
      </div>
      {/* The GridPatternBackground is already a child of the main motion.div */}
    </motion.div>
  );
};

export { DeckCustomizationCard };