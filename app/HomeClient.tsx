"use client";

import Hero from "@/components/showcase/Hero";
import Intro from "@/components/showcase/Intro";
import Modules from "@/components/showcase/Modules";
import Capabilities from "@/components/showcase/Capabilities";
import Process from "@/components/showcase/Process";
import DashboardShowcase from "@/components/showcase/DashboardShowcase";
import Comparison from "@/components/showcase/Comparison";
import Statistics from "@/components/showcase/Statistics";
import Plans from "@/components/showcase/Plans";
import Audience from "@/components/showcase/Audience";
import About from "@/components/showcase/About";
import ContactCta from "@/components/showcase/ContactCta";

export default function HomeClient() {
  return (
    <>
      <Hero />
      <Intro />
      <Modules />
      <Capabilities />
      <Process />
      <DashboardShowcase />
      <Comparison />
      <Statistics />
      <Plans />
      <Audience />
      <About />
      <ContactCta />
    </>
  );
}
