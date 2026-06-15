# Usama Rehman — Developer & Designer Portfolio

A premium, highly interactive portfolio website designed to showcase development experience, projects, skills, and design philosophies. Built with modern, cutting-edge frontend technologies.

Live Demo: _coming soon_

---

## 🚀 Tech Stack

- **Framework**: [Next.js (App Router)](https://nextjs.org)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) (Native CSS-first design tokens)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (Fluid physics springs, staggered entrances, custom cursor, magnetic elements)
- **Icons**: [Lucide React](https://lucide.dev)
- **Typography**: [Kanit (Google Fonts)](https://fonts.google.com/specimen/Kanit)

---

## ✨ Features

1. **Cinematic Hero**: Autoplay, loop, and muted background video overlayed with a dark scrim blur and staggered typography entrance animations.
2. **Interactive Bento Grid**: High-contrast grid card system (`grid-cols-1 md:grid-cols-3`) displaying:
   - About & bio content with highlight metrics.
   - Interactive typing terminal emulator.
   - Core technical stack grouping.
   - Project cards rendering mock visual HTML/CSS interfaces.
   - Career experience vertical timeline stepper.
   - Social link connectors.
3. **Custom Cursor**: Active tracking pointer that reacts dynamically to links, buttons, and clickable items.
4. **macOS Navigation Dock**: MacOS-style floating navigation menu at the bottom that magnifies icons smoothly based on mouse proximity.
5. **Magnetic Interaction**: Magnetic wrapper utility enabling clickable triggers to attract towards the cursor on hover.

---

## 🛠️ Local Development

### 1. Prerequisites
Make sure you have Node.js (v18.x or higher) and npm installed.

### 2. Installation
Navigate to the project root and install the dependencies:
```bash
npm install
```

### 3. Run Dev Server
Launch the local Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build Production
Verify production builds and assets compilation:
```bash
npm run build
```

---

## ☁️ Vercel Deployment Guide

To deploy this Next.js app to Vercel, follow these steps:

### Option A: Using Vercel Git Integration (Recommended)
1. Push your portfolio repository to GitHub, GitLab, or Bitbucket.
2. Log in to [Vercel](https://vercel.com).
3. Click **Add New** > **Project**.
4. Import your portfolio repository.
5. Vercel will automatically configure the **Next.js** framework preset and build settings:
   - **Build Command**: `next build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
6. Click **Deploy**. Vercel will build and host your portfolio on a secure, global edge network in seconds.

### Option B: Using Vercel CLI
If you prefer deploying directly from your terminal:
1. Install the Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```
2. Initialize deployment from your project root:
   ```bash
   vercel
   ```
3. Follow the prompts to log in, link the project, and create a preview deployment.
4. Promote the deployment to production:
   ```bash
   vercel --prod
   ```
