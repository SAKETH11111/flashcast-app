"use client";
import React from "react";
import { motion } from "motion/react";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <motion.div 
                  className="p-6 rounded-3xl bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white border-2 border-transparent hover:border-primary shadow-lg hover:shadow-2xl transition-all duration-300 max-w-xs w-full group hover:bg-primary/10 dark:hover:bg-primary/20"
                  key={i}
                  whileHover={{ 
                    scale: 1.02,
                    rotate: 1,
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30 
                  }}
                >
                  <div className="text-sm leading-relaxed text-muted-foreground mb-4">
                    "{text}"
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-border"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    />
                    <div className="flex flex-col">
                      <div className="font-semibold text-foreground dark:text-white text-sm">
                        {name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

// FlashCast testimonials data
export const testimonials = [
  {
    text: "FlashCast transformed my study routine! The voice-driven flashcards make reviewing so much more engaging and effective.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
    name: "Sarah Chen",
    role: "Medical Student",
  },
  {
    text: "The AI-powered spaced repetition is incredible. I'm retaining information 3x better than traditional methods.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    name: "Alex Rodriguez",
    role: "Law Student",
  },
  {
    text: "As a language learner, FlashCast's pronunciation feedback has been a game-changer. My accent improved dramatically!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    name: "Emma Thompson",
    role: "Language Teacher",
  },
  {
    text: "The seamless sync across devices means I can study anywhere. Perfect for my busy schedule as a working professional.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    name: "Marcus Johnson",
    role: "Software Engineer",
  },
  {
    text: "FlashCast's analytics show me exactly where I need to focus. It's like having a personal study coach.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    name: "Priya Patel",
    role: "Data Scientist",
  },
  {
    text: "The collaborative features are amazing! My study group can share decks and learn together efficiently.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    name: "David Kim",
    role: "Graduate Student",
  },
  {
    text: "I love how FlashCast adapts to my learning pace. The AI really understands how I learn best.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    name: "Jessica Williams",
    role: "PhD Candidate",
  },
  {
    text: "The voice recognition is incredibly accurate. I can practice presentations while reviewing my notes seamlessly.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    name: "Michael Brown",
    role: "Business Student",
  },
  {
    text: "FlashCast made studying fun again! The gamification elements keep me motivated to reach my goals.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    name: "Zoe Martinez",
    role: "High School Student",
  },
];