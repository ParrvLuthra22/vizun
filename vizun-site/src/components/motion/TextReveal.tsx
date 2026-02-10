'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { textReveal, staggerConfig, durations, easings, viewportMargin } from '@/lib/motion';

interface TextRevealProps {
  text: string;
  delay?: number;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  triggerOnce?: boolean;
  staggerSpeed?: 'fast' | 'medium' | 'slow' | 'luxurious';
}

/**
 * TextReveal - Word-by-word text reveal animation
 * 
 * Animates text with a cinematic word-by-word reveal
 * Perfect for headlines and important text
 * 
 * Usage:
 * <TextReveal 
 *   text="Quiet Luxury Redefined"
 *   as="h1"
 *   className="headline-hero"
 * />
 */
export const TextReveal = ({
  text,
  delay = 0,
  className = '',
  as: Component = 'p',
  triggerOnce = true,
  staggerSpeed = 'medium',
}: TextRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: triggerOnce,
    margin: viewportMargin.normal as "-50px"
  });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        ...staggerConfig[staggerSpeed],
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={container}
      style={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        perspective: '1000px',
      }}
      className={className}
    >
      {text.split(' ').map((word, index) => (
        <Component
          key={index}
          style={{ 
            marginRight: word.length > 0 ? '0.25em' : '0',
            display: 'inline-block',
          }}
        >
          <motion.span
            variants={textReveal}
            style={{ 
              display: 'inline-block',
              transformStyle: 'preserve-3d',
            }}
          >
            {word}
          </motion.span>
        </Component>
      ))}
    </motion.div>
  );
};

interface LineRevealProps {
  children: string;
  delay?: number;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  triggerOnce?: boolean;
}

/**
 * LineReveal - Single line reveal with mask effect
 * 
 * Reveals text from bottom with an elegant mask
 * Perfect for single lines or short text
 */
export const LineReveal = ({
  children,
  delay = 0,
  className = '',
  as: Component = 'p',
  triggerOnce = true,
}: LineRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: triggerOnce,
    margin: viewportMargin.normal as "-50px"
  });

  const variants = {
    hidden: { 
      opacity: 0,
      y: 40,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.slow,
        delay,
        ease: easings.luxury,
      }
    }
  };

  return (
    <div style={{ overflow: 'hidden' }}>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
      >
        <Component className={className}>
          {children}
        </Component>
      </motion.div>
    </div>
  );
};
