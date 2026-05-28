import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-kanit",
});

export const metadata: Metadata = {
  title: "Usama Rehman — Developer & Designer",
  description: "Usama Rehman — Developer & Designer. UI/UX, web design, front-end development, and GenAI integration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${kanit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans bg-[#0C0C0C] text-zinc-100 selection:bg-zinc-800 selection:text-white">
        {children}
      </body>
    </html>
  );
}
