"use client";

import React from "react";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";
import Reveal from "./Reveal";
import { DottedBackground } from "./ui/dotted-vignette-background";

interface TimelineItemProps {
  type: "work" | "education";
  title: string;
  subtitle: string;
  date: string;
  location?: string;
  details: string[];
  delay?: number;
}

function TimelineCard({
  type,
  title,
  subtitle,
  date,
  location,
  details,
  delay = 0,
}: TimelineItemProps) {
  return (
    <Reveal delay={delay} y={40} className="w-full">
      <div className="group relative ml-8 md:ml-12 rounded-[24px] sm:rounded-[28px] border border-white/10 bg-[#121215] p-6 sm:p-7 md:p-8 transition-all duration-300 hover:border-white/20 hover:bg-[#16161b] hover:-translate-y-1 shadow-md hover:shadow-xl">
        {/* Timeline Bullet Node */}
        <div className="absolute -left-[52px] md:-left-[72px] top-6 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/10 bg-[#0C0C0C] text-zinc-400 group-hover:border-white/30 group-hover:text-white transition-all duration-300">
          {type === "work" ? <Briefcase size={18} /> : <GraduationCap size={20} />}
        </div>

        {/* Date Tag */}
        <div className="mb-3 flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#D7E2EA]/50">
          <span className="flex items-center gap-1.5 rounded-full border border-white/5 bg-white/[0.02] px-3 py-1">
            <Calendar size={12} className="text-zinc-500" />
            {date}
          </span>
          {location && (
            <span className="flex items-center gap-1.5 rounded-full border border-white/5 bg-white/[0.02] px-3 py-1">
              <MapPin size={12} className="text-zinc-500" />
              {location}
            </span>
          )}
        </div>

        {/* Headings */}
        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-white transition-colors">
          {title}
        </h3>
        <h4 className="mb-4 text-xs sm:text-sm font-medium tracking-wide text-zinc-400 uppercase">
          {subtitle}
        </h4>

        {/* Bullet details */}
        <ul className="space-y-2">
          {details.map((detail, index) => (
            <li
              key={index}
              className="text-xs sm:text-sm leading-relaxed text-[#D7E2EA]/70 before:content-['•'] before:mr-2 before:text-zinc-500"
            >
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export default function Experience() {
  const experiences: TimelineItemProps[] = [
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
      details: ["Completed higher secondary education focusing on Mathematics and Physics."],
    },
  ];

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
      <div className="relative z-10 max-w-4xl mx-auto">
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

        {/* Timeline Flow */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-6 md:ml-8 space-y-8 sm:space-y-12">
          {/* Vertical line glow overlay */}
          <div className="absolute top-0 bottom-0 left-[-1.5px] w-[3px] bg-gradient-to-b from-[#b600a8]/30 via-[#7621b0]/20 to-transparent pointer-events-none" />

          {experiences.map((item, index) => (
            <TimelineCard
              key={index}
              type={item.type}
              title={item.title}
              subtitle={item.subtitle}
              date={item.date}
              location={item.location}
              details={item.details}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
