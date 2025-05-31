import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Mic, Clock, Wifi, Share2, BarChart2, Brain } from "lucide-react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

// 3D Card Component for Features
const ThreeDCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => {
  return (
    <motion.div 
      className="group relative h-full w-full rounded-xl bg-gradient-to-br from-gray-900/90 to-gray-900/70 border border-gray-800 p-8 shadow-xl"
      whileHover={{ 
        scale: 1.02,
        rotateX: 5,
        rotateY: 5,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
        <p className="mt-auto text-gray-400">{description}</p>
      </div>
      <div className="pointer-events-none absolute inset-0 h-full w-full rounded-xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );
};

// Bento Grid Feature Component
const BentoGrid = ({ items }: { items: { icon: React.ReactNode; title: string; description: string }[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Feature list">
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="rounded-xl bg-gray-900/70 border border-gray-800 p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <div className="mb-4 flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
            {item.icon}
          </div>
          <h3 className="mb-2 text-lg font-bold text-white">{item.title}</h3>
          <p className="text-sm text-gray-400">{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

// Testimonials for the infinite carousel
const testimonials = [
  {
    quote: "Flashcast transformed how I study for medical exams. The voice control is a game-changer!",
    name: "Dr. Sarah Johnson",
    title: "Medical Resident"
  },
  {
    quote: "I've tried dozens of flashcard apps, but none compare to Flashcast's intuitive interface and smart repetition.",
    name: "Michael Chen",
    title: "Computer Science Student"
  },
  {
    quote: "The offline mode is perfect for my commute. I can study anywhere without worrying about connectivity.",
    name: "Emma Rodriguez",
    title: "Language Learner"
  },
  {
    quote: "Being able to share decks with my study group has made collaboration so much easier.",
    name: "James Wilson",
    title: "MBA Candidate"
  },
  {
    quote: "The progress analytics help me focus on exactly what I need to improve. My test scores have gone up significantly.",
    name: "Aisha Patel",
    title: "High School Teacher"
  }
];

export default function FeaturesPage() {
  const mainFeatures = [
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Voice Control",
      description: "Navigate and flip cards hands-free with natural voice commands, perfect for multitasking."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Smart Spaced Repetition",
      description: "Our algorithm adapts to your learning patterns, showing cards at optimal intervals for retention."
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: "Offline Mode",
      description: "Study anywhere without an internet connection. Changes sync automatically when you're back online."
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Deck Sharing",
      description: "Collaborate with classmates by sharing and importing decks with a simple link."
    },
    {
      icon: <BarChart2 className="w-6 h-6" />,
      title: "Progress Analytics",
      description: "Track your learning journey with detailed metrics and visualizations of your improvement."
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Suggestions",
      description: "Receive personalized recommendations for study sessions based on your performance."
    }
  ];

  const additionalFeatures = [
    {
      icon: <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>,
      title: "Custom Card Templates",
      description: "Create your own card layouts with rich text, images, and audio."
    },
    {
      icon: <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
      title: "Import from Anywhere",
      description: "Easily import existing flashcards from CSV, Excel, or other popular apps."
    },
    {
      icon: <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      title: "Privacy First",
      description: "Your study data stays private and secure with end-to-end encryption."
    },
    {
      icon: <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>,
      title: "Cloud Sync",
      description: "Access your flashcards from any device with automatic cloud synchronization."
    },
    {
      icon: <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>,
      title: "Multiple Languages",
      description: "Study in over 50 languages with built-in pronunciation guides."
    },
    {
      icon: <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
      title: "Fast Performance",
      description: "Enjoy a smooth, responsive experience even with thousands of cards."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:60px_60px]" />
        <div className="absolute h-full w-full bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        
        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Supercharge Your Learning
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Discover how Flashcast's innovative features transform study sessions into effective, 
              efficient, and enjoyable learning experiences.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* 3D Card Grid */}
      <section className="py-20 bg-black/50">
        <Container>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Powerful Features at Your <span className="text-primary">Command</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature, index) => (
              <ThreeDCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Bento Grid Section */}
      <section className="py-20">
        <Container>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Everything You Need to <span className="text-primary">Excel</span>
          </motion.h2>
          
          <BentoGrid items={additionalFeatures} />
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-black/50">
        <Container>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            What Our Users <span className="text-primary">Say</span>
          </motion.h2>
          
          <div className="overflow-hidden w-full">
            <InfiniteMovingCards
              items={testimonials}
              direction="left"
              speed="normal"
              pauseOnHover={true}
            />
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Ready to Transform Your Study Habits?
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Join thousands of students who've already improved their learning efficiency with Flashcast.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <button className="relative h-12 px-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <span>Start Free Trial</span>
                <div className="absolute inset-0 w-full h-full bg-white/20 opacity-0 hover:opacity-20 transition-opacity" />
              </button>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
}
