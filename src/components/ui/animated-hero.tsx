import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, Home, User, Briefcase, FileText } from "lucide-react";
import { NavBar } from "./tubelight-navbar";

const navItems = [
  { name: 'Home', url: '#', icon: Home },
  { name: 'About', url: '#', icon: User },
  { name: 'Features', url: '#', icon: Briefcase },
  { name: 'Decks', url: '#', icon: FileText }
];

function Hero() {
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
    // <AuroraBackground> {/* AuroraBackground wrapper removed */}
      <div className="w-full relative"> {/* z-10 might not be needed anymore */}
        <NavBar items={navItems} />
        <div className="container mx-auto pt-20">
          <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
            <div className="flex gap-4 flex-col">
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
              <button className="button flashcast-btn" onClick={() => alert('Button clicked!')}>
                Get Started <MoveRight className="inline-block w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    // </AuroraBackground>
  );
}

export { Hero };