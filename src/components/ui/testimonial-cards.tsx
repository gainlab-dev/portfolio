"use client";

import * as React from 'react';
import { motion } from 'framer-motion';

export interface TestimonialCardProps {
  handleShuffle: () => void;
  testimonial: string;
  position: string;
  id: number;
  author: string;
}

export function TestimonialCard({
  handleShuffle,
  testimonial,
  position,
  id,
  author,
}: TestimonialCardProps) {
  const dragRef = React.useRef(0);
  const isFront = position === "front";

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? 5 : position === "middle" ? 4 : position === "back" ? 3 : 0,
      }}
      animate={{
        rotate: position === "front" ? -6 : position === "middle" ? 0 : position === "back" ? 6 : 0,
        x: position === "front" ? "0%" : position === "middle" ? "33%" : position === "back" ? "66%" : "100%",
        opacity: position === "hidden" ? 0 : 1,
      }}
      drag={isFront}
      dragElastic={0.35}
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      onDragStart={(e: any) => {
        dragRef.current = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      }}
      onDragEnd={(e: any, info: any) => {
        const clientX = e.clientX || (info && info.point ? info.point.x : 0);
        if (dragRef.current - clientX > 100 || info.offset.x < -100) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      transition={{ duration: 0.35 }}
      className={`absolute left-0 top-0 grid h-[450px] w-[350px] select-none place-content-center space-y-6 rounded-2xl border-2 border-slate-700 bg-slate-800/20 p-6 shadow-xl backdrop-blur-md ${
        isFront ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      <img
        src={`https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80&ixlib=rb-4.0.3`}
        alt={`Avatar of ${author}`}
        className="pointer-events-none mx-auto h-32 w-32 rounded-full border-2 border-slate-700 bg-slate-200 object-cover"
      />
      <span className="text-center text-lg italic text-slate-400">"{testimonial}"</span>
      <span className="text-center text-sm font-medium text-indigo-400">{author}</span>
    </motion.div>
  );
}
