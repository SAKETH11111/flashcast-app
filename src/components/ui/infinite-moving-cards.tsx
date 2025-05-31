import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
}

interface InfiniteMovingCardsProps {
  items: Testimonial[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: InfiniteMovingCardsProps) {
  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items];
  
  // Map speed names to duration in seconds
  const speedMap = {
    fast: 30,
    normal: 45,
    slow: 60,
  };
  
  const duration = speedMap[speed];
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener("change", handleMediaChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);
  
  // Animation keyframes
  const animationKeyframes = {
    left: {
      transform: "translateX(-50%)",
    },
    right: {
      transform: "translateX(0%)",
    },
  };
  
  const initialPosition = direction === "left" ? "transform: translateX(0%)" : "transform: translateX(-50%)";
  const animationDirection = direction === "left" ? "left" : "right";
  
  return (
    <div
      ref={containerRef}
      className={cn(
        "overflow-hidden relative w-full",
        className
      )}
      aria-label="Testimonials"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {prefersReducedMotion ? (
        // Static version for reduced motion preference
        <div className="flex flex-wrap gap-4 py-4">
          {items.slice(0, 3).map((item, idx) => (
            <TestimonialCard key={idx} item={item} />
          ))}
        </div>
      ) : (
        <div
          ref={scrollerRef}
          className="flex gap-4 w-max"
          style={{
            animationPlayState: isPaused ? "paused" : "running",
            animationDuration: `${duration}s`,
            animationName: animationDirection,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationDirection: "normal",
          }}
        >
          {duplicatedItems.map((item, idx) => (
            <TestimonialCard 
              key={idx} 
              item={item} 
              aria-live={isPaused ? "polite" : "off"}
            />
          ))}
        </div>
      )}
      
      <style jsx>{`
        @keyframes left {
          from { transform: translateX(0%); }
          to { transform: translateX(-50%); }
        }
        
        @keyframes right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0%); }
        }
      `}</style>
    </div>
  );
}

interface TestimonialCardProps {
  item: Testimonial;
  "aria-live"?: "off" | "polite";
}

function TestimonialCard({ item, ...props }: TestimonialCardProps) {
  return (
    <motion.div
      className="flex-shrink-0 w-[350px] md:w-[450px] rounded-xl bg-gray-900/80 border border-gray-800 p-6 shadow-lg hover:border-gray-600 transition-colors"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <div className="relative">
        <svg
          className="absolute top-0 left-0 w-8 h-8 text-primary/30 -translate-x-4 -translate-y-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <blockquote className="text-lg text-gray-200 mb-4">
          "{item.quote}"
        </blockquote>
        <footer className="mt-6">
          <p className="text-base font-medium text-primary">{item.name}</p>
          <p className="text-sm text-gray-400">{item.title}</p>
        </footer>
      </div>
    </motion.div>
  );
}
