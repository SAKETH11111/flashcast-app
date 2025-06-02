"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Target, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { GridPatternBackground } from "./GridPatternBackground";

export const AnalyticsTab = () => {
  const [chartData, setChartData] = useState([
    { label: 'Mon', value: 65 },
    { label: 'Tue', value: 78 },
    { label: 'Wed', value: 82 },
    { label: 'Thu', value: 74 },
    { label: 'Fri', value: 89 },
    { label: 'Sat', value: 91 },
    { label: 'Sun', value: 85 },
  ]);

  const [activeMetric, setActiveMetric] = useState(0);
  const metrics = [
    { label: 'Study Time', value: '4.2h', change: '+12%', color: 'text-primary' },
    { label: 'Cards Reviewed', value: '234', change: '+8%', color: 'text-yellow-500' },
    { label: 'Accuracy Rate', value: '87%', change: '+5%', color: 'text-primary' },
    { label: 'Streak Days', value: '15', change: '+2', color: 'text-yellow-500' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => prev.map(item => ({
        ...item,
        value: Math.max(30, Math.min(100, item.value + (Math.random() - 0.5) * 10))
      })));
      setActiveMetric(prev => (prev + 1) % metrics.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={cn(
        "relative w-full h-[500px] rounded-3xl overflow-hidden",
        "bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white",
        "text-card-foreground",
        "transform border-2 border-transparent",
        "transition-colors duration-300 ease-in-out",
        "hover:border-primary hover:shadow-2xl hover:bg-primary/10",
        "dark:hover:border-primary dark:hover:bg-primary/20"
      )}
      whileHover={{
        scale: 1.01,
        rotate: 0
      }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <GridPatternBackground
        size={20}
        className="absolute inset-0 opacity-50 dark:opacity-30"
      />
      
      <div className="relative z-20 p-8 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-primary to-yellow-500 rounded-2xl text-white shadow-lg">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">Analytics</h3>
            <p className="text-muted-foreground">Gain real-time insights into your learning progress with detailed statistics and visualizations.</p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className={`bg-background/50 backdrop-blur-sm rounded-xl p-4 border border-border/50 transition-all duration-300 ${
                index === activeMetric ? 'ring-2 ring-primary/50 bg-background/80' : ''
              }`}
              animate={{
                scale: index === activeMetric ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{metric.label}</span>
              </div>
              <div className={`text-lg font-bold ${metric.color}`}>{metric.value}</div>
              <div className="flex items-center gap-1 text-xs text-primary">
                <TrendingUp className="w-3 h-3" />
                {metric.change}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Live Chart */}
        <div className="flex-grow relative bg-background/20 backdrop-blur-sm rounded-2xl border border-border/30 p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-foreground">Weekly Progress</h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              Live Data
            </div>
          </div>
          
          {/* Chart Bars */}
          <div className="relative h-32 flex items-end justify-around gap-2">
            {chartData.map((item, index) => (
              <motion.div
                key={item.label}
                className="flex flex-col items-center gap-2 flex-1"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-xs text-muted-foreground">
                  {Math.round(item.value)}%
                </div>
                <motion.div
                  className="w-full max-w-8 bg-gradient-to-t from-primary to-yellow-400 rounded-t-lg relative overflow-hidden"
                  style={{ height: `${item.value * 1.2}px` }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.1,
                    }}
                  />
                </motion.div>
                <div className="text-xs text-muted-foreground font-medium">
                  {item.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress Indicators */}
          <div className="flex items-center justify-between mt-4 text-xs">
            <div className="flex items-center gap-2">
              <Target className="w-3 h-3 text-green-500" />
              <span className="text-muted-foreground">Target: 85%</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-3 h-3 text-blue-500" />
              <span className="text-muted-foreground">Trending Up</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};