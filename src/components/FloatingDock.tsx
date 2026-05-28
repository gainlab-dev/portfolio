"use client";

import { useRef, cloneElement } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, User, Code2, Briefcase, History, Mail } from "lucide-react";
import { GlassEffect, GlassFilter } from "./ui/liquid-glass";

interface DockIconProps {
  mouseX: any;
  icon: React.ReactNode;
  href: string;
  label: string;
}

export default function FloatingDock() {
  const mouseX = useMotionValue(Infinity);

  const items = [
    { icon: <Home className="w-5 h-5" />, label: "Home", href: "#" },
    { icon: <User className="w-5 h-5" />, label: "About", href: "#about" },
    { icon: <Code2 className="w-5 h-5" />, label: "Skills", href: "#skills" },
    { icon: <Briefcase className="w-5 h-5" />, label: "Projects", href: "#projects" },
    { icon: <History className="w-5 h-5" />, label: "Experience", href: "#experience" },
    { icon: <Mail className="w-5 h-5" />, label: "Contact", href: "#contact" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[95vw]">
      {/* SVG Liquid Refraction Filter */}
      <GlassFilter />

      {/* Mobile Dock (Compact, Responsive, Liquid Glass & Tap Float) */}
      <GlassEffect
        className="flex sm:hidden h-11 items-center rounded-full px-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] animate-moveBackground bg-[length:200%_200%]"
      >
        <div className="flex items-center gap-1.5">
          {items.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              aria-label={item.label}
              whileTap={{
                y: -6,
                scale: 1.15,
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                borderColor: "rgba(255, 255, 255, 0.22)",
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
              className="flex h-[30px] w-[30px] min-[375px]:h-8 min-[375px]:w-8 items-center justify-center rounded-lg bg-white/5 border border-white/5 text-zinc-400 active:text-white transition-colors duration-150"
            >
              {cloneElement(item.icon as React.ReactElement<{ className?: string }>, {
                className: "w-3.5 h-3.5 min-[375px]:w-4 min-[375px]:h-4 shrink-0",
              })}
            </motion.a>
          ))}
        </div>
      </GlassEffect>

      {/* Desktop Dock (Interactive Magnification & Liquid Glass) */}
      <GlassEffect
        className="hidden sm:flex h-16 items-end gap-3.5 rounded-full px-6 pb-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] animate-moveBackground bg-[length:200%_200%]"
      >
        <motion.div
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="flex items-end gap-3.5"
        >
          {items.map((item) => (
            <DockIcon
              key={item.label}
              mouseX={mouseX}
              icon={item.icon}
              href={item.href}
              label={item.label}
            />
          ))}
        </motion.div>
      </GlassEffect>
    </div>
  );
}

function DockIcon({ mouseX, icon, href, label }: DockIconProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-100, 0, 100], [42, 58, 42]);
  const heightTransform = useTransform(distance, [-100, 0, 100], [42, 58, 42]);

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ width, height }}
      className="group relative flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.12] hover:border-white/20 transition-all shadow-inner"
    >
      <span className="absolute -top-10 scale-0 rounded bg-zinc-950 border border-white/10 px-2 py-1 text-[10px] font-bold text-white transition-all group-hover:scale-100 whitespace-nowrap shadow-2xl pointer-events-none">
        {label}
      </span>
      <div className="text-zinc-400 group-hover:text-white transition-colors shrink-0">
        {icon}
      </div>
    </motion.a>
  );
}
