"use client";

import React from "react";
import { Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { TidalCursor } from "./ui/tidal-cursor";

export default function Contact() {
  const contactLinks = [
    {
      icon: <Mail size={22} />,
      label: "Email",
      value: "usamarehman489@gmail.com",
      href: "mailto:usamarehman489@gmail.com",
    },
    {
      icon: <MessageCircle size={22} />,
      label: "WhatsApp",
      value: "+92 313 9018404",
      href: "https://wa.me/923139018404",
    },
  ];

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen flex-grow bg-[#0C0C0C] px-5 sm:px-8 md:px-10 pt-24 sm:pt-28 md:pt-32 pb-28 sm:pb-36 overflow-hidden"
    >
      {/* Dynamic Scrim Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      {/* Tidal ripple cursor effect */}
      <TidalCursor
        rippleColor="rgba(0, 255, 255, 0.35)"
        speed={1.8}
        fadeRate={0.008}
        lineWidth={1.5}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Text */}
        <Reveal y={40}>
          <h2
            className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-4"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
          >
            Get In Touch
          </h2>
        </Reveal>

        <Reveal delay={0.1} y={20}>
          <p
            className="text-center font-light uppercase tracking-widest text-[#D7E2EA]/60 mb-12 sm:mb-16 md:mb-20"
            style={{ fontSize: "clamp(0.85rem, 1.4vw, 1.1rem)" }}
          >
            Pick whichever channel suits you
          </p>
        </Reveal>

        {/* Contact Cards Grid */}
        <div className="mx-auto grid max-w-3xl grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {contactLinks.map((link, idx) => (
            <Reveal key={link.label} delay={idx * 0.1} y={30} className="h-full">
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-full flex-col justify-between gap-8 sm:gap-10 rounded-[28px] sm:rounded-[32px] border-2 border-[#D7E2EA]/20 bg-[#141418] p-6 sm:p-7 md:p-8 transition-all duration-300 hover:border-[#D7E2EA]/60 hover:bg-[#1a1a20] hover:-translate-y-1"
              >
                {/* Top Part */}
                <div className="flex items-start justify-between">
                  <div className="rounded-full border border-[#D7E2EA]/20 p-3 sm:p-3.5 transition-colors duration-300 group-hover:border-[#D7E2EA]/50 text-[#D7E2EA]">
                    {link.icon}
                  </div>
                  <ArrowUpRight
                    size={22}
                    className="text-[#D7E2EA]/40 transition-all duration-300 group-hover:text-[#D7E2EA] group-hover:rotate-12"
                  />
                </div>

                {/* Bottom Part */}
                <div className="flex flex-col gap-2 sm:gap-3">
                  <span
                    className="font-light uppercase tracking-widest text-[#D7E2EA]/50"
                    style={{ fontSize: "clamp(0.7rem, 1.1vw, 0.9rem)" }}
                  >
                    {link.label}
                  </span>
                  <span
                    className="font-medium text-[#D7E2EA] break-all"
                    style={{ fontSize: "clamp(1rem, 1.8vw, 1.4rem)" }}
                  >
                    {link.value}
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {/* Footer info */}
        <Reveal delay={0.4} y={15}>
          <div className="mx-auto mt-20 sm:mt-24 md:mt-28 flex max-w-5xl flex-col items-center gap-3 border-t border-[#D7E2EA]/10 pt-8 text-center sm:flex-row sm:justify-between">
            <span
              className="font-light uppercase tracking-widest text-[#D7E2EA]/50"
              style={{ fontSize: "clamp(0.7rem, 1.1vw, 0.9rem)" }}
            >
              © 2026 Usama Rehman
            </span>
            <span
              className="font-light uppercase tracking-widest text-[#D7E2EA]/50"
              style={{ fontSize: "clamp(0.7rem, 1.1vw, 0.9rem)" }}
            >
              Designed & built with passion
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
