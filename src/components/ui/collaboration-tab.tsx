"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Share2, Crown, CheckCircle, UserPlus } from 'lucide-react';

export const CollaborationTab: React.FC = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl">
              <Users className="h-8 w-8 text-purple-500" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground">
              Collaborate & Learn Together
            </h3>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Share knowledge, create group study sessions, and learn collaboratively with real-time synchronization and team management features.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Real-time Collaboration */}
          <motion.div 
            className="group relative p-6 bg-card/50 backdrop-blur-sm border border-border rounded-2xl hover:bg-card/80 transition-all duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="h-6 w-6 text-blue-500" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-foreground mb-2">Real-time Collaboration</h4>
                <p className="text-muted-foreground mb-4">
                  Study together in real-time with synchronized flashcards, shared progress tracking, and instant updates across all devices.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Live sync across devices
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Shared study sessions
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Team Management */}
          <motion.div 
            className="group relative p-6 bg-card/50 backdrop-blur-sm border border-border rounded-2xl hover:bg-card/80 transition-all duration-300"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Crown className="h-6 w-6 text-purple-500" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-foreground mb-2">Team Management</h4>
                <p className="text-muted-foreground mb-4">
                  Create and manage study groups with role-based permissions, progress monitoring, and collaborative deck creation.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Role-based permissions
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Group progress tracking
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Knowledge Sharing */}
          <motion.div 
            className="group relative p-6 bg-card/50 backdrop-blur-sm border border-border rounded-2xl hover:bg-card/80 transition-all duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Share2 className="h-6 w-6 text-green-500" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-foreground mb-2">Knowledge Sharing</h4>
                <p className="text-muted-foreground mb-4">
                  Share flashcard decks, study materials, and learning resources with your team or the global community.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Public deck sharing
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Community contributions
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Invite & Join */}
          <motion.div 
            className="group relative p-6 bg-card/50 backdrop-blur-sm border border-border rounded-2xl hover:bg-card/80 transition-all duration-300"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <UserPlus className="h-6 w-6 text-orange-500" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-foreground mb-2">Easy Invites</h4>
                <p className="text-muted-foreground mb-4">
                  Invite friends and colleagues to join your study groups with simple sharing links and QR codes.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    One-click invitations
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    QR code sharing
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>


      </div>
    </div>
  );
}; 