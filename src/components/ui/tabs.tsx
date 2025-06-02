"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
  icon?: React.ReactNode;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div
        className={cn(
          "flex flex-wrap items-center justify-center gap-2 p-2 bg-muted/30 rounded-2xl backdrop-blur-sm border border-border/50",
          containerClassName
        )}
      >
        {propTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab)}
            className={cn(
              "relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-muted/50",
              "focus:outline-none focus:ring-2 focus:ring-primary/20",
              active.value === tab.value
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
              tabClassName
            )}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="activeTab"
                transition={{
                  type: "spring",
                  bounce: 0.15,
                  duration: 0.4,
                }}
                className={cn(
                  "absolute inset-0 bg-primary rounded-xl shadow-lg",
                  activeTabClassName
                )}
              />
            )}
            
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon && <span className="text-lg">{tab.icon}</span>}
              {tab.title}
            </span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={cn("mt-8", contentClassName)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active.value}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{
              type: "spring",
              bounce: 0.1,
              duration: 0.4,
            }}
            className="w-full h-full"
          >
            {active.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>           
  );
}; 