import { motion } from 'framer-motion';
import { Sparkles, Star, Heart, Zap, Mic, BookOpen, Brain, Target } from 'lucide-react';

interface FloatingElementsProps {
  isHovering: boolean;
}

const floatingIcons = [
  { icon: Sparkles, delay: 0, angle: 0 },
  { icon: Star, delay: 0.1, angle: 45 },
  { icon: Heart, delay: 0.2, angle: 90 },
  { icon: Zap, delay: 0.3, angle: 135 },
  { icon: Mic, delay: 0.4, angle: 180 },
  { icon: BookOpen, delay: 0.5, angle: 225 },
  { icon: Brain, delay: 0.6, angle: 270 },
  { icon: Target, delay: 0.7, angle: 315 },
];

export default function FloatingElements({ isHovering }: FloatingElementsProps) {
  const radius = 120; // Increased radius to avoid button overlap

  return (
    <div className="absolute inset-0 pointer-events-none">
      {floatingIcons.map(({ icon: Icon, delay, angle }, index) => {
        // Convert angle to radians and calculate position
        const radian = (angle * Math.PI) / 180;
        const x = Math.cos(radian) * radius;
        const y = Math.sin(radian) * radius;

        return (
          <motion.div
            key={index}
            className="absolute top-1/2 left-1/2 z-20"
            initial={{ 
              x: 0, 
              y: 0, 
              opacity: 0,
              scale: 0,
              rotate: 0 
            }}
            animate={{
              x: isHovering ? x : 0,
              y: isHovering ? y : 0,
              opacity: isHovering ? 0.9 : 0,
              scale: isHovering ? 1 : 0,
              rotate: isHovering ? 15 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              delay: isHovering ? delay : 0,
              duration: isHovering ? 0.6 : 0.3,
            }}
          >
            <Icon 
              className="w-5 h-5 text-yellow-500 dark:text-yellow-400" 
              strokeWidth={1.5}
            />
          </motion.div>
        );
      })}
    </div>
  );
} 