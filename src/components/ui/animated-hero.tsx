import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, Home, User, Briefcase, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "./tubelight-navbar";
import { FeatureBentoGrid } from "./FeatureBentoGrid";

const navItems = [
  { name: 'Home', url: '/', icon: Home },
  { name: 'About', url: '#', icon: User },
  { name: 'Features', url: '/features', icon: Briefcase },
  { name: 'Decks', url: '#', icon: FileText }
];

function Hero() {
  const navigate = useNavigate();
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["interactive", "browser-based", "voice-controlled", "smart", "efficient"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
      <div className="w-full relative">
        <NavBar items={navItems} />
        <div className="container mx-auto pt-10 md:pt-20">
          <div className="flex flex-col items-center justify-center gap-8 py-16 md:py-24 lg:py-32 min-h-[calc(80vh-var(--navbar-height,80px))]">
            <div className="flex gap-4 flex-col items-center">
              <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
                <span className="text-black dark:text-white">Flashcast: Learning</span>
                <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                  &nbsp;
                  {titles.map((title, index) => (
                    <motion.span
                      key={index}
                      className="absolute font-semibold"
                      initial={{ opacity: 0, y: -100 }}
                      transition={{ type: "spring", stiffness: 50 }}
                      animate={
                        titleNumber === index
                          ? {
                              y: 0,
                              opacity: 1,
                            }
                          : {
                              y: titleNumber > index ? -150 : 150,
                              opacity: 0,
                            }
                      }
                    >
                      {title}
                    </motion.span>
                  ))}
                </span>
              </h1>

              <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
                Revolutionize your learning with voice-controlled flashcards. Simply speak a term, and if it matches, the card flips to reveal the answer! Flashcast makes learning interactive, efficient, and fun in your browser.
              </p>
            </div>
            <div className="flex flex-row gap-3 relative z-50 mt-6">
              <button className="button flashcast-btn" onClick={() => {
                navigate('/signin');
              }}>
                Get Started <MoveRight className="inline-block w-4 h-4 ml-2" />
              </button>
            </div>
          </div>

          <div className="py-12 md:py-16 lg:py-20 text-center">
            <div className="bg-muted/50 dark:bg-muted/20 w-full max-w-4xl mx-auto h-64 md:h-80 lg:h-96 rounded-lg flex items-center justify-center border border-border">
              <div className="text-muted-foreground text-6xl">📱</div>
            </div>
          </div>

        </div>
        <FeatureBentoGrid />
      </div>
  );
}

export { Hero };