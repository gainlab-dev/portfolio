"use client";

import React from "react";

// Types
export interface GlassEffectProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  target?: string;
}

export interface DockIcon {
  src: string;
  alt: string;
  onClick?: () => void;
}

// Glass Effect Wrapper Component
export const GlassEffect: React.FC<GlassEffectProps> = ({
  children,
  className = "",
  style = {},
  href,
  target = "_blank",
}) => {
  const glassStyle: React.CSSProperties = {
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    filter: "url(#glass-distortion)",
    ...style,
  };

  const combinedClassName = `relative overflow-hidden border border-white/10 bg-gradient-to-tr from-white/[0.06] to-white/[0.12] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] transition-all ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        className={combinedClassName}
        style={glassStyle}
      >
        {/* Specular highlighting layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        {children}
      </a>
    );
  }

  return (
    <div className={combinedClassName} style={glassStyle}>
      {/* Specular highlighting layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      {children}
    </div>
  );
};

// Glass Refraction SVG Filter Component
export const GlassFilter: React.FC = () => {
  return (
    <svg className="pointer-events-none absolute -left-full -top-full h-0 w-0" aria-hidden="true">
      <defs>
        <filter id="glass-distortion">
          {/* Generate organic turbulence texture */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015 0.015"
            numOctaves="3"
            result="noise"
            seed="1"
          />
          {/* Map source pixels based on noise texture channels */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
};
