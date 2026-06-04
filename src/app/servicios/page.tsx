"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

const services = [
  {
    id: "locales", tag: "Local", title: "Mudanzas Locales",
    description: "Realizamos mudanzas en Huelva con gran profesionalismo. Nos encargamos de todo el proceso: desde el embalaje cuidadoso de tus pertenencias hasta el montaje en tu nuevo hogar.",
    image: "/assets/images/colon.jpg",
    alt: "Monumento a la Fe Descubridora en Huelva", icon: "HomeIcon",
    features: ["Embalaje y desembalaje profesional", "Montaje y desmontaje de muebles", "Transporte seguro por Huelva", "Presupuesto sin compromiso"],
  },
  {
    id: "nacionales", tag: "Nacional", title: "Mudanzas Nacionales",
    description: "Expertos en mudanzas a toda la península ibérica. No importa si es a otra provincia o al otro extremo del país: nos adaptamos a tu itinerario y garantizamos la seguridad de tus pertenencias.",
    image: "/assets/images/mapa.jpg",
    alt: "Mapa de carreteras de España", icon: "TruckIcon",
    features: ["Cobertura en toda España", "Seguimiento en tiempo real", "Seguro de transporte incluido", "Coordinación de plazos"],
  },
  {
    id: "particulares", tag: "Particulares", title: "Mudanzas a Particulares",
    description: "Somos especialistas en mudanzas a particulares. Realizamos mudanzas económicas, ágiles y adaptadas a tus necesidades. Ya seas una familia, una pareja o alguien que emprende una nueva aventura.",
    image: "/assets/images/casa.jpg",
    alt: "Mudanzas del Sur realizando mudanza a particulares", icon: "UserGroupIcon",
    features: ["Precios económicos y transparentes", "Servicio personalizado", "Embalaje de objetos frágiles", "Adaptación a tu horario"],
  },
  {
    id: "empresas", tag: "Empresas", title: "Mudanzas a Empresas",
    description: "Si va a trasladar su empresa tenemos un equipo altamente cualificado para realizar todo el trabajo. Nos encargamos de la clasificación y organización de archivos y mobiliario.",
    image: "/assets/images/empresa.jpg",
    alt: "Traslado de empresa y oficinas", icon: "BuildingOfficeIcon",
    features: ["Clasificación de archivos y mobiliario", "Mínima interrupción del negocio", "Horarios flexibles y nocturnos", "Gestión integral del traslado"],
  },
];

const trustItems = [
  { icon: "ShieldCheckIcon", label: "100% Garantizado", desc: "Seguro de transporte incluido en todos los servicios" },
  { icon: "CurrencyEuroIcon", label: "Presupuesto Gratis", desc: "Sin compromiso y adaptado a tus necesidades" },
  { icon: "ClockIcon", label: "Puntualidad Total", desc: "Cumplimos con los plazos acordados siempre" },
  { icon: "StarIcon", label: "+500 Clientes Felices", desc: "Años de experiencia avalan nuestro trabajo" },
];

