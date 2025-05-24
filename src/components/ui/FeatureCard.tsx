import React from "react";
import { cn } from "@/lib/utils"; // Assuming @ is configured for src (it is)

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  // className is inherited from HTMLAttributes
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

// FeatureTitle and FeatureDescription will also be created as separate components
// For now, they can be simple styled p tags or h tags within the skeleton components.
// Or, create them as separate files if preferred for modularity.

const FeatureTitle = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return (
    <h3 
      className={cn(
        "text-xl md:text-2xl font-semibold tracking-tight text-foreground mb-2 md:mb-3", // Themed text, adjusted margin
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
        "text-sm md:text-base text-muted-foreground leading-relaxed", // Themed text
        className
      )}
    >
      {children}
    </p>
  );
};

export { FeatureCard, FeatureTitle, FeatureDescription };