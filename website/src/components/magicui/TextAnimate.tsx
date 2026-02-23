import React from 'react';
import { motion, Variants } from 'framer-motion';

type AnimationVariant = 'fadeIn' | 'blurIn' | 'blurInUp' | 'slideUp' | 'slideDown' | 'scaleUp';
type AnimateBy = 'text' | 'word' | 'character';

interface TextAnimateProps {
  children: string;
  className?: string;
  animation?: AnimationVariant;
  by?: AnimateBy;
  delay?: number;
  duration?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  style?: React.CSSProperties;
}

const variantMap: Record<AnimationVariant, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
  blurIn: {
    hidden: { opacity: 0, filter: 'blur(12px)' },
    show: { opacity: 1, filter: 'blur(0px)' },
  },
  blurInUp: {
    hidden: { opacity: 0, filter: 'blur(12px)', y: 20 },
    show: { opacity: 1, filter: 'blur(0px)', y: 0 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -30 },
    show: { opacity: 1, y: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.5 },
    show: { opacity: 1, scale: 1 },
  },
};

const staggerTimings: Record<AnimateBy, number> = {
  text: 0.06,
  word: 0.05,
  character: 0.03,
};

export default function TextAnimate({
  children,
  className = '',
  animation = 'blurInUp',
  by = 'word',
  delay = 0,
  duration = 0.5,
  as: Tag = 'p',
  style,
}: TextAnimateProps) {
  const itemVariants = variantMap[animation];

  let segments: string[];
  switch (by) {
    case 'word':
      segments = children.split(/(\s+)/);
      break;
    case 'character':
      segments = children.split('');
      break;
    case 'text':
    default:
      segments = [children];
      break;
  }

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerTimings[by],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', ...style }}
    >
      {segments.map((segment, i) => (
        <motion.span
          key={i}
          variants={itemVariants}
          transition={{ duration }}
          style={{
            display: 'inline-block',
            whiteSpace: segment.trim() === '' ? 'pre' : 'normal',
          }}
        >
          {segment}
        </motion.span>
      ))}
    </motion.div>
  );
}
