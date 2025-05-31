import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useInView } from "framer-motion";
import { Container } from "@/components/ui/container";
import { 
  Users, 
  Rocket, 
  Award, 
  BookOpen, 
  Heart, 
  Zap, 
  Globe, 
  Star,
  Lightbulb 
} from "lucide-react";
import { cn } from "@/lib/utils";

// Stats Counter Component with animation
const StatsCounter = ({ 
  value, 
  label, 
  icon,
  suffix = ""
}: { 
  value: number; 
  label: string; 
  icon: React.ReactNode;
  suffix?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Use framer-motion's useSpring for smooth counting animation
  const springValue = useSpring(0, { 
    stiffness: 50, 
    damping: 15 
  });
  
  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value);
      setHasAnimated(true);
    }
  }, [isInView, value, springValue, hasAnimated]);
  
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const unsubscribe = springValue.onChange(v => {
      setDisplayValue(Math.floor(v));
    });
    return unsubscribe;
  }, [springValue]);
  
  return (
    <motion.div 
      ref={ref}
      className="flex flex-col items-center p-6 rounded-xl bg-gray-900/70 border border-gray-800 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500">
        {displayValue}{suffix}
      </h3>
      <p className="text-gray-400 text-center">{label}</p>
    </motion.div>
  );
};

