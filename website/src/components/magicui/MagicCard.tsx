import React, { useCallback, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import styles from './magicui.module.css';

interface MagicCardProps {
  children?: React.ReactNode;
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  gradientFrom?: string;
  gradientTo?: string;
}

export default function MagicCard({
  children,
  className = '',
  gradientSize = 200,
  gradientColor = '#262626',
  gradientOpacity = 0.8,
  gradientFrom = '#9E7AFF',
  gradientTo = '#FE8BBB',
}: MagicCardProps) {
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  const reset = useCallback(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [mouseX, mouseY, gradientSize]);

  const borderBackground = useMotionTemplate`
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientFrom}, ${gradientTo},
      transparent 100%
    )
  `;

  const glowBackground = useMotionTemplate`
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientColor}, transparent 100%
    )
  `;

  return (
    <div
      className={`${styles.magicCard} ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
    >
      {/* Gradient border effect */}
      <motion.div
        className={styles.magicCardBorder}
        style={{ background: borderBackground }}
      />
      {/* Card background fill */}
      <div className={styles.magicCardBg} />
      {/* Hover glow */}
      <motion.div
        className={styles.magicCardGlow}
        style={{ background: glowBackground, opacity: gradientOpacity }}
      />
      {/* Content */}
      <div className={styles.magicCardContent}>{children}</div>
    </div>
  );
}
