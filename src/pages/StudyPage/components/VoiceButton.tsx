import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../../../components/ui/button'; // Assuming Button can be styled or used as a base

interface VoiceButtonProps {
  isListening: boolean;
  onClick: () => void;
}

const VoiceButton: React.FC<VoiceButtonProps> = ({ isListening, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-20 right-4 w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
      animate={{
        scale: isListening ? [1, 1.1, 1] : 1,
        boxShadow: isListening
          ? "0 0 0 10px hsl(var(--primary) / 0.4)"
          : "0 0 0 0px hsl(var(--primary) / 0)",
      }}
      transition={{
        scale: {
          duration: 0.8,
          repeat: isListening ? Infinity : 0,
          repeatType: 'mirror',
          ease: 'easeInOut',
        },
        boxShadow: {
          duration: 0.8,
          repeat: isListening ? Infinity : 0,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }
      }}
      aria-label={isListening ? "Stop voice input" : "Start voice input"}
    >
      {/* Placeholder for Mic Icon */}
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" y1="19" x2="12" y2="22"></line>
      </svg>
    </motion.button>
  );
};

export default VoiceButton;
