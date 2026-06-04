"use client";

import React, { useEffect, useRef } from "react";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

const services = [
  {
    id: "residencial", tag: "Residencial", title: "Mudanzas Residenciales",
    description: "Realizamos mudanzas residenciales con cuidado y atención total, asegurando la seguridad de cada una de tus pertenencias desde el primer embalaje hasta el último mueble colocado.",
    image: "/assets/images/service-residential.webp",
    imageAlt: "Equipo de Mudanzas del Sur realizando mudanza residencial en Huelva",
    icon: "HomeIcon", features: ["Embalaje profesional", "Transporte seguro", "Montaje en destino"],
  },
  {
    id: "comercial", tag: "Comercial", title: "Mudanzas Comerciales",
    description: "Adaptamos cada traslado a las necesidades de tu negocio para una transición exitosa y sin interrupciones.",
    image: "/assets/images/service-commercial.webp",
    imageAlt: "Mudanzas del Sur realizando traslado comercial de oficina",
    icon: "BuildingOfficeIcon", features: ["Sin parar tu negocio", "Horarios flexibles", "Seguro incluido"],
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".reveal-hidden");
    if (!cards) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("revealed"); });
    }, { threshold: 0.15 });
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="servicios" ref={sectionRef} className="section-py bg-muted-bg">
      <div className="container-main">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 reveal-hidden">
          <div>
            <span className="eyebrow block mb-3">Nuestros Servicios</span>
            <h2 className="section-title text-foreground">
              ¡Los precios <span className="text-gradient-orange italic">MÁS BAJOS</span> del mercado!
            </h2>
          </div>
          <p className="text-muted max-w-sm text-base leading-relaxed font-body reveal-hidden delay-1">
            Mudanzas y portes en Huelva y toda la península con un equipo profesional y eficiente.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {services.map((service, idx) => (
            <div key={service.id} className={`service-card reveal-hidden delay-${idx + 1}`}>
              <div className="relative overflow-hidden" style={{ height: "280px" }}>
                <AppImage src={service.image} alt={service.imageAlt} fill className="object-cover transition-transform duration-700 hover:scale-105" sizes="(max-width: 767px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 bg-primary text-white text-xs font-heading font-700 uppercase tracking-wider px-3 py-1.5 rounded-full">
                    <Icon name={service.icon as "HomeIcon"} size={13} variant="solid" />
                    {service.tag}
                  </span>
                </div>
              </div>
              <div className="bg-white p-6">
                <h3 className="section-title-sm text-foreground mb-3">{service.title}</h3>
                <p className="text-muted text-sm leading-relaxed font-body mb-5">{service.description}</p>
                <ul className="space-y-2 mb-5">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground font-body">
                      <Icon name="CheckCircleIcon" size={17} variant="solid" className="text-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="tel:+34659715271" className="btn-primary text-sm py-3 px-5">
                  Solicitar presupuesto <Icon name="ArrowRightIcon" size={15} />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center">
          <div className="inline-flex items-center gap-3 bg-accent/20 border border-accent/40 rounded-2xl px-6 py-4 reveal-hidden delay-3">
            <Icon name="TagIcon" size={22} className="text-primary" variant="solid" />
            <div>
              <p className="font-heading font-800 text-foreground text-base">15% de descuento en tu primera mudanza</p>
              <p className="text-muted text-sm font-body">Válido para nuevos clientes · Sin mínimo de servicio</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
