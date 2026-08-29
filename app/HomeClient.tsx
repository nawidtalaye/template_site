"use client";

import Hero from "@/components/showcase/Hero";
import Intro from "@/components/showcase/Intro";
import Features from "@/components/showcase/Features";
import Modules from "@/components/showcase/Modules";
import HomeServicesScroll from "@/components/showcase/HomeServicesScroll";
import Capabilities from "@/components/showcase/Capabilities";
import Statistics from "@/components/showcase/Statistics";
import HowItWorks from "@/components/showcase/HowItWorks";
import DashboardShowcase from "@/components/showcase/DashboardShowcase";
import Benefits from "@/components/showcase/Benefits";
import Plans from "@/components/showcase/Plans";
import Trust from "@/components/showcase/Trust";
import AboutNovaTech from "@/components/showcase/AboutNovaTech";
import TeamScroll from "@/components/showcase/TeamScroll";
import MarqueeBanner from "@/components/showcase/MarqueeBanner";
import StartReadySection from "@/components/showcase/StartReadySection";
import ContactCta from "@/components/showcase/ContactCta";

export default function HomeClient() {
  return (
    <div className="w-full min-h-screen bg-white text-slate-900 overflow-x-clip selection:bg-[#54dcc6]/20 selection:text-slate-900">
      {/* 1. Hero with refinery video background + phone form */}
      <Hero />

      {/* 2. Intro سامانه */}
      <Intro />

      {/* 3. Features فیچرها */}
      <Features />

      {/* 4. Modules 10 with motion showcase */}
      <Modules />

      {/* 5. Sticky deck cards HomeServicesScroll */}
      <HomeServicesScroll />

      {/* 6. Oil & Gas Capabilities */}
      <Capabilities />

      {/* 7. Statistics with counter animation */}
      <Statistics />

      {/* 8. 5-stage process */}
      <HowItWorks />

      {/* 9. Dashboard tabs preview */}
      <DashboardShowcase />

      {/* 10. Benefits مزایا */}
      <Benefits />

      {/* 11. Plans with balloon graphics */}
      <Plans />

      {/* 12. Customers */}
      <Trust />

      {/* 13. About NovaTech */}
      <AboutNovaTech />

      {/* 14. Team scroll */}
      <TeamScroll />

      {/* 15. Moving banner */}
      <MarqueeBanner />

      {/* 16. Moving circles contact StartReadySection */}
      <StartReadySection />

      {/* 17. Footer contact form */}
      <ContactCta />
    </div>
  );
}
