"use client";

import React, { useEffect, useRef } from "react";
import Icon from "@/components/ui/AppIcon";

const regions = ["Andalucía", "Madrid", "Cataluña", "Valencia", "Castilla-La Mancha", "Extremadura", "Murcia", "Aragón", "Galicia", "País Vasco"];

export default function CoverageSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = sectionRef?.current?.querySelectorAll(".reveal-hidden");
    if (!items) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("revealed"); });
    }, { threshold: 0.1 });
    items?.forEach((item) => observer?.observe(item));
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="cobertura" className="section-py bg-muted-bg">
      <div className="container-main">
        <div className="text-center max-w-2xl mx-auto mb-12 reveal-hidden">
          <span className="eyebrow block mb-3">Cobertura Nacional</span>
          <h2 className="section-title text-foreground">
            ¡Realizamos mudanzas <span className="text-gradient-orange italic">a todas partes</span> de España!
          </h2>
          <p className="text-muted mt-4 text-base leading-relaxed font-body">
            Desde Huelva hasta donde necesites. Sin límites de distancia, con el mismo cuidado y profesionalidad de siempre.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-10 reveal-hidden delay-1">
          {regions?.map((region) => (
            <span key={region} className="coverage-badge">
              <Icon name="MapPinIcon" size={13} variant="solid" />
              {region}
            </span>
          ))}
          <span className="coverage-badge" style={{ background: "rgba(232,80,10,0.15)", borderColor: "rgba(232,80,10,0.3)" }}>
            <Icon name="PlusCircleIcon" size={13} variant="solid" />
            Y mucho más...
          </span>
        </div>

        <div className="map-container reveal-hidden delay-2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6334488.706553219!2d-9.145!3d40.416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7c93cc44c1f0c3%3A0x44d1f6df3cef1c91!2sSpain!5e0!3m2!1sen!2ses!4v1680000000000!5m2!1sen!2ses"
            width="100%" height="420" style={{ border: 0 }} allowFullScreen loading="lazy"
            referrerPolicy="no-referrer-when-downgrade" title="Mapa de cobertura de Mudanzas del Sur en España"
          />
        </div>

        <div className="mt-8 text-center reveal-hidden delay-3">
          <p className="text-muted text-sm font-body">
            ¿Tu destino no aparece?{" "}
            <a href="tel:+34659715271" className="text-primary font-semibold hover:underline">Llámanos y lo organizamos</a>
            {" "}— nunca hemos dicho que no.
          </p>
        </div>
      </div>
    </section>
  );
}
