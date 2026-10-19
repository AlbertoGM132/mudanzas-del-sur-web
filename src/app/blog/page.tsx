"use client";

{/* PAGINA PRONCIPAL DONDE SE MUESTRAN TODOS LOS ARTICULOS */}
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";

const blogPosts = [
  {
    id: "1", title: "Guía Definitiva para Embalar tus Objetos Frágiles en una Mudanza",
    slug: "guia-definitiva-para-embalar-tus-objetos-fragiles-en-una-mudanza",
    date: "7 de marzo, 2025", readTime: "1 min leer", category: "Consejos",
    image: "/assets/images/services-hero.jpg",
    alt: "Cajas de mudanza bien embaladas con objetos frágiles",
    excerpt: "Aprende las técnicas profesionales para proteger tus objetos más delicados durante el traslado. Desde vajillas hasta obras de arte, te enseñamos cómo embalar cada tipo de objeto frágil.",
  },
  {
    id: "2", title: "Qué No Debes Embalar en una Mudanza: Objetos Prohibidos o Peligrosos",
    slug: "que-no-debes-embalar-en-una-mudanza-objetos-prohibidos-o-peligrosos",
    date: "7 de febrero, 2025", readTime: "1 min leer", category: "Seguridad",
    image: "/assets/images/casa.jpg",
    alt: "Objetos peligrosos que no deben incluirse en una mudanza",
    excerpt: "Descubre qué artículos están prohibidos en los camiones de mudanza y cómo gestionarlos correctamente. Evita problemas legales y de seguridad.",
  },
  {
    id: "3", title: "Desembalar sin Estrés: Cómo Organizar tu Nuevo Hogar Paso a Paso",
    slug: "desembalar-sin-estres-como-organizar-tu-nuevo-hogar-paso-a-paso",
    date: "7 de febrero, 2025", readTime: "3 min leer", category: "Organización",
    image: "/assets/images/empresa.jpg",
    alt: "Persona organizando cajas en su nuevo hogar",
    excerpt: "Una vez que el camión de mudanzas se va, comienza la parte más importante: organizar tu nuevo hogar. Sigue nuestra guía paso a paso para desembalar de forma eficiente.",
  },
  {
    id: "4", title: "Cómo Embalar la Ropa para una Mudanza: Evita Arrugas y Ahorra Espacio",
    slug: "como-embalar-la-ropa-para-una-mudanza-evita-arrugas-y-ahorra-espacio",
    date: "7 de febrero, 2025", readTime: "2 min leer", category: "Consejos",
    image: "/assets/images/colon.jpg",
    alt: "Ropa doblada y embalada correctamente",
    excerpt: "La ropa es uno de los elementos más voluminosos en cualquier mudanza. Descubre los mejores trucos para embalarla sin que se arrugue, aprovechando al máximo el espacio.",
  },
];

const categories = ["Todos", "Consejos", "Seguridad", "Organización"];

