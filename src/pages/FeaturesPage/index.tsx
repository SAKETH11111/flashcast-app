"use client";

import React from 'react';
import { Home, User, Briefcase, FileText } from "lucide-react";
import { NavBar } from '@/components/ui/tubelight-navbar';
import HeroSection from './components/HeroSection';
import FeatureShowcase from './components/FeatureShowcase';
import IntegrationsCarousel from './components/IntegrationsCarousel';
import { FeatureComparisonTable } from './components/FeatureComparisonTable';
import MagneticButton from '@/components/ui/magnetic-button';

const navItems = [
  { name: 'Home', url: '/', icon: Home },
  { name: 'About', url: '#', icon: User },
  { name: 'Features', url: '/features', icon: Briefcase },
  { name: 'Decks', url: '#', icon: FileText }
];

const FeaturesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar items={navItems} />
      <HeroSection />
      <FeatureShowcase />
      <IntegrationsCarousel />
      <FeatureComparisonTable />
      <div className="container mx-auto px-4 py-12 md:py-20 flex justify-center">
        <MagneticButton
          className="button"
          onClick={() => {
            // Handle navigation to sign up or onboarding
          }}
        >
          Get Started with FlashCast
        </MagneticButton>
      </div>
    </div>
  );
};

export default FeaturesPage;
