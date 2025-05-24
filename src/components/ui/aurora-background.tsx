import { motion } from 'framer-motion';

export default function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black" />
      
      {/* Animated aurora layers */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(ellipse 80% 50% at 20% 40%, rgba(56, 189, 248, 0.3) 0%, transparent 50%), radial-gradient(ellipse 60% 80% at 80% 20%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)',
            'radial-gradient(ellipse 60% 80% at 40% 20%, rgba(56, 189, 248, 0.2) 0%, transparent 50%), radial-gradient(ellipse 80% 50% at 60% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
            'radial-gradient(ellipse 80% 50% at 20% 40%, rgba(56, 189, 248, 0.3) 0%, transparent 50%), radial-gradient(ellipse 60% 80% at 80% 20%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(ellipse 100% 60% at 70% 30%, rgba(16, 185, 129, 0.2) 0%, transparent 50%), radial-gradient(ellipse 50% 100% at 30% 70%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
            'radial-gradient(ellipse 50% 100% at 50% 70%, rgba(16, 185, 129, 0.15) 0%, transparent 50%), radial-gradient(ellipse 100% 60% at 50% 30%, rgba(236, 72, 153, 0.2) 0%, transparent 50%)',
            'radial-gradient(ellipse 100% 60% at 70% 30%, rgba(16, 185, 129, 0.2) 0%, transparent 50%), radial-gradient(ellipse 50% 100% at 30% 70%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      {/* Shimmer overlay */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          background: [
            'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
            'linear-gradient(225deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
            'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
          ],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Stars effect */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
} 