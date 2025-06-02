import React from 'react';
import { motion } from 'framer-motion';

const AnkiLogo = () => (
  <div className="w-16 h-16 p-2 bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 rounded-full flex items-center justify-center text-blue-700 dark:text-blue-300 font-semibold">
    Anki
  </div>
);
const QuizletLogo = () => (
  <div className="w-16 h-16 p-2 bg-purple-100 dark:bg-purple-900 border-2 border-purple-500 rounded-full flex items-center justify-center text-purple-700 dark:text-purple-300 font-semibold">
    Quiz
  </div>
);
const GoogleDriveLogo = () => (
  <div className="w-16 h-16 p-2 bg-green-100 dark:bg-green-900 border-2 border-green-500 rounded-full flex items-center justify-center text-green-700 dark:text-green-300 font-semibold">
    Drive
  </div>
);
const FlashCastLogo = () => (
  <div className="w-24 h-24 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold shadow-xl">
    FC
  </div>
);


interface Integration {
  id: string;
  name: string;
  LogoComponent: React.FC;
}

const integrations: Integration[] = [
  { id: 'anki', name: 'Anki', LogoComponent: AnkiLogo },
  { id: 'quizlet', name: 'Quizlet', LogoComponent: QuizletLogo },
  { id: 'googledrive', name: 'Google Drive', LogoComponent: GoogleDriveLogo },
];

const IntegrationsCarousel: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Seamless Integrations
        </h2>
        <div className="relative flex items-center justify-center">
          {/* FlashCast Logo in the center */}
          <div className="absolute z-10">
            <FlashCastLogo />
          </div>

          {/* Orbiting Integration Logos */}
          <motion.div
            className="relative w-64 h-64 md:w-96 md:h-96"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <svg
              className="absolute inset-0 w-full h-full opacity-50 dark:opacity-30"
              viewBox="-180 -180 360 360"
              style={{ transform: "translateZ(0)" }}
            >
              {integrations.map((integration, index) => {
                const numIntegrations = integrations.length;
                const angleOffset = -Math.PI / 2;
                const angle = angleOffset + (index / numIntegrations) * 2 * Math.PI;
                const logoPositionRadius = 120;

                const x2 = Math.cos(angle) * logoPositionRadius;
                const y2 = Math.sin(angle) * logoPositionRadius;

                return (
                  <motion.line
                    key={`line-${integration.id}`}
                    x1="0"
                    y1="0"
                    x2={x2}
                    y2={y2}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0, strokeDashoffset: 8 }}
                    animate={{
                      pathLength: 1,
                      opacity: 1,
                      strokeDashoffset: [8, 0, -8]
                    }}
                    transition={{
                      pathLength: { duration: 0.8, delay: index * 0.3 + 0.8, ease: "easeOut" },
                      opacity: { duration: 0.8, delay: index * 0.3 + 0.8, ease: "easeOut" },
                      strokeDashoffset: {
                        duration: 1.5,
                        delay: index * 0.3 + 1.6,
                        repeat: Infinity,
                        ease: "linear",
                      }
                    }}
                  />
                );
              })}
            </svg>

            {integrations.map((integration, index) => {
              const numIntegrations = integrations.length;
              const angleOffset = -Math.PI / 2;
              const angle = angleOffset + (index / numIntegrations) * 2 * Math.PI;
              const radius = 120;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={integration.id}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    x: `${x}px`,
                    y: `${y}px`,
                    translateX: '-50%',
                    translateY: '-50%',
                  }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.3 + 0.5, ease: "easeOut" }}
                  >
                    <integration.LogoComponent />
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
        <p className="text-center mt-12 md:mt-16 text-muted-foreground max-w-2xl mx-auto">
          FlashCast connects with your favorite tools, making it easy to import existing study materials and sync your progress.
        </p>
      </div>
    </section>
  );
};

export default IntegrationsCarousel;