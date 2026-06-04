"use client";

import React, { useEffect, useRef, useState } from "react";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

export default function AboutStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold: 0.3 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const jobs = useCountUp(500, 1800, inView);
  const years = useCountUp(10, 1400, inView);

  return (
    <section ref={sectionRef} className="section-py bg-background overflow-hidden">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-hero aspect-[4/5] max-w-lg mx-auto lg:mx-0">
              <AppImage
                src="/assets/images/van-about.webp"
                alt="Equipo de profesionales de Mudanzas del Sur cargando muebles"
                fill
                className="object-cover"
                sizes="(max-width: 1023px) 100vw, 50vw"
              />
              <div className="absolute bottom-6 right-6 bg-white rounded-2xl p-4 shadow-card-hover float-anim">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon name="TruckIcon" size={22} className="text-primary" variant="solid" />
                  </div>
                  <div>
                    <div className="stat-number text-2xl">+{jobs}</div>
                    <div className="text-xs text-muted font-heading uppercase tracking-wider">Trabajos realizados</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, #E8500A 0%, transparent 70%)" }} />
          </div>

          <div className="space-y-8">
            <div>
              <span className="eyebrow block mb-3">Tu mejor opción en Huelva</span>
              <h2 className="section-title text-foreground">
                Mudanzas del Sur: <span className="text-gradient-orange">profesionales</span> de verdad.
              </h2>
            </div>
            <p className="text-muted text-lg leading-relaxed font-body">
              En Mudanzas del Sur ofrecemos servicios de mudanzas y traslados en{" "}
              <strong className="text-foreground font-semibold">Huelva y toda la península</strong>,
              garantizando un trabajo espléndido y al mejor precio gracias a nuestro equipo de profesionales altamente capacitados.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: `+${jobs}`, label: "Trabajos realizados" },
                { num: "100%", label: "Fiabilidad garantizada" },
                { num: `${years}+`, label: "Años de experiencia" },
                { num: "0€", label: "Presupuesto sin coste" },
              ].map((s) => (
                <div key={s.label} className="bg-card-bg rounded-2xl p-5 border border-border shadow-card">
                  <div className="stat-number">{s.num}</div>
                  <p className="text-sm text-muted font-heading mt-1">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="tel:+34659715271" className="btn-primary">
                <Icon name="PhoneIcon" size={16} variant="solid" />
                Contáctanos
              </a>
              <a href="/servicios" className="btn-outline">Ver servicios</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
