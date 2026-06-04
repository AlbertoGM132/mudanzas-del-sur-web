"use client";

import React, { useEffect, useRef } from "react";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

export default function HeroSection() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [
      { el: badgeRef?.current, delay: 100 },
      { el: headlineRef?.current, delay: 250 },
      { el: subRef?.current, delay: 420 },
      { el: ctaRef?.current, delay: 580 },
    ];
    elements?.forEach(({ el, delay }) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      setTimeout(() => {
        if (!el) return;
        el.style.transition = "opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, delay);
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-secondary">
      <div className="absolute inset-0 z-0">
        <AppImage
          src="/assets/images/hero-truck.webp"
          alt="Camión de mudanzas de Mudanzas del Sur en Huelva"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 hero-img-overlay" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(17,24,32,0.78) 0%, rgba(17,24,32,0.55) 45%, rgba(17,24,32,0.1) 80%, transparent 100%)" }} />
      </div>

      <div className="container-main relative z-10 pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-2xl">
          <div ref={badgeRef} className="mb-6">
            <span className="discount-badge pulse-anim">
              <Icon name="TagIcon" size={13} variant="solid" />
              15% DESCUENTO · PRIMERA MUDANZA
            </span>
          </div>

          <div ref={headlineRef}>
            <h1 className="hero-headline text-white mb-4">
              Cambia de casa,{" "}
              <span className="block italic" style={{ color: "#F5C842" }}>no de humor.</span>
            </h1>
          </div>

          <div ref={subRef} className="mb-8">
            <p className="hero-sub text-white/80 max-w-md leading-relaxed">
              Tu traslado fácil, rápido y sin estrés.{" "}
              <span className="text-white font-bold">¡Nosotros lo movemos todo! 🚛💨</span>
            </p>
            <p className="mt-2 text-white/60 text-sm font-medium font-heading uppercase tracking-widest">Huelva · Toda la Península</p>
          </div>

          <div ref={ctaRef} className="flex flex-wrap gap-3 items-center">
            <a href="tel:+34659715271" className="btn-primary text-base py-4 px-7 shadow-orange">
              <Icon name="PhoneIcon" size={18} variant="solid" />
              ¡LLAMA YA! · HUELVA
            </a>
            <a href="/contacto" className="btn-white text-base py-4 px-7">
              Pide presupuesto gratis
              <Icon name="ArrowRightIcon" size={16} />
            </a>
          </div>

          <div className="mt-10 flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3]?.map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 overflow-hidden">
                    <AppImage src={`https://i.pravatar.cc/40?u=mudanzas${i}`} alt={`Cliente satisfecho ${i}`} width={32} height={32} className="object-cover w-full h-full grayscale" />
                  </div>
                ))}
              </div>
              <div>
                <div className="stars text-sm">★★★★★</div>
                <p className="text-white/60 text-xs font-body">+500 clientes felices</p>
              </div>
            </div>
            <div className="h-8 w-px bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-2 text-white/70 text-sm font-body">
              <Icon name="ShieldCheckIcon" size={18} className="text-accent" />
              100% Garantizado
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm font-body">
              <Icon name="CurrencyEuroIcon" size={18} className="text-accent" />
              Presupuesto Gratis
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs font-heading uppercase tracking-widest">Descubrir</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
