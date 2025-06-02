"use client";

import { motion } from "framer-motion";
import { Smartphone, Laptop, Tablet, Wifi, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { GridPatternBackground } from "./GridPatternBackground";

export const MultiPlatformTab = () => {
  const devices = [
    { name: 'Mobile', icon: Smartphone, color: 'from-primary to-green-600', position: { x: -120, y: 40 } },
    { name: 'Desktop', icon: Laptop, color: 'from-yellow-500 to-amber-600', position: { x: 0, y: -20 } },
    { name: 'Tablet', icon: Tablet, color: 'from-primary to-yellow-500', position: { x: 120, y: 40 } },
  ];

  return (
    <motion.div
      className={cn(
        "relative w-full h-[500px] rounded-3xl overflow-hidden",
        "bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white",
        "text-card-foreground",
        "transform border-2 border-transparent",
        "transition-colors duration-300 ease-in-out",
        "hover:border-primary hover:shadow-2xl hover:bg-primary/10",
        "dark:hover:border-primary dark:hover:bg-primary/20"
      )}
      whileHover={{
        scale: 1.01,
        rotate: 0
      }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <GridPatternBackground
        size={20}
        className="absolute inset-0 opacity-50 dark:opacity-30"
      />
      
      <div className="relative z-20 p-8 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-primary to-yellow-500 rounded-2xl text-white shadow-lg">
            <Wifi className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">Multi-Platform</h3>
            <p className="text-muted-foreground">Seamlessly access and sync your flashcards across all your devices, anytime, anywhere.</p>
          </div>
        </div>

        {/* Feature Points */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-sm text-muted-foreground">Cross-platform sync</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-muted-foreground">Offline accessibility</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-sm text-muted-foreground">Cloud backup</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-muted-foreground">Real-time updates</span>
          </div>
        </div>

        {/* Device Sync Visualization */}
        <div className="flex-grow flex items-center justify-center relative">
          <div className="relative w-80 h-60">
            {/* Central Sync Hub */}
            <motion.div
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-primary to-yellow-500 rounded-full flex items-center justify-center shadow-lg"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <RefreshCw className="w-8 h-8 text-white" />
            </motion.div>

            {/* Devices */}
            {devices.map((device, index) => {
              const Icon = device.icon;
              return (
                <div key={device.name}>
                  {/* Device */}
                  <motion.div
                    className={`absolute w-20 h-20 bg-gradient-to-br ${device.color} rounded-2xl flex items-center justify-center shadow-lg border-2 border-white/20`}
                    style={{
                      left: `calc(50% + ${device.position.x}px)`,
                      top: `calc(50% + ${device.position.y}px)`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    animate={{
                      y: [0, -10, 0, 10, 0],
                      rotate: [0, -5, 0, 5, 0],
                    }}
                    transition={{
                      duration: 4 + index * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Connection Line (simplified and subtle) */}
                  <motion.div
                    className="absolute h-0.5 bg-gradient-to-r from-primary/60 to-yellow-400/60"
                    style={{
                      left: `calc(50% + ${device.position.x > 0 ? 0 : device.position.x}px)`,
                      top: `calc(50% + ${device.position.y > 0 ? 0 : device.position.y}px)`,
                      width: `${Math.abs(device.position.x)}px`,
                      transformOrigin: device.position.x > 0 ? 'left center' : 'right center',
                      transform: `translateY(-50%) rotate(${Math.atan2(device.position.y, device.position.x) * 180 / Math.PI}deg)`,
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1,
                      delay: index * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Sync Pulse (simplified and more prominent) */}
                  <motion.div
                    className="absolute w-4 h-4 bg-yellow-300 rounded-full"
                    style={{
                      left: `calc(50% + ${device.position.x}px)`,
                      top: `calc(50% + ${device.position.y}px)`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    animate={{
                      x: [0, -device.position.x],
                      y: [0, -device.position.y],
                      opacity: [0, 1, 0],
                      scale: [0.2, 1.2, 0.2],
                    }}
                    transition={{
                      duration: 1,
                      delay: index * 0.3,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />

                  {/* Device Label */}
                  <motion.div
                    className="absolute text-sm font-medium text-muted-foreground"
                    style={{
                      left: `calc(50% + ${device.position.x}px)`,
                      top: `calc(50% + ${device.position.y + 50}px)`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    animate={{
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {device.name}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};