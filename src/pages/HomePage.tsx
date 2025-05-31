import { Hero } from '../components/ui/animated-hero';
import TestimonialsSection from '../components/ui/testimonials-section';
import FAQSection from '../components/ui/faq-section';
import CTASection from '../components/ui/cta-section';

export default function HomePage() {
  return (
    <>
      <Hero />
      <TestimonialsSection />
      <CTASection />
      <FAQSection />
    </>
  );
}
