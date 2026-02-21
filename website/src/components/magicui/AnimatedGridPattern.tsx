import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedGridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  numSquares?: number;
  className?: string;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
  strokeColor?: string;
  fillColor?: string;
}

interface Square {
  id: number;
  pos: [number, number];
}

export default function AnimatedGridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  numSquares = 50,
  className = '',
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
  strokeColor = 'currentColor',
  fillColor = 'currentColor',
}: AnimatedGridPatternProps) {
  const id = useId();
  const containerRef = useRef<SVGSVGElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [squares, setSquares] = useState<Square[]>([]);

  const getPos = useCallback((): [number, number] => {
    return [
      Math.floor((Math.random() * (dimensions.width || 1)) / width),
      Math.floor((Math.random() * (dimensions.height || 1)) / height),
    ];
  }, [dimensions.width, dimensions.height, width, height]);

  const generateSquares = useCallback(
    (count: number): Square[] =>
      Array.from({ length: count }, (_, i) => ({ id: i, pos: getPos() })),
    [getPos]
  );

  const updateSquarePosition = useCallback(
    (id: number) => {
      setSquares((prev) =>
        prev.map((sq) => (sq.id === id ? { ...sq, pos: getPos() } : sq))
      );
    },
    [getPos]
  );

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      setSquares(generateSquares(numSquares));
    }
  }, [dimensions, generateSquares, numSquares]);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        fill: 'transparent',
        stroke: strokeColor,
        strokeOpacity: 0.15,
      }}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <svg x={x} y={y}>
        {squares.map(({ pos: [sqX, sqY], id: sqId }, index) => (
          <motion.rect
            key={`${sqId}-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            transition={{
              duration,
              repeat: Infinity,
              delay: sqId * 0.1,
              repeatType: 'reverse',
              repeatDelay,
            }}
            onAnimationComplete={() => updateSquarePosition(sqId)}
            width={width - 1}
            height={height - 1}
            x={sqX * width + 1}
            y={sqY * height + 1}
            fill={fillColor}
            strokeWidth="0"
            style={{ opacity: 0 }}
          />
        ))}
      </svg>
    </svg>
  );
}
