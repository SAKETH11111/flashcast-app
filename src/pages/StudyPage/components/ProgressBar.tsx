"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  current: number;
  total: number;
  correctCount: number;
  incorrectCount: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  correctCount,
  incorrectCount,
}) => {
  const progress = (current / total) * 100;
  const accuracy = correctCount + incorrectCount > 0 
    ? (correctCount / (correctCount + incorrectCount)) * 100 
    : 0;

  return (
    <div className="flex flex-col items-center space-y-3 min-w-0">
      {/* Progress bar */}
      <div className="w-48 md:w-64">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            {current} of {total}
          </span>
          <span className="text-xs text-muted-foreground">
            {Math.round(progress)}%
          </span>
        </div>
        
        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ 
              duration: 0.5, 
              ease: "easeOut" 
            }}
          />
        </div>
      </div>

      {/* Stats */}
      {(correctCount > 0 || incorrectCount > 0) && (
        <motion.div
          className="flex items-center space-x-4 text-xs"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Accuracy */}
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span className="text-muted-foreground">
              {Math.round(accuracy)}% accuracy
            </span>
          </div>

          {/* Correct count */}
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-muted-foreground">
              {correctCount} correct
            </span>
          </div>

          {/* Incorrect count */}
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <span className="text-muted-foreground">
              {incorrectCount} incorrect
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export { ProgressBar };