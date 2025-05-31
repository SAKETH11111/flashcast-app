import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/container";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Send, 
  CheckCircle,
  AlertCircle,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Github
} from "lucide-react";
import { cn } from "@/lib/utils";

// Form field validation types
type FieldError = string | null;

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name: FieldError;
  email: FieldError;
  subject: FieldError;
  message: FieldError;
}

// Confetti animation component
const SuccessConfetti = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useState(() => {
    // This would normally use canvas-confetti library
    // For now, we'll just create a placeholder that would be replaced with actual confetti
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Placeholder animation
        let particles: {x: number, y: number, size: number, color: string, speed: number}[] = [];
        for (let i = 0; i < 100; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 8 + 2,
            color: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff'][Math.floor(Math.random() * 6)],
            speed: Math.random() * 3 + 1
          });
        }
        
        const animate = () => {
          if (!canvas) return;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          particles.forEach(p => {
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.size, p.size);
            p.y += p.speed;
            
            if (p.y > canvas.height) {
              p.y = -p.size;
              p.x = Math.random() * canvas.width;
            }
          });
          
          requestAnimationFrame(animate);
        };
        
        animate();
      }
    }
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      width={800}
      height={600}
    />
  );
};

// Social media button component
const SocialButton = ({ icon, href, label }: { icon: React.ReactNode, href: string, label: string }) => {
  return (
    <a 
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary/20 hover:text-primary transition-colors duration-300"
    >
      {icon}
    </a>
  );
};

// Contact info item component
const ContactInfoItem = ({ 
  icon, 
  title, 
  content,
  href
}: { 
  icon: React.ReactNode; 
  title: string; 
  content: string;
  href?: string;
}) => {
  const ContentWrapper = href ? 'a' : 'div';
  const props = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};
  
  return (
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-medium text-white mb-1">{title}</h3>
        <ContentWrapper 
          className={cn(
            "text-gray-400",
            href && "hover:text-primary transition-colors"
          )}
          {...props}
        >
          {content}
        </ContentWrapper>
      </div>
    </div>
  );
};

// Map placeholder component
const MapPlaceholder = () => {
  return (
    <div className="relative h-64 md:h-80 rounded-xl overflow-hidden border border-gray-800">
      <div className="absolute inset-0 bg-gray-900 flex items-center justify-center text-gray-600">
        <div className="text-center">
          <MapPin className="w-12 h-12 mx-auto mb-2 opacity-20" />
          <p className="text-sm">Map will be loaded here</p>
          <p className="text-xs mt-1">Using Leaflet integration</p>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50"></div>
    </div>
  );
};

