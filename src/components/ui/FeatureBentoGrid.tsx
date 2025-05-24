import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { VoiceDetectionCard } from "./VoiceDetectionCard";
import { InstantFlipCard } from "./InstantFlipCard";
import { ImportExportCard } from "./ImportExportCard";
import { ProgressTrackingCard } from "./ProgressTrackingCard";
import { DeckCustomizationCard } from "./DeckCustomizationCard";

interface FeatureBentoGridProps extends React.HTMLAttributes<HTMLDivElement> {}

gsap.registerPlugin(ScrollTrigger);

const FeatureBentoGrid = ({ className }: FeatureBentoGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const cards = gsap.utils.toArray(gridRef.current.children);
        cards.forEach((card, index) => {
          gsap.fromTo(
            card as gsap.TweenTarget,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
                              stagger: 0.1,
              delay: index * 0.1,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "w-full py-12 md:py-20 lg:py-24 text-foreground",
        className
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
            Discover What Flashcast Offers
          </h2>
          <p className="mt-3 md:mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore the powerful features designed to make your learning experience seamless and effective.
          </p>
        </div>
        <div
          ref={gridRef}
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
          )}
        >
          <VoiceDetectionCard className="lg:col-span-2 md:col-span-2" />
          <InstantFlipCard />
          <ImportExportCard />
          <ProgressTrackingCard />
          <DeckCustomizationCard className="lg:col-span-1 md:col-span-2 lg:col-start-3" />
        </div>
      </div>
    </section>
  );
};

export { FeatureBentoGrid };