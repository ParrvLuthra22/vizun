'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode, CSSProperties } from 'react';
import { parallaxConfig, imageScaleConfig } from '@/lib/motion';

interface ParallaxProps {
  children: ReactNode;
  speed?: 'subtle' | 'medium' | 'strong';
  direction?: 'up' | 'down';
  scale?: boolean;
  scaleIntensity?: 'subtle' | 'medium' | 'strong';
  className?: string;
  style?: CSSProperties;
}

/**
 * Parallax - Subtle parallax effect on scroll
 * 
 * Features:
 * - Configurable speed (subtle, medium, strong)
 * - Direction control (up/down)
 * - Optional scale effect
 * - Luxury smooth motion
 * 
 * Usage:
 * <Parallax speed="subtle" scale>
 *   <img src="..." alt="..." />
 * </Parallax>
 */
export const Parallax = ({
  children,
  speed = 'medium',
  direction = 'down',
  scale = false,
  scaleIntensity = 'medium',
  className = '',
  style = {},
}: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Get parallax configuration
  const config = parallaxConfig[speed];
  const outputRange = direction === 'up' 
    ? [config.outputRange[1], config.outputRange[0]] 
    : config.outputRange;

  const y = useTransform(
    scrollYProgress,
    config.inputRange,
    outputRange
  );

  // Optional scale effect
  const scaleTransform = useTransform(
    scrollYProgress,
    imageScaleConfig[scaleIntensity].inputRange,
    imageScaleConfig[scaleIntensity].outputRange
  );
  
  const scaleValue = scale ? scaleTransform : 1;

  return (
    <div ref={ref} className={className} style={{ ...style, overflow: 'hidden' }}>
      <motion.div
        style={{
          y,
          scale: scaleValue,
          width: '100%',
          height: '100%',
          willChange: 'transform',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: 'subtle' | 'medium' | 'strong';
  scaleIntensity?: 'subtle' | 'medium' | 'strong';
  className?: string;
  objectFit?: 'cover' | 'contain';
  opacity?: number;
}

/**
 * ParallaxImage - Image with built-in parallax and scale
 * 
 * Optimized for luxury feel with smooth scaling and movement
 */
export const ParallaxImage = ({
  src,
  alt,
  speed = 'medium',
  scaleIntensity = 'medium',
  className = '',
  objectFit = 'cover',
  opacity = 1,
}: ParallaxImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(
    scrollYProgress,
    parallaxConfig[speed].inputRange,
    parallaxConfig[speed].outputRange
  );

  const scale = useTransform(
    scrollYProgress,
    imageScaleConfig[scaleIntensity].inputRange,
    imageScaleConfig[scaleIntensity].outputRange
  );

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden', position: 'relative', width: '100%', height: '100%' }}>
      <motion.img
        src={src}
        alt={alt}
        style={{
          y,
          scale,
          width: '100%',
          height: '100%',
          objectFit,
          opacity,
          willChange: 'transform',
        }}
      />
    </div>
  );
};
