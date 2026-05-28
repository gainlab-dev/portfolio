"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";
import Reveal from "./Reveal";
import { DottedBackground } from "./ui/dotted-vignette-background";

interface ExperienceItem {
  type: "work" | "education";
  title: string;
  subtitle: string;
  date: string;
  location?: string;
  details: string[];
}

interface ExperienceCardProps extends ExperienceItem {
  handleShuffle: () => void;
  position: string;
  id: number;
}

function ExperienceCard({
  handleShuffle,
  position,
  type,
  title,
  subtitle,
  date,
  location,
  details,
  id,
}: ExperienceCardProps) {
  const dragRef = useRef(0);
  const isFront = position === "front";
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Stack styling configuration based on positions
  const zIndex = position === "front" ? 10 : position === "middle" ? 8 : position === "back" ? 6 : 0;
  const rotateValue = position === "front" ? -4 : position === "middle" ? 0 : position === "back" ? 4 : 0;
  
  // Custom responsive translation to prevent mobile viewport overflow
  const xValue = position === "front" ? "0%" : position === "middle" ? (isMobile ? "0%" : "20%") : position === "back" ? (isMobile ? "0%" : "40%") : "0%";
  const yValue = position === "front" ? "0px" : position === "middle" ? (isMobile ? "-14px" : "0px") : position === "back" ? (isMobile ? "-28px" : "0px") : "40px";
  const scaleValue = position === "front" ? 1 : position === "middle" ? (isMobile ? 0.96 : 0.98) : position === "back" ? (isMobile ? 0.92 : 0.96) : 0.90;
  const opacityValue = position === "hidden" ? 0 : 1;

  return (
    <motion.div
      style={{ zIndex }}
      animate={{
        rotate: rotateValue,
        x: xValue,
        y: yValue,
        scale: scaleValue,
        opacity: opacityValue,
      }}
      drag={isFront}
      dragElastic={0.3}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={(e: any) => {
        dragRef.current = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      }}
      onDragEnd={(e: any, info: any) => {
        const clientX = e.clientX || (info && info.point ? info.point.x : 0);
        if (dragRef.current - clientX > 80 || info.offset.x < -80) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute left-0 top-0 flex flex-col justify-between h-[450px] w-full max-w-[325px] sm:max-w-[350px] select-none rounded-[28px] border border-white/10 bg-[#121215]/85 p-6 sm:p-7 shadow-[0_12px_28px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 ${
        isFront ? "cursor-grab active:cursor-grabbing hover:border-white/20" : "pointer-events-none"
      }`}
    >
      {/* Top Header inside Card */}
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/10 bg-[#0C0C0C]/50 text-zinc-300">
          {type === "work" ? <Briefcase size={16} /> : <GraduationCap size={18} />}
        </div>
        <div className="flex flex-col items-end">
          <span className="inline-flex items-center gap-1 rounded-full border border-white/5 bg-white/[0.02] px-2.5 py-0.5 text-[9px] font-medium tracking-wider text-zinc-400 uppercase">
            <Calendar size={10} className="text-zinc-500" />
            {date}
          </span>
          {location && (
            <span className="inline-flex items-center gap-1 text-[9px] text-zinc-500 uppercase mt-1">
              <MapPin size={9} />
              {location}
            </span>
          )}
        </div>
      </div>

      {/* Main Info */}
      <div className="flex-1 flex flex-col justify-center my-4">
        <h4 className="text-sm font-semibold tracking-wider text-[#D7E2EA]/50 uppercase mb-1">
          {subtitle}
        </h4>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-4 leading-snug">
          {title}
        </h3>
        
        {/* Bullet details */}
        <ul className="space-y-2">
          {details.slice(0, 3).map((detail, index) => (
            <li
              key={index}
              className="text-[11px] sm:text-xs leading-relaxed text-[#D7E2EA]/70 flex items-start"
            >
              <span className="text-zinc-500 mr-2 shrink-0">•</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Card Footer indicator */}
      <div className="text-center text-[9px] font-semibold tracking-widest text-[#D7E2EA]/30 uppercase pt-2 border-t border-white/5">
        {isFront ? "← Swipe Left to Shuffle →" : ""}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const experiences: ExperienceItem[] = [
    {
      type: "work",
      title: "AI Automation Specialist & Web Developer",
      subtitle: "Self-Employed / Freelance",
      date: "2024 – Present",
      details: [
        "Self-taught AI automation workflows through extensive hands-on practice and real client projects.",
        "Deliver end-to-end automation solutions including workflow design, data processing, document generation, and financial reporting.",
        "Build custom web applications and landing pages for small businesses and startups.",
        "Automate business operations: financial reports, data analysis pipelines, content production, and customer communication.",
      ],
    },
    {
      type: "work",
      title: "Web Designer",
      subtitle: "Fiverr",
      date: "2022 – 2024",
      details: [
        "Designed and developed responsive websites for international clients with consistent 5-star ratings.",
        "Created custom WordPress themes, e-commerce stores, and portfolio websites.",
        "Delivered UI/UX improvements resulting in increased client conversion rates.",
      ],
    },
    {
      type: "work",
      title: "Digital Marketing Specialist",
      subtitle: "Upwork",
      date: "2021 – 2022",
      details: [
        "Managed digital marketing campaigns including SEO, social media, and paid advertising.",
        "Created content strategies and executed email marketing campaigns for diverse clients.",
        "Analyzed campaign performance data and generated actionable insights reports.",
      ],
    },
    {
      type: "education",
      title: "BS Computer Science",
      subtitle: "Hamdard University, Islamabad (HUI)",
      date: "2019 – 2023",
      location: "Islamabad, Pakistan",
      details: [
        "Focused on software engineering, database design, web development, and algorithms.",
        "Participated in hands-on projects building web applications and database systems.",
      ],
    },
    {
      type: "education",
      title: "FSc Pre-Engineering",
      subtitle: "Govt Post Graduate College",
      date: "2017 – 2019",
      location: "Nowshera Cantt, Pakistan",
      details: [
        "Completed higher secondary education focusing on Mathematics and Physics.",
      ],
    },
  ];

  // Positions corresponding to 5 items: first 3 are visible in stack, others hidden
  const [positions, setPositions] = useState([
    "front",
    "middle",
    "back",
    "hidden",
    "hidden",
  ]);

  const handleShuffle = () => {
    setPositions((prev) => {
      const next = [...prev];
      next.unshift(next.pop()!);
      return next;
    });
  };

  return (
    <section
      id="experience"
      className="relative w-full bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-24 sm:py-28 md:py-32 overflow-hidden"
    >
      {/* Dotted vignette background */}
      <div className="absolute inset-0 pointer-events-none">
        <DottedBackground
          dotColor="#1a3a4a"
          backgroundColor="transparent"
          enableVignette={true}
          vignetteColor="rgba(12,12,12,0.92)"
          enableInnerGlow={true}
          innerGlowColor="rgba(12,12,12,0.85)"
          dotSize={1.2}
          dotSpacing={14}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header Title */}
        <div className="mb-16 sm:mb-20 text-center">
          <Reveal y={40}>
            <h2
              className="hero-heading font-black uppercase tracking-tight leading-none mb-4"
              style={{ fontSize: "clamp(3rem, 10vw, 120px)" }}
            >
              Experience
            </h2>
          </Reveal>
          <Reveal delay={0.1} y={20}>
            <p
              className="font-light uppercase tracking-widest text-[#D7E2EA]/60"
              style={{ fontSize: "clamp(0.85rem, 1.4vw, 1.1rem)" }}
            >
              My professional path & educational milestones
            </p>
          </Reveal>
        </div>

        {/* Shuffling Stack Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mt-12 sm:mt-16">
          
          {/* Left Column: Text & Instructions (5 cols) */}
          <div className="lg:col-span-5 text-center lg:text-left flex flex-col justify-center items-center lg:items-start space-y-6">
            <Reveal y={20} className="w-full">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#D7E2EA]/50 mb-2">
                <span className="h-2 w-2 rounded-full bg-[#b600a8] animate-pulse" />
                Career Milestones
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                Interactive Career <br className="hidden lg:inline" /> & Education Stack
              </h3>
              <p className="text-sm sm:text-base text-[#D7E2EA]/70 mt-4 leading-relaxed max-w-md">
                Swipe or drag the top card to the left to shuffle through my professional roles and academic history.
              </p>
            </Reveal>

            {/* Drag helper animation */}
            <Reveal delay={0.2} y={20} className="hidden lg:flex items-center gap-3 text-zinc-500 text-xs tracking-wider uppercase">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 animate-pulse bg-white/5">
                ←
              </span>
              <span>Drag left to shuffle</span>
            </Reveal>
          </div>

          {/* Right Column: Shuffling Card Stack (7 cols) */}
          <div className="lg:col-span-7 flex justify-center items-center min-h-[480px] w-full relative overflow-visible">
            <div className="relative h-[450px] w-full max-w-[325px] sm:max-w-[350px]">
              {experiences.map((experience, index) => (
                <ExperienceCard
                  key={index}
                  id={index}
                  {...experience}
                  handleShuffle={handleShuffle}
                  position={positions[index]}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
