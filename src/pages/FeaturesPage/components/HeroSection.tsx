"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import AnimatedText from './AnimatedText';
import BrainModel from './BrainModel';
import '@/components/vendor/threejs-brain-animation/styles.css';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { GridPatternBackground } from '@/components/ui/GridPatternBackground';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const badgeData = [
  { texts: ["Learn", "Recall", "Retain", "Master"], initialAngle: 0, orbitRadius: 230, speed: 0.03, color: "bg-pink-500" },
  { texts: ["Visualize", "Engage", "Focus", "Discover"], initialAngle: Math.PI / 2, orbitRadius: 260, speed: -0.025, color: "bg-sky-500" },
  { texts: ["Connect", "Explore", "Understand", "Grow"], initialAngle: Math.PI, orbitRadius: 250, speed: 0.02, color: "bg-yellow-500" },
  { texts: ["Practice", "Review", "Succeed", "Achieve"], initialAngle: (3 * Math.PI) / 2, orbitRadius: 270, speed: -0.035, color: "bg-green-500" },
];

interface FeatureBadgeHTMLProps {
  texts: string[];
  initialAngle: number;
  orbitRadius: number;
  speed: number;
  color: string;
  brainOffset: { x: number; y: number };
}

const FeatureBadgeHTML: React.FC<FeatureBadgeHTMLProps> = 
  ({ texts, initialAngle, orbitRadius, speed, color, brainOffset }) => {
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
      Math.cos(initialAngle) * orbitRadius + brainOffset.x,
      Math.cos(initialAngle + Math.PI * 0.5) * orbitRadius * 0.9 + brainOffset.x,
      Math.cos(initialAngle + Math.PI) * orbitRadius * 0.8 + brainOffset.x,
      Math.cos(initialAngle + Math.PI * 1.5) * orbitRadius * 0.9 + brainOffset.x,
      Math.cos(initialAngle + Math.PI * 2) * orbitRadius + brainOffset.x,
    ],
    y: [
      Math.sin(initialAngle) * orbitRadius * 0.7 + brainOffset.y,
      Math.sin(initialAngle + Math.PI * 0.5) * orbitRadius + brainOffset.y,
      Math.sin(initialAngle + Math.PI) * orbitRadius * 0.7 + brainOffset.y,
      Math.sin(initialAngle + Math.PI * 1.5) * orbitRadius * 0.5 + brainOffset.y,
      Math.sin(initialAngle + Math.PI * 2) * orbitRadius * 0.7 + brainOffset.y,
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
      className={`absolute p-4 px-6 text-lg font-extrabold text-white rounded-xl shadow-2xl ${color} transform-gpu flex items-center justify-center min-w-[160px] h-[60px] border-2 border-white/30 backdrop-blur-sm`}
      style={{ x: 0, y: 0 }}
      animate={animateProps}
      transition={transitionProps}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={texts[currentTextIndex]}
          initial={{ opacity: 0, y: 8, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.8 }}
          transition={{ duration: 0.6 }}
          className="text-center whitespace-nowrap tracking-wide"
        >
          {texts[currentTextIndex]}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
};


const HeroSection: React.FC = () => {
  const brainContainerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({width: 0, height: 0});
  const [brainOffset, setBrainOffset] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!brainContainerRef.current) return;
    
    const rect = brainContainerRef.current.getBoundingClientRect();
    const containerWidth = brainContainerRef.current.clientWidth;
    const containerHeight = brainContainerRef.current.clientHeight;
    
    if (containerWidth === 0 || containerHeight === 0) return;
    
    const x = ((e.clientX - rect.left) / containerWidth) * 2 - 1;
    const y = -((e.clientY - rect.top) / containerHeight) * 2 + 1;
    
    const newBrainOffset = {
      x: x * 0.2 * 100,
      y: y * 0.2 * 100
    };
    
    gsap.to(brainOffset, {
      x: newBrainOffset.x,
      y: newBrainOffset.y,
      duration: 0.5,
      onUpdate: () => {
        setBrainOffset({ ...brainOffset });
      }
    });
  }, [brainOffset]);

  useEffect(() => {
    if (brainContainerRef.current) {
      setContainerSize({
        width: brainContainerRef.current.offsetWidth,
        height: brainContainerRef.current.offsetHeight
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [onMouseMove]);

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
              brainOffset={brainOffset}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
