"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") ||
        target.classList?.contains("cursor-pointer") ||
        target.closest(".cursor-pointer");
      setHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 hidden md:block">
      {/* Outer Ring */}
      <motion.div
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hovered ? 1.5 : 1,
          backgroundColor: hovered ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0)",
          borderColor: hovered ? "rgba(255, 255, 255, 0.6)" : "rgba(255, 255, 255, 0.2)",
          width: hovered ? 48 : 32,
          height: hovered ? 48 : 32,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        className="absolute rounded-full border border-white/20 mix-blend-difference"
      />
      {/* Inner Dot */}
      <motion.div
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: hovered ? 0.5 : 1,
        }}
        className="absolute w-2 h-2 bg-white rounded-full mix-blend-difference"
      />
    </div>
  );
}
