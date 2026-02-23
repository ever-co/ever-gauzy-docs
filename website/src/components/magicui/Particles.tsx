import React, { useEffect, useRef, useState, useCallback } from 'react';

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  color?: string;
  vx?: number;
  vy?: number;
}

interface Circle {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
}

function hexToRgb(hex: string): number[] {
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map((c) => c + c).join('');
  }
  const val = parseInt(hex, 16);
  return [(val >> 16) & 255, (val >> 8) & 255, val & 255];
}

export default function Particles({
  className = '',
  quantity = 80,
  staticity = 50,
  ease = 50,
  size = 0.4,
  color = '#ffffff',
  vx = 0,
  vy = 0,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Circle[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const canvasSize = useRef({ w: 0, h: 0 });
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;

  const rgb = hexToRgb(color);

  const resizeCanvas = useCallback(() => {
    if (canvasRef.current && containerRef.current) {
      circles.current = [];
      canvasSize.current.w = containerRef.current.offsetWidth;
      canvasSize.current.h = containerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current?.scale(dpr, dpr);
    }
  }, [dpr]);

  const circleParams = useCallback((): Circle => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const pSize = Math.floor(Math.random() * 2) + size;
    return {
      x, y,
      translateX: 0, translateY: 0,
      size: pSize,
      alpha: 0,
      targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
      dx: (Math.random() - 0.5) * 0.1,
      dy: (Math.random() - 0.5) * 0.1,
      magnetism: 0.1 + Math.random() * 4,
    };
  }, [size]);

  const drawCircle = useCallback((circle: Circle, update = false) => {
    if (!context.current) return;
    const { x, y, translateX, translateY, size: s, alpha } = circle;
    context.current.translate(translateX, translateY);
    context.current.beginPath();
    context.current.arc(x, y, s, 0, 2 * Math.PI);
    context.current.fillStyle = `rgba(${rgb.join(',')}, ${alpha})`;
    context.current.fill();
    context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!update) circles.current.push(circle);
  }, [dpr, rgb]);

  const clearContext = useCallback(() => {
    context.current?.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
  }, []);

  const drawParticles = useCallback(() => {
    clearContext();
    for (let i = 0; i < quantity; i++) {
      const circle = circleParams();
      drawCircle(circle);
    }
  }, [quantity, circleParams, drawCircle, clearContext]);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext('2d');
    }
    resizeCanvas();
    drawParticles();

    const onMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const { w, h } = canvasSize.current;
        const x = e.clientX - rect.left - w / 2;
        const y = e.clientY - rect.top - h / 2;
        const inside = e.clientX >= rect.left && e.clientX <= rect.right &&
                       e.clientY >= rect.top && e.clientY <= rect.bottom;
        if (inside) {
          mouse.current = { x, y };
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', resizeCanvas);

    let rafID: number;
    const animate = () => {
      clearContext();
      circles.current.forEach((circle, i) => {
        const edge = [
          circle.x + circle.translateX - circle.size,
          canvasSize.current.w - circle.x - circle.translateX - circle.size,
          circle.y + circle.translateY - circle.size,
          canvasSize.current.h - circle.y - circle.translateY - circle.size,
        ];
        const closestEdge = Math.min(...edge);
        const remapClosestEdge = Math.max(0, Math.min(1, closestEdge / 20));
        circle.alpha += (Math.min(remapClosestEdge, circle.targetAlpha) - circle.alpha) * 0.08;
        circle.x += circle.dx + vx;
        circle.y += circle.dy + vy;
        circle.translateX += ((mouse.current.x / (staticity / circle.magnetism)) - circle.translateX) / ease;
        circle.translateY += ((mouse.current.y / (staticity / circle.magnetism)) - circle.translateY) / ease;

        if (
          circle.x < -circle.size || circle.x > canvasSize.current.w + circle.size ||
          circle.y < -circle.size || circle.y > canvasSize.current.h + circle.size
        ) {
          circles.current.splice(i, 1);
          const newCircle = circleParams();
          drawCircle(newCircle);
        } else {
          drawCircle({ ...circle, x: circle.x, y: circle.y, translateX: circle.translateX, translateY: circle.translateY, alpha: circle.alpha }, true);
        }
      });
      rafID = window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      window.cancelAnimationFrame(rafID);
    };
  }, [clearContext, drawCircle, drawParticles, circleParams, resizeCanvas, ease, staticity, vx, vy]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
