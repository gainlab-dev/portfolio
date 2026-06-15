import type { Metadata, Viewport } from "next";
import { Kanit } from "next/font/google";
import "./tw-animate.css";
import "./globals.css";

const kanit = Kanit({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-kanit",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// TODO: replace with your live domain once the portfolio is deployed.
// Used as the base for canonical + Open Graph/Twitter image URLs.
const siteUrl = "https://usamarehman.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Usama Rehman — Developer & Designer",
  description:
    "Usama Rehman — Developer & Designer. UI/UX, front-end & full-stack web development, and GenAI integration.",
  keywords: [
    "Usama Rehman",
    "Developer",
    "Designer",
    "Front-end Developer",
    "Full-Stack Developer",
    "UI/UX",
    "GenAI",
    "React",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Usama Rehman" }],
  creator: "Usama Rehman",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Usama Rehman — Portfolio",
    title: "Usama Rehman — Developer & Designer",
    description:
      "Developer, designer & GenAI integration — building high-performance web apps and immersive interfaces.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Usama Rehman — Developer & Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Usama Rehman — Developer & Designer",
    description:
      "Developer, designer & GenAI integration — building high-performance web apps and immersive interfaces.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${kanit.variable} h-full antialiased overflow-x-hidden`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans bg-[#0C0C0C] text-zinc-100 selection:bg-zinc-800 selection:text-white">
        {children}
      </body>
    </html>
  );
}
