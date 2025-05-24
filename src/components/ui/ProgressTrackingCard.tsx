"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { GridPatternBackground } from "./GridPatternBackground";

interface ProgressTrackingCardProps extends React.HTMLAttributes<HTMLDivElement> {}

const ProgressTrackingCard = ({ className }: ProgressTrackingCardProps) => {
  const progressPercentage = 75;

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
        rotate: 1
      }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <GridPatternBackground
        size={20}
        className="absolute inset-0 opacity-50 dark:opacity-30"
      />
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-4">
          <TrendingUp className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl md:text-2xl font-semibold mb-2 text-foreground dark:text-white">
          Track Your Progress
        </h3>
        <p className="text-muted-foreground text-sm md:text-base mb-4 flex-grow">
          Monitor your learning journey and celebrate milestones achieved.
        </p>
        
        <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-2.5 mb-1">
          <div
            className="bg-primary h-2.5 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-primary font-semibold text-right mb-3">{progressPercentage}% Complete</p>

        <div className="mt-auto flex items-center text-xs text-muted-foreground">
          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
          Keep up the great work!
        </div>
      </div>
    </motion.div>
  );
};

export { ProgressTrackingCard };