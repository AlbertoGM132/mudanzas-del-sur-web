"use client";

import React, { useEffect, useRef } from "react";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

const testimonials = [
  {
    quote: "Excelente servicio. El equipo de Mudanzas del Sur hizo que nuestra mudanza en Huelva fuera rápida y sin ningún problema. ¡Repetiría sin dudarlo!",
    author: "Juan Pérez", role: "Cliente · Huelva",
    avatar: "https://images.unsplash.com/photo-1542151466-61cc769ac77b?auto=format&fit=crop&w=48&h=48",
    avatarAlt: "Retrato de Juan Pérez, cliente de Mudanzas del Sur", stars: 5,
  },
  {
    quote: "Mudanzas del Sur superó nuestras expectativas. El trabajo fue impecable y el trato muy profesional. Gestionaron todo sin que tuviéramos que preocuparnos por nada.",
    author: "Ana López", role: "Cliente · Sevilla",
    avatar: "https://images.unsplash.com/photo-1617100797500-1b1dc61652a6?auto=format&fit=crop&w=48&h=48",
    avatarAlt: "Retrato de Ana López, cliente satisfecha de Mudanzas del Sur", stars: 5,
  },
  {
    quote: "Me sorprendió lo organizados que son. Llegaron puntual, embalaron todo con cuidado y terminaron antes de lo previsto. El precio fue muy justo para el servicio que dieron.",
    author: "Carlos Romero", role: "Cliente · Cádiz",
    avatar: "https://i.pravatar.cc/96?u=carlos_romero",
    avatarAlt: "Retrato de Carlos Romero, cliente de Mudanzas del Sur en Cádiz", stars: 5,
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = sectionRef?.current?.querySelectorAll(".reveal-hidden");
    if (!items) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("revealed"); });
    }, { threshold: 0.12 });
    items?.forEach((item) => observer?.observe(item));
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-py relative overflow-hidden" style={{ background: "#111820" }}>
      <div className="absolute inset-0 z-0 opacity-10">
        <AppImage src="/assets/images/hero-truck.webp" alt="Fondo decorativo" fill className="object-cover object-center" sizes="100vw" />
      </div>
      <div className="absolute inset-0 z-[1]" style={{ background: "linear-gradient(135deg, rgba(17,24,32,0.95) 0%, rgba(28,43,58,0.9) 100%)" }} />

      <div className="container-main relative z-10">
        <div className="text-center max-w-xl mx-auto mb-14 reveal-hidden">
          <span className="block mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#F5C842" }}>
            Opiniones reales
          </span>
          <h2 className="section-title text-white">
            Lo que dicen <span style={{ color: "#E8500A", fontStyle: "italic" }}>nuestros clientes</span>
          </h2>
          <p className="text-white/50 mt-4 text-base leading-relaxed font-body">Más de 500 familias y empresas ya han confiado en nosotros.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials?.map((t, idx) => (
            <div key={t?.author} className={`testimonial-card reveal-hidden delay-${idx + 1}`}>
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t?.stars })?.map((_, i) => (
                  <Icon key={i} name="StarIcon" size={16} variant="solid" className="text-accent" />
                ))}
              </div>
              <p className="text-white/80 text-sm leading-relaxed font-body mb-6 flex-1 italic">&ldquo;{t?.quote}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/40 flex-shrink-0">
                  <AppImage src={t?.avatar} alt={t?.avatarAlt} width={40} height={40} className="object-cover w-full h-full" />
                </div>
                <div>
                  <p className="text-white font-heading font-700 text-sm">{t?.author}</p>
                  <p className="text-white/40 text-xs font-body">{t?.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 reveal-hidden delay-4">
          <div className="flex items-center gap-2 text-white/60 text-sm font-body">
            <Icon name="ShieldCheckIcon" size={18} className="text-primary" />
            Reseñas verificadas
          </div>
          <div className="w-px h-5 bg-white/20 hidden sm:block" />
          <div className="flex items-center gap-2 text-white/60 text-sm font-body">
            <Icon name="StarIcon" size={18} variant="solid" className="text-accent" />
            Valoración media 5/5
          </div>
          <div className="w-px h-5 bg-white/20 hidden sm:block" />
          <div className="flex items-center gap-2 text-white/60 text-sm font-body">
            <Icon name="UserGroupIcon" size={18} className="text-primary" />
            +500 clientes satisfechos
          </div>
        </div>
      </div>
    </section>
  );
}
