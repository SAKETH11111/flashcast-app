"use client";

import React, { useState, useEffect } from 'react';
import AnimatedText from './AnimatedText';
import BrainModel from './BrainModel';
import '@/components/vendor/threejs-brain-animation/styles.css';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { GridPatternBackground } from '@/components/ui/GridPatternBackground';
import { motion, AnimatePresence } from 'framer-motion';

const badgeData = [
  { texts: ["Learn", "Recall", "Retain", "Master"], initialAngle: 0, orbitRadius: 180, speed: 0.03, color: "bg-pink-500" },
  { texts: ["Visualize", "Engage", "Focus", "Discover"], initialAngle: Math.PI / 2, orbitRadius: 200, speed: -0.025, color: "bg-sky-500" },
  { texts: ["Connect", "Explore", "Understand", "Grow"], initialAngle: Math.PI, orbitRadius: 190, speed: 0.02, color: "bg-yellow-500" },
  { texts: ["Practice", "Review", "Succeed", "Achieve"], initialAngle: (3 * Math.PI) / 2, orbitRadius: 210, speed: -0.035, color: "bg-green-500" },
];

interface FeatureBadgeHTMLProps {
  texts: string[];
  initialAngle: number;
  orbitRadius: number;
  speed: number;
  color: string;
  parentSize: { width: number; height: number };
}

const FeatureBadgeHTML: React.FC<FeatureBadgeHTMLProps> = 
  ({ texts, initialAngle, orbitRadius, speed, color, parentSize }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    if (texts.length <= 1) return;
    const intervalId = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [texts]);

  const animateProps = {
    x: [
      Math.cos(initialAngle) * orbitRadius,
      Math.cos(initialAngle + Math.PI * 0.5) * orbitRadius * 0.9,
      Math.cos(initialAngle + Math.PI) * orbitRadius * 0.8,
      Math.cos(initialAngle + Math.PI * 1.5) * orbitRadius * 0.9,
      Math.cos(initialAngle + Math.PI * 2) * orbitRadius,
    ],
    y: [
      Math.sin(initialAngle) * orbitRadius * 0.7,
      Math.sin(initialAngle + Math.PI * 0.5) * orbitRadius,
      Math.sin(initialAngle + Math.PI) * orbitRadius * 0.7,
      Math.sin(initialAngle + Math.PI * 1.5) * orbitRadius * 0.5,
      Math.sin(initialAngle + Math.PI * 2) * orbitRadius * 0.7,
    ],
    scale: [0.8, 1.1, 1.2, 1.1, 0.8],
    opacity: [0.7, 1, 1, 1, 0.7],
  };

  const transitionProps = {
    duration: (1 / Math.abs(speed)) * 60,
    repeat: Infinity,
    ease: "linear",
    delay: initialAngle * 2,
  };

  return (
    <motion.div
      className={`absolute p-2 px-3 text-xs font-semibold text-white rounded-md shadow-lg ${color} transform-gpu flex items-center justify-center min-w-[100px] h-[30px]`}
      style={{ x: 0, y: 0 }}
      animate={animateProps}
      transition={transitionProps}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={texts[currentTextIndex]}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {texts[currentTextIndex]}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
};


const HeroSection: React.FC = () => {
  const brainContainerRef = React.useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = React.useState({width: 0, height: 0});

  React.useEffect(() => {
    if (brainContainerRef.current) {
      setContainerSize({
        width: brainContainerRef.current.offsetWidth,
        height: brainContainerRef.current.offsetHeight
      });
    }
  }, []);


  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <GridPatternBackground 
          size={30} 
          className="opacity-50 dark:opacity-30" 
        />
        <BackgroundBeams className="opacity-70 dark:opacity-50" />
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-start text-left">
          <AnimatedText 
            fullText="Features that make learning powerful"
            placeholderWord="powerful"
            animatedKeywords={["powerful", "magical", "effortless"]}
          />
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            Unlock your learning potential with cutting-edge features designed for memory mastery and effortless study.
          </p>
        </div>

        <div 
          ref={brainContainerRef}
          className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center"
        >
          <BrainModel />
          {containerSize.width > 0 && badgeData.map((badge, index) => (
            <FeatureBadgeHTML 
              key={index} 
              {...badge}
              parentSize={containerSize}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
