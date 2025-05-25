import React from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const FeatureCard = ({ children, className, ...props }: FeatureCardProps) => {
  return (
    <div
      className={cn(
        "p-4 sm:p-6 md:p-8 relative overflow-hidden bg-card text-card-foreground rounded-lg shadow-lg",
        "transition-colors duration-300 ease-in-out",
        "border-2 border-transparent",
        "hover:border-primary dark:hover:border-primary",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const FeatureTitle = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return (
    <h3 
      className={cn(
        "text-xl md:text-2xl font-semibold tracking-tight text-foreground mb-2 md:mb-3",
        className
      )}
    >
      {children}
    </h3>
  );
};

const FeatureDescription = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return (
    <p 
      className={cn(
        "text-sm md:text-base text-muted-foreground leading-relaxed",
        className
      )}
    >
      {children}
    </p>
  );
};

export { FeatureCard, FeatureTitle, FeatureDescription };