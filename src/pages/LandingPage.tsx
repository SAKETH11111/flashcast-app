import { Hero } from '../components/ui/animated-hero';
import { Particles } from '../components/ui/particles';
import TestimonialsSection from '../components/ui/testimonials-section';
import FAQSection from '../components/ui/faq-section';
import CTASection from '../components/ui/cta-section';
import { Footer } from '../components/ui/footer-section';

const LandingPage = () => {
  return (
    <>
      <Hero />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </>
  );
};

export default LandingPage; 