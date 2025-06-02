"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, AlertCircle, BookOpen, Users, BarChart2, Smartphone, ShieldCheck, Brain, Edit3, Gamepad2, Library, Cpu, Smile } from "lucide-react";

interface ComparisonValue {
  text?: string;
  icon: React.ReactNode;
  className?: string;
}

const renderValue = (value: string | ComparisonValue) => {
  if (typeof value === 'string') {
    return <span className="text-sm">{value}</span>;
  }
  return (
    <div className={cn("flex items-center gap-2", value.className)}>
      {value.icon}
      {value.text && <span className="text-sm">{value.text}</span>}
    </div>
  );
};

const comparisonData = [
  {
    feature: "Spaced Repetition System (SRS)",
    icon: <Brain className="w-5 h-5 text-primary" />,
    flashcast: { icon: <CheckCircle2 className="text-green-500" />, text: "AI-Adaptive, Personalized Intervals" },
    traditional: { icon: <AlertCircle className="text-yellow-500" />, text: "Manual, Fixed Intervals (e.g., Leitner)" },
    quizlet: { icon: <CheckCircle2 className="text-green-500" />, text: "Available (Premium), Standard Algorithm" },
    brainscape: { icon: <CheckCircle2 className="text-green-500" />, text: "Core Feature, Confidence-based Repetition" },
  },
  {
    feature: "AI-Powered Enhancements",
    icon: <Cpu className="w-5 h-5 text-primary" />,
    flashcast: { icon: <CheckCircle2 className="text-green-500" />, text: "Voice Intelligence, Smart Content Gen, Performance Prediction" },
    traditional: { icon: <XCircle className="text-red-500" />, text: "None" },
    quizlet: { icon: <AlertCircle className="text-yellow-500" />, text: "AI Study Coach (Magic Notes, Q-Chat - Premium)" },
    brainscape: { icon: <XCircle className="text-red-500" />, text: "Limited / None Explicitly AI-driven for users" },
  },
  {
    feature: "Flashcard Creation & Customization",
    icon: <Edit3 className="w-5 h-5 text-primary" />,
    flashcast: { icon: <CheckCircle2 className="text-green-500" />, text: "Voice, Text, Image, AI-assist, Rich Formatting" },
    traditional: { icon: <AlertCircle className="text-yellow-500" />, text: "Manual (Pen & Paper), Basic Text/Image" },
    quizlet: { icon: <CheckCircle2 className="text-green-500" />, text: "Text, Image, Audio (Premium), Basic Formatting, PDF/Doc Import" },
    brainscape: { icon: <CheckCircle2 className="text-green-500" />, text: "Text, Image, Audio, Advanced Editor, CSV Import" },
  },
  {
    feature: "Learning Modes & Gamification",
    icon: <Gamepad2 className="w-5 h-5 text-primary" />,
    flashcast: { icon: <CheckCircle2 className="text-green-500" />, text: "Interactive Exercises, Goal Setting, Streaks" },
    traditional: { icon: <XCircle className="text-red-500" />, text: "Self-directed Review Only" },
    quizlet: { icon: <CheckCircle2 className="text-green-500" />, text: "Learn, Test, Match, Gravity (Games)" },
    brainscape: { icon: <AlertCircle className="text-yellow-500" />, text: "Direct Flashcard Review, Confidence Scoring" },
  },
  {
    feature: "Content Ecosystem & Sharing",
    icon: <Library className="w-5 h-5 text-primary" />,
    flashcast: { icon: <CheckCircle2 className="text-green-500" />, text: "Curated & Community Decks, Secure Sharing" },
    traditional: { icon: <XCircle className="text-red-500" />, text: "Individual, Physical Sharing" },
    quizlet: { icon: <CheckCircle2 className="text-green-500" />, text: "Vast User-Generated Library, Class Sharing" },
    brainscape: { icon: <CheckCircle2 className="text-green-500" />, text: "Expert-Certified & User Decks, Class Management" },
  },
  {
    feature: "Progress Tracking & Analytics",
    icon: <BarChart2 className="w-5 h-5 text-primary" />,
    flashcast: { icon: <CheckCircle2 className="text-green-500" />, text: "Detailed Dashboards, Weakness Identification" },
    traditional: { icon: <XCircle className="text-red-500" />, text: "Manual, Subjective" },
    quizlet: { icon: <CheckCircle2 className="text-green-500" />, text: "Basic Progress, Mastery Scores (Learn Mode)" },
    brainscape: { icon: <CheckCircle2 className="text-green-500" />, text: "Mastery Charts, Study Time Tracking" },
  },
  {
    feature: "Multi-Platform Sync & Offline",
    icon: <Smartphone className="w-5 h-5 text-primary" />,
    flashcast: { icon: <CheckCircle2 className="text-green-500" />, text: "Web, iOS, Android with Full Offline" },
    traditional: { icon: <XCircle className="text-red-500" />, text: "Physical, Not Applicable" },
    quizlet: { icon: <CheckCircle2 className="text-green-500" />, text: "Web, iOS, Android, Offline (Premium)" },
    brainscape: { icon: <CheckCircle2 className="text-green-500" />, text: "Web, iOS, Android, Offline Access" },
  },
  {
    feature: "Collaboration Features",
    icon: <Users className="w-5 h-5 text-primary" />,
    flashcast: { icon: <CheckCircle2 className="text-green-500" />, text: "Group Study, Shared Decks, Leaderboards" },
    traditional: { icon: <AlertCircle className="text-yellow-500" />, text: "In-person Study Groups" },
    quizlet: { icon: <AlertCircle className="text-yellow-500" />, text: "Quizlet Live (Classroom Game), Basic Sharing" },
    brainscape: { icon: <AlertCircle className="text-yellow-500" />, text: "Class Creation & Deck Sharing for Teachers" },
  },
  {
    feature: "User Interface & Experience (UI/UX)",
    icon: <Smile className="w-5 h-5 text-primary" />,
    flashcast: { icon: <CheckCircle2 className="text-green-500" />, text: "Modern, Intuitive, Minimalist Design" },
    traditional: { icon: <AlertCircle className="text-yellow-500" />, text: "N/A (Physical)" },
    quizlet: { icon: <CheckCircle2 className="text-green-500" />, text: "User-Friendly, Ads in Free Version" },
    brainscape: { icon: <AlertCircle className="text-yellow-500" />, text: "Functional, Can Feel Dense" },
  },
];

