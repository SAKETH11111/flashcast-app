"use client";

import React from 'react';
import Typewriter from 'typewriter-effect';

interface AnimatedTextProps {
  fullText: string;
  placeholderWord: string;
  animatedKeywords: string[];
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ fullText, placeholderWord, animatedKeywords }) => {
  const parts = fullText.split(placeholderWord);
  const prefix = parts[0];
  const suffix = parts.length > 1 ? parts.slice(1).join(placeholderWord) : "";

  const styledKeywords = animatedKeywords.map(keyword =>
    `<span class="bg-clip-text text-transparent bg-gradient-to-b from-primary to-secondary">${keyword}</span>`
  );

  return (
    <h1 className="text-5xl md:text-7xl font-bold text-foreground">
      {prefix}
      <Typewriter
        options={{
          strings: styledKeywords,
          autoStart: true,
          loop: true,
          delay: 75,
          deleteSpeed: 50,
        }}
        onInit={(typewriter) => {
          typewriter
            .pauseFor(1000)
            .start();
        }}
      />
      {suffix}
    </h1>
  );
};

export default AnimatedText; 