"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface VoiceButtonProps {
  onVoiceToggle?: (isListening: boolean) => void;
}

const VoiceButton: React.FC<VoiceButtonProps> = () => {
  const [isListening] = useState(false);

  const handleToggle = () => {
    // Show under development message instead of toggling
    toast.info("🎤 AI Voice Commands - Coming Soon!", {
      description: "Voice-powered study features will be available soon. We're working hard to bring you AI-powered voice capabilities!"
    });
    
    // Uncomment below for actual functionality when implemented
    // const newState = !isListening;
    // setIsListening(newState);
    // onVoiceToggle?.(newState);
  };

  return (
    <motion.div
      className="relative"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 25,
        delay: 0.2 
      }}
    >
      {/* Subtle pulse ring when listening */}
      {isListening && (
        <motion.div
          className="absolute inset-0 rounded-full border border-primary/30"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 0.2, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Secondary subtle ring */}
      {isListening && (
        <motion.div
          className="absolute inset-0 rounded-full border border-primary/20"
          initial={{ scale: 1, opacity: 0.4 }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.1, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      )}

      <Button
        variant={isListening ? "default" : "outline"}
        size="lg"
        onClick={handleToggle}
        className={cn(
          "relative w-16 h-16 rounded-full",
          "transition-all duration-300 ease-out",
          "hover:shadow-lg active:scale-95",
          isListening
            ? "bg-primary text-primary-foreground shadow-md"
            : "hover:bg-primary/5 hover:border-primary/50",
        )}
      >
        <motion.div
          animate={{ 
            scale: isListening ? 1.1 : 1,
            rotate: isListening ? [0, 5, -5, 0] : 0
          }}
          transition={{ 
            scale: { duration: 0.2, ease: "easeOut" },
            rotate: { duration: 0.4, ease: "easeInOut" }
          }}
        >
          {isListening ? (
            <Mic className="w-6 h-6" />
          ) : (
            <MicOff className="w-6 h-6" />
          )}
        </motion.div>
      </Button>

      {/* Professional tooltip on hover */}
      <motion.div
        className={cn(
          "absolute bottom-full mb-3 left-1/2 transform -translate-x-1/2",
          "bg-black/80 text-white text-xs px-3 py-2 rounded-lg",
          "backdrop-blur-sm border border-white/10",
          "opacity-0 pointer-events-none",
          "transition-opacity duration-200",
          "whitespace-nowrap"
        )}
        whileHover={{ opacity: 1 }}
      >
        {isListening ? "Click to stop listening" : "Click to start voice commands"}
        
        {/* Tooltip arrow */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/80" />
      </motion.div>
    </motion.div>
  );
};

export { VoiceButton };