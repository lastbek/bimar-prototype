'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';

interface ReadingMetrics {
  totalWords: number;
  wordsLeft: number;
  wordsRead: number;
  minutesLeft: number;
  totalMinutes: number;
  percentageRead: number;
}

export function ProgressBar() {
  const [showPercentage, setShowPercentage] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isNearTop, setIsNearTop] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [metrics, setMetrics] = useState<ReadingMetrics>({
    totalWords: 0,
    wordsLeft: 0,
    wordsRead: 0,
    minutesLeft: 0,
    totalMinutes: 0,
    percentageRead: 0
  });

  // Smooth scroll progress
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform scroll progress for various effects
  const progressBarHeight = useTransform(scrollYProgress, [0, 0.01], [2, 4]);
  const progressBarOpacity = useTransform(scrollYProgress, [0, 0.01, 0.1], [0.6, 0.8, 1]);
  const circleScale = useTransform(scrollYProgress, [0, 0.05], [0.8, 1]);
  const pillScale = useTransform(scrollYProgress, [0, 0.1], [0.9, 1]);
  const circleProgress = useTransform(scrollYProgress, [0, 1], [100.53096491487338, 0]);

  // Calculate reading metrics
  useEffect(() => {
    const calculateMetrics = () => {
      const wordsPerMinute = 200;
      const mainContent = document.querySelector('main');
      const totalWords = mainContent?.textContent?.split(/\s+/).length || 0;
      const wordsLeft = Math.ceil(totalWords * ((100 - progress) / 100));
      const wordsRead = totalWords - wordsLeft;
      const minutesLeft = Math.ceil(wordsLeft / wordsPerMinute);
      const totalMinutes = Math.ceil(totalWords / wordsPerMinute);

      setMetrics({
        totalWords,
        wordsLeft,
        wordsRead,
        minutesLeft,
        totalMinutes,
        percentageRead: Math.round(progress)
      });
    };

    calculateMetrics();
  }, [progress]);

  useEffect(() => {
    const calculateProgress = () => {
      const winScroll = window.scrollY;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setProgress(Math.min(100, Math.max(0, scrolled)));

      // Show percentage when scrolling starts
      if (scrolled > 0 && scrolled < 100) {
        setShowPercentage(true);
      } else {
        setShowPercentage(false);
      }

      // Check if near top
      setIsNearTop(winScroll < 100);
    };

    window.addEventListener('scroll', calculateProgress);
    return () => window.removeEventListener('scroll', calculateProgress);
  }, []);

  return (
    <>
      {/* Progress Line with Gradient Pulse */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50"
        style={{ 
          height: progressBarHeight,
          opacity: progressBarOpacity
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 animate-pulse" />
        <motion.div
          className="absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-primary/90 via-primary to-primary/90"
          style={{ scaleX }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] animate-shine" />
        </motion.div>
      </motion.div>

      {/* Floating Progress Pill */}
      <AnimatePresence>
        {showPercentage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: pillScale
            }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            className="fixed top-6 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-md border shadow-lg rounded-full py-2 px-4 text-sm font-medium z-50"
          >
            <div className="flex items-center gap-4">
              {/* Reading Progress */}
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-primary animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                <span className="text-primary font-semibold">
                  {metrics.percentageRead}%
                </span>
              </div>

              {/* Divider */}
              <span className="w-px h-4 bg-border" />

              {/* Time Remaining */}
              <div className="flex items-center gap-2 text-muted-foreground">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>~{metrics.minutesLeft} min left</span>
              </div>

              {/* Divider */}
              <span className="w-px h-4 bg-border" />

              {/* Words Read */}
              <div className="flex items-center gap-2 text-muted-foreground">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>{metrics.wordsRead.toLocaleString()} words</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Progress Circle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: showPercentage ? 1 : 0,
          opacity: showPercentage ? 1 : 0
        }}
        style={{ scale: circleScale }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        className="fixed bottom-8 right-8 z-50"
      >
        <motion.div 
          className="relative w-20 h-20 cursor-pointer group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowDetails(!showDetails)}
        >
          {/* Outer glow with pulse */}
          <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse-slow" />
          
          <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
            {/* Outer glow ring */}
            <circle
              cx="18"
              cy="18"
              r="16"
              className="fill-none stroke-primary/10"
              strokeWidth="4"
            />
            {/* Background track with gradient */}
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-muted"
              strokeWidth="2"
            />
            {/* Progress circle with gradient and rounded caps */}
            <motion.circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-primary"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="100.53096491487338"
              style={{
                strokeDashoffset: circleProgress
              }}
            />
          </svg>

          {/* Center content with blur effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-background/80 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center group-hover:bg-background/90 transition-colors">
              <span className="text-base font-semibold">
                {metrics.percentageRead}%
              </span>
            </div>
          </div>

          {/* Tooltip */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                className="absolute bottom-full right-0 mb-4 w-48 bg-background/95 backdrop-blur-sm rounded-lg shadow-lg border p-3 text-sm"
              >
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Words:</span>
                    <span className="font-medium">{metrics.totalWords.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Words Left:</span>
                    <span className="font-medium">{metrics.wordsLeft.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Time:</span>
                    <span className="font-medium">{metrics.totalMinutes} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time Left:</span>
                    <span className="font-medium">{metrics.minutesLeft} min</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}
