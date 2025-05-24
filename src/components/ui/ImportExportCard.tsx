"use client";

import React from "react";
import { motion } from "framer-motion";
import { UploadCloud, DownloadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { GridPatternBackground } from "./GridPatternBackground";

interface ImportExportCardProps extends React.HTMLAttributes<HTMLDivElement> {}

const ImportExportCard = ({ className }: ImportExportCardProps) => {
  const [isDraggingOver, setIsDraggingOver] = React.useState(false);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingOver(false);
    alert("File drop simulated! Implement actual import logic.");
  };

  return (
    <motion.div
      className={cn(
        "p-6 rounded-3xl overflow-hidden",
        "bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white",
        "relative text-card-foreground",
        "min-h-[250px] md:min-h-[300px]",
        "transform border-2 border-transparent",
        "transition-colors duration-300 ease-in-out",
        "hover:border-primary hover:shadow-2xl hover:bg-primary/10",
        "dark:hover:border-primary dark:hover:bg-primary/20",
        className
      )}
      whileHover={{
        scale: 1.05,
        rotate: 1
      }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <GridPatternBackground
        size={20}
        className="absolute inset-0 opacity-50 dark:opacity-30"
      />
      <div
        className={cn(
          "relative z-10 flex flex-col items-center justify-center h-full border-2 border-dashed rounded-md transition-colors duration-200",
          isDraggingOver ? "border-primary bg-primary/10" : "border-muted-foreground/30 hover:border-primary/50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <UploadCloud
          className={cn(
            "w-12 h-12 mb-4 transition-colors duration-200",
            isDraggingOver ? "text-primary" : "text-muted-foreground"
          )}
        />
        <h3 className="text-lg md:text-xl font-semibold mb-1 text-center text-foreground dark:text-white">
          Your Decks, Your Way
        </h3>
        <p className="text-muted-foreground text-sm text-center mb-2">
          Drag & drop to import, or click to export.
        </p>
        <button
          className="mt-2 text-xs bg-secondary text-secondary-foreground hover:bg-secondary/80 px-3 py-1 rounded"
          onClick={(e) => {
            e.stopPropagation();
            alert("Export simulated! Implement actual export logic.");
          }}
        >
          <DownloadCloud className="inline-block w-3 h-3 mr-1" />
          Export Decks
        </button>
      </div>
    </motion.div>
  );
};

export { ImportExportCard };