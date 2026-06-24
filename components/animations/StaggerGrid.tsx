'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode, Children, isValidElement } from 'react';

interface StaggerGridProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export default function StaggerGrid({ children, staggerDelay = 0.1, className = '' }: StaggerGridProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
    >
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return <motion.div variants={itemVariants}>{child}</motion.div>;
        }
        return child;
      })}
    </motion.div>
  );
}
