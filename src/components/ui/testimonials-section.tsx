import { TestimonialsColumn, testimonials } from "./testimonials-columns";
import { motion } from "motion/react";
import { Star, Users, TrendingUp } from "lucide-react";

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-4xl mx-auto text-center"
        >
          <motion.div 
            className="inline-flex items-center gap-2 border border-border bg-muted/50 py-2 px-4 rounded-full text-sm font-medium text-muted-foreground mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Star className="w-4 h-4" />
            Student Testimonials
          </motion.div>

          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Loved by learners worldwide
          </motion.h2>

          <motion.p 
            className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Join thousands of students who've revolutionized their learning with FlashCast's AI-powered flashcard system.
          </motion.p>

          <motion.div 
            className="flex flex-wrap justify-center gap-8 mt-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground dark:text-white">98% Success Rate</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground dark:text-white">50,000+ Students</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Star className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground dark:text-white">4.9/5 Rating</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="flex justify-center gap-6 mt-16 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[700px] overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <TestimonialsColumn 
            testimonials={firstColumn} 
            duration={15} 
            className="flex-shrink-0"
          />
          <TestimonialsColumn 
            testimonials={secondColumn} 
            className="hidden md:flex flex-shrink-0" 
            duration={19} 
          />
          <TestimonialsColumn 
            testimonials={thirdColumn} 
            className="hidden lg:flex flex-shrink-0" 
            duration={17} 
          />
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;