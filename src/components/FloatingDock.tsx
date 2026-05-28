"use client";

import { useRef, cloneElement } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, User, Code2, Briefcase, History, Mail } from "lucide-react";

interface DockIconProps {
  mouseX: any;
  icon: React.ReactNode;
  href: string;
  label: string;
}

export default function FloatingDock() {
  const mouseX = useMotionValue(Infinity);

  const items = [
    { icon: <Home size={20} />, label: "Home", href: "#" },
    { icon: <User size={20} />, label: "About", href: "#about" },
    { icon: <Code2 size={20} />, label: "Skills", href: "#skills" },
    { icon: <Briefcase size={20} />, label: "Projects", href: "#projects" },
    { icon: <History size={20} />, label: "Experience", href: "#experience" },
    { icon: <Mail size={20} />, label: "Contact", href: "#contact" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[95vw]">
      {/* Mobile Dock (Compact, Liquid Glass & Tap Float) */}
      <div className="flex sm:hidden h-12 items-center gap-2 rounded-xl bg-zinc-900/60 border border-white/10 px-2.5 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-xl">
        {items.map((item) => (
          <motion.a
            key={item.label}
            href={item.href}
            aria-label={item.label}
            whileTap={{
              y: -8,
              scale: 1.22,
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              borderColor: "rgba(255, 255, 255, 0.22)",
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/5 text-zinc-400 active:text-white transition-colors duration-150"
          >
            {cloneElement(item.icon as React.ReactElement<{ size?: number }>, { size: 15 })}
          </motion.a>
        ))}
      </div>

      {/* Desktop Dock (Interactive Magnification & Liquid Glass) */}
      <motion.div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="hidden sm:flex h-16 items-end gap-3.5 rounded-2xl bg-zinc-900/60 border border-white/10 px-4 pb-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] backdrop-blur-xl"
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
      className="group relative flex items-center justify-center rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-colors"
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
