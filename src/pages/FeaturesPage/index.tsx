"use client";

import React from 'react';
import HeroSection from './components/HeroSection';
// import OtherFeatureSections from './components/OtherFeatureSections'; // Placeholder for future sections

const FeaturesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      {/* 
        Future sections for the features page can be added here.
        For example:
        <DetailedFeatureGrid />
        <UseCasesSection />
        <TestimonialsSection />
        <CallToActionSection />
      */}
      {/* <OtherFeatureSections /> */}
    </div>
  );
};

export default FeaturesPage;