export default function ContactPage() {
  // Form state
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  // Form errors
  const [errors, setErrors] = useState<FormErrors>({
    name: null,
    email: null,
    subject: null,
    message: null
  });
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      name: null,
      email: null,
      subject: null,
      message: null
    };
    
    // Name validation
    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formState.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    // Email validation
    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Subject validation
    if (!formState.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    
    // Message validation
    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formState.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    setErrors(newErrors);
    
    // Check if there are any errors
    return !Object.values(newErrors).some(error => error !== null);
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success
      setSubmitStatus("success");
      
      // Reset form after success
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      // Error
      setSubmitStatus("error");
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };
  
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
              Get in Touch
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Have questions about Flashcast? We're here to help you succeed in your learning journey.
            </motion.p>
          </div>
        </Container>
      </section>
      
      {/* Contact Section */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              className="bg-gray-900/70 border border-gray-800 rounded-xl overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="p-8 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  Contact Information
                </h2>
                <p className="text-gray-400 mb-10">
                  Reach out to our team for support, partnerships, or any questions about our platform.
                </p>
                
                <div className="space-y-8 mb-10">
                  <ContactInfoItem 
                    icon={<MapPin className="w-6 h-6" />}
                    title="Our Location"
                    content="123 Learning Avenue, San Francisco, CA 94107, USA"
                    href="https://maps.google.com/?q=San+Francisco"
                  />
                  
                  <ContactInfoItem 
                    icon={<Mail className="w-6 h-6" />}
                    title="Email Us"
                    content="hello@flashcast.com"
                    href="mailto:hello@flashcast.com"
                  />
                  
                  <ContactInfoItem 
                    icon={<Phone className="w-6 h-6" />}
                    title="Call Us"
                    content="+1 (555) 123-4567"
                    href="tel:+15551234567"
                  />
                  
                  <ContactInfoItem 
                    icon={<Globe className="w-6 h-6" />}
                    title="Working Hours"
                    content="Monday - Friday, 9AM - 6PM PST"
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Follow Us</h3>
                  <div className="flex space-x-3">
                    <SocialButton 
                      icon={<Twitter className="w-5 h-5" />} 
                      href="https://twitter.com" 
                      label="Twitter"
                    />
                    <SocialButton 
                      icon={<Linkedin className="w-5 h-5" />} 
                      href="https://linkedin.com" 
                      label="LinkedIn"
                    />
                    <SocialButton 
                      icon={<Facebook className="w-5 h-5" />} 
                      href="https://facebook.com" 
                      label="Facebook"
                    />
                    <SocialButton 
                      icon={<Instagram className="w-5 h-5" />} 
                      href="https://instagram.com" 
                      label="Instagram"
                    />
                    <SocialButton 
                      icon={<Github className="w-5 h-5" />} 
                      href="https://github.com" 
                      label="GitHub"
                    />
                  </div>
                </div>
              </div>
              
              <MapPlaceholder />
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gray-900/70 border border-gray-800 rounded-xl p-8 md:p-10 relative overflow-hidden">
                {/* Success confetti */}
                {submitStatus === "success" && <SuccessConfetti />}
                
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  Send Us a Message
                </h2>
                <p className="text-gray-400 mb-8">
                  Fill out the form below and our team will get back to you as soon as possible.
                </p>
                
                <AnimatePresence mode="wait">
                  {submitStatus === "success" ? (
                    <motion.div
                      className="bg-green-900/20 border border-green-800 rounded-xl p-6 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                      <p className="text-gray-300">
                        Thank you for reaching out. We'll get back to you shortly.
                      </p>
                    </motion.div>
                  ) : submitStatus === "error" ? (
                    <motion.div
                      className="bg-red-900/20 border border-red-800 rounded-xl p-6 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-white mb-2">Something went wrong</h3>
                      <p className="text-gray-300">
                        Please try again or contact us directly via email.
                      </p>
                      <button
                        className="mt-4 text-primary hover:text-primary/80 transition-colors"
                        onClick={() => setSubmitStatus("idle")}
                      >
                        Try Again
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      onSubmit={handleSubmit}
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      {/* Name Field */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          className={cn(
                            "w-full bg-gray-800 border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors",
                            errors.name 
                              ? "border-red-500" 
                              : "border-gray-700 focus:border-primary/50"
                          )}
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <motion.p
                            className="mt-1 text-red-500 text-sm"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {errors.name}
                          </motion.p>
                        )}
                      </div>
                      
                      {/* Email Field */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                          Your Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          className={cn(
                            "w-full bg-gray-800 border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors",
                            errors.email 
                              ? "border-red-500" 
                              : "border-gray-700 focus:border-primary/50"
                          )}
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <motion.p
                            className="mt-1 text-red-500 text-sm"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {errors.email}
                          </motion.p>
                        )}
                      </div>
                      
                      {/* Subject Field */}
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formState.subject}
                          onChange={handleChange}
                          className={cn(
                            "w-full bg-gray-800 border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors",
                            errors.subject 
                              ? "border-red-500" 
                              : "border-gray-700 focus:border-primary/50"
                          )}
                          placeholder="How can we help you?"
                        />
                        {errors.subject && (
                          <motion.p
                            className="mt-1 text-red-500 text-sm"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {errors.subject}
                          </motion.p>
                        )}
                      </div>
                      
                      {/* Message Field */}
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          rows={5}
                          className={cn(
                            "w-full bg-gray-800 border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors",
                            errors.message 
                              ? "border-red-500" 
                              : "border-gray-700 focus:border-primary/50"
                          )}
                          placeholder="Tell us about your question or feedback..."
                        />
                        {errors.message && (
                          <motion.p
                            className="mt-1 text-red-500 text-sm"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {errors.message}
                          </motion.p>
                        )}
                      </div>
                      
                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={cn(
                          "w-full py-3 px-6 rounded-lg flex items-center justify-center space-x-2 text-white font-medium transition-all duration-300",
                          isSubmitting 
                            ? "bg-primary/70 cursor-not-allowed"
                            : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-primary/20"
                        )}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <Container>
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Can't find the answer you're looking for? Reach out to our customer support team.
            </p>
            
            <button className="relative h-12 px-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <span>View All FAQs</span>
              <div className="absolute inset-0 w-full h-full bg-white/20 opacity-0 hover:opacity-20 transition-opacity" />
            </button>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
