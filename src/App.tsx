import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Hero } from './components/ui/animated-hero';
import { Particles } from './components/ui/particles';
import TestimonialsSection from './components/ui/testimonials-section';
import FAQSection from './components/ui/faq-section';
import CTASection from './components/ui/cta-section';
import { Footer } from './components/ui/footer-section';
import ScrollToTopButton from './components/ui/scroll-to-top-button';

function App() {
  return (
    <Router basename="/flashcast-app">
      <div className="relative min-h-screen w-full overflow-hidden">
        <Particles
          className="fixed inset-0 z-0" 
          quantity={300} 
          size={0.4}
          vx={0.05}
          vy={0.05}
          ease={50}
          staticity={30} 
        />
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
        <ScrollToTopButton />
      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <TestimonialsSection />
      <CTASection />
      <FAQSection />
      <Footer />
    </>
  );
}

export default App;
