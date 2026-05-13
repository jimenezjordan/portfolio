'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export default function RevealOnScroll({
  children,
  delay = 0,
  className
}: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}