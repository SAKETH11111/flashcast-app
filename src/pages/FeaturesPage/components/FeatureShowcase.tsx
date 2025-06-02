"use client";

import { Tabs } from "@/components/ui/tabs";
import { VoiceIntelligenceTab } from "@/components/ui/voice-intelligence-tab";
import { SmartRepetitionTab } from "@/components/ui/smart-repetition-tab";
import { MultiPlatformTab } from "@/components/ui/multi-platform-tab";
import { AnalyticsTab } from "@/components/ui/analytics-tab";
import { CollaborationTab } from "@/components/ui/collaboration-tab";
import { Mic, Brain, Wifi, BarChart3, Users } from "lucide-react";

export default function FeatureShowcase() {
  const tabs = [
    {
      title: "Voice Intelligence",
      value: "voice",
      icon: <Mic className="w-4 h-4" />,
      content: <VoiceIntelligenceTab />,
    },
    {
      title: "Smart Repetition",
      value: "repetition",
      icon: <Brain className="w-4 h-4" />,
      content: <SmartRepetitionTab />,
    },
    {
      title: "Multi-Platform",
      value: "platform",
      icon: <Wifi className="w-4 h-4" />,
      content: <MultiPlatformTab />,
    },
    {
      title: "Analytics",
      value: "analytics",
      icon: <BarChart3 className="w-4 h-4" />,
      content: <AnalyticsTab />,
    },
    {
      title: "Collaboration",
      value: "collaboration",
      icon: <Users className="w-4 h-4" />,
      content: <CollaborationTab />,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Powerful Features for
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"> Smart Learning</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how Flashcast revolutionizes the way you learn with cutting-edge technology and intelligent features designed for maximum retention and efficiency.
          </p>
        </div>

        {/* Tabs Container */}
        <div className="max-w-6xl mx-auto">
          <Tabs 
            tabs={tabs}
            containerClassName="mb-8"
            contentClassName="min-h-[500px]"
          />
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <div className="text-sm text-muted-foreground">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">5M+</div>
            <div className="text-sm text-muted-foreground">Cards Studied</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Availability</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Languages</div>
          </div>
        </div>
      </div>
    </section>
  );
} 