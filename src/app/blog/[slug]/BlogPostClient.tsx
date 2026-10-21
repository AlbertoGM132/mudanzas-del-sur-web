"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AppImage from "@/components/ui/AppImage";
import Icon from "@/components/ui/AppIcon";
import { blogPosts } from "./data";

type ContentBlock =
  | { type: "intro"; text: string }
  | { type: "section"; title: string; text: string; bullets: string[] }
  | { type: "tip"; title: string; text: string };

export default function BlogPostClient({ slug }: { slug: string }) {
  const post = blogPosts.find((p) => p.slug === slug);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!post) return;
    const elements = sectionRef.current?.querySelectorAll(".reveal-item");
    if (!elements) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );
    elements.forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      (el as HTMLElement).style.transform = "translateY(32px)";
      (el as HTMLElement).style.transition =
        "opacity 0.65s cubic-bezier(0.16,1,0.3,1), transform 0.65s cubic-bezier(0.16,1,0.3,1)";
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [post]);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <main id="main" className="min-h-screen bg-background" ref={sectionRef}>
      <Header />

      {/* HERO */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-secondary pt-20">
        <div className="absolute inset-0 z-0">
          <AppImage
            src={post.image}
            alt={post.alt}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(20,26,51,0.92) 0%, rgba(20,26,51,0.72) 55%, rgba(20,26,51,0.35) 100%)",
            }}
          />
        </div>
        <div className="container-main relative z-10 py-20 md:py-28">
          <div className="max-w-2xl reveal-item">
            <nav className="flex items-center gap-2 mb-6 text-white/50 text-sm font-body flex-wrap">
              <Link href="/" className="hover:text-white transition-colors">
                Inicio
              </Link>
              <Icon name="ChevronRightIcon" size={14} className="text-white/30" />
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
              <Icon name="ChevronRightIcon" size={14} className="text-white/30" />
              <span className="text-white/80 truncate max-w-[200px]">{post.category}</span>
            </nav>
            <span className="eyebrow block mb-4 text-accent">{post.category}</span>
            <h1 className="hero-headline text-white mb-6 leading-tight">{post.title}</h1>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-white/70 text-sm font-body flex items-center gap-1.5">
                <Icon name="CalendarIcon" size={14} />
                {post.date}
              </span>
              <span className="text-white/70 text-sm font-body flex items-center gap-1.5">
                <Icon name="ClockIcon" size={14} />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="section-py bg-white">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">

            {/* EXTRACTO */}
            <p className="text-lg text-muted font-body leading-relaxed mb-10 reveal-item border-l-4 border-primary pl-5 italic">
              {post.excerpt}
            </p>

            {/* BLOQUES DE CONTENIDO */}
            {(post.content as ContentBlock[]).map((block, i) => {
              if (block.type === "intro") {
                return (
                  <p
                    key={i}
                    className="text-foreground font-body text-base md:text-lg leading-relaxed mb-8 reveal-item"
                  >
                    {block.text}
                  </p>
                );
              }

              if (block.type === "section") {
                return (
                  <div key={i} className="mb-10 reveal-item">
                    <h2
                      className="font-heading font-800 text-xl md:text-2xl text-foreground mb-3"
                      style={{ fontFamily: "'Archivo', system-ui, sans-serif", fontWeight: 800 }}
                    >
                      {block.title}
                    </h2>
                    <p className="text-muted font-body text-base leading-relaxed mb-4">
                      {block.text}
                    </p>
                    <ul className="space-y-2">
                      {block.bullets.map((bullet, j) => (
                        <li key={j} className="flex items-start gap-3 text-foreground font-body text-base">
                          <span className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-primary" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }

              if (block.type === "tip") {
                return (
                  <div
                    key={i}
                    className="reveal-item mb-10 rounded-2xl p-6 md:p-8 border border-primary/20"
                    style={{ background: "rgba(232,89,12,0.05)" }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Icon name="LightBulbIcon" size={20} className="text-primary" variant="solid" />
                      <span
                        className="font-heading font-800 text-base text-primary"
                        style={{ fontFamily: "'Archivo', system-ui, sans-serif", fontWeight: 800 }}
                      >
                        {block.title}
                      </span>
                    </div>
                    <p className="text-foreground font-body text-base leading-relaxed">{block.text}</p>
                  </div>
                );
              }

              return null;
            })}

            {/* CTA INLINE */}
            <div className="reveal-item mt-12 rounded-3xl bg-secondary p-8 md:p-10 text-center">
              <h3
                className="font-heading font-800 text-2xl text-white mb-3"
                style={{ fontFamily: "'Archivo', system-ui, sans-serif", fontWeight: 800 }}
              >
                ¿Planeas una mudanza en Huelva?
              </h3>
              <p className="text-white/70 font-body text-base mb-6">
                En Mudanzas del Sur llevamos más de 10 años ayudando a familias y empresas a trasladarse con total tranquilidad. Pídenos presupuesto sin compromiso.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contacto" className="btn-primary text-sm py-3 px-6 shadow-orange">
                  <Icon name="EnvelopeIcon" size={16} variant="solid" />
                  Pedir Presupuesto
                </Link>
                <a href="tel:+34659715271" className="btn-outline text-sm py-3 px-6" style={{ color: "white", borderColor: "rgba(255,255,255,0.4)" }}>
                  <Icon name="PhoneIcon" size={16} variant="solid" />
                  Llamar Ahora
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICULOS RELACIONADOS */}
      <section className="section-py bg-muted-bg">
        <div className="container-main">
          <div className="mb-8 reveal-item">
            <h2
              className="font-heading font-800 text-2xl md:text-3xl text-foreground"
              style={{ fontFamily: "'Archivo', system-ui, sans-serif", fontWeight: 800 }}
            >
              Otros artículos del blog
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((related, idx) => (
              <article
                key={related.id}
                className="reveal-item group bg-white rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-[transform,box-shadow,background-color,color,border-color,opacity] duration-400 service-card flex flex-col"
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <AppImage
                    src={related.image}
                    alt={related.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-foreground text-xs font-heading font-700">
                      {related.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-muted text-xs font-body flex items-center gap-1">
                      <Icon name="CalendarIcon" size={12} />
                      {related.date}
                    </span>
                    <span className="text-muted text-xs font-body flex items-center gap-1">
                      <Icon name="ClockIcon" size={12} />
                      {related.readTime}
                    </span>
                  </div>
                  <h3
                    className="font-heading font-800 text-base text-foreground leading-snug mb-3 group-hover:text-primary transition-colors flex-1"
                    style={{ fontFamily: "'Archivo', system-ui, sans-serif", fontWeight: 800 }}
                  >
                    {related.title}
                  </h3>
                  <Link
                    href={`/blog/${related.slug}`}
                    className="inline-flex items-center gap-2 text-primary font-heading font-700 text-sm hover:gap-3 transition-[transform,box-shadow,background-color,color,border-color,opacity] mt-2"
                    style={{ fontFamily: "'Archivo', system-ui, sans-serif", fontWeight: 700 }}
                  >
                    Leer más <Icon name="ArrowRightIcon" size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
