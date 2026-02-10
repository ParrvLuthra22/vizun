/**
 * VIZUN Motion System
 * Luxury-grade animation configurations
 * 
 * Design Principles:
 * - Calm, cinematic, expensive feel
 * - 300-600ms durations
 * - Elegant easing functions
 * - No sudden movements or bounce effects
 */

// Luxury Easing Functions
export const easings = {
  // Primary luxury easing - smooth and sophisticated
  luxury: [0.16, 1, 0.3, 1] as [number, number, number, number],

  // Aggressive / Kinetic - Fast acceleration, sharp snap
  aggressive: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number],

  // Impact - Instant hit
  impact: [0.22, 1, 0.36, 1] as [number, number, number, number],

  // Subtle entry - for text reveals
  entry: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],

  // Smooth exit - for hover states
  exit: [0.4, 0, 0.6, 1] as [number, number, number, number],

  // Parallax motion - ultra smooth
  parallax: [0.19, 1, 0.22, 1] as [number, number, number, number],

  // Image scale - gentle expansion
  scale: [0.33, 1, 0.68, 1] as [number, number, number, number],
} as const;

// Standard Animation Durations
export const durations = {
  instant: 0.1,    // Micro-interactions (faster)
  fast: 0.25,       // Button hovers
  medium: 0.4,     // Standard transitions
  slow: 0.6,       // Reveals and entries
  cinematic: 0.8,  // Hero elements (faster)
} as const;

// Fade & Slide Animations
export const fadeSlideUp = {
  hidden: {
    opacity: 0,
    y: 40
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.slow,
      ease: easings.luxury,
    }
  }
};

export const fadeSlideDown = {
  hidden: {
    opacity: 0,
    y: -40
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.slow,
      ease: easings.luxury,
    }
  }
};

export const fadeSlideLeft = {
  hidden: {
    opacity: 0,
    x: 60
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: durations.slow,
      ease: easings.luxury,
    }
  }
};

export const fadeSlideRight = {
  hidden: {
    opacity: 0,
    x: -60
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: durations.slow,
      ease: easings.luxury,
    }
  }
};

// Fade In/Out
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: durations.slow,
      ease: easings.entry,
    }
  }
};

// Slam Up - Aggressive reveal
export const slamUp = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.medium,
      ease: easings.aggressive,
    }
  }
};

// Mask Reveal
export const maskReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0 0 0)',
    transition: {
      duration: durations.slow,
      ease: easings.aggressive,
    }
  }
};

// Impact Variant - Hard entry with scale
export const impactVar = {
  hidden: { opacity: 0, scale: 1.1, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.4,
      ease: easings.impact
    }
  }
};

// Tilt Enter - 3D rotation on load
export const tiltEnter = {
  hidden: {
    opacity: 0,
    scale: 1.2,
    rotateX: 5,
    y: 50
  },
  visible: {
    opacity: 1,
    scale: 1.1,
    rotateX: 0,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1] // Custom luxury ease
    }
  }
};

// Scale Animations
export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: durations.slow,
      ease: easings.scale,
    }
  }
};

// Text Reveal - Word by word
export const textReveal = {
  hidden: {
    opacity: 0,
    y: 50,
    rotateX: -15,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: durations.slow,
      ease: easings.luxury,
    }
  }
};

// Stagger Children Configurations
export const staggerConfig = {
  fast: {
    staggerChildren: 0.08,
    delayChildren: 0.1,
  },
  medium: {
    staggerChildren: 0.12,
    delayChildren: 0.2,
  },
  slow: {
    staggerChildren: 0.15,
    delayChildren: 0.3,
  },
  luxurious: {
    staggerChildren: 0.2,
    delayChildren: 0.4,
  }
};

// Container variants for staggered children
export const staggerContainer = (speed: keyof typeof staggerConfig = 'medium') => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: staggerConfig[speed],
  }
});

// Hover Animations
export const hoverLift = {
  scale: 1.02,
  y: -4,
  transition: {
    duration: durations.medium,
    ease: easings.luxury,
  }
};

export const hoverScale = {
  scale: 1.05,
  transition: {
    duration: durations.medium,
    ease: easings.scale,
  }
};

export const hoverBrightness = {
  filter: 'brightness(1.1)',
  transition: {
    duration: durations.fast,
    ease: easings.entry,
  }
};

// Tap Animation
export const tap = {
  scale: 0.98,
  transition: {
    duration: durations.instant,
    ease: easings.exit,
  }
};

// Parallax Scroll Configurations
export const parallaxConfig = {
  subtle: {
    inputRange: [0, 1],
    outputRange: ['0%', '10%'],
  },
  medium: {
    inputRange: [0, 1],
    outputRange: ['0%', '20%'],
  },
  strong: {
    inputRange: [0, 1],
    outputRange: ['0%', '30%'],
  },
};

// Image Scale on Scroll
export const imageScaleConfig = {
  subtle: {
    inputRange: [0, 1],
    outputRange: [1, 1.05],
  },
  medium: {
    inputRange: [0, 1],
    outputRange: [1, 1.1],
  },
  strong: {
    inputRange: [0, 1],
    outputRange: [1, 1.15],
  },
};

// Viewport Margin for Scroll Triggers
export const viewportMargin = {
  immediate: '0px',      // Trigger immediately when in view
  early: '-100px',       // Trigger before element enters
  normal: '-50px',       // Balanced trigger point (default)
  late: '0px 0px -20%',  // Trigger when 20% visible
  delayed: '0px 0px -40%', // Trigger when 40% visible
};
