"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

interface Project {
  number: string;
  category: string;
  name: string;
  liveUrl: string;
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const LiveProjectButton = ({
  label = "Live Project",
  href = "#",
  className = "",
}: {
  label?: string;
  href?: string;
  className?: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest text-[#D7E2EA] whitespace-nowrap transition-colors duration-200 hover:bg-[#D7E2EA]/10 ${className}`}
  >
    {label} <ArrowUpRight className="ml-1.5" size={16} />
  </a>
);

const ProjectCard = ({ project, index, total }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Track scroll position of the card to animate its scale when stacking
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="sticky h-auto sm:h-[85vh] w-full"
      style={{
        top: `${96 + index * 28}px`, // Stack offset top positions
      }}
    >
      <motion.article
        style={{ scale }}
        className="origin-top mx-auto h-auto sm:h-full w-full flex flex-col gap-4 sm:gap-6 md:gap-8 rounded-[28px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8"
      >
        {/* Card Header Info */}
        <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-4 sm:gap-6">
          <div className="flex flex-row items-start gap-3 sm:gap-6 md:gap-10 min-w-0 w-full">
            {/* Outline Index Number */}
            <div
              className="shrink-0 font-black text-[#D7E2EA] leading-none"
              style={{ fontSize: "clamp(2.5rem, 10vw, 140px)" }}
            >
              {project.number}
            </div>

            {/* Category and Title */}
            <div className="flex flex-col gap-1 sm:gap-3 pt-1 sm:pt-3 md:pt-4 min-w-0 flex-1">
              <span
                className="font-light uppercase tracking-widest text-[#D7E2EA]/60"
                style={{ fontSize: "clamp(0.65rem, 1.2vw, 1rem)" }}
              >
                {project.category}
              </span>
              <h3
                className="font-medium uppercase text-[#D7E2EA] leading-tight"
                style={{ fontSize: "clamp(1.1rem, 2.2vw, 2.1rem)" }}
              >
                {project.name}
              </h3>
            </div>
          </div>

          {/* Action Link Button */}
          <div className="shrink-0 self-start sm:self-auto pt-1 sm:pt-2 md:pt-3 w-full sm:w-auto">
            <LiveProjectButton href={project.liveUrl} className="w-full sm:w-auto" />
          </div>
        </div>

        {/* Asymmetric Image Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-[40%_60%] gap-3 sm:gap-4 md:gap-5 flex-1 min-h-0">
          {/* Column 1 (40% width): two stacked previews (hidden on mobile to prevent overflow) */}
          <div className="hidden sm:flex flex-col gap-3 sm:gap-4 md:gap-5 min-h-0">
            <div
              className="overflow-hidden rounded-[20px] sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: "clamp(130px, 16vw, 230px)" }}
            >
              <img
                src={project.col1Image1}
                alt={`${project.name} preview 1`}
                className="h-full w-full object-cover"
                loading="lazy"
                draggable={false}
              />
            </div>
            <div
              className="overflow-hidden rounded-[20px] sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: "clamp(160px, 22vw, 340px)" }}
            >
              <img
                src={project.col1Image2}
                alt={`${project.name} preview 2`}
                className="h-full w-full object-cover"
                loading="lazy"
                draggable={false}
              />
            </div>
          </div>

          {/* Column 2 (60% width): one tall preview (takes 100% width on mobile) */}
          <div className="overflow-hidden rounded-[20px] sm:rounded-[50px] md:rounded-[60px] min-h-[220px] sm:min-h-0 flex-1 h-[220px] sm:h-auto">
            <img
              src={project.col2Image}
              alt={`${project.name} preview 3`}
              className="h-full w-full object-cover"
              loading="lazy"
              draggable={false}
            />
          </div>
        </div>
      </motion.article>
    </div>
  );
};

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  const projectsData: Project[] = [
    {
      number: "01",
      category: "Commercial · Fintech",
      name: "GainLab",
      liveUrl: "https://gainlab.ltd",
      col1Image1: "/gainlab1.png",
      col1Image2: "/gainlab2.png",
      col2Image: "/gainlab.png",
    },
    {
      number: "02",
      category: "Personal",
      name: "Forge",
      liveUrl: "https://forge-pink-seven.vercel.app/",
      col1Image1: "/Forge.png",
      col1Image2: "/Forge1.png",
      col2Image: "/Forge2.png",
    },
    {
      number: "03",
      category: "Personal",
      name: "LawLab",
      liveUrl: "https://lawlab-self.vercel.app",
      col1Image1: "/lawlab.png",
      col1Image2: "/lawlab1.png",
      col2Image: "/lawlab2.png",
    },
    {
      number: "04",
      category: "Personal · GenAI",
      name: "ResumeIQ",
      liveUrl: "https://resumeiq-harsh.vercel.app/",
      col1Image1: "/resumeiq-hero.png",
      col1Image2: "/resumeiq-feedback.png",
      col2Image: "/resumeiq-score.png",
    },
    {
      number: "05",
      category: "Personal · Design",
      name: "Notch",
      liveUrl: "https://notch-zeta.vercel.app/",
      col1Image1: "/notch-hero.png",
      col1Image2: "/notch-pricing.png",
      col2Image: "/notch-mockup.png",
    },
  ];

  return (
    <section
      id="projects"
      className="relative -mt-10 sm:-mt-12 md:-mt-14 w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[#0C0C0C] px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24"
    >
      {/* Title */}
      <Reveal y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Projects
        </h2>
      </Reveal>

      {/* Cards List container */}
      <div ref={containerRef} className="mx-auto max-w-5xl space-y-10">
        {projectsData.map((project, idx) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={idx}
            total={projectsData.length}
            containerRef={containerRef}
          />
        ))}
      </div>
    </section>
  );
}
