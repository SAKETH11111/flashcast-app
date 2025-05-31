import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Container } from "@/components/ui/container";
import { 
  Search, 
  Book, 
  Code, 
  FileText, 
  HelpCircle, 
  ChevronRight,
  ChevronDown,
  Copy,
  Check,
  Menu,
  X,
  Bookmark,
  ExternalLink,
  ArrowRight,
  Command
} from "lucide-react";
import { cn } from "@/lib/utils";

// Reading Progress Bar Component
const ReadingProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50"
      style={{ scaleX, transformOrigin: "0%" }}
    />
  );
};

// Code Block Component with Copy Button
const CodeBlock = ({ 
  language = "javascript", 
  code,
  filename
}: { 
  language?: string; 
  code: string;
  filename?: string;
}) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  return (
    <div className="my-6 rounded-lg overflow-hidden bg-gray-900 border border-gray-800">
      {filename && (
        <div className="px-4 py-2 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-400 flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            {filename}
          </div>
          <div className="text-xs text-gray-500">{language}</div>
        </div>
      )}
      <div className="relative">
        <pre className="p-4 overflow-x-auto text-sm">
          <code className="text-gray-300">{code}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-2 rounded-md bg-gray-800/50 hover:bg-gray-700 transition-colors"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-400" />}
        </button>
      </div>
    </div>
  );
};

// Sidebar Navigation Item Component
const SidebarItem = ({ 
  title, 
  icon, 
  isActive = false,
  hasChildren = false,
  isOpen = false,
  onClick,
  children
}: { 
  title: string; 
  icon: React.ReactNode;
  isActive?: boolean;
  hasChildren?: boolean;
  isOpen?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={cn(
          "flex items-center w-full text-left px-3 py-2 rounded-md transition-colors",
          isActive 
            ? "bg-primary/10 text-primary" 
            : "text-gray-300 hover:bg-gray-800 hover:text-white"
        )}
      >
        <span className="mr-2">{icon}</span>
        <span className="flex-grow">{title}</span>
        {hasChildren && (
          <span className="ml-2 transition-transform duration-200" style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
            <ChevronRight className="w-4 h-4" />
          </span>
        )}
      </button>
      
      {hasChildren && isOpen && (
        <div className="ml-6 mt-1 space-y-1 border-l border-gray-800 pl-2">
          {children}
        </div>
      )}
    </div>
  );
};

