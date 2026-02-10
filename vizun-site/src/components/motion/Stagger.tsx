'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { staggerContainer, viewportMargin } from '@/lib/motion';

interface StaggerProps {
  children: ReactNode;
  speed?: 'fast' | 'medium' | 'slow' | 'luxurious';
  className?: string;
  triggerOnce?: boolean;
  margin?: keyof typeof viewportMargin;
}

/**
 * Stagger - Container that staggers children animations
 * 
 * Wraps children and animates them with a staggered delay
 * Perfect for lists, grids, and multiple elements
 * 
 * Usage:
 * <Stagger speed="medium">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stagger>
 */
export const Stagger = ({
  children,
  speed = 'medium',
  className = '',
  triggerOnce = true,
  margin = 'normal',
}: StaggerProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: triggerOnce,
    margin: viewportMargin[margin] as "-100px" | "-50px" | "0px" | "0px 0px -20%" | "0px 0px -40%"
  });

  const container = staggerContainer(speed);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={container}
      className={className}
    >
      {children}
    </motion.div>
  );
};
