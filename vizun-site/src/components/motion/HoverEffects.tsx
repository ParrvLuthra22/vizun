'use client';

import { motion } from 'framer-motion';
import { ReactNode, CSSProperties } from 'react';
import { tap, durations, easings } from '@/lib/motion';

interface HoverLiftProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  intensity?: 'subtle' | 'medium' | 'strong';
}

/**
 * HoverLift - Subtle lift effect on hover
 * 
 * Elegant hover animation that lifts the element
 * Perfect for cards, buttons, and interactive elements
 * 
 * Usage:
 * <HoverLift intensity="subtle">
 *   <YourCard />
 * </HoverLift>
 */
export const HoverLift = ({
  children,
  className = '',
  style = {},
  intensity = 'medium',
}: HoverLiftProps) => {
  const intensityMap = {
    subtle: { scale: 1.01, y: -2 },
    medium: { scale: 1.02, y: -4 },
    strong: { scale: 1.03, y: -8 },
  };

  const hover = {
    ...intensityMap[intensity],
    transition: {
      duration: durations.medium,
      ease: easings.luxury,
    }
  };

  return (
    <motion.div
      whileHover={hover}
      whileTap={tap}
      className={className}
      style={{ ...style, cursor: 'pointer' }}
    >
      {children}
    </motion.div>
  );
};

interface HoverScaleProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  scale?: number;
}

/**
 * HoverScale - Scale effect on hover
 * 
 * Smooth scale animation for images and elements
 */
export const HoverScale = ({
  children,
  className = '',
  style = {},
  scale = 1.05,
}: HoverScaleProps) => {
  return (
    <motion.div
      whileHover={{
        scale,
        transition: {
          duration: durations.medium,
          ease: easings.scale,
        }
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  strength?: number;
}

/**
 * MagneticButton - Magnetic effect that follows cursor
 * 
 * Subtle magnetic pull effect for luxury buttons
 * Creates an expensive, interactive feel
 */
export const MagneticButton = ({
  children,
  className = '',
  style = {},
}: Omit<MagneticButtonProps, 'strength'>) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.02,
        transition: {
          duration: durations.fast,
          ease: easings.luxury,
        }
      }}
      whileTap={{ scale: 0.98 }}
      className={className}
      style={{ ...style, cursor: 'pointer' }}
    >
      {children}
    </motion.div>
  );
};

interface HoverGlowProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  color?: string;
  intensity?: number;
}

/**
 * HoverGlow - Subtle glow effect on hover
 * 
 * Adds a luxury glow around the element
 */
export const HoverGlow = ({
  children,
  className = '',
  style = {},
  color = '0, 102, 255',
  intensity = 0.3,
}: HoverGlowProps) => {
  return (
    <motion.div
      whileHover={{
        boxShadow: `0 0 40px rgba(${color}, ${intensity})`,
        transition: {
          duration: durations.medium,
          ease: easings.entry,
        }
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};
