"use client";

import Hero from "@/components/showcase/Hero";
import Intro from "@/components/showcase/Intro";
import Features from "@/components/showcase/Features";
import Modules from "@/components/showcase/Modules";
import Capabilities from "@/components/showcase/Capabilities";
import Statistics from "@/components/showcase/Statistics";
import HowItWorks from "@/components/showcase/HowItWorks";
import DashboardShowcase from "@/components/showcase/DashboardShowcase";
import Benefits from "@/components/showcase/Benefits";
import Plans from "@/components/showcase/Plans";
import Trust from "@/components/showcase/Trust";
import AboutNovaTech from "@/components/showcase/AboutNovaTech";
import ContactCta from "@/components/showcase/ContactCta";

export default function HomeClient() {
  return (
    <div className="w-full min-h-screen bg-slate-950 text-white overflow-x-clip selection:bg-primary selection:text-slate-950">
      {/* 1. Cinematic Video Hero */}
      <Hero />

      {/* 2. Software Introduction & Core Problem-Solution */}
      <Intro />

      {/* 3. Key Oil & Gas Features */}
      <Features />

      {/* 4. Interactive 10 Software Modules */}
      <Modules />

      {/* 5. Energy & Petroleum Specific Capabilities */}
      <Capabilities />

      {/* 6. Scroll-Triggered Numbers & Statistics */}
      <Statistics />

      {/* 7. Operational How It Works Progression */}
      <HowItWorks />

      {/* 8. UI Screen Showcase & Dashboard Visuals */}
      <DashboardShowcase />

      {/* 9. Strategic Business Benefits */}
      <Benefits />

      {/* 10. Plans & Deployment Tiers (Adapted from Pricing Tabs) */}
      <Plans />

      {/* 11. Customer Trust & Energy Sector Credibility */}
      <Trust />

      {/* 12. About NovaTech Soft & Engineering Base */}
      <AboutNovaTech />

      {/* 13. Final Conversion Contact & Lead Action */}
      <ContactCta />
    </div>
  );
}