// Team Card Component with hover effect
const TeamCard = ({ 
  name, 
  role, 
  bio, 
  image 
}: { 
  name: string; 
  role: string; 
  bio: string; 
  image: string;
}) => {
  return (
    <motion.div 
      className="rounded-xl bg-gray-900/70 border border-gray-800 overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="h-64 overflow-hidden">
        <motion.img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-primary mb-3">{role}</p>
        <p className="text-gray-400 text-sm">{bio}</p>
        <div className="mt-4 flex space-x-3">
          <a href="#" className="text-gray-400 hover:text-primary transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-primary transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-primary transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// Timeline Item Component
const TimelineItem = ({ 
  year, 
  title, 
  description, 
  icon,
  isLeft = false 
}: { 
  year: string; 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  isLeft?: boolean;
}) => {
  return (
    <div className={cn(
      "flex items-start relative",
      isLeft ? "flex-row-reverse text-right" : "flex-row"
    )}>
      {/* Timeline marker */}
      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center z-10 border-4 border-gray-900">
        <div className="text-primary">
          {icon}
        </div>
      </div>
      
      {/* Vertical line */}
      <div className="absolute top-8 bottom-0 w-0.5 bg-gray-800 left-8 -ml-px h-full" aria-hidden="true" />
      
      {/* Content */}
      <motion.div 
        className={cn(
          "bg-gray-900/70 border border-gray-800 rounded-xl p-6 shadow-lg",
          isLeft ? "mr-10" : "ml-10"
        )}
        initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="block text-primary font-bold mb-2">{year}</span>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </motion.div>
    </div>
  );
};

export default function AboutPage() {
  // Team members data
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "Alex founded Flashcast with a vision to transform how people learn. With 15+ years in EdTech, he's passionate about making education more accessible and effective.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
    },
    {
      name: "Sophia Chen",
      role: "Chief Product Officer",
      bio: "Sophia leads product development at Flashcast. Her background in cognitive science and UX design helps create learning experiences that are both intuitive and effective.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80"
    },
    {
      name: "Marcus Williams",
      role: "CTO",
      bio: "Marcus oversees all technical aspects of Flashcast. His expertise in AI and voice recognition technology powers our innovative learning features.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
    },
    {
      name: "Priya Patel",
      role: "Head of Learning Science",
      bio: "Priya ensures Flashcast's features are grounded in educational research. Her PhD in cognitive psychology helps optimize our spaced repetition algorithms.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
    },
    {
      name: "David Kim",
      role: "VP of Marketing",
      bio: "David leads Flashcast's marketing initiatives. His background in both education and tech marketing helps us connect with learners worldwide.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
    },
    {
      name: "Elena Rodriguez",
      role: "Customer Success Lead",
      bio: "Elena ensures our users get the most out of Flashcast. Her experience as an educator helps her understand the real challenges learners face.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
    }
  ];

  // Timeline milestones
  const timelineMilestones = [
    {
      year: "2023",
      title: "Flashcast Founded",
      description: "Alex Johnson founded Flashcast with a mission to revolutionize learning through voice technology.",
      icon: <Rocket className="w-6 h-6" />
    },
    {
      year: "2023",
      title: "Seed Funding",
      description: "Secured $2M in seed funding from leading EdTech investors to build our core technology.",
      icon: <Award className="w-6 h-6" />
    },
    {
      year: "2024",
      title: "Beta Launch",
      description: "Released our beta version to 5,000 early adopters, gathering crucial feedback for improvements.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      year: "2024",
      title: "Team Expansion",
      description: "Grew our team to 20 passionate educators, engineers, and designers committed to our mission.",
      icon: <Users className="w-6 h-6" />
    },
    {
      year: "2025",
      title: "Official Launch",
      description: "Launched Flashcast 1.0 with our signature voice control and smart repetition features.",
      icon: <Star className="w-6 h-6" />
    },
    {
      year: "2025",
      title: "Global Expansion",
      description: "Expanded to serve learners in over 30 countries with multi-language support.",
      icon: <Globe className="w-6 h-6" />
    }
  ];

  // Company values
  const values = [
    {
      title: "Learning for Everyone",
      description: "We believe quality education should be accessible to all, regardless of background or circumstance.",
      icon: <Globe className="w-6 h-6" />
    },
    {
      title: "Innovation with Purpose",
      description: "We push technological boundaries not for their own sake, but to solve real educational challenges.",
      icon: <Lightbulb className="w-6 h-6" />
    },
    {
      title: "Research-Backed Methods",
      description: "Every feature we build is grounded in cognitive science and educational research.",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      title: "User-Centered Design",
      description: "We design with empathy, putting learners' needs at the center of everything we create.",
      icon: <Heart className="w-6 h-6" />
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
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500 mb-6">
                Our Story
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                Flashcast began with a simple question: <span className="italic">Why is learning so often boring?</span>
              </p>
              <p className="text-gray-400 mb-4">
                Founded in 2023 by Alex Johnson, Flashcast emerged from his frustration with existing study tools. 
                As a medical student, Alex found himself spending hours creating flashcards, but the process was tedious and inefficient.
              </p>
              <p className="text-gray-400 mb-4">
                He envisioned a smarter way to learn—one that leveraged voice technology to make studying hands-free, 
                adaptive algorithms to optimize retention, and thoughtful design to make the experience enjoyable.
              </p>
              <p className="text-gray-400">
                Today, Flashcast is helping thousands of students, professionals, and lifelong learners 
                study more efficiently and effectively. Our mission remains the same: to transform learning 
                from a chore into an engaging, accessible, and effective experience for everyone.
              </p>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-75"></div>
                <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" 
                    alt="Flashcast team collaboration" 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Stats Counter Section */}
      <section className="py-20">
        <Container>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Our Impact <span className="text-primary">by the Numbers</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCounter 
              value={50000} 
              label="Active Users" 
              icon={<Users className="w-6 h-6" />}
              suffix="+"
            />
            <StatsCounter 
              value={3000000} 
              label="Flashcards Created" 
              icon={<BookOpen className="w-6 h-6" />}
              suffix="+"
            />
            <StatsCounter 
              value={30} 
              label="Countries" 
              icon={<Globe className="w-6 h-6" />}
              suffix="+"
            />
            <StatsCounter 
              value={95} 
              label="User Satisfaction" 
              icon={<Award className="w-6 h-6" />}
              suffix="%"
            />
          </div>
        </Container>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-black/50">
        <Container>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Our <span className="text-primary">Journey</span>
          </motion.h2>
          
          <div className="space-y-16">
            {timelineMilestones.map((milestone, index) => (
              <TimelineItem 
                key={index}
                year={milestone.year}
                title={milestone.title}
                description={milestone.description}
                icon={milestone.icon}
                isLeft={index % 2 !== 0}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <Container>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Meet Our <span className="text-primary">Team</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            We're a diverse group of educators, engineers, and designers united by a passion for transforming how people learn.
          </motion.p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamCard 
                key={index}
                name={member.name}
                role={member.role}
                bio={member.bio}
                image={member.image}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Mission & Values Section */}
      <section className="py-20 bg-black/50">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Our Mission & Values
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              At Flashcast, our mission is to make effective learning accessible to everyone through 
              technology that adapts to individual needs and removes barriers to education.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div 
                key={index}
                className="bg-gray-900/70 border border-gray-800 rounded-xl p-8 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Us on Our Mission
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Whether you're a student, educator, or lifelong learner, be part of the Flashcast community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="relative h-12 px-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <span>Start Learning Today</span>
                <div className="absolute inset-0 w-full h-full bg-white/20 opacity-0 hover:opacity-20 transition-opacity" />
              </button>
              <button className="h-12 px-10 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300">
                <span>Join Our Team</span>
              </button>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
