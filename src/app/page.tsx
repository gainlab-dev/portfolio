"use client";

import { useEffect, useState, useRef } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import FloatingDock from "@/components/FloatingDock";
import { playScrollTick } from "@/utils/audio";

export default function Home() {
  const [, setIsMuted] = useState(true);
  const activeSectionRef = useRef<string>("");

  // Sync global audio mute state
  useEffect(() => {
    const handleMuteToggle = (e: Event) => {
      setIsMuted((e as CustomEvent).detail);
    };
    window.addEventListener("portfolioMuteToggle", handleMuteToggle);

    // Initial sync
    if ((window as any).portfolioMuted !== undefined) {
      setIsMuted((window as any).portfolioMuted);
    }

    return () => {
      window.removeEventListener("portfolioMuteToggle", handleMuteToggle);
    };
  }, []);

  // Observe section transitions and play click sounds
  useEffect(() => {
    const sections = ["home", "about", "services", "projects", "experience", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Focus a narrow 10% band in the vertical center
      threshold: 0,
    };

    let initialized = false;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          
          // Avoid playing sound on first load when section initializes
          if (initialized && activeSectionRef.current !== sectionId) {
            const currentMuted = (window as any).portfolioMuted ?? true;
            if (!currentMuted) {
              playScrollTick();
            }
          }
          activeSectionRef.current = sectionId;
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Mark initialized shortly after mount to prevent initial trigger sounds
    const timer = setTimeout(() => {
      initialized = true;
    }, 200);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* Premium custom mouse interaction cursor */}
      <CustomCursor />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Services Section */}
      <Services />

      {/* Projects Section */}
      <Projects />

      {/* Experience Section */}
      <Experience />

      {/* Contact Section */}
      <Contact />

      {/* MacOS Magnifying Floating Navigation Dock */}
      <FloatingDock />
    </>
  );
}
