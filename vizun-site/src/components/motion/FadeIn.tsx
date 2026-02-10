'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { fadeSlideUp, fadeSlideDown, fadeSlideLeft, fadeSlideRight, fadeIn, scaleIn, viewportMargin } from '@/lib/motion';

interface FadeInProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none' | 'scale';
  delay?: number;
  duration?: number;
  className?: string;
  triggerOnce?: boolean;
  margin?: keyof typeof viewportMargin;
}

/**
 * FadeIn - Scroll-triggered fade animations with directional slide
 * 
 * Features:
 * - Multiple directions (up, down, left, right, scale, none)
 * - Configurable delay and duration
 * - Viewport margin control for trigger timing
 * - Luxury easing curves
 * 
 * Usage:
 * <FadeIn direction="up" delay={0.2}>
 *   <YourContent />
 * </FadeIn>
 */
export const FadeIn = ({
  children,
  direction = 'up',
  delay = 0,
  duration,
  className = '',
  triggerOnce = true,
  margin = 'normal',
}: FadeInProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: triggerOnce, 
    margin: viewportMargin[margin] as "-100px" | "-50px" | "0px" | "0px 0px -20%" | "0px 0px -40%"
  });

  const getVariant = () => {
    switch (direction) {
      case 'up': return fadeSlideUp;
      case 'down': return fadeSlideDown;
      case 'left': return fadeSlideLeft;
      case 'right': return fadeSlideRight;
      case 'scale': return scaleIn;
      case 'none': return fadeIn;
      default: return fadeSlideUp;
    }
  };

  const variant = getVariant();

  // Override duration if provided
  const customVariant = duration ? {
    ...variant,
    visible: {
      ...variant.visible,
      transition: {
        ...variant.visible.transition,
        duration,
        delay,
      }
    }
  } : {
    ...variant,
    visible: {
      ...variant.visible,
      transition: {
        ...variant.visible.transition,
        delay,
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={customVariant}
      className={className}
    >
      {children}
    </motion.div>
  );
};