// Table of Contents Component
const TableOfContents = ({ 
  items,
  activeSection,
  onItemClick
}: { 
  items: { id: string; title: string; level: number }[];
  activeSection: string;
  onItemClick: (id: string) => void;
}) => {
  return (
    <div className="bg-gray-900/70 border border-gray-800 rounded-xl p-4 sticky top-24">
      <h3 className="text-lg font-medium mb-4 flex items-center">
        <Bookmark className="w-4 h-4 mr-2 text-primary" />
        On This Page
      </h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => onItemClick(item.id)}
              className={cn(
                "text-left text-sm transition-colors w-full",
                "hover:text-primary",
                activeSection === item.id ? "text-primary font-medium" : "text-gray-400",
                item.level === 2 ? "pl-0" : "pl-3"
              )}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Documentation Page Component
export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("getting-started");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "getting-started": true,
    "features": false,
    "api": false,
    "faq": false
  });
  
  // Reference to content sections for scroll tracking
  const sectionRefs = {
    "getting-started": useRef<HTMLDivElement>(null),
    "installation": useRef<HTMLDivElement>(null),
    "quick-start": useRef<HTMLDivElement>(null),
    "voice-commands": useRef<HTMLDivElement>(null),
    "flashcard-creation": useRef<HTMLDivElement>(null),
    "spaced-repetition": useRef<HTMLDivElement>(null),
    "api-overview": useRef<HTMLDivElement>(null),
    "authentication": useRef<HTMLDivElement>(null),
    "endpoints": useRef<HTMLDivElement>(null),
    "faq-general": useRef<HTMLDivElement>(null),
    "faq-technical": useRef<HTMLDivElement>(null)
  };
  
  // Table of contents items
  const tocItems = [
    { id: "getting-started", title: "Getting Started", level: 2 },
    { id: "installation", title: "Installation", level: 3 },
    { id: "quick-start", title: "Quick Start Guide", level: 3 },
    { id: "voice-commands", title: "Voice Commands", level: 2 },
    { id: "flashcard-creation", title: "Flashcard Creation", level: 2 },
    { id: "spaced-repetition", title: "Spaced Repetition", level: 2 },
    { id: "api-overview", title: "API Overview", level: 2 },
    { id: "authentication", title: "Authentication", level: 3 },
    { id: "endpoints", title: "Endpoints", level: 3 },
    { id: "faq-general", title: "General FAQ", level: 2 },
    { id: "faq-technical", title: "Technical FAQ", level: 2 }
  ];
  
  // Toggle sidebar section expansion
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Scroll to section when clicking on TOC item
  const scrollToSection = (id: string) => {
    const element = sectionRefs[id as keyof typeof sectionRefs]?.current;
    if (element) {
      const yOffset = -100; // Offset for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
    }
  };
  
  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for determining active section
      
      // Find the section that is currently in view
      let currentSection = "getting-started";
      Object.entries(sectionRefs).forEach(([id, ref]) => {
        if (ref.current && ref.current.offsetTop <= scrollPosition) {
          currentSection = id;
        }
      });
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);
  
  // Sample code snippets
  const installationCode = `npm install @flashcast/client
# or
yarn add @flashcast/client`;

  const quickStartCode = `import { Flashcast } from '@flashcast/client';

// Initialize the client
const flashcast = new Flashcast({
  apiKey: 'YOUR_API_KEY',
  userId: 'user_123'
});

// Create a new deck
const deck = await flashcast.createDeck({
  name: 'Spanish Vocabulary',
  description: 'Basic Spanish words and phrases'
});

// Add a flashcard to the deck
await deck.addCard({
  front: 'Hello',
  back: 'Hola',
  tags: ['greeting', 'basic']
});`;

  const voiceCommandCode = `// Enable voice commands
flashcast.enableVoiceCommands();

// Register custom voice command handler
flashcast.onVoiceCommand('show answer', () => {
  currentCard.flip();
});

// Listen for specific phrases
flashcast.addVoiceKeywords(['next', 'previous', 'repeat']);`;

  const apiAuthCode = `// Authentication with API key
const headers = {
  'Authorization': 'Bearer YOUR_API_KEY',
  'Content-Type': 'application/json'
};

// Example request
fetch('https://api.flashcast.com/v1/decks', {
  method: 'GET',
  headers
})
.then(response => response.json())
.then(data => console.log(data));`;

  const endpointExample = `// Create a new flashcard
fetch('https://api.flashcast.com/v1/decks/deck_123/cards', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    front: 'Capital of France',
    back: 'Paris',
    tags: ['geography', 'europe'],
    media: {
      type: 'image',
      url: 'https://example.com/paris.jpg'
    }
  })
})
.then(response => response.json())
.then(card => console.log(card));`;
  
  return (
    <div className="min-h-screen">
      {/* Reading Progress Bar */}
      <ReadingProgressBar />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:60px_60px]" />
        <div className="absolute h-full w-full bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        
        <Container className="relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Documentation
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Everything you need to get started with Flashcast
            </motion.p>
            
            {/* Search Bar */}
            <motion.div
              className="relative max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-full bg-gray-900/80 border border-gray-700 rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
      
      {/* Documentation Content */}
      <section className="py-10 mb-20">
        <Container>
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Mobile Sidebar Toggle */}
            <div className="lg:hidden mb-6 flex justify-between items-center">
              <h2 className="text-xl font-bold">Documentation</h2>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md bg-gray-800 text-gray-300"
                aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
            
            {/* Sidebar Navigation */}
            <aside className={cn(
              "lg:col-span-3 lg:block",
              sidebarOpen ? "block" : "hidden"
            )}>
              <div className="lg:sticky lg:top-24 bg-gray-900/70 border border-gray-800 rounded-xl p-4 space-y-2">
                <SidebarItem 
                  title="Getting Started" 
                  icon={<Book className="w-4 h-4" />}
                  isActive={activeSection.startsWith("getting-started") || activeSection === "installation" || activeSection === "quick-start"}
                  hasChildren={true}
                  isOpen={expandedSections["getting-started"]}
                  onClick={() => toggleSection("getting-started")}
                >
                  <SidebarItem 
                    title="Installation" 
                    icon={<ChevronRight className="w-4 h-4" />}
                    isActive={activeSection === "installation"}
                    onClick={() => scrollToSection("installation")}
                  />
                  <SidebarItem 
                    title="Quick Start Guide" 
                    icon={<ChevronRight className="w-4 h-4" />}
                    isActive={activeSection === "quick-start"}
                    onClick={() => scrollToSection("quick-start")}
                  />
                </SidebarItem>
                
                <SidebarItem 
                  title="Features" 
                  icon={<FileText className="w-4 h-4" />}
                  isActive={activeSection === "voice-commands" || activeSection === "flashcard-creation" || activeSection === "spaced-repetition"}
                  hasChildren={true}
                  isOpen={expandedSections["features"]}
                  onClick={() => toggleSection("features")}
                >
                  <SidebarItem 
                    title="Voice Commands" 
                    icon={<ChevronRight className="w-4 h-4" />}
                    isActive={activeSection === "voice-commands"}
                    onClick={() => scrollToSection("voice-commands")}
                  />
                  <SidebarItem 
                    title="Flashcard Creation" 
                    icon={<ChevronRight className="w-4 h-4" />}
                    isActive={activeSection === "flashcard-creation"}
                    onClick={() => scrollToSection("flashcard-creation")}
                  />
                  <SidebarItem 
                    title="Spaced Repetition" 
                    icon={<ChevronRight className="w-4 h-4" />}
                    isActive={activeSection === "spaced-repetition"}
                    onClick={() => scrollToSection("spaced-repetition")}
                  />
                </SidebarItem>
                
                <SidebarItem 
                  title="API Reference" 
                  icon={<Code className="w-4 h-4" />}
                  isActive={activeSection === "api-overview" || activeSection === "authentication" || activeSection === "endpoints"}
                  hasChildren={true}
                  isOpen={expandedSections["api"]}
                  onClick={() => toggleSection("api")}
                >
                  <SidebarItem 
                    title="Overview" 
                    icon={<ChevronRight className="w-4 h-4" />}
                    isActive={activeSection === "api-overview"}
                    onClick={() => scrollToSection("api-overview")}
                  />
                  <SidebarItem 
                    title="Authentication" 
                    icon={<ChevronRight className="w-4 h-4" />}
                    isActive={activeSection === "authentication"}
                    onClick={() => scrollToSection("authentication")}
                  />
                  <SidebarItem 
                    title="Endpoints" 
                    icon={<ChevronRight className="w-4 h-4" />}
                    isActive={activeSection === "endpoints"}
                    onClick={() => scrollToSection("endpoints")}
                  />
                </SidebarItem>
                
                <SidebarItem 
                  title="FAQ" 
                  icon={<HelpCircle className="w-4 h-4" />}
                  isActive={activeSection === "faq-general" || activeSection === "faq-technical"}
                  hasChildren={true}
                  isOpen={expandedSections["faq"]}
                  onClick={() => toggleSection("faq")}
                >
                  <SidebarItem 
                    title="General FAQ" 
                    icon={<ChevronRight className="w-4 h-4" />}
                    isActive={activeSection === "faq-general"}
                    onClick={() => scrollToSection("faq-general")}
                  />
                  <SidebarItem 
                    title="Technical FAQ" 
                    icon={<ChevronRight className="w-4 h-4" />}
                    isActive={activeSection === "faq-technical"}
                    onClick={() => scrollToSection("faq-technical")}
                  />
                </SidebarItem>
                
                <div className="pt-4 mt-4 border-t border-gray-800">
                  <a 
                    href="#" 
                    className="flex items-center text-primary hover:text-primary/80 transition-colors text-sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    API Status
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center text-primary hover:text-primary/80 transition-colors text-sm mt-2"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Changelog
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center text-primary hover:text-primary/80 transition-colors text-sm mt-2"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    GitHub Repository
                  </a>
                </div>
              </div>
            </aside>
            
            {/* Main Content */}
            <main className="lg:col-span-6">
              <div className="bg-gray-900/70 border border-gray-800 rounded-xl p-6 md:p-8 prose prose-invert max-w-none">
                {/* Getting Started Section */}
                <div ref={sectionRefs["getting-started"]}>
                  <h2 id="getting-started" className="flex items-center text-3xl font-bold mb-6 group">
                    Getting Started
                    <a href="#getting-started" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Welcome to the Flashcast documentation! This guide will help you get up and running with Flashcast quickly.
                    Whether you're using our web application, mobile apps, or integrating with our API, you'll find everything you need here.
                  </p>
                  
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-8">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        <Command className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium mb-1">Quick Tip</h4>
                        <p className="text-gray-300 text-sm">
                          Use the search bar at the top to quickly find specific topics in the documentation.
                          You can also navigate through sections using the sidebar or table of contents.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Installation Section */}
                <div ref={sectionRefs["installation"]} className="mt-12">
                  <h3 id="installation" className="flex items-center text-2xl font-bold mb-4 group">
                    Installation
                    <a href="#installation" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-4 h-4 text-primary" />
                    </a>
                  </h3>
                  <p className="text-gray-300 mb-4">
                    You can install the Flashcast client library using npm or yarn:
                  </p>
                  
                  <CodeBlock
                    language="bash"
                    code={installationCode}
                  />
                  
                  <p className="text-gray-300 mt-4">
                    Alternatively, you can use our CDN to include the library directly in your HTML:
                  </p>
                  
                  <CodeBlock
                    language="html"
                    code={`<script src="https://cdn.flashcast.com/client/v1/flashcast.min.js"></script>`}
                  />
                </div>
                
                {/* Quick Start Section */}
                <div ref={sectionRefs["quick-start"]} className="mt-12">
                  <h3 id="quick-start" className="flex items-center text-2xl font-bold mb-4 group">
                    Quick Start Guide
                    <a href="#quick-start" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-4 h-4 text-primary" />
                    </a>
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Here's a simple example to get you started with creating flashcards programmatically:
                  </p>
                  
                  <CodeBlock
                    language="javascript"
                    code={quickStartCode}
                    filename="quickstart.js"
                  />
                  
                  <p className="text-gray-300 mt-6">
                    This example demonstrates how to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-6">
                    <li>Initialize the Flashcast client with your API key</li>
                    <li>Create a new deck for your flashcards</li>
                    <li>Add a flashcard to the deck with front and back content</li>
                  </ul>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div className="text-gray-300">
                      <span className="block text-sm font-medium mb-1">Need an API key?</span>
                      <span className="text-xs text-gray-400">Sign up for a developer account to get started</span>
                    </div>
                    <button className="bg-primary/20 hover:bg-primary/30 text-primary px-4 py-2 rounded-lg transition-colors text-sm flex items-center">
                      <span>Get API Key</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
                
                {/* Voice Commands Section */}
                <div ref={sectionRefs["voice-commands"]} className="mt-12">
                  <h2 id="voice-commands" className="flex items-center text-3xl font-bold mb-6 group">
                    Voice Commands
                    <a href="#voice-commands" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  <p className="text-gray-300 mb-4">
                    Flashcast's voice command system allows hands-free interaction with your flashcards.
                    This is especially useful when you're studying while doing other activities.
                  </p>
                  
                  <h4 className="text-xl font-medium mb-3">Default Voice Commands</h4>
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-800">
                          <th className="px-4 py-2 text-left text-gray-300 font-medium border-b border-gray-700">Command</th>
                          <th className="px-4 py-2 text-left text-gray-300 font-medium border-b border-gray-700">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        <tr>
                          <td className="px-4 py-3 text-primary">"Next"</td>
                          <td className="px-4 py-3 text-gray-300">Move to the next flashcard</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-primary">"Previous"</td>
                          <td className="px-4 py-3 text-gray-300">Move to the previous flashcard</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-primary">"Flip" or "Show Answer"</td>
                          <td className="px-4 py-3 text-gray-300">Flip the current flashcard</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-primary">"Mark Easy"</td>
                          <td className="px-4 py-3 text-gray-300">Mark the current card as easy</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-primary">"Mark Hard"</td>
                          <td className="px-4 py-3 text-gray-300">Mark the current card as hard</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-primary">"Repeat"</td>
                          <td className="px-4 py-3 text-gray-300">Repeat the current card content</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <h4 className="text-xl font-medium mb-3">Custom Voice Commands</h4>
                  <p className="text-gray-300 mb-4">
                    You can also register custom voice commands for your specific needs:
                  </p>
                  
                  <CodeBlock
                    language="javascript"
                    code={voiceCommandCode}
                    filename="voice-commands.js"
                  />
                </div>
                
                {/* Flashcard Creation Section */}
                <div ref={sectionRefs["flashcard-creation"]} className="mt-12">
                  <h2 id="flashcard-creation" className="flex items-center text-3xl font-bold mb-6 group">
                    Flashcard Creation
                    <a href="#flashcard-creation" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Flashcast offers multiple ways to create and manage your flashcards, from manual creation to bulk import.
                  </p>
                  
                  <h4 className="text-xl font-medium mb-3">Creating Individual Cards</h4>
                  <p className="text-gray-300 mb-4">
                    You can create cards one by one using our intuitive editor. Each card can include:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-6">
                    <li>Text content (front and back)</li>
                    <li>Images</li>
                    <li>Audio recordings</li>
                    <li>Custom formatting (bold, italic, lists)</li>
                    <li>Tags for organization</li>
                  </ul>
                  
                  <h4 className="text-xl font-medium mb-3">Bulk Import</h4>
                  <p className="text-gray-300 mb-4">
                    Import flashcards from various formats:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-6">
                    <li>CSV files</li>
                    <li>Excel spreadsheets</li>
                    <li>Text files (with delimiter)</li>
                    <li>Anki decks (.apkg files)</li>
                    <li>Quizlet exports</li>
                  </ul>
                  
                  <div className="bg-gray-800 rounded-lg p-4 mb-6">
                    <h5 className="text-lg font-medium mb-2">CSV Format Example</h5>
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      <code>front,back,tags
"What is the capital of France?","Paris","geography,europe"
"H2O","Water","chemistry,compounds"
"Photosynthesis","Process by which plants convert light energy into chemical energy","biology,plants"</code>
                    </pre>
                  </div>
                </div>
                
                {/* Spaced Repetition Section */}
                <div ref={sectionRefs["spaced-repetition"]} className="mt-12">
                  <h2 id="spaced-repetition" className="flex items-center text-3xl font-bold mb-6 group">
                    Spaced Repetition
                    <a href="#spaced-repetition" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Flashcast uses an advanced spaced repetition algorithm to optimize your learning and retention.
                  </p>
                  
                  <h4 className="text-xl font-medium mb-3">How It Works</h4>
                  <p className="text-gray-300 mb-4">
                    Our algorithm determines when to show you each flashcard based on:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-6">
                    <li>Your performance history with each card</li>
                    <li>The difficulty level you assign to cards</li>
                    <li>Optimal spacing intervals for long-term retention</li>
                    <li>Your personal learning patterns</li>
                  </ul>
                  
                  <div className="relative overflow-hidden rounded-lg mb-6">
                    <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-6">
                      <h5 className="text-lg font-medium mb-3">The Science Behind Spaced Repetition</h5>
                      <p className="text-gray-300 text-sm mb-4">
                        Spaced repetition is based on the psychological spacing effect, which demonstrates that information is better 
                        retained when study sessions are spaced out over time rather than crammed into a single session.
                      </p>
                      <p className="text-gray-300 text-sm">
                        Flashcast's algorithm is inspired by proven systems like SuperMemo's SM-2 algorithm, but with our own 
                        improvements based on machine learning and user behavior analysis.
                      </p>
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-medium mb-3">Difficulty Ratings</h4>
                  <p className="text-gray-300 mb-4">
                    After reviewing a card, you can rate its difficulty:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-6">
                    <li><span className="text-red-400 font-medium">Again</span> - You didn't remember this card and need to see it again soon</li>
                    <li><span className="text-yellow-400 font-medium">Hard</span> - You remembered with difficulty; interval will increase slightly</li>
                    <li><span className="text-green-400 font-medium">Good</span> - You remembered correctly; interval will increase moderately</li>
                    <li><span className="text-blue-400 font-medium">Easy</span> - You remembered easily; interval will increase significantly</li>
                  </ul>
                </div>
                
                {/* API Reference Section */}
                <div ref={sectionRefs["api-overview"]} className="mt-12">
                  <h2 id="api-overview" className="flex items-center text-3xl font-bold mb-6 group">
                    API Overview
                    <a href="#api-overview" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  <p className="text-gray-300 mb-6">
                    The Flashcast API allows you to integrate our flashcard and learning features into your own applications.
                    Our RESTful API provides comprehensive access to all Flashcast functionality.
                  </p>
                  
                  <h4 className="text-xl font-medium mb-3">Base URL</h4>
                  <div className="bg-gray-800 rounded-lg p-3 mb-6">
                    <code className="text-gray-300">https://api.flashcast.com/v1</code>
                  </div>
                  
                  <h4 className="text-xl font-medium mb-3">Rate Limits</h4>
                  <p className="text-gray-300 mb-4">
                    Our API has the following rate limits:
                  </p>
                  <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-6">
                    <li>Free tier: 60 requests per minute</li>
                    <li>Pro tier: 300 requests per minute</li>
                    <li>Enterprise tier: Custom limits available</li>
                  </ul>
                </div>
                
                {/* Authentication Section */}
                <div ref={sectionRefs["authentication"]} className="mt-12">
                  <h3 id="authentication" className="flex items-center text-2xl font-bold mb-4 group">
                    Authentication
                    <a href="#authentication" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-4 h-4 text-primary" />
                    </a>
                  </h3>
                  <p className="text-gray-300 mb-4">
                    All API requests require authentication using API keys. You can generate API keys in your Flashcast dashboard.
                  </p>
                  
                  <CodeBlock
                    language="javascript"
                    code={apiAuthCode}
                    filename="authentication.js"
                  />
                  
                  <div className="bg-yellow-900/20 border border-yellow-800/30 rounded-lg p-4 mt-6 mb-6">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium mb-1 text-yellow-500">Security Warning</h4>
                        <p className="text-gray-300 text-sm">
                          Never expose your API key in client-side code. Always make API requests from your server.
                          If you need to make requests from the browser, use our client library which implements secure authentication.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Endpoints Section */}
                <div ref={sectionRefs["endpoints"]} className="mt-12">
                  <h3 id="endpoints" className="flex items-center text-2xl font-bold mb-4 group">
                    Endpoints
                    <a href="#endpoints" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-4 h-4 text-primary" />
                    </a>
                  </h3>
                  <p className="text-gray-300 mb-6">
                    The API provides the following main endpoints:
                  </p>
                  
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-800">
                          <th className="px-4 py-2 text-left text-gray-300 font-medium border-b border-gray-700">Endpoint</th>
                          <th className="px-4 py-2 text-left text-gray-300 font-medium border-b border-gray-700">Description</th>
                          <th className="px-4 py-2 text-left text-gray-300 font-medium border-b border-gray-700">Methods</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        <tr>
                          <td className="px-4 py-3 text-primary">/decks</td>
                          <td className="px-4 py-3 text-gray-300">Manage flashcard decks</td>
                          <td className="px-4 py-3 text-gray-300">GET, POST, PUT, DELETE</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-primary">/decks/:id/cards</td>
                          <td className="px-4 py-3 text-gray-300">Manage cards within a deck</td>
                          <td className="px-4 py-3 text-gray-300">GET, POST, PUT, DELETE</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-primary">/study-sessions</td>
                          <td className="px-4 py-3 text-gray-300">Track study progress</td>
                          <td className="px-4 py-3 text-gray-300">GET, POST</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-primary">/users</td>
                          <td className="px-4 py-3 text-gray-300">User management</td>
                          <td className="px-4 py-3 text-gray-300">GET, POST, PUT</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-primary">/stats</td>
                          <td className="px-4 py-3 text-gray-300">Learning analytics</td>
                          <td className="px-4 py-3 text-gray-300">GET</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <h4 className="text-xl font-medium mb-3">Example Request</h4>
                  <p className="text-gray-300 mb-4">
                    Here's an example of creating a new flashcard:
                  </p>
                  
                  <CodeBlock
                    language="javascript"
                    code={endpointExample}
                    filename="create-card.js"
                  />
                </div>
                
                {/* FAQ Sections */}
                <div ref={sectionRefs["faq-general"]} className="mt-12">
                  <h2 id="faq-general" className="flex items-center text-3xl font-bold mb-6 group">
                    General FAQ
                    <a href="#faq-general" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h4 className="text-lg font-medium mb-2">Is Flashcast available on mobile devices?</h4>
                      <p className="text-gray-300">
                        Yes, Flashcast is available as a web app and native apps for iOS and Android. All your data syncs seamlessly across devices.
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h4 className="text-lg font-medium mb-2">Can I use Flashcast offline?</h4>
                      <p className="text-gray-300">
                        Yes, our mobile apps support full offline functionality. Your changes will sync automatically when you reconnect to the internet.
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h4 className="text-lg font-medium mb-2">How many flashcards can I create?</h4>
                      <p className="text-gray-300">
                        Free accounts can create up to 200 flashcards. Pro accounts have unlimited flashcards.
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h4 className="text-lg font-medium mb-2">Can I share my flashcards with others?</h4>
                      <p className="text-gray-300">
                        Yes, you can share individual cards or entire decks with other Flashcast users. Pro accounts can also publish decks publicly.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div ref={sectionRefs["faq-technical"]} className="mt-12">
                  <h2 id="faq-technical" className="flex items-center text-3xl font-bold mb-6 group">
                    Technical FAQ
                    <a href="#faq-technical" className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Bookmark className="w-5 h-5 text-primary" />
                    </a>
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h4 className="text-lg font-medium mb-2">What browsers are supported?</h4>
                      <p className="text-gray-300">
                        Flashcast supports all modern browsers including Chrome, Firefox, Safari, and Edge. For voice features, 
                        we recommend Chrome or Edge for the best experience.
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h4 className="text-lg font-medium mb-2">How do I integrate Flashcast with my LMS?</h4>
                      <p className="text-gray-300">
                        We offer LTI integration for popular learning management systems like Canvas, Blackboard, and Moodle. 
                        Contact our support team for implementation assistance.
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h4 className="text-lg font-medium mb-2">Is there a webhook API for notifications?</h4>
                      <p className="text-gray-300">
                        Yes, Pro and Enterprise accounts can configure webhooks to receive notifications about user activity, 
                        study sessions, and other events.
                      </p>
                    </div>
                    
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <h4 className="text-lg font-medium mb-2">How secure is my data?</h4>
                      <p className="text-gray-300">
                        All data is encrypted in transit and at rest. We use industry-standard security practices and regular 
                        security audits to ensure your information stays protected.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </main>
            
            {/* Table of Contents (Desktop) */}
            <aside className="hidden lg:block lg:col-span-3">
              <TableOfContents 
                items={tocItems}
                activeSection={activeSection}
                onItemClick={scrollToSection}
              />
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
}
