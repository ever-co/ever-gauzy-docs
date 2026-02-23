import React from 'react';
import styles from './magicui.module.css';

interface ShimmerButtonProps {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
  background?: string;
  href?: string;
  onClick?: () => void;
}

export default function ShimmerButton({
  children,
  className = '',
  shimmerColor = 'rgba(255,255,255,0.3)',
  background = 'linear-gradient(135deg, #6755C9 0%, #8B5CF6 50%, #A855F7 100%)',
  href,
  onClick,
}: ShimmerButtonProps) {
  const buttonStyle = {
    '--shimmer-color': shimmerColor,
    '--btn-bg': background,
  } as React.CSSProperties;

  const content = (
    <span className={styles.shimmerButtonInner}>
      <span className={styles.shimmerEffect} />
      <span className={styles.shimmerButtonText}>{children}</span>
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`${styles.shimmerButton} ${className}`}
        style={buttonStyle}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={`${styles.shimmerButton} ${className}`}
      style={buttonStyle}
      onClick={onClick}
      type="button"
    >
      {content}
    </button>
  );
}
