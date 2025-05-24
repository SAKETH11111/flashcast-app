"use client";
import { useMotionValue } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useMotionTemplate, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const EvervaultCard = ({
  children,
  className,
  borderEffect = "neon-glow",
}: {
  children?: React.ReactNode;
  className?: string;
  borderEffect?: "gradient-spin" | "pulse-glow" | "rainbow-shift" | "neon-glow" | "draw-border" | "none";
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  const [randomString, setRandomString] = useState("");

  useEffect(() => {
    let str = generateRandomString(1500);
    setRandomString(str);
  }, []);

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const getBorderClasses = () => {
    switch (borderEffect) {
      case "gradient-spin":
        return "before:absolute before:inset-0 before:rounded-3xl before:p-[2px] before:bg-gradient-to-r before:from-blue-500 before:via-purple-500 before:to-pink-500 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:animate-spin-slow before:-z-10";
      
      case "pulse-glow":
        return "before:absolute before:inset-0 before:rounded-3xl before:border-2 before:border-transparent before:bg-gradient-to-r before:from-cyan-400 before:to-blue-500 before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-300 hover:before:shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:before:animate-pulse";
      
      case "rainbow-shift":
        return "before:absolute before:inset-0 before:rounded-3xl before:p-[2px] before:bg-gradient-to-r before:from-red-500 before:via-yellow-500 before:via-green-500 before:via-blue-500 before:via-indigo-500 before:to-purple-500 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:bg-[length:400%_400%] hover:before:animate-gradient-x before:-z-10";
      
      case "neon-glow":
        return "before:absolute before:inset-0 before:rounded-3xl before:border-2 \
before:border-green-400 dark:before:border-yellow-400 \
before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-300 \
hover:before:shadow-[0_0_15px_rgba(74,222,128,0.7),inset_0_0_15px_rgba(74,222,128,0.1)] \
dark:hover:before:shadow-[0_0_15px_rgba(250,204,21,0.7),inset_0_0_15px_rgba(250,204,21,0.1)] \
hover:before:border-green-300 dark:hover:before:border-yellow-300";
      
      case "draw-border":
        return "before:absolute before:inset-0 before:rounded-3xl before:border-2 before:border-transparent before:bg-gradient-to-r before:from-violet-500 before:to-purple-500 before:opacity-0 hover:before:opacity-100 before:transition-all before:duration-700 before:bg-clip-border hover:before:animate-draw-border";
      
      default:
        return "";
    }
  };

  return (
    <div
      className={cn(
        "p-0.5 bg-transparent aspect-square flex items-center justify-center w-full h-full relative",
        getBorderClasses(),
        className
      )}
    >
      <div
        onMouseMove={onMouseMove}
        className="group/card rounded-3xl w-full relative overflow-hidden bg-transparent flex items-center justify-center h-full"
      >
        <CardPattern
          mouseX={mouseX}
          mouseY={mouseY}
          randomString={randomString}
        />
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export function CardPattern({ mouseX, mouseY, randomString }: any) {
  let maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl [mask-image:linear-gradient(white,transparent)] group-hover/card:opacity-50"></div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 to-blue-700 opacity-0 group-hover/card:opacity-100 backdrop-blur-xl transition duration-500"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay group-hover/card:opacity-100"
        style={style}
      >
        <p className="absolute inset-x-0 text-xs h-full break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-500">
          {randomString}
        </p>
      </motion.div>
    </div>
  );
}

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export const generateRandomString = (length: number) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Generic Icon component from example is omitted as we use Lucide.