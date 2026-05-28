"use client";

import { useRef, cloneElement, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, User, Code2, Briefcase, History, Mail } from "lucide-react";
import { GlassEffect, GlassFilter } from "./ui/liquid-glass";

interface DockIconProps {
  mouseX: any;
  icon: React.ReactNode;
  href: string;
  label: string;
}

function MobileDock() {
  const items = [
    { icon: <Home className="w-5 h-5" />, label: "Home", href: "#" },
    { icon: <User className="w-5 h-5" />, label: "About", href: "#about" },
    { icon: <Code2 className="w-5 h-5" />, label: "Skills", href: "#skills" },
    { icon: <Briefcase className="w-5 h-5" />, label: "Projects", href: "#projects" },
    { icon: <History className="w-5 h-5" />, label: "Experience", href: "#experience" },
    { icon: <Mail className="w-5 h-5" />, label: "Contact", href: "#contact" },
  ];

  return (
    <div
      id="mobile-dock"
      style={{
        position: "fixed",
        bottom: 24,
        left: 0,
        right: 0,
        zIndex: 99999,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        transform: "translate3d(0,0,0)",
        WebkitTransform: "translate3d(0,0,0)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div
        style={{
          display: "flex",
          height: 48,
          alignItems: "center",
          borderRadius: 9999,
          padding: "0 14px",
          gap: 6,
          background: "rgba(15, 15, 18, 0.82)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.2)",
          pointerEvents: "auto",
        }}
      >
        {items.map((item) => (
          <motion.a
            key={item.label}
            href={item.href}
            aria-label={item.label}
            whileTap={{
              y: -4,
              scale: 1.12,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10,
            }}
            style={{
              display: "flex",
              height: 36,
              width: 36,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              color: "#9ca3af",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {cloneElement(item.icon as React.ReactElement<{ className?: string }>, {
              className: "w-[18px] h-[18px] shrink-0",
            })}
          </motion.a>
        ))}
      </div>
    </div>
  );
}

function DesktopDock() {
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
    <div
      className="fixed inset-x-0 bottom-6 z-[99999] flex justify-center"
      style={{ transform: "translate3d(0,0,0)" }}
    >
      <GlassFilter />
      <GlassEffect className="flex h-16 items-end gap-3.5 rounded-full px-6 pb-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] animate-moveBackground bg-[length:200%_200%]">
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

export default function FloatingDock() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    setMounted(true);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!mounted) return null;

  // Mobile: render via portal to document.body to escape GSAP stacking contexts
  // Desktop: render in-place (no GSAP stacking issues on desktop)
  if (isMobile) {
    return createPortal(<MobileDock />, document.body);
  }

  return <DesktopDock />;
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
