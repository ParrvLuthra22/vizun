export const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
};

export const slideUp = {
    initial: { y: "100%" },
    animate: { y: "0%" },
    exit: { y: "100%" },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export const scaleIn = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.3 }
};

export const wordAnimation = {
    initial: { y: "100%" },
    animate: { y: "0%" },
    transition: { duration: 0.5, ease: "easeOut" }
};
