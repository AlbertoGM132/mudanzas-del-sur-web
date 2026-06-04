import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "./components/HeroSection";
import AboutStats from "./components/AboutStats";
import ServicesSection from "./components/ServicesSection";
import TrustSection from "./components/TrustSection";
import CoverageSection from "./components/CoverageSection";
import TestimonialsSection from "./components/TestimonialsSection";
import CtaSection from "./components/CtaSection";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutStats />
      <ServicesSection />
      <TrustSection />
      <CoverageSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
