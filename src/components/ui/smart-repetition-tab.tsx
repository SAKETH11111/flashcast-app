"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Brain, TrendingUp, Clock, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { GridPatternBackground } from "./GridPatternBackground";

export const SmartRepetitionTab = () => {
  const [activeData, setActiveData] = useState(0);
  const repetitionData = [
    { day: 1, retention: 100, difficulty: 'Easy' },
    { day: 2, retention: 85, difficulty: 'Easy' },
    { day: 7, retention: 70, difficulty: 'Medium' },
    { day: 14, retention: 60, difficulty: 'Medium' },
    { day: 30, retention: 55, difficulty: 'Hard' },
    { day: 90, retention: 50, difficulty: 'Hard' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveData((prev) => (prev + 1) % repetitionData.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={cn(
        "relative w-full h-[500px] rounded-3xl overflow-hidden",
        "bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white",
        "text-card-foreground",
        "transform border-2 border-transparent",
        "transition-colors duration-300 ease-in-out",
        "hover:border-primary hover:shadow-2xl hover:bg-primary/10",
        "dark:hover:border-primary dark:hover:bg-primary/20"
      )}
      whileHover={{
        scale: 1.01,
        rotate: 0
      }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <GridPatternBackground
        size={20}
        className="absolute inset-0 opacity-50 dark:opacity-30"
      />
      
      <div className="relative z-20 p-8 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-primary to-yellow-500 rounded-2xl text-white shadow-lg">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">Smart Repetition</h3>
            <p className="text-muted-foreground">Flashcast's intelligent algorithm optimizes your learning by scheduling reviews at the perfect time for maximum retention.</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <motion.div 
            className="bg-background/50 backdrop-blur-sm rounded-xl p-4 border border-border/50"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-muted-foreground">Efficiency</span>
            </div>
            <div className="text-2xl font-bold text-primary">94%</div>
          </motion.div>

          <motion.div 
            className="bg-background/50 backdrop-blur-sm rounded-xl p-4 border border-border/50"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-muted-foreground">Time Saved</span>
            </div>
            <div className="text-2xl font-bold text-yellow-500">67%</div>
          </motion.div>

          <motion.div 
            className="bg-background/50 backdrop-blur-sm rounded-xl p-4 border border-border/50"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Retention</span>
            </div>
            <div className="text-2xl font-bold text-primary">89%</div>
          </motion.div>
        </div>
        
        {/* Interactive Graph */}
        <div className="flex-grow relative bg-background/20 backdrop-blur-sm rounded-2xl border border-border/30 p-6 flex flex-col justify-between">
          <h4 className="text-lg font-semibold mb-4 text-foreground">Retention Over Time</h4>
          
          {/* Graph */}
          <div className="relative h-32 flex items-end justify-around">
            {repetitionData.map((point, index) => (
              <motion.div
                key={point.day}
                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0.3, y: 20 }}
                animate={{ 
                  opacity: index === activeData ? 1 : 0.6,
                  scale: index === activeData ? 1.1 : 1,
                  y: 0
                }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div className="text-xs text-muted-foreground">
                  {point.retention}%
                </div>
                <motion.div
                  className={`w-8 rounded-t-lg ${
                    point.difficulty === 'Easy' ? 'bg-primary' :
                    point.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-orange-500'
                  }`}
                  style={{ height: `${point.retention * 0.8}px` }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                />
                <div className="text-xs text-muted-foreground">
                  Day {point.day}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 text-xs justify-center">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">Easy</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-muted-foreground">Medium</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-muted-foreground">Hard</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};