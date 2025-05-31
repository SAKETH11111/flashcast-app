import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Container({
  children,
  className,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl",
        className
      )}
    >
      {children}
    </Component>
  );
}
