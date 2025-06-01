"use client";

import React from 'react';
// Import the vendored BrainAnimation component
import BrainAnimation from '@/components/vendor/threejs-brain-animation/components/Brain/Brain'; 

const BrainModel: React.FC = () => {
  return (
    // The BrainAnimation component creates its own Three.js canvas and scene.
    // It's designed to fill the dimensions of its parent container.
    // The parent div for this BrainModel is in HeroSection.tsx,
    // which is styled: "w-full h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center"
    <BrainAnimation style={{ width: '100%', height: '100%' }} />
  );
};

export default BrainModel;
