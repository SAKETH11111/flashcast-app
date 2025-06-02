"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mic, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { GridPatternBackground } from "./GridPatternBackground";

export const VoiceIntelligenceTab = () => {
  const [isActive, setIsActive] = useState(false);
  const [waveData, setWaveData] = useState<number[]>(
    Array.from({ length: 40 }, () => Math.random() * 60 + 20)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveData(
        Array.from({ length: 40 }, () => Math.random() * 60 + 20)
      );
    }, 150);

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
            <Mic className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">Voice Intelligence</h3>
            <p className="text-muted-foreground">Advanced speech recognition and processing</p>
          </div>
        </div>

        {/* Feature Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 flex-grow">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-sm text-muted-foreground">Real-time voice recognition</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-muted-foreground">Natural language processing</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-sm text-muted-foreground">Multi-language support</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-muted-foreground">Smart audio processing</span>
          </div>
        </div>

        {/* Waveform Visualizer */}
        <div className="mt-auto h-20 w-full bg-black/5 dark:bg-white/5 rounded flex items-center justify-center overflow-hidden">
          <svg width="80%" height="60%" viewBox="0 0 120 50" className="opacity-50">
            {waveData.map((height, index) => (
              <line
                key={index}
                x1={10 + index * 2.5}
                y1={25 - height / 4}
                x2={10 + index * 2.5}
                y2={25 + height / 4}
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <animate attributeName="y1" values={`${25 - height / 4};${25 - height / 3};${25 - height / 4}`} dur="0.6s" repeatCount="indefinite" begin={`${index * 0.02}s`} />
                <animate attributeName="y2" values={`${25 + height / 4};${25 + height / 3};${25 + height / 4}`} dur="0.6s" repeatCount="indefinite" begin={`${index * 0.02}s`} />
              </line>
            ))}
          </svg>
        </div>
      </div>

      {/* Interactive Button */}
      <motion.button
        className="absolute top-8 right-8 p-3 bg-background/80 backdrop-blur-sm rounded-full border border-border/50 hover:bg-background transition-colors"
        onClick={() => setIsActive(!isActive)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Volume2 className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
      </motion.button>
    </motion.div>
  );
};