export default function ServiciosPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll(".reveal-item");
    if (!elements) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = "1";
          (entry.target as HTMLElement).style.transform = "translateY(0)";
        }
      });
    }, { threshold: 0.1 });
    elements.forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      (el as HTMLElement).style.transform = "translateY(32px)";
      (el as HTMLElement).style.transition = "opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1)";
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-background" ref={sectionRef}>
      <Header />

      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-secondary pt-20">
        <div className="absolute inset-0 z-0">
          <AppImage src="/assets/images/services-hero.jpg" alt="Camión de mudanzas en carretera" fill priority className="object-cover object-center" sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(17,24,32,0.85) 0%, rgba(17,24,32,0.6) 50%, rgba(17,24,32,0.2) 100%)" }} />
        </div>
        <div className="container-main relative z-10 py-20 md:py-28">
          <div className="max-w-2xl reveal-item">
            <nav className="flex items-center gap-2 mb-6 text-white/50 text-sm font-body">
              <Link href="/home-page" className="hover:text-white transition-colors">Inicio</Link>
              <Icon name="ChevronRightIcon" size={14} className="text-white/30" />
              <span className="text-white/80">Servicios</span>
            </nav>
            <span className="eyebrow block mb-4 text-accent">Nuestros Servicios</span>
            <h1 className="hero-headline text-white mb-6">Mudanzas y <span className="italic" style={{ color: "#F5C842" }}>Traslados</span></h1>
            <p className="hero-sub text-white/80 max-w-xl leading-relaxed mb-8">
              Ofrecemos servicios de mudanzas y portes en Huelva y toda la península de gran calidad. Ya seas una empresa o un particular, en Mudanzas del Sur nos especializamos en hacer realidad tu cambio.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="tel:+34659715271" className="btn-primary text-base py-4 px-7 shadow-orange">
                <Icon name="PhoneIcon" size={18} variant="solid" />¡Llama Ahora!
              </a>
              <a href="#servicios-lista" onClick={(e) => { e.preventDefault(); document.querySelector("#servicios-lista")?.scrollIntoView({ behavior: "smooth" }); }} className="btn-white text-base py-4 px-7">
                Ver Servicios <Icon name="ArrowDownIcon" size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-main">
          <div className="max-w-3xl mx-auto text-center reveal-item">
            <span className="eyebrow block mb-4">¿Por qué elegirnos?</span>
            <h2 className="section-title text-foreground mb-6">Profesionales en <span className="text-gradient-orange italic">cada detalle</span></h2>
            <p className="text-muted text-lg leading-relaxed font-body mb-4">Nuestro equipo se ocupa personalmente de clasificar, embalar con máximo cuidado y posteriormente desembalar y montar todos tus enseres y mobiliario.</p>
            <p className="text-muted text-lg leading-relaxed font-body">Con años de experiencia en el sector, ofrecemos un servicio confiable y de alta calidad, adaptándonos siempre a lo que cada cliente necesita.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
            {trustItems.map((item, idx) => (
              <div key={item.label} className="reveal-item flex flex-col items-center text-center p-6 rounded-2xl bg-muted-bg border border-border" style={{ transitionDelay: `${idx * 80}ms` }}>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <Icon name={item.icon as "ShieldCheckIcon"} size={24} className="text-primary" variant="solid" />
                </div>
                <p className="font-heading font-800 text-foreground text-sm mb-1">{item.label}</p>
                <p className="text-muted text-xs font-body leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="servicios-lista" className="section-py bg-muted-bg">
        <div className="container-main">
          <div className="text-center mb-14 reveal-item">
            <span className="eyebrow block mb-3">Lo que ofrecemos</span>
            <h2 className="section-title text-foreground">Mudanzas <span className="text-gradient-orange italic">Profesionales</span></h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, idx) => (
              <div key={service.id} className="service-card reveal-item bg-white" style={{ transitionDelay: `${idx * 100}ms` }}>
                <div className="relative overflow-hidden" style={{ height: "260px" }}>
                  <AppImage src={service.image} alt={service.alt} fill className="object-cover transition-transform duration-700 hover:scale-105" sizes="(max-width: 767px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 bg-primary text-white text-xs font-heading font-700 uppercase tracking-wider px-3 py-1.5 rounded-full">
                      <Icon name={service.icon as "HomeIcon"} size={13} variant="solid" />{service.tag}
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="section-title-sm text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted text-sm leading-relaxed font-body mb-6">{service.description}</p>
                  <ul className="space-y-2.5 mb-7">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-foreground font-body">
                        <Icon name="CheckCircleIcon" size={17} variant="solid" className="text-primary flex-shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <a href="tel:+34659715271" className="btn-primary text-sm py-3 px-5">Solicitar presupuesto <Icon name="ArrowRightIcon" size={15} /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py bg-white overflow-hidden">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="reveal-item order-2 md:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-card-hover" style={{ height: "480px" }}>
                <AppImage src="/assets/images/team-photo.jpg" alt="Equipo de Mudanzas del Sur" fill className="object-cover" sizes="(max-width: 767px) 100vw, 50vw" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-card flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="HeartIcon" size={20} className="text-primary" variant="solid" />
                    </div>
                    <div>
                      <p className="font-heading font-800 text-foreground text-sm">Más que una mudanza</p>
                      <p className="text-muted text-xs font-body">Acompañamos nuevos comienzos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="reveal-item order-1 md:order-2">
              <span className="eyebrow block mb-4">Nuestra Historia</span>
              <h2 className="section-title text-foreground mb-6">Más que transportar muebles, <span className="text-gradient-orange italic">acompañamos nuevos comienzos</span></h2>
              <p className="text-muted text-base leading-relaxed font-body mb-4">Detrás de cada camión de Mudanzas del Sur y frente a cada edificio, hay una historia que cambia. Una familia que crece, una pareja que empieza su convivencia o alguien que emprende una nueva aventura en otro lugar.</p>
              <p className="text-muted text-base leading-relaxed font-body mb-8">Nos encanta nuestro trabajo porque no solo transportamos objetos; transportamos vuestros recuerdos y vuestras ilusiones.</p>
              <a href="tel:+34659715271" className="btn-primary text-base py-4 px-7">
                <Icon name="PhoneIcon" size={18} variant="solid" />¡Contáctanos!
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-py bg-foreground overflow-hidden relative">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #E8500A 0%, transparent 50%), radial-gradient(circle at 80% 50%, #F5C842 0%, transparent 50%)" }} />
        <div className="container-main relative z-10 text-center reveal-item">
          <span className="eyebrow block mb-4 text-accent">¿Listo para empezar?</span>
          <h2 className="section-title text-white mb-6">Pide tu presupuesto <span className="italic" style={{ color: "#F5C842" }}>sin compromiso</span></h2>
          <p className="text-white/70 text-lg font-body max-w-lg mx-auto mb-10 leading-relaxed">Si estás planeando una mudanza, grande o pequeña, no dudes en contactarnos. Te ofreceremos un presupuesto personalizado y sin compromiso.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:+34659715271" className="btn-primary text-base py-4 px-8 shadow-orange">
              <Icon name="PhoneIcon" size={18} variant="solid" />¡Llama Ahora!
            </a>
            <a href={`https://wa.me/34659715271?text=${encodeURIComponent("Hola, me gustaría solicitar un presupuesto para una mudanza.")}`} target="_blank" rel="noopener noreferrer" className="btn-white text-base py-4 px-8">
              <Icon name="ChatBubbleLeftRightIcon" size={18} />WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
