import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, Headphones, Settings, CreditCard, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const categories: Category[] = [
  { id: "all", name: "All", icon: HelpCircle, color: "text-primary" },
  { id: "getting-started", name: "Getting Started", icon: BookOpen, color: "text-blue-500" },
  { id: "voice-features", name: "Voice Features", icon: Headphones, color: "text-green-500" },
  { id: "customization", name: "Customization", icon: Settings, color: "text-purple-500" },
  { id: "pricing", name: "Pricing", icon: CreditCard, color: "text-orange-500" },
];

const faqData: FaqItem[] = [
  {
    question: "How do I get started with FlashCast?",
    answer: "Getting started with FlashCast is easy! Simply create an account, upload your study materials or create your first deck manually. You can start practicing immediately with our voice-controlled flashcards. Our onboarding guide will walk you through the basic features.",
    category: "getting-started"
  },
  {
    question: "What file formats can I import?",
    answer: "FlashCast supports a wide variety of formats including CSV, TXT, Anki decks (.apkg), Quizlet sets, PDF text extraction, and even direct copy-paste from documents. We also have browser extensions for popular study platforms.",
    category: "getting-started"
  },
  {
    question: "How accurate is the voice recognition?",
    answer: "FlashCast uses advanced AI-powered speech recognition with 98%+ accuracy for English and 95%+ for other supported languages. The system learns from your pronunciation patterns and adapts to your accent over time for even better accuracy.",
    category: "voice-features"
  },
  {
    question: "Can I practice in multiple languages?",
    answer: "Absolutely! FlashCast supports over 40 languages for voice recognition and text-to-speech. You can create multilingual decks and practice pronunciation in any supported language. Perfect for language learners!",
    category: "voice-features"
  },
  {
    question: "How does the spaced repetition algorithm work?",
    answer: "FlashCast uses an advanced spaced repetition algorithm based on your performance, difficulty ratings, and learning patterns. Cards you struggle with appear more frequently, while mastered cards appear less often. The AI continuously optimizes your review schedule.",
    category: "voice-features"
  },
  {
    question: "Can I customize the appearance of my flashcards?",
    answer: "Yes! FlashCast offers extensive customization options including themes, fonts, colors, card layouts, and even custom CSS for advanced users. You can also add images, audio, and rich text formatting to your cards.",
    category: "customization"
  },
  {
    question: "Are there team/collaborative features?",
    answer: "FlashCast Pro includes team features like shared decks, progress tracking for groups, collaborative editing, and instructor dashboards. Perfect for classrooms, study groups, and corporate training programs.",
    category: "customization"
  },
  {
    question: "Is FlashCast free to use?",
    answer: "Yes! FlashCast is currently completely free to use with all features available. We're in our early access phase and want to help as many students as possible improve their learning. Premium features and subscription plans may be introduced in the future, but for now, enjoy unlimited access to all our AI-powered study tools at no cost.",
    category: "pricing"
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Since FlashCast is currently free to use, there are no subscriptions to cancel! You can simply stop using the app anytime without any commitments. Your study data will remain safe in your account, and you can return anytime. When we do introduce premium plans in the future, we'll ensure easy cancellation with full data retention.",
    category: "pricing"
  },
  {
    question: "Do you offer educational discounts?",
    answer: "Currently, FlashCast is completely free for everyone - students, teachers, and institutions alike! No need for educational discounts when there's no cost. We believe in making quality education tools accessible to all. When we introduce premium features in the future, we'll definitely consider special pricing for educational institutions and students.",
    category: "pricing"
  }
];

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.02, delay: delay + index * 0.01 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

const FAQSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const filteredFAQs = useMemo(() => {
    let filtered = faqData;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.split(regex).map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-primary/20 text-primary rounded px-1">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center gap-2 border border-border bg-muted/50 py-2 px-4 rounded-full text-sm font-medium text-muted-foreground mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <HelpCircle className="w-4 h-4" />
            Frequently Asked Questions
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground dark:text-white mb-4">
            Got questions? We've got answers
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about FlashCast's features, pricing, and getting started.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "relative inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-300",
                    isActive
                      ? "border-primary bg-primary/10 text-primary hover:border-green-500 dark:hover:border-yellow-400"
                      : "bg-muted border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:border-green-500 dark:hover:border-yellow-400"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className={cn("w-4 h-4", category.color)} />
                  <span className="text-sm font-medium">{category.name}</span>
                  
                  {isActive && (
                    <motion.div
                      layoutId="categoryIndicator"
                      className="absolute -bottom-2 left-0 right-0 mx-auto w-8 h-1 bg-foreground/70 dark:bg-primary rounded-b-full"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-card p-6 rounded-3xl"
          >
            <h3 className="text-xl font-semibold text-foreground dark:text-white mb-6">
              Questions ({filteredFAQs.length})
            </h3>
            
            <Accordion type="single" collapsible value={expandedItem || ""} onValueChange={setExpandedItem}>
              <AnimatePresence>
                {filteredFAQs.map((faq, index) => (
                  <motion.div
                    key={faq.question}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <AccordionItem value={`item-${index}`} className="border-border/50">
                      <AccordionTrigger className="bg-transparent hover:bg-accent focus-visible:bg-accent text-left hover:no-underline group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        <span className="text-sm md:text-base font-medium text-foreground group-hover:text-primary transition-colors">
                          {highlightText(faq.question, searchQuery)}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="text-muted-foreground text-sm">
                          Category: {categories.find(c => c.id === faq.category)?.name}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </AnimatePresence>
            </Accordion>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:pl-8"
          >
            <h3 className="text-xl font-semibold text-foreground dark:text-white mb-6">
              Answer
            </h3>
            
            <div className="min-h-[400px] p-6 rounded-3xl bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white border-2 border-transparent">
              <AnimatePresence mode="wait">
                {expandedItem ? (
                  <motion.div
                    key={expandedItem}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {(() => {
                      const itemIndex = parseInt(expandedItem.replace('item-', ''));
                      const faq = filteredFAQs[itemIndex];
                      
                      if (!faq) return null;
                      
                      const categoryInfo = categories.find(c => c.id === faq.category);
                      const Icon = categoryInfo?.icon || HelpCircle;
                      
                      return (
                        <>
                          <div className="flex items-center gap-3 mb-4">
                            <Icon className={cn("w-6 h-6", categoryInfo?.color || "text-primary")} />
                            <span className="text-sm text-muted-foreground">
                              {categoryInfo?.name}
                            </span>
                          </div>
                          
                          <h4 className="text-lg font-semibold text-foreground dark:text-white mb-4">
                            {highlightText(faq.question, searchQuery)}
                          </h4>
                          
                          <div className="text-muted-foreground leading-relaxed">
                            <TypewriterText text={faq.answer} delay={0.3} />
                          </div>
                        </>
                      );
                    })()}
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }} 
                    className="flex items-center justify-center h-full text-center"
                  >
                    <div>
                      <HelpCircle className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Select a question to see the detailed answer
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {filteredFAQs.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-12"
            >
              <Search className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">
                No FAQs found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search or category filter
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FAQSection; 