"use client";

import { useEffect, useRef } from "react";

interface TidalCursorProps {
  /** Ripple stroke color (CSS rgba recommended) */
  rippleColor?: string;
  /** Ripple expansion speed in px per frame */
  speed?: number;
  /** Ripple fade rate per frame (lower = longer trails) */
  fadeRate?: number;
  /** Stroke width */
  lineWidth?: number;
  className?: string;
}

const TidalCursor: React.FC<TidalCursorProps> = ({
  rippleColor = "rgba(0, 255, 255, 0.8)",
  speed = 1.5,
  fadeRate = 0.01,
  lineWidth = 2,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ripples = useRef<
    { x: number; y: number; radius: number; alpha: number }[]
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeObserver = new ResizeObserver(() => {
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    });
    resizeObserver.observe(parent);

    const addRipple = (x: number, y: number) => {
      ripples.current.push({ x, y, radius: 0, alpha: 0.8 });
    };

    const handleMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      // Only add ripple if cursor is inside the section
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      if (cx >= 0 && cy >= 0 && cx <= rect.width && cy <= rect.height) {
        addRipple(cx, cy);
      }
    };

    window.addEventListener("mousemove", handleMove);

    let raf: number;
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ripples.current.forEach((r) => {
        r.radius += speed;
        r.alpha -= fadeRate;

        if (r.alpha > 0) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.strokeStyle = rippleColor.replace(
            /[\d.]+\)$/,
            `${r.alpha})`,
          );
          ctx.lineWidth = lineWidth;
          ctx.stroke();
        }
      });

      ripples.current = ripples.current.filter((r) => r.alpha > 0);
      raf = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf);
    };
  }, [rippleColor, speed, fadeRate, lineWidth]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};

export { TidalCursor };
