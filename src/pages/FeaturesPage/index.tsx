"use client";

import React from 'react';
import { Home, Briefcase } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { NavBar } from '@/components/ui/tubelight-navbar';
import HeroSection from './components/HeroSection';
import FeatureShowcase from './components/FeatureShowcase';
import IntegrationsCarousel from './components/IntegrationsCarousel';
import { FeatureComparisonTable } from './components/FeatureComparisonTable';
import MagneticButton from '@/components/ui/magnetic-button';

const navItems = [
  { name: 'Home', url: '/', icon: Home },
  { name: 'Features', url: '/features', icon: Briefcase }
];

const FeaturesPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Navigate to dashboard - users can sign in from there if needed
    navigate('/dashboard');
  };

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
          onClick={handleGetStarted}
        >
          Get Started with FlashCast
        </MagneticButton>
      </div>
    </div>
  );
};

export default FeaturesPage;
