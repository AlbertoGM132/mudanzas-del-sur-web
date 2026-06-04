"use client";

import React, { useEffect, useRef } from "react";
import Icon from "@/components/ui/AppIcon";

export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll(".reveal-hidden");
    if (!items) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("revealed"); });
    }, { threshold: 0.2 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="contacto" className="section-py bg-background">
      <div className="container-main">
        <div className="phone-bar reveal-hidden">
          <div className="space-y-3 flex-1 min-w-0">
            <span className="block" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>
              ¿Listo para mudarte?
            </span>
            <h2 className="text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", lineHeight: 1.1, letterSpacing: "-0.025em" }}>
              Tu mudanza perfecta empieza con una llamada
            </h2>
            <p className="text-white/70 text-sm font-body">Presupuesto gratuito · Sin compromiso · 15% descuento primera vez</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a href="tel:+34659715271" className="btn-white text-base py-4 px-7">
              <Icon name="PhoneIcon" size={18} variant="solid" />
              +34 659 71 52 71
            </a>
            <a href="mailto:contactomudanzasdelasur@gmail.com" className="inline-flex items-center gap-2 text-white/80 hover:text-white border border-white/30 hover:border-white/60 rounded-full px-6 py-4 text-sm font-heading font-700 transition-all" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              <Icon name="EnvelopeIcon" size={16} />
              Enviar email
            </a>
          </div>
        </div>

        <div className="mt-8 grid sm:grid-cols-3 gap-4 reveal-hidden delay-2">
          {[
            { icon: "PhoneIcon", label: "Llámanos", value: "+34 659 71 52 71", href: "tel:+34659715271", variant: "solid" as const },
            { icon: "EnvelopeIcon", label: "Escríbenos", value: "contactomudanzasdelasur@gmail.com", href: "mailto:contactomudanzasdelasur@gmail.com", variant: "outline" as const },
            { icon: "MapPinIcon", label: "Zona principal", value: "Huelva · Toda España", href: "#cobertura", variant: "outline" as const },
          ].map((item) => (
            <a key={item.label} href={item.href} className="flex items-center gap-4 bg-card-bg rounded-2xl p-5 border border-border shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name={item.icon as "PhoneIcon"} size={20} variant={item.variant} className="text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-muted text-xs font-heading font-600 uppercase tracking-wider mb-0.5">{item.label}</p>
                <p className="text-foreground font-semibold text-sm font-body truncate">{item.value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
