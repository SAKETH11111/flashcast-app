"use client";

import React from 'react';
import BrainAnimation from '@/components/vendor/threejs-brain-animation/components/Brain/Brain'; 

const BrainModel: React.FC = () => {
  return (
    <BrainAnimation style={{ width: '100%', height: '100%' }} />
  );
};

export default BrainModel;
