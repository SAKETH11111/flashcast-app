"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VoiceButtonProps {
  onVoiceToggle?: (isListening: boolean) => void;
}

const VoiceButton: React.FC<VoiceButtonProps> = ({ onVoiceToggle }) => {
  const [isListening, setIsListening] = useState(false);

  const handleToggle = () => {
    const newState = !isListening;
    setIsListening(newState);
    onVoiceToggle?.(newState);
  };

  return (
    <motion.div
      className="relative"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        delay: 0.3 
      }}
    >
      {/* Pulse animation ring when listening */}
      {isListening && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 0, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Secondary pulse ring */}
      {isListening && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          }}
        />
      )}

      <Button
        variant={isListening ? "default" : "outline"}
        size="lg"
        onClick={handleToggle}
        className={cn(
          "relative w-16 h-16 rounded-full",
          "transition-all duration-300",
          isListening
            ? "bg-primary text-primary-foreground shadow-lg scale-110"
            : "hover:bg-primary/10 hover:border-primary",
        )}
      >
        <motion.div
          animate={{ rotate: isListening ? 360 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isListening ? (
            <Mic className="w-6 h-6" />
          ) : (
            <MicOff className="w-6 h-6" />
          )}
        </motion.div>
      </Button>

      {/* Status text */}
      <motion.div
        className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-xs text-muted-foreground">
          {isListening ? "Listening..." : "Voice Commands"}
        </span>
      </motion.div>

      {/* Voice command hints tooltip (shown when not listening) */}
      {!isListening && (
        <motion.div
          className={cn(
            "absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2",
            "bg-popover text-popover-foreground text-xs p-2 rounded-lg",
            "border shadow-lg max-w-xs text-center",
            "opacity-0 pointer-events-none group-hover:opacity-100",
            "transition-opacity duration-200"
          )}
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
        >
          <p className="mb-1 font-medium">Voice Commands:</p>
          <p>"Flip card" • "Next" • "Previous"</p>
          <p>"I know this" • "I don't know"</p>
          
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-popover" />
        </motion.div>
      )}
    </motion.div>
  );
};

export { VoiceButton };