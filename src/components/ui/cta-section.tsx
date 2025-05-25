import { useState } from 'react';
import { motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import MagneticButton from './magnetic-button';
import FloatingElements from './floating-elements';

export default function CTASection() {
  const [isLoading, setIsLoading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleGetStarted = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    window.location.href = '/login';
    
    setIsLoading(false);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h2 className="text-5xl md:text-7xl font-regular text-black dark:text-white mb-6 leading-tight tracking-tighter">
              Ready to{' '}
              <span className="bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent font-semibold">
                Transform
              </span>
              <br />
              Your Learning?
            </h2>
            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl mx-auto">
              Join thousands of students who've revolutionized their study habits with 
              <span className="text-black dark:text-white font-medium"> voice-powered flashcards</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-3 gap-8 mb-12 max-w-md mx-auto"
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-semibold text-black dark:text-white">98%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-semibold text-black dark:text-white">50K+</div>
              <div className="text-sm text-muted-foreground">Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-semibold text-black dark:text-white">4.9★</div>
              <div className="text-sm text-muted-foreground">Rating</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              <FloatingElements isHovering={isHovering} />
              
              <MagneticButton
                onClick={handleGetStarted}
                disabled={isLoading}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="button flashcast-btn relative z-10"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="flex items-center gap-1 mr-2">
                      <div className="h-2 w-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="h-2 w-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="h-2 w-2 bg-current rounded-full animate-bounce" />
                    </div>
                    <span>Loading...</span>
                  </div>
                ) : (
                  <>
                    Get Started 
                    <MoveRight className="inline-block w-4 h-4 ml-2" />
                  </>
                )}
              </MagneticButton>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 text-muted-foreground text-sm"
          >
            Free to start • No credit card required • Available on all devices
          </motion.p>
        </div>
      </div>
    </section>
  );
} 