export default function BlogPage() {
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


      {/* ENCABEZADO */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-secondary pt-20">
        <div className="absolute inset-0 z-0">
          <AppImage src="/assets/images/services-hero.jpg" alt="Blog de consejos sobre mudanzas" fill priority className="object-cover object-center" sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(20,26,51,0.88) 0%, rgba(20,26,51,0.65) 55%, rgba(20,26,51,0.25) 100%)" }} />
        </div>
        <div className="container-main relative z-10 py-20 md:py-28">
          <div className="max-w-2xl reveal-item">
            <nav className="flex items-center gap-2 mb-6 text-white/50 text-sm font-body">
              <Link href="/home-page" className="hover:text-white transition-colors">Inicio</Link>
              <Icon name="ChevronRightIcon" size={14} className="text-white/30" />
              <span className="text-white/80">Blog</span>
            </nav>
            <span className="eyebrow block mb-4 text-accent">Nuestro Blog</span>
            <h1 className="hero-headline text-white mb-6">Diario de una <span className="italic" style={{ color: "#F2B544" }}>mudanza</span></h1>
            <p className="hero-sub text-white/80 max-w-xl leading-relaxed">Consejos útiles, guías prácticas y todo lo que necesitas saber para que tu mudanza sea un éxito.</p>
          </div>
        </div>
      </section>

      <section className="section-py bg-white">
        <div className="container-main">
          <div className="flex flex-wrap gap-3 mb-12 reveal-item">
            {categories.map((cat) => (
              <button key={cat} className={`px-5 py-2 rounded-full text-sm font-heading font-700 transition-all border ${cat === "Todos" ? "bg-primary text-white border-primary shadow-sm" : "bg-white text-foreground border-border hover:border-primary hover:text-primary"}`} style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
                {cat}
              </button>
            ))}
          </div>

          {/* ARTICULO DESTACADO */}
          <div className="mb-10 reveal-item">
            <div className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-400 bg-white service-card">
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <AppImage src={blogPosts[0].image} alt={blogPosts[0].alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute top-4 left-4">
                  <span className="discount-badge"><Icon name="StarIcon" size={12} variant="solid" />Destacado</span>
                </div>
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                {/* CONSEJOS, FECHA Y TIEMPO SIN LEER */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-heading font-700">{blogPosts[0].category}</span>
                  <span className="text-muted text-xs font-body flex items-center gap-1"><Icon name="CalendarIcon" size={12} />{blogPosts[0].date}</span>
                  <span className="text-muted text-xs font-body flex items-center gap-1"><Icon name="ClockIcon" size={12} />{blogPosts[0].readTime}</span>
                </div>
                <h2 className="font-heading font-800 text-2xl md:text-3xl text-foreground leading-tight mb-4 group-hover:text-primary transition-colors" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800 }}>{blogPosts[0].title}</h2>
                <p className="text-muted font-body text-base leading-relaxed mb-6">{blogPosts[0].excerpt}</p>
                <Link href={`/blog/${blogPosts[0].slug}`} className="btn-primary text-sm py-3 px-6 self-start">
                  Leer artículo <Icon name="ArrowRightIcon" size={16} />
                </Link>
              </div>
            </div>
          </div>

          
          <div className="mb-8">
            <h2 className="font-heading font-800 text-2xl md:text-3xl text-foreground leading-tight mb-4 group-hover:text-primary transition-colors" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800 }}>Nuestros Artículos</h2>
            <p className="text-muted font-body text-base leading-relaxed">
              Descubre consejos, tips y noticias sobre mudanzas y traslados en Huelva.
            </p>
          </div>

          {/* AQUI SE MUESTRAN LOS ARTICULOS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.slice(1).map((post, idx) => (

              <article key={post.id} className="reveal-item group bg-white rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-400 service-card flex flex-col" style={{ transitionDelay: `${idx * 80}ms` }}>
                <div className="relative h-52 overflow-hidden">
                  <AppImage src={post.image} alt={post.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-foreground text-xs font-heading font-700">{post.category}</span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-muted text-xs font-body flex items-center gap-1"><Icon name="CalendarIcon" size={12} />{post.date}</span>
                    <span className="text-muted text-xs font-body flex items-center gap-1"><Icon name="ClockIcon" size={12} />{post.readTime}</span>
                  </div>
                  <h3 className="font-heading font-800 text-lg text-foreground leading-snug mb-3 group-hover:text-primary transition-colors" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800 }}>{post.title}</h3>
                  <p className="text-muted font-body text-sm leading-relaxed mb-5 flex-1">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-primary font-heading font-700 text-sm hover:gap-3 transition-all" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
                    Leer más <Icon name="ArrowRightIcon" size={16} />
                  </Link>
                </div>
              </article>

            ))}
          </div>
        </div>
      </section>

      <section className="section-py bg-muted-bg">
        <div className="container-main">
          <div className="max-w-2xl mx-auto text-center reveal-item">
            <span className="eyebrow block mb-4">¿Necesitas ayuda?</span>
            <h2 className="section-title text-foreground mb-4">¿Planeas una <span className="text-gradient-orange italic">mudanza</span>?</h2>
            <p className="text-muted font-body text-lg leading-relaxed mb-8">Nuestro equipo de expertos está disponible 24h para asesorarte y ofrecerte el mejor presupuesto sin compromiso.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contacto" className="btn-primary text-base py-4 px-8 shadow-orange">
                <Icon name="EnvelopeIcon" size={18} variant="solid" />Pedir Presupuesto
              </Link>
              <a href="tel:+34659715271" className="btn-outline text-base py-4 px-8">
                <Icon name="PhoneIcon" size={18} variant="solid" />Llamar Ahora
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
