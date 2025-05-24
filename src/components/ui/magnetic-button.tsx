import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function MagneticButton({ 
  children, 
  className = "", 
  onClick, 
  disabled = false, 
  onMouseEnter,
  onMouseLeave 
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (disabled) return;
    
    const { clientX, clientY } = e;
    if (!ref.current) return;
    
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
    onMouseLeave?.();
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    onMouseEnter?.();
    handleMouse(e);
  };

  const { x, y } = position;

  return (
    <motion.button
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={reset}
      onClick={onClick}
      disabled={disabled}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
} 