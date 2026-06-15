"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download } from "lucide-react";
import Reveal from "./Reveal";

interface CharacterProps {
  char: string;
  index: number;
  total: number;
  progress: any;
}

const CharacterReveal = ({ char, index, total, progress }: CharacterProps) => {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-20 select-none">{char}</span>
      <motion.span
        style={{ opacity }}
        className="absolute left-0 top-0 w-full text-white"
        aria-hidden="true"
      >
        {char}
      </motion.span>
    </span>
  );
};

interface TextRevealProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const TextReveal = ({ text, className = "", style = {} }: TextRevealProps) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const words = text.split(" ");
  const totalChars = text.length;
  let charAccumulator = 0;

  return (
    <p ref={containerRef} className={className} style={style}>
      {words.map((word, wordIdx) => {
        const chars = Array.from(word);
        const startIndex = charAccumulator;
        charAccumulator += chars.length + 1; // +1 for the space

        return (
          <span
            key={wordIdx}
            className="inline-block whitespace-nowrap"
          >
            {chars.map((char, charIdx) => (
              <CharacterReveal
                key={charIdx}
                char={char}
                index={startIndex + charIdx}
                total={totalChars}
                progress={scrollYProgress}
              />
            ))}
            {wordIdx < words.length - 1 && "\u00A0"}
          </span>
        );
      })}
    </p>
  );
};

export default function About() {
  const bioText =
    "I'm a Computer Science graduate from HUI, currently focusing on building high-performance web applications and immersive user interfaces. I specialize in front-end architecture, modern UI/UX design, and AI integration — transforming complex problems into clean, high-fidelity digital solutions. Let's build something incredible together!";

  const skillsCategories = [
    { label: "Programming", items: ["JavaScript", "Python", "HTML5", "CSS3", "SQL", "React", "Node.js", "PHP"] },
    { label: "AI & Automation", items: ["Prompt Engineering", "Workflow Builders", "Automation Platforms", "API Integrations"] },
    { label: "Design", items: ["Figma", "Canva", "Adobe Photoshop", "Responsive Web Design"] },
    { label: "Tools & Platforms", items: ["WordPress", "Shopify", "Notion", "Trello", "Slack", "Asana"] },
  ];

  const floatingIcons = [
    {
      src: "/about-moon.png",
      className: "pointer-events-none absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[60px] sm:w-[160px] md:w-[210px]",
      delay: 0.1,
      x: -80,
      floatOffset: 8,
      duration: 4,
    },
    {
      src: "/about-p59.png",
      className: "pointer-events-none absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[55px] sm:w-[140px] md:w-[180px]",
      delay: 0.25,
      x: -80,
      floatOffset: -6,
      duration: 4.5,
    },
    {
      src: "/about-lego.png",
      className: "pointer-events-none absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[60px] sm:w-[160px] md:w-[210px]",
      delay: 0.15,
      x: 80,
      floatOffset: -8,
      duration: 5,
    },
    {
      src: "/about-group.png",
      className: "pointer-events-none absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[65px] sm:w-[170px] md:w-[220px]",
      delay: 0.3,
      x: 80,
      floatOffset: 6,
      duration: 3.8,
    },
  ];

  return (
    <section
      id="about"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C]"
    >
      {/* Floating Figma Graphics */}
      {floatingIcons.map((icon, index) => (
        <Reveal
          key={index}
          delay={icon.delay}
          x={icon.x}
          y={0}
          duration={0.9}
          className={icon.className}
        >
          <motion.img
            src={icon.src}
            alt=""
            className="w-full h-auto opacity-20 sm:opacity-100"
            loading="lazy"
            draggable={false}
            animate={{ y: [0, icon.floatOffset, 0] }}
            transition={{
              repeat: Infinity,
              duration: icon.duration,
              ease: "easeInOut",
            }}
          />
        </Reveal>
      ))}

      {/* Main Centered Content Container */}
      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16 text-center">
        {/* Title */}
        <Reveal delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            About me
          </h2>
        </Reveal>

        {/* Text and Skill Categories */}
        <div className="flex flex-col items-center gap-12 sm:gap-16 md:gap-20">
          {/* Scroll reveal Bio text */}
          <TextReveal
            text={bioText}
            className="font-medium leading-relaxed text-[#D7E2EA] max-w-[560px]"
            style={{ fontSize: "clamp(1.1rem, 2vw, 1.35rem)" }}
          />

          {/* Skill Lists */}
          <div id="skills" className="w-full max-w-3xl scroll-mt-24">
            <Reveal delay={0.15}>
              <div className="flex flex-col gap-5 sm:gap-6 text-left">
                {skillsCategories.map((category) => (
                  <div
                    key={category.label}
                    className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5"
                  >
                    <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/40 sm:w-44 sm:shrink-0 sm:text-right">
                      {category.label}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.03] px-3 py-1 text-sm text-[#D7E2EA]/80 hover:border-[#D7E2EA]/40 hover:text-[#D7E2EA] transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* CTA Buttons: Contact + Download CV */}
          <Reveal delay={0.25}>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-white whitespace-nowrap transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                style={{
                  background:
                    "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
                  boxShadow:
                    "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
                  outline: "2px solid #FFFFFF",
                  outlineOffset: "-3px",
                }}
              >
                Contact Me
              </a>
              <a
                href="/Usama_Rehman_Resume.docx"
                download
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#D7E2EA]/30 px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-[#D7E2EA] whitespace-nowrap transition-colors duration-200 hover:border-[#D7E2EA]/60 hover:bg-[#D7E2EA]/10 cursor-pointer"
              >
                Download CV <Download size={16} />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
