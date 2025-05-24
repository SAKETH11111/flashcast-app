"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { GridPatternBackground } from "./GridPatternBackground";

interface VoiceDetectionCardProps extends React.HTMLAttributes<HTMLDivElement> {}

const VoiceDetectionCard = ({ className }: VoiceDetectionCardProps) => {
  return (
    <motion.div
      className={cn(
        "p-6 rounded-3xl overflow-hidden",
        "bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white",
        "relative text-card-foreground",
        "min-h-[300px] md:min-h-[350px]",
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
    >
      <GridPatternBackground
        size={20}
        className="absolute inset-0 opacity-50 dark:opacity-30"
      />
      <div className="relative z-20 flex flex-col h-full">
        <div className="mb-4">
          <Mic className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl md:text-2xl font-semibold mb-2 text-foreground dark:text-white">
          Speak to Learn
        </h3>
        <p className="text-muted-foreground text-sm md:text-base flex-grow">
          Interactive voice commands make learning intuitive and fast.
        </p>
        <div className="mt-auto h-20 w-full bg-black/5 dark:bg-white/5 rounded flex items-center justify-center overflow-hidden">
          <svg width="80%" height="60%" viewBox="0 0 120 50" className="opacity-50">
            <line x1="10" y1="25" x2="10" y2="25" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round">
              <animate attributeName="y1" values="25;15;25" dur="0.6s" repeatCount="indefinite" />
              <animate attributeName="y2" values="25;35;25" dur="0.6s" repeatCount="indefinite" />
            </line>
            <line x1="20" y1="25" x2="20" y2="25" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round">
              <animate attributeName="y1" values="25;10;25" dur="0.6s" repeatCount="indefinite" begin="0.1s" />
              <animate attributeName="y2" values="25;40;25" dur="0.6s" repeatCount="indefinite" begin="0.1s" />
            </line>
            <line x1="30" y1="25" x2="30" y2="25" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round">
              <animate attributeName="y1" values="25;20;25" dur="0.6s" repeatCount="indefinite" begin="0.2s" />
              <animate attributeName="y2" values="25;30;25" dur="0.6s" repeatCount="indefinite" begin="0.2s" />
            </line>
            <line x1="40" y1="25" x2="40" y2="25" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round">
              <animate attributeName="y1" values="25;5;25" dur="0.6s" repeatCount="indefinite" begin="0.05s" />
              <animate attributeName="y2" values="25;45;25" dur="0.6s" repeatCount="indefinite" begin="0.05s" />
            </line>
            <line x1="50" y1="25" x2="50" y2="25" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round">
              <animate attributeName="y1" values="25;18;25" dur="0.6s" repeatCount="indefinite" begin="0.15s" />
              <animate attributeName="y2" values="25;32;25" dur="0.6s" repeatCount="indefinite" begin="0.15s" />
            </line>
            <line x1="60" y1="25" x2="60" y2="25" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round">
              <animate attributeName="y1" values="25;12;25" dur="0.6s" repeatCount="indefinite" begin="0.25s" />
              <animate attributeName="y2" values="25;38;25" dur="0.6s" repeatCount="indefinite" begin="0.25s" />
            </line>
            <line x1="70" y1="25" x2="70" y2="25" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round">
              <animate attributeName="y1" values="25;22;25" dur="0.6s" repeatCount="indefinite" begin="0.08s" />
              <animate attributeName="y2" values="25;28;25" dur="0.6s" repeatCount="indefinite" begin="0.08s" />
            </line>
            <line x1="80" y1="25" x2="80" y2="25" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round">
              <animate attributeName="y1" values="25;10;25" dur="0.6s" repeatCount="indefinite" begin="0.18s" />
              <animate attributeName="y2" values="25;40;25" dur="0.6s" repeatCount="indefinite" begin="0.18s" />
            </line>
             <line x1="90" y1="25" x2="90" y2="25" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round">
              <animate attributeName="y1" values="25;15;25" dur="0.6s" repeatCount="indefinite" begin="0.28s" />
              <animate attributeName="y2" values="25;35;25" dur="0.6s" repeatCount="indefinite" begin="0.28s" />
            </line>
            <line x1="100" y1="25" x2="100" y2="25" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round">
              <animate attributeName="y1" values="25;20;25" dur="0.6s" repeatCount="indefinite" begin="0.03s" />
              <animate attributeName="y2" values="25;30;25" dur="0.6s" repeatCount="indefinite" begin="0.03s" />
            </line>
            <line x1="110" y1="25" x2="110" y2="25" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round">
              <animate attributeName="y1" values="25;10;25" dur="0.6s" repeatCount="indefinite" begin="0.12s" />
              <animate attributeName="y2" values="25;40;25" dur="0.6s" repeatCount="indefinite" begin="0.12s" />
            </line>
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export { VoiceDetectionCard };