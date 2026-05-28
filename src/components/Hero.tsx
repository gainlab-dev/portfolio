"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { unlockAudio } from "@/utils/audio";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [showVolumeTip, setShowVolumeTip] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mute video when scrolling out of viewport using IntersectionObserver
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoElement) return;
        if (entry.isIntersecting) {
          // Restore video mute state to match user global preference
          videoElement.muted = (window as any).portfolioMuted ?? true;
        } else {
          // Mute video element when off screen without affecting global volume preference
          videoElement.muted = true;
        }
      },
      { threshold: 0, rootMargin: "-50% 0px 0px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Keyboard and Mouse Wheel scroll down intercept to transition to #about
  useEffect(() => {
    let scrolled = false;

    const triggerScroll = () => {
      if (scrolled) return;
      scrolled = true;
      const targetSection = document.getElementById("about");
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (scrolled || e.deltaY <= 0 || window.scrollY > 50) return;
      e.preventDefault();
      triggerScroll();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (scrolled || window.scrollY > 50) return;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        triggerScroll();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    (window as any).portfolioMuted = muted;
  }, [muted]);

  const handleAudioToggle = () => {
    const video = videoRef.current;
    if (video) {
      const nextMuted = !video.muted;
      video.muted = nextMuted;
      setMuted(nextMuted);
      setShowVolumeTip(false);
      
      // Unlock Web Audio Context on mobile tap gesture
      unlockAudio();

      window.dispatchEvent(new CustomEvent("portfolioMuteToggle", { detail: nextMuted }));
    }
  };

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover opacity-100 brightness-110 z-[1] pointer-events-none"
        style={{ transform: "translate3d(0, 0, 0)" }}
      >
        <source src="/intro.mp4" type="video/mp4" />
      </video>

      {/* Gradients Scrim overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/20 to-black/30 z-[2] pointer-events-none" 
        style={{ transform: "translate3d(0, 0, 0)" }}
      />
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/60 z-[2] pointer-events-none" 
        style={{ transform: "translate3d(0, 0, 0)" }}
      />

      {/* Navbar & Hero Overlay Content */}
      <div 
        className="relative z-[3] flex h-full flex-col justify-between"
        style={{ transform: "translate3d(0, 0, 0)" }}
      >
        
        {/* Top Navbar */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8"
        >
          <nav>
            <ul className="flex items-center gap-4 sm:gap-8 md:gap-12">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-white/80 transition hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href="#contact"
            className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1.5 sm:px-5 sm:py-2.5 text-[9px] sm:text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-[1.03]"
          >
            <span className="hidden sm:inline">EMAIL ME</span>
            <span className="sm:hidden">EMAIL</span>
          </a>
        </motion.header>

        {/* Left-Aligned Typography */}
        <div className="flex flex-col justify-center flex-1 px-6 md:px-10">
          <div className="w-full text-left">
            <Reveal delay={0.3} y={20}>
              <p className="mb-4 text-[10px] sm:text-xs font-medium uppercase tracking-[0.35em] text-white/60">
                PORTFOLIO - 2026
              </p>
            </Reveal>
            <Reveal delay={0.5} y={40}>
              <h1
                className="font-black uppercase leading-[0.88] tracking-tight text-white mb-6"
                style={{ fontSize: "clamp(3rem, 12vw, 10.5rem)" }}
              >
                Usama
                <br />
                Rehman
              </h1>
            </Reveal>
            <Reveal delay={0.85} y={20}>
              <p className="text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-[0.3em] text-white/75">
                Developer · Designer · GenAI Integration
              </p>
            </Reveal>
          </div>
        </div>

        {/* Bottom Elements: Scroll Indicator & Audio toggle */}
        <div className="flex items-end justify-between px-6 md:px-10 pb-7 sm:pb-10 md:pb-12">
          {/* Scroll Down */}
          <Reveal delay={1.1} y={20}>
            <a
              href="#about"
              aria-label="Scroll to next section"
              className="group flex flex-col items-center gap-3"
            >
              <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.35em] text-white/70 transition group-hover:text-white">
                SCROLL
              </span>
              <div className="relative h-12 w-px overflow-hidden bg-white/20">
                <span className="absolute inset-x-0 top-0 h-1/2 w-full bg-white animate-scrollLine" />
              </div>
            </a>
          </Reveal>

          {/* Sound Control */}
          <Reveal delay={1.1} y={20}>
            <div className="flex items-center gap-3">
              {showVolumeTip && (
                <span className="hidden sm:inline text-[10px] font-medium uppercase tracking-[0.25em] text-white/80 animate-pulseFade">
                  Tap for sound
                </span>
              )}
              <button
                onClick={handleAudioToggle}
                aria-label={muted ? "Unmute video" : "Mute video"}
                className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-110 cursor-pointer"
              >
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