const GlassmorphicTableRowWithNewHover = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, children, ...props }, ref) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const motionProps = props as any;

  return (
    <motion.tr
      ref={ref}
      className={cn(
        "border-b border-white/10 relative overflow-hidden",
        className
      )}
      style={{ transform: 'translateZ(0)' }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        backgroundColor: isHovered ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0)",
        y: isHovered ? -5 : 0,
        boxShadow: isHovered ? "0 10px 20px rgba(0,0,0,0.3)" : "none"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...motionProps}
    >
      {children}
    </motion.tr>
  );
});
GlassmorphicTableRowWithNewHover.displayName = "GlassmorphicTableRowWithNewHover";

export const FeatureComparisonTable = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-foreground">
          FlashCast vs. The Rest
        </h2>
        <p className="text-lg text-muted-foreground text-center mb-10 md:mb-16 max-w-2xl mx-auto">
          See how FlashCast stacks up against traditional study methods and other learning platforms.
        </p>

        <div
          className={cn(
            "rounded-xl border border-white/20 shadow-2xl overflow-hidden",
            "bg-clip-padding backdrop-filter backdrop-blur-lg",
            "bg-gradient-to-br from-black/30 via-black/50 to-black/30",
            "dark:from-neutral-800/50 dark:via-neutral-900/60 dark:to-neutral-800/50"
          )}
        >
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="border-b border-white/20 hover:bg-transparent">
                <TableHead className="w-[250px] py-4 px-4 text-left text-sm font-semibold text-white/90">
                  <BookOpen className="inline-block w-5 h-5 mr-2 align-middle text-primary" />
                  Feature
                </TableHead>
                <TableHead className="py-4 px-4 text-left text-sm font-semibold text-white/90">
                  <ShieldCheck className="inline-block w-5 h-5 mr-2 align-middle text-primary" />
                  FlashCast
                </TableHead>
                <TableHead className="py-4 px-4 text-left text-sm font-semibold text-white/90">Traditional Methods</TableHead>
                <TableHead className="py-4 px-4 text-left text-sm font-semibold text-white/90">Quizlet</TableHead>
                <TableHead className="py-4 px-4 text-left text-sm font-semibold text-white/90">Brainscape</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonData.map((item, index) => (
                <GlassmorphicTableRowWithNewHover key={index}>
                  <TableCell className="py-4 px-4 font-medium text-white/90 align-top">
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.feature}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-4 text-white/80 align-top">{renderValue(item.flashcast)}</TableCell>
                  <TableCell className="py-4 px-4 text-white/80 align-top">{renderValue(item.traditional)}</TableCell>
                  <TableCell className="py-4 px-4 text-white/80 align-top">{renderValue(item.quizlet)}</TableCell>
                  <TableCell className="py-4 px-4 text-white/80 align-top">{renderValue(item.brainscape)}</TableCell>
                </GlassmorphicTableRowWithNewHover>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};