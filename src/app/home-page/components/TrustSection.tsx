"use client";

import React, { useEffect, useRef } from "react";
import Icon from "@/components/ui/AppIcon";

const trustPoints = [
  { icon: "ClockIcon", title: "Puntualidad garantizada", description: "Llegamos a la hora acordada, siempre. Tu tiempo es tan valioso como el nuestro." },
  { icon: "ShieldCheckIcon", title: "Tus cosas, seguras al 100%", description: "Embalamos con materiales profesionales y transportamos con mimo cada objeto, por pequeño que sea." },
  { icon: "CurrencyEuroIcon", title: "Precio cerrado sin sorpresas", description: "El presupuesto que te damos es el que pagas. Sin costes ocultos ni letras pequeñas." },
  { icon: "MapPinIcon", title: "Huelva y toda la península", description: "Nos adaptamos a tu destino, sea en Huelva capital o en cualquier rincón de España." },
];

export default function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll(".reveal-hidden");
    if (!items) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("revealed"); });
    }, { threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-py bg-white overflow-hidden">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 reveal-hidden">
            <div>
              <span className="eyebrow block mb-3">Por qué elegirnos</span>
              <h2 className="section-title text-foreground">
                Deja todo <span className="text-gradient-orange italic">en nuestras manos.</span>
              </h2>
              <p className="text-muted text-base mt-2 font-body italic">
                Bueno, no literalmente... un piano entre dos ya nos cuesta, <span className="not-italic">el gimnasio tiene sus límites 😅</span>
              </p>
            </div>
            <div className="bg-muted-bg rounded-3xl p-7 border-l-4 space-y-4" style={{ borderColor: "#E8500A" }}>
              <p className="font-heading font-700 text-foreground text-lg leading-snug">&ldquo;Lo que realmente queremos decirte es esto:&rdquo;</p>
              <p className="text-muted leading-relaxed font-body text-base">
                Llevamos tantas mudanzas a nuestras espaldas que podríamos escribir un libro sobre ellas. La experiencia nos ha enseñado todos los miedos que acechan a nuestros clientes antes de empezar.
              </p>
              <p className="text-muted leading-relaxed font-body text-base">
                No sabemos tu situación exacta, pero sí sabemos esto:{" "}
                <strong className="text-foreground font-semibold">nos adaptamos a ti, no al revés.</strong>{" "}
                En Huelva, nos encargamos de que tu mudanza sea suave como la seda.
              </p>
            </div>
            <a href="tel:+34659715271" className="btn-primary text-base py-4 px-8 shadow-orange">
              <Icon name="PhoneIcon" size={18} variant="solid" />
              Pide tu presupuesto YA
            </a>
          </div>

          <div className="space-y-1 reveal-hidden delay-2">
            {trustPoints.map((point, idx) => (
              <div key={point.title} className={`trust-item reveal-hidden delay-${idx + 1}`}>
                <div className="trust-icon">
                  <Icon name={point.icon as "ClockIcon"} size={22} variant="outline" />
                </div>
                <div>
                  <h4 className="font-heading font-700 text-foreground text-base mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>{point.title}</h4>
                  <p className="text-muted text-sm leading-relaxed font-body">{point.description}</p>
                </div>
              </div>
            ))}
            <div className="pt-6">
              <div className="bg-primary/5 rounded-2xl p-5 border border-primary/15 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                  <Icon name="StarIcon" size={22} variant="solid" className="text-white" />
                </div>
                <div>
                  <p className="font-heading font-700 text-foreground text-sm">+500 familias ya confían en nosotros</p>
                  <p className="text-muted text-xs font-body mt-0.5">Valoración media: 5/5 estrellas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
