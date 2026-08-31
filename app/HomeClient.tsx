"use client";

import About from "@/components/showcase/About";
import Areas from "@/components/showcase/Areas";
import Benefits from "@/components/showcase/Benefits";
import Customers from "@/components/showcase/Customers";
import FinalCta from "@/components/showcase/FinalCta";
import Hero from "@/components/showcase/Hero";
import HowItWorks from "@/components/showcase/HowItWorks";
import Industry from "@/components/showcase/Industry";
import Intro from "@/components/showcase/Intro";
import Modules from "@/components/showcase/Modules";
import Plans from "@/components/showcase/Plans";
import ProductShowcase from "@/components/showcase/ProductShowcase";
import Statistics from "@/components/showcase/Statistics";

/**
 * The whole product story, one page:
 * hero → معرفی → امکانات → ماژول‌ها → نفت و گاز → آمار →
 * فرآیند → نمای نرم‌افزار → مزایا → پلن‌ها → مشتریان → درباره → تماس
 */
export default function HomeClient() {
  return (
    <div className="w-full overflow-x-clip">
      <Hero />
      <Intro />
      <Areas />
      <Modules />
      <Industry />
      <Statistics />
      <HowItWorks />
      <ProductShowcase />
      <Benefits />
      <Plans />
      <Customers />
      <About />
      <FinalCta />
    </div>
  );
}
