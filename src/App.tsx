import './App.css';
import { Hero } from './components/ui/animated-hero'; // Import the new Hero component
import { Particles } from './components/ui/particles'; // Import Particles

function App() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Particles positioned to cover the entire screen with theme-appropriate colors */}
      <Particles
        className="fixed inset-0 z-0" // Fixed positioning to cover the entire viewport
        quantity={300} // Increased number of particles
        size={0.4}
        vx={0.05}
        vy={0.05}
        ease={50}
        staticity={30} // Increased responsiveness to mouse movement
      />
      <div className="relative z-10"> {/* Content above particles */}
        <Hero />
      </div>
    </div>
  );
}

export default App;
