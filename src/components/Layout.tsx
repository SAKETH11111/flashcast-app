import { ReactNode } from "react";
import { NavBar } from "./ui/tubelight-navbar";
import { Particles } from "./ui/particles";
import { Footer } from "./ui/footer-section";
import ScrollToTopButton from "./ui/scroll-to-top-button";
import { 
  Home, 
  Lightbulb, 
  DollarSign, 
  Users, 
  BookOpen, 
  FileText, 
  MessageSquare 
} from "lucide-react";

// Navigation items for the marketing site
const navigationItems = [
  {
    name: "Home",
    url: "/",
    icon: Home
  },
  {
    name: "Features",
    url: "/features",
    icon: Lightbulb
  },
  {
    name: "Pricing",
    url: "/pricing",
    icon: DollarSign
  },
  {
    name: "About",
    url: "/about",
    icon: Users
  },
  {
    name: "Blog",
    url: "/blog",
    icon: BookOpen
  },
  {
    name: "Docs",
    url: "/docs",
    icon: FileText
  },
  {
    name: "Contact",
    url: "/contact",
    icon: MessageSquare
  }
];

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background particles */}
      <Particles
        className="fixed inset-0 z-0" 
        quantity={300} 
        size={0.4}
        vx={0.05}
        vy={0.05}
        ease={50}
        staticity={30} 
      />
      
      {/* Navigation */}
      <NavBar 
        items={navigationItems} 
        className="sm:mb-0 sm:top-6"
      />
      
      {/* Main content */}
      <div className="relative z-10 pt-20 pb-32">
        {children}
      </div>
      
      {/* Footer */}
      <Footer />
      
      {/* Scroll to top button */}
      <ScrollToTopButton />
    </div>
  );
